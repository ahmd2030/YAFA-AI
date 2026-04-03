"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Settings, History, ShieldCheck, Home as HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
    { name: "History", href: "/admin/history", icon: <History className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/5 bg-surface/30 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-12 px-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-white tracking-tighter">Admin Panel</span>
        </div>

        <nav className="space-y-1 flex-grow">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(124,58,237,0.1)]" 
                    : "text-muted hover:text-white hover:bg-white/5"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <Link 
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-white hover:bg-white/10 transition-all text-sm"
          >
            <HomeIcon className="w-4 h-4" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
