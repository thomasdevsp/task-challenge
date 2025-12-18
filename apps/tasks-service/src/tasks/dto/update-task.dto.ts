import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../entities/tasks-status-enum';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
