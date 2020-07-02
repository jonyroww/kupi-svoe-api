import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({})],
  controllers: [PhotosController],
})
export class PhotosModule {}
