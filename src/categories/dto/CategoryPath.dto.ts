import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';
import { IsInt } from 'class-validator';

export class CategoryPathDto {
  @ApiProperty()
  @Transform(TransformInt)
  @IsInt()
  categoryId: number;
}
