import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/Order.repository';
import { ProductRepository } from '../products/repositories/Products.repository';
import { BasketModule } from '../basket/basket.module';
import { BasketItemsRepository } from '../basket/repositories/BasketItems.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      ProductRepository,
      BasketItemsRepository,
    ]),
    BasketModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
