import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  exports: [NotificationsService],
  providers: [NotificationsService, NotificationsGateway],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
