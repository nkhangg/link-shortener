import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/stores/user-store";
import { useQuery } from "@tanstack/react-query";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { ConfirmAlert } from "./btn/confirm-alert";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
export interface INavUserProps {}

export default function NavUser(props: INavUserProps) {
  const { user, clearUser } = useUserStore();

  const { data } = useQuery({
    queryKey: ["get-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) return null;
      return data;
    },
    enabled: !!user?.id, // <-- chỉ chạy khi có user.id
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast("Lỗi", { description: error.message });
    }

    clearUser();

    window?.location.reload();
  };

  console.log({ data });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={data?.avatar_url || user?.user_metadata?.avatar_url}
              alt="User"
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none whitespace-normal break-words">
              Người dùng: {data?.full_name || user?.user_metadata?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground whitespace-normal break-words">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ConfirmAlert
            onConfirm={handleLogout}
            title="Đăng xuất khỏi hệ thống ?"
            description="Hành động này sẽ đăng xuất khỏi hệ thống."
          >
            <Button
              variant={"ghost"}
              size={"xs"}
              className="justify-start font-normal text-destructive hover:text-destructive cursor-pointer"
            >
              <LogOut className="text-destructive" />
              Đăng xuất
            </Button>
          </ConfirmAlert>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
