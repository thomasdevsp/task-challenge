import { TaskColumn } from '@/components/shared/task-column';
import { useAuthStore } from '@/store/auth-store';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_authenticated/')({
  component: App,
})

function App() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="text-center">
      <main className="min-h-screen grid grid-cols-4 justify-center bg-[#2d2d2f] text-white text-[calc(10px+2vmin)]">
        <TaskColumn title="A FAZER" status="TODO" />

        <TaskColumn title="EM ANDAMENTO" status="IN_PROGRESS" />

        <TaskColumn title="REVISÃO" status="REVIEW" />

        <TaskColumn title="PRONTAS" status="DONE" />

      </main>
    </div>
  )
}
