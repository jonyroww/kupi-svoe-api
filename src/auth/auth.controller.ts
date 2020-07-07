import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Param,
  Put,
  UseGuards,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PhoneVerificationRequestDto } from './dto/create-phone-verification.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PhoneVerification } from './entities/Phone-verification.entity';
import { IdParamDto } from '../common/dto/id-param.dto';
import { VerificationPhoneDto } from './dto/verification-phone.dto';
import { VerificationResendDto } from './dto/verification-phone-resend.dto';
import { PhoneVerificationKeyDto } from './dto/phone-verification-key.dto';
import { AccessToken } from '../common/interfaces/access-token.interface';
import { RegistrationBodyDto } from './dto/registration-body.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/User.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { ConfigService } from '../config/config.service';
import { EmailTokenDto } from './dto/email-confirm-query.dto';
import { Response } from 'express';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('/phone-verifications')
  @ApiTags('Phone verification')
  @ApiCreatedResponse({ type: () => PhoneVerification })
  createPhoneVerification(
    @Body() body: PhoneVerificationRequestDto,
  ): Promise<PhoneVerificationKeyDto> {
    return this.authService.createPhoneVerification(body);
  }

  @Put('/phone-verifications/:id')
  @ApiTags('Phone verification')
  @ApiOkResponse({ type: () => PhoneVerification })
  verificationPhone(
    @Body() body: VerificationPhoneDto,
    @Param() params: IdParamDto,
  ): Promise<PhoneVerification> {
    return this.authService.verificationPhone(body, params);
  }

  @Put('/phone-verifications/:id/resend')
  @ApiTags('Phone verification')
  @ApiOkResponse({ type: () => PhoneVerification })
  verificationPhoneResend(
    @Body() body: VerificationResendDto,
    @Param() params: IdParamDto,
  ): Promise<PhoneVerification> {
    return this.authService.verificationPhoneResend(body, params);
  }

  @Post('/registration')
  @ApiTags('Auth')
  @ApiCreatedResponse({ type: () => PhoneVerification })
  registrationUser(@Body() body: RegistrationBodyDto): Promise<AccessToken> {
    return this.authService.registrationUser(body);
  }

  @Post('/login')
  @ApiTags('Auth')
  @ApiOkResponse()
  @ApiBody({ type: () => UserLoginDto })
  @UseGuards(AuthGuard('local'))
  async userLogin(@GetUser() user: User): Promise<AccessToken> {
    return await this.authService.userLogin(user);
  }

  @Get('/me')
  @ApiTags('Auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: () => User })
  async me(@GetUser() user: User): Promise<User> {
    return user;
  }

  @Post('/email-verification')
  @ApiTags('Auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiCreatedResponse()
  emailVerification(@GetUser() user: User) {
    return this.authService.emailVerificationSend(user);
  }

  @Get('/email-confirm')
  @ApiTags('Auth')
  @ApiCreatedResponse()
  async emailConfirm(@Query() query: EmailTokenDto, @Res() res: Response) {
    const jwtSign = await this.authService.emailConfirm(query);
    if (jwtSign) {
      try {
        res.redirect(this.configService.get('REDIRECT_URI_SUCCESS'));
      } catch (err) {
        res.redirect(this.configService.get('REDIRECT_URI_ERROR'));
      }
    }
  }
}
