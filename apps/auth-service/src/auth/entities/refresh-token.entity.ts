import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 512 })
  token_hash: string;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'timestamp with time zone' })
  expires_at: Date;

  @Column({ default: false })
  is_revoked: boolean;

  @Column({ nullable: true })
  device_info: string;
}
