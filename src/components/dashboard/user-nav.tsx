"use client";

import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  User as UserIcon,
  Home,
  CreditCard,
  Settings,
  Shield,
  Briefcase,
  Plus,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

  const otherUsers = [
    {
      name: "John Doe",
      avatar: "https://picsum.photos/seed/user2/40/40",
      hint: "user avatar",
    },
    {
      name: "Jane Smith",
      avatar: "https://picsum.photos/seed/user3/40/40",
      hint: "user avatar",
    },
    {
      name: "Peter Jones",
      avatar: "https://picsum.photos/seed/user4/40/40",
      hint: "user avatar",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col items-center gap-4 py-4">
            <Avatar className="h-20 w-20">
               <div className={cn("p-1 rounded-full", { "gradient-border": true })}>
                <Avatar className="h-20 w-20">
                    <AvatarImage
                    src={user.photoURL ?? ""}
                    alt={user.displayName ?? "User"}
                    data-ai-hint="user avatar"
                    />
                    <AvatarFallback>
                    {user.isGuest ? (
                        <UserIcon className="h-10 w-10" />
                    ) : (
                        getInitials(user.displayName)
                    )}
                    </AvatarFallback>
                </Avatar>
               </div>
            </Avatar>
            <div className="text-center">
              <p className="text-lg font-semibold leading-none">
                {user.displayName}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-center gap-2 py-2">
          {otherUsers.map((other, index) => (
            <Avatar key={index} className="h-10 w-10">
              <AvatarImage
                src={other.avatar}
                alt={other.name}
                data-ai-hint={other.hint}
              />
              <AvatarFallback>{getInitials(other.name)}</AvatarFallback>
            </Avatar>
          ))}
          <Button variant="ghost" className="h-10 w-10 rounded-full bg-muted">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
             <Link href="/dashboard/settings">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
             </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
             <Link href="/dashboard/projects">
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Projects</span>
                <Badge variant="destructive" className="ml-auto">3</Badge>
             </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
             <Link href="/dashboard/subscription">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Subscription</span>
             </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
             <Link href="/dashboard/security">
                <Shield className="mr-2 h-4 w-4" />
                <span>Security</span>
             </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Account settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
            <CardContent className="p-4 flex items-center gap-4">
               <Rocket className="h-10 w-10 text-white/80" />
               <div className="flex-1">
                <p className="text-lg font-bold">35% OFF</p>
                <p className="text-sm">Power up Productivity!</p>
                <Button variant="secondary" size="sm" className="mt-2 text-primary">Upgrade to Pro</Button>
               </div>
            </CardContent>
          </Card>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
