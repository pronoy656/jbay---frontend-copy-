/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ProductsTable from "@/components/admin/productsTable/ProductsTable";
import StatsSection from "@/components/admin/productsTable/StatsSection";



export default function ProductsPage() {
  const handleRowAction = (action: string, row: any) => {
    console.log(`Action: ${action}, Product: ${row.name}`);
  };

  return (
    <div className="text-white ml-70 mt-16">
      <main className="min-h-screen p-8">
        <div className="max-w-9xl mx-auto">
          <StatsSection />
          <ProductsTable onRowAction={handleRowAction} />
        </div>
      </main>
    </div>
  );
}
