import { Injectable } from '@nestjs/common';
import { OrderRepository } from './repositories/Order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/Order.entity';
import { GetOrdersDto } from './dto/get-all-user-orders.dto';
import { BasketService } from '../basket';
import { Paginated } from '../common/interfaces/paginated-entity.interface';
import { GetOneOrderParamDto } from './dto/get-one-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepo: OrderRepository,
    private basketService: BasketService,
  ) {}

  async createOrder(body: CreateOrderDto, userId: number): Promise<Order> {
    const order = this.ordersRepo.create(body);
    order.user_id = userId;
    order.products = await this.basketService.getProductsInBasket(userId);
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
