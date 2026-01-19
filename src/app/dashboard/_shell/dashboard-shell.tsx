"use client";

import React from "react";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
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
        <AppSidebar userMode={userMode} />
        <main className="flex flex-1 flex-col w-full">
          <SiteHeader userMode={userMode} onModeChange={setUserMode} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 md:px-6">
                {children}
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </PageTitleProvider>
  );
}
