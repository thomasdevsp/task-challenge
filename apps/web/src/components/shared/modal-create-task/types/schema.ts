import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(5, "O titulo deve conter pelo menos 5 caracteres"),
  description: z.string().min(5, "A descrição deve conter pelo menos 5 caracteres"),
  due_date: z.date().optional(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW", "URGENT"]),
  assigneeIds: z.number()
})

export type CreateTaskValues = z.infer<typeof createTaskSchema>
