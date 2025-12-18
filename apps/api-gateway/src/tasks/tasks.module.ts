import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: 'TASKS_SERVICE', // Este nome será o nosso "Token" de injeção
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'tasks_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [TasksController],
  exports: [ClientsModule],
})
export class TasksModule {}
