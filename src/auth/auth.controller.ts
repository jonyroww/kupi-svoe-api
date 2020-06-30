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
import { PhoneVerificationKey } from './interfaces/phone-verification-key.interface';
import { ParamsValidationDto } from '../common/dto/params-validation.dto';
import { VerificationPhoneDto } from './dto/verification-phone.dto';
import { VerificationResendDto } from './dto/verification-phone-resend.dto';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/phone-verification')
  @ApiTags('Phone verification')
  @ApiCreatedResponse({ type: () => PhoneVerification })
  createPhoneVerification(
    @Body() body: PhoneVerificationRequestDto,
  ): Promise<PhoneVerificationKey> {
    return this.authService.createPhoneVerification(body);
  }

  @Put('/phone-verification/:Id')
  @ApiTags('Phone verification')
  @ApiOkResponse({ type: () => PhoneVerification })
  verificationPhone(
    @Body() body: VerificationPhoneDto,
    @Param() params: ParamsValidationDto,
  ): Promise<PhoneVerification> {
    return this.authService.verificationPhone(body, params);
  }

  @Put('/phone-verification/:Id/resend')
  @ApiTags('Phone verification')
  @ApiOkResponse({ type: () => PhoneVerification })
  verificationPhoneResend(
    @Body() body: VerificationResendDto,
    @Param() params: ParamsValidationDto,
  ): Promise<PhoneVerification> {
    return this.authService.verificationPhoneResend(body, params);
  }
}
