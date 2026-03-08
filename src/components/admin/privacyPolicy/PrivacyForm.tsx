"use client";
import React, { useState } from "react";

interface PrivacyFormProps {
    onSave: (title: string, content: string) => void;
    initialTitle?: string;
    initialContent?: string;
}

export default function PrivacyForm({
    onSave,
    initialTitle = "",
    initialContent = "",
}: PrivacyFormProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        if (!title.trim() || !content.trim()) return;
        onSave(title.trim(), content.trim());
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
        // Only clear if it was an "Add" (no initial values), 
        // but actually for edit it's better to keep it or just close modal.
        // The Modal handles closing.
    };

    return (
        <div className="space-y-8">
            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-xl font-bold mb-3">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter privacy policy title"
                    className="w-full px-6 py-4 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500 focus:border-transparent transition-all"
                />
            </div>

            {/* Content */}
            <div>
                <label htmlFor="content" className="block text-xl font-bold mb-3">
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your privacy policy content"
                    rows={12}
                    className="w-full px-6 py-4 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-500 focus:border-transparent transition-all resize-none"
                />
            </div>

            {/* Save + feedback */}
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={handleSave}
                    className="px-32 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                    Save
                </button>
                {isSaved && (
                    <span className="text-green-500 text-sm font-medium">
                        Saved successfully
                    </span>
                )}
            </div>
        </div>
    );
}
