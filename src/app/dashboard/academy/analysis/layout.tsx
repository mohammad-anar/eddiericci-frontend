"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  IconDashboard, 
  IconSchool, 
  IconUsers, 
  IconBooks, 
  IconTrophy, 
  IconFileText, 
  IconCoins, 
  IconInbox, 
  IconChartBar, 
  IconSettings 
} from "@tabler/icons-react";
import { ReactNode } from "react";

const analysisSidebarItems = [
  { name: "Dashboard", url: "/dashboard/academy/analysis", icon: IconDashboard },
  { name: "Academy Profile", url: "/dashboard/academy/analysis/profile", icon: IconSchool },
  { name: "Teams", url: "/dashboard/academy/analysis/teams", icon: IconUsers },
  { name: "CVs Library", url: "/dashboard/academy/analysis/cvs", icon: IconBooks },
  { name: "Success Story", url: "/dashboard/academy/analysis/success", icon: IconTrophy },
  { name: "Game Reports", url: "/dashboard/academy/analysis/reports", icon: IconFileText },
  { name: "Financials", url: "/dashboard/academy/analysis/financials", icon: IconCoins },
  { name: "Requests", url: "/dashboard/academy/analysis/requests", icon: IconInbox },
  { name: "Analytics", url: "/dashboard/academy/analysis/analytics", icon: IconChartBar },
  { name: "Settings", url: "/dashboard/academy/analysis/settings", icon: IconSettings },
];

export default function AcademyAnalysisLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout 
      sidebarItems={analysisSidebarItems}
      showToggle={true}
    >
      {children}
    </DashboardLayout>
  );
}
