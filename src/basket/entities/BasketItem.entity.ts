import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '../../products/entities/Product.entity';
import { User } from '../../users/entities/User.entity';

@Entity({ name: 'basket_items' })
export class BasketItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: 'string', format: 'datetime' })
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @ApiProperty()
  @Column({ type: 'integer', nullable: false })
  product_id: number;

  @ApiPropertyOptional({ type: () => Product })
  @ManyToOne(
    () => Product,
    product => product.basketItems,
  )
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
