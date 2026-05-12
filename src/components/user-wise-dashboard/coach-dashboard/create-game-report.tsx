"use client";
import React, { useState } from "react";
import { 
  IconChevronDown, 
  IconCalendar, 
  IconX,
  IconCheck,
  IconTrophy,
  IconChartBar
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CreateGameReportProps {
  onCancel: () => void;
  onContinue: (data: any) => void;
}

export const CreateGameReport = ({ onCancel, onContinue }: CreateGameReportProps) => {
  const [showPayment, setShowPayment] = useState(false);
  const [characteristics, setCharacteristics] = useState(["FAST", "SKILLFUL", "FINISHER"]);
  const [paymentData, setPaymentData] = useState({ card: "", expiry: "", cvc: "", name: "EDDIE RICCI" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const removeCharacteristic = (tag: string) => {
    setCharacteristics(characteristics.filter(c => c !== tag));
  };

  const handleCardChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    setPaymentData({ ...paymentData, card: digits });
  };

  const handleExpiryChange = (val: string) => {
    // Only allow digits and /
    let cleaned = val.replace(/[^\d/]/g, "");
    if (cleaned.length === 2 && !cleaned.includes("/") && val.length > paymentData.expiry.length) {
      cleaned += "/";
    }
    setPaymentData({ ...paymentData, expiry: cleaned.slice(0, 5) });
  };

  const handleCvcChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 3);
    setPaymentData({ ...paymentData, cvc: digits });
  };

  const handleFinalSubmit = () => {
    // Simple check if fields are filled
    if (paymentData.card.length === 16 && paymentData.expiry.length === 5 && paymentData.cvc.length === 3) {
      const newReport = {
        id: Math.floor(Math.random() * 10000),
        date: new Date().toISOString().split('T')[0],
        team1: "FC BARCELONA",
        team2: "CITY U19",
        score: "3-0",
        result: "W" as const,
        rating: 9.2,
        status: "Paid" as const,
        amount: "$ 6.99",
        scoutName: "MARIO LOPEZ",
        playerPosition: "GOALKEEPER",
        goals: 1,
        assists: 2,
        passes: 92,
        timePlayedMinutes: 90,
        passAccuracy: 95,
        league: "FRIENDLY LEAGUE",
        stadium: "MANCHESTER",
        characteristics,
        weather: "Sunny",
        temperature: "18",
        foot: "Right",
        weight: "45kg",
        height: "1.20m"
      };
      onContinue(newReport);
    }
  };

  if (showPayment) {
    return (
      <div className="space-y-10 pb-16 animate-in zoom-in-95 duration-500 max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#00FF62]/10 border border-[#00FF62]/20 flex items-center justify-center mx-auto mb-6">
            <IconTrophy size={40} className="text-[#00FF62]" />
          </div>
          <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">Complete Payment</h1>
          <p className="text-gray-400 italic">Secure professional scouting analysis for $6.99</p>
        </div>

        <div className="p-10 rounded-[40px] border border-white/10 bg-[#0D0D0D] space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <div className="text-4xl font-black text-[#E31B23] italic tracking-tighter">$6.99</div>
          </div>

          <div className="space-y-6 pt-4">
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                Card Information
              </Label>
              <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 space-y-6 transition-colors">
                <div className="space-y-4">
                  <Input 
                    placeholder="Card Number (16 digits)" 
                    className="bg-transparent border-none text-xl font-bold tracking-[0.2em] p-0 focus-visible:ring-0 placeholder:text-gray-700" 
                    value={paymentData.card}
                    onChange={(e) => handleCardChange(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-4">
                    <div className="space-y-1">
                      <Input 
                        placeholder="MM / YY" 
                        className="bg-transparent border-none text-lg font-bold p-0 focus-visible:ring-0 placeholder:text-gray-700"
                        value={paymentData.expiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Input 
                        placeholder="CVC" 
                        className="bg-transparent border-none text-lg font-bold p-0 focus-visible:ring-0 placeholder:text-gray-700 text-right"
                        value={paymentData.cvc}
                        onChange={(e) => handleCvcChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                Cardholder Name
              </Label>
              <Input 
                className="bg-[#1A1A1A] border-white/10 h-14 rounded-2xl font-bold uppercase tracking-widest text-white transition-colors" 
                value={paymentData.name}
                onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button 
              className="w-full h-16 rounded-2xl bg-[#00FF62] hover:bg-[#00D150] text-black font-black uppercase tracking-widest text-lg transition-all shadow-[0_0_30px_rgba(0,255,98,0.2)] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
              onClick={handleFinalSubmit}
              disabled={paymentData.card.length < 16 || paymentData.expiry.length < 5 || paymentData.cvc.length < 3}
            >
              Pay & Submit Report
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-gray-500 hover:text-white font-bold uppercase text-[10px] tracking-widest"
              onClick={() => setShowPayment(false)}
            >
              Back to Details
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-gray-600 grayscale opacity-40 pt-4">
            <div className="text-[10px] font-black uppercase">Stripe Secured</div>
            <div className="text-[10px] font-black uppercase tracking-tighter italic font-serif">Visa</div>
            <div className="text-[10px] font-black uppercase tracking-tighter italic font-serif">Mastercard</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Create Game Reports</h1>
        <p className="text-gray-500 text-sm italic">Create Professional Football Player Game Reports</p>
      </div>

      {/* Fee Section */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10 flex justify-between items-center shadow-2xl">
        <div className="space-y-1">
          <div className="text-gray-400 text-sm font-medium">Report Fee</div>
          <div className="text-gray-500 text-xs italic">Professional analysis delivered within 48 hours</div>
        </div>
        <div className="text-4xl font-black text-[#E31B23] tracking-tighter italic">$6.99</div>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        {/* Player Information */}
        <div className="p-8 rounded-3xl border border-white/10 bg-[#0D0D0D] space-y-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00FF62]/10 border border-[#00FF62] flex items-center justify-center">
              <IconCheck size={18} className="text-[#00FF62]" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Player Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 lg:col-span-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Player Name</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 uppercase font-bold" defaultValue="EDEGELSON RICCI" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Date of Birth</Label>
              <div className="relative">
                <Input className="bg-[#1A1A1A] border-white/10 text-white h-12" defaultValue="27-03-2014" />
                <IconCalendar className="absolute right-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Club Name</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 uppercase font-bold" defaultValue="INTER MIAMI" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Position</Label>
              <div className="relative">
                <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 uppercase font-bold" defaultValue="GOALKEEPER" />
                <IconChevronDown className="absolute right-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Foot</Label>
              <div className="relative">
                <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 uppercase font-bold" defaultValue="RIGHT" />
                <IconChevronDown className="absolute right-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Weight</Label>
              <div className="relative">
                <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="45" />
                <span className="absolute right-4 top-3.5 text-gray-500 text-xs font-bold">KG</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Height</Label>
              <div className="relative">
                <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="1.20" />
                <span className="absolute right-4 top-3.5 text-gray-500 text-xs font-bold">M</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Characteristics Observed</Label>
            <div className="bg-[#1A1A1A] border-white/10 rounded-xl min-h-14 px-4 py-3 flex flex-wrap gap-2 items-center">
              {characteristics.map(tag => (
                <div key={tag} className="flex items-center gap-2 text-[10px] font-black text-white bg-[#0D0D0D] border border-white/10 px-4 py-1.5 rounded-full group cursor-pointer hover:border-red-500 transition-all">
                  {tag}
                  <IconX size={10} className="text-red-500" onClick={() => removeCharacteristic(tag)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Match Performance Details (From SportsAnalycies) */}
        <div className="p-8 rounded-3xl border border-white/10 bg-[#0D0D0D] space-y-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500 flex items-center justify-center">
              <IconChartBar size={18} className="text-blue-500" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Match Performance Stats</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Team 1 (Home)</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold uppercase" defaultValue="FC BARCELONA" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Score</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold text-center text-xl" defaultValue="2-1" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Team 2 (Away)</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold uppercase" defaultValue="REAL MADRID" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Match Result</Label>
              <div className="relative">
                <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold uppercase" defaultValue="WON" />
                <IconChevronDown className="absolute right-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Goals</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Assists</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Passes</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="87" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Time Played (min)</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="90" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Yellow Cards</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Red Cards</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="0" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pass Accuracy (%)</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="94" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Scout Rating</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-[#00FF62] h-12 font-black text-xl" defaultValue="9.2" />
            </div>
          </div>
        </div>

        {/* Scout & Context Information */}
        <div className="p-8 rounded-3xl border border-white/10 bg-[#0D0D0D] space-y-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-500/10 border border-gray-600 flex items-center justify-center">
              <IconTrophy size={18} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Scout & Context</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Scout Name</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 uppercase font-bold" defaultValue="MARIO LOPEZ" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">League / Game Type</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 uppercase font-bold" defaultValue="FRIENDLY CHAMPIONSHIP CATARINESE" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Game Date</Label>
              <div className="relative">
                <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="2021-02-22" />
                <IconCalendar className="absolute right-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Stadium / Location</Label>
              <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 uppercase font-bold" defaultValue="LONDON" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Weather/Temperature</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 uppercase font-bold" defaultValue="RAINY" />
                  <IconChevronDown className="absolute right-4 top-3.5 text-gray-500" size={18} />
                </div>
                <div className="relative">
                  <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="19" />
                  <span className="absolute right-4 top-3.5 text-gray-500 text-xs font-bold">C</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Man of the Match</Label>
                  <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="1" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Matches Played</Label>
                  <Input className="bg-[#1A1A1A] border-white/10 text-white h-12 font-bold" defaultValue="1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-8">
        <Button 
          variant="outline" 
          className="flex-1 h-14 rounded-xl border-white/10 bg-transparent text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all italic"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1 h-14 rounded-xl bg-[#00703C] hover:bg-[#008F4C] text-white font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,112,60,0.3)] italic"
          onClick={() => setShowPayment(true)}
        >
          Continue & Pay
        </Button>
      </div>
    </div>
  );
};
