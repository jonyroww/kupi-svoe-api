import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';

export class UpdateProductDto {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ type: 'number' })
  @IsOptional()
  @Transform(TransformInt)
  @IsNumber()
  price: number;

  @ApiProperty({ type: 'number' })
  @Transform(TransformInt)
  @IsOptional()
  @IsNumber()
  qnt: number;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  qnt_unit: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  delivery_schedule: string;

  @ApiProperty({ type: 'number' })
  @IsOptional()
  @IsNumber()
  @Transform(TransformInt)
  category_id: number;
}
