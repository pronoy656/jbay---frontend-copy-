import React from "react";
import { StatsCard } from "../StatsCard/StatsCard";
import { ChartColumnStacked } from "lucide-react";

const stats = [
  {
    name: "Total Category Request",
    value: "10,492",
    trend: "down",
    icon: ChartColumnStacked,
  },
  {
    name: "Total Accepted Category",
    value: "10,492",
    trend: "down",
    icon: ChartColumnStacked,
  },
  {
    name: "Total Rejected Category",
    value: "10,492",
    trend: "down",
    icon: ChartColumnStacked,
  },
];

export default function CategoryStats() {
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
