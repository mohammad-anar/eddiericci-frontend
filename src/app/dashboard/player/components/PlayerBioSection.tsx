'use client'

import { Shield, Phone, Clock, Mail } from 'lucide-react'
import Image from 'next/image'
import playerImage from "@/assets/cvs-page/id/player-image.png";
import backgroundImage from "@/assets/player-dashboard/backgroundImage.png"

export default function PlayerBioSection() {
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
              <span className="text-5xl font-heading text-white">74</span>
            </div>

            {/* Active Player Badge */}
            <div className="inline-block border border-white px-4 py-2 rounded-full mb-6">
              <span className="text-white text-sm font-semibold tracking-widest">ACTIVE PLAYER</span>
            </div>

            {/* Player Name */}
            <h1 className="text-5xl font-heading text-white mb-2">Marcus Silva</h1>

            {/* Position, Age, Country */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-red-500 text-lg font-semibold">Forward</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300">22 Years Old</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300 flex items-center gap-2">
                <span>🇧🇷</span> Brazil
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
                <p className="text-white font-bold text-sm">Santos FC Academy</p>
              </div>

              {/* Contact */}
              <div className="bg-black bg-opacity-60 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-xs font-semibold">Contact</span>
                </div>
                <p className="text-white font-bold text-sm">+44 7700 900000</p>
              </div>

              {/* Validation Status */}
              <div className="bg-black bg-opacity-60 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-xs font-semibold">Validation Status</span>
                </div>
                <p className="text-orange-400 font-bold text-sm">15 days until re-validation</p>
              </div>

              {/* Email */}
              <div className="bg-black bg-opacity-60 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-xs font-semibold">Email</span>
                </div>
                <p className="text-white font-bold text-sm wrap-anywhere">MarcusSilva@k10football.com</p>
              </div>
            </div>
          </div>

          {/* Right Side - Player Image */}
          <div className="relative z-20 shrink-0 flex items-center justify-end">
            <Image
              src={playerImage}
              alt="Marcus Silva"
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
