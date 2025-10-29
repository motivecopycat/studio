"use client";

import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, loginWithGoogle, loginAsGuest, loading } = useAuth();
  const router = useRouter();
  const [action, setAction] = useState<"google" | "guest" | null>(null);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    setAction("google");
    await loginWithGoogle();
  };

  const handleGuestLogin = () => {
    setAction("guest");
    loginAsGuest();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">
            KikaSite
          </CardTitle>
          <CardDescription>
            The simplest way to manage your affiliate links.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="secondary"
            className="w-full h-12 text-base"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading && action === "google" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-5 w-5" />
            )}
            Continue with Google
          </Button>
          <Button
            className="w-full h-12 text-base"
            onClick={handleGuestLogin}
            disabled={loading}
          >
            {loading && action === "guest" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.logo className="mr-2 h-5 w-5" />
            )}
            Leenux
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
