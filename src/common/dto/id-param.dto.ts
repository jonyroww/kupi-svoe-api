import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformInt } from '../utils/transform-int.util';

export class IdParamDto {
  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  id: number;
}
