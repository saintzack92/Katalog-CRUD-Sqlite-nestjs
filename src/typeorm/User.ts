import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Changed to UUID for better security and uniqueness

  @Column({ nullable: false, default: '' })
  name: string;

  @Column({ nullable: false, default: '' })
  birthPlace: string;

  @Column({ nullable: true, default: '' })
  email: string;

  @Column({ nullable: false, default: '' })
  password: string;

  @Column({ default: '' })
  roles: string;

  @Column({ default: 0 })
  tokenVersion: number;

  @Column({ default: '' })
  token: string;

  @Column({ default: false })
  active: boolean; // Updated field to match the 'active' property

  @Column({ type: 'date', nullable: true })
  birthDate: Date; // To store the selected date as a Date type

  @Column('simple-array', { nullable: true })
  selectedCustomers: string[]; // Using simple-array to store an array of customer IDs

  @Column({ default: false })
  isValid: boolean;

  // New columns for tracking lifecycle events

  @Column({ default: false })
  isDeleted: boolean; // To indicate if the record is marked as deleted

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date; // Automatically set when a soft delete occurs

  @CreateDateColumn()
  createdAt: Date; // Automatically set when the entity is first created

  @UpdateDateColumn()
  updatedAt: Date; // Automatically set whenever the entity is updated

  @Column({ nullable: true })
  modifiedBy: string; // To track who last modified the entity
  
  @Column({ nullable: true })
  createdBy: string; // To track who last modified the entity
}

