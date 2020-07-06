import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/Products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../users/entities/User.entity';
import { Product } from './entities/Product.entity';
import { GetAllQueryDto } from './dto/get-all.dto';
import { Order } from '../constants/Order.enum';
import { Paginated } from '../common/interfaces/paginated-entity.interface';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(body: CreateProductDto, user: User): Promise<Product> {
    const product = this.productRepository.create(body);
    product.user_id = user.id;
    await this.productRepository.save(product);
    return product;
  }

  async getAllProducts(query: GetAllQueryDto): Promise<Paginated<Product>> {
    const qb = this.productRepository.createQueryBuilder('products');

    qb.where('products.deleted_at is null');

    if (query.q) {
      qb.addSelect(`word_similarity (:q, "title")`, 'similarity_rank');
      qb.andWhere(`:q <% "title"`);
      qb.setParameter('q', query.q);
    }

    if (query.category_id) {
      qb.andWhere('products.category_id = :category_id', {
        category_id: query.category_id,
      });
    }

    qb.andWhere('products.price >= :price_from', {
      price_from: query.price_from || 0,
    });

    if (query.price_to) {
      qb.andWhere('products.price < :price_to', {
        price_to: query.price_to,
      });
    }

    if (query.sort && query.order) {
      qb.orderBy(query.sort, query.order || Order.ASC);
    }

    const [data, total] = await qb
      .take(query.limit)
      .offset(query.offset)
      .getManyAndCount();
    return { total: total, data: data };
  }
}
