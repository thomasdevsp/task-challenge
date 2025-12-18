import type { Task } from "@/types/types";

export interface GetTasksReponse {
  data: Task[],
  meta: {
    last_page: number;
    page: string;
    total: number
  }
}
