import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductInBasketPathDto {
  @ApiProperty()
  @Transform(TransformInt)
  @IsInt()
  userId: number;

  @ApiProperty()
  @Transform(TransformInt)
  @IsInt()
  productId: number;
}
