"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  IconDashboard, 
  IconMessage, 
  IconUsers, 
  IconUserCheck, 
  IconCalendarEvent, 
  IconCreditCard, 
  IconBallFootball, 
  IconStar, 
  IconUsersGroup, 
  IconNews, 
  IconTrophy, 
  IconFileText, 
  IconChartBar, 
  IconBuildingStore, 
  IconSettings 
} from "@tabler/icons-react";
import { ReactNode } from "react";

const managementSidebarItems = [
  { name: "Dashboard", url: "/dashboard/academy/management", icon: IconDashboard },
  { name: "Chat", url: "/dashboard/academy/management/chat", icon: IconMessage },
  { name: "Players Management", url: "/dashboard/academy/management/players", icon: IconUsers },
  { name: "Parents Management", url: "/dashboard/academy/management/parents", icon: IconUserCheck },
  { name: "Training Sessions", url: "/dashboard/academy/management/sessions", icon: IconCalendarEvent },
  { name: "Fees & Payments", url: "/dashboard/academy/management/payments", icon: IconCreditCard },
  { name: "Matches", url: "/dashboard/academy/management/matches", icon: IconBallFootball },
  { name: "Extra Events", url: "/dashboard/academy/management/events", icon: IconStar },
  { name: "Sponsors", url: "/dashboard/academy/management/sponsors", icon: IconUsersGroup },
  { name: "Academy News", url: "/dashboard/academy/management/news", icon: IconNews },
  { name: "Success Story", url: "/dashboard/academy/management/success", icon: IconTrophy },
  { name: "Game Reports", url: "/dashboard/academy/management/reports", icon: IconFileText },
  { name: "Generate CV", url: "/dashboard/academy/management/cv", icon: IconFileText },
  { name: "Analytics Report", url: "/dashboard/academy/management/analytics", icon: IconChartBar },
  { name: "Product Store", url: "/dashboard/academy/management/store", icon: IconBuildingStore },
  { name: "Settings", url: "/dashboard/academy/management/settings", icon: IconSettings },
];

export default function AcademyManagementLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout 
      sidebarItems={managementSidebarItems}
      showToggle={true}
    >
      {children}
    </DashboardLayout>
  );
}
