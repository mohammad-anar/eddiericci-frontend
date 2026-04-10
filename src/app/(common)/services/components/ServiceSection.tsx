import { BarChart3, Users, Video } from 'lucide-react'
import React from 'react'

const ServiceSection = () => {
  return (
    <section className="w-full bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#003D18] text-black px-4 py-2 rounded-full font-semibold text-sm">
            Our Services
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Comprehensive Football <span className="text-[#003D18]">Analytics</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional performance tracking and career development tools designed for modern football players, scouts, and clubs.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Performance Analytics Card */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#003D18] p-3 rounded">
                <BarChart3 className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white">Performance Analytics</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Comprehensive player performance tracking with real-time statistics, advanced metrics, and AI-powered insights.
            </p>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>Real-time match statistics</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>Advanced performance metrics</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>AI-powered trend analysis</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>Custom report generation</span>
              </li>
            </ul>
          </div>

          {/* Scouting Network Card */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#003D18] p-3 rounded">
                <Users className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white">Scouting Network</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Connect with scouts, agents, and clubs worldwide. Access our extensive database of verified player profiles.
            </p>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>Global scouting network</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>Verified player profiles</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>Direct agent connections</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>Club recruitment tools</span>
              </li>
            </ul>
          </div>

          {/* Video Analysis Card */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#003D18] p-3 rounded">
                <Video className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white">Video Analysis</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Professional video analysis tools with highlight reels, match breakdowns, and tactical insights.
            </p>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>Automated highlight reels</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>Tactical match analysis</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>Video comparison tools</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-[#003D18] mt-1">•</span>
                <span>Cloud storage & sharing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceSection