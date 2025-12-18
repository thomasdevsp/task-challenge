import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ default: true })
  is_active: boolean;

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;

    if (this.password_hash) {
      this.password_hash = await bcrypt.hash(this.password_hash, saltRounds);
    }
  }
}
