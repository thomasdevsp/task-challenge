import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'notifications_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(3002);
  console.log('Microservice (Notifications) is listening via RabbitMQ');
}
bootstrap();
