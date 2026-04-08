'use client'

import { Button } from '@/components/ui/button'
import { ChevronDown, Globe } from 'lucide-react'
import Image from 'next/image'

export function Navbar() {
  return (
    <nav className="bg-[#080808] ">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              K10
            </div>
            <span className="text-white font-bold text-sm">K10 FOOTBALL</span> */}
            <Image src="/logo.png" alt="K10 Football Logo" width={200} height={200} />
          </div>

          {/* Center Navigation */}
          <div className="flex items-center gap-8">
            <a href="#" className="text-green-400 font-medium text-sm border-b-2 border-green-400 pb-1">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition">
              Services
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition">
              CVs
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition">
              K10 Plans
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition">
              About
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-300 hover:text-white transition">
              <Globe className="w-4 h-4" />
              <span className="text-sm">EN</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-transparent">
              Login
            </Button>
            <Button className="bg-green-400 hover:bg-green-500 text-black font-semibold px-6">
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
