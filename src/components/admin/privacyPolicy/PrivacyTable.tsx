"use client";
import React from "react";
import Table from "../common/Table/Table";

interface Policy {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

interface PrivacyTableProps {
    data: Policy[];
    onEdit: (policy: Policy) => void;
    onDelete: (id: string) => void;
}

export default function PrivacyTable({
    data,
    onEdit,
    onDelete,
}: PrivacyTableProps) {
    const handleAction = (action: string, row: Policy) => {
        if (action === "edit") onEdit(row);
        if (action === "delete") onDelete(row.id);
    };

    return (
        <Table
            columns={[
                {
                    key: "title",
                    label: "Title",
                    render: (value: string) => (
                        <span className="text-gray-300 font-medium">{value}</span>
                    ),
                },
                {
                    key: "content",
                    label: "Content Preview",
                    render: (value: string) => (
                        <span className="text-gray-400 truncate max-w-xl block">
                            {value.substring(0, 120)}...
                        </span>
                    ),
                },
                {
                    key: "createdAt",
                    label: "Created",
                    render: (value: string) => (
                        <span className="text-gray-500 text-sm">
                            {new Date(value).toLocaleDateString()}
                        </span>
                    ),
                },
            ]}
            data={data}
            searchableFields={["title", "content"]}
            itemsPerPage={10}
            rowActions={[
                { label: "Edit", action: "edit" },
                { label: "Delete", action: "delete" },
            ]}
            onRowAction={handleAction}
        />
    );
}
