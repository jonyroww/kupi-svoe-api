import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneVerificationRepository } from './repositories/Phone-verification.repository';
import { UserRepository } from 'src/users/repositories/User.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhoneVerificationRepository, UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
