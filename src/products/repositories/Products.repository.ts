import { Product } from '../entities/Product.entity';
import { EntityRepository } from 'typeorm';
import { CommonBaseRepository } from '../../common/classes/common-repository.class';

@EntityRepository(Product)
export class ProductRepository extends CommonBaseRepository<Product> {}
