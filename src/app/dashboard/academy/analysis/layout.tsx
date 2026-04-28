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
  { name: "Academy Profile", url: "/dashboard/academy/analysis/academy-profile", icon: IconSchool },
  { name: "Teams", url: "/dashboard/academy/analysis/teams", icon: IconUsers },
  { name: "Coach & Players", url: "/dashboard/academy/analysis/coach-players", icon: IconUsers },
  { name: "CVs Library", url: "/dashboard/academy/analysis/cvs-library", icon: IconBooks },
  { name: "Success Story", url: "/dashboard/academy/analysis/success", icon: IconTrophy },
  { name: "Game Reports", url: "/dashboard/academy/analysis/game-reports", icon: IconFileText },
  { name: "Player Evaluation", url: "/dashboard/academy/analysis/player-evaluation", icon: IconUsers },
  { name: "Financials", url: "/dashboard/academy/analysis/financials", icon: IconCoins },
  { name: "Transfer Requests", url: "/dashboard/academy/analysis/transfer-requests", icon: IconInbox },
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
