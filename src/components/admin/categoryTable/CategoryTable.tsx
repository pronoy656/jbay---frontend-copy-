/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React from "react";
import Table from "../common/Table/Table";
import { Settings, Package, Zap, Star, Cpu } from "lucide-react";

const CATEGORY_DATA = [
  {
    id: "1",
    name: "Engine",
    productCount: 123,
    createdDate: "2-12-2025",
    updatedDate: "2-12-2025",
    icon: "settings",
  },
  {
    id: "2",
    name: "Engine",
    productCount: 123,
    createdDate: "2-12-2025",
    updatedDate: "2-12-2025",
    icon: "package",
  },
  {
    id: "3",
    name: "Engine",
    productCount: 123,
    createdDate: "2-12-2025",
    updatedDate: "2-12-2025",
    icon: "zap",
  },
  {
    id: "4",
    name: "Engine",
    productCount: 123,
    createdDate: "2-12-2025",
    updatedDate: "2-12-2025",
    icon: "star",
  },
  {
    id: "5",
    name: "Engine",
    productCount: 123,
    createdDate: "2-12-2025",
    updatedDate: "2-12-2025",
    icon: "cpu",
  },
  {
    id: "6",
    name: "Engine",
    productCount: 123,
    createdDate: "2-12-2025",
    updatedDate: "2-12-2025",
    icon: "settings",
  },
  {
    id: "7",
    name: "Engine",
    productCount: 123,
    createdDate: "2-12-2025",
    updatedDate: "2-12-2025",
    icon: "package",
  },
  {
    id: "8",
    name: "Engine",
    productCount: 123,
    createdDate: "2-12-2025",
    updatedDate: "2-12-2025",
    icon: "zap",
  },
  {
    id: "9",
    name: "Engine",
    productCount: 123,
    createdDate: "2-12-2025",
    updatedDate: "2-12-2025",
    icon: "star",
  },
  {
    id: "10",
    name: "Engine",
    productCount: 123,
    createdDate: "2-12-2025",
    updatedDate: "2-12-2025",
    icon: "cpu",
  },
  {
    id: "11",
    name: "Engine",
    productCount: 123,
    createdDate: "2-12-2025",
    updatedDate: "2-12-2025",
    icon: "cpu",
  },
];

const getIconComponent = (iconType: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    settings: <Settings className="h-5 w-5" />,
    package: <Package className="h-5 w-5" />,
    zap: <Zap className="h-5 w-5" />,
    star: <Star className="h-5 w-5" />,
    cpu: <Cpu className="h-5 w-5" />,
  };
  return iconMap[iconType] || <Settings className="h-5 w-5" />;
};

interface CategoryTableProps {
  onRowAction?: (action: string, row: any) => void;
}

export default function CategoryTable({ onRowAction }: CategoryTableProps) {
  const handleCategoryAction = (action: string, row: any) => {
    onRowAction?.(action, row);
  };

  return (
    <Table
      columns={[
        {
          key: "name",
          label: "Category Name",
          sortable: true,
        },
        {
          key: "productCount",
          label: "Number of Product",
        },
        {
          key: "createdDate",
          label: "Created Date",
        },
        {
          key: "icon",
          label: "Icon",
          render: (value: any) => (
            <div className="flex items-center justify-center">
              <div className="border-2 border-yellow-400 rounded-full p-2 text-yellow-400">
                {getIconComponent(value)}
              </div>
            </div>
          ),
        },
        {
          key: "updatedDate",
          label: "Updated Date",
          sortable: true,
        },
      ]}
      data={CATEGORY_DATA}
      searchableFields={["name"]}
      itemsPerPage={10}
      rowActions={[
        { label: "Add", action: "add" },
        { label: "Edit", action: "edit" },
        { label: "Delete", action: "delete" },
      ]}
      onRowAction={handleCategoryAction}
    />
  );
}
