import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './notifications/entities/notification.entity';
import { NotificationsModule } from './notifications/notifications.module';

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
      schema: 'notifications',
      synchronize: true,
      entities: [NotificationEntity],
    }),
    NotificationsModule,
  ],
  providers: [],
})
export class AppModule {}
