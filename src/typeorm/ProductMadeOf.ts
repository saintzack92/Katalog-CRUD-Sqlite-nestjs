// product-madeof.entity.ts
import { Column } from 'typeorm';

export class ProductMadeOf {
  @Column({ nullable: true })
  chili: string;

  @Column({ nullable: true })
  rice: string;

  @Column({ nullable: true })
  sugar: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true })
  pepper: string;

  @Column({ nullable: true })
  ice: string;

  @Column({ nullable: true })
  cream: string;

  @Column({ nullable: true })
  milk: string;

  @Column({ nullable: true })
  biscuit: string;

  @Column({ nullable: true })
  grass: string;
}
