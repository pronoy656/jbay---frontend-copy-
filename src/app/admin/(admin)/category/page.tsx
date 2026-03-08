/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import CategoryStatus from "@/components/admin/categoryTable/CategoryStatus";
import CategoryTable from "@/components/admin/categoryTable/CategoryTable";
import React from "react";

export default function CategoryPage() {
  const handleCategoryAction = (action: string, row: any) => {
    console.log(`Action: ${action}, Category: ${row.name}`);
  };

  return (
    <div className="text-white ml-70 mt-16">
      <main className="min-h-screen p-8">
        <div className="max-w-9xl mx-auto">
          <CategoryStatus />
          <CategoryTable onRowAction={handleCategoryAction} />
        </div>
      </main>
    </div>
  );
}
