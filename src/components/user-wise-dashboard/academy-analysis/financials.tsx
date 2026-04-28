"use client";
import React from "react";
import { 
  IconFileText, 
  IconClock, 
  IconCircleX, 
  IconCoin, 
  IconCalendar,
  IconEye
} from "@tabler/icons-react";

const FinancialStatCard = ({ icon: Icon, value, label, iconColor }: { icon: any, value: string | number, label: string, iconColor: string }) => (
  <div className="bg-[#0A0A0A] border border-white/20 rounded-2xl p-6 flex flex-col gap-4 flex-1">
    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
       <Icon size={20} className={iconColor} />
    </div>
    <div>
      <p className="text-white text-3xl font-black font-orbitron">{value}</p>
      <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

const StatusPill = ({ status }: { status: "Completed" | "Pending" | "Rejected" }) => {
  const styles = {
    Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Rejected: "bg-red-500/10 text-red-400 border-red-500/20"
  };
  return (
    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
};

export const Financials = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Financials</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Track your academy's revenue and transactions</p>
      </div>

      {/* Summary Container */}
      <div className="bg-[#111111] border border-white/20 rounded-[40px] p-10 flex flex-col gap-10">
        <div className="flex gap-6">
          <FinancialStatCard icon={IconFileText} value="137" label="Game Reports" iconColor="text-white/60" />
          <FinancialStatCard icon={IconClock} value="30" label="pending" iconColor="text-yellow-500" />
          <FinancialStatCard icon={IconCircleX} value="7" label="Rejected" iconColor="text-red-500" />
          <FinancialStatCard icon={IconCoin} value="$ 279.6" label="Total Earnings" iconColor="text-white/60" />
          <FinancialStatCard icon={IconCalendar} value="$ 125.82" label="This Month" iconColor="text-white/60" />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#111111] border border-white/20 rounded-[40px] p-8">
        <div className="border border-white/20 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/20 text-[10px] font-black text-white uppercase tracking-wider">
                <th className="px-6 py-4 border-r border-white/20">Name</th>
                <th className="px-6 py-4 border-r border-white/20 text-center">Report</th>
                <th className="px-6 py-4 border-r border-white/20 text-center">Amount</th>
                <th className="px-6 py-4 border-r border-white/20 text-center">My Amount</th>
                <th className="px-6 py-4 border-r border-white/20 text-center">Date</th>
                <th className="px-6 py-4 border-r border-white/20 text-center">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {[
                { name: "Marcus Silva", pos: "Forward", report: "Under 19 vs Chelsea U19", amount: "$ 6.99", myAmount: "$ 2.796", date: "2024-01-15", status: "Completed" as const },
                { name: "David Chen", pos: "Midfielder", report: "Under 18 vs Chelsea U18", amount: "$ 6.99", myAmount: "$ 2.796", date: "2024-02-01", status: "Pending" as const },
                { name: "Alex Jonson", pos: "Defender", report: "Under 17 vs Liverpool U17", amount: "$ 6.99", myAmount: "$ 2.796", date: "2023-12-01", status: "Completed" as const },
                { name: "James Brown", pos: "Goalkeeper", report: "Under 16 vs City U16", amount: "$ 6.99", myAmount: "$ 2.796", date: "2024-03-10", status: "Rejected" as const },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5 border-r border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden border border-white/20">
                         <img src={`https://i.pravatar.cc/150?u=${row.name}`} alt={row.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-black uppercase">{row.name}</p>
                        <p className="text-red-500 text-[10px] font-bold uppercase">{row.pos}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 border-r border-white/20 text-center">
                    <span className="text-white/60 text-sm font-medium">{row.report}</span>
                  </td>
                  <td className="px-6 py-5 border-r border-white/20 text-center">
                    <span className="text-white text-sm font-black font-orbitron">{row.amount}</span>
                  </td>
                  <td className="px-6 py-5 border-r border-white/20 text-center">
                    <span className="text-white text-sm font-black font-orbitron">{row.myAmount}</span>
                  </td>
                  <td className="px-6 py-5 border-r border-white/20 text-center">
                    <span className="text-white/60 text-sm font-medium">{row.date}</span>
                  </td>
                  <td className="px-6 py-5 border-r border-white/20 text-center">
                    <StatusPill status={row.status} />
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all hover:scale-110">
                       <IconEye size={20} stroke={2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
