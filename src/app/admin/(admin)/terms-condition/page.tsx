/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TermsHeader from "@/components/admin/termsAndConditions/TermsHeader";
import TermsTable from "@/components/admin/termsAndConditions/TermsTable";
import TermsModal from "@/components/admin/termsAndConditions/TermsModal";
import React, { useEffect, useState } from "react";

interface Term {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  isActive?: boolean;
}

export default function TermsAndConditionPage() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---------- Modal state ----------
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState<Term | null>(null);

  // ---------- 1. FETCH ----------
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await fetch("/data/terms/terms.json");
        if (!res.ok) throw new Error("Failed to load terms");
        const json = await res.json();

        if (!json.success) throw new Error(json.message ?? "Unknown error");

        const mapped: Term[] = json.data.map((item: any) => ({
          id: item._id,
          title: item.title,
          content: item.content,
          createdAt: item.createdAt,
          isActive: item.isActive,
        }));

        setTerms(mapped);
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  // ---------- 2. CREATE ----------
  const handleCreate = (title: string, content: string) => {
    const newTerm: Term = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    setTerms((prev) => [...prev, newTerm]);
  };

  // ---------- 3. EDIT ----------
  const openEditModal = (term: Term) => {
    setEditingTerm(term);
    setModalOpen(true);
  };

  const handleEditSave = (title: string, content: string) => {
    if (!editingTerm) return;
    setTerms((prev) =>
      prev.map((t) => (t.id === editingTerm.id ? { ...t, title, content } : t))
    );
    setEditingTerm(null);
  };

  // ---------- 4. DELETE ----------
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this term?")) {
      setTerms((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // ---------- UI ----------
  return (
    <div className="text-white ml-70 mt-16">
      <main className="min-h-screen text-white">
        <div className="">
          <TermsHeader />

          {/* Loading / Error */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          {error && (
            <div className="bg-red-900 text-white p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* ---------- Add New Button ---------- */}
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => {
                setEditingTerm(null);
                setModalOpen(true);
              }}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              + Add New Term
            </button>
          </div>

          {/* ---------- Table ---------- */}
          <div className=" p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Saved Terms & Conditions
            </h2>

            {!loading && terms.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No terms added yet. Click “Add New Term” to create one.
              </p>
            ) : (
              <TermsTable
                data={terms}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </main>

      {/* ---------- Modal ---------- */}
      <TermsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(title, content) => {
          if (editingTerm) {
            handleEditSave(title, content);
          } else {
            handleCreate(title, content);
          }
        }}
        editTerm={editingTerm ?? undefined}
      />
    </div>
  );
}
