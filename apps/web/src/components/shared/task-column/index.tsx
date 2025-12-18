import { useProjectsUsers } from '@/hooks/use-project-users'
import { useTasksByStatus } from '@/hooks/use-tasks'
import type { TaskStatus } from '@/types/types'
import { useMemo } from 'react'
import { Skeleton } from '../../ui/skeleton'
import { TaskCard } from '../task-card'

interface TaskColumnProps {
  title: string
  status: TaskStatus
}

export function TaskColumn({ title, status }: TaskColumnProps) {
  const { data: taskResponse, isLoading, isError } = useTasksByStatus(status)

  const assigneeIds = useMemo(() => {
    return Array.from(
      new Set(taskResponse?.data.flatMap((t) => t.assigneeIds) || []),
    )
  }, [taskResponse?.data])

  const { data: userMap } = useProjectsUsers(assigneeIds)

  if (isLoading)
    return (
      <div className="p-[2rem] flex flex-col gap-[2rem]">
        <Skeleton className="h-4 w-[50%]" />
        <Skeleton className="h-24 w-full" />
      </div>
    )

  return (
    <div className="p-[2rem] flex flex-col gap-[2rem] border-r-1 border-[#3c3d3f]">
      <h3 className="text-[1.25rem] font-medium text-[#c2c2c7]">{title}</h3>

      {taskResponse?.data.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          assignees={task.assigneeIds
            .map((id) => userMap?.get(id))
            .filter(Boolean)}
        />
      ))}
    </div>
  )
}
