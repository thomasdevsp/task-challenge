import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email Inválido'),
  password: z.string().min(6, 'A Senha deve ter pelo menos 6 caracteres')
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(2, 'O Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email Inválido'),
  password: z.string().min(6, 'A Senha deve ter pelo menos 6 caracteres')
})

export type RegisterFormValues = z.infer<typeof registerSchema>
