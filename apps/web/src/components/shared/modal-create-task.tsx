import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";

export function ModalCreateTask() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="absolute bottom-0 left-0">Open Dialog</Button>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

          <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input id="username-1" name="username" defaultValue="@peduarte" />
              </div>
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
