import { Injectable } from '@nestjs/common';
import { OrderRepository } from './repositories/Order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../users/entities/User.entity';
import { ProductRepository } from '../products/repositories/Products.repository';
import { BasketItem } from '../basket/entities/BasketItem.entity';
import { Order } from './entities/Order.entity';
import { GetOrdersDto } from './dto/get-all-user-orders.dto';
import { BasketItemsRepository } from '../basket';
import { Paginated } from '../common/interfaces/paginated-entity.interface';
import { GetOneOrderParamDto } from './dto/get-one-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepo: OrderRepository,
    private productsRepo: ProductRepository,
    private basketItemsRepo: BasketItemsRepository,
  ) {}

  async createOrder(
    body: CreateOrderDto,
    orderCreator: User,
    userId: number,
  ): Promise<Order> {
    const order = this.ordersRepo.create(orderCreator);
    order.delivery_type = body.delivery_type;
    order.payment_type = body.payment_type;
    order.user_id = orderCreator.id;
    const basketItems = await this.basketItemsRepo.find({
      where: { user_id: userId },
    });
    const productIds = basketItems.map(basketItem => basketItem.product_id);
    const qb = this.productsRepo.createQueryBuilder('products');
    qb.whereInIds(productIds);
    order.products = await qb.getMany();
    await this.ordersRepo.save(order);
    return order;
  }

  async getUserOrders(
    query: GetOrdersDto,
    userId: number,
  ): Promise<Paginated<Order>> {
    const [data, total] = await this.ordersRepo.findAndCount({
      where: { user_id: userId },
      relations: ['products'],
      order: { created_at: 'DESC' },
      take: query.limit,
      skip: query.offset,
    });
    return { total: total, data: data };
  }

  async getOneOrder(params: GetOneOrderParamDto) {
    const order = await this.ordersRepo.findOneOrFailHttp({
      where: { id: params.orderId, user_id: params.userId },
      relations: ['products'],
    });
    return order;
  }
}
