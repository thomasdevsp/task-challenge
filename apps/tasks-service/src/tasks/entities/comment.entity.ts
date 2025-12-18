import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('comments', { schema: 'tasks' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column()
  authorId: number;

  @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column()
  taskId: number;

  @CreateDateColumn()
  created_at: Date;
}
