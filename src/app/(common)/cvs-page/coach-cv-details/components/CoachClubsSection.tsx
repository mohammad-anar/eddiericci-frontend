"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, X, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CMSField } from "@/components/shared/CMSField";
import { useCoach } from "@/lib/hooks/useCoach";
import { usePlayerStats } from "../../player-cv-details/components/FullEditablePage";
import { toast } from "sonner";
import clubImage from "@/assets/cvs-page/club1.png";

const YEARS = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i));
const TO_YEARS = ["Present", ...YEARS];

interface Club {
  id: string;
  name: string;
  from: string;
  to: string;
  logo?: any;
}

export default function CoachClubsSection({ editable = true }: { editable?: boolean }) {
  const { coachData, handleUpdate } = useCoach();
  const { role } = usePlayerStats() || { role: "player" };

  const canEdit = !!(editable && (role === "coach" || role === "admin" || !role));

  const [isAddingClub, setIsAddingClub] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [newClubLogo, setNewClubLogo] = useState<string | null>(null);
  const [fromYear, setFromYear] = useState(YEARS[0]);
  const [toYear, setToYear] = useState("Present");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClubLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size too large. Max 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewClubLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addClub = () => {
    if (!newClubName.trim()) {
      toast.error("Please enter a club name");
      return;
    }

    const newClub = {
      id: Math.random().toString(36).substr(2, 9),
      name: newClubName,
      from: fromYear,
      to: toYear,
      logo: newClubLogo || "",
    };

    handleUpdate("clubs", [...(coachData?.clubs || []), newClub]);
    setIsAddingClub(false);
    setNewClubName("");
    setNewClubLogo(null);
    toast.success("Club added successfully");
  };

  const removeClub = (id: string) => {
    const newClubs = (coachData?.clubs || []).filter((c: Club) => c.id !== id);
    handleUpdate("clubs", newClubs);
    toast.success("Club removed");
  };

  const updateClub = (id: string, field: string, value: any) => {
    const newClubs = (coachData?.clubs || []).map((c: Club) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    handleUpdate("clubs", newClubs);
  };

  return (
    <div className="py-20 bg-black p-12 border-b border-white/10">
      <div className="container mx-auto max-w-2xl">
        {/* Title & Add Button */}
        <div className="flex justify-between items-center mb-12">
          <div className="w-10" /> {/* Spacer */}
          <h1 className="text-4xl font-heading text-white text-center tracking-wide uppercase">
            Clubs
          </h1>
          {canEdit ? (
            <Button
              onClick={() => setIsAddingClub(true)}
              size="sm"
              className="bg-primary text-black hover:bg-primary/90 h-8 w-8 p-0 rounded-full flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          ) : (
            <div className="w-10" />
          )}
        </div>

        {/* Vertically Aligned Flex Layout */}
        <div className="flex justify-center gap-4 w-full">
          {(coachData?.clubs || []).map((club: Club, index: number) => (
            <Card key={club.id || String(index)} className="p-5 relative group bg-gray-900 border-gray-800 hover:border-primary/30 transition-all">
              {canEdit && (
                <button
                  onClick={() => removeClub(club.id)}
                  className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              )}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={club.logo || clubImage}
                    className="object-contain w-full h-full"
                    alt={club.name}
                    width={48}
                    height={48}
                  />
                </div>
                <div className="w-full min-w-0">
                  <CMSField
                    value={club.name}
                    onUpdate={(val) => updateClub(club.id, "name", val)}
                    canEdit={canEdit}
                    className="font-bold truncate uppercase text-white"
                  />
                  <div className="flex items-center gap-1 text-[12px] text-gray-400">
                    <CMSField
                      value={club.from}
                      onUpdate={(val) => updateClub(club.id, "from", val)}
                      canEdit={canEdit}
                      type="combobox"
                      options={YEARS}
                      editTrigger="doubleClick"
                      hideIcon={true}
                      className="w-12 text-gray-400"
                    />
                    <span>-</span>
                    <CMSField
                      value={club.to}
                      onUpdate={(val) => updateClub(club.id, "to", val)}
                      canEdit={canEdit}
                      type="combobox"
                      options={TO_YEARS}
                      editTrigger="doubleClick"
                      hideIcon={true}
                      className="w-16 text-gray-400"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {isAddingClub && (
            <Card className="p-5 border-dashed border-primary/50 bg-primary/5 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-primary uppercase">New Club</span>
                <button onClick={() => setIsAddingClub(false)} className="text-gray-400 hover:text-white">
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-16 h-16 rounded-full border-2 border-dashed border-gray-700 bg-black/40 flex items-center justify-center cursor-pointer hover:border-primary overflow-hidden"
                  >
                    {newClubLogo ? (
                      <Image src={newClubLogo} alt="Preview" width={64} height={64} className="object-contain p-2" />
                    ) : (
                      <Upload size={20} className="text-gray-500" />
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleClubLogoUpload}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Club Name"
                  className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary"
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="bg-gray-900 border border-gray-800 rounded px-2 py-1 text-xs text-white"
                    value={fromYear}
                    onChange={(e) => setFromYear(e.target.value)}
                  >
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <select
                    className="bg-gray-900 border border-gray-800 rounded px-2 py-1 text-xs text-white"
                    value={toYear}
                    onChange={(e) => setToYear(e.target.value)}
                  >
                    {TO_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                <Button
                  onClick={addClub}
                  disabled={!newClubName.trim()}
                  className="w-full bg-primary text-black font-bold h-8"
                  size="sm"
                >
                  <Check className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
