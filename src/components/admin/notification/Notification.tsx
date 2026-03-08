"use client";

import { useState } from "react";
import { NotificationCard } from "./NotificationCard";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  type: "info" | "error" | "suggestion" | "success" | "flag";
}

const NOTIFICATIONS_DATA: Notification[] = [
  {
    id: "1",
    message:
      'User "john@example.com" has successfully upgraded from Free to Pro.',
    timestamp: "2 min ago",
    type: "info",
  },
  {
    id: "2",
    message:
      'User "sadia.user42@gmail.com" attempted to upgrade to Pro but encountered an issue',
    timestamp: "10 mins ago",
    type: "error",
  },
  {
    id: "3",
    message:
      'User "rahim.khan12" submitted a new suggestion: "Please add a savings goal tracker."',
    timestamp: "30 min ago",
    type: "suggestion",
  },
  {
    id: "4",
    message:
      'User "tasnia_98" left a 5-star review on the Play Store: "Very useful app. Helped me track my expenses easily!"',
    timestamp: "2 hours ago",
    type: "success",
  },
  {
    id: "5",
    message: 'User "robin_dev23" has submitted a request to review the app.',
    timestamp: "Yesterday",
    type: "flag",
  },
];

export default function Notification() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(NOTIFICATIONS_DATA);

  const filteredNotifications = notifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkAllAsRead = () => {
    console.log("Mark all as read");
  };

  return (
    <main className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search table..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 !py-3 !bg-[#171717] border-gray-900 text-white placeholder:text-gray-500 rounded-xl"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <button
            onClick={handleMarkAllAsRead}
            className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
          >
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                id={notification.id}
                message={notification.message}
                timestamp={notification.timestamp}
                type={notification.type}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No notifications found</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
