"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  IconDashboard, 
  IconFileText, 
  IconPhotoVideo, 
  IconChartBar, 
  IconSettings 
} from "@tabler/icons-react";
import { ReactNode } from "react";

const coachSidebarItems = [
  { name: "Dashboard", url: "/dashboard/coach", icon: IconDashboard },
  { name: "My CV", url: "/dashboard/coach/cv", icon: IconFileText },
  { name: "My Images & Videos", url: "/dashboard/coach/media", icon: IconPhotoVideo },
  { name: "Analytics", url: "/dashboard/coach/analytics", icon: IconChartBar },
  { name: "Settings", url: "/dashboard/coach/settings", icon: IconSettings },
];

export default function CoachLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout 
      sidebarItems={coachSidebarItems}
      tier={{ name: "Silver", color: "#C0C0C0" }}
    >
      {children}
    </DashboardLayout>
  );
}
