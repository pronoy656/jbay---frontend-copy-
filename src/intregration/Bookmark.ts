// hooks/useBookmark.ts (or wherever it's located)
"use client";

import { useState, useEffect, useCallback } from "react";

const getBookmarks = (): number[] => {
    if (typeof document === "undefined") return [];

    const cookies = document.cookie.split("; ");
    const bookmarkCookie = cookies.find((c) => c.startsWith("bookmarks="));
    if (bookmarkCookie) {
        try {
            return JSON.parse(decodeURIComponent(bookmarkCookie.split("=")[1]));
        } catch (error) {
            console.error("Failed to parse bookmarks cookie:", error);
            return [];
        }
    }
    return [];
};

const setBookmarks = (bookmarks: number[]) => {
    if (typeof document === "undefined") return;

    document.cookie = `bookmarks=${encodeURIComponent(
        JSON.stringify(bookmarks)
    )}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=strict`;
};

export const useBookmark = (productId: number) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Load initial bookmark state
    useEffect(() => {
        const bookmarks = getBookmarks();
        setIsBookmarked(bookmarks.includes(productId));
    }, [productId]);

    // Listen for external bookmark changes
    useEffect(() => {
        const handleBookmarksChanged = () => {
            const bookmarks = getBookmarks();
            setIsBookmarked(bookmarks.includes(productId));
        };

        window.addEventListener("bookmarksChanged", handleBookmarksChanged);
        return () =>
            window.removeEventListener("bookmarksChanged", handleBookmarksChanged);
    }, [productId]);

    const toggleBookmark = useCallback(() => {
        const bookmarks = getBookmarks();
        let newBookmarks: number[];

        if (bookmarks.includes(productId)) {
            newBookmarks = bookmarks.filter((id) => id !== productId);
        } else {
            newBookmarks = [...bookmarks, productId];
        }

        // Update cookie FIRST
        setBookmarks(newBookmarks);

        // Update local state with functional update to avoid stale closure
        setIsBookmarked((prev) => !prev);

        // Notify other components
        window.dispatchEvent(new Event("bookmarksChanged"));
    }, [productId]);

    return { isBookmarked, toggleBookmark };
};
