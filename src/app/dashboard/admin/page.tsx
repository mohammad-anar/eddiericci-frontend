"use client";

import React from "react";
import { 
  IconUsers, 
  IconCurrencyDollar,
  IconClock,
  IconCreditCard,
  IconCalendarFilled,
  IconPhone,
  IconMail
} from "@tabler/icons-react";

import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardSidebarPanel, DashboardSidebarItem } from "@/components/dashboard/dashboard-sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
        Super Admin Dashboard / <span className="text-white">Dashboard</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr,380px] gap-8">
        {/* Main Content */}
        <div className="flex flex-col gap-8">
          {/* Hero Section */}
          <DashboardHero 
            backgroundImage="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop"
            badgeText="Super Admin"
            title="K10 Football"
            contacts={[
              { type: "phone", label: "Contact", value: "+55 11 9999-8888" },
              { type: "email", label: "Email", value: "contact@santosfc.academy" },
            ]}
          />

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardStatCard icon={<IconUsers size={24} />} label="Total Users" value="1,245" />
            <DashboardStatCard icon={<IconCurrencyDollar size={24} />} label="Revenue This Month" value="$ 197,400" />
            <DashboardStatCard icon={<IconClock size={24} />} label="Pending Verifications" value="89" />
            <DashboardStatCard icon={<IconCreditCard size={24} />} label="Active Subscriptions" value="342" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-8">
          <DashboardSidebarPanel title="Pending Approvals" icon={<IconCalendarFilled size={24} />}>
            <DashboardSidebarItem 
              avatar="https://i.pravatar.cc/100?u=1"
              title="Elite FC Academy" 
              subtitle="Academy"
              subtitleColor="text-red-500"
              extraInfo="4h ago" 
            />
            <DashboardSidebarItem 
              avatar="https://i.pravatar.cc/100?u=2"
              title="David Chen" 
              subtitle="Agent"
              subtitleColor="text-orange-500"
              extraInfo="1d ago" 
            />
            <DashboardSidebarItem 
              avatar="https://i.pravatar.cc/100?u=3"
              title="Manchester United" 
              subtitle="Club"
              subtitleColor="text-blue-500"
              extraInfo="2d ago" 
            />
          </DashboardSidebarPanel>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
