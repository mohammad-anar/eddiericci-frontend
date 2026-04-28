"use client";
import React from "react";
import { 
  IconUsers, 
  IconUser, 
  IconSchool, 
  IconFileText, 
  IconTrophy 
} from "@tabler/icons-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from "recharts";

const AnalyticsStatCard = ({ icon: Icon, value, label }: { icon: any, value: string | number, label: string }) => (
  <div className="bg-[#0A0A0A] border border-white/20 rounded-2xl p-6 flex flex-col gap-4 flex-1">
    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
       <Icon size={20} />
    </div>
    <div>
      <p className="text-white text-3xl font-black font-orbitron">{value}</p>
      <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

const earningsData = [
  { name: "Jan-Feb", value: 500 },
  { name: "Mar-Apr", value: 720 },
  { name: "May-Jun", value: 730 },
  { name: "Jul-Aug", value: 620 },
  { name: "Sept-Oct", value: 610 },
  { name: "Nov-Dec", value: 950 },
];

const pieData = [
  { name: "Gold CV", value: 60 },
  { name: "Silver CV", value: 40 },
];

const engagementData = [
  { name: "Jan-Feb", completed: 5, pending: 3 },
  { name: "Mar-Apr", completed: 4, pending: 6 },
  { name: "May-Jun", completed: 7, pending: 4 },
  { name: "Jul-Aug", completed: 8, pending: 3 },
  { name: "Sept-Oct", completed: 5, pending: 3 },
  { name: "Nov-Dec", completed: 3, pending: 4 },
];

export const Analytics = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Analytics</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Deep insights into player and team performance</p>
      </div>

      {/* Summary Stats */}
      <div className="bg-[#111111] border border-white/20 rounded-[40px] p-10">
        <div className="flex gap-6">
          <AnalyticsStatCard icon={IconUsers} value="4" label="Teams" />
          <AnalyticsStatCard icon={IconUser} value="64" label="Players" />
          <AnalyticsStatCard icon={IconSchool} value="12" label="Coaches" />
          <AnalyticsStatCard icon={IconFileText} value="12" label="Game Reports" />
          <AnalyticsStatCard icon={IconTrophy} value="60%" label="CV Silver to Gold" />
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="flex flex-col gap-8">
        {/* Earnings Trend */}
        <div className="bg-[#111111] border border-white/20 rounded-[40px] p-10 flex flex-col gap-8">
           <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Earnings Trend</h2>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff40" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#ffffff40" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #ffffff20', borderRadius: '12px' }}
                    itemStyle={{ color: '#E31B23', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#E31B23" 
                    strokeWidth={3} 
                    dot={{ r: 6, fill: "#E31B23", strokeWidth: 2, stroke: "#111111" }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Bottom Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* CV Status Distribution */}
           <div className="bg-[#111111] border border-white/20 rounded-[40px] p-10 flex flex-col gap-8">
              <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight text-center md:text-left">CV Status Distribution</h2>
              <div className="h-[400px] w-full relative flex flex-col items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                         data={pieData}
                         cx="50%"
                         cy="45%"
                         innerRadius={0}
                         outerRadius={140}
                         paddingAngle={0}
                         dataKey="value"
                         stroke="none"
                       >
                          <Cell fill="#991111" />
                          <Cell fill="#FFFFFF" />
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="flex gap-8 mt-4">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-[#991111] rounded-sm" />
                       <span className="text-white/60 text-xs font-bold uppercase">Gold CV</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-white rounded-sm" />
                       <span className="text-white/60 text-xs font-bold uppercase">Silver CV</span>
                    </div>
                 </div>
                 {/* Percent Labels on the Chart */}
                 <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 text-white font-black font-orbitron text-2xl rotate-[-45deg]">60%</div>
                 <div className="absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2 text-[#111111] font-black font-orbitron text-2xl rotate-[15deg]">40%</div>
              </div>
           </div>

           {/* Game Reports Engagement */}
           <div className="bg-[#111111] border border-white/20 rounded-[40px] p-10 flex flex-col gap-8">
              <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Game Reports Engagement</h2>
              <div className="h-[400px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                       <XAxis 
                         dataKey="name" 
                         stroke="#ffffff40" 
                         fontSize={12} 
                         tickLine={false} 
                         axisLine={false}
                         dy={10}
                       />
                       <YAxis 
                         stroke="#ffffff40" 
                         fontSize={12} 
                         tickLine={false} 
                         axisLine={false}
                         dx={-10}
                       />
                       <Tooltip 
                         cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                         contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #ffffff20', borderRadius: '12px' }}
                       />
                       <Bar dataKey="completed" fill="#ffffff20" radius={[4, 4, 0, 0]} />
                       <Bar dataKey="pending" fill="#ffffff40" radius={[4, 4, 0, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};