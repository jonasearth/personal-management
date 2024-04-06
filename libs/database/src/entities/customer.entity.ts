import { CustomerSettings } from '@libs/types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  Index,
} from 'typeorm';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @ApiProperty({ type: String, format: 'uuid' })
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  customerId: string;

  @ApiProperty()
  @Index('customer-email-idx', { unique: true, where: '"deleted_at" IS NULL' })
  @Expose()
  @Column('varchar', {})
  email: string;

  @Exclude()
  @Column('varchar', { nullable: false })
  password: string;

  @ApiProperty()
  @Expose()
  @Column('jsonb', { nullable: true })
  settings: CustomerSettings;

  @ApiProperty()
  @Expose()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  @Expose()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
