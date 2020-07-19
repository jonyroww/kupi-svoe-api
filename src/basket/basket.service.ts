import { Injectable } from '@nestjs/common';
import { BasketItem } from './entities/BasketItem.entity';
import { BasketItemsRepository } from './repositories/BasketItems.repository';
import { ProductRepository } from '../products/repositories/Products.repository';
import { makeError } from '../common/errors';
import { Product } from '../products/entities/Product.entity';
import { CreateBasketItemDto } from './dto/CreateBasketItem.dto';
import { UpdateBasketItemDto } from './dto/UpdateBasketItem.dto';
import { Transactional, Propagation } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class BasketService {
  constructor(
    private readonly basketItemsRepo: BasketItemsRepository,
    private readonly productsRepo: ProductRepository,
  ) {}

  async createBasketItem(
    userId: number,
    basketItemCreationData: CreateBasketItemDto,
  ): Promise<BasketItem> {
    const product = await this.productsRepo.findOneOrFailHttp(
      basketItemCreationData.product_id,
    );

    if (product.user_id === userId) {
      throw makeError('OWN_PRODUCT');
    }

    // TODO: проверить, есть ли в наличии то количество, которое пытаемся
    // добавить в корзину

    try {
      return await this.basketItemsRepo.save({
        ...basketItemCreationData,
        user_id: userId,
      });
    } catch (err) {
      if (
        await this.basketItemsRepo.count({
          user_id: userId,
          product_id: basketItemCreationData.product_id,
        })
      ) {
        throw makeError('SUCH_BASKET_ITEM_ALREADY_EXISTS');
      }

      throw err;
    }
  }

  /**
   *
   * @param userId юзер, который делает выполняет данную операцию, и которому принадлежит место в корзине basketItemId
   * @param basketItemId место в корзине, на котором выполняется операция обновления
   * @param updateData данные для обновления места в корзине
   */
  async updateBasketItem(
    userId: number,
    basketItemId: number,
    updateData: UpdateBasketItemDto,
  ): Promise<BasketItem> {
    const basketItem = await this.basketItemsRepo.findOneOrFailHttp({
      id: basketItemId,
      user_id: userId,
    });

    // TODO: проверить, есть ли в наличии то количество, которое пытаемся
    // добавить в корзину
    if (updateData.qnt) {
      basketItem.qnt = updateData.qnt;
    }

    await this.basketItemsRepo.save(basketItem);

    return basketItem;
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

  @Transactional({ propagation: Propagation.SUPPORTS })
  async getProductsInBasket(userId: number): Promise<Product[]> {
    return this.productsRepo
      .createQueryBuilder('products')
      .innerJoin(
        'products.basketItems',
        'basketItems',
        'basketItems.user_id = :userId',
        {
          userId,
        },
      )
      .getMany();
  }

  async deleteUsersBasketItem(
    userId: number,
    basketItemId: number,
  ): Promise<void> {
    await this.basketItemsRepo.delete({
      id: basketItemId,
      user_id: userId,
    });
  }
}
