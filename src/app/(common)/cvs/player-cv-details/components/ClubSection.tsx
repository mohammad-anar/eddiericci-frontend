import React from 'react'

const ClubSection = () => {
  return (
     <div className="container py-10 bg-cardBg rounded-xl mt-10">
          <h1 className="text-4xl font-light text-center mb-8 text-foreground font-heading">Clubs</h1>
          <div className="border border-border bg-black/30 rounded-2xl p-8">
            <div className="grid grid-cols-3 gap-6">
              {/* Manchester City */}
              <div className="border border-border cursor-pointer hover:bg-cardBg duration-300 bg-black/20 rounded-lg p-6 flex items-center gap-4 hover:bg-black/30 transition">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-blue-400 flex items-center justify-center text-white font-bold text-lg">
                    MC
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Manchester City</h3>
                  <p className="text-sm text-gray-400">2020-present</p>
                </div>
              </div>

              {/* Liverpool FC */}
              <div className="border border-border cursor-pointer hover:bg-cardBg duration-300 bg-black/20 rounded-lg p-6 flex items-center gap-4 hover:bg-black/30 transition">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-red-700 border-2 border-red-500 flex items-center justify-center text-white font-bold text-lg">
                    LFC
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Liverpool FC</h3>
                  <p className="text-sm text-gray-400">2016-2020 | U-10 to U-14</p>
                </div>
              </div>

              {/* Chelsea FC */}
              <div className="border border-border cursor-pointer hover:bg-cardBg duration-300 bg-black/20 rounded-lg p-6 flex items-center gap-4 hover:bg-black/30 transition">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-700 border-2 border-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    CFC
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Chelsea FC</h3>
                  <p className="text-sm text-gray-400">2020-present</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ClubSection