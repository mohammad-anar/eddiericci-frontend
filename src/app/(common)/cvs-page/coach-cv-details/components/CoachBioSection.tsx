"use client";
import clubImage from "@/assets/cvs-page/club1.png";
import badge1 from "@/assets/cvs-page/id/coach-badge1.png";
import badge2 from "@/assets/cvs-page/id/coach-badge2.png";
import badge3 from "@/assets/cvs-page/id/coach-badge3.png";
import flagImage from "@/assets/cvs-page/id/coach-bio-flag.png";
import playerImage from "@/assets/cvs-page/id/coach-style-image.png";
import flagFr from "@/assets/cvs-page/id/flag-fr.png";
import flagIt from "@/assets/cvs-page/id/flag-itally.png";
import trophyIcon from "@/assets/cvs-page/id/trofeeIcon.png";
import { Card } from "@/components/ui/card";
import { IconTrophy } from "@tabler/icons-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const CoachBioSection = () => {
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

  const tournaments = [
    {
      name: "K10 FOOTBALL CHAMPIONSHIP",
      count: 3,
    },
    {
      name: "K10 FOOTBALL CUP",
      count: 7,
    },
    {
      name: "K10 FOOTBALL LEAGUE",
      count: 12,
    },
    {
      name: "K10 FOOTBALL YOUTH CUP",
      count: 5,
    },
    {
      name: "GBN CFN B",
      count: 2,
    },
    {
      name: "GBN CFN B",
      count: 2,
    },
    {
      name: "GBN CFN B",
      count: 4,
    },
  ];

  const TrophyIcon = () => (
    <svg
      className="w-6 h-6 text-green-500"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M6 2h12v3h2v2c0 2-1 3-2 3h-1v7c0 2-1 3-3 3h-4c-2 0-3-1-3-3v-7h-1c-1 0-2-1-2-3V7h2V2z" />
      <path d="M9 17v2h6v-2" />
      <path d="M10 19v2h4v-2" />
    </svg>
  );
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
                    <div
                      key={index}
                      className="flex gap-4 border rounded-xl p-3"
                    >
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
                  <span className="text-primary text-xs border p-2 rounded bg-green-600/20 border-green-500">
                    NATIVE
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>English</span>
                  <span className="text-blue text-xs border p-2 rounded bg-blue-600/20 border-blue-500">
                    FLUENT
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Spanish</span>
                  <span className="text-orange text-xs border p-2 rounded bg-orange-600/20 border-orange-500">
                    INTERMEDIATE
                  </span>
                </div>
              </div>
            </div>
            {/* MAJOR TROPHIES */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                MAJOR TROPHIES
              </h2>
              <div className="">
                <div className="space-y-4">
                  {tournaments.map((tournament, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 px-4 border-b border-slate-800"
                    >
                      <p className="text-white text-[12px] font-medium tracking-wide">
                        {tournament.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-white text-sm font-semibold">
                          {tournament.count}
                        </span>
                        <IconTrophy />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
          <div className="col-span-3 space-y-6 bg-cardBg h-fit">
            {/* Current Season Stats */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Current Season Stats
              </h2>
              <div className="text-sm space-y-4">
                {/*  */}
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-fit mx-auto">
                  <h2 className="text-2xl font-medium text-primary mb-2">32</h2>
                  <h3 className="text-[12px]">MATCHES COACHED</h3>
                </div>
                {/*  */}
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-fit mx-auto">
                  <h2 className="text-2xl font-medium text-primary mb-2">21</h2>
                  <h3 className="text-[12px]">Win</h3>
                </div>
                {/*  */}
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-fit mx-auto">
                  <h2 className="text-2xl font-medium text-primary mb-2">9</h2>
                  <h3 className="text-[12px]">CLEAN SHEETS</h3>
                </div>
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
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">
                    Football Agent Contract:
                  </span>
                  <span>No</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Transfer fees</span>
                  <span>$ 250000.00</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Salary</span>
                  <span>$ 25000.00</span>
                </div>
              </div>
            </div>

            {/* CUP PLAYED */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                CUP PLAYED
              </h2>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex gap-2">
                  <Image src={trophyIcon} alt="trophyImage" />
                  <span>2021 - K10 FOOTBALL LEAGUE - K10 FOOTBALL FC</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trophyIcon} alt="trophyImage" />
                  <span>2019 - K10 FOOTBALL CUP - K10 FOOTBALL FC</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trophyIcon} alt="trophyImage" />
                  <span>2018 - K10 FOOTBALL CUP - K10 FOOTBALL FC</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trophyIcon} alt="trophyImage" />
                  <span>2017 - K10 FOOTBALL CUP - K10 FOOTBALL FC</span>
                </div>
                <div className="flex gap-2">
                  <Image src={trophyIcon} alt="trophyImage" />
                  <span>2016 - K10 FOOTBALL CUP - K10 FOOTBALL FC</span>
                </div>
              </div>
            </div>

            {/* Key Skills */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-6">
                Key Skills
              </h2>
              <div className="space-y-4">
                <h3 className="text-center border-b pb-3 ">
                  Youth Development
                </h3>
                <h3 className="text-center border-b pb-3 ">Leadership</h3>
                <h3 className="text-center border-b pb-3 ">Adaptability</h3>
                <h3 className="text-center border-b pb-3 ">
                  Constructive Feedback
                </h3>
              </div>
            </div>
            {/* Clubs */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-6">
                Clubs
              </h2>
              <div className="space-y-4">
                <Card className="p-5">
                  <div className="flex items-center gap-3">
                    <Image src={clubImage} className="w-12" alt="clubs image" />
                    <div>
                      <h3 className="font-bold">Manchester City</h3>
                      <p className="text-[12px] text-gray-400">2020-present</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3">
                    <Image src={clubImage} className="w-12" alt="clubs image" />
                    <div>
                      <h3 className="font-bold">Manchester City</h3>
                      <p className="text-[12px] text-gray-400">2020-present</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3">
                    <Image src={clubImage} className="w-12" alt="clubs image" />
                    <div>
                      <h3 className="font-bold">Manchester City</h3>
                      <p className="text-[12px] text-gray-400">2020-present</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachBioSection;
