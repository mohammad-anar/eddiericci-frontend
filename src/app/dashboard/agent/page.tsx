"use client";

import React from "react";
import { 
  IconMail, 
  IconPhone, 
  IconShieldCheck, 
  IconHeart, 
  IconShare, 
  IconEye,
  IconUsers,
  IconRosetteFilled,
  IconIdBadge,
  IconCircleCheck
} from "@tabler/icons-react";

const AgentDashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
        Agent Dashboard / <span className="text-white">Dashboard</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-6">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden h-[450px] border border-white/5 group">
          {/* Background Image Placeholder */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute top-8 left-8">
             {/* Progress Circle Placeholder */}
             <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-primary" strokeDasharray={364.4} strokeDashoffset={364.4 * (1 - 0.74)} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-2xl font-black italic">74%</span>
                  <span className="text-[10px] text-white/60 uppercase font-bold tracking-widest">Profile</span>
                </div>
             </div>
          </div>

          <div className="absolute bottom-0 left-0 p-8 w-full flex items-end justify-between">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase w-fit">
                  Active Agent
                </div>
                <h1 className="text-6xl font-black italic tracking-tight text-white uppercase">John Doe</h1>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-primary font-bold">Premium Agent</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/60">58 Years Old</span>
                  <span className="text-white/40">•</span>
                  <span className="flex items-center gap-1.5 text-white/60">
                     <span className="w-4 h-3 bg-green-600 border border-white/10 rounded-sm"></span> Brazil
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-6 pt-6 border-t border-white/10">
                <HeroInfo icon={<IconIdBadge size={18} />} label="License ID" value="UK-AG-2024-001" />
                <HeroInfo icon={<IconPhone size={18} />} label="Contact" value="+55 11 9999-8888" />
                <HeroInfo icon={<IconRosetteFilled size={18} />} label="Certifications" value="FIFA Licensed Agent" />
                <HeroInfo icon={<IconMail size={18} />} label="Email" value="john.doe@example.com" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Side Panel */}
        <div className="bg-[#111111] rounded-3xl border border-white/5 p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-[#E31B23]">
            <IconShieldCheck size={24} stroke={2.5} />
            <h2 className="text-xl font-black italic uppercase tracking-tight text-white">Recent Activity</h2>
          </div>

          <div className="space-y-4">
            <ActivityItem 
              icon={<IconHeart size={18} />} 
              title="You liked CV James Rodriguez's" 
              time="2 hours ago" 
            />
            <ActivityItem 
              icon={<IconShare size={18} />} 
              title="You shared profile Sarah Mitchell's" 
              time="5 hours ago" 
            />
            <ActivityItem 
              icon={<IconCircleCheck size={18} />} 
              title="Verification status updated to Approved" 
              time="Yesterday at 3:45 PM" 
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<IconUsers size={20} />} label="Players Viewed" value="24" />
        <StatCard icon={<IconHeart size={20} />} label="Liked CVs" value="8" />
        <StatCard icon={<IconShare size={20} />} label="Shared Profiles" value="5" />
        <StatCard icon={<IconEye size={20} />} label="Profile Views" value="156" />
      </div>
    </div>
  );
};

const HeroInfo = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center gap-3">
    <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-white/40">
      {icon}
    </div>
    <div className="space-y-0.5">
      <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">{label}</p>
      <p className="text-white text-sm font-medium">{value}</p>
    </div>
  </div>
);

const ActivityItem = ({ icon, title, time }: { icon: React.ReactNode, title: string, time: string }) => (
  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors group cursor-pointer">
    <div className="flex gap-4">
      <div className="p-2.5 bg-white/5 rounded-lg text-white/40 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{title}</p>
        <p className="text-[11px] text-white/30 uppercase font-bold tracking-wider">{time}</p>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all space-y-4 group">
    <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-[32px] font-black italic text-white italic leading-none">{value}</p>
      <p className="text-[11px] text-white/40 uppercase font-bold tracking-widest">{label}</p>
    </div>
  </div>
);

export default AgentDashboard;
