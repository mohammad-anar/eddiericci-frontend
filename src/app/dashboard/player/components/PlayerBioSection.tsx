'use client'

import backgroundImage from "@/assets/player-dashboard/backgroundImage.png";
import { Clock, Mail, Phone, Shield } from 'lucide-react';
import Image from 'next/image';
import { useRef } from "react";
import { toast } from "sonner";

import { usePlayer } from "@/lib/hooks/usePlayer";
import { getFullWithShortForm } from "@/lib/utils";

export default function PlayerBioSection() {
  const { playerData, handleUpdate } = usePlayer();
  const cardImageInputRef = useRef<HTMLInputElement>(null);

  const handleCardImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.loading("Removing background... Please wait.", { id: "bg-removal" });
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file);
      const processedFile = new File([blob], file.name, { type: "image/png" });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate("cardImage", reader.result as string);
        toast.success("Card image updated with background removed!", { id: "bg-removal" });
      };
      reader.readAsDataURL(processedFile);
    } catch (error) {
      console.error("Background removal failed:", error);
      toast.error("Background removal failed. Using original image.", { id: "bg-removal" });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate("cardImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pb-20 b0">
      {/* Background with stadium image */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-between px-12"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundPosition: 'center',
          backgroundSize: "cover"
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-transparent" />

        {/* Content Container */}
        <div className="relative z-10 flex items-center justify-between w-full gap-12">
          {/* Left Side - Player Info */}
          <div className="max-w-sm">
            {/* Jersey Number Circle */}
            <div className="w-32 h-32 rounded-full border-4  flex items-center justify-center mb-8 bg-white/10 bg-opacity-50">
              <span className="text-5xl font-heading text-white">{playerData.rating}</span>
            </div>

            {/* Active Player Badge */}
            <div className="inline-block border border-white px-4 py-2 rounded-full mb-6">
              <span className="text-white text-sm font-semibold tracking-widest">{playerData.transferStatus.toUpperCase()} PLAYER</span>
            </div>

            {/* Player Name */}
            <h1 className="text-5xl font-heading text-white mb-2">{playerData.fullName}</h1>

            {/* Position, Age, Country */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-red-500 text-lg font-semibold">{getFullWithShortForm(playerData.position)}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300">{playerData.age} Years Old</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300 flex items-center gap-2">
                <span>{playerData.birthCountry === 'France' ? '🇫🇷' : '🇧🇷'}</span> {playerData.birthCountry}
              </span>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Current Club */}
              <div className="bg-black bg-opacity-60 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-xs font-semibold">Current Club</span>
                </div>
                <p className="text-white font-bold text-sm">{playerData.agency}</p>
              </div>

              {/* Contact */}
              <div className="bg-black bg-opacity-60 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-xs font-semibold">Contact</span>
                </div>
                <p className="text-white font-bold text-sm">{playerData.phone}</p>
              </div>

              {/* Validation Status */}
              <div className="bg-black bg-opacity-60 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-xs font-semibold">Contract Until</span>
                </div>
                <p className="text-orange-400 font-bold text-sm">{playerData.contractUntil}</p>
              </div>

              {/* Email */}
              <div className="bg-black bg-opacity-60 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-xs font-semibold">Email</span>
                </div>
                <p className="text-white font-bold text-sm wrap-anywhere">{playerData.email}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Player Image & Card Image Uploader */}
          <div className="relative z-20 shrink-0 flex flex-col items-center justify-center gap-4">
            <div className="relative group border border-white/10 rounded-2xl p-2 bg-black/40 backdrop-blur-md">
              <img
                src={playerData.cardImage || playerData.playerImage?.src || playerData.playerImage}
                alt={playerData.fullName}
                className="w-64 h-80 object-contain rounded-xl transition-all group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center rounded-xl gap-2 p-4 text-center">
                <span className="text-xs font-black uppercase tracking-widest text-white">Upload Custom Card Image</span>
                <span className="text-[9px] text-white/60">Background will be auto-removed</span>
                <button
                  onClick={() => cardImageInputRef.current?.click()}
                  className="mt-2 px-4 py-2 bg-[#E31B23] hover:bg-[#ff2d35] text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all cursor-pointer"
                >
                  Choose File
                </button>
              </div>
              <input
                type="file"
                ref={cardImageInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleCardImageUpload}
              />
            </div>
            {playerData.cardImage && (
              <button
                onClick={() => handleUpdate("cardImage", "")}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                Reset to Default
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
