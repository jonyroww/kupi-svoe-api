import {
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';
import { DeliverySchedule } from '../../constants/DeliverySchedule.enum';

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

  @ApiProperty({ type: 'number' })
  @IsOptional()
  @Transform(TransformInt)
  @IsNumber()
  price_for_qnt: number;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  qnt_unit: string;

  @ApiProperty({ enum: DeliverySchedule })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsEnum(DeliverySchedule)
  delivery_schedule: string[];

  @ApiProperty({ type: 'number' })
  @IsOptional()
  @IsNumber()
  @Transform(TransformInt)
  category_id: number;
}
