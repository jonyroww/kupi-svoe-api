import {
  IsOptional,
  IsArray,
  IsNumber,
  IsString,
  IsAlphanumeric,
  IsDate,
  IsEmail,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformIntArray } from '../../common/utils/transform-array-int.util';
import { TransformInt } from '../../common/utils/transform-int.util';
import { RoleName } from '../../constants/RoleName.enum';

export class RegistrationBodyDto {
  @ApiProperty({ type: 'number' })
  @Transform(TransformInt)
  @IsNumber()
  verification_id: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsAlphanumeric()
  verification_key: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsString()
  first_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsString()
  middle_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsString()
  last_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  password: string;

  @ApiProperty({ enum: RoleName })
  @IsEnum(RoleName)
  role: RoleName;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  auto: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  farm_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  legal_entity_name: string;
}
