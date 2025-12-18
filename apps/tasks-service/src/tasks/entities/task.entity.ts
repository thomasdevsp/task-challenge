import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { TaskHistory } from './task-history.entity';
import { TaskPriority, TaskStatus } from './tasks-status-enum';

@Entity('tasks', { schema: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  due_date: Date;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column()
  creatorId: number;

  @Column('int', { array: true, default: [] })
  assigneeIds: number[];

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @OneToMany(() => TaskHistory, (history) => history.task)
  history: TaskHistory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
