import Header from "@/components/layout/header";
import { ModalCreateTask } from "@/components/shared/modal-create-task";
import { useAuthStore } from "@/store/auth-store";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute('/(app)/_authenticated')({
  beforeLoad: ({ location }) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated

    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          // Guardamos para onde o usuário queria ir para levá-lo de volta depois
          redirect: location.href,
        },
      })
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <div>
      <Header />
      <ModalCreateTask />
      <Outlet />
    </div>
  )
}
