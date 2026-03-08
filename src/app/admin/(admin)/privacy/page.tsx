/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PrivacyHeader from "@/components/admin/privacyPolicy/PrivacyHeader";
import PrivacyTable from "@/components/admin/privacyPolicy/PrivacyTable";
import PrivacyModal from "@/components/admin/privacyPolicy/PrivacyModal";
import React, { useEffect, useState } from "react";

interface Policy {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    isActive?: boolean;
}

export default function PrivacyPolicyPage() {
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ---------- Modal state ----------
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);

    // ---------- 1. FETCH ----------
    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                // Fetching from a mock JSON or similar as in terms-condition
                const res = await fetch("/data/privacy/privacy.json");
                if (!res.ok) {
                    // If file doesn't exist, we'll just start with empty or mock
                    console.warn("Mock privacy.json not found, using empty state");
                    setPolicies([]);
                    setLoading(false);
                    return;
                }
                const json = await res.json();

                if (!json.success) throw new Error(json.message ?? "Unknown error");

                const mapped: Policy[] = json.data.map((item: any) => ({
                    id: item._id,
                    title: item.title,
                    content: item.content,
                    createdAt: item.createdAt,
                    isActive: item.isActive,
                }));

                setPolicies(mapped);
            } catch (err: any) {
                setError(err.message ?? "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, []);

    // ---------- 2. CREATE ----------
    const handleCreate = (title: string, content: string) => {
        const newPolicy: Policy = {
            id: Date.now().toString(),
            title,
            content,
            createdAt: new Date().toISOString(),
        };
        setPolicies((prev) => [...prev, newPolicy]);
    };

    // ---------- 3. EDIT ----------
    const openEditModal = (policy: Policy) => {
        setEditingPolicy(policy);
        setModalOpen(true);
    };

    const handleEditSave = (title: string, content: string) => {
        if (!editingPolicy) return;
        setPolicies((prev) =>
            prev.map((t) => (t.id === editingPolicy.id ? { ...t, title, content } : t))
        );
        setEditingPolicy(null);
    };

    // ---------- 4. DELETE ----------
    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this policy?")) {
            setPolicies((prev) => prev.filter((t) => t.id !== id));
        }
    };

    // ---------- UI ----------
    return (
        <div className="text-white ml-70 mt-16">
            <main className="min-h-screen text-white">
                <div className="">
                    <PrivacyHeader />

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
                                setEditingPolicy(null);
                                setModalOpen(true);
                            }}
                            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                        >
                            + Add New Policy
                        </button>
                    </div>

                    {/* ---------- Table ---------- */}
                    <div className=" p-6 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-white">
                            Saved Privacy Policies
                        </h2>

                        {!loading && policies.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                No policies added yet. Click “Add New Policy” to create one.
                            </p>
                        ) : (
                            <PrivacyTable
                                data={policies}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>
            </main>

            {/* ---------- Modal ---------- */}
            <PrivacyModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={(title, content) => {
                    if (editingPolicy) {
                        handleEditSave(title, content);
                    } else {
                        handleCreate(title, content);
                    }
                }}
                editPolicy={editingPolicy ?? undefined}
            />
        </div>
    );
}
