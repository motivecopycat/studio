
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
import { ChevronsUpDown, LogOut, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const otherUsers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
  },
];


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
        <button className="flex items-center w-full text-left p-2 rounded-lg hover:bg-muted transition-colors">
          <div className="flex items-center gap-3">
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
            <div className="flex flex-col text-left">
              <p className="text-sm font-medium leading-none truncate">
                {user.displayName}
              </p>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 ml-auto text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {otherUsers.map((otherUser) => (
            <DropdownMenuItem key={otherUser.email} className="cursor-pointer">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                <AvatarFallback>{getInitials(otherUser.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>{otherUser.name}</span>
                <span className="text-xs text-muted-foreground">{otherUser.email}</span>
              </div>
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
