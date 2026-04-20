"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  IconDashboard, 
  IconUser, 
  IconRosetteFilled, 
  IconSearch, 
  IconHeart, 
  IconShare, 
  IconStar, 
  IconChartBar, 
  IconSettings 
} from "@tabler/icons-react";
import { ReactNode } from "react";

const agentSidebarItems = [
  { name: "Dashboard", url: "/dashboard/agent", icon: IconDashboard },
  { name: "My Profile", url: "/dashboard/agent/profile", icon: IconUser },
  { name: "Licensed Verification", url: "/dashboard/agent/verification", icon: IconRosetteFilled },
  { name: "Discover Players", url: "/dashboard/agent/discover", icon: IconSearch },
  { name: "Liked CVs", url: "/dashboard/agent/liked", icon: IconHeart },
  { name: "Shared Profiles", url: "/dashboard/agent/shared", icon: IconShare },
  { name: "Success Story", url: "/dashboard/agent/success-story", icon: IconStar },
  { name: "Analytics", url: "/dashboard/agent/analytics", icon: IconChartBar },
  { name: "Settings", url: "/dashboard/agent/settings", icon: IconSettings },
];

export default function AgentLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout 
      sidebarItems={agentSidebarItems}
      tier={{ name: "ACTIVE AGENT", color: "#00FF62" }}
    >
      {children}
    </DashboardLayout>
  );
}
