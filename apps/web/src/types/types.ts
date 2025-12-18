export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'

type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

interface TaskHistory {
  id: number;
  action: string;
  field_changed: string;
  old_value: string;
  new_value: string;
  changed_by: number;
  taskId: number;
  task: Task;
  created_at: Date;
}


export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: Date;
  priority: TaskPriority;
  status: TaskStatus;
  creatorId: number;
  assigneeIds: number[];
  comments: Comment[];
  history: TaskHistory[];
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateTask {
    title: string;
    description?: string;
    due_date?: Date;
    priority?: TaskPriority;
    assigneeIds: number[];
 }
