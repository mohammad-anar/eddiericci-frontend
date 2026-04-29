"use client";
import React from "react";
import { 
  IconEye,
  IconCheck,
  IconX
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";

const StatusPill = ({ status }: { status: "Pending" | "Approved" | "Rejected" }) => {
  const styles = {
    Pending: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Rejected: "bg-red-500/10 text-red-400 border-red-500/20"
  };
  return (
    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
};

const ActionButtons = () => (
  <div className="flex items-center justify-center gap-3">
     <button className="text-white/40 hover:text-white transition-all"><IconEye size={18} /></button>
     <button className="text-emerald-500/60 hover:text-emerald-500 transition-all"><IconCheck size={18} /></button>
     <button className="text-red-500/60 hover:text-red-500 transition-all"><IconX size={18} /></button>
  </div>
);

interface ApprovalRow {
  name: string;
  category?: string;
  role: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface StoryRow {
  title: string;
  role: string;
  date: string;
  status: "Approved" | "Pending";
}

export const SuperAdminApprovals = () => {
  const approvalColumns: Column<ApprovalRow>[] = [
    {
      header: "Name",
      key: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden border border-white/20">
             <img src={`https://i.pravatar.cc/150?u=${row.name}`} alt={row.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white text-sm font-black uppercase">{row.name}</p>
            {row.category && <p className="text-red-500 text-[10px] font-bold uppercase">{row.category}</p>}
          </div>
        </div>
      )
    },
    { header: "Role", key: "role", align: "center", cellClassName: "text-white/60 text-sm font-medium" },
    { header: "Date", key: "date", align: "center", cellClassName: "text-white/60 text-sm font-medium" },
    { 
      header: "Status", 
      key: "status", 
      align: "center", 
      render: (row) => <StatusPill status={row.status} /> 
    },
    {
      header: "Actions",
      key: "actions",
      align: "center",
      render: () => <ActionButtons />
    }
  ];

  const storyColumns: Column<StoryRow>[] = [
    {
      header: "Story Title",
      key: "title",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden border border-white/20">
             <img src={`https://i.pravatar.cc/150?u=${row.title}`} alt={row.title} className="w-full h-full object-cover" />
          </div>
          <p className="text-white text-sm font-black uppercase max-w-[250px] leading-tight">{row.title}</p>
        </div>
      )
    },
    { header: "Role", key: "role", align: "center", cellClassName: "text-white/60 text-sm font-medium" },
    { header: "Date", key: "date", align: "center", cellClassName: "text-white/60 text-sm font-medium" },
    { 
      header: "Status", 
      key: "status", 
      align: "center", 
      render: (row) => <StatusPill status={row.status} /> 
    },
    {
      header: "Action",
      key: "actions",
      align: "center",
      render: () => <ActionButtons />
    }
  ];

  const approvalData: ApprovalRow[] = [
    { name: "Elite FC Academy", category: "Premier League Academy", role: "Academy", date: "2024-01-15", status: "Pending" },
    { name: "Champions Academy", category: "Premier League Academy", role: "Academy", date: "2024-02-01", status: "Approved" },
    { name: "Elite FC Academy", category: "Premier League Academy", role: "Academy", date: "2024-02-01", status: "Rejected" },
  ];

  const storyData: StoryRow[] = [
    { title: "Academy Graduate Makes First Team Debut", role: "Academies", date: "2024-01-15", status: "Approved" },
    { title: "Agent Luis Secures Trial for Midfielder at Benfica Academy", role: "Agents", date: "2024-02-01", status: "Pending" },
    { title: "1-114 Winger Signed by National Talent Centre", role: "Clubs", date: "2023-12-01", status: "Approved" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron tracking-tight uppercase">Approvals & Verifications</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Review and approve pending applications</p>
      </div>

      {/* Approvals Section */}
      <div className="bg-[#111111] border border-white/20 rounded-[40px] p-10 flex flex-col gap-8">
        <div className="flex justify-between items-center">
           <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Approvals</h2>
           <div className="flex gap-2">
              {["Academies", "Agents", "Clubs"].map(tab => (
                <Button key={tab} variant="outline" className="bg-black/40 border-white/10 h-10 px-6 rounded-xl text-white/60 text-[10px] font-black uppercase tracking-wider hover:text-white">
                  {tab}
                </Button>
              ))}
           </div>
        </div>
        <DashboardTable columns={approvalColumns} data={approvalData} />
      </div>

      {/* Success Story Section */}
      <div className="bg-[#111111] border border-white/20 rounded-[40px] p-10 flex flex-col gap-8">
        <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Success Story</h2>
        <DashboardTable columns={storyColumns} data={storyData} />
      </div>
    </div>
  );
};
