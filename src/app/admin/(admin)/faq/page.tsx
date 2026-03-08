/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AddFAQModal } from "@/components/admin/faqTable/AddFaqModal";
import FaqHeader from "@/components/admin/faqTable/FaqHeader";
import FaqTable from "@/components/admin/faqTable/FaqTable";
import React, { useState } from "react";


export default function FaqPage() {
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  const handleRowAction = (action: string, row: any) => {
    console.log(`Action: ${action}, FAQ: ${row.question}`);
    // implement edit / delete logic here
  };
  return (
    <div className="text-white ml-70 mt-16">
      <main className="min-h-screen p-8">
        <FaqHeader onOpenModal={() => setIsFAQModalOpen(true)} />

        <FaqTable onAddFAQ={() => {}} onRowAction={handleRowAction} />

        <AddFAQModal
          isOpen={isFAQModalOpen}
          onClose={() => setIsFAQModalOpen(false)}
          onAddFAQ={(q, a) => {
            // The table already adds it locally; you can also call an API here
            console.log("New FAQ ->", { q, a });
          }}
        />
      </main>
    </div>
  );
}
