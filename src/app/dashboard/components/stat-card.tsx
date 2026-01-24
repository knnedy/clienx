"use client";

import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

type UserMode = "freelancer" | "employer";
type Trend = "up" | "down" | "stable";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: Trend;
  icon: LucideIcon;
  userMode: UserMode;
}

export default function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  userMode,
}: StatCardProps) {
  const accentColors = {
    freelancer: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      icon: "text-cyan-600 dark:text-cyan-400",
      hover: "hover:border-cyan-500/40 hover:shadow-cyan-500/5",
    },
    employer: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      icon: "text-purple-600 dark:text-purple-400",
      hover: "hover:border-purple-500/40 hover:shadow-purple-500/5",
    },
  };

  const colors = accentColors[userMode];

  const trendConfig = {
    up: { icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400" },
    down: { icon: TrendingDown, color: "text-rose-600 dark:text-rose-400" },
    stable: { icon: null, color: "text-blue-600 dark:text-blue-400" },
  };

  const TrendIcon = trendConfig[trend].icon;

  return (
    <Card
      className={`relative p-6 border-border/60 bg-card hover:shadow-md transition-all duration-200 cursor-pointer ${colors.hover}`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {label}
            </p>
            <h3 className="text-4xl font-bold text-foreground">{value}</h3>
          </div>

          <div
            className={`p-3 rounded-lg ${colors.bg} border ${colors.border} shrink-0`}>
            <Icon className={`w-5 h-5 ${colors.icon}`} />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border/40">
          {TrendIcon && (
            <TrendIcon className={`w-4 h-4 ${trendConfig[trend].color}`} />
          )}
          <p className="text-sm text-muted-foreground font-medium">{change}</p>
        </div>
      </div>
    </Card>
  );
}
