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
import { ChevronDown } from "lucide-react";

type UserMode = "freelancer" | "employer";

type SiteHeaderProps = {
  userMode: UserMode;
  onModeChange: (mode: UserMode) => void;
};

export function SiteHeader({ userMode, onModeChange }: SiteHeaderProps) {
  const pathname = usePathname();
  const { dynamicTitle } = usePageTitle();

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

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-sm font-semibold">{currentPage}</h1>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              {userMode === "freelancer" ? "👨‍💻 Freelancer" : "👔 Employer"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onModeChange("freelancer")}>
              👨‍💻 Freelancer Mode
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onModeChange("employer")}>
              👔 Employer Mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
