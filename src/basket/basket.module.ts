import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketItemsRepository } from './repositories/BasketItems.repository';
import { ProductRepository } from '../products/repositories/Products.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasketItemsRepository, ProductRepository]),
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
