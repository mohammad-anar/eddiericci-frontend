"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  IconDashboard, 
  IconUser, 
  IconSchool, 
  IconUsers, 
  IconSearch, 
  IconFileText, 
  IconStar, 
  IconChartBar, 
  IconSettings 
} from "@tabler/icons-react";
import { ReactNode } from "react";

const clubSidebarItems = [
  { name: "Dashboard", url: "/dashboard/club", icon: IconDashboard },
  { name: "Club Profile", url: "/dashboard/club/profile", icon: IconUser },
  { name: "My Academies", url: "/dashboard/club/academies", icon: IconSchool },
  { name: "Staff Monitoring", url: "/dashboard/club/staff", icon: IconUsers },
  { name: "Scouting Board", url: "/dashboard/club/scouting", icon: IconSearch },
  { name: "CVs Library", url: "/dashboard/club/cv-library", icon: IconFileText },
  { name: "Success Story", url: "/dashboard/club/success-story", icon: IconStar },
  { name: "Analytics", url: "/dashboard/club/analytics", icon: IconChartBar },
  { name: "Settings", url: "/dashboard/club/settings", icon: IconSettings },
];

export default function ClubLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout 
      sidebarItems={clubSidebarItems}
      tier={{ name: "ACTIVE CLUB", color: "#00FF62" }}
    >
      {children}
    </DashboardLayout>
  );
}
