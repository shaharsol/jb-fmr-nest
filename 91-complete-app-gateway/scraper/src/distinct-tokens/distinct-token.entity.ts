import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

/** Read-only mirror of 11-distinct-tokens table. */
@Entity('distinct_tokens')
export class DistinctToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 4 })
  symbol: string;

  @CreateDateColumn()
  createdAt: Date;
}
