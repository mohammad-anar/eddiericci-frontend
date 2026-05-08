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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconTrophy } from "@tabler/icons-react";
import { ChevronDown } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COACH_TYPES = [
  "Head Coach",
  "Assistant Coach",
  "Goalkeeping Coach",
  "Fitness Coach",
  "Youth Coach",
  "Technical Coach",
  "Performance Analyst",
  "Scout",
];

type CoachLanguage = {
  name: string;
  level: string;
  color: string;
};

type CoachData = {
  fullName: string;
  dob: string;
  age: string;
  birthCountry: string;
  birthCountryFlag: StaticImageData;
  dualNationality: string;
  dualNationalityFlag: StaticImageData;
  email: string;
  phone: string;
  location: string;
  website: string;
  languages: CoachLanguage[];
  seasonStats: {
    matches: number;
    wins: number;
    cleanSheets: number;
  };
  transferStatus: string;
  contractUntil: string;
  agent: string;
  agency: string;
  majorTrophies: { name: string; count: number }[];
  cupHistory: string[];
  keySkills: string[];
  clubs: { name: string; period: string }[];
};

const COACH_STYLES = [
  { id: "tactics", label: "Tactics" },
  { id: "leadership", label: "Leadership" },
  { id: "discipline", label: "Discipline" },
  { id: "motivation", label: "Motivation" },
  { id: "analysis", label: "Match Analysis" },
  { id: "fitness", label: "Fitness Training" },
  { id: "youth-development", label: "Youth Development" },
  { id: "scouting", label: "Scouting" },
  { id: "set-pieces", label: "Set Piece Master" },
  { id: "team-building", label: "Team Building" },
  { id: "communication", label: "Communication" },
  { id: "strategy", label: "Strategy" },
];

