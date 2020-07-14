import { Injectable, BadRequestException } from '@nestjs/common';
import { PhoneVerificationRepository } from './repositories/Phone-verification.repository';
import { PhoneVerificationRequestDto } from './dto/create-phone-verification.dto';
import { PurposeType } from '../constants/PurposeType.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneVerification } from './entities/Phone-verification.entity';
import { UserRepository } from '../users/repositories/User.repository';
import cryptoRandomString from 'crypto-random-string';
import { makeError } from '../common/errors';
import { ConfigService } from '../config/config.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { SMSRu } from 'node-sms-ru';
import bcrypt from 'bcrypt';
import { VerificationPhoneDto } from './dto/verification-phone.dto';
import { IdParamDto } from '../common/dto/id-param.dto';
import { VerificationResendDto } from './dto/verification-phone-resend.dto';
import { PhoneVerificationKeyDto } from './dto/phone-verification-key.dto';
import { RegistrationBodyDto } from './dto/registration-body.dto';
import { AccessToken } from '../common/interfaces/access-token.interface';
import { UserModerationStatus } from '../constants/UserModerationStatus.enum';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/User.entity';
import { IJwtPayload } from './interfaces/JwtPayload.interface';
import { JwtPurposeType } from '../constants/JwtPurpose.enum';
import { MailerService } from '@nest-modules/mailer';
import { EmailTokenDto } from './dto/email-confirm-query.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PhoneVerification)
    private phoneVerificationRepository: PhoneVerificationRepository,
    private userRepository: UserRepository,
    private configService: ConfigService,
    private readonly smsRu: SMSRu,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  @Transactional()
  async createPhoneVerification(
    body: PhoneVerificationRequestDto,
  ): Promise<PhoneVerificationKeyDto> {
    const user = await this.userRepository.findOne({
      phone: body.phone,
    });
    if (body.purpose === PurposeType.REGISTRATION && user) {
      throw makeError('PHONE_ALREADY_EXISTS');
    }
    if (body.purpose === PurposeType.PASSWORD_RESET && !user) {
      throw makeError('USER_NOT_FOUND');
    }
    const phoneVerificationRequest = this.phoneVerificationRepository.create(
      body,
    );
    phoneVerificationRequest.key = cryptoRandomString({ length: 32 });
    const smsCode = this.configService.get('SMS_CODE_GEN')
      ? cryptoRandomString({ length: 6, type: 'numeric' })
      : '111111';

    if (this.configService.get('SMS_CODE_GEN')) {
      await this.sendSMSNotification(phoneVerificationRequest.phone, smsCode);
    }

    phoneVerificationRequest.sms_code = smsCode;
    phoneVerificationRequest.sms_sent_count = 1;
    phoneVerificationRequest.sms_last_sent_at = new Date();
    phoneVerificationRequest.purpose = body.purpose;
    await this.phoneVerificationRepository.save(phoneVerificationRequest);
    return {
      id: phoneVerificationRequest.id,
      key: phoneVerificationRequest.key,
    };
  }

  @Transactional()
  async verificationPhone(
    body: VerificationPhoneDto,
    params: IdParamDto,
  ): Promise<PhoneVerification> {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      params.id,
    );

    if (!phoneVerification) {
      throw makeError('RECORD_NOT_FOUND');
    } else if (body.key != phoneVerification.key) {
      throw makeError('KEY_IS_NOT_VALID');
    } else if (phoneVerification.success !== false) {
      throw makeError('CODE_ALREADY_USED');
    } else if (phoneVerification.used === true) {
      throw makeError('VERIFICATION_ALREADY_USED');
    } else if (phoneVerification.wrong_attempts_count > 5) {
      throw makeError('MAX_LIMIT_OF_WRONG_ATTEMPTS');
    }

    if (phoneVerification.sms_code != body.sms_code) {
      phoneVerification.wrong_attempts_count += 1;
      await this.phoneVerificationRepository.save(phoneVerification);
      throw makeError('SMS_CODE_IS_NOT_CORRECT');
    } else {
      phoneVerification.success = true;
      await this.phoneVerificationRepository.save(phoneVerification);
    }

    return phoneVerification;
  }

  @Transactional()
  async verificationPhoneResend(
    body: VerificationResendDto,
    params: IdParamDto,
  ): Promise<PhoneVerification> {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      params.id,
    );

    if (!phoneVerification) {
      throw makeError('RECORD_NOT_FOUND');
    } else if (body.key != phoneVerification.key) {
      throw makeError('KEY_IS_NOT_VALID');
    } else if (phoneVerification.success === true) {
      throw makeError('CODE_ALREADY_USED');
    } else if (phoneVerification.used === true) {
      throw makeError('VERIFICATION_ALREADY_USED');
    } else if (phoneVerification.sms_sent_count > 5) {
      throw makeError('LIMIT_EXCEEDED');
    }
    const interval = Date.now() - phoneVerification.sms_last_sent_at.getTime();
    if (interval < 2 * 60 * 1000) {
      throw makeError('TIME_INTERVAL_IS_NOT_OVER');
    }

    const smsCode = this.configService.get('SMS_CODE_GEN')
      ? cryptoRandomString({ length: 6, type: 'numeric' })
      : '111111';

    if (this.configService.get('SMS_CODE_GEN')) {
      this.sendSMSNotification(phoneVerification.phone, smsCode);
    }
    phoneVerification.sms_code = smsCode;
    phoneVerification.sms_sent_count += 1;
    phoneVerification.wrong_attempts_count = 0;
    phoneVerification.sms_last_sent_at = new Date();
    await this.phoneVerificationRepository.save(phoneVerification);

    return phoneVerification;
  }

  async registrationUser({
    verification_id,
    verification_key,
    ...body
  }: RegistrationBodyDto): Promise<AccessToken> {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      verification_id,
    );
    this.checkPhoneVerification(
      phoneVerification,
      verification_id,
      verification_key,
      PurposeType.REGISTRATION,
    );
    const isEmailNotUnique = await this.userRepository.findOne({
      email: body.email,
    });
    if (isEmailNotUnique) {
      throw makeError('EMAIL_ALREADY_EXISTS');
    }
    body.password = await this.hashPassword(body.password);
    const user = this.userRepository.create(body);
    user.phone = phoneVerification.phone;
    user.moderation_status = UserModerationStatus.NOT_MODERATED;
    await this.userRepository.save(user);
    phoneVerification.user_id = user.id;
    phoneVerification.used = true;
    await this.phoneVerificationRepository.save(phoneVerification);

    return { token: await this.getToken(user.id) };
  }

  async userLogin(user: User): Promise<AccessToken> {
    const payload: IJwtPayload = {
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async emailVerificationSend(user: User) {
    const token = await this.jwtService.signAsync({
      user_id: user.id,
      purpose: JwtPurposeType.EMAIL_VERIFICATION,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'КупиСвоё - подтверждение почты',
      template: 'email-verification.html',
      context: {
        link: `${this.configService.get(
          'BASE_URL',
        )}/auth/email-confirm?token=${encodeURIComponent(token)}`,
      },
    });
  }

  async emailConfirm(query: EmailTokenDto) {
    const jwtSign = await this.jwtService.verifyAsync(query.token);

    if (jwtSign && jwtSign.purpose === JwtPurposeType.EMAIL_VERIFICATION) {
      const user = await this.userRepository.findOne({ id: jwtSign.user_id });
      if (!user && user.deleted_at) {
        throw makeError('USER_NOT_FOUND');
      }
      if (user.email_confirmed === true) {
        throw makeError('EMAIL_ALREADY_CONFIRMED');
      }
      user.email_confirmed = true;
      await this.userRepository.save(user);
      return jwtSign;
    } else {
      throw makeError('FORBIDDEN');
    }
  }

  checkPhoneVerification(
    phoneVerification,
    verification_id,
    verification_key,
    purposeType,
  ) {
    if (!phoneVerification) {
      throw makeError('RECORD_NOT_FOUND');
    } else if (phoneVerification.purpose != purposeType) {
      throw makeError('PURPOSE_IS_NOT_CORRECT');
    } else if (verification_id !== phoneVerification.id) {
      throw makeError('VERIFICATION_ID_IS_NOT_VALID');
    } else if (phoneVerification.key != verification_key) {
      throw makeError('KEY_IS_NOT_VALID');
    } else if (phoneVerification.success !== true) {
      throw makeError('CODE_ALREADY_USED');
    } else if (phoneVerification.used === true) {
      throw makeError('VERIFICATION_ALREADY_USED');
    }
  }

  async hashPassword(password): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async getToken(userId: number) {
    return await this.jwtService.signAsync({
      sub: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    });
  }

  async validateUser(phone: string, password: string) {
    const user = await this.userRepository.findOne({
      phone: phone,
    });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user;
      } else {
        throw makeError('WRONG_PASSWORD');
      }
    } else {
      throw makeError('USER_NOT_FOUND');
    }
  }

  async sendSMSNotification(to: string, msg: string): Promise<void> {
    await this.smsRu.sendSms({ to, msg });
  }
}
