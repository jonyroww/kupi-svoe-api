import { Category } from '../entities/Category.entity';
import { EntityRepository } from 'typeorm';
import { CommonBaseRepository } from '../../common/classes/common-repository.class';

@EntityRepository(Category)
export class CategoriesRepository extends CommonBaseRepository<Category> {}
