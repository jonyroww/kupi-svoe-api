import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
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
}
