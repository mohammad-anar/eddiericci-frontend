'use client'

import formation1 from "@/assets/cvs-page/id/formation1.png"
import formation2 from "@/assets/cvs-page/id/formation2.png"
import formation3 from "@/assets/cvs-page/id/formation3.png"
import Image from 'next/image'

export default function Top3Formation() {
  const logos = [
    { id: 1, name: 'Logo 1', image: formation1 },
    { id: 2, name: 'Logo 2', image: formation2 },
    { id: 3, name: 'Logo 3', image: formation3 }
  ]



  return (
    <div className="py-20 bg-black p-12">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-heading text-white text-center mb-12 tracking-wide">
          TOP 3 FORMATIONS
        </h1>

        {/* Logo Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {logos.map((logo) => (
            <div key={logo.id} className=''>
                <Image  src={logo.image} className=' object-contain'  alt='logo'/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
