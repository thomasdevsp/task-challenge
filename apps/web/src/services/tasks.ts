import { api } from "@/lib/api"
import type { TaskStatus } from "@/types/types"
import type { GetTasksReponse } from "./types/types"

export const taskService = {
  getTasks: async (status: TaskStatus, page: number = 1, size: number = 10): Promise<GetTasksReponse> => {
    const {data} = await api.get('/tasks', {
      params: {
        status,
        page,
        size
      }
    })

    return data
  }
}
