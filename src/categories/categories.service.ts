import { Injectable } from '@nestjs/common';
import { Category } from './entities/Category.entity';
import { CategoriesRepository } from './repositories/Categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  /**
   * Возвращает иерархическое дерево категорий.
   * То есть, родительских категорий,
   * а внутри каждой такой категории есть массив дочерних
   * категорий
   */
  async getCategoriesTree(): Promise<Category[]> {
    return this.categoriesRepo.find({
      where: { parent_category_id: null },
      relations: ['children'],
    });
  }

  async findCategories(): Promise<Category[]> {
    return this.categoriesRepo.find();
  }

  async getCategoryOrFailHttp(categoryId: number): Promise<Category> {
    return this.categoriesRepo.findOneOrFailHttp(categoryId);
  }
}
