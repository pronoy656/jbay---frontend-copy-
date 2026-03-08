"use client";

import { cn } from "@/lib/utils";
import { StatsCard } from "../StatsCard/StatsCard";
import { Users, type LucideIcon } from "lucide-react";

interface Stat {
  name: string;
  value: string;
  trend?: "up" | "down";
  icon: LucideIcon;
}

interface StatsSectionProps {
  stats?: Stat[];
  className?: string;
}

const defaultStats: Stat[] = [
  {
    name: "Total User",
    value: "8,492",
    trend: "down",
    icon: Users,
  },
];

export default function StatsSection({
  stats = defaultStats,
  className,
}: StatsSectionProps) {
  return (
    <div
      className={cn(
        "grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16",
        className
      )}
    >
      {stats.map((stat) => (
        <StatsCard
          key={stat.name}
          name={stat.name}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
