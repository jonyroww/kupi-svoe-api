import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';

export class GetOneOrderParamDto {
  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  orderId: number;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  userId: number;
}
