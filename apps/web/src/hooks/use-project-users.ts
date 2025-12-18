import { api } from "@/lib/api";
import type { User } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useProjectsUsers(taskAssigneeIds: number[]) {
  return useQuery({
    queryKey: ['users', [...taskAssigneeIds].sort()],
    queryFn: async () => {
      if (taskAssigneeIds.length === 0) return []

      const response = await api.post<User[]>('auth/users', {
        assigneeIds: taskAssigneeIds
      })

      return response.data
    },
    select: (users) => {
      const userMap = new Map<number, User>()
      users.forEach(user => userMap.set(user.id, user))
      return userMap
    },
    enabled: taskAssigneeIds.length > 0,
    staleTime: 1000 * 60 * 10,
  })
}
