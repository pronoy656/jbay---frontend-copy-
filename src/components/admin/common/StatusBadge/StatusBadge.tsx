// import { cn } from "@/lib/utils";

// interface StatusBadgeProps {
//   status: "active" | "blocked" | string;
//   className?: string;
// }

// export default function StatusBadge({ status, className }: StatusBadgeProps) {
//   const isActive = status.toLowerCase() === "active";
//   return (
//     <span
//       className={cn(
//         "px-4 py-1 rounded-full border text-sm font-medium inline-block",
//         isActive
//           ? "border-green-500 text-green-400"
//           : "border-red-500 text-red-400",
//         className
//       )}
//     >
//       {status}
//     </span>
//   );
// }

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "blocked" | "new" | "used" | "refurb" | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusLower = status.toLowerCase();

  const statusStyles: { [key: string]: string } = {
    active: "border-green-500 text-green-400",
    blocked: "border-red-500 text-red-400",
    new: "border-green-500 text-green-400",
    used: "border-red-500 text-red-400",
    refurb: "border-yellow-500 text-yellow-400",
    accepted: "border-green-500 text-green-400",
    rejected: "border-red-500 text-red-400",
    resolved: "border-green-500 text-green-400",
    pending: "border-yellow-500 text-yellow-400",
  };

  const style = statusStyles[statusLower] || "border-gray-500 text-gray-400";

  return (
    <span
      className={cn(
        "px-4 py-1 rounded-full border text-sm font-medium inline-block capitalize",
        style,
        className
      )}
    >
      {status}
    </span>
  );
}
