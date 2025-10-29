
"use client";

import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function UserNav() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const getInitials = (name: string | null) => {
    if (!name) return "G";
    const names = name.split(" ");
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer">
            <div className={cn("p-0.5 rounded-full", { "gradient-border": true })}>
                <Avatar className="h-8 w-8">
                <AvatarImage
                    src={user.photoURL ?? ""}
                    alt={user.displayName ?? "User"}
                    data-ai-hint="user avatar"
                />
                <AvatarFallback>
                    {user.isGuest ? (
                    <UserIcon className="h-4 w-4" />
                    ) : (
                    getInitials(user.displayName)
                    )}
                </AvatarFallback>
                </Avatar>
            </div>
            <div className="hidden sm:flex flex-col text-left">
                 <p className="text-sm font-medium leading-none">
                    {user.displayName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                </p>
            </div>
        </div>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
