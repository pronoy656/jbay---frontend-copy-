import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function InteractiveHoverButtonX({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group text-secondary relative w-auto cursor-pointer overflow-hidden rounded-full pr-20 text-center",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="text-secondary absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <u>{children}</u>
        <ArrowRight className="-rotate-45 text-white bg-secondary rounded-full" />
      </div>
    </button>
  );
}
