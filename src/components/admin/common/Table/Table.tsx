/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  userId: string;
  joinDate: string;
  status: "active" | "blocked";
}

export interface StatusBadgeConfig {
  label: string;
  color: "green" | "red" | "blue" | "gray";
}

export interface DataTableProps<T extends Record<string, any>> {
  columns: ColumnConfig<T>[];
  data: T[];
  searchableFields?: (keyof T)[];
  itemsPerPage?: number;
  onRowAction?: (action: string, row: T) => void;
  rowActions?: Array<{
    label: string;
    action: string;
  }>;
  getStatusBadge?: (row: T) => StatusBadgeConfig | null;
}

export default function Table<T extends Record<string, any>>({
  columns,
  data,
  searchableFields = [],
  itemsPerPage = 10,
  onRowAction,
  rowActions = [],
}: // getStatusBadge,
DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    return data.filter((row) =>
      searchableFields.some((field) => {
        const value = row[field];
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [data, searchQuery, searchableFields]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIdx, startIdx + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return prev.direction === "asc" ? { key, direction: "desc" } : null;
      }
      return { key, direction: "asc" };
    });
  };

  // const getStatusColor = (color: string) => {
  //   switch (color) {
  //     case "green":
  //       return "border-green-500 text-green-400";
  //     case "red":
  //       return "border-red-500 text-red-400";
  //     case "blue":
  //       return "border-blue-500 text-blue-400";
  //     case "gray":
  //       return "border-gray-500 text-gray-400";
  //     default:
  //       return "border-gray-500 text-gray-400";
  //   }
  // };
  return (
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search table..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10 !py-6 !bg-[#171717] border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full bg-[#171717]">
          <thead>
            <tr className="border-b border-gray-800 bg-[#171717]">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                >
                  <button
                    onClick={() => column.sortable && handleSort(column.key)}
                    className={cn(
                      "flex items-center gap-2 hover:text-gray-100",
                      column.sortable && "cursor-pointer"
                    )}
                  >
                    {column.label}
                    {column.sortable && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          sortConfig?.key === column.key &&
                            sortConfig.direction === "desc" &&
                            "rotate-180"
                        )}
                      />
                    )}
                  </button>
                </th>
              ))}
              {rowActions.length > 0 && (
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Action Button
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={cn(
                        "px-6 py-4 text-sm text-gray-100",
                        column.className
                      )}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key])}
                    </td>
                  ))}
                  {rowActions.length > 0 && (
                    <td className="px-6 py-4 text-sm">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-800"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="right"
                          align="start"
                          className="w-48 bg-black border-gray-800"
                        >
                          {rowActions.map((action) => (
                            <DropdownMenuItem
                              key={action.action}
                              onClick={() => onRowAction?.(action.action, row)}
                              className="text-gray-300 hover:bg-gray-800 cursor-pointer"
                            >
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (rowActions.length > 0 ? 1 : 0)}
                  className="px-6 py-8 text-center text-sm text-gray-400"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="border-gray-700 hover:bg-gray-900"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="border-gray-700 hover:bg-gray-900"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 2),
              Math.min(totalPages, currentPage + 1)
            )
            .map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={cn(
                  currentPage === page &&
                    "bg-yellow-400 text-black hover:bg-yellow-500"
                )}
              >
                {page}
              </Button>
            ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="border-gray-700 hover:bg-gray-900"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="border-gray-700 hover:bg-gray-900"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
