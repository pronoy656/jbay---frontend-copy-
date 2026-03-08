"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export interface AddFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFAQ: (question: string, answer: string) => void;
}

export function AddFAQModal({ isOpen, onClose, onAddFAQ }: AddFAQModalProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAdd = () => {
    if (question.trim() && answer.trim()) {
      onAddFAQ(question, answer);
      setQuestion("");
      setAnswer("");
      onClose();
    }
  };

  const handleClose = () => {
    setQuestion("");
    setAnswer("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#171717] rounded-lg p-8 w-full max-w-3xl mx-4 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Add New FAQ</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Question</label>
          <Input
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="mb-8">
          <label className="block text-white font-medium mb-2">Answer</label>
          <Input
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}
