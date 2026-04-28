"use client";
import React from "react";
import { 
  IconDownload, 
  IconCircleCheck, 
  IconPencil, 
  IconUpload, 
  IconCalendar, 
  IconChevronLeft, 
  IconChevronRight,
  IconPlus,
  IconMapPin,
  IconClock,
  IconPhone,
  IconMail,
  IconShield,
  IconShare,
  IconTrophy
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SkillAdjuster = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col gap-2">
    <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">{label}</Label>
    <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl p-1">
      <button className="p-2 hover:bg-white/5 rounded-lg transition-all text-white/40 hover:text-white">
        <IconChevronLeft size={16} />
      </button>
      <div className="flex-1 text-center font-black font-orbitron text-white">{value}</div>
      <button className="p-2 hover:bg-white/5 rounded-lg transition-all text-white/40 hover:text-white">
        <IconChevronRight size={16} />
      </button>
    </div>
  </div>
);

const SectionHeader = ({ title, showEdit = true }: { title: string; showEdit?: boolean }) => (
  <div className="flex justify-between items-center mb-8">
    <div className="flex items-center gap-3">
      <IconCircleCheck size={24} className="text-[#00FF85]" />
      <h2 className="text-xl font-black text-white font-orbitron uppercase tracking-tight">{title}</h2>
    </div>
    {showEdit && (
      <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 transition-all">
        <IconPencil size={18} />
      </button>
    )}
  </div>
);

const CareerItem = ({ logo, name, role, years, type }: { logo: string; name: string; role: string; years: string; type: string }) => (
  <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 group hover:border-white/20 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
        <img src={logo} alt={name} className="w-6 h-6 object-contain" />
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-white truncate">{name}</h4>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{role}</p>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-bold text-white/40">{years}</span>
      <span className="text-[10px] font-black text-[#E31B23] uppercase tracking-widest">{type}</span>
    </div>
  </div>
);

