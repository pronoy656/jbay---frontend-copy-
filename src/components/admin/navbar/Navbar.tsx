"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 border-b border-border bg-card flex items-center justify-between px-6 lg:px-8 z-30">
      <div className="flex items-center gap-4 flex-1"></div>

      <div className="flex items-center gap-3">
        <Link href={"/admin/notification"}>
          <Button variant="ghost" size="icon" className="relative border ">
            <Bell className="w-16 h-16" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>
        </Link>
        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                John Doe
              </p>
              <p className="text-xs text-muted-foreground truncate">
                admin@shop.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
