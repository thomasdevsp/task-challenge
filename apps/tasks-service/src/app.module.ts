import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './tasks/entities/comment.entity';
import { TaskHistory } from './tasks/entities/task-history.entity';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'task_challenge_db',
      schema: 'tasks',
      entities: [Task, Comment, TaskHistory],
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
