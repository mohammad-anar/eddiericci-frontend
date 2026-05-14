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
import { ChevronDown, PencilIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { CMSField } from "@/components/shared/CMSField";
import { useCoach } from "@/lib/hooks/useCoach";
import { usePlayerStats } from "../../player-cv-details/components/FullEditablePage";
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
  qualifications: { id: number; text: string }[];
  playerImage: StaticImageData | string;
  mainFlag: StaticImageData | string;
};

const COACH_STYLE_GROUPS = [
  {
    label: "Tactical Philosophy",
    styles: ["Tiki-Taka", "Gegenpressing", "Counter-Attack", "Park the Bus"],
  },
  {
    label: "Man Management",
    styles: ["Motivator", "Disciplinarian", "Holistic", "Player-Centric"],
  },
  {
    label: "Strategic Focus",
    styles: [
      "Youth Development",
      "Set-Piece Specialist",
      "Defensive Solid",
      "Attack Minded",
    ],
  },
];

const CoachBioSection = ({ editable }: { editable?: boolean }) => {
  const { coachData, handleUpdate } = useCoach();

  const styleBadges = [badge1, badge2, badge3];
  const { role } = usePlayerStats();

  const canEdit = !!(editable && role === "coach");



  const handleImageUpload = async (file: File, field: string) => {
    let processedFile = file;

    if (field === "coachImage" || field === "playerImage") {
      try {
        const { toast } = await import("sonner");
        toast.loading("Removing background... Please wait.", { id: "bg-removal" });
        const { removeBackground } = await import("@imgly/background-removal");
        const blob = await removeBackground(file);
        processedFile = new File([blob], file.name, { type: "image/png" });
        toast.success("Background removed!", { id: "bg-removal" });
      } catch (error) {
        console.error("Background removal failed:", error);
        const { toast } = await import("sonner");
        toast.error("Background removal failed. Using original image.", { id: "bg-removal" });
      }
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleUpdate(field, reader.result);
    };
    reader.readAsDataURL(processedFile);
  };

  const EditableImage = ({
    src,
    alt,
    className,
    field,
    width,
    height,
    fill,
  }: {
    src: any;
    alt: string;
    className?: string;
    field: string;
    width?: number;
    height?: number;
    fill?: boolean;
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
      <div
        className={cn(
          "relative group w-full h-full",
          canEdit ? "cursor-pointer" : ""
        )}
        onClick={() => canEdit && fileInputRef.current?.click()}
      >
        <Image
          src={src}
          alt={alt}
          className={className}
          {...(!fill ? { width: width || 500, height: height || 500 } : { fill: true })}
        />
        {canEdit && (
          <>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
              <span className="text-[10px] text-white font-black uppercase tracking-widest">
                Click to Change
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, field);
              }}
            />
          </>
        )}
      </div>
    );
  };

  const qualificationsIcons = [
    (
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
    (
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
    (
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
  ];

  return (
    <>
      <div className="container">
        <div className="grid xl:grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="col-span-12 xl:col-span-4 h-fit space-y-6 bg-cardBg">
            {/* Personal Information */}
            <div className=" p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Personal Information
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">Full Name</span>
                  <CMSField
                    value={coachData.fullName}
                    onUpdate={(val) => handleUpdate("fullName", val)}
                    canEdit={canEdit}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">Date of Birth</span>
                  <CMSField
                    value={coachData.dob}
                    onUpdate={(val) => handleUpdate("dob", val)}
                    canEdit={canEdit}
                    className="w-32 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">Age</span>
                  <CMSField
                    value={coachData.age}
                    onUpdate={(val) => handleUpdate("age", val)}
                    canEdit={canEdit}
                    className="w-24 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Birth Country</span>
                  <div className="flex items-center gap-2">
                    <CMSField
                      value={coachData.birthCountry}
                      onUpdate={(val) => handleUpdate("birthCountry", val)}
                      canEdit={canEdit}
                      className="w-24 justify-end"
                      inputClassName="text-right"
                    />
                    <div className="relative w-5 h-4">
                      <EditableImage
                        src={coachData.birthCountryFlag}
                        alt="country flag"
                        field="birthCountryFlag"
                        width={20}
                        height={16}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Dual Nationality</span>
                  <div className="flex items-center gap-2">
                    <CMSField
                      value={coachData.dualNationality}
                      onUpdate={(val) => handleUpdate("dualNationality", val)}
                      canEdit={canEdit}
                      className="w-24 justify-end"
                      inputClassName="text-right"
                    />
                    <div className="relative w-5 h-4">
                      <EditableImage
                        src={coachData.dualNationalityFlag}
                        alt="nationality flag"
                        field="dualNationalityFlag"
                        width={20}
                        height={16}
                      />
                    </div>
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
                  <CMSField
                    value={coachData.email}
                    onUpdate={(val) => handleUpdate("email", val)}
                    canEdit={canEdit}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <CMSField
                    value={coachData.phone}
                    onUpdate={(val) => handleUpdate("phone", val)}
                    canEdit={canEdit}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <CMSField
                    value={coachData.location}
                    onUpdate={(val) => handleUpdate("location", val)}
                    canEdit={canEdit}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <CMSField
                    value={coachData.website}
                    onUpdate={(val) => handleUpdate("website", val)}
                    canEdit={canEdit}
                    className="flex-1"
                  />
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
                  {coachData.qualifications.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 border rounded-xl p-3"
                    >
                      <div className="shrink-0 pt-1">{qualificationsIcons[index]}</div>
                      <div className="flex-1">
                        <CMSField
                          value={item.text}
                          onUpdate={(val) => {
                            const newQuals = [...coachData.qualifications];
                            newQuals[index] = { ...newQuals[index], text: String(val) };
                            handleUpdate("qualifications", newQuals);
                          }}
                          canEdit={canEdit}
                          type="textarea"
                          className="text-white text-[12px] leading-relaxed"
                        />
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
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b pb-2 gap-2"
                  >
                    <CMSField
                      value={lang.name}
                      onUpdate={(val) => {
                        const newLangs = [...coachData.languages];
                        newLangs[idx] = { ...newLangs[idx], name: String(val) };
                        handleUpdate("languages", newLangs);
                      }}
                      canEdit={canEdit}
                      className="flex-1"
                    />
                    <CMSField
                      value={lang.level}
                      onUpdate={(val) => {
                        const newLangs = [...coachData.languages];
                        newLangs[idx] = { ...newLangs[idx], level: String(val) };
                        handleUpdate("languages", newLangs);
                      }}
                      canEdit={canEdit}
                      className="w-28 justify-end"
                      inputClassName="text-right"
                    />
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
                      <CMSField
                        value={tournament.name}
                        onUpdate={(val) => {
                          const newTrophies = [...coachData.majorTrophies];
                          newTrophies[index] = { ...newTrophies[index], name: String(val) };
                          handleUpdate("majorTrophies", newTrophies);
                        }}
                        canEdit={canEdit}
                        className="text-white text-[12px] font-medium tracking-wide flex-1"
                      />
                      <div className="flex items-center gap-3">
                        <CMSField
                          value={tournament.count}
                          onUpdate={(val) => {
                            const newTrophies = [...coachData.majorTrophies];
                            newTrophies[index] = { ...newTrophies[index], count: Number(val) };
                            handleUpdate("majorTrophies", newTrophies);
                          }}
                          canEdit={canEdit}
                          isNumeric
                          className="text-white text-sm font-semibold w-12 justify-center"
                          inputClassName="text-center"
                        />
                        <IconTrophy />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN - PLAYER IMAGE */}
          <div className="col-span-12 xl:col-span-4 flex flex-col items-center">
            {/* Player Name */}
            <div className="text-center mb-8">
              <div className="flex items-center mb-8 justify-center gap-2">
                <EditableImage
                  src={coachData.mainFlag}
                  alt="flag"
                  className="w-60"
                  field="mainFlag"
                />
              </div>

              <h1 className="text-2xl font-bold font-heading mb-2">
                {coachData.fullName} <span className="text-primary">[58]</span>
              </h1>
            </div>

            {/* Position Selector */}
            <div className="mb-8 flex items-center justify-center">
              <CMSField
                value={coachData.coachType}
                onUpdate={(val) => handleUpdate("coachType", String(val))}
                canEdit={canEdit}
                type="select"
                options={COACH_TYPES}
                className="w-fit"
                inputClassName="w-48"
              />
            </div>

            <div className="relative w-full h-[723px] mb-8 flex items-end justify-center">
              <EditableImage
                src={coachData.coachImage}
                alt={coachData.fullName}
                className="object-contain w-auto h-full"
                width={800}
                height={800}
                field="coachImage"
              />
            </div>

            {/* Coach Style Section */}
            <div className="w-full space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold font-heading mb-6">
                  Coach Style
                </h3>

                <div className="mb-8 flex items-center justify-center">
                  <CMSField
                    value={coachData.coachStyle}
                    onUpdate={(val) => handleUpdate("coachStyle", String(val))}
                    canEdit={canEdit}
                    type="select"
                    options={COACH_STYLE_GROUPS.flatMap(g => g.styles)}
                    className="w-fit"
                    inputClassName="w-48"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Image src={badge1} className="w-20 h-20" alt="badge" />
                  </div>
                  <p className="text-lg font-heading">{coachData.coachStyle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 xl:col-span-4 space-y-6 bg-cardBg h-fit">
            {/* Current Season Stats */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Current Season Stats
              </h2>
              <div className="text-sm space-y-4">
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-fit mx-auto">
                  <CMSField
                    value={coachData.seasonStats.matches}
                    onUpdate={(val) => handleUpdate("seasonStats.matches", val)}
                    canEdit={canEdit}
                    isNumeric
                    className="text-2xl font-medium text-primary mb-2 justify-center"
                    inputClassName="text-center w-20"
                  />
                  <h3 className="text-[12px]">MATCHES COACHED</h3>
                </div>
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-fit mx-auto">
                  <CMSField
                    value={coachData.seasonStats.wins}
                    onUpdate={(val) => handleUpdate("seasonStats.wins", val)}
                    canEdit={canEdit}
                    isNumeric
                    className="text-2xl font-medium text-primary mb-2 justify-center"
                    inputClassName="text-center w-20"
                  />
                  <h3 className="text-[12px]">Win</h3>
                </div>
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-fit mx-auto">
                  <CMSField
                    value={coachData.seasonStats.cleanSheets}
                    onUpdate={(val) => handleUpdate("seasonStats.cleanSheets", val)}
                    canEdit={canEdit}
                    isNumeric
                    className="text-2xl font-medium text-primary mb-2 justify-center"
                    inputClassName="text-center w-20"
                  />
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
                  <CMSField
                    value={coachData.contractUntil}
                    onUpdate={(val) => handleUpdate("contractUntil", val)}
                    canEdit={canEdit}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Agent</span>
                  <CMSField
                    value={coachData.agent}
                    onUpdate={(val) => handleUpdate("agent", val)}
                    canEdit={canEdit}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Agency</span>
                  <CMSField
                    value={coachData.agency}
                    onUpdate={(val) => handleUpdate("agency", val)}
                    canEdit={canEdit}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
              </div>
            </div>

            {/* CUP PLAYED */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                CUP PLAYED
              </h2>
              <div className="space-y-2 text-xs text-gray-300 border-l border-green-500">
                {coachData.cupHistory.map((cup, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Image src={trophyIcon} alt="trophyImage" />
                    <CMSField
                      value={cup}
                      onUpdate={(val) => {
                        const newCups = [...coachData.cupHistory];
                        newCups[index] = String(val);
                        handleUpdate("cupHistory", newCups);
                      }}
                      canEdit={canEdit}
                      className="flex-1"
                    />
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
                    <CMSField
                      value={skill}
                      onUpdate={(val) => {
                        const newSkills = [...coachData.keySkills];
                        newSkills[index] = String(val);
                        handleUpdate("keySkills", newSkills);
                      }}
                      canEdit={canEdit}
                      className="justify-center"
                      inputClassName="text-center"
                    />
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
                        <CMSField
                          value={club.name}
                          onUpdate={(val) => {
                            const newClubs = [...coachData.clubs];
                            newClubs[index] = { ...newClubs[index], name: String(val) };
                            handleUpdate("clubs", newClubs);
                          }}
                          canEdit={canEdit}
                          className="font-bold"
                        />
                        <CMSField
                          value={club.period}
                          onUpdate={(val) => {
                            const newClubs = [...coachData.clubs];
                            newClubs[index] = { ...newClubs[index], period: String(val) };
                            handleUpdate("clubs", newClubs);
                          }}
                          canEdit={canEdit}
                          className="text-[12px] text-gray-400"
                        />
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
