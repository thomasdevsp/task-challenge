import { useCreateTask } from '@/hooks/use-tasks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog'
import { FormInput } from '../form-input'
import { createTaskSchema, type CreateTaskValues } from './types/schema'

export function ModalCreateTask() {
  const { mutate: createTask } = useCreateTask()

  const form = useForm<CreateTaskValues>({
    resolver: zodResolver(createTaskSchema),
  })

  const onSubmit = (data: CreateTaskValues) => createTask(data)

  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="absolute bottom-5 left-5 rounded-full cursor-pointer hover:scale-[1.1]"
          >
            <Plus />
          </Button>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

          <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle>Criar nova tarefa</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            <div className="flex">
              <div>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormInput
                      field={field}
                      fieldState={fieldState}
                      placeholder="Titulo"
                      type="text"
                    />
                  )}
                />

                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormInput
                      field={field}
                      fieldState={fieldState}
                      placeholder="Descrição"
                      type="text"
                    />
                  )}
                />

                <Controller
                  name="due_date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormInput
                      field={field}
                      fieldState={fieldState}
                      placeholder=""
                      type="date"
                    />
                  )}
                />

                <Controller
                  name="priority"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormInput
                      field={field}
                      fieldState={fieldState}
                      placeholder="Prioridade"
                      type="text"
                    />
                  )}
                />

                <Controller
                  name="assigneeIds"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormInput
                      field={field}
                      fieldState={fieldState}
                      placeholder="Participantes"
                      type="number"
                    />
                  )}
                />
              </div>

              <div></div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </form>
    </Dialog>
  )
}
