import type { Task, User } from "@/types/types";
import { CiCalendarDate } from "react-icons/ci";

interface TaskCardProps {
  task: Task;
  assignees: (User | undefined)[]
}

const PriorityStyles = {
  LOW: "border-[#6df045] bg-[#6df045]",
  MEDIUM: "border-[#f2cb64] bg-[#f2cb64]",
  HIGH: "border-[#f08945] bg-[#f08945]",
  URGENT: "border-[#ff0000] bg-[#ff0000]"
} as const;

export function TaskCard({ task, assignees }: TaskCardProps) {
  const currentStyle = PriorityStyles[task.priority as keyof typeof PriorityStyles] || PriorityStyles.LOW

  const [borderColor, bgColor] = currentStyle.split(" ");

  return (
    <div className={`max-w-[300px] w-full p-[1rem] flex flex-col gap-[1rem] bg-[#37383c] rounded-[0.5rem] text-left border-1 ${borderColor}`}>
      <h1>{task.title}</h1>

      <div className={`w-fit p-[0.25rem] ${bgColor} rounded-[0.5rem]`}>
        <p className="text-[0.75rem]">
          {task.priority}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.5rem] opacity-50">
          <CiCalendarDate size={24} />

          <p className="text-[1.15rem]">
            26 out
          </p>

        </div>

        <div className="flex -space-x-2">
          {assignees.map(user => (
            <div
              key={user!.id}
              title={user!.name}
              className="w-8 h-8 rounded-full bg-[#5b5c5e] flex items-center justify-center text-[10px] text-white overflow-hidden"
            >
              {user!.name.charAt(0)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
