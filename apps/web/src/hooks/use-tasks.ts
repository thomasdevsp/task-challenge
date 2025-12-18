import { api } from "@/lib/api";
import { taskService } from "@/services/tasks";
import type { CreateTask, TaskStatus } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTasksByStatus(status: TaskStatus, page: number = 1) {
  return useQuery({
    queryKey: ['tasks', {status, page}],
    queryFn: () => taskService.getTasks(status, page),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newTask: CreateTask) => api.post('/task', newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tasks']})
    }
  })
}
