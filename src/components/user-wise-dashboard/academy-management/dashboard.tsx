"use client";

import React from "react";
import { 
  IconUsers, 
  IconTrophy, 
  IconFileAnalytics, 
  IconBallFootball,
  IconCalendarFilled,
  IconHeartFilled,
  IconUpload,
  IconMapPin,
  IconCalendarEvent
} from "@tabler/icons-react";

import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardSidebarPanel, DashboardSidebarItem } from "@/components/dashboard/dashboard-sidebar";
import { ProductCard } from "@/components/dashboard/product-card";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";

const AcademyManagementDashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
        Academy Dashboard / <span className="text-white">Management</span>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Hero Section */}
          <DashboardHero 
            backgroundImage="/banner.png"
            logoImage="/image 47.png"
            badgeText="Active Academy"
            title="Santos FC Academy"
            subtitle="Premier League Academy"
            details={[
              { icon: <IconCalendarEvent size={16} />, text: "Founded 2018" },
              { icon: <IconMapPin size={16} className="text-green-500" />, text: "São Paulo, Brazil" },
            ]}
            contacts={[
              { type: "phone", label: "Contact", value: "+55 11 9999-8888" },
              { type: "email", label: "Email", value: "contact@santosfc.academy" },
            ]}
          />

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DashboardStatCard icon={<IconBallFootball size={24} />} label="Teams" value="4" />
            <DashboardStatCard icon={<IconUsers size={24} />} label="Players" value="64" />
            <DashboardStatCard icon={<IconTrophy size={24} />} label="Coaches" value="12" />
            <DashboardStatCard icon={<IconFileAnalytics size={24} />} label="Game Reports" value="12" />
          </div>

          {/* Analytics Section */}
          <div className="bg-[#111111] rounded-3xl border border-white/5 p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase text-white font-orbitron">Analytics</h2>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Deep insights into Revenue</p>
              </div>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white px-6 py-2.5 rounded-xl transition-all">
                Full Analytics
              </button>
            </div>
            <DashboardCharts />
          </div>

          {/* Product Store Section */}
          <div className="bg-[#111111] rounded-3xl border border-white/5 p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase text-white font-orbitron">Product Store</h2>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Match highlights & training</p>
              </div>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white px-6 py-2.5 rounded-xl transition-all">
                <IconUpload size={16} />
                Upload Image
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProductCard 
                image="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2071&auto=format&fit=crop"
                category="Jerseys"
                stock={24}
                name="Home Jersey"
                price="45"
              />
              <ProductCard 
                image="https://images.unsplash.com/photo-1518005020250-6759229547b9?q=80&w=2021&auto=format&fit=crop"
                category="Kits"
                stock={18}
                name="Training Kit"
                price="35"
              />
              <ProductCard 
                image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
                category="Accessories"
                stock={12}
                name="Football Boots"
                price="85"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full xl:w-[380px] shrink-0 flex flex-col gap-6">
          <DashboardSidebarPanel title="Pending Game Reports" icon={<IconCalendarFilled size={24} />}>
            <DashboardSidebarItem 
              avatar="https://i.pravatar.cc/100?u=marcus"
              title="Marcus Silva"
              subtitle="Forward"
              subtitleColor="text-[#E31B23]"
              extraInfo="9.2"
            />
            <DashboardSidebarItem 
              avatar="https://i.pravatar.cc/100?u=david"
              title="David Chen"
              subtitle="Midfielder"
              subtitleColor="text-[#E31B23]"
              extraInfo="8.8"
            />
            <DashboardSidebarItem 
              avatar="https://i.pravatar.cc/100?u=alex"
              title="Alex Jonson"
              subtitle="Defender"
              subtitleColor="text-[#E31B23]"
              extraInfo="8.5"
            />
          </DashboardSidebarPanel>

          <DashboardSidebarPanel title="Clubs Interested" icon={<IconHeartFilled size={24} />}>
            <DashboardSidebarItem 
              avatar="/Manchester-City-F.C-Transparent-File 1.png"
              title="Manchester City"
              subtitle="Viewed your profile"
            />
            <DashboardSidebarItem 
              avatar="/pngegg.png"
              title="Liverpool FC"
              subtitle="Viewed your profile"
            />
            <DashboardSidebarItem 
              avatar="/pngegg (2).png"
              title="Chelsea FC"
              subtitle="Viewed your profile"
            />
          </DashboardSidebarPanel>

          <DashboardSidebarPanel title="Quickk stats">
            <div className="flex flex-col gap-4 px-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Profile Views</span>
                <span className="text-sm font-black text-white">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total Likes</span>
                <span className="text-sm font-black text-[#E31B23]">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Reports</span>
                <span className="text-sm font-black text-[#4ADE80]">12</span>
              </div>
            </div>
          </DashboardSidebarPanel>
        </div>
      </div>
    </div>
  );
};

export default AcademyManagementDashboard;