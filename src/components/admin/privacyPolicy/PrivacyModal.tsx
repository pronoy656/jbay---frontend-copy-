"use client";
import React from "react";
import PrivacyForm from "@/components/admin/privacyPolicy/PrivacyForm";

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, content: string) => void;
    /** When editing */
    editPolicy?: { id: string; title: string; content: string };
}

export default function PrivacyModal({
    isOpen,
    onClose,
    onSave,
    editPolicy,
}: PrivacyModalProps) {
    if (!isOpen) return null;

    const handleSave = (title: string, content: string) => {
        onSave(title, content);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold mb-6">
                    {editPolicy ? "Edit Policy" : "Add New Policy"}
                </h2>

                <PrivacyForm
                    onSave={handleSave}
                    initialTitle={editPolicy?.title ?? ""}
                    initialContent={editPolicy?.content ?? ""}
                />
            </div>
        </div>
    );
}
