import { IsNumber, IsString, IsDate, IsISO8601 } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';

export class CreateProductDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  title: string;

  @ApiProperty({ type: 'number' })
  @Transform(TransformInt)
  @IsNumber()
  price: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  package_type: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  delivery_schedule: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsString()
  storage_period: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsISO8601()
  @Type(() => Date)
  @IsDate()
  collection_date: Date;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  category_id: number;

  @ApiPropertyOptional({ type: 'string' })
  @IsString()
  description: string;
}
