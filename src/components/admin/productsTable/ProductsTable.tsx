/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Table from "../common/Table/Table";
import Image from "next/image";
import { StatusBadge } from "../common/StatusBadge/StatusBadge";

interface Product {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  price: string;
  condition: "new" | "used" | "refurb";
  carModel: string;
}

interface ProductsTableProps {
  data?: Product[];
  onRowAction?: (action: string, row: Product) => void;
}

const defaultData: Product[] = [
  {
    id: "1",
    name: "Engine",
    subtitle: "Suspension",
    image: "/image 14.png",
    price: "$123",
    condition: "new",
    carModel: "Toyota Corolla",
  },
  {
    id: "2",
    name: "Engine",
    subtitle: "Suspension",
    image: "/image 14.png",
    price: "$123",
    condition: "used",
    carModel: "Honda Civic",
  },
  // ... (the rest of your 11 items – omitted for brevity)
  {
    id: "11",
    name: "Engine",
    subtitle: "Suspension",
    image: "/image 14.png",
    price: "$123",
    condition: "new",
    carModel: "Honda Civic",
  },
];

export default function ProductsTable({
  data = defaultData,
  onRowAction,
}: ProductsTableProps) {
  const handleAction = (action: string, row: any) => {
    onRowAction?.(action, row);
  };

  return (
    <Table
      columns={[
        {
          key: "name",
          label: "Product Name",
          render: (value: any, row: any) => (
            <div className="flex items-center gap-3">
              <Image
                src={row.image || "/placeholder.svg"}
                alt={value}
                width={40}
                height={40}
                className="h-10 w-10 rounded object-cover bg-gray-700"
              />
              <div>
                <p className="font-medium text-white">{value}</p>
                <p className="text-sm text-gray-400">{row.subtitle}</p>
              </div>
            </div>
          ),
        },
        { key: "price", label: "Price" },
        {
          key: "condition",
          label: "Condition",
          render: (value: any) => <StatusBadge status={value} />,
        },
        { key: "carModel", label: "Car Model" },
      ]}
      data={data}
      searchableFields={["name"]}
      itemsPerPage={10}
      rowActions={[
        { label: "Add", action: "add" },
        { label: "Edit", action: "edit" },
        { label: "Delete", action: "delete" },
      ]}
      onRowAction={handleAction}
    />
  );
}
