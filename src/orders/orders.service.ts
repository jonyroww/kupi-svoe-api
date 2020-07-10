import { Injectable } from '@nestjs/common';
import { OrderRepository } from './repositories/Order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../users/entities/User.entity';
import { ProductRepository } from '../products/repositories/Products.repository';
import { BasketItem } from '../basket/entities/BasketItem.entity';
import { Order } from './entities/Order.entity';
import { GetOrdersDto } from './dto/get-all-user-orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepo: OrderRepository,
    private productsRepo: ProductRepository,
  ) {}

  async createOrder(
    body: CreateOrderDto,
    user: User,
    userId: number,
  ): Promise<Order> {
    const order = this.ordersRepo.create(user);
    order.delivery_type = body.delivery_type;
    order.payment_type = body.payment_type;
    order.user_id = user.id;
    const products = await this.productsRepo
      .createQueryBuilder('products')
      .leftJoinAndSelect(
        BasketItem,
        'basket_items',
        'basket_items.user_id = :userId',
        {
          userId,
        },
      )
      .getMany();
    order.products = products;
    await this.ordersRepo.save(order);
    return order;
  }

  async getUserOrders(query: GetOrdersDto, userId: number) {
    const qb = this.ordersRepo
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.products', 'products');
    qb.andWhere('orders.user_id = :userId', {
      userId,
    });
    const [data, total] = await qb
      .take(query.limit)
      .offset(query.offset)
      .getManyAndCount();
    return { total: total, data: data };
  }
}
