import { Injectable } from '@nestjs/common';
import { BasketItem } from './entities/BasketItem.entity';
import { BasketItemsRepository } from './repositories/BaketItems.respository';
import { ProductRepository } from '../products/repositories/Products.repository';
import { makeError } from '../common/errors';
import { Product } from '../products/entities/Product.entity';

@Injectable()
export class BasketService {
  constructor(
    private readonly basketItemsRepo: BasketItemsRepository,
    private readonly productsRepo: ProductRepository,
  ) {}

  async createBasketItem(
    userId: number,
    productId: number,
  ): Promise<BasketItem> {
    const product = await this.productsRepo.findOneOrFailHttp(productId);

    if (product.user_id === userId) {
      throw makeError('OWN_PRODUCT');
    }

    return await this.basketItemsRepo.save({
      product_id: productId,
      user_id: userId,
    });
  }

  async getBasketItems(userId: number): Promise<BasketItem[]> {
    return this.basketItemsRepo.find({
      where: {
        user_id: userId,
      },
      relations: ['product'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getProductsInBasket(userId: number): Promise<Product[]> {
    return this.productsRepo
      .createQueryBuilder('products')
      .innerJoin(BasketItem, 'basket_items', 'basket_items.user_id = :userId', {
        userId,
      })
      .getMany();
  }

  async deleteProductFromBasket(
    userId: number,
    productId: number,
  ): Promise<void> {
    await this.basketItemsRepo.delete({
      user_id: userId,
      product_id: productId,
    });
  }
}
