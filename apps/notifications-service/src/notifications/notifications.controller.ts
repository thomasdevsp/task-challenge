import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('task_created')
  async handleTaskCreated(
    @Payload() data: { title: string; userId: number; id: number },
  ) {
    console.log('Evento recebido do RabbitMQ:', data);

    const { userId, title } = data;
    const message = `Uma nova tarefa foi criada: "${title}" `;

    return await this.notificationsService.createNotification(
      userId,
      message,
      data.id,
    );
  }

  @EventPattern('task_updated')
  async handleTaskUpdated(
    @Payload()
    data: {
      taskId: number;
      creatorId: number;
      updatedBy: number;
      title: string;
      changes: string[];
    },
  ) {
    console.log('Comentario Recebido via RabbitMQ:', data);

    const { creatorId, title } = data;

    const message = `A tarefa "${title}" foi atualizada por outro usuário.`;

    console.log(`Alerta de atualização enviado para user: ${creatorId}`);

    return await this.notificationsService.createNotification(
      creatorId,
      message,
      data.taskId,
    );
  }

  @EventPattern('task_comment_created')
  async handleCommentCreated(
    @Payload()
    data: {
      taskId: number;
      creatorId: number;
      authorName: string;
      commentPreview: string;
    },
  ) {
    console.log('Comentario Recebido via RabbitMQ:', data);

    const { creatorId, commentPreview, taskId } = data;

    if (!creatorId) {
      console.error('Ignorando notificação sem creatorId');
      return;
    }

    const message = `Novo comentário na tarefa: ${commentPreview}`;

    return await this.notificationsService.createNotification(
      creatorId,
      message,
      taskId,
    );
  }

  @Get(':userId')
  async getUserNotifications(@Param('userId', ParseIntPipe) userId: number) {
    return await this.notificationsService.getUserNotifications(userId);
  }
}
