/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Table from "../common/Table/Table";

const INITIAL_DATA = [
  {
    id: "1",
    question: "Bero et velit interdum, ac aliquet odio mattis.........",
    answer: "Bero et velit interdum, ac aliquet odio mattis.........",
  },
  {
    id: "2",
    question: "Bero et velit interdum, ac aliquet odio mattis.........",
    answer: "Bero et velit interdum, ac aliquet odio mattis.........",
  },
  {
    id: "3",
    question: "Bero et velit interdum, ac aliquet odio mattis.........",
    answer: "Bero et velit interdum, ac aliquet odio mattis.........",
  },
  {
    id: "4",
    question: "Bero et velit interdum, ac aliquet odio mattis.........",
    answer: "Bero et velit interdum, ac aliquet odio mattis.........",
  },
  {
    id: "5",
    question: "Bero et velit interdum, ac aliquet odio mattis.........",
    answer: "Bero et velit interdum, ac aliquet odio mattis.........",
  },
  {
    id: "6",
    question: "Bero et velit interdum, ac aliquet odio mattis.........",
    answer: "Bero et velit interdum, ac aliquet odio mattis.........",
  },

  // … (the other 7 objects – copy-paste from your original file)
];

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FaqTableProps {
  onAddFAQ: (question: string, answer: string) => void;
  onRowAction: (action: string, row: FAQ) => void;
}

export default function FaqTable({ onRowAction }: FaqTableProps) {
  const [faqData] = useState<FAQ[]>(INITIAL_DATA);

  // Helper used by the modal (exposed via prop)

  return (
    <Table
      columns={[
        {
          key: "question",
          label: "FAQ (Question)",
          render: (value: any) => (
            <span className="text-gray-300 truncate max-w-md">{value}</span>
          ),
        },
        {
          key: "answer",
          label: "FAQ (Answer)",
          render: (value: any) => (
            <span className="text-gray-300 truncate max-w-md">{value}</span>
          ),
        },
      ]}
      data={faqData}
      searchableFields={["question", "answer"]}
      itemsPerPage={10}
      rowActions={[
        { label: "Edit", action: "edit" },
        { label: "Delete", action: "delete" },
      ]}
      onRowAction={onRowAction}
    />
  );
}
