import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('followed_tokens')
@Unique(['userId', 'symbol'])
export class FollowedToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  userId: string;

  @Column({ length: 4 })
  symbol: string;

  @CreateDateColumn()
  createdAt: Date;
}
