import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBasketItemDto {
  @ApiProperty()
  @IsInt()
  product_id: number;
}
