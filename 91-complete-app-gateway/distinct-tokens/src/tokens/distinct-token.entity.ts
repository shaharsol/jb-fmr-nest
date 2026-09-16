import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('distinct_tokens')
export class DistinctToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 4 })
  symbol: string;

  @CreateDateColumn()
  createdAt: Date;
}
