/* eslint-disable import/order */
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
import type { LoginFormValues } from '@/routes/(auth)/types/schemas'
import { loginSchema } from '@/routes/(auth)/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'

export const Route = createFileRoute('/(auth)/login')({
  component: Login,
})

function Login() {
  const { useLoginMutation } = useAuth()
  const { mutate: login, isPending } = useLoginMutation()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormValues) => login(data)

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-[#2e2f33] ">
      <Card className="w-[400px] py-[2rem] px-[1rem] bg-[#2e2f33] border-[#3b3b3b] shadow-xl/35 text-white">
        <CardHeader>
          <CardTitle className="text-3xl">Login</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-[2rem]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-[0.5rem]">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormInput
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
                    field={field}
                    fieldState={fieldState}
                    placeholder="Senha"
                    type="password"
                  />
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <CardFooter>
            <p className="flex gap-[0.25rem] text-gray-300">
              Não possui uma conta?
              <Link to="/register" className="hover:text-blue-500">
                Registrar-se.
              </Link>
            </p>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}
