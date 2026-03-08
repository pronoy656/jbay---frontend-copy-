/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card } from "@/components/ui/card"



import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", completed: 245 },
  { month: "Feb", completed: 312 },
  { month: "Mar", completed: 428 },
  { month: "Apr", completed: 385 },
  { month: "May", completed: 512 },
  { month: "Jun", completed: 478 },
  { month: "Jul", completed: 625 },
  { month: "Aug", completed: 598 },
  { month: "Sep", completed: 712 },
  { month: "Oct", completed: 685 },
  { month: "Nov", completed: 745 },
  { month: "Dec", completed: 820 },
]


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20  p-4 space-y-2 rounded-lg">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill }} />
              <span className="text-xs text-white capitalize">{entry.dataKey}</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}


export default function RevenueCompare() {
  return (
    <Card className="glass-card hover:border-primary/30 transition-all duration-300 p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-card-foreground">Completed Orders</h3>
          <p className="text-sm text-muted-foreground mt-1.5">Monthly completed orders overview</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.78 0.18 145)" stopOpacity={1} />
              <stop offset="100%" stopColor="oklch(0.78 0.18 145)" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" strokeOpacity={0.3} />
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
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(0.25 0 0 / 0.3)" }} />
          <Bar dataKey="completed" fill="url(#completedGradient)" radius={[8, 8, 0, 0]} animationDuration={1500} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
