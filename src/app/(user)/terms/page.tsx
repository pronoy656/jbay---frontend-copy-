/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header/Header";
import axiosPublic from "@/utils/axiosPublic"; // adjust path if needed

// -----------------------------------------------------------------
// Types based on your API response
// -----------------------------------------------------------------
interface Term {
  _id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TermsApiResponse {
  success: boolean;
  message: string;
  data: Term[];
}

// -----------------------------------------------------------------
export default function TermsPage() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // -----------------------------------------------------------------
  // Fetch terms using axiosPublic
  // -----------------------------------------------------------------
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get<TermsApiResponse>("terms.json"); // adjust endpoint
        setTerms(response.data.data); // <-- extract the array
        setError(null);
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load terms & conditions";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  // -----------------------------------------------------------------
  // Loading state
  // -----------------------------------------------------------------
  if (loading) {
    return <p className="px-6 py-10 text-center">Loading terms...</p>;
  }

  // -----------------------------------------------------------------
  // Error state
  // -----------------------------------------------------------------
  if (error) {
    return <p className="px-6 py-10 text-red-500 text-center">{error}</p>;
  }

  // -----------------------------------------------------------------
  // Main content
  // -----------------------------------------------------------------
  return (
    <>
      <Header heading="Terms & Conditions" />
      <div className="px-6 py-10 max-w-4xl mx-auto">
        {terms.map((term, index) => (
          <div
            key={term._id}
            className="pb-6 mb-6 border-b border-gray-700 last:border-none last:pb-0 last:mb-0"
          >
            <h2 className="text-2xl font-semibold mb-3 text-white">
              {index + 1}. {term.title}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">{term.content}</p>
            <p className="text-sm text-gray-500">
              Last updated:{" "}
              {new Date(term.updatedAt || term.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
