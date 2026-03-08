// components/admin/termsAndConditions/TermsModal.tsx
import React from "react";
import TermsForm from "./TermsForm";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  /** When editing */
  editTerm?: { id: string; title: string; content: string };
}

export default function TermsModal({
  isOpen,
  onClose,
  onSave,
  editTerm,
}: TermsModalProps) {
  if (!isOpen) return null;

  const handleSave = (title: string, content: string) => {
    onSave(title, content);
    onClose(); // close after successful save
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
          {editTerm ? "Edit Term" : "Add New Term"}
        </h2>

        <TermsForm
          onSave={handleSave}
          initialTitle={editTerm?.title ?? ""}
          initialContent={editTerm?.content ?? ""}
        />
      </div>
    </div>
  );
}
