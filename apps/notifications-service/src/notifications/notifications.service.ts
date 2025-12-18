import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly repository: Repository<NotificationEntity>,
    private readonly gateway: NotificationsGateway,
  ) {}

  async createNotification(userId: number, message: string, taskId?: number) {
    const notification = this.repository.create({ userId, message, taskId });
    const saved = await this.repository.save(notification);

    this.gateway.sendNotification(userId, saved);

    return saved;
  }

  async getUserNotifications(userId: number) {
    return this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}
