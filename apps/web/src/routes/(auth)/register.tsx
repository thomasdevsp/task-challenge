import { FormInput } from '@/components/shared/form-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import type { RegisterFormValues } from './types/schemas'
import { registerSchema } from './types/schemas'

export const Route = createFileRoute('/(auth)/register')({
  component: Register,
})

function Register() {
  const { useRegisterMutation } = useAuth()
  const { mutate: register, isPending } = useRegisterMutation()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterFormValues) => register(data)

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-[#2e2f33] ">
      <Card className="w-[400px] py-[2rem] px-[1rem] bg-[#2e2f33] border-[#3b3b3b] shadow-xl/35 text-white">
        <CardHeader>
          <CardTitle className="text-3xl">Registre-se</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-[2rem]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-[0.5rem]">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormInput
                    key={'name'}
                    field={field}
                    fieldState={fieldState}
                    placeholder="Nome"
                    type="text"
                  />
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormInput
                    key={'email'}
                    field={field}
                    fieldState={fieldState}
                    placeholder="Email"
                    type="email"
                  />
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormInput
                    key={'password'}
                    field={field}
                    fieldState={fieldState}
                    placeholder="Senha"
                    type="password"
                  />
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Registrando...' : 'Registrar'}
            </Button>
          </form>

          <CardFooter className="flex justify-center">
            <p className="flex gap-[0.25rem] text-gray-300">
              Já possui uma conta?
              <Link to="/login" className="hover:text-blue-500">
                Login.
              </Link>
            </p>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}
