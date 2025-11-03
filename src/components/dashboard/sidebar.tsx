
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart3,
  Link2,
  Settings,
  AppWindow,
  CreditCard,
  Boxes,
} from "lucide-react";
import { cn } from "@/lib/utils";
import UserNav from "@/components/dashboard/user-nav";
import { useAuth } from "@/providers/auth-provider";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analysis" },
  { href: "/dashboard/links", icon: Link2, label: "Link list" },
  { href: "/dashboard/settings", icon: Settings, label: "Account settings" },
  { href: "/dashboard/integrations", icon: AppWindow, label: "Apps integration" },
  { href: "/dashboard/subscription", icon: CreditCard, label: "Subscription" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Boxes className="h-6 w-6" />
            <span>KikaSite</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t p-2">
            <UserNav />
        </div>
      </div>
    </aside>
  );
}
