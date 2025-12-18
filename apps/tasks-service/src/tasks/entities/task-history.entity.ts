import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('task_history', { schema: 'tasks' })
export class TaskHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column({ nullable: true })
  field_changed: string;

  @Column({ nullable: true })
  old_value: string;

  @Column({ nullable: true })
  new_value: string;

  @Column()
  changed_by: number;

  @Column()
  taskId: number;

  @ManyToOne(() => Task, (task) => task.history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @CreateDateColumn()
  created_at: Date;
}
