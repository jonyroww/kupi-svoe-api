import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  payment_type: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  delivery_type: string;
}
