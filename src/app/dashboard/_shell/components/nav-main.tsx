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
const userMode = useUserMode()

  const freelancerMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Briefcase, label: "Projects", href: "#"},
    { icon: Star, label: "Proposals", href: "#"},
    { icon: TrendingUp, label: "Analytics", href: "#" },
    { icon: MessageSquare, label: "Messages", href: "#" },
    { icon: FileText, label: "Portfolio", href: "#" },
  ];

  const employerMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Briefcase, label: "Posted Jobs", href: "#" },
    { icon: Users, label: "Freelancers", href: "#" },
    { icon: Clock, label: "Active", href: "#" },
    { icon: MessageSquare, label: "Messages", href: "#" },
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
