/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { ChartColumnStacked } from "lucide-react";
import { StatsCard } from "../StatsCard/StatsCard";

interface StatsData {
  name: string;
  value: string | number;
  icon: any; // LucideIcon
}

const stats: StatsData[] = [
  {
    name: "Total Category",
    value: "10,492",
    icon: ChartColumnStacked,
  },
];

export default function CategoryStatus() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          name={stat.name}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