const GenerateCv = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Generate CV</h1>
          <p className="text-white/60 font-medium mt-2 text-lg">My Professional Football Profile</p>
        </div>
        <Button className="bg-[#222222] hover:bg-[#333333] text-white border border-white/5 gap-2 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] h-auto">
          <IconDownload size={18} /> Download PDF
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Left */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
          {/* Completion Status */}
          <div className="bg-[#111111] rounded-3xl border border-white/10 p-8 flex flex-col gap-6">
            <h3 className="text-sm font-black text-white font-orbitron uppercase tracking-widest">Completion Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-5xl font-black text-[#E31B23] font-orbitron">85%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#E31B23] rounded-full" style={{ width: "85%" }} />
              </div>
              <p className="text-[10px] text-white/40 font-bold leading-relaxed uppercase tracking-wider">
                Complete all sections to unlock Gold tier status
              </p>
            </div>
          </div>

          {/* Tier Status */}
          <div className="bg-[#111111] rounded-3xl border border-white/10 p-8 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FBBF24]/10 blur-3xl rounded-full" />
            <div className="flex flex-col">
              <h3 className="text-3xl font-black text-[#FBBF24] font-orbitron italic tracking-tighter leading-none">GOLD</h3>
              <div className="w-full h-1 bg-[#FBBF24] mt-2 opacity-50" />
            </div>
            <p className="text-[10px] text-white/60 font-bold leading-relaxed uppercase tracking-wider mt-2">
              Your CV meets Gold standards and is ready to share with top clubs and agents.
            </p>
            <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 gap-2 w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] h-auto mt-4">
              <IconShare size={18} className="text-white/40" /> Request Re-validation
            </Button>
          </div>

          {/* Field Area */}
          <div className="bg-[#111111] rounded-3xl border border-white/10 p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#E31B23]/10 rounded-lg text-[#E31B23]">
                  <IconShare size={18} className="rotate-90" />
                </div>
                <h3 className="text-sm font-black text-white font-orbitron uppercase tracking-widest">Field Area</h3>
              </div>
              <IconPencil size={18} className="text-white/20 cursor-pointer" />
            </div>
            
            <div className="aspect-[2/3] w-full rounded-2xl border-4 border-white/10 relative overflow-hidden shadow-inner">
               <img src="/field.png" alt="Field" className="w-full h-full object-cover" />
               
               {/* Player Markers Overlay */}
               <div className="absolute top-[15%] left-[20%] w-6 h-6 bg-[#E31B23] border-2 border-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer z-10">
                  <span className="text-[8px] text-white font-black uppercase">LW</span>
               </div>
               <div className="absolute top-[15%] right-[20%] w-6 h-6 bg-[#E31B23] border-2 border-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer z-10">
                  <span className="text-[8px] text-white font-black uppercase">RW</span>
               </div>
               <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-6 h-6 bg-[#E31B23] border-2 border-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer z-10">
                  <span className="text-[8px] text-white font-black uppercase">CF</span>
               </div>
            </div>
          </div>

          {/* Career Journey */}
          <div className="bg-[#111111] rounded-3xl border border-white/10 p-8 flex flex-col gap-6">
             <div className="flex items-center gap-2">
                <div className="p-2 bg-[#E31B23]/10 rounded-lg text-[#E31B23]">
                   <IconShare size={18} />
                </div>
                <h3 className="text-sm font-black text-white font-orbitron uppercase tracking-widest">Career Journey</h3>
             </div>

             <div className="flex flex-col gap-4">
                <CareerItem logo="/Manchester-City-F.C-Transparent-File 1.png" name="Manchester City" role="U8, U10" years="2005-2008" type="Free Transfer" />
                <CareerItem logo="/pngegg.png" name="Liverpool FC" role="U11-U12" years="2007-2010" type="Loan Transfer" />
                <CareerItem logo="/pngegg (2).png" name="Chelsea FC" role="U13-U16" years="2012-2015" type="$ 250000.00" />
                
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white/40 border border-white/10 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] h-auto gap-2">
                  <IconPlus size={16} /> Add
                </Button>
             </div>
          </div>
        </div>

        {/* Main Content Right */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Personal Information */}
          <section className="bg-[#111111] rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col gap-8">
            <SectionHeader title="Personal Information" />

            {/* Profile Hero */}
            <div className="relative rounded-3xl overflow-hidden min-h-[560px] border border-white/10 group flex flex-col justify-end">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('/stadium-night.jpg')` }}
              />
              {/* Linear Overlays for depth and text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 via-[45%] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Player Image Overlay - Perfected Placement */}
              <div className="absolute right-[5%] bottom-0 h-full w-[55%] flex items-end justify-end pointer-events-none">
                 <img 
                   src="/ronaldo.png" 
                   alt="Player" 
                   className="h-[105%] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]" 
                 />
              </div>

              <div className="relative p-10 w-full space-y-8">
                <div className="flex flex-col gap-6">
                   <div className="w-24 h-24 rounded-full border-4 border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-2xl shadow-2xl">
                      <span className="text-4xl font-black text-white font-orbitron">74</span>
                   </div>
                   <div className="space-y-4">
                      <div className="bg-[#E31B23] border border-[#E31B23]/20 px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase w-fit tracking-[0.2em] shadow-[0_0_20px_rgba(227,27,35,0.3)]">Active Player</div>
                      <div className="space-y-2">
                        <h1 className="text-6xl font-black text-white font-orbitron uppercase tracking-tighter leading-none">Marcus Silva</h1>
                        <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] pt-1">
                           <span className="text-[#E31B23]">Forward</span>
                           <span className="text-white/20">/</span>
                           <span className="text-white">22 Years Old</span>
                           <span className="text-white/20">/</span>
                           <span className="flex items-center gap-3 text-white">
                              <img src="https://flagcdn.com/br.svg" alt="Brazil" className="w-5 h-3.5 object-cover rounded-sm shadow-sm" /> Brazil
                           </span>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-6 pt-8 max-w-2xl p-6 rounded-2xl">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconShield size={20} /></div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Current Club</p>
                        <p className="text-sm font-bold text-white">Santos FC Academy</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconPhone size={20} /></div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Contact</p>
                        <p className="text-sm font-bold text-white">+44 7700 900000</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconClock size={20} /></div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Validation Status</p>
                        <p className="text-sm font-bold text-[#FBBF24]">15 days until re-validation</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconMail size={20} /></div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Email</p>
                        <p className="text-sm font-bold text-white truncate max-w-[180px]">MarcusSilva@k10football.com</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
               <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</Label>
                    <Input defaultValue="Marcus Silva" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Nationality</Label>
                    <Input defaultValue="Brazil" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Email</Label>
                    <Input defaultValue="CVANALYSIS@K10FOOTBALL.COM" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Date of Birth</Label>
                    <div className="relative">
                      <Input defaultValue="01/01/2004" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 px-4" />
                      <IconCalendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Contact</Label>
                    <Input defaultValue="+44 (00) 0000-00000" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Languages</Label>
                    <Input defaultValue="SPANISH, PORTUGUESE, ENGLISH" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 px-4" />
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                  <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Upload Image</Label>
                  <div className="flex-1 min-h-[350px] border-2 border-dashed border-white/10 bg-black/20 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-black/30 hover:border-white/20 transition-all group">
                    <div className="p-8 bg-white/5 rounded-3xl group-hover:bg-white/10 transition-all shadow-xl">
                      <IconUpload size={40} className="text-white/40 group-hover:text-white transition-all" />
                    </div>
                    <span className="text-xs font-black text-white/40 uppercase tracking-[0.2em] group-hover:text-white/60 transition-all">Upload image</span>
                  </div>
               </div>
            </div>

            <div className="space-y-8 pt-4">
               <div className="flex items-center gap-4">
                 <h4 className="text-xs font-black text-white font-orbitron uppercase tracking-[0.2em]">TRANSFER INFO</h4>
                 <div className="h-px bg-white/10 flex-1" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Football Agent Contract</Label>
                    <Input defaultValue="+44 (00) 0000-00000" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Transfer Fees</Label>
                    <Input defaultValue="$ 156000.00" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Salary</Label>
                    <Input defaultValue="$ 10000.00" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 px-4" />
                  </div>
               </div>
            </div>
          </section>

          {/* Physical Stats */}
          <section className="bg-[#111111] rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col gap-8">
            <SectionHeader title="Physical Stats" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Height</Label>
                 <Input defaultValue="181 cm" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4" />
               </div>
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Weight</Label>
                 <Input defaultValue="65 KG" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4" />
               </div>
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Dominant Foot</Label>
                 <Input defaultValue="Right Foot" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4" />
               </div>
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Position</Label>
                 <Input defaultValue="Forward" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4" />
               </div>
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Left Foot Rate</Label>
                 <Input defaultValue="55%" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4" />
               </div>
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Right Foot Rate</Label>
                 <Input defaultValue="80%" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4" />
               </div>
            </div>
          </section>

          {/* Skills & Attributes */}
          <section className="bg-[#111111] rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col gap-8">
            <SectionHeader title="Skills & Attributes" />
            
            <div className="space-y-12">
               {/* Technical */}
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h4 className="text-[10px] font-black text-white/40 font-orbitron uppercase tracking-[0.2em]">Technical</h4>
                    <div className="h-px bg-white/5 flex-1" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <SkillAdjuster label="Ball Control" value={90} />
                    <SkillAdjuster label="Dribbling" value={85} />
                    <SkillAdjuster label="Short Passing" value={92} />
                    <SkillAdjuster label="Long Passing" value={88} />
                    <SkillAdjuster label="Crossing" value={82} />
                    <SkillAdjuster label="Shooting" value={78} />
                    <SkillAdjuster label="Finishing" value={75} />
                    <SkillAdjuster label="Long Shots" value={80} />
                  </div>
               </div>

               {/* Tactical */}
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h4 className="text-[10px] font-black text-white/40 font-orbitron uppercase tracking-[0.2em]">Tactical</h4>
                    <div className="h-px bg-white/5 flex-1" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <SkillAdjuster label="Positioning" value={88} />
                    <SkillAdjuster label="Vision" value={91} />
                    <SkillAdjuster label="Anticipation" value={86} />
                    <SkillAdjuster label="Composure" value={84} />
                    <SkillAdjuster label="Teamwork" value={89} />
                    <SkillAdjuster label="Work Rate" value={87} />
                    <SkillAdjuster label="Decisions" value={85} />
                    <SkillAdjuster label="Concentration" value={83} />
                  </div>
               </div>

               {/* Physical */}
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h4 className="text-[10px] font-black text-white/40 font-orbitron uppercase tracking-[0.2em]">Physical</h4>
                    <div className="h-px bg-white/5 flex-1" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <SkillAdjuster label="Acceleration" value={78} />
                    <SkillAdjuster label="Sprint Speed" value={86} />
                    <SkillAdjuster label="Stamina" value={85} />
                    <SkillAdjuster label="Strength" value={72} />
                    <SkillAdjuster label="Balance" value={83} />
                    <SkillAdjuster label="Agility" value={81} />
                    <SkillAdjuster label="Reactions" value={86} />
                    <SkillAdjuster label="Jumping" value={70} />
                  </div>
               </div>

               {/* Mental */}
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h4 className="text-[10px] font-black text-white/40 font-orbitron uppercase tracking-[0.2em]">Mental</h4>
                    <div className="h-px bg-white/5 flex-1" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <SkillAdjuster label="Aggression" value={65} />
                    <SkillAdjuster label="Interceptions" value={74} />
                    <SkillAdjuster label="Att. Position" value={87} />
                    <SkillAdjuster label="Leadership" value={79} />
                    <SkillAdjuster label="Bravery" value={73} />
                    <SkillAdjuster label="Determination" value={88} />
                    <SkillAdjuster label="Flair" value={85} />
                    <SkillAdjuster label="Influence" value={82} />
                  </div>
               </div>
            </div>
          </section>

          {/* Match History */}
          <section className="bg-[#111111] rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col gap-8">
            <SectionHeader title="Match History" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Games Played</Label>
                 <Input defaultValue="96" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4" />
               </div>
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Goals</Label>
                 <Input defaultValue="102" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4" />
               </div>
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Assists</Label>
                 <Input defaultValue="113" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4" />
               </div>
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Achievements</Label>
                 <Input defaultValue="Premier League Golden Boot-2024" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4" />
               </div>
            </div>
          </section>

          {/* References */}
          <section className="bg-[#111111] rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col gap-8">
            <SectionHeader title="References" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Coach Validation</Label>
                 <Input placeholder="Enter coach validation" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4 placeholder:text-white/20" />
               </div>
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Academy Reference</Label>
                 <Input placeholder="Enter academy reference" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4 placeholder:text-white/20" />
               </div>
               <div className="space-y-2">
                 <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Character Reference</Label>
                 <Input placeholder="Enter character reference" className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium px-4 placeholder:text-white/20" />
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GenerateCv;