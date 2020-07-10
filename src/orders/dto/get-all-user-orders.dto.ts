import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../../constants/Order.enum';
import { PaginationFilterDto } from '../../common/dto/pagination-filter.dto';

export class GetOrdersDto extends PaginationFilterDto {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  sort: string;

  @ApiPropertyOptional({ enum: Order })
  @IsOptional()
  @IsEnum(Order)
  order: Order;
}
