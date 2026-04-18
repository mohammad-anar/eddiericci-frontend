"use client";
import badge1 from "@/assets/cvs-page/id/coach-badge1.png";
import badge2 from "@/assets/cvs-page/id/coach-badge2.png";
import badge3 from "@/assets/cvs-page/id/coach-badge3.png";
import flagFr from "@/assets/cvs-page/id/flag-fr.png";
import flagIt from "@/assets/cvs-page/id/flag-itally.png";
import flagImage from "@/assets/cvs-page/id/coach-bio-flag.png";
import leftLeg from "@/assets/cvs-page/id/left-leg-image.png";
import playerImage from "@/assets/cvs-page/id/coach-style-image.png";
import positionMap from "@/assets/cvs-page/id/positionmap.png";
import right from "@/assets/cvs-page/id/right-legt-image.png";
import trofeeIcon from "@/assets/cvs-page/id/trofeeIcon.png";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const CoachBioSection = () => {
  const [isPositionMap, setIsPositionMap] = useState(true);
  const qualifications = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 14c-4 0-6 2-6 2s0 3 6 3 6-3 6-3-2-2-6-2z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M3 8c0-2 1-3 3-3m12 0c2 0 3 1 3 3"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      text: "Strong communication skills, empathy and high expectations combine to create strong individuals and winning teams.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L15 8h6.5l-5.25 3.8 2 6.2L12 14.6 6.75 18l2-6.2L3.5 8H10l3-6z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      text: "Highly skilled professional with 15 years of experience developing improvement programs for athletes of all age groups.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 1v6m0 6v10M7 7h10v10H7z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M3 10h2m12 0h2M5 19h14"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      text: "Five years of experience assistant coach at the college level",
    },
  ];
  
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="col-span-3 h-fit space-y-6 bg-cardBg">
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
                  <span className="flex items-center gap-2">
                    France{" "}
                    <Image
                      src={flagFr}
                      className="w-5 h-auto"
                      alt="italy flag"
                    />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Dual Nationality</span>
                  <span className="flex items-center gap-2">
                    Italy{" "}
                    <Image
                      src={flagIt}
                      className="w-5 h-auto"
                      alt="italy flag"
                    />
                  </span>
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

            {/* Key Accomplishments */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Key Accomplishments
              </h2>
                <div className="max-w-2xl">
                  <div className="space-y-6">
                    {qualifications.map((item, index) => (
                      <div key={index} className="flex gap-4 border rounded-xl p-3">
                        <div className="shrink-0 pt-1">{item.icon}</div>
                        <div className="flex-1">
                          <p className="text-white text-[12px] leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>

            {/* Languages */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Languages
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Portuguese</span>
                  <span className="text-primary text-xs border p-2 rounded bg-green-600/20 border-green-500">NATIVE</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>English</span>
                  <span className="text-blue text-xs border p-2 rounded bg-blue-600/20 border-blue-500">FLUENT</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Spanish</span>
                  <span className="text-orange text-xs border p-2 rounded bg-orange-600/20 border-orange-500">INTERMEDIATE</span>
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
                <Image className="w-60" src={flagImage} alt="flag" />
              </div>

              <h1 className="text-2xl font-bold font-heading mb-2">
                John Doe <span className="text-primary">[58]</span>
              </h1>
            </div>

            {/* Position Selector */}
            <div className="mb-8">
              <button className="flex items-center gap-2 border border-border px-4 py-2 rounded hover:bg-gray-900">
                <span>Head Coach</span>
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

            {/* Coach Style Section */}
            <div className="w-full space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold font-heading mb-6">
                  Coach Style
                </h3>

                <div className="space-y-4">
                  {/* Technical */}
                  <div className="flex justify-center">
                    <Image src={badge1} className="w-20 h-20" alt="badge1" />
                  </div>
                  <p className="text-lg font-heading">Tactics</p>

                  {/* Finesse Shot */}
                  <div className="flex justify-center">
                    <div className="flex justify-center">
                      <Image src={badge2} className="w-20 h-20" alt="badge1" />
                    </div>
                  </div>
                  <p className="text-lg font-heading">Leadership</p>

                  {/* Incisive Pass */}
                  <div className="flex justify-center">
                    <div className="flex justify-center">
                      <Image src={badge3} className="w-20 h-20" alt="badge1" />
                    </div>
                  </div>
                  <p className="text-lg font-heading">Discipline</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-3 space-y-6 bg-cardBg">
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
                  <Image src={trofeeIcon} alt="trofeeImage" />
                  <span>2019 - BRAZILIAN CHAMPIONSHIP - FLAMENGO</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trofeeIcon} alt="trofeeImage" />
                  <span>2010 - CAMPEONATA - PAULISTA - CORINTHIANS</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trofeeIcon} alt="trofeeImage" />
                  <span>2015 - BRAZILIAN CHAMPIONSHIP - FLAMENGO FC</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trofeeIcon} alt="trofeeImage" />
                  <span>2014 PAULISTA CUP - SAO PAULO FC</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trofeeIcon} alt="trofeeImage" />
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

export default CoachBioSection;
