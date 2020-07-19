import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateBasketItemDto {
  @ApiProperty({
    description: `Количество продукта, которое добавляем в корзину.
      Единица измерения количества берется у продукта (product.qnt_unit)`,
  })
  @IsNumber()
  @IsOptional()
  qnt: number;
}
