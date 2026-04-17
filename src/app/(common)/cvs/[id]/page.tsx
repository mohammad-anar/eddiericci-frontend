"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import playerImage from "@/assets/cvs/id/playerImage.png";
import flagImage from "@/assets/cvs/id/flag.png";
import badge1 from "@/assets/cvs/id/badgeImage1.png";
import badge2 from "@/assets/cvs/id/badgeImage2.png";
import badge3 from "@/assets/cvs/id/badgeImage3.png";
import { Button } from "@/components/ui/button";
import { IconShare } from "@tabler/icons-react";
import leftLeg from "@/assets/cvs/id/leftLegImage.png";
import right from "@/assets/cvs/id/rightLegtImage.png";
import positionMap from "@/assets/cvs/id/positionmap.png";
import trofeeIcon from "@/assets/cvs/id/trofeeIcon.png";
import { useState } from "react";

const CVSDynamicPage = () => {
  const [isPositionMap, setIsPositionMap] = useState(true);
  return (
    <>
      <div className="container">
        <div className="py-5 flex items-center justify-end">
          <Button className="bg-gray-500/20">
            Share <IconShare />
          </Button>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="col-span-3 space-y-6 bg-slate-300/10">
            {/* Personal Information */}
            <div className=" p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Personal Information
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Full Name</span>
                  <span>Marcus Silva</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date of Birth</span>
                  <span>15/03/1996</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Age</span>
                  <span>24 years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Birth Country</span>
                  <span>France 🇫🇷</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Dual Nationality</span>
                  <span>Italy 🇮🇹</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Contact
              </h2>
              <div className="space-y-2 text-sm text-primary">
                <div>📧 marcus.silva@email.com</div>
                <div>📱 +351 912 345 678</div>
                <div>📍 France</div>
                <div>🌐 www.k10football.com</div>
              </div>
            </div>

            {/* Physical Stats */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Physical Stats
              </h2>
              <div className="flex justify-around text-center mb-6">
                <div>
                  <div className="text-2xl font-bold text-primary">1.82</div>
                  <div className="text-xs text-gray-400">HEIGHT (m)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">76</div>
                  <div className="text-xs text-gray-400">WEIGHT (kg)</div>
                </div>
              </div>

              <div className=" grid grid-cols-2 gap-6">
                <div className="border-2 bg-gray-600/30 p-3 rounded-xl">
                  <Image
                    src={leftLeg}
                    className="mb-2 mx-auto"
                    alt="leg with ball"
                  />
                  <div className="flex justify-between text-sm mb-1">
                    <span>Left</span>
                    <span className="text-primary">31%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "31%" }}
                    ></div>
                  </div>
                </div>
                <div className="border-2 bg-gray-600/30 p-3 rounded-xl">
                  <Image
                    src={right}
                    className="mb-2 mx-auto"
                    alt="leg with ball"
                  />
                  <div className="flex justify-between text-sm mb-1">
                    <span>Right</span>
                    <span className="text-primary">87%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Languages
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Portuguese</span>
                  <span className="text-primary text-xs">NATIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>English</span>
                  <span className="text-yellow text-xs">FLUENT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Spanish</span>
                  <span className="text-orange text-xs">INTERMEDIATE</span>
                </div>
              </div>
            </div>

            {/* Position Map */}
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setIsPositionMap(true)}
                  className={`${isPositionMap ? "px-3 py-1 bg-primary text-black text-xs text-center font-heading font-normal rounded" : "px-3 py-1 border border-border text-xs rounded hover:bg-gray-900"}`}
                >
                  Position Map
                </button>

                <button
                  onClick={() => setIsPositionMap(false)}
                  className={`${!isPositionMap ? "px-3 py-1 bg-primary text-black text-xs text-center font-heading font-normal rounded" : "px-3 py-1 border border-border text-xs rounded hover:bg-gray-900"}`}
                >
                  Futsal Map
                </button>
              </div>
              <Image src={positionMap} alt="position map" />
            </div>
          </div>

          {/* CENTER COLUMN - PLAYER IMAGE */}
          <div className="col-span-6 flex flex-col items-center">
            {/* Player Name */}
            <div className="text-center mb-8">
              <div className="flex items-center mb-8 justify-center gap-2">
                <Image src={flagImage} alt="flag" />
              </div>

              <h1 className="text-2xl font-bold font-heading mb-2">
                Marcus Silva <span className="text-primary">[94]</span>
              </h1>
            </div>

            {/* Position Selector */}
            <div className="mb-8">
              <button className="flex items-center gap-2 border border-border px-4 py-2 rounded hover:bg-gray-900">
                <span>Defensive Midfielder</span>
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Player Image */}
            <div className="relative w-full h-125 mb-8">
              <Image
                src={playerImage}
                alt="Marcus Silva"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Player Style Section */}
            <div className="w-full space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold font-heading mb-6">
                  Player Style
                </h3>

                <div className="space-y-4">
                  {/* Technical */}
                  <div className="flex justify-center">
                    <Image src={badge1} className="w-20 h-20" alt="badge1" />
                  </div>
                  <p className="text-lg font-heading">Technical</p>

                  {/* Finesse Shot */}
                  <div className="flex justify-center">
                    <div className="flex justify-center">
                      <Image src={badge2} className="w-20 h-20" alt="badge1" />
                    </div>
                  </div>
                  <p className="text-lg font-heading">Finesse Shot</p>

                  {/* Incisive Pass */}
                  <div className="flex justify-center">
                    <div className="flex justify-center">
                      <Image src={badge3} className="w-20 h-20" alt="badge1" />
                    </div>
                  </div>
                  <p className="text-lg font-heading">Incisive Pass</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-3 space-y-6 bg-slate-300/10">
            {/* Strength */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Strength
              </h2>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Pace</span>
                    <span className="text-primary">82</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Shooting</span>
                    <span className="text-primary">84</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "84%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Passing</span>
                    <span className="text-primary">89</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "89%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Dribbling</span>
                    <span className="text-primary">85</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Defending</span>
                    <span className="text-primary">78</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Physical</span>
                    <span className="text-primary">70</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Performance Metrics
              </h2>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Pass Accuracy</span>
                    <span className="text-primary">92%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Shoot Accuracy</span>
                    <span className="text-primary">78%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Dribble Success</span>
                    <span className="text-primary">85%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Tackle Success</span>
                    <span className="text-primary">72%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Value */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Market Value
              </h2>
              <div className="mb-4">
                <div className="text-3xl font-bold text-primary mb-1">$45M</div>
                <p className="text-xs text-gray-400">Current Market Value</p>
                <p className="text-xs text-primary mt-2">
                  📈 5 Mln last season
                </p>
              </div>
            </div>

            {/* Transfer Status */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-center font-heading font-normal">
                  Transfer Status
                </h2>
                <span className="text-xs bg-primary text-black px-2 py-1 rounded">
                  Active
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Contract Until</span>
                  <span>June, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Agent</span>
                  <span>John Morrison</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Agency</span>
                  <span>Elite Sports Mgmt</span>
                </div>
              </div>
            </div>

            {/* Career Highlights */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Career Highlights
              </h2>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex gap-2">
                  <Image src={trofeeIcon} alt="trofeeImage"/>
                  <span>2019 - BRAZILIAN CHAMPIONSHIP - FLAMENGO</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trofeeIcon} alt="trofeeImage"/>
                  <span>2010 - CAMPEONATA - PAULISTA - CORINTHIANS</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trofeeIcon} alt="trofeeImage"/>
                  <span>2015 - BRAZILIAN CHAMPIONSHIP - FLAMENGO FC</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trofeeIcon} alt="trofeeImage"/>
                  <span>2014 PAULISTA CUP - SAO PAULO FC</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trofeeIcon} alt="trofeeImage"/>
                  <span>2017/2020 - CAMPEONATO CARIOCA - VASCO FC</span>
                </div>
              </div>
            </div>

            {/* Current Season Stats */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-6">
                Current Season Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">28</div>
                  <div className="text-xs text-gray-400 mt-1">MATCHES</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">8</div>
                  <div className="text-xs text-gray-400 mt-1">GOALS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">16</div>
                  <div className="text-xs text-gray-400 mt-1">ASSISTS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">8.4</div>
                  <div className="text-xs text-gray-400 mt-1">
                    AVERAGE RATING
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CVSDynamicPage;
