import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SMSRuModule } from 'node-sms-ru/nestjs';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    SMSRuModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        api_id: config.get('SMS_API_ID'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
