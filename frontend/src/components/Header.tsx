"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/state/authContext";
import { Button } from "./ui/Button";
import { LogOut, LayoutDashboard } from "lucide-react"; // Icons for logout and dashboard

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Only show Header on authenticated routes (e.g., /tasks)
  // Or adjust logic if Header should be visible on other pages with different content
  const showHeader = isAuthenticated && pathname !== "/login" && pathname !== "/signup";

  if (!showHeader) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/tasks" className="flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl hidden sm:inline-block">TaskFlow</span>
        </Link>
        <nav>
          {isAuthenticated && (
            <Button variant="ghost" onClick={handleLogout} className="flex items-center space-x-2">
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline-block">Logout</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}