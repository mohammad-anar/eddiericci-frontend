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
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { MediaCard } from "@/components/dashboard/media-card";
import { FinancialsTable } from "@/components/dashboard/financials-table";

const mediaData = [
  { id: "1", type: "image" as const, title: "vs Chelsea U19", date: "Mar 10, 2024", views: 189, likes: 45, thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2076" },
  { id: "2", type: "image" as const, title: "Training Highlights", date: "Feb 28, 2024", views: 156, likes: 62, thumbnail: "https://images.unsplash.com/photo-1518005020250-6759229547b9?q=80&w=2021" },
  { id: "3", type: "image" as const, title: "vs Liverpool U19", date: "Mar 5, 2024", views: 312, likes: 227, thumbnail: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070" },
  { id: "4", type: "image" as const, title: "vs Liverpool U19", date: "Mar 5, 2024", views: 312, likes: 227, thumbnail: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2071" },
];

const videoData = [
  { id: "1", type: "video" as const, title: "vs Arsenal U19", date: "Mar 15, 2024", views: 234, likes: 97, thumbnail: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=2076" },
  { id: "2", type: "video" as const, title: "vs Arsenal U19", date: "Mar 15, 2024", views: 234, likes: 97, thumbnail: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070" },
  { id: "3", type: "video" as const, title: "vs Liverpool U19", date: "Mar 5, 2024", views: 312, likes: 227, thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2070" },
  { id: "4", type: "video" as const, title: "Training Highlights", date: "Feb 28, 2024", views: 156, likes: 62, thumbnail: "https://images.unsplash.com/photo-1518005020250-6759229547b9?q=80&w=2021" },
];

const transactions = [
  { id: "1", athlete: { name: "Marcus Silva", role: "Forward", avatar: "https://i.pravatar.cc/100?u=marcus" }, report: "Under 19 vs Chelsea U19", amount: "$ 6.99", myAmount: "$ 2.796", date: "2024-01-15", status: "Completed" as const },
  { id: "2", athlete: { name: "David Chen", role: "Midfielder", avatar: "https://i.pravatar.cc/100?u=david" }, report: "Under 18 vs Chelsea U18", amount: "$ 6.99", myAmount: "$ 2.796", date: "2024-02-01", status: "Pending" as const },
  { id: "3", athlete: { name: "Alex Jonson", role: "Defender", avatar: "https://i.pravatar.cc/100?u=alex" }, report: "Under 17 vs Liverpool U17", amount: "$ 6.99", myAmount: "$ 2.796", date: "2023-12-01", status: "Completed" as const },
  { id: "4", athlete: { name: "James Brown", role: "Goalkeeper", avatar: "https://i.pravatar.cc/100?u=james" }, report: "Under 16 vs City U16", amount: "$ 6.99", myAmount: "$ 2.796", date: "2024-03-10", status: "Rejected" as const },
];

const AcademyAnalysisDashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
        Academy Dashboard / <span className="text-white">Analysis</span>
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

          {/* Images Section */}
          <div className="bg-[#111111] rounded-3xl border border-white/5 p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase text-white font-orbitron">Images</h2>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Match highlights & training</p>
              </div>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white px-6 py-2.5 rounded-xl transition-all">
                <IconUpload size={16} />
                Upload Image
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mediaData.map((item) => (
                <MediaCard key={item.id} {...item} />
              ))}
            </div>
          </div>

          {/* Videos Section */}
          <div className="bg-[#111111] rounded-3xl border border-white/5 p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase text-white font-orbitron">Videos</h2>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Match highlights & training</p>
              </div>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white px-6 py-2.5 rounded-xl transition-all">
                <IconUpload size={16} />
                Upload Video
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {videoData.map((item) => (
                <MediaCard key={item.id} {...item} />
              ))}
            </div>
          </div>

          {/* Financials Section */}
          <div className="bg-[#111111] rounded-3xl border border-white/5 p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase text-white font-orbitron">Financials</h2>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Track your academy's revenue and transactions</p>
              </div>
            </div>
            
            <FinancialsTable transactions={transactions} />
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

export default AcademyAnalysisDashboard;