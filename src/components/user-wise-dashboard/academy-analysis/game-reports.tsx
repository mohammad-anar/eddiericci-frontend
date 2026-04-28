"use client";
import React from "react";
import { 
  IconCircleCheck, 
  IconCalendar, 
  IconChevronDown, 
  IconX 
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CharacteristicTag = ({ label }: { label: string }) => (
  <span className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-md px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
    {label}
    <IconX size={10} className="text-[#E31B23] cursor-pointer" />
  </span>
);

export const GameReports = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Create Game Reports</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Create Professional Football Player Game Reports</p>
      </div>

      {/* Price Banner */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Report Fee</p>
          <p className="text-[10px] font-bold text-white/60">Professional analysis delivered within 48 hours</p>
        </div>
        <div className="text-5xl font-black text-[#E31B23] font-orbitron">$6.99</div>
      </div>

      {/* Player Information Section */}
      <div className="bg-[#111111] rounded-3xl border border-white/20 p-8 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <IconCircleCheck size={24} className="text-[#00FF85]" />
          <h2 className="text-xl font-black text-white font-orbitron uppercase tracking-tight">Player Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Player Name:</Label>
            <Input defaultValue="EDEGELSON RICCI" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Date of Birth:</Label>
            <div className="relative">
              <Input defaultValue="27-03-2014" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4" />
              <IconCalendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Club Name:</Label>
            <Input defaultValue="INTER MIAMI" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Position:</Label>
            <div className="relative">
              <select className="w-full bg-black/40 border border-white/10 h-14 rounded-xl text-white font-medium px-4 appearance-none outline-none focus:border-white/20 transition-all uppercase text-sm">
                <option>STRIKER</option>
              </select>
              <IconChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Foot:</Label>
            <div className="relative">
              <select className="w-full bg-black/40 border border-white/10 h-14 rounded-xl text-white font-medium px-4 appearance-none outline-none focus:border-white/20 transition-all uppercase text-sm">
                <option>RIGHT</option>
              </select>
              <IconChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Characteristic:</Label>
            <div className="bg-black/40 border border-white/10 h-14 rounded-xl flex items-center px-4 gap-2">
               <CharacteristicTag label="FAST" />
               <span className="text-white/20 text-xs">,</span>
               <CharacteristicTag label="SKILLFUL" />
               <span className="text-white/20 text-xs">,</span>
               <CharacteristicTag label="FINISHER" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Weight:</Label>
            <div className="relative">
              <Input defaultValue="45" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4 pr-12" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/40">KG</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Height:</Label>
            <div className="relative">
              <Input defaultValue="1.20" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4 pr-12" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/40">M</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="space-y-2">
             <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Matches Played:</Label>
             <Input defaultValue="1" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4" />
           </div>
           <div className="space-y-2">
             <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Minutes Played:</Label>
             <div className="relative">
               <Input defaultValue="90" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4 pr-12" />
               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/40">min</span>
             </div>
           </div>
           <div className="space-y-2">
             <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Man of the Match:</Label>
             <Input defaultValue="1" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4" />
           </div>
        </div>
      </div>

      {/* Match Information Section */}
      <div className="bg-[#111111] rounded-3xl border border-white/20 p-8 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <IconCircleCheck size={24} className="text-white/20" />
          <h2 className="text-xl font-black text-white font-orbitron uppercase tracking-tight">Match Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Scout Name:</Label>
            <Input defaultValue="MARIO LOPEZ" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Game Type:</Label>
            <div className="relative">
              <Input defaultValue="FRIENDLY CHAMPIONSHIP CATARINESE" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4 pr-12" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/40">M</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Game Date:</Label>
            <div className="relative">
              <Input defaultValue="2021-02-22" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4" />
              <IconCalendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Game Location:</Label>
            <Input defaultValue="LONDON" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Match Result:</Label>
            <Input defaultValue="INTER MIAMI" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Weather/Temperature:</Label>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <select className="w-full bg-black/40 border border-white/10 h-14 rounded-xl text-white font-medium px-4 appearance-none outline-none focus:border-white/20 transition-all uppercase text-sm">
                  <option>RAINY</option>
                </select>
                <IconChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              </div>
              <div className="relative w-32">
                <Input defaultValue="19" className="bg-black/40 border-white/10 h-14 rounded-xl text-white font-medium px-4 pr-10 text-center" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/40">C</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-6 mt-4">
        <Button className="flex-1 bg-transparent hover:bg-white/5 text-white border border-white/10 h-16 rounded-xl font-black uppercase tracking-[0.2em] transition-all">
          Cancel
        </Button>
        <Button className="flex-1 bg-[#00FF85] hover:bg-[#00E074] text-black h-16 rounded-xl font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(0,255,133,0.2)]">
          Continue
        </Button>
      </div>
    </div>
  );
};