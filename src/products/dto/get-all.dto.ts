import { IsNumber, IsInt, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../../constants/Order.enum';
import { PaginationFilterDto } from '../../common/dto/pagination-filter.dto';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';

export class GetAllQueryDto extends PaginationFilterDto {
  @ApiPropertyOptional({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  @IsOptional()
  @IsInt()
  category_id: number;

  @ApiPropertyOptional({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  @IsOptional()
  @IsInt()
  price_from: number;

  @ApiPropertyOptional({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  @IsOptional()
  @IsInt()
  price_to: number;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  search_text: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  sort: string;

  @ApiPropertyOptional({ enum: Order })
  @IsOptional()
  @IsEnum(Order)
  order: Order;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  q: string;
}
