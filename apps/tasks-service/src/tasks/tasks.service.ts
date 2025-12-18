import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Comment } from './entities/comment.entity';
import { TaskHistory } from './entities/task-history.entity';
import { Task } from './entities/task.entity';
import { TaskStatus } from './entities/tasks-status-enum';

@Injectable()
export class TasksService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientProxy,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskHistory)
    private readonly historyRepository: Repository<TaskHistory>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  // --- CRIAÇÃO ---
  async create(createTaskDto: CreateTaskDto, userId: number) {
    const task = this.taskRepository.create({
      ...createTaskDto,
      creatorId: userId,
      status: 'TODO' as TaskStatus,
    });

    const savedTask = await this.taskRepository.save(task);

    await this.logChange(
      savedTask.id,
      userId,
      'CREATED',
      null,
      null,
      'Task Created',
    );

    console.log('📤 Enviando para o RabbitMQ...');
    this.client.emit('task_created', {
      userId: task.creatorId,
      taskId: savedTask.id,
      title: savedTask.title,
      assigneeIds: savedTask.assigneeIds,
      creatorId: userId,
    });

    return savedTask;
  }

  // --- LISTAGEM (Com Paginação) ---
  async findAll(
    page: number = 1,
    size: number = 10,
    status: TaskStatus,
    userId?: number,
  ) {
    const skip = (page - 1) * size;

    const [data, total] = await this.taskRepository.findAndCount({
      skip,
      take: size,
      where: { status: status, creatorId: userId },
      order: { created_at: 'DESC' },
    });

    return {
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / size),
      },
    };
  }

  // --- BUSCA ÚNICA ---
  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['comments', 'history'],
    });

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return task;
  }

  // --- ATUALIZAÇÃO ---
  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new Error(`Tarefa ${id} não encontrada`);
    }

    const fieldsToTrack = [
      'title',
      'description',
      'status',
      'priority',
      'due_date',
    ];

    for (const field of fieldsToTrack) {
      const newValue = updateTaskDto[field as keyof UpdateTaskDto];
      const oldValue = task[field as keyof Task];

      if (
        newValue !== undefined &&
        newValue !== null &&
        newValue !== oldValue
      ) {
        const formatValue = (val: any): string => {
          if (!val) return '';
          if (val instanceof Date) return val.toISOString();
          return String(val);
        };

        const oldStr = formatValue(oldValue);
        const newStr = formatValue(newValue);

        await this.logChange(id, userId, 'UPDATED', field, oldStr, newStr);
      }
    }

    if (updateTaskDto.assigneeIds) {
      await this.logChange(
        id,
        userId,
        'ASSIGNED',
        'assigneeIds',
        JSON.stringify(task.assigneeIds),
        JSON.stringify(updateTaskDto.assigneeIds),
      );
    }

    Object.assign(task, updateTaskDto);
    const updatedTask = await this.taskRepository.save(task);

    if (task.creatorId !== userId) {
      this.client.emit('task_updated', {
        taskId: task.id,
        creatorId: task.creatorId,
        updatedBy: userId,
        title: task.title,
        changes: Object.keys(updateTaskDto), // Opcional: listar o que mudou
      });
    }

    return updatedTask;
  }

  // --- REMOÇÃO DE TAREFA ---
  async remove(id: number) {
    const task = await this.findOne(id);
    return this.taskRepository.remove(task);
  }

  // --- ADIÇÃO DE COMENTARIO ---
  async addComment(taskId: number, dto: CreateCommentDto) {
    const comment = this.commentRepository.create({
      ...dto,
      taskId,
    });

    const savedComment = this.commentRepository.save(comment);

    const task = await this.taskRepository.findOne({ where: { id: taskId } });

    if (task && task.creatorId !== dto.authorId) {
      this.client.emit('task_comment_created', {
        taskId: task.id,
        creatorId: task.creatorId,
        authorName: `Usuário ${dto.authorId}`,
        commentPreview: dto.content.substring(0, 30),
      });
    }

    return savedComment;
  }

  // --- LISTAGEM DE COMENTARIO ---
  async getComments(taskId: number, page: number = 1, size: number = 10) {
    const [results, total] = await this.commentRepository.findAndCount({
      where: { taskId },
      take: size,
      skip: (page - 1) * size,
      order: { created_at: 'DESC' },
    });

    return {
      data: results,
      count: total,
      currentPage: page,
      totalPages: Math.ceil(total / size),
    };
  }

  private async logChange(
    taskId: number,
    userId: number,
    action: string,
    field: string | null,
    oldValue: string | null,
    newValue: string | null,
  ) {
    const historyEntry = new TaskHistory();

    historyEntry.taskId = taskId;
    historyEntry.changed_by = userId;
    historyEntry.action = action;
    historyEntry.field_changed = field!;
    historyEntry.old_value = oldValue!;
    historyEntry.new_value = newValue!;

    return this.historyRepository.save(historyEntry);
  }
}
