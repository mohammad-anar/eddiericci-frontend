"use client";
import React from "react";
import { 
  IconFileText, 
  IconStar, 
  IconCircleCheck, 
  IconClock, 
  IconCreditCard, 
  IconPlus,
  IconEye,
  IconDownload,
  IconReportAnalytics
} from "@tabler/icons-react";

const stats = [
  { label: "Total Reports", value: "6", icon: IconFileText },
  { label: "Average Rating", value: "8.5", icon: IconStar },
  { label: "Completed", value: "5", icon: IconCircleCheck },
  { label: "Pending", value: "1", icon: IconClock },
];

const reportData = [
  { id: 1, report: "vs Chelsea U19", rating: "8.5", amount: "$ 6.99", date: "2024-01-15", status: "Paid" },
  { id: 2, report: "vs Chelsea U19", rating: "7.8", amount: "$ 6.99", date: "2024-02-01", status: "Paid" },
  { id: 3, report: "vs Liverpool U19", rating: "0.0", amount: "$ 6.99", date: "2023-12-01", status: "Pending" },
  { id: 4, report: "vs City U19", rating: "8.2", amount: "$ 6.99", date: "2024-03-10", status: "Paid" },
];

export const GameReports = () => {
  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-normal text-white uppercase tracking-tighter font-heading">
            Game Reports
          </h1>
          <p className="text-gray-400 text-lg font-light tracking-tight">
            Professional Performance Analysis
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2.5 rounded-xl bg-[#0D0D0D] border border-white/10 text-xs font-bold text-white hover:bg-[#1A1A1A] transition-all flex items-center gap-2 uppercase tracking-wider">
            <IconCreditCard size={18} stroke={1.5} />
            Payment History
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2 uppercase tracking-wider">
            <IconReportAnalytics size={18} stroke={1.5} />
            Create New Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-8 rounded-[40px] border border-white/5 bg-[#0D0D0D]/40 backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-3xl border border-white/5 bg-[#0A0A0A]/60 group hover:border-white/10 transition-all duration-500"
            >
              <div className="flex flex-col gap-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                  <stat.icon size={20} stroke={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-white tracking-tighter font-orbitron">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="p-10 rounded-[40px] border border-white/5 bg-[#0D0D0D]/40 backdrop-blur-xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">
              <th className="pb-6 pl-4">Report</th>
              <th className="pb-6">Rating</th>
              <th className="pb-6">Amount</th>
              <th className="pb-6">Approval Date</th>
              <th className="pb-6">Status</th>
              <th className="pb-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {reportData.map((item) => (
              <tr key={item.id} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                <td className="py-6 pl-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500">
                      <IconFileText size={18} stroke={1.5} />
                    </div>
                    <span className="text-white font-bold">{item.report}</span>
                  </div>
                </td>
                <td className="py-6">
                  <span className="text-red-600 font-bold">{item.rating}</span>
                </td>
                <td className="py-6 text-gray-300">
                  {item.amount}
                </td>
                <td className="py-6 text-gray-400">
                  {item.date}
                </td>
                <td className="py-6">
                  <div className={`flex items-center gap-2 ${item.status === 'Paid' ? 'text-green-500' : 'text-orange-500'}`}>
                    {item.status === 'Paid' ? <IconCircleCheck size={16} /> : <IconClock size={16} />}
                    <span className="text-xs font-bold uppercase tracking-wider">{item.status}</span>
                  </div>
                </td>
                <td className="py-6">
                  <div className="flex items-center justify-center gap-4">
                    <button className="text-red-600 hover:text-red-400 transition-colors">
                      <IconEye size={18} stroke={1.5} />
                    </button>
                    <button className="text-white hover:text-gray-300 transition-colors">
                      <IconDownload size={18} stroke={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
