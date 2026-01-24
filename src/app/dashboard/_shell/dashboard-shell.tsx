"use client";

import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { PageTitleProvider } from "./providers/page-title-provider";
import { UserModeProvider } from "../providers/user-mode-provider";
import { Session } from "@/lib/auth";

export default function DashboardShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const userMode = session.user.mode as "client" | "freelancer";
  return (
    <UserModeProvider
      defaultMode={userMode === "freelancer" ? "freelancer" : "employer"}>
      <PageTitleProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex flex-1 flex-col w-full">
            <SiteHeader />
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
    </UserModeProvider>
  );
}
