import { CommonBaseRepository } from '../../common/classes/common-repository.class';
import { BasketItem } from '../entities/BasketItem.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(BasketItem)
export class BasketItemsRepository extends CommonBaseRepository<BasketItem> {}
