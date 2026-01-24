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
    { icon: Home, label: "Dashboard", href: "#", badge: null },
    { icon: Briefcase, label: "Projects", href: "#", badge: "12" },
    { icon: Star, label: "Proposals", href: "#", badge: "3" },
    { icon: TrendingUp, label: "Analytics", href: "#", badge: null },
    { icon: MessageSquare, label: "Messages", href: "#", badge: "5" },
    { icon: FileText, label: "Portfolio", href: "#", badge: null },
  ];

  const employerMenuItems = [
    { icon: Home, label: "Dashboard", href: "#", badge: null },
    { icon: Briefcase, label: "Posted Jobs", href: "#", badge: "4" },
    { icon: Users, label: "Freelancers", href: "#", badge: null },
    { icon: Clock, label: "Active", href: "#", badge: "2" },
    { icon: MessageSquare, label: "Messages", href: "#", badge: "8" },
    { icon: TrendingUp, label: "Reports", href: "#", badge: null },
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
              badge={item.badge}
              isActive={item.label === "Dashboard"}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
