import { ApiProperty } from '@nestjs/swagger';
import { TransformInt } from '../../common/utils/transform-int.util';
import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class BasketItemPathDto {
  @ApiProperty()
  @Transform(TransformInt)
  @IsInt()
  userId: number;

  @ApiProperty()
  @Transform(TransformInt)
  @IsInt()
  basketItemId: number;
}
