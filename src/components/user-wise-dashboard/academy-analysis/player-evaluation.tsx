"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  IconPlus, 
  IconSearch, 
  IconFilter, 
  IconChevronDown, 
  IconTrash, 
  IconStar, 
  IconClock, 
  IconHeart,
  IconChartBar,
  IconUsers,
  IconFileText,
  IconTrendingUp
} from "@tabler/icons-react";

const SummaryCard = ({ label, value, icon: Icon, bgColor, textColor }: { label: string, value: string | number, icon: any, bgColor: string, textColor: string }) => (
  <div className="bg-[#0A0A0A] border border-white/20 rounded-[20px] p-5 flex items-center gap-4 flex-1">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor} bg-opacity-20 border border-white/20 flex-shrink-0`}>
      {Icon && <Icon size={24} className={`${textColor} opacity-100`} stroke={2} />}
    </div>
    <div className="space-y-0.5">
      <p className="text-white/40 text-[11px] font-medium leading-none">{label}</p>
      <p className="text-white text-2xl font-bold font-orbitron">{value}</p>
    </div>
  </div>
);

const EvaluationCard = ({ 
  tag, 
  name, 
  date, 
  coach, 
  rating, 
  tech, 
  phys, 
  ment, 
  pos, 
  tier, 
  btnColor 
}: any) => (
  <div className="bg-[#111111] border border-white/20 rounded-3xl p-6 flex flex-col gap-6 group hover:border-white/40 transition-all">
    <div className="flex justify-between items-center">
      <span className="bg-white/5 border border-white/20 rounded-full px-4 py-1 text-[10px] font-bold text-white/60">{tag}</span>
      <Button variant="outline" size="sm" className={`h-8 rounded-full border-none px-4 text-[10px] font-black uppercase ${btnColor} bg-opacity-10`}>
        View Doc &gt;
      </Button>
    </div>

    <div className="space-y-1">
      <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold">
        <IconClock size={12} /> {date}
      </div>
      <h3 className="text-white text-xl font-black font-orbitron">{name}</h3>
      <p className="text-white/40 text-[10px] font-bold flex items-center gap-1">
        <IconUsers size={12} /> Coach: {coach}
      </p>
    </div>

    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <p className="text-white/40 text-[10px] font-bold uppercase">Overall Rating:</p>
        <p className="text-white/60 text-[10px] font-bold">({rating}/10)</p>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400" 
          style={{ width: `${rating * 10}%` }} 
        />
      </div>
    </div>

    <div className="flex justify-between items-center">
       <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold">
             <div className="w-2.5 h-2.5 rounded-full border-2 border-emerald-400 flex items-center justify-center p-[1px]">
               <div className="w-full h-full bg-emerald-400 rounded-full" />
             </div>
             {tech}
          </div>
          <div className="flex items-center gap-1.5 text-yellow-400 text-[10px] font-bold">
             <div className="w-2.5 h-2.5 rounded-full border-2 border-yellow-400 flex items-center justify-center p-[1px]">
               <div className="w-full h-full bg-yellow-400 rounded-full" />
             </div>
             {phys}
          </div>
          <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-bold">
             <div className="w-2.5 h-2.5 rounded-full border-2 border-red-400 flex items-center justify-center p-[1px]">
               <div className="w-full h-full bg-red-400 rounded-full" />
             </div>
             {ment}
          </div>
       </div>
       <div className="flex items-center gap-3">
          <span className="text-white/40 text-[10px] font-bold uppercase">{pos} · {tier}</span>
          <button className="text-red-500/40 hover:text-red-500 transition-colors">
             <IconTrash size={16} />
          </button>
       </div>
    </div>
  </div>
);

export const PlayerEvaluation = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Player Evaluation</h1>
          <p className="text-white/60 font-medium mt-2 text-lg">Create and manage player development progress reports</p>
        </div>
        <Button className="bg-[#E31B23] hover:bg-[#C1171D] text-white px-6 h-12 rounded-xl font-bold flex items-center gap-2">
          <IconPlus size={20} /> Create New Evaluation
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard label="Avg. Overall Rating" value="4.0" icon={IconStar} bgColor="bg-red-500" textColor="text-red-500" />
        <SummaryCard label="Improving Players" value="3" icon={IconTrendingUp} bgColor="bg-emerald-500" textColor="text-emerald-500" />
        <SummaryCard label="Evaluated this Month" value="28" icon={IconFileText} bgColor="bg-blue-500" textColor="text-blue-500" />
        <SummaryCard label="Total Evaluations" value="5" icon={IconUsers} bgColor="bg-yellow-500" textColor="text-yellow-500" />
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <Input placeholder="Search players by name, team, or position..." className="bg-[#111111] border-white/10 h-12 rounded-xl pl-12 text-white/60 font-medium" />
            </div>
            <Button variant="outline" className="bg-[#111111] border-white/10 h-12 rounded-xl text-white/60 font-bold flex items-center gap-2 px-6">
              All Team <IconChevronDown size={16} />
            </Button>
            <Button variant="outline" className="bg-[#111111] border-white/10 h-12 rounded-xl text-white/60 font-bold flex items-center gap-2 px-6">
              All Positions <IconChevronDown size={16} />
            </Button>
            <Button variant="outline" className="bg-[#111111] border-white/10 h-12 rounded-xl text-white/60 font-bold flex items-center gap-2 px-6">
              <IconFilter size={18} /> Filters
            </Button>
          </div>

          {/* Evaluation Grid */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Evaluations</h2>
              <div className="flex gap-6">
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-emerald-400 flex items-center justify-center p-[1px]">
                    <div className="w-full h-full bg-emerald-400 rounded-full" />
                  </div>
                  Technical
                </div>
                <div className="flex items-center gap-2 text-yellow-400 text-[10px] font-bold uppercase">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-yellow-400 flex items-center justify-center p-[1px]">
                    <div className="w-full h-full bg-yellow-400 rounded-full" />
                  </div>
                  Physical
                </div>
                <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-red-400 flex items-center justify-center p-[1px]">
                    <div className="w-full h-full bg-red-400 rounded-full" />
                  </div>
                  Mental
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <EvaluationCard tag="U-15" name="Marcus Silva" date="Jan 25, 2026" coach="John Smith" rating={7.2} tech={0} phys={0} ment={0} pos="Forward" tier="TIER 1" btnColor="text-red-500 bg-red-500" />
              <EvaluationCard tag="U-16" name="Sarah Williams" date="Jan 25, 2026" coach="Mike Williams" rating={8.5} tech={16} phys={4} ment={2} pos="Midfielder" tier="TIER 2" btnColor="text-emerald-500 bg-emerald-500" />
              <EvaluationCard tag="U-17" name="David Chen" date="Jan 25, 2026" coach="Sarah Johnson" rating={7.2} tech={5} phys={0} ment={15} pos="Midfielder" tier="TIER 1" btnColor="text-red-500 bg-red-500" />
              <EvaluationCard tag="U-17" name="Alex Jordan" date="Jan 25, 2026" coach="Sarah Johnson" rating={8.5} tech={5} phys={0} ment={15} pos="Defender" tier="TIER 2" btnColor="text-emerald-500 bg-emerald-500" />
              <EvaluationCard tag="U-19" name="James Brown" date="Jan 25, 2026" coach="Mike Williams" rating={8.5} tech={18} phys={4} ment={7} pos="Forward" tier="TIER 1" btnColor="text-yellow-500 bg-yellow-500" />
              <EvaluationCard tag="U-16" name="Sarah Williams" date="Jan 25, 2026" coach="Mike Williams" rating={7.8} tech={16} phys={4} ment={2} pos="Midfielder" tier="TIER 2" btnColor="text-emerald-500 bg-emerald-500" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[340px] flex flex-col gap-8">
           {/* Most Improved */}
           <div className="bg-[#111111] border border-white/20 rounded-[32px] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(227,27,35,0.2)]">
                    <IconClock size={20} className="text-white" />
                 </div>
                 <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Most Improved</h2>
              </div>
              <div className="space-y-4">
                 {[
                   { name: "Marcus Silva", team: "U-15", change: "+0.8", textColor: "text-emerald-600", border: "border-emerald-400", bgColor: "bg-emerald-100", down: false },
                   { name: "David Chen", team: "U-17", change: "+0.8", textColor: "text-emerald-600", border: "border-emerald-400", bgColor: "bg-emerald-100", down: false },
                   { name: "James Brown", team: "U-17", change: "+0.8", textColor: "text-emerald-600", border: "border-emerald-400", bgColor: "bg-emerald-100", down: false },
                   { name: "Alex Jordan", team: "U-15", change: "-0.4", textColor: "text-red-600", border: "border-red-400", bgColor: "bg-red-100", down: true },
                 ].map((player, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         {player.down ? (
                           <IconTrendingUp size={16} className={`${player.textColor} rotate-180`} />
                         ) : (
                           <IconTrendingUp size={16} className={player.textColor} />
                         )}
                         <div>
                            <p className="text-white text-sm font-black">{player.name}</p>
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">{player.team}</p>
                         </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${player.textColor} ${player.bgColor} bg-opacity-20`}>
                        {player.change}
                      </span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Top Performers */}
           <div className="bg-[#111111] border border-white/20 rounded-[32px] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <IconHeart size={20} className="text-red-500" />
                 </div>
                 <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Top Performers</h2>
              </div>
              <div className="space-y-6">
                 {[
                   { name: "James Brown", info: "U-17 · Goalkeeper", rating: "9.2" },
                   { name: "Marcus Silva", info: "U-15 · Forward", rating: "8.5" },
                   { name: "David Chen", info: "U-17 · Midfielder", rating: "7.8" },
                   { name: "Sarah Williams", info: "U-15 · Midfielder", rating: "7.5" },
                   { name: "Alex Jordan", info: "U-15 · Defender", rating: "7.2" },
                 ].map((player, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <span className="text-red-500 text-[10px] font-black font-orbitron">#{i+1}</span>
                         <div>
                            <p className="text-white text-sm font-bold">{player.name}</p>
                            <p className="text-white/40 text-[10px] font-bold uppercase">{player.info}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-1 text-white text-[10px] font-black font-orbitron">
                         <IconStar size={14} className="text-red-500 fill-red-500/20" />
                         {player.rating}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
