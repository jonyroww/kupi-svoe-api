import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';

export class CreateProductDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  title: string;

  @ApiProperty({ type: 'number' })
  @Transform(TransformInt)
  @IsNumber()
  price: number;

  @ApiProperty({ type: 'number' })
  @Transform(TransformInt)
  @IsNumber()
  qnt: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  qnt_unit: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  delivery_schedule: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  category_id: number;
}
