"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePageTitle } from "../providers/page-title-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Briefcase, Check, ChevronsUpDown, User } from "lucide-react";
import { useUserMode } from "../../providers/user-mode-provider";
import React from "react";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const { dynamicTitle } = usePageTitle();
  const { mode, setMode } = useUserMode();

  const getPageTitle = (path: string) => {
    if (path.startsWith("/dashboard/links")) {
      const segments = path.split("/");
      if (segments.length > 3) {
        return dynamicTitle || "Link Details";
      }
      return "Links";
    }
    if (path.startsWith("/dashboard/analytics")) return "Analytics";
    if (path.startsWith("/dashboard/customize")) return "Customize";
    if (path.startsWith("/dashboard/settings")) return "Settings";
    return "Dashboard";
  };

  const currentPage = getPageTitle(pathname);

  const modes = [
    {
      value: "freelancer",
      label: "Freelancer",
      icon: User,
      description: "Browse and bid on projects",
    },
    {
      value: "employer",
      label: "Employer",
      icon: Briefcase,
      description: "Post jobs and hire talent",
    },
  ];

  const currentMode = modes.find((m) => m.value === mode);
  const CurrentIcon = currentMode?.icon;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-sm font-semibold">{currentPage}</h1>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-36 justify-between">
              <div className="flex items-center gap-2">
                {CurrentIcon && (
                  <CurrentIcon className="h-4 w-4 shrink-0 opacity-50" />
                )}
                <span>{currentMode?.label}</span>
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 p-0">
            {modes.map((modeOption) => {
              const Icon = modeOption.icon;
              const isSelected = mode === modeOption.value;

              return (
                <DropdownMenuItem
                  key={modeOption.value}
                  onSelect={() => {
                    setMode(modeOption.value as "freelancer" | "employer");
                    setOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-2 px-2 py-3">
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-40",
                    )}
                  />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isSelected && "font-semibold",
                      )}>
                      {modeOption.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {modeOption.description}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0",
                    )}
                  />
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
