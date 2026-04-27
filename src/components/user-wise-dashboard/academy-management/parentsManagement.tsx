"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { 
  IconSearch, 
  IconPlus, 
  IconFilter, 
  IconChevronDown,
  IconMessage,
  IconUser,
  IconMail,
  IconPhone,
  IconBriefcase,
  IconMapPin,
  IconNote
} from "@tabler/icons-react";

const parents = [
  {
    id: 1,
    name: "Robert Silva",
    email: "robert.silva@email.com",
    phone: "+1 234 567 8900",
    linkedPlayers: "Marcus Silva",
    paymentStatus: "Paid",
    lastContact: "2 days ago",
    avatar: "https://i.pravatar.cc/100?u=robert"
  },
  {
    id: 2,
    name: "Linda Chen",
    email: "linda.chen@email.com",
    phone: "+1 234 567 8901",
    linkedPlayers: "David Chen",
    paymentStatus: "Paid",
    lastContact: "1 week ago",
    avatar: "https://i.pravatar.cc/100?u=linda"
  },
  {
    id: 3,
    name: "Michael Jordan",
    email: "michael.j@email.com",
    phone: "+1 234 567 8902",
    linkedPlayers: "Alex Jordan",
    paymentStatus: "Unpaid",
    lastContact: "3 days ago",
    avatar: "https://i.pravatar.cc/100?u=michael"
  }
];

const playersData = [
  { id: 1, name: "Marcus Silva", team: "U-15", position: "Forward", avatar: "https://i.pravatar.cc/100?u=marcus" },
  { id: 2, name: "Alex Jordan", team: "U-15", position: "Forward", avatar: "https://i.pravatar.cc/100?u=alex" },
  { id: 3, name: "Sarah Williams", team: "U-15", position: "Forward", avatar: "https://i.pravatar.cc/100?u=sarah" },
  { id: 4, name: "David Chen", team: "U-15", position: "Forward", avatar: "https://i.pravatar.cc/100?u=david" },
];

export const ParentsManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Parents</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Manage parent information and communication</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20"
        >
          <IconPlus size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Add New Parent</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#111111] rounded-3xl border border-white/15 p-4 flex gap-4 shadow-xl">
        <div className="relative flex-1">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input 
            type="text" 
            placeholder="Search parents by name, email, or phone..."
            className="w-full bg-white/[0.02] border border-white/15 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-all"
          />
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/15 text-white/60 hover:text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all">
          <IconFilter size={20} />
          <span className="text-sm font-bold">Filters</span>
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-8 shadow-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase text-white font-orbitron">All Parents (3)</h2>
          <button className="bg-white/5 border border-white/15 px-4 py-2 rounded-xl text-[11px] font-bold text-white/60 hover:text-white flex items-center gap-2 transition-all">
            Status
            <IconChevronDown size={14} />
          </button>
        </div>

        {/* Parents Table */}
        <div className="rounded-2xl border border-white/15 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/15 bg-white/[0.01]">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Parent Name</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Email</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Phone</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Linked Players</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Payment Status</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Last Contact</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((p, index) => (
                <tr key={p.id} className={`hover:bg-white/[0.02] transition-colors group ${index !== parents.length - 1 ? 'border-b border-white/15' : ''}`}>
                  <td className="py-5 px-6 border-r border-white/15">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 shrink-0">
                        <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-bold text-white whitespace-nowrap">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{p.email}</td>
                  <td className="py-5 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{p.phone}</td>
                  <td className="py-5 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{p.linkedPlayers}</td>
                  <td className="py-5 px-6 border-r border-white/15 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      p.paymentStatus === "Paid" ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "bg-[#EF4444]/10 text-[#EF4444]"
                    }`}>
                      {p.paymentStatus}
                    </span>
                  </td>
                  <td className="py-5 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{p.lastContact}</td>
                  <td className="py-5 px-6 text-center">
                    <button className="flex items-center gap-2 mx-auto text-white/40 hover:text-white transition-colors group">
                      <IconMessage size={18} />
                      <span className="text-[11px] font-black uppercase tracking-widest">Message</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Parent Modal */}
      <DashboardModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Parent/Guardian"
        subtitle="Register a new parent or guardian account"
        showBackButton
        footer={
          <div className="flex justify-end gap-4">
            <button 
              onClick={() => setShowAddModal(false)}
              className="px-8 py-3.5 rounded-xl border border-white/30 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-[#E31B23] hover:bg-[#C2181F] text-[11px] font-black uppercase tracking-widest text-white flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20">
              <IconPlus size={18} />
              Add Parent
            </button>
          </div>
        }
      >
        <div className="space-y-10">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  First Name <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Enter first name" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Last Name <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Enter last name" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Relationship <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option>Select an option</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Guardian</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Occupation
                </label>
                <input type="text" placeholder="Occupation" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Email Address <span className="text-[#E31B23]">*</span>
                </label>
                <input type="email" placeholder="parent@example.com" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Primary Phone <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="+1 (555) 000-0000" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Alternate Phone</label>
                <input type="text" placeholder="+1 (555) 000-0000" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Street Address <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Street address" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  City <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="City" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  ZIP Code <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="ZIP Code" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
            </div>
          </div>

          {/* Linked Players */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Linked Players</h3>
            <p className="text-[11px] text-white/40 font-bold uppercase tracking-widest -mt-4">Select the player(s) this parent/guardian is responsible for</p>
            <div className="space-y-3">
              {playersData.map((player) => (
                <div key={player.id} className="bg-[#111111] border border-white/15 rounded-2xl p-4 flex items-center gap-4 hover:border-white/30 transition-all group cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#E31B23] focus:ring-[#E31B23]" />
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 shrink-0">
                    <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">{player.name}</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{player.team} • {player.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Additional Notes</h3>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Notes</label>
              <textarea 
                placeholder="Any additional information or special requirements..." 
                className="w-full h-32 bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default ParentsManagement;