import {
  Entity,
  Column,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleName } from '../../constants/RoleName.enum';
import { UserModerationStatus } from '../../constants/UserModerationStatus.enum';
import { PhoneVerification } from '../../auth/entities/Phone-verification.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @ApiProperty({
    type: 'string',
    example: '2019-11-22T16:03:05Z',
    nullable: false,
  })
  @Index()
  @CreateDateColumn({
    nullable: false,
    type: 'timestamp with time zone',
  })
  created_at: Date;

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: Date;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  first_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  middle_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  last_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiProperty({ type: 'string' })
  @Index()
  @Column({ type: 'varchar', unique: true, nullable: false })
  phone: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  avatar: string;

  @ApiProperty({ type: 'string', nullable: false })
  @Column({ type: 'varchar' })
  password: string;

  @ApiPropertyOptional({ enum: RoleName })
  @Column('enum', { enum: RoleName })
  role: RoleName;

  @ApiProperty({ enum: UserModerationStatus })
  @Column('enum', {
    enum: UserModerationStatus,
  })
  moderation_status: UserModerationStatus;

  @ApiPropertyOptional({ example: 'Адрес' })
  @Column({
    type: 'text',
  })
  address: string;

  @ApiPropertyOptional({ description: 'Описание автомобиля' })
  @Column({
    type: 'text',
  })
  auto: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  farm_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  legal_entity_name: string;

  @OneToOne(
    () => PhoneVerification,
    (registration: PhoneVerification) => registration.user,
  )
  registration: PhoneVerification;
}
