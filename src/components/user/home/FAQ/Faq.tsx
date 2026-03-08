/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Header from "@/components/common/Header/Header";
import styles from "./Faq.module.css";
import axiosPublic from "@/utils/axiosPublic"; // <-- adjust path if needed

// -----------------------------------------------------------------
// Types – match the real API shape
// -----------------------------------------------------------------
interface FAQ {
  _id: string;
  question: string;
  answer: string;
  image: string;
  // any other fields you might use (isActive, createdAt, …)
}

interface FaqApiResponse {
  success: boolean;
  message: string;
  data: FAQ[];
}

// -----------------------------------------------------------------
const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // -----------------------------------------------------------------
  // Fetch FAQs
  // -----------------------------------------------------------------
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);

        // NOTE: endpoint must return the JSON you posted
        const response = await axiosPublic.get<FaqApiResponse>(
          "home/faqs.json"
        );

        // <-- IMPORTANT: extract the array
        setFaqs(response.data.data);
        setError(null);
      } catch (err: any) {
        const msg =
          err?.response?.data?.message || err?.message || "Failed to load FAQs";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const getNumberPrefix = (num: number): string =>
    num < 10 ? `0${num}` : `${num}`;

  const handleToggle = (index: number) =>
    setActiveIndex(activeIndex === index ? null : index);

  // -----------------------------------------------------------------
  // Loading / Error UI
  // -----------------------------------------------------------------
  if (loading) {
    return (
      <div className="text-white my-20 text-center">
        <Header heading="Frequently Asked Question" />
        <p className="mt-8 text-gray-400">Loading FAQs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white my-20 text-center">
        <Header heading="Frequently Asked Question" />
        <p className="mt-8 text-red-400">{error}</p>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // Main FAQ list
  // -----------------------------------------------------------------
  return (
    <div className="text-white my-20">
      <Header heading="Frequently Asked Question" />

      <div className="space-y-0">
        {faqs.map((faq, index) => (
          <div
            key={faq._id}
            className={`${styles.faqItem} border-t border-gray-700/50`}
          >
            {/* ---------- HEADER ---------- */}
            <div
              className={`w-full flex items-center justify-between py-6 md:py-8 cursor-pointer ${styles.premiumBorder}`}
              onClick={() => handleToggle(index)}
            >
              <div className="flex items-center gap-6 md:gap-8 flex-1">
                <span
                  className={`text-4xl md:text-6xl font-bold italic ${styles.faqNumber} pr-5`}
                  style={{ fontWeight: 800 }}
                >
                  {getNumberPrefix(index + 1)}
                </span>
                <h3
                  className={`text-lg md:text-xl font-semibold ${styles.faqHeader}`}
                >
                  {faq.question}
                </h3>
              </div>

              <div
                className={`flex-shrink-0 ml-4 ${styles.faqIcon} ${
                  activeIndex === index ? styles.open : ""
                }`}
              >
                {activeIndex === index ? (
                  <div
                    className={`${styles.iconCircle} w-12 h-12 rounded-full border-2 border-yellow-400 flex items-center justify-center`}
                  >
                    <X className="w-6 h-6 text-yellow-400" strokeWidth={2.5} />
                  </div>
                ) : (
                  <div
                    className={`${styles.iconCircle} w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center`}
                  >
                    <ChevronDown
                      className="w-6 h-6 text-green-400"
                      strokeWidth={2.5}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ---------- CONTENT ---------- */}
            <div
              className={`${styles.faqContent} ${
                activeIndex === index ? styles.open : ""
              }`}
            >
              <div className="pb-8 pl-0 md:pl-32">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/2">
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                  <div className="md:w-1/2 mt-4 md:mt-0">
                    <img
                      src={faq.image}
                      alt={faq.question}
                      className="w-full h-auto rounded-lg shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-gray-700/50"></div>
      </div>
    </div>
  );
};

export default Faq;
