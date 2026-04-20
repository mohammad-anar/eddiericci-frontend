"use client";

import React from "react";
import Image from "next/image";
import { 
  IconMail, 
  IconPhone, 
  IconUsers, 
  IconCurrencyDollar,
  IconClock,
  IconCreditCard,
  IconCalendarFilled
} from "@tabler/icons-react";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
        Super Admin Dashboard / <span className="text-white">Dashboard</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-6">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden h-[450px] border border-white/5 group">
          {/* Background Image Placeholder */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-10 w-full flex flex-col justify-end gap-6">
            <div className="space-y-4">
              <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase w-fit tracking-[0.2em]">
                Super Admin
              </div>
              <h1 className="text-7xl font-black italic tracking-tighter text-white uppercase leading-none">K10 Football</h1>
            </div>

            <div className="flex flex-wrap gap-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white/40">
                  <IconPhone size={22} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Contact</p>
                  <p className="text-white text-lg font-bold font-heading">+55 11 9999-8888</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white/40">
                  <IconMail size={22} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Email</p>
                  <p className="text-white text-lg font-bold font-heading">contact@santosfc.academy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Approvals Side Panel */}
        <div className="bg-[#111111] rounded-3xl border border-white/5 p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-[#E31B23]">
            <IconCalendarFilled size={24} stroke={2.5} />
            <h2 className="text-xl font-black italic uppercase tracking-tight text-white">Pending Approvals</h2>
          </div>

          <div className="space-y-3">
            <ApprovalItem 
              avatar="https://i.pravatar.cc/100?u=1"
              name="Elite FC Academy" 
              type="Academy"
              typeColor="text-red-500"
              time="4h ago" 
            />
            <ApprovalItem 
              avatar="https://i.pravatar.cc/100?u=2"
              name="David Chen" 
              type="Agent"
              typeColor="text-orange-500"
              time="1d ago" 
            />
            <ApprovalItem 
              avatar="https://i.pravatar.cc/100?u=3"
              name="Manchester United" 
              type="Club"
              typeColor="text-blue-500"
              time="2d ago" 
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<IconUsers size={24} />} label="Total Users" value="1,245" />
        <StatCard icon={<IconCurrencyDollar size={24} />} label="Revenue This Month" value="$ 197,400" />
        <StatCard icon={<IconClock size={24} />} label="Pending Verifications" value="89" />
        <StatCard icon={<IconCreditCard size={24} />} label="Active Subscriptions" value="342" />
      </div>
    </div>
  );
};

const ApprovalItem = ({ avatar, name, type, typeColor, time }: { avatar: string, name: string, type: string, typeColor: string, time: string }) => (
  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all group flex items-center gap-4 cursor-pointer">
    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
      <img src={avatar} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-white group-hover:text-primary transition-colors truncate">{name}</p>
      <p className={`text-[10px] font-bold uppercase tracking-wider ${typeColor}`}>{type}</p>
    </div>
    <div className="text-[10px] text-white/30 font-bold uppercase shrink-0 whitespace-nowrap">
      {time}
    </div>
  </div>
);

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all space-y-6 group">
    <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-3xl font-black italic text-white uppercase leading-none tracking-tight">{value}</p>
      <p className="text-[11px] text-white/40 uppercase font-bold tracking-widest">{label}</p>
    </div>
  </div>
);

export default AdminDashboard;
