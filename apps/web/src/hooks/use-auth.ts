import { api } from "@/lib/api"
import type { LoginFormValues, RegisterFormValues } from "@/routes/(auth)/types/schemas"
import { useAuthStore } from "@/store/auth-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

export function useAuth() {
  const queryClient = useQueryClient()

  const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: LoginFormValues) => {
      const { data } = await api.post('auth/login', credentials)
      console.log("Logando", data);

      return data
    },

    onSuccess: (data) => {
      login(data.user, data.accessToken)

      toast.success("Logando...", {
        description: "...Redirecionando para a home",
        action: {
          label: "Ok!",
          onClick: () => console.log("Undo"),
        },
      })

      navigate({to: '/'})
    },
    onError: () => {
      toast.error("Falha no login", {
        description: "seu login falhou, tente novamente",
        action: {
          label: "Ok!",
          onClick: () => console.log("Undo"),
        },
      })

    }
  })

  }

  const useRegisterMutation = () => {
  const navigate = useNavigate()

    return useMutation({
      mutationFn: async (data: RegisterFormValues) => {
        const response = await api.post('/auth/register', data)
        console.log(data);
        return response.data
      },
      onSuccess: (userData) => {
        queryClient.setQueryData(['user'], userData)

        toast.success("Registrado com sucesso")

        navigate({to: '/login'})

      },
      onError: (error: any) => {
        console.log(error);
        toast.error("Falha no registro", {
        description: "seu registro falhou, tente novamente",
        action: {
          label: "Ok!",
          onClick: () => console.log("Undo"),
        },
      })
      }
    })

  }

  return {
    useLoginMutation,
    useRegisterMutation
  }
}
