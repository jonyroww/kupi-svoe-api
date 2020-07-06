import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/Products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../users/entities/User.entity';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(body: CreateProductDto, user: User) {
    const product = this.productRepository.create(body);
    product.user_id = user.id;
    await this.productRepository.save(product);
    return product;
  }
}
