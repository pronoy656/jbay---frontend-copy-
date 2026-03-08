/* eslint-disable @typescript-eslint/no-explicit-any */

import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import { StatsCard } from "../../StatsCard/StatsCard";

interface StatsData {
  name: string;
  value: string | number;
  trend?: "up" | "down";
  icon: any; // LucideIcon
}

const stats: StatsData[] = [
  {
    name: "Total Revenue",
    value: "$45,231.89",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Orders",
    value: "2,345",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    name: "Products Sold",
    value: "12,234",
    trend: "up",
    icon: Package,
  },
  {
    name: "Active Customers",
    value: "8,492",
    trend: "down",
    icon: Users,
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
