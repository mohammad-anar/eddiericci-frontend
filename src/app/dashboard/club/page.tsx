"use client";

import React from "react";
import Image from "next/image";
import { 
  IconMail, 
  IconPhone, 
  IconShieldCheck, 
  IconHeart, 
  IconShare, 
  IconClock,
  IconEye,
  IconSchool,
  IconUsers,
  IconUser,
  IconTrophy
} from "@tabler/icons-react";

const ClubDashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
        Club Dashboard / <span className="text-white">Dashboard</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-6">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden h-[450px] border border-white/5 group">
          {/* Background Image Placeholder */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 w-full flex items-end justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center border border-white/10 shadow-2xl">
                   {/* Logo Placeholder */}
                   <Image 
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" 
                    alt="Club Logo" 
                    width={60} 
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase w-fit">
                    Active Club
                  </div>
                  <h1 className="text-4xl font-black italic tracking-tight text-white uppercase">Liverpool FC</h1>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-primary font-bold">Premium Club</span>
                    <span className="text-white/40">•</span>
                    <span className="text-white/60">Est. 1892</span>
                    <span className="text-white/40">•</span>
                    <span className="flex items-center gap-1.5 text-white/60">
                       <span className="w-4 h-3 bg-blue-600 border border-white/10 rounded-sm"></span> Brazil
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-white/40">
                    <IconPhone size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Contact</p>
                    <p className="text-white text-sm font-medium">+55 11 9999-8888</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-white/40">
                    <IconMail size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Email</p>
                    <p className="text-white text-sm font-medium">liverpool.fc@gmail.com</p>
                  </div>
                </div>
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
              title="John Smith viewed CV for Marcus Johnson" 
              time="2 hours ago" 
            />
            <ActivityItem 
              icon={<IconShare size={18} />} 
              title="Profile shared: David Martinez" 
              time="5 hours ago" 
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard icon={<IconSchool size={20} />} label="Academies" value="4" />
        <StatCard icon={<IconUsers size={20} />} label="Teams" value="19" />
        <StatCard icon={<IconUser size={20} />} label="Players" value="156" />
        <StatCard icon={<IconTrophy size={20} />} label="Coaches" value="12" />
        <StatCard icon={<IconHeart size={20} />} label="Liked CVs" value="42" />
        <StatCard icon={<IconEye size={20} />} label="Profile share" value="18" />
      </div>
    </div>
  );
};

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
  <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all text-center space-y-4 group">
    <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mx-auto text-white/40 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-[32px] font-black italic text-white italic leading-none">{value}</p>
      <p className="text-[11px] text-white/40 uppercase font-bold tracking-widest">{label}</p>
    </div>
  </div>
);

export default ClubDashboard;
