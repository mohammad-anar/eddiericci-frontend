"use client";
import { AppSidebar, SidebarItem } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  tier?: {
    name: string;
    color: string;
  };
  showToggle?: boolean;
}

export function DashboardLayout({ children, sidebarItems, tier, showToggle = false }: DashboardLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "18rem",
          "--header-height": "4rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" sidebarItems={sidebarItems} tier={tier} />
      <SidebarInset className="bg-[#0A0A0A] text-white">
        <SiteHeader showToggle={showToggle} />
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
