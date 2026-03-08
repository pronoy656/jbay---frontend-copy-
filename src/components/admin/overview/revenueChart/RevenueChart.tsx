/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 28000 },
  { month: "Jun", revenue: 32000 },
  { month: "Jul", revenue: 35000 },
  { month: "Aug", revenue: 38000 },
  { month: "Sep", revenue: 42000 },
  { month: "Oct", revenue: 45000 },
  { month: "Nov", revenue: 48000 },
  { month: "Dec", revenue: 52000 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 space-y-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
        <p className="text-sm font-semibold text-foreground">
          {payload[0].payload.month}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-muted-foreground capitalize">
                {entry.name}
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              ${entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  return (
    <Card className="glass-card hover:border-primary/30 transition-all duration-300 p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-card-foreground">
            Revenue Overview{" "}
            <span className="text-red-500">(Under Development)</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5">
            Monthly revenue performance
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary premium-glow" />
            <span className="text-muted-foreground font-medium">Revenue</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="oklch(0.88 0.20 110)"
                stopOpacity={0.4}
              />
              <stop
                offset="50%"
                stopColor="oklch(0.88 0.20 110)"
                stopOpacity={0.2}
              />
              <stop
                offset="100%"
                stopColor="oklch(0.88 0.20 110)"
                stopOpacity={0}
              />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="oklch(0.25 0 0)"
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="month"
            stroke="oklch(0.60 0 0)"
            style={{ fontSize: "13px", fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: "oklch(0.25 0 0)" }}
          />
          <YAxis
            stroke="oklch(0.60 0 0)"
            style={{ fontSize: "13px", fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: "oklch(0.25 0 0)" }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "oklch(0.88 0.20 110)",
              strokeWidth: 1,
              strokeDasharray: "5 5",
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="oklch(0.88 0.20 110)"
            strokeWidth={3}
            fill="url(#colorRevenue)"
            filter="url(#glow)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
