/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Header from "@/components/common/Header/Header";
import styles from "./Faq.module.css";

// -----------------------------------------------------------------
// Static FAQ Data to prevent 404 fetch errors on Vercel
// -----------------------------------------------------------------
const STATIC_FAQS = [
  {
    _id: "68fa90016fa0cb61c8308201",
    question: "How long does it take to receive my order?",
    answer: "Delivery usually takes 1-2 working days within the city and 3-5 working days for nationwide orders. For international shipments, delivery may take 7-14 days, depending on location and courier service.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
  },
  {
    _id: "68fa90016fa0cb61c8308202",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All transactions are secure and encrypted.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=400&fit=crop",
  },
  {
    _id: "68fa90016fa0cb61c8308203",
    question: "Do you offer returns or exchanges?",
    answer: "Yes! You can return or exchange any item within 30 days of delivery. The product must be unused and in original packaging.",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&h=400&fit=crop",
  },
  {
    _id: "68fa90016fa0cb61c8308204",
    question: "Is there a warranty on products?",
    answer: "All products come with a minimum 1-year warranty. Extended warranty options are available at checkout.",
    image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=600&h=400&fit=crop",
  },
  {
    _id: "68fa90016fa0cb61c8308205",
    question: "How can I track my order?",
    answer: "Once your order ships, you’ll receive a tracking link via email and SMS. You can also track it directly from your account dashboard.",
    image: "https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=600&h=400&fit=crop",
  }
];

// -----------------------------------------------------------------
const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getNumberPrefix = (num: number): string =>
    num < 10 ? `0${num}` : `${num}`;

  const handleToggle = (index: number) =>
    setActiveIndex(activeIndex === index ? null : index);

  // -----------------------------------------------------------------
  // Main FAQ list
  // -----------------------------------------------------------------
  return (
    <div className="text-white my-20">
      <Header heading="Frequently Asked Question" />

      <div className="space-y-0">
        {STATIC_FAQS.map((faq, index) => (
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
                className={`flex-shrink-0 ml-4 ${styles.faqIcon} ${activeIndex === index ? styles.open : ""
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
              className={`${styles.faqContent} ${activeIndex === index ? styles.open : ""
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
