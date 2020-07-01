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
import { PhoneVerification } from './entities/Phone-verification.entity';
import { IdParamDto } from '../common/dto/id-param.dto';
import { VerificationPhoneDto } from './dto/verification-phone.dto';
import { VerificationResendDto } from './dto/verification-phone-resend.dto';
import { PhoneVerificationKeyDto } from './dto/phone-verification-key.dto';
import { AccessToken } from '../common/interfaces/access-token.interface';
import { RegistrationBodyDto } from './dto/registration-body.dto';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
