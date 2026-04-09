import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const KeyFeatureSection = () => {
  return (
    <section className="bg-black py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#333333]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Key <span className="text-[#00ff00]">Features</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Explore what makes K10 the premier platform for football talent management and networking.</p>
          </div>

          {/* Feature 1 - Performance Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative h-64 sm:h-80 lg:h-96 bg-[#1a1a1a] rounded-lg border border-[#333333] overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/K10%20-%20HomePage.png-Zy1cyYxudU8ag6u3IW6VJaUDpLIW8Z.jpeg"
                  alt="Performance analytics"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Performance Analytics</h3>
              <p className="text-gray-400 leading-relaxed">Get detailed insights into player performance metrics with real-time data tracking and comprehensive statistical analysis.</p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Star Search', description: 'Discover emerging talents through advanced filtering and AI-powered recommendations.' },
              { title: 'Elite School', description: 'Access premium training programs and coaching from world-class professionals.' },
              { title: 'Unified Profile', description: 'Showcase your skills with a comprehensive player profile that scouts watch.' },
            ].map((feature, i) => (
              <Card key={i} className="bg-[#1a1a1a] border border-[#333333] p-6 space-y-4 hover:border-[#00ff00] transition">
                <h4 className="text-lg font-bold text-white">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default KeyFeatureSection