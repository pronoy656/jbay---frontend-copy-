/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card } from "@/components/ui/card";
import { ChartColumnStacked } from "lucide-react";
import React from "react";
import Table from "../common/Table/Table";
import { cn } from "@/lib/utils";
import { StatusBadge } from "../common/StatusBadge/StatusBadge";

// Stat Card
const stats = [
  {
    name: "Total Report",
    value: "10,492",
    trend: "down",
    icon: ChartColumnStacked,
  },
  {
    name: "Total resolved Report",
    value: "10,492",
    trend: "down",
    icon: ChartColumnStacked,
  },
  {
    name: "Total Pending Report",
    value: "10,492",
    trend: "down",
    icon: ChartColumnStacked,
  },
];

const REPORT_DATA = [
  {
    id: "1",
    reportId: "787****",
    email: "example@gmail.com",
    reporter: "Jhon Doe",
    status: "resolved",
    date: "2-12-2025",
  },
  {
    id: "2",
    reportId: "787****",
    email: "example@gmail.com",
    reporter: "Jhon Doe",
    status: "pending",
    date: "2-12-2025",
  },
  {
    id: "3",
    reportId: "787****",
    email: "example@gmail.com",
    reporter: "Jhon Doe",
    status: "resolved",
    date: "2-12-2025",
  },
  {
    id: "4",
    reportId: "787****",
    email: "example@gmail.com",
    reporter: "Jhon Doe",
    status: "resolved",
    date: "2-12-2025",
  },
  {
    id: "5",
    reportId: "787****",
    email: "example@gmail.com",
    reporter: "Jhon Doe",
    status: "pending",
    date: "2-12-2025",
  },
  {
    id: "6",
    reportId: "787****",
    email: "example@gmail.com",
    reporter: "Jhon Doe",
    status: "pending",
    date: "2-12-2025",
  },
  {
    id: "7",
    reportId: "787****",
    email: "example@gmail.com",
    reporter: "Jhon Doe",
    status: "resolved",
    date: "2-12-2025",
  },
  {
    id: "8",
    reportId: "787****",
    email: "example@gmail.com",
    reporter: "Jhon Doe",
    status: "pending",
    date: "2-12-2025",
  },
  {
    id: "9",
    reportId: "787****",
    email: "example@gmail.com",
    reporter: "Jhon Doe",
    status: "resolved",
    date: "2-12-2025",
  },
  {
    id: "10",
    reportId: "787****",
    email: "example@gmail.com",
    reporter: "Jhon Doe",
    status: "pending",
    date: "2-12-2025",
  },
];

export default function ReportsTable() {
  const handleReportAction = (action: string, row: any) => {
    console.log(`Action: ${action}, Report: ${row.reportId}`);
  };
  return (
    <div>
      {" "}
      <main className="min-h-screen p-8">
        <div className="max-w-9xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {stats.map((stat) => (
              <Card
                key={stat.name}
                className="group relative overflow-hidden glass-card hover:border-primary/30 transition-all duration-300 p-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                        stat.trend === "up"
                          ? "bg-primary/15 group-hover:bg-primary/25 premium-glow"
                          : "bg-primary/15 group-hover:bg-primary/25 premium-glow"
                      )}
                    >
                      <stat.icon
                        className={cn(
                          "w-6 h-6 transition-colors duration-300",
                          stat.trend === "up" ? "text-primary" : "text-primary"
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {stat.name}
                    </h3>
                    <p className="text-3xl font-bold text-card-foreground tracking-tight">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Table
            columns={[
              {
                key: "reportId",
                label: "Report ID",
              },
              {
                key: "email",
                label: "User Email",
              },
              {
                key: "reporter",
                label: "Reporter",
              },
              {
                key: "status",
                label: "Status",
                render: (value: any) => <StatusBadge status={value} />,
              },
              {
                key: "date",
                label: "Report Date",
              },
            ]}
            data={REPORT_DATA}
            searchableFields={["reportId", "email", "reporter"]}
            itemsPerPage={10}
            rowActions={[
              { label: "View", action: "view" },
              { label: "Resolve", action: "resolve" },
            ]}
            onRowAction={handleReportAction}
          />
        </div>
      </main>
    </div>
  );
}
