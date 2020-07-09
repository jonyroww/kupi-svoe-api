import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserPathDto {
  @ApiProperty()
  @Transform(TransformInt)
  @IsInt()
  userId: number;
}
