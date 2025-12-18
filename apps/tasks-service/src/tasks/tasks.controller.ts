import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './entities/tasks-status-enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('create_task')
  async handleCreate(
    @Payload() data: { createTaskDto: CreateTaskDto; userId: number },
  ) {
    return await this.tasksService.create(data.createTaskDto, data.userId);
  }

  @MessagePattern('find_all_tasks')
  async handleFindAll(
    @Payload()
    data: {
      page: number;
      size: number;
      userId: number;
      status: TaskStatus;
    },
  ) {
    return await this.tasksService.findAll(
      data.page,
      data.size,
      data.status,
      data.userId,
    );
  }

  @MessagePattern('find_one_task')
  async handleFindOne(@Payload() id: number) {
    return await this.tasksService.findOne(id);
  }

  @MessagePattern('update_task')
  async handleUpdate(
    @Payload()
    data: {
      id: number;
      updateTaskDto: UpdateTaskDto;
      userId: number;
    },
  ) {
    return await this.tasksService.update(
      data.id,
      data.updateTaskDto,
      data.userId,
    );
  }

  @MessagePattern('remove_task')
  async handleRemove(@Payload() id: number) {
    return await this.tasksService.remove(id);
  }

  @MessagePattern('create_comment')
  async createComment(
    @Payload() data: { taskId: number; content: string; authorId: number },
  ) {
    const { taskId, ...dto } = data;

    return await this.tasksService.addComment(taskId, dto);
  }

  @MessagePattern('find_comments')
  async findComments(
    @Payload() data: { taskId: number; page: number; size: number },
  ) {
    const { taskId, page, size } = data;

    return await this.tasksService.getComments(taskId, page, size);
  }
}
