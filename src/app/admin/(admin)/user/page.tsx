/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import StatsSection from "@/components/admin/userTable/StatsSection";
import UsersTable from "@/components/admin/userTable/UsersTable";
import { Users } from "lucide-react";

interface Stat {
  name: string;
  value: string;
  trend?: "up" | "down";
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> &
      React.RefAttributes<SVGSVGElement>
  >;
}

const userStats: Stat[] = [
  {
    name: "Total User",
    value: "8,492",
    trend: "down",
    icon: Users,
  },
];

export default function UserPage() {
  const handleRowAction = (action: string, row: any) => {
    console.log(`Action: ${action}, User: ${row.name}`);
  };

  return (
    <div className="text-white ml-70 mt-16">
      <main className="min-h-screen p-8">
        <div className="max-w-9xl mx-auto">
          <StatsSection stats={userStats} />
          <UsersTable onRowAction={handleRowAction} />
        </div>
      </main>
    </div>
  );
}
