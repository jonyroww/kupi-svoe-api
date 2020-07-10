import {
  Entity,
  Column,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '../../products/entities/Product.entity';

@Entity({ name: 'orders' })
export class Order {
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

  @ApiProperty({ type: 'string' })
  @Column({ type: 'varchar' })
  first_name: string;

  @ApiProperty({ type: 'string' })
  @Column({ type: 'varchar' })
  last_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiProperty({ type: 'string' })
  @Index()
  @Column({ type: 'varchar', unique: true, nullable: false })
  phone: string;

  @ApiProperty({ type: 'number', nullable: false })
  @Column({ type: 'int' })
  user_id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  delivery_type: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  payment_type: string;

  @ApiProperty({ type: () => Product })
  @ManyToMany(() => Product, { eager: true })
  @JoinTable({
    name: 'orders_products',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];
}
