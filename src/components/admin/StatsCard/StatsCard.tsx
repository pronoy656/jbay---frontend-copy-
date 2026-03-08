import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  name: string;
  value?: string | number | null | undefined;
  /** Optional icon – if not provided, the icon area is hidden */
  icon?: LucideIcon | null;
  className?: string;
  valueClassName?: string;
  iconColor?: string;
  trendColor?: { up: string; down: string };
}

export function StatsCard({
  name,
  value,
  icon: Icon,
  className,
  valueClassName,
  iconColor,
}: StatsCardProps) {
  // 1. Hide entire card if no value (but keep 0)
  if (value == null || value === "") return null;

  const trendBg = "bg-primary/15 group-hover:bg-primary/25";

  return (
    <Card
      className={cn(
        "group relative overflow-hidden glass-card hover:border-primary/30 transition-all duration-300 p-6",
        className
      )}
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          {/* 2. Show icon only if provided */}
          {Icon && (
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 premium-glow",
                trendBg
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 transition-colors duration-300",
                  iconColor
                )}
              />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{name}</h3>
          <p
            className={cn(
              "text-3xl font-bold text-card-foreground tracking-tight",
              valueClassName
            )}
          >
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}
