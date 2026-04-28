"use client";
import React from "react";
import { 
  IconCircleCheck, 
  IconCircleX, 
  IconUserCheck, 
  IconUserX, 
  IconPlus, 
  IconTrendingUp,
  IconEye,
  IconPencil,
  IconDots
} from "@tabler/icons-react";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";

const coachData = [
  { id: "1", name: "Carlos Silva", role: "Assistant Coach", teams: "Santos U17", players: 16, cvType: "Silver", status: "Active", avatar: "https://i.pravatar.cc/100?u=carlos" },
  { id: "2", name: "Maria Santos", role: "Head Coach", teams: "Santos U17", players: 14, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=maria" },
  { id: "3", name: "João Pedro", role: "Assistant Coach", teams: "Santos U17", players: 15, cvType: "Silver", status: "Vacation", avatar: "https://i.pravatar.cc/100?u=joao" },
  { id: "4", name: "Roberto Lima", role: "Head Coach", teams: "Santos U17", players: 13, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=roberto" },
];

const playerData = [
  { id: "1", name: "Marcus Silva", role: "Forward", rating: 9.2, matches: 28, goals: 15, assists: 8, cvType: "Silver", status: "Active", avatar: "https://i.pravatar.cc/100?u=marcus" },
  { id: "2", name: "David Chen", role: "Midfielder", rating: 8.8, matches: 30, goals: 5, assists: 12, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=david" },
  { id: "3", name: "Alex Jonson", role: "Defender", rating: 8.5, matches: 29, goals: 2, assists: 3, cvType: "Silver", status: "Injured", avatar: "https://i.pravatar.cc/100?u=alex" },
  { id: "4", name: "James Brown", role: "Goalkeeper", rating: 9.0, matches: 30, goals: 0, assists: 0, cvType: "Bronze", status: "Active", avatar: "https://i.pravatar.cc/100?u=james" },
];

export const CoachAndPlayer = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Coach and Players</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Manage your Coach and Players</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStatCard icon={<IconCircleCheck size={24} />} label="Active Coach" value="16" />
        <DashboardStatCard icon={<IconCircleX size={24} />} label="Vacation Coach" value="2" />
        <DashboardStatCard icon={<IconUserCheck size={24} />} label="Active Players" value="64" />
        <DashboardStatCard icon={<IconUserX size={24} />} label="Injured Players" value="5" />
      </div>

      {/* Team Capacity Section */}
      <div className="bg-[#111111] rounded-3xl border border-white/20 p-8 flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Team Capacity</h2>
          <p className="text-white/60 font-medium text-xs">You're using 3 out of 4 available team slots</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-2xl font-black text-[#E31B23] font-orbitron">3/4</p>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Teams</p>
          </div>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white px-8 py-4 rounded-xl transition-all">
            <IconPlus size={16} />
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Professional Coach Section */}
      <div className="bg-[#111111] rounded-3xl border border-white/20 p-6 md:p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Professional Coach</h2>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white px-6 py-3 rounded-xl transition-all">
            <IconPlus size={16} />
            Add Coach
          </button>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-white/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20 bg-white/[0.02]">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20">Name</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Teams</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">player</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Cv Type</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Status</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coachData.map((coach, index) => (
                <tr key={coach.id} className={`group hover:bg-white/[0.02] transition-colors ${index !== coachData.length - 1 ? 'border-b border-white/20' : ''}`}>
                  <td className="py-6 px-6 border-r border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-base font-bold text-white truncate">{coach.name}</p>
                        <p className="text-[10px] font-bold text-[#E31B23] uppercase tracking-wider">{coach.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-medium text-white/60">
                    {coach.teams}
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-white font-orbitron">
                    {coach.players}
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center">
                    <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${
                      coach.cvType === "Gold" ? "bg-[#FBBF24] text-black border-[#FBBF24]" : "bg-white text-black border-white"
                    }`}>
                      {coach.cvType}
                    </span>
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${
                      coach.status === "Active" 
                        ? "text-[#00FF85] border-[#00FF85]/20 bg-[#00FF85]/5" 
                        : "text-[#FF3B30] border-[#FF3B30]/20 bg-[#FF3B30]/5"
                    }`}>
                      {coach.status}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <TableActionButtons 
                      onView={() => {}}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Professional Player Section */}
      <div className="bg-[#111111] rounded-3xl border border-white/20 p-6 md:p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Professional player</h2>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white px-6 py-3 rounded-xl transition-all">
            <IconPlus size={16} />
            Add Player
          </button>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-white/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20 bg-white/[0.02]">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20">Name</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Rating</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Matches</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Goals</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Assists</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Cv Type</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Status</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {playerData.map((player, index) => (
                <tr key={player.id} className={`group hover:bg-white/[0.02] transition-colors ${index !== playerData.length - 1 ? 'border-b border-white/20' : ''}`}>
                  <td className="py-6 px-6 border-r border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-base font-bold text-white truncate">{player.name}</p>
                        <p className="text-[10px] font-bold text-[#E31B23] uppercase tracking-wider">{player.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-[#E31B23] font-orbitron">
                    {player.rating}
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-white font-orbitron">
                    {player.matches}
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-white font-orbitron">
                    {player.goals}
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-white font-orbitron">
                    {player.assists}
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center">
                    <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${
                      player.cvType === "Gold" ? "bg-[#FBBF24] text-black border-[#FBBF24]" : 
                      player.cvType === "Silver" ? "bg-white text-black border-white" :
                      "bg-[#E8C5AF] text-black border-[#E8C5AF]"
                    }`}>
                      {player.cvType}
                    </span>
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${
                      player.status === "Active" 
                        ? "text-[#00FF85] border-[#00FF85]/20 bg-[#00FF85]/5" 
                        : "text-[#FF3B30] border-[#FF3B30]/20 bg-[#FF3B30]/5"
                    }`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <TableActionButtons 
                      onView={() => {}}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
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

export default CoachAndPlayer;