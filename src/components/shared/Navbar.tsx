'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ChevronDown, Globe, Menu } from 'lucide-react'
import Image from 'next/image'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '#', isActive: true },
    { label: 'Services', href: '#', isActive: false },
    { label: 'CVs', href: '#', isActive: false },
    { label: 'K10 Plans', href: '#', isActive: false },
    { label: 'About', href: '#', isActive: false },
  ]

  return (
    <nav className="bg-[#080808]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="K10 Football Logo" width={200} height={200} />
          </div>

          {/* Center Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm transition ${
                  link.isActive
                    ? 'text-green-400 font-medium border-b-2 border-green-400 pb-1'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="hidden lg:flex items-center gap-1 text-gray-300 hover:text-white transition">
              <Globe className="w-4 h-4" />
              <span className="text-sm">EN</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <Button variant="ghost" className="hidden lg:block text-gray-300 hover:text-white hover:bg-transparent">
              Login
            </Button>
            <Button className="hidden lg:block bg-green-400 hover:bg-green-500 text-black font-semibold px-6">
              Join Now
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button  className="text-gray-300 hover:text-white hover:bg-transparent">
                  <Menu className="w-8 h-8" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-[#1a1a1a] border-gray-700">
                <div className="flex flex-col gap-6 ">
                  <div className='-ml-5 px-6 pt-3'>
                    <Logo />
                  </div>
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col gap-4 px-6">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-sm font-medium transition ${
                          link.isActive
                            ? 'text-green-400'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        <Button className='w-full bg-gray-800 hover:bg-green-500'>
                          {link.label}
                        </Button>
                      </a>
                    ))}
                  </div>

                  {/* Mobile Language Selector */}
                  <div className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm px-6">
                    <Button className='mx-auto bg-gray-800'>
                      <Globe className="w-4 h-4" />
                    <span>EN</span>
                    <ChevronDown className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-700 px-6">
                    <Button variant="outline" className="w-full bg-transparent border-gray-600 hover:bg-green-500 justify-center text-gray-300 hover:text-white">
                      Login
                    </Button>
                    <Button className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold">
                      Join Now
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}


export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="K10 Football Logo" width={200} height={200} />
    </div>
  )
}