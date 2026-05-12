"use client";
import React, { useState, useRef } from 'react';
import { usePlayer } from '@/lib/hooks/usePlayer';
import { CMSField } from '@/components/shared/CMSField';
import { cn } from '@/lib/utils';
import { Plus, Trash2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

import club1 from '@/assets/cvs-page/club1.png';
import Image from 'next/image';

const YEARS = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i));
const TO_YEARS = ["Present", ...YEARS];

const PREDEFINED_CLUBS = [
  { name: "Manchester City", logo: club1, color: "border-blue-400" },
  { name: "Liverpool FC", logo: club1, color: "border-red-500" },
  { name: "Chelsea FC", logo: club1, color: "border-blue-500" },
  { name: "Arsenal FC", logo: club1, color: "border-white" },
  { name: "Real Madrid", logo: club1, color: "border-yellow-500" },
  { name: "Barcelona FC", logo: club1, color: "border-blue-900" },
  { name: "Bayern Munich", logo: club1, color: "border-white" },
  { name: "Paris Saint-Germain", logo: club1, color: "border-red-600" },
];

const ClubSection = () => {
  const { playerData, handleUpdate } = usePlayer();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedClub, setSelectedClub] = useState<typeof PREDEFINED_CLUBS[0] | null>(null);
  const [fromDate, setFromDate] = useState(YEARS[0]);
  const [toDate, setToDate] = useState("Present");


  const updateClub = (id: string, field: string, value: any) => {
    const newClubs = playerData.clubs.map(club =>
      club.id === id ? { ...club, [field]: value } : club
    );
    handleUpdate("clubs", newClubs);
  };

  const removeClub = (id: string) => {
    const newClubs = playerData.clubs.filter(club => club.id !== id);
    handleUpdate("clubs", newClubs);
  };

  const addClub = () => {
    if (!selectedClub) return;

    const newClub = {
      id: Math.random().toString(36).substr(2, 9),
      name: selectedClub.name,
      from: fromDate,
      to: toDate,
      logo: selectedClub.logo,
      color: selectedClub.color,
    };

    handleUpdate("clubs", [...playerData.clubs, newClub]);
    setIsAdding(false);
    setSelectedClub(null);
  };

  return (
    <div className="container py-10 bg-cardBg rounded-xl mt-10">
      <div className="flex justify-between items-center mb-8">
        <div className="w-10" /> {/* Spacer */}
        <h1 className="text-4xl font-light text-center text-foreground font-heading">Clubs</h1>
        <Button
          onClick={() => setIsAdding(true)}
          className="bg-primary text-black hover:bg-primary/90"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Club
        </Button>
      </div>

      <div className="border border-border bg-black/30 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playerData?.clubs?.map((club) => (
            <div
              key={club.id}
              className="relative border border-border cursor-pointer hover:bg-cardBg duration-300 bg-black/20 rounded-lg p-6 flex items-center gap-4 group transition"
            >
              <button
                onClick={(e) => { e.stopPropagation(); removeClub(club.id); }}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>

              <div className="shrink-0 relative group/logo">
                <div className={cn(
                  "w-20 h-20 rounded-full border-2 flex items-center justify-center overflow-hidden bg-gray-900",
                  club.color
                )}>
                  <Image
                    src={club1}
                    alt={club.name}
                    width={80}
                    height={80}
                    className="object-contain p-2"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {club.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                  <CMSField
                    value={club.from}
                    onUpdate={(val) => updateClub(club.id, "from", val)}
                    canEdit={true}
                    type="combobox"
                    options={YEARS}
                    editTrigger="doubleClick"
                    hideIcon={true}
                    className="w-16"
                  />
                  <span>-</span>
                  <CMSField
                    value={club.to}
                    onUpdate={(val) => updateClub(club.id, "to", val)}
                    canEdit={true}
                    type="combobox"
                    options={TO_YEARS}
                    editTrigger="doubleClick"
                    hideIcon={true}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          ))}

          {isAdding && (
            <div className="border-2 border-dashed border-primary/50 bg-primary/5 rounded-lg p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-primary uppercase">New Club Entry</span>
                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase">Select Club</span>
                  <select
                    className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-sm text-white"
                    onChange={(e) => {
                      const club = PREDEFINED_CLUBS.find(c => c.name === e.target.value);
                      if (club) setSelectedClub(club);
                    }}
                    value={selectedClub?.name || ""}
                  >
                    <option value="" disabled>Choose a club...</option>
                    {PREDEFINED_CLUBS.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase">From</span>
                    <select
                      className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-sm text-white"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    >
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase">To</span>
                    <select
                      className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-sm text-white"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    >
                      {TO_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                <Button
                  onClick={addClub}
                  disabled={!selectedClub}
                  className="w-full bg-primary text-black hover:bg-primary/90 mt-2"
                  size="sm"
                >
                  <Check className="h-4 w-4 mr-2" /> Confirm Add
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubSection;