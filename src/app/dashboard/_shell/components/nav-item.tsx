"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { useUserMode } from "../../providers/user-mode-provider";
import { usePathname } from "next/navigation";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export default function NavItem({
  icon: Icon,
  label,
  href,
}: NavItemProps) {
const userMode = useUserMode();
const pathname = usePathname();
const isActive = pathname === href;

  const accentColor =
    userMode.mode === "freelancer"
      ? {
          bg: "bg-cyan-100 dark:bg-cyan-950/40",
          text: "text-cyan-600 dark:text-cyan-400",
          border: "border-cyan-200 dark:border-cyan-900/50",
        }
      : {
          bg: "bg-purple-100 dark:bg-purple-950/40",
          text: "text-purple-600 dark:text-purple-400",
          border: "border-purple-200 dark:border-purple-900/50",
        };

  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all group ${
        isActive
          ? `${accentColor.bg} border ${accentColor.border}`
          : "hover:bg-secondary border border-transparent hover:border-border"
      }`}>
      <div className="flex items-center gap-2.5 flex-1">
        <Icon
          className={`w-4.5 h-4.5 transition-colors ${isActive ? accentColor.text : "text-muted-foreground group-hover:text-foreground"}`}
        />
        <span
          className={`text-sm font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
          {label}
        </span>
      </div>
    
    </Link>
  );
}
