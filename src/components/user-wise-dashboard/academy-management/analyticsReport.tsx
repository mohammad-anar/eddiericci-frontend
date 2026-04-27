"use client";

import React from "react";
import { 
  IconDownload, 
  IconCurrencyDollar, 
  IconTrendingUp, 
  IconUsers, 
  IconTrophy,
  IconFileText
} from "@tabler/icons-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from "recharts";

const revenueData = [
  { month: "Jan", Fees: 8500, Events: 1200, Store: 800 },
  { month: "Feb", Fees: 9200, Events: 1500, Store: 1000 },
  { month: "Mar", Fees: 8800, Events: 1100, Store: 700 },
  { month: "Apr", Fees: 9600, Events: 1800, Store: 1200 },
  { month: "May", Fees: 9000, Events: 1300, Store: 900 },
  { month: "Jun", Fees: 10500, Events: 2000, Store: 1100 },
];

const expenseData = [
  { name: "Match Costs", value: 4000, color: "#FF0000" },
  { name: "Training Equipment", value: 3000, color: "#FF4D4D" },
  { name: "Ground Maintenance", value: 2500, color: "#FF8080" },
  { name: "Staff Salaries", value: 12000, color: "#FFB3B3" },
  { name: "Other", value: 2500, color: "#808080" },
];

const detailedReports = [
  { title: "Fees Summary Report", date: "January 2026" },
  { title: "Match Expenses Report", date: "Q1 2026" },
  { title: "Event Costs Summary", date: "All Time" },
];

export const AnalyticsReport = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Reports</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Financial and performance analytics</p>
        </div>
        <button className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20">
          <IconDownload size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Export Report</span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "$54,280", icon: IconCurrencyDollar, color: "text-[#E31B23]", bg: "bg-[#E31B23]/10" },
          { label: "Total Expenses", value: "$24,000", icon: IconTrendingUp, color: "text-[#4ADE80]", bg: "bg-[#4ADE80]/10" },
          { label: "Active Players", value: "64", icon: IconUsers, color: "text-[#60A5FA]", bg: "bg-[#60A5FA]/10" },
          { label: "Matches Won", value: "18", icon: IconTrophy, color: "text-[#FBBF24]", bg: "bg-[#FBBF24]/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex items-center gap-6 shadow-xl hover:border-white/25 transition-all group">
            <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center border border-white/5`}>
              <stat.icon size={32} className={stat.color} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-white font-orbitron tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Breakdown */}
        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-8 shadow-2xl">
          <h2 className="text-xl font-black uppercase text-white font-orbitron">Revenue Breakdown</h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255,255,255,0.4)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.4)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ 
                    backgroundColor: '#111111', 
                    border: '1px solid rgba(255,255,255,0.15)', 
                    borderRadius: '16px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="rect"
                  formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mr-4">{value}</span>}
                />
                <Bar dataKey="Fees" fill="#E31B23" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="Events" fill="#FF4D4D" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="Store" fill="#FFB3B3" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses Distribution */}
        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-8 shadow-2xl">
          <h2 className="text-xl font-black uppercase text-white font-orbitron">Expenses Distribution</h2>
          <div className="h-[350px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111111', 
                    border: '1px solid rgba(255,255,255,0.15)', 
                    borderRadius: '16px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  iconType="circle"
                  formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Reports List */}
      <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-8 shadow-2xl mb-8">
        <h2 className="text-xl font-black uppercase text-white font-orbitron">Detailed Reports</h2>
        <div className="flex flex-col gap-4">
          {detailedReports.map((report, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-[24px] p-6 flex justify-between items-center hover:border-white/20 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
                  <IconFileText size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight">{report.title}</h3>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-0.5">{report.date}</p>
                </div>
              </div>
              <button className="bg-white/5 hover:bg-white/10 border border-white/15 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg">
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReport;
