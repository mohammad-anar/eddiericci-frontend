/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import flag from "@/assets/cvs-page//id/flag.png";
import playerImage from "@/assets/cvs-page/id/player-short-image.png";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { usePlayerStats } from "./FullEditablePage";
import { useUpdatePlayerProfileMutation } from "@/lib/features/cv/cvApi";
import { CMSField } from "@/components/shared/CMSField";
import { toast } from "sonner";

interface Attribute {
  name: string;
  score: number;
  status: "Excellent" | "Good" | "Average";
}

const getBadgeStatus = (score: number): "Excellent" | "Good" | "Average" => {
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Good";
  return "Average";
};

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Excellent":
      return "bg-[#1B4D2E] text-[#00FF62] border-[#00FF62]";
    case "Good":
      return "bg-[#4D3D1B] text-[#FFCC00] border-[#FFCC00]";
    case "Average":
      return "bg-[#4D1B1B] text-[#DC143C] border-[#DC143C]";
    default:
      return "bg-[#1B4D2E] text-[#00FF62] border-[#00FF62]";
  }
};

export default function PlayerProfile({
  editable = false,
}: {
  editable?: boolean;
}) {
  const { bioRating, skillsAvg, metricsAvg, attributesAvg, role } =
    usePlayerStats();
  const [updatePlayer] = useUpdatePlayerProfileMutation();

  const [playerInfo, setPlayerInfo] = useState({
    name: "Marcus Silva",
    country: "France",
    position: "Defensive Midfielder",
  });

  const [attrData, setAttrData] = useState<Attribute[]>([
    { name: "Crossing", score: 84, status: "Excellent" },
    { name: "Sprint Speed", score: 82, status: "Excellent" },
    { name: "Stamina", score: 82, status: "Excellent" },
    { name: "Marking", score: 72, status: "Good" },
    { name: "Stand Tackle", score: 75, status: "Good" },
    { name: "Slide Tackle", score: 100, status: "Excellent" },
    { name: "Heading", score: 60, status: "Average" },
    { name: "Aggression", score: 87, status: "Excellent" },
    { name: "Interception", score: 72, status: "Good" },
    { name: "Short Pass", score: 85, status: "Excellent" },
    { name: "Ball Control", score: 80, status: "Good" },
    { name: "Reactions", score: 80, status: "Good" },
  ]);

  const overallRating = Math.round(
    (bioRating + skillsAvg + metricsAvg + attributesAvg) / 4,
  );

  const handleUpdate = async (idx: number, value: number) => {
    const attrName = attrData[idx].name;
    setAttrData((prev) => {
      const newData = [...prev];
      newData[idx] = {
        ...newData[idx],
        score: value,
        status: getBadgeStatus(value)
      };
      return newData;
    });

    try {
      await updatePlayer({
        id: "current-player",
        data: { [`coefficients.${attrName}`]: value }
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInfoChange = async (field: string, value: any) => {
    setPlayerInfo((prev) => ({ ...prev, [field]: value }));
    try {
      await updatePlayer({
        id: "current-player",
        data: { [field]: value }
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" text-white p-8">
      <div className="container mt-10">
        <h1 className="text-3xl font-bold flex items-center justify-center font-heading text-white text-center lg:text-left">
          POSITIONAL CO-EFFICIENTS
        </h1>
      </div>
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* Left Section - Player Card */}
        <div className="lg:col-span-1  bg-cardBg h-fit rounded-xl overflow-hidden">
          <div className=" overflow-hidden">
            {/* Player Image */}
            <div className="aspect-square bg-gradient-to-b from-[#2df168] to-[#39493b] flex items-center justify-center">
              <Image
                src={playerImage}
                alt="Player"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Performance Rating */}
            <div className="flex justify-center -mt-16 relative z-10">
              <div className="w-32 h-32 rounded-full bg-[#2a2a2a] border-4 border-primary flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white font-heading">
                    {overallRating}
                  </div>
                </div>
              </div>
            </div>

            {/* Player Info */}
            <div className="text-center p-6 space-y-3">
              <CMSField
                value={playerInfo.name}
                onUpdate={(val) => handleInfoChange("name", val)}
                canEdit={editable}
                className="text-2xl font-bold justify-center"
                inputClassName="text-center"
              />
              <div className="flex items-center justify-center gap-2">
                <CMSField
                  value={playerInfo.country}
                  onUpdate={(val) => handleInfoChange("country", val)}
                  canEdit={editable}
                  className="text-base text-gray-300"
                  inputClassName="text-center"
                />
                <span className="text-xl">
                  <Image className="w-10" src={flag} alt="flag" />
                </span>
              </div>
              <CMSField
                value={playerInfo.position}
                onUpdate={(val) => handleInfoChange("position", val)}
                canEdit={editable}
                className="text-sm text-gray-400 justify-center"
                inputClassName="text-center"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Positional Co-Efficients */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="space-y-4">
              {attrData.map((attr, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-[#1a1a1a] border border-border rounded-lg"
                >
                  {/* Attribute Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">{attr.name}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1 min-w-0 max-w-xs">
                    {editable ? (
                      <input
                        type="range"
                        value={attr.score}
                        onChange={(e) =>
                          handleUpdate(idx, parseInt(e.target.value))
                        }
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    ) : (
                      <Progress
                        value={attr.score}
                        className="h-2 bg-[#2a2a2a]"
                      />
                    )}
                  </div>

                  {/* Score */}
                  <div className="w-12 text-right">
                    <span className="text-base font-semibold text-white">
                      {attr.score}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="w-24">
                    <Badge
                      className={`${getBadgeVariant(attr.status)} border text-xs font-semibold justify-center w-full`}
                    >
                      {attr.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
