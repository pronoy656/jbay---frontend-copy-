"use client";

import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function TrafficOverview() {
  const data = [
    { name: "Visitors", value: 65 },
    { name: "Log User", value: 35 },
  ];

  const COLORS = ["#22c55e", "#eab308"];

  return (
    <Card className="p-6 bg-[#171717] border-border hover:border-primary transition-all duration-300 backdrop-blur-sm rounded-2xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-100">
          Traffic Overview
        </h3>
        <p className="text-sm text-slate-400 mt-1">User Type Distribution</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  stroke="#0f172a"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#ffffff" }} // makes the tooltip text white
              labelStyle={{ color: "#ffffff" }}
              formatter={(value) => `${value}%`}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-6 w-full space-y-2">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between px-2"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm text-white">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-white">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
