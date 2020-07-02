import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailTokenDto {
  @ApiProperty({ type: 'varchar' })
  @IsString()
  token: string;
}