const CoachBioSection = ({ editable }: { editable?: boolean }) => {
  const [coachType, setCoachType] = useState("Head Coach");
  const [coachData, setCoachData] = useState<CoachData>({
    fullName: "Marcus Silva",
    dob: "15/03/1996",
    age: "24 years",
    birthCountry: "France",
    birthCountryFlag: flagFr,
    dualNationality: "Italy",
    dualNationalityFlag: flagIt,
    email: "marcus.silva@email.com",
    phone: "+351 912 345 678",
    location: "France",
    website: "www.k10football.com",
    languages: [
      { name: "Portuguese", level: "NATIVE", color: "text-primary" },
      { name: "English", level: "FLUENT", color: "text-yellow" },
      { name: "Spanish", level: "INTERMEDIATE", color: "text-orange" },
    ],
    seasonStats: {
      matches: 32,
      wins: 21,
      cleanSheets: 9,
    },
    transferStatus: "Active",
    contractUntil: "June, 2026",
    agent: "John Morrison",
    agency: "Elite Sports Mgmt",
    majorTrophies: [
      { name: "K10 FOOTBALL CHAMPIONSHIP", count: 3 },
      { name: "K10 FOOTBALL CUP", count: 7 },
      { name: "K10 FOOTBALL LEAGUE", count: 12 },
      { name: "K10 FOOTBALL YOUTH CUP", count: 5 },
      { name: "GBN CFN B", count: 2 },
      { name: "GBN CFN B", count: 2 },
      { name: "GBN CFN B", count: 4 },
    ],
    cupHistory: [
      "2021 - K10 FOOTBALL LEAGUE - K10 FOOTBALL FC",
      "2019 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
      "2018 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
      "2017 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
      "2016 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
    ],
    keySkills: [
      "Youth Development",
      "Leadership",
      "Adaptability",
      "Constructive Feedback",
    ],
    clubs: [
      { name: "Manchester City", period: "2020-present" },
      { name: "Manchester City", period: "2020-present" },
      { name: "Manchester City", period: "2020-present" },
    ],
  });
  const [selectedStyleIds, setSelectedStyleIds] = useState<string[]>([
    "tactics",
    "leadership",
    "discipline",
  ]);
  const orderedSelectedStyles = selectedStyleIds.map(
    (id) => COACH_STYLES.find((style) => style.id === id)!
  );
  const styleBadges = [badge1, badge2, badge3];
  const maxStyleSelections = 3;

  const handleUpdate = (field: string, value: unknown) => {
    setCoachData((prev) => {
      const keys = field.split(".");
      if (keys.length === 1) return { ...prev, [field]: value };

      const next = { ...prev } as Record<string, unknown>;
      let current: Record<string, unknown> = next;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const nextValue = current[key];
        current[key] = Array.isArray(nextValue)
          ? [...(nextValue as unknown[])]
          : { ...(nextValue as Record<string, unknown>) };
        current = current[key] as Record<string, unknown>;
      }
      current[keys[keys.length - 1]] = value;
      return next as CoachData;
    });
  };

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
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">Full Name</span>
                  {editable ? (
                    <Input
                      value={coachData.fullName}
                      onChange={(e) => handleUpdate("fullName", e.target.value)}
                      className="h-8 text-xs w-40"
                    />
                  ) : (
                    <span>{coachData.fullName}</span>
                  )}
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">Date of Birth</span>
                  {editable ? (
                    <Input
                      value={coachData.dob}
                      onChange={(e) => handleUpdate("dob", e.target.value)}
                      className="h-8 text-xs w-32"
                    />
                  ) : (
                    <span>{coachData.dob}</span>
                  )}
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">Age</span>
                  {editable ? (
                    <Input
                      value={coachData.age}
                      onChange={(e) => handleUpdate("age", e.target.value)}
                      className="h-8 text-xs w-24"
                    />
                  ) : (
                    <span>{coachData.age}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Birth Country</span>
                  <div className="flex items-center gap-2">
                    {editable ? (
                      <Input
                        value={coachData.birthCountry}
                        onChange={(e) => handleUpdate("birthCountry", e.target.value)}
                        className="h-8 text-xs w-40"
                      />
                    ) : (
                      <span>{coachData.birthCountry}</span>
                    )}
                    <Image
                      src={coachData.birthCountryFlag}
                      className="w-5 h-auto"
                      alt="country flag"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Dual Nationality</span>
                  <div className="flex items-center gap-2">
                    {editable ? (
                      <Input
                        value={coachData.dualNationality}
                        onChange={(e) => handleUpdate("dualNationality", e.target.value)}
                        className="h-8 text-xs w-40"
                      />
                    ) : (
                      <span>{coachData.dualNationality}</span>
                    )}
                    <Image
                      src={coachData.dualNationalityFlag}
                      className="w-5 h-auto"
                      alt="nationality flag"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Contact
              </h2>
              <div className="space-y-2 text-sm text-primary">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  {editable ? (
                    <Input
                      value={coachData.email}
                      onChange={(e) => handleUpdate("email", e.target.value)}
                      className="h-8 text-xs w-full bg-transparent border-primary/30"
                    />
                  ) : (
                    <span>{coachData.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  {editable ? (
                    <Input
                      value={coachData.phone}
                      onChange={(e) => handleUpdate("phone", e.target.value)}
                      className="h-8 text-xs w-full bg-transparent border-primary/30"
                    />
                  ) : (
                    <span>{coachData.phone}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  {editable ? (
                    <Input
                      value={coachData.location}
                      onChange={(e) => handleUpdate("location", e.target.value)}
                      className="h-8 text-xs w-full bg-transparent border-primary/30"
                    />
                  ) : (
                    <span>{coachData.location}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  {editable ? (
                    <Input
                      value={coachData.website}
                      onChange={(e) => handleUpdate("website", e.target.value)}
                      className="h-8 text-xs w-full bg-transparent border-primary/30"
                    />
                  ) : (
                    <span>{coachData.website}</span>
                  )}
                </div>
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
                {coachData.languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b pb-2 gap-2">
                    {editable ? (
                      <Input
                        value={lang.name}
                        onChange={(e) => handleUpdate(`languages.${idx}.name`, e.target.value)}
                        className="h-8 text-xs w-24 bg-transparent"
                      />
                    ) : (
                      <span>{lang.name}</span>
                    )}
                    {editable ? (
                      <Input
                        value={lang.level}
                        onChange={(e) => handleUpdate(`languages.${idx}.level`, e.target.value)}
                        className="h-8 text-xs w-28 bg-transparent text-right"
                      />
                    ) : (
                      <span className={`${lang.color} text-xs border p-2 rounded bg-opacity-20`}>
                        {lang.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* MAJOR TROPHIES */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                MAJOR TROPHIES
              </h2>
              <div className="">
                <div className="space-y-4">
                  {coachData.majorTrophies.map((tournament, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 px-4 border-b border-slate-800"
                    >
                      {editable ? (
                        <Input
                          value={tournament.name}
                          onChange={(e) => handleUpdate(`majorTrophies.${index}.name`, e.target.value)}
                          className="text-white text-[12px] font-medium tracking-wide bg-transparent"
                        />
                      ) : (
                        <p className="text-white text-[12px] font-medium tracking-wide">
                          {tournament.name}
                        </p>
                      )}
                      <div className="flex items-center gap-3">
                        {editable ? (
                          <Input
                            type="number"
                            value={tournament.count}
                            onChange={(e) => handleUpdate(`majorTrophies.${index}.count`, parseInt(e.target.value))}
                            className="text-sm font-semibold w-16 rounded bg-transparent text-white"
                          />
                        ) : (
                          <span className="text-white text-sm font-semibold">
                            {tournament.count}
                          </span>
                        )}
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
                {coachData.fullName} <span className="text-primary">[58]</span>
              </h1>
            </div>

            {/* Position Selector */}
            <div className="mb-8">
              {editable ? (
                <Select value={coachType} onValueChange={setCoachType}>
                  <SelectTrigger className="border-border px-4 py-2 rounded hover:bg-gray-900 bg-transparent text-foreground h-auto">
                    <SelectValue placeholder="Select coach type" />
                  </SelectTrigger>
                  <SelectContent className="bg-cardBg border-border text-foreground">
                    <SelectGroup>
                      <SelectLabel className="text-gray-400 font-bold text-xs">
                        Coach Types
                      </SelectLabel>
                      {COACH_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <button className="flex items-center gap-2 border border-border px-4 py-2 rounded hover:bg-gray-900">
                  <span>{coachType}</span>
                  <ChevronDown size={16} />
                </button>
              )}
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
                <div className="flex items-center justify-center gap-4 mb-6">
                  <h3 className="text-2xl font-bold font-heading">Coach Style</h3>
                  {editable ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-cardBg border-border text-foreground">
                        <DialogHeader>
                          <DialogTitle>Select Coach Styles (Max 3)</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-2">
                          {COACH_STYLES.map((style) => (
                            <div key={style.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={style.id}
                                checked={selectedStyleIds.includes(style.id)}
                                onCheckedChange={() => {
                                  const isSelected = selectedStyleIds.includes(style.id);
                                  if (isSelected) {
                                    setSelectedStyleIds(
                                      selectedStyleIds.filter((item) => item !== style.id)
                                    );
                                  } else if (selectedStyleIds.length < maxStyleSelections) {
                                    setSelectedStyleIds([...selectedStyleIds, style.id]);
                                  }
                                }}
                                disabled={
                                  !selectedStyleIds.includes(style.id) &&
                                  selectedStyleIds.length >= maxStyleSelections
                                }
                              />
                              <Label
                                htmlFor={style.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {style.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : null}
                </div>

                <div className="space-y-4">
                  {orderedSelectedStyles.map((style, index) => (
                    <div key={style.id} className="space-y-4">
                      <div className="flex justify-center">
                        <Image
                          src={styleBadges[index]}
                          className="w-20 h-20"
                          alt={style.label}
                        />
                      </div>
                      <p className="text-lg font-heading">{style.label}</p>
                    </div>
                  ))}
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
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-fit mx-auto">
                  {editable ? (
                    <Input
                      type="number"
                      value={coachData.seasonStats.matches}
                      onChange={(e) => handleUpdate("seasonStats.matches", parseInt(e.target.value))}
                      className="text-2xl font-medium text-primary mb-2 text-center w-20"
                    />
                  ) : (
                    <h2 className="text-2xl font-medium text-primary mb-2">{coachData.seasonStats.matches}</h2>
                  )}
                  <h3 className="text-[12px]">MATCHES COACHED</h3>
                </div>
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-fit mx-auto">
                  {editable ? (
                    <Input
                      type="number"
                      value={coachData.seasonStats.wins}
                      onChange={(e) => handleUpdate("seasonStats.wins", parseInt(e.target.value))}
                      className="text-2xl font-medium text-primary mb-2 text-center w-20"
                    />
                  ) : (
                    <h2 className="text-2xl font-medium text-primary mb-2">{coachData.seasonStats.wins}</h2>
                  )}
                  <h3 className="text-[12px]">Win</h3>
                </div>
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-fit mx-auto">
                  {editable ? (
                    <Input
                      type="number"
                      value={coachData.seasonStats.cleanSheets}
                      onChange={(e) => handleUpdate("seasonStats.cleanSheets", parseInt(e.target.value))}
                      className="text-2xl font-medium text-primary mb-2 text-center w-20"
                    />
                  ) : (
                    <h2 className="text-2xl font-medium text-primary mb-2">{coachData.seasonStats.cleanSheets}</h2>
                  )}
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
                  {coachData.transferStatus}
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
                  <span className="text-gray-400">Contract Until</span>
                  {editable ? (
                    <Input
                      value={coachData.contractUntil}
                      onChange={(e) => handleUpdate("contractUntil", e.target.value)}
                      className="h-8 text-xs w-28 bg-transparent"
                    />
                  ) : (
                    <span>{coachData.contractUntil}</span>
                  )}
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Agent</span>
                  {editable ? (
                    <Input
                      value={coachData.agent}
                      onChange={(e) => handleUpdate("agent", e.target.value)}
                      className="h-8 text-xs w-28 bg-transparent"
                    />
                  ) : (
                    <span>{coachData.agent}</span>
                  )}
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Agency</span>
                  {editable ? (
                    <Input
                      value={coachData.agency}
                      onChange={(e) => handleUpdate("agency", e.target.value)}
                      className="h-8 text-xs w-28 bg-transparent"
                    />
                  ) : (
                    <span>{coachData.agency}</span>
                  )}
                </div>
              </div>
            </div>

            {/* CUP PLAYED */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                CUP PLAYED
              </h2>
              <div className="space-y-2 text-xs text-gray-300">
                {coachData.cupHistory.map((cup, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Image src={trophyIcon} alt="trophyImage" />
                    {editable ? (
                      <Input
                        value={cup}
                        onChange={(e) => handleUpdate(`cupHistory.${index}`, e.target.value)}
                        className="h-7 text-xs w-full bg-transparent"
                      />
                    ) : (
                      <span>{cup}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Skills */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-6">
                Key Skills
              </h2>
              <div className="space-y-4">
                {coachData.keySkills.map((skill, index) => (
                  <div key={index} className="text-center border-b pb-3">
                    {editable ? (
                      <Input
                        value={skill}
                        onChange={(e) => handleUpdate(`keySkills.${index}`, e.target.value)}
                        className="h-8 text-xs bg-transparent w-full text-center"
                      />
                    ) : (
                      <h3 className="text-center">{skill}</h3>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Clubs */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-6">
                Clubs
              </h2>
              <div className="space-y-4">
                {coachData.clubs.map((club, index) => (
                  <Card key={index} className="p-5">
                    <div className="flex items-center gap-3">
                      <Image src={clubImage} className="w-12" alt="clubs image" />
                      <div className="w-full">
                        {editable ? (
                          <Input
                            value={club.name}
                            onChange={(e) => handleUpdate(`clubs.${index}.name`, e.target.value)}
                            className="h-8 text-xs w-full bg-transparent"
                          />
                        ) : (
                          <h3 className="font-bold">{club.name}</h3>
                        )}
                        {editable ? (
                          <Input
                            value={club.period}
                            onChange={(e) => handleUpdate(`clubs.${index}.period`, e.target.value)}
                            className="h-8 text-xs w-full bg-transparent mt-1"
                          />
                        ) : (
                          <p className="text-[12px] text-gray-400">{club.period}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachBioSection;
