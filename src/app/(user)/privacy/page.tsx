/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header/Header";
import axiosPublic from "@/utils/axiosPublic";

// -----------------------------------------------------------------
// Types based on your API response
// -----------------------------------------------------------------
interface Policy {
  _id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

interface PrivacyApiResponse {
  success: boolean;
  message: string;
  data: Policy[];
}

// -----------------------------------------------------------------
export default function PrivacyPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // -----------------------------------------------------------------
  // Fetch privacy policies using axiosPublic
  // -----------------------------------------------------------------
  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        setLoading(true);
        // Adjusted path to match public/data/privacy/privacy.json
        // If axiosPublic baseURL is http://.../data/, then "privacy/privacy.json" is correct
        const response = await axiosPublic.get<PrivacyApiResponse>(
          "privacy/privacy.json"
        );
        setPolicies(response.data.data);
        setError(null);
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load privacy policies";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacy();
  }, []);

  // -----------------------------------------------------------------
  // Loading state
  // -----------------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium animate-pulse">Loading privacy policies...</p>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // Error state
  // -----------------------------------------------------------------
  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-6">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-md w-full text-center">
          <p className="text-red-500 font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // Main content
  // -----------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Header heading="Privacy Policy" />

      <div className="px-6 py-20 max-w-5xl mx-auto">
        <div className="grid gap-12">
          {policies.map((policy, index) => (
            <div
              key={policy._id}
              className="group relative bg-[#121214] border border-white/5 p-8 rounded-3xl hover:border-yellow-400/30 transition-all duration-300"
            >
              <div className="absolute -top-6 -left-4 w-12 h-12 bg-yellow-400 flex items-center justify-center rounded-2xl font-bold text-black text-xl shadow-xl shadow-yellow-400/20">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="mt-4">
                <h2 className="text-3xl font-bold mb-6 text-white group-hover:text-yellow-400 transition-colors">
                  {policy.title}
                </h2>
                <div className="text-gray-400 leading-relaxed text-lg mb-8 whitespace-pre-line">
                  {policy.content}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 border-t border-white/5 pt-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    Last updated:{" "}
                    {new Date(policy.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center border-t border-white/5 pt-12">
          <p className="text-gray-500 mb-4">Have questions about our privacy policy?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-yellow-400 font-semibold hover:gap-3 transition-all"
          >
            Contact our support team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
