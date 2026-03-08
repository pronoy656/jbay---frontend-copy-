"use client";

import type React from "react";

import { User, AlertCircle, Flag, CheckCircle2 } from "lucide-react";

interface NotificationCardProps {
  id: string;
  message: string;
  timestamp: string;
  type: "info" | "error" | "suggestion" | "success" | "flag";
}

export function NotificationCard({
  message,
  timestamp,
  type,
}: NotificationCardProps) {
  const getIconAndColor = (type: string) => {
    const configs: {
      [key: string]: {
        icon: React.ReactNode;
        bgColor: string;
        iconColor: string;
      };
    } = {
      info: {
        icon: <User className="h-6 w-6" />,
        bgColor: "bg-gray-600",
        iconColor: "text-gray-300",
      },
      error: {
        icon: <AlertCircle className="h-6 w-6" />,
        bgColor: "bg-red-900/30",
        iconColor: "text-red-500",
      },
      suggestion: {
        icon: <Flag className="h-6 w-6" />,
        bgColor: "bg-yellow-900/30",
        iconColor: "text-yellow-500",
      },
      success: {
        icon: <CheckCircle2 className="h-6 w-6" />,
        bgColor: "bg-green-900/30",
        iconColor: "text-green-500",
      },
      flag: {
        icon: <Flag className="h-6 w-6" />,
        bgColor: "bg-yellow-900/30",
        iconColor: "text-yellow-500",
      },
    };

    return configs[type] || configs.info;
  };

  const { icon, bgColor, iconColor } = getIconAndColor(type);

  return (
    <div
      className={`flex items-start gap-4 ${bgColor} p-4 rounded-lg border border-gray-700`}
    >
      <div className={`${iconColor} flex-shrink-0`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm">{message}</p>
        <p className="text-gray-400 text-xs mt-1">{timestamp}</p>
      </div>
    </div>
  );
}
