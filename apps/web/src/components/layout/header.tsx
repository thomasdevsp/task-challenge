import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function Header() {
  const logout = useAuthStore((state) => state.logout)


  return (
    <header className="p-4 flex items-center justify-end bg-[#2b2b2d] border-b-1 border-[#3c3d3f] text-white shadow-lg">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback >
              SF
            </AvatarFallback>
          </Avatar>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
