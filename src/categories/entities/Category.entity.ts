import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ type: 'string', format: 'datetime' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ type: 'string', format: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  @ApiPropertyOptional({ type: 'string', format: 'datetime' })
  deleted_at: Date;

  @Column({ type: 'varchar' })
  @ApiProperty()
  title: string;

  @Column({ type: 'varchar' })
  @ApiProperty()
  image_url: string;

  @Column({ type: 'varchar' })
  @ApiPropertyOptional()
  parent_category_id: number;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'parent_category_id' })
  @ApiPropertyOptional({ type: () => Category })
  parent: Category;

  @OneToMany(
    () => Category,
    category => category.parent,
  )
  @ApiProperty({ type: () => Category, isArray: true })
  children: Category[];
}
