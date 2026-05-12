"use client";
import React, { useState } from "react";
import {
  IconFileText,
  IconCircleCheck,
  IconClock,
  IconCalendar,
  IconPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";

const stats = [
  { label: "Total Reports", value: "6", icon: IconFileText },
  { label: "Completed", value: "5", icon: IconCircleCheck },
  { label: "Pending", value: "1", icon: IconClock },
  { label: "This Month", value: "22", icon: IconCalendar },
];

const reportData = [
  { id: 1, name: "Marcus Silva", position: "Forward", rating: 9.2, match: "vs Chelsea U19", goals: 2, assists: 1, date: "2024-01-15", amount: "$ 6.99", status: "Pending", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "David Chen", position: "Midfielder", rating: 8.8, match: "vs Chelsea U19", goals: 1, assists: 3, date: "2024-02-01", amount: "$ 6.99", status: "Pending", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Alex Jonson", position: "Defender", rating: 8.5, match: "vs Liverpool U19", goals: 3, assists: 0, date: "2023-12-01", amount: "$ 6.99", status: "Completed", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "James Brown", position: "Goalkeeper", rating: 9.0, match: "vs City U19", goals: 0, assists: 0, date: "2024-03-10", amount: "$ 6.99", status: "Pending", avatar: "https://i.pravatar.cc/150?u=4" },
];

export const GameReports = () => {
  const router = useRouter();

  const columns: Column<typeof reportData[0]>[] = [
    {
      header: "Name",
      key: "name",
      render: (player) => (
        <div className="flex items-center gap-3">
          <img src={player.avatar} className="w-10 h-10 rounded-full object-cover" alt={player.name} />
          <div>
            <div className="text-sm font-bold text-white">{player.name}</div>
            <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{player.position}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Rating",
      key: "rating",
      align: "center",
      render: (player) => <span className="text-sm font-black text-red-600 italic">{player.rating}</span>,
    },
    { header: "Matches", key: "match", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Goals", key: "goals", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Assists", key: "assists", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Date", key: "date", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Amount", key: "amount", align: "center", cellClassName: "text-sm text-gray-300 font-bold" },
    {
      header: "Status",
      key: "status",
      render: (player) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${player.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
          }`}>
          {player.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => (
        <TableActionButtons
          onView={() => console.log("View report")}
          viewColor="text-[#E31B23] hover:text-white border-[#E31B23]/20 hover:border-[#E31B23] bg-[#E31B23]/5 hover:bg-[#E31B23]"
        />
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Game Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Professional performance analysis</p>
        </div>
        <button
          onClick={() => router.push("/dashboard/player/game-reports/create")}
          className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <IconPlus size={16} /> Create New Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-3xl font-black text-white italic mb-1">{stat.value}</div>
                <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl border border-white/20 bg-[#0D0D0D]">
        <DashboardTable columns={columns} data={reportData} className="border-white/10" />
      </div>
    </div>
  );
};
