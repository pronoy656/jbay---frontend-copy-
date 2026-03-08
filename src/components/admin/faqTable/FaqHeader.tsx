import React from "react";

interface FaqHeaderProps {
  onOpenModal: () => void;
}

export default function FaqHeader({ onOpenModal }: FaqHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Manage Frequently Asked Question
          </h1>
          <p className="text-white mt-3">
            Use this section to write or update the Frequently Asked Question
            for your website. These FAQ will help you to guide users
          </p>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={onOpenModal}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded transition-colors flex items-center gap-2"
        >
          <span>Add new FAQ</span>
          <span>+</span>
        </button>
      </div>
    </>
  );
}
