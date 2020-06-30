import { Injectable } from '@nestjs/common';
import { PhoneVerificationRepository } from './repositories/Phone-verification.repository';
import { PhoneVerificationRequestDto } from './dto/create-phone-verification.dto';
import { PurposeType } from '../constants/PurposeType.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneVerification } from './entities/Phone-verification.entity';
import { PhoneVerificationKey } from './interfaces/phone-verification-key.interface';
import { UserRepository } from '../users/repositories/User.repository';
import cryptoRandomString from 'crypto-random-string';
import { makeError } from 'src/common/errors';
import { ConfigService } from 'src/config/config.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { SMSRu } from 'node-sms-ru';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PhoneVerification)
    private phoneVerificationRepository: PhoneVerificationRepository,
    private userRepository: UserRepository,
    private configService: ConfigService,
    private readonly smsRu: SMSRu,
  ) {}

  @Transactional()
  async createPhoneVerification(
    body: PhoneVerificationRequestDto,
  ): Promise<PhoneVerificationKey> {
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

    await this.sendSMSNotification(phoneVerificationRequest.phone, smsCode);

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

  async sendSMSNotification(to: string, msg: string): Promise<void> {
    await this.smsRu.sendSms({ to, msg });
  }
}
