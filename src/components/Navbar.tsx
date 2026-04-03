"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-400" />
          <span className="text-xl font-bold tracking-tight text-white">
            Yafa<span className="text-primary">AI</span>
          </span>
        </div>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#" className="text-sm font-medium text-muted transition-colors hover:text-white">Features</Link>
          <Link href="#" className="text-sm font-medium text-muted transition-colors hover:text-white">Pricing</Link>
          <Link href="#" className="text-sm font-medium text-muted transition-colors hover:text-white">Showcase</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">Sign In</Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </nav>
  );
}
