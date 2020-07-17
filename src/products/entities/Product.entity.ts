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
  OneToMany,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../../users/entities/User.entity';
import { Category } from '../../categories/entities/Category.entity';
import { Order } from '../../orders/entities/Order.entity';
import { BasketItem } from '../../basket/entities/BasketItem.entity';

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
    type: 'numeric',
    nullable: false,
  })
  price: string | number;

  @ApiProperty()
  @Column({
    type: 'jsonb',
    nullable: false,
  })
  delivery_schedule: string[];

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
  })
  qnt: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
  })
  price_for_qnt: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  qnt_unit: string;

  @ApiProperty({ type: 'number' })
  @Column({ type: 'int' })
  user_id: number;

  @ApiProperty({ type: 'int' })
  @Column({ type: 'int' })
  category_id: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(
    () => User,
    (user: User) => user.products,
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

  @OneToMany(
    () => BasketItem,
    basketItem => basketItem.product,
  )
  basketItems: BasketItem[];
}
