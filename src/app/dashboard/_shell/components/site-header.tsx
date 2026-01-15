"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePageTitle } from "../providers/page-title-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{currentPage}</h1>
      </div>
      <Select
        value={userMode}
        onValueChange={(value) => onModeChange(value as UserMode)}>
        <SelectTrigger className="w-auto px-4 border-border bg-secondary hover:bg-secondary/80 transition-colors">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-border">
          <SelectItem value="freelancer">
            <div className="flex flex-col gap-0.5">
              <div className="font-semibold text-sm">Freelancer</div>
              <div className="text-xs text-muted-foreground">
                Find & build projects
              </div>
            </div>
          </SelectItem>
          <SelectItem value="employer">
            <div className="flex flex-col gap-0.5">
              <div className="font-semibold text-sm">Employer</div>
              <div className="text-xs text-muted-foreground">
                Post & manage jobs
              </div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </header>
  );
}
