import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../../users/entities/User.entity';
import { Category } from '../../categories/entities/Category.entity';
import { Order } from '../../orders/entities/Order.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty()
  @PrimaryColumn({
    type: 'int',
    generated: true,
    readonly: true,
  })
  id: number;

  @ApiProperty({
    type: 'string',
    example: '2019-11-22T16:03:05Z',
    nullable: false,
  })
  @CreateDateColumn({
    nullable: false,
    type: 'timestamp with time zone',
  })
  created_at: Date;

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: false })
  updated_at: Date;

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: Date;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  package_type: string;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
  })
  price: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  delivery_schedule: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  storage_period: string;

  /**
   * Дата сборки урожая
   *
   */
  @ApiPropertyOptional({ type: 'string', description: 'Дата сборки урожая' })
  @Column({ type: 'date' })
  collection_date: Date;

  @ApiProperty({ type: 'number' })
  @Column({ type: 'int' })
  user_id: number;

  @ApiProperty({ type: 'int' })
  @Column({ type: 'int' })
  category_id: number;

  @ApiPropertyOptional()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(
    () => User,
    (user: User) => user.product,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => Category,
    (category: Category) => category.product,
  )
  @JoinColumn({ name: 'category_id' })
  @ApiProperty({ type: () => Category })
  category: Category;

  @ApiProperty({ type: () => Order })
  @ManyToMany(
    () => Order,
    order => order.products,
  )
  orders: Product[];
}
