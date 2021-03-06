import { IsInt, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBasketItemDto {
  @ApiProperty()
  @IsInt()
  product_id: number;

  @ApiProperty({
    description: `Количество продукта, которое добавляем в корзину.
      Единица измерения количества берется у продукта (product.qnt_unit)`,
  })
  @IsNumber()
  qnt: number;
}
