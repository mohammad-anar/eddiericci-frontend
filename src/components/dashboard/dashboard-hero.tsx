import React from "react";
import { IconPhone, IconMail } from "@tabler/icons-react";

interface DashboardHeroProps {
  backgroundImage: string;
  logo?: string;
  badgeText?: string;
  title: string;
  subtitle?: string;
  details?: {
    icon?: React.ReactNode;
    text: string;
  }[];
  contacts?: {
    type: "phone" | "email";
    label: string;
    value: string;
  }[];
}

export const DashboardHero = ({
  backgroundImage,
  logo,
  badgeText,
  title,
  subtitle,
  details,
  contacts,
}: DashboardHeroProps) => {
  return (
    <div className="relative rounded-3xl overflow-hidden min-h-[450px] border border-white/5 group flex flex-col justify-end">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      
      <div className="relative p-8 md:p-10 w-full flex flex-col gap-6">
        <div className="space-y-4">
          {logo && (
            <div className="mb-6">
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </div>
          )}
          
          {badgeText && (
            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase w-fit tracking-[0.2em]">
              {badgeText}
            </div>
          )}
          
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none font-orbitron">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[#E31B23] font-bold uppercase tracking-wider text-sm">
                {subtitle}
              </p>
            )}
          </div>

          {details && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/60 text-sm font-medium">
              {details.map((detail, index) => (
                <div key={index} className="flex items-center gap-2">
                  {detail.icon}
                  <span>{detail.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {contacts && contacts.length > 0 && (
          <div className="flex flex-wrap gap-10 pt-8 border-t border-white/10">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white/40">
                  {contact.type === "phone" ? <IconPhone size={22} /> : <IconMail size={22} />}
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">
                    {contact.label}
                  </p>
                  <p className="text-white text-base md:text-lg font-bold font-heading">
                    {contact.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
