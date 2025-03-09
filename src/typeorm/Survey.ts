import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  description: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  
  @Column('varchar', { length: 255, nullable: true })
  title: string;
  
  @Column('text', { nullable: true })
  file: string;
  
  @Column('varchar', { length: 255, nullable: true, unique: true })
  slug: string;

  @Column('varchar', { length: 255, nullable: true })
  provinsi: string;

  @Column('varchar', { length: 255, nullable: true })
  kota: string;

  @Column('json', { nullable: true })
  surveyResults: any;

  @Column('int', { nullable: true, default: 0 })
  peopleSurveyed:number

  @Column({ default: false })
  active: boolean;
  
  @Column({ default: false })
  highlights: boolean;
  

  @Column('int', { nullable: true, default: 0 })
  amountClicking: number;

  @Column('varchar', { length: 255, nullable: true })
  createBy: string;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
