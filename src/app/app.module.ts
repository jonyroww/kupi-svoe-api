import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SMSRuModule } from 'node-sms-ru/nestjs';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import path from 'path';
import appRootPath from 'app-root-path';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { PhotosModule } from '../photos/photos.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        defaults: {
          from: configService.get('EMAIL_FROM'),
        },
        transport: configService.get('SMTP_URL'),
        template: {
          dir: path.join(appRootPath.toString(), 'templates'),
          adapter: new HandlebarsAdapter(),
        },
      }),
      inject: [ConfigService],
    }),
    SMSRuModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        api_id: config.get('SMS_API_ID'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(),
    CategoriesModule,
    AuthModule,
    ConfigModule,
    PhotosModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
