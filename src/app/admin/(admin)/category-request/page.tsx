"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoryRequestTable from "@/components/admin/categoryReqTable/CategoryReqTable";
import CategoryStats from "@/components/admin/categoryReqTable/CategoryStats";
import React from "react";

export default function CategoryRequestPage() {
  const handleRequestAction = (action: string, row: any) => {
    console.log(`Action: ${action}, Request: ${row.category}`);
  };
  return (
    <main className="text-white ml-70 mt-16">
      <div className="min-h-screen p-8">
        <div className="max-w-9xl mx-auto">
          <CategoryStats />
          <CategoryRequestTable onRowAction={handleRequestAction} />
        </div>
      </div>
    </main>
  );
}
