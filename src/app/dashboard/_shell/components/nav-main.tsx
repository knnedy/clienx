"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NavItem from "./nav-item";
import {
  Home,
  Briefcase,
  Users,
  MessageSquare,
  Star,
  TrendingUp,
  FileText,
  Clock,
} from "lucide-react";
import { useUserMode } from "../../providers/user-mode-provider";

export function NavMain() {
  const userMode = useUserMode();

  const freelancerMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Briefcase, label: "Projects", href: "/dashboard/projects" },
    { icon: Star, label: "Proposals", href: "/dashboard/proposals" },
    { icon: TrendingUp, label: "Analytics", href: "#" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: FileText, label: "Portfolio", href: "#" },
  ];

  const employerMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Briefcase, label: "Posted Jobs", href: "/dashboard/jobs" },
    { icon: Users, label: "Freelancers", href: "/dashboard/freelancers" },
    { icon: Clock, label: "Active", href: "#" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: TrendingUp, label: "Reports", href: "#" },
  ];

  const menuItems =
    userMode.mode === "freelancer" ? freelancerMenuItems : employerMenuItems;

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem></SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="gap-1.5">
          {menuItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
