"use client";
import React from "react";
import { 
  IconCircleCheck, 
  IconDownload, 
  IconShare 
} from "@tabler/icons-react";

export const MyCV = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">My CV</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and share your professional coaching resume</p>
      </div>

      <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
         <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            {/* Progress Card */}
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] w-full lg:w-auto min-w-[250px]">
               <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Profile Completion</span>
               <div className="text-5xl font-black text-[#E31B23] italic mt-2 mb-4">85%</div>
               <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E31B23] rounded-full shadow-[0_0_15px_rgba(227,27,35,0.4)]" style={{ width: '85%' }} />
               </div>
               <p className="text-[10px] text-gray-500 mt-4 leading-relaxed uppercase font-bold tracking-wider">
                  Complete the remaining sections to reach 100% and unlock Gold status.
               </p>
            </div>

            {/* Info and Checklist */}
            <div className="flex-1 space-y-10 lg:px-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    { label: 'Personal Info', checked: true },
                    { label: 'Key Accomplishments', checked: true },
                    { label: 'Major Trophies', checked: true },
                    { label: 'Key Skills', checked: true },
                    { label: 'Courses', checked: true },
                    { label: 'References', checked: false }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${item.checked ? 'border-green-500/50 bg-green-500/10' : 'border-white/10 bg-white/5'}`}>
                        {item.checked ? <IconCircleCheck size={14} className="text-green-500" /> : <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />}
                      </div>
                      <span className={`text-sm font-bold ${item.checked ? 'text-white' : 'text-gray-500'}`}>{item.label}</span>
                    </div>
                  ))}
               </div>

               <div className="flex gap-6 p-6 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-1.5 h-16 bg-[#E31B23] rounded-full" />
                  <div>
                    <h4 className="text-lg font-black text-white mb-1 italic uppercase tracking-tight">Silver Tier Status</h4>
                    <p className="text-xs text-gray-500 max-w-lg leading-relaxed">
                      Your CV currently meets our Silver quality standards. This makes you eligible for recommendation to Tier 2 academies and professional youth setups.
                    </p>
                  </div>
               </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full lg:w-auto">
               <button className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-[#E31B23] text-white text-xs font-black uppercase tracking-widest hover:bg-[#c1171d] transition-all shadow-lg shadow-[#E31B23]/10">
                  <IconDownload size={18} /> Download PDF
               </button>
               <button className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  <IconShare size={18} /> Share Agent
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
