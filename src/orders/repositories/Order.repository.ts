import { Order } from '../entities/Order.entity';
import { EntityRepository } from 'typeorm';
import { CommonBaseRepository } from '../../common/classes/common-repository.class';

@EntityRepository(Order)
export class OrderRepository extends CommonBaseRepository<Order> {}
