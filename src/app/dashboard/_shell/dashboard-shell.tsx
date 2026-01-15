"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { PageTitleProvider } from "./providers/page-title-provider";

type UserMode = "freelancer" | "employer";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: This will be replaced with actual user mode logic later
  const [userMode, setUserMode] = useState<UserMode>("freelancer");

  return (
    <PageTitleProvider>
      <SidebarProvider>
        <AppSidebar userMode={userMode} variant="inset" />
        <SidebarInset>
          <SiteHeader userMode={userMode} onModeChange={setUserMode} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </PageTitleProvider>
  );
}
