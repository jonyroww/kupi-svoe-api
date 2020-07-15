import {
  IsNumber,
  IsString,
  IsDate,
  IsISO8601,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  package_type: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  delivery_schedule: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  storage_period: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsISO8601()
  @Type(() => Date)
  @IsDate()
  collection_date: Date;

  @ApiProperty({ type: 'number' })
  @IsOptional()
  @IsNumber()
  @Transform(TransformInt)
  category_id: number;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  description: string;
}
