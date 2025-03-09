// product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductMadeOf } from './ProductMadeOf';

@Entity()
export class Product {
@PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('float')
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column(type => ProductMadeOf)
  madeOf: ProductMadeOf;

  @Column({ nullable: true })
  image: string;  
  
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
