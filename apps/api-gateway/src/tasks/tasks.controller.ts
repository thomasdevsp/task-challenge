import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './enum/tasks-status-enum';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(@Inject('TASKS_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser('sub') userId: number) {
    return this.client.send('create_task', { createTaskDto, userId });
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('status') status: TaskStatus,
    @GetUser('sub') userId: number,
  ) {
    return this.client.send('find_all_tasks', { page, size, userId, status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('find_one_task', +id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser('sub') userId: number,
  ) {
    return this.client.send('update_task', { id: +id, updateTaskDto, userId });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('remove_task', +id);
  }

  @Post(':id/comments')
  createComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
    @GetUser('sub') userId: number,
  ) {
    return this.client.send('create_comment', {
      taskId: +id,
      content: createCommentDto.content,
      authorId: userId,
    });
  }

  @Get(':id/comments')
  getComments(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    return this.client.send('find_comments', {
      taskId: +id,
      page,
      size,
    });
  }
}
