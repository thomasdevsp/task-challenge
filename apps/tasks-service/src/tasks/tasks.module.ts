import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { TaskHistory } from './entities/task-history.entity';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'notifications_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Task, TaskHistory, Comment]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
