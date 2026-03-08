"use client";


import { ChartColumnStacked, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { StatsCard } from "../StatsCard/StatsCard";

interface Stat {
  name: string;
  value: string;
  trend?: "up" | "down"; // optional if not used
  icon: LucideIcon; // Use LucideIcon directly
}

interface StatsSectionProps {
  stats?: Stat[];
  className?: string;
}

const defaultStats: Stat[] = [
  {
    name: "Total Category",
    value: "10,492",
    trend: "down",
    icon: ChartColumnStacked,
  },
  {
    name: "Total Products",
    value: "10,492",
    trend: "down",
    icon: ChartColumnStacked,
  },
  {
    name: "Wasted Products",
    value: "10,492",
    trend: "down",
    icon: ChartColumnStacked,
  },
  {
    name: "Dummy products",
    value: "10,492",
    trend: "down",
    icon: ChartColumnStacked,
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
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          name={stat.name}
          value={stat.value}
          icon={stat.icon}
          // Optionally pass trend if StatsCard supports it
          // trend={stat.trend}
        />
      ))}
    </div>
  );
}
