/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Table from "../common/Table/Table";
import { StatusBadge } from "../common/StatusBadge/StatusBadge";

const REQUEST_DATA = [
  {
    id: "1",
    category: "Engine",
    reason: "I need more sell so that............",
    email: "example@gmail.com",
    status: "accepted",
    date: "2-12-2025",
  },
  {
    id: "2",
    category: "Engine",
    reason: "I need more sell so that............",
    email: "example@gmail.com",
    status: "rejected",
    date: "2-12-2025",
  },
  {
    id: "3",
    category: "Engine",
    reason: "I need more sell so that............",
    email: "example@gmail.com",
    status: "accepted",
    date: "2-12-2025",
  },
  {
    id: "4",
    category: "Engine",
    reason: "I need more sell so that............",
    email: "example@gmail.com",
    status: "accepted",
    date: "2-12-2025",
  },
  {
    id: "5",
    category: "Engine",
    reason: "I need more sell so that............",
    email: "example@gmail.com",
    status: "rejected",
    date: "2-12-2025",
  },
  {
    id: "6",
    category: "Engine",
    reason: "I need more sell so that............",
    email: "example@gmail.com",
    status: "rejected",
    date: "2-12-2025",
  },
  {
    id: "7",
    category: "Engine",
    reason: "I need more sell so that............",
    email: "example@gmail.com",
    status: "accepted",
    date: "2-12-2025",
  },
  {
    id: "8",
    category: "Engine",
    reason: "I need more sell so that............",
    email: "example@gmail.com",
    status: "rejected",
    date: "2-12-2025",
  },
  {
    id: "9",
    category: "Engine",
    reason: "I need more sell so that............",
    email: "example@gmail.com",
    status: "accepted",
    date: "2-12-2025",
  },
  {
    id: "10",
    category: "Engine",
    reason: "I need more sell so that............",
    email: "example@gmail.com",
    status: "accepted",
    date: "2-12-2025",
  },
  {
    id: "11",
    category: "Engine",
    reason: "I need more sell so that............",
    email: "example@gmail.com",
    status: "accepted",
    date: "2-12-2025",
  },
];

interface CategoryRequestTableProps {
  onRowAction?: (action: string, row: any) => void;
}

export default function CategoryRequestTable({
  onRowAction,
}: CategoryRequestTableProps) {
  const handleRequestAction = (action: string, row: any) => {
    onRowAction?.(action, row);
  };

  return (
    <Table
      columns={[
        {
          key: "category",
          label: "Category Name",
        },
        {
          key: "reason",
          label: "Reason",
          render: (value: any) => (
            <span className="text-gray-300 truncate max-w-xs block">
              {value}
            </span>
          ),
        },
        {
          key: "email",
          label: "User Email",
        },
        {
          key: "status",
          label: "Status",
          render: (value: any) => <StatusBadge status={value} />,
        },
        {
          key: "date",
          label: "Date",
        },
      ]}
      data={REQUEST_DATA}
      searchableFields={["category", "email", "reason"]}
      itemsPerPage={10}
      rowActions={[
        { label: "Accept", action: "accepted" },
        { label: "Reject", action: "reject" },
      ]}
      onRowAction={handleRequestAction}
    />
  );
}
