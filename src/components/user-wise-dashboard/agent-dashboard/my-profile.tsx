"use client";

import React from "react";
import { 
  IconCircleCheck, 
  IconEdit, 
  IconCloudUpload,
  IconShieldCheck,
  IconCertificate,
  IconPhone,
  IconMail
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Reusable Card header component
const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-2 text-white">
      <IconCircleCheck className="text-green-500 w-5 h-5" />
      <h2 className="text-lg font-bold font-orbitron">{title}</h2>
    </div>
    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">
      <IconEdit className="w-4 h-4" />
    </div>
  </div>
);

// We need the hero from the dashboard here but without the outer padding/margin.
const ProfileHero = () => (
    <div className="relative rounded-2xl overflow-hidden min-h-[300px] border border-white/15 group flex flex-col mb-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(/707964211aa29e42aa7d522475b870cad9c4ad92.png)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
      
      <div className="relative p-6 w-full flex flex-col h-full justify-between">
        <div>
          {/* Progress Circle SVG */}
          <div className="relative w-24 h-24 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
              <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white" strokeDasharray={276} strokeDashoffset={276 * (1 - 0.74)} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-lg font-black italic">74%</span>
              <span className="text-[8px] text-white/60 uppercase font-bold tracking-widest">Profile</span>
            </div>
          </div>
          
          <div className="bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[8px] font-bold text-white uppercase w-fit tracking-[0.2em] mb-3">
            ACTIVE AGENT
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none font-orbitron mb-2">
            John Doe
          </h1>
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <span className="text-[#E31B23]">Premium Agent</span>
            <span>•</span>
            <span>58 Years Old</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-green-600 border border-white/10 rounded-sm"></span> Brazil</span>
          </div>
        </div>
        
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 pt-6 mt-6 border-t border-white/15">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-xl border border-white/15 text-white/40">
              <IconShieldCheck size={18} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">License ID</p>
              <p className="text-white text-sm font-bold font-heading">UK-AG-2024-001</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-xl border border-white/15 text-white/40">
              <IconCertificate size={18} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Certifications</p>
              <p className="text-[#E31B23] text-sm font-bold font-heading">FIFA Licensed Agent</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-xl border border-white/15 text-white/40">
              <IconPhone size={18} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Contact</p>
              <p className="text-white text-sm font-bold font-heading">+55 11 9999-8888</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-xl border border-white/15 text-white/40">
              <IconMail size={18} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Email</p>
              <p className="text-white text-sm font-bold font-heading">john.doe@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export const AgentProfile = () => {
  return (
    <div className="p-2 md:p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-orbitron tracking-wide mb-1">My Profile</h1>
        <p className="text-gray-400 text-sm font-medium">Manage your professional information</p>
      </div>

      {/* Personal Information */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader title="Personal Information" />
        
        <ProfileHero />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Form Fields */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">Full Name</Label>
              <Input defaultValue="John Doe" className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">Nationality</Label>
              <Input defaultValue="Brazil" className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">License ID</Label>
              <Input defaultValue="UK-AG-2024-001" className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">Date of Birth</Label>
              <Input type="date" defaultValue="1975-01-01" className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 [color-scheme:dark] focus:border-white/40 focus:ring-1 focus:ring-white/40" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">Contact</Label>
              <Input defaultValue="+55 11 9999-8888" className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">Email</Label>
              <Input defaultValue="john.doe@example.com" className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" />
            </div>
          </div>

          {/* Right Column: Upload Cover Photo */}
          <div className="space-y-1.5 flex flex-col">
            <Label className="text-gray-300 text-xs ml-1 font-medium">Upload Cover Photo</Label>
            <div className="flex-1 min-h-[300px] border border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:border-white/30 hover:text-white transition-colors cursor-pointer bg-white/[0.01]">
              <IconCloudUpload className="w-8 h-8 mb-3 opacity-50" stroke={1.5} />
              <p className="text-[11px] font-medium opacity-50 uppercase tracking-widest">Upload Image</p>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Details */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader title="Professional Details" />
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-xs ml-1 font-medium">Years of Experience</Label>
            <Input defaultValue="3" className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-xs ml-1 font-medium">Certifications</Label>
            <Input defaultValue="FIFA Licensed Agent, UEFA B License" className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-xs ml-1 font-medium">Achievements</Label>
            <Input defaultValue="Represented 15+ professional players, Successfully negotiated contracts with Premier League clubs" className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" />
          </div>
        </div>
      </div>

      {/* Biography */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader title="Biography" />
        <div className="space-y-1.5">
          <Label className="text-gray-300 text-xs ml-1 font-medium">Professional Bio</Label>
          <Textarea 
            className="min-h-[120px] bg-[#0a0a0a] border-white/20 text-white rounded-xl resize-none p-4 text-sm focus:border-white/40 focus:ring-1 focus:ring-white/40" 
            defaultValue="Experienced sports agent specializing in football talent management with a focus on youth development and career progression."
          />
        </div>
      </div>
    </div>
  );
};
