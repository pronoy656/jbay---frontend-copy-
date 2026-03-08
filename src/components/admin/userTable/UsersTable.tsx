
"use client";

import Table from "../common/Table/Table";
import { StatusBadge } from "../common/StatusBadge/StatusBadge";

interface User {
  id: string;
  name: string;
  email: string;
  userId: string;
  joinDate: string;
  status: "active" | "blocked";
}

interface UsersTableProps {
  data?: User[];
  onRowAction?: (action: string, row: User) => void;
}

const defaultData: User[] = Array.from({ length: 11 }, (_, i) => ({
  id: `${i + 1}`,
  name: "Shakhawat",
  email: "example@gmail.com",
  userId: "4213354",
  joinDate: "2-12-2025",
  status: i % 2 === 0 ? "active" : "blocked",
}));

export default function UsersTable({
  data = defaultData,
  onRowAction,
}: UsersTableProps) {
  const handleAction = (action: string, row: User) => {
    onRowAction?.(action, row);
  };

  return (
    <Table
      columns={[
        { key: "name", label: "User Name" },
        { key: "email", label: "User Email" },
        { key: "userId", label: "User ID" },
        {
          key: "joinDate",
          label: "Date of Joining",
          sortable: true,
        },
        {
          key: "status",
          label: "User Status",
          render: (value: string) => (
            <StatusBadge status={value as "active" | "blocked"} />
          ),
        },
      ]}
      data={data}
      searchableFields={["name", "email", "userId"]}
      itemsPerPage={10}
      rowActions={[
        { label: "View", action: "view" },
        { label: "Edit", action: "edit" },
        { label: "Delete", action: "delete" },
      ]}
      onRowAction={handleAction}
    />
  );
}
