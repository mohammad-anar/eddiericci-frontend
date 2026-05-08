'use client'

import { Shield, Phone, Clock, Mail } from 'lucide-react'
import Image from 'next/image'
import playerImage from "@/assets/cvs-page/id/player-image.png";
import backgroundImage from "@/assets/player-dashboard/backgroundImage.png"

import { usePlayer } from "@/lib/hooks/usePlayer";

export default function PlayerBioSection() {
  const { playerData } = usePlayer();

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
              <span className="text-red-500 text-lg font-semibold">{playerData.position}</span>
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

          {/* Right Side - Player Image */}
          <div className="relative z-20 shrink-0 flex items-center justify-end">
            <Image
              src={playerData.playerImage}
              alt={playerData.fullName}
              width={500}
              height={1000}
              className="h-full max-h-175  object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
