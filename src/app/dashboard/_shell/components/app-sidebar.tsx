"use client";

import React from "react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";


type AppSidebarProps = React.ComponentProps<typeof Sidebar>

export function AppSidebar({ ...props }: AppSidebarProps) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!">
              {/* Logo & Brand */}
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6">
                    {/* Outer C shape with gradient effect */}
                    <path
                      d="M 10 8 L 28 8 Q 30 8 30 10 L 30 11 L 26 11 Q 24 11 24 13 L 24 27 Q 24 29 26 29 L 30 29 L 30 30 Q 30 32 28 32 L 10 32 Q 8 32 8 30 L 8 10 Q 8 8 10 8 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xl font-bold tracking-tight">
                    Clienx
                  </span>
                </Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
