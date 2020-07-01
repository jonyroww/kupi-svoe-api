import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PhoneVerificationKeyDto {
  @ApiProperty({ type: 'int' })
  @IsNumber()
  id: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  key: string;
}
