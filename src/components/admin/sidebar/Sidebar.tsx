"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  Tag,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    href: "/admin",
    current: true,
  },
  {
    name: "User",
    icon: Users,
    href: "/admin/user",
    current: false,
    badge: "12",
  },
  {
    name: "Category",
    icon: ShoppingCart,
    href: "/admin/category",
    current: false,
  },
  {
    name: "Products",
    icon: Package,
    href: "/admin/products",
    current: false,
  },
  {
    name: "Category Request",
    icon: BarChart3,
    href: "/admin/category-request",
    current: false,
  },
  {
    name: "Report",
    icon: TrendingUp,
    href: "/admin/report",
    current: false,
  },
  { name: "FAQ", icon: Tag, href: "/admin/faq", current: false },
  {
    name: "Terms & Conditions",
    icon: Settings,
    href: "/admin/terms-condition",
    current: false,
  },
  {
    name: "Privacy Policy",
    icon: Settings,
    href: "/admin/privacy",
    current: false,
  },
];

export default function Sidebar() {
  const [currentNav, setCurrentNav] = useState("Overview");

  return (
    <aside className="fixed left-0 top-0 h-screen w-70 border-r border-border bg-sidebar flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-sidebar-foreground">
            Admin Dashboard
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setCurrentNav(item.name)}
            className={cn(
              "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              currentNav === item.name
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </div>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

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
    </aside>
  );
}
