import { FindOneOptions, FindConditions, ObjectID } from 'typeorm';
import { makeError, ErrorCode } from '../errors';
import { Type } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Category } from '../../categories/entities/Category.entity';
import { Product } from '../../products/entities/Product.entity';

const entitiesMappedToErrorCodes = new Map<Type<any>, ErrorCode>([
  [Category, 'CATEGORY_NOT_FOUND'],
  [Product, 'PRODUCT_NOT_FOUND'],
]);

export class CommonBaseRepository<Entity> extends BaseRepository<Entity> {
  findOneOrFailHttp(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;

  findOneOrFailHttp(options?: FindOneOptions<Entity>): Promise<Entity>;

  findOneOrFailHttp(
    conditions?: FindConditions<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;

  async findOneOrFailHttp(
    idOrOptionsOrConditions?:
      | string
      | number
      | FindOneOptions<Entity>
      | FindConditions<Entity>
      | Date
      | ObjectID,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity> {
    const entity = await this.findOne(idOrOptionsOrConditions as any, options);

    if (!entity) {
      const errorCode: ErrorCode =
        entitiesMappedToErrorCodes.get(this.target as any) || 'NOT_FOUND';

      throw makeError(errorCode);
    }

    return entity;
  }
}
