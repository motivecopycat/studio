"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Boxes } from 'lucide-react';
import ThemeSwitcher from '@/components/theme-switcher';
import LanguageSwitcher from '@/components/language-switcher';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
          <Boxes className="h-6 w-6" />
          <span className="font-bold">KikaSite</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Revolutionize Your Affiliate Marketing
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The ultimate platform to track, analyze, and optimize your affiliate campaigns for maximum profitability.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/login"
                  prefetch={false}
                >
                  <Button size="lg">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2026 KikaSite. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
