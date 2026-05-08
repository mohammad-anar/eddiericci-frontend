/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { useUpdatePlayerProfileMutation } from "@/lib/features/cv/cvApi";
import { CMSField } from "@/components/shared/CMSField";
import { toast } from "sonner";

interface MatchStats {
  date: string;
  league: string;
  team1: string;
  team2: string;
  score: string;
  result: "W" | "D" | "L";
  stadium: string;
  goals: number;
  assists: number;
  passes: number;
  timePlayedMinutes: number;
  yellowCards: number;
  redCards: number;
  passAccuracy: number;
  rating: string;
}

const matchesData: MatchStats[] = [
  {
    date: "2023-11-12",
    league: "La Liga",
    team1: "FC Barcelona",
    team2: "Real Madrid",
    score: "2-1",
    result: "W",
    stadium: "Camp Nou",
    goals: 1,
    assists: 1,
    passes: 87,
    timePlayedMinutes: 45,
    yellowCards: 0,
    redCards: 0,
    passAccuracy: 94,
    rating: "9.2",
  },
  {
    date: "2023-11-05",
    league: "La Liga",
    team1: "Atletico Madrid",
    team2: "FC Barcelona",
    score: "1-1",
    result: "D",
    stadium: "Wanda Metropolitano",
    goals: 0,
    assists: 1,
    passes: 76,
    timePlayedMinutes: 45,
    yellowCards: 0,
    redCards: 0,
    passAccuracy: 91,
    rating: "7.8",
  },
  {
    date: "2023-11-28",
    league: "La Liga",
    team1: "FC Barcelona",
    team2: "Sevilla FC",
    score: "3-0",
    result: "W",
    stadium: "Camp Nou",
    goals: 1,
    assists: 2,
    passes: 92,
    timePlayedMinutes: 62,
    yellowCards: 0,
    redCards: 0,
    passAccuracy: 95,
    rating: "8.9",
  },
  {
    date: "2023-10-22",
    league: "La Liga",
    team1: "Valencia CF",
    team2: "Sevilla FC",
    score: "3-0",
    result: "W",
    stadium: "Camp Nou",
    goals: 0,
    assists: 1,
    passes: 81,
    timePlayedMinutes: 90,
    yellowCards: 0,
    redCards: 0,
    passAccuracy: 93,
    rating: "8.3",
  }
];

const getResultColor = (result: "W" | "D" | "L") => {
  switch (result) {
    case "W":
      return "bg-[#00FF62] text-black";
    case "D":
      return "bg-gray-500 text-white";
    case "L":
      return "bg-red-600 text-white";
  }
};

const getResultText = (result: "W" | "D" | "L") => result;

function SportsAnalycies({ editable = false }: { editable?: boolean }) {
  const [updatePlayer] = useUpdatePlayerProfileMutation();
  const [matches, setMatches] = useState<MatchStats[]>(matchesData);

  const wins = matches.filter((m) => m.result === "W").length;
  const draws = matches.filter((m) => m.result === "D").length;
  const losses = matches.filter((m) => m.result === "L").length;
  const totalGoals = matches.reduce((sum, m) => sum + m.goals, 0);
  const totalAssists = matches.reduce((sum, m) => sum + m.assists, 0);
  const avgRating = (
    matches.reduce((sum, m) => sum + parseFloat(m.rating), 0) /
    matches.length
  ).toFixed(1);

  const avgPassAccuracy = Math.round(
    matches.reduce((sum, m) => sum + m.passAccuracy, 0) /
    matches.length,
  );
  const avgTackles = (2.4).toFixed(1);
  const avgInterceptions = (2.4).toFixed(1);

  const handleMatchUpdate = async (matchIdx: number, field: keyof MatchStats, value: any) => {
    setMatches(prev => {
      const newMatches = [...prev];
      if (field === "goals" || field === "assists" || field === "passes" || 
          field === "timePlayedMinutes" || field === "yellowCards" || field === "redCards" || 
          field === "passAccuracy") {
        (newMatches[matchIdx] as any)[field] = parseInt(value);
      } else if (field === "rating") {
        (newMatches[matchIdx] as any)[field] = value.toString();
      } else {
        (newMatches[matchIdx] as any)[field] = value;
      }
      return newMatches;
    });

    try {
      await updatePlayer({
        id: "current-player",
        data: { [`matches.${matchIdx}.${field}`]: value }
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container ">
      <h1 className="mb-8 text-center text-3xl font-bold text-white font-heading">
        GAME SUMMARY (LAST 4 MATCHES)
      </h1>

      <div className="space-y-6">
        {/* top 2 rows */}
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {/* Overall Performance */}
          <Card className="border-0 bg-gradient-to-br from-[#1B4D2E] to-[#0F3B1F] p-6 text-white rounded-lg">
            <div className="mb-4 text-sm font-semibold text-[#00FF62]">
              Overall Performance
            </div>
            <div className="mb-4">
              <div className="text-xs text-gray-300">Average Rating</div>
              <div className="text-3xl font-bold text-[#00FF62]">
                {avgRating}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-300">Total Goals</div>
                <div className="text-2xl font-bold text-white">
                  {totalGoals}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-300">Total Assists</div>
                <div className="text-2xl font-bold text-white">
                  {totalAssists}
                </div>
              </div>
            </div>
          </Card>

          {/* Form Guide */}
          <Card className="border border-border bg-black p-6 text-white rounded-lg">
            <div className="mb-4 text-sm font-semibold text-gray-300">
              Form Guide
            </div>
            <div className="mb-4 flex gap-2">
              {matches.map((match, idx) => (
                <Badge
                  key={idx}
                  className={`h-8 w-8 flex items-center justify-center p-0 rounded-full font-bold ${getResultColor(match.result)}`}
                >
                  {getResultText(match.result)}
                </Badge>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Wins</span>
                <span className="font-semibold text-white">{wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Draws</span>
                <span className="font-semibold text-white">{draws}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Losses</span>
                <span className="font-semibold text-white">{losses}</span>
              </div>
            </div>
          </Card>

          {/* Key Stats */}
          <Card className="border border-border bg-black p-6 text-white rounded-lg">
            <div className="mb-4 text-sm font-semibold text-gray-300">
              Key Stats
            </div>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-300">Average Pass Accuracy</span>
                  <span className="text-[#00FF62] font-semibold">
                    {avgPassAccuracy}%
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded overflow-hidden">
                  <div
                    className="h-full bg-[#00FF62]"
                    style={{ width: `${avgPassAccuracy}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-300">Average Tackles</span>
                  <span className="text-[#00FF62] font-semibold">
                    {avgTackles}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded overflow-hidden">
                  <div
                    className="h-full bg-[#00FF62]"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-300">Average Interceptions</span>
                  <span className="text-[#00FF62] font-semibold">
                    {avgInterceptions}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded overflow-hidden">
                  <div
                    className="h-full bg-[#00FF62]"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
        {/* bottom row */}
        <div className="  grid grid-cols-1  xl:grid-cols-2 gap-5">
          {matches.map((match, idx) => (
            <Card
              key={idx}
              className="border border-border bg-black p-6 text-white rounded-lg"
            >
              {/* Header Row */}
              <div className="mb-4 flex items-center justify-between ">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <CMSField
                      value={match.date}
                      onUpdate={(val) => handleMatchUpdate(idx, "date", val)}
                      canEdit={editable}
                      className="text-gray-400"
                    />
                  </div>
                  <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700">
                    <CMSField
                      value={match.league}
                      onUpdate={(val) => handleMatchUpdate(idx, "league", val)}
                      canEdit={editable}
                    />
                  </Badge>
                </div>
                <div className="text-right">
                  <CMSField
                    value={match.rating}
                    onUpdate={(val) => handleMatchUpdate(idx, "rating", val)}
                    canEdit={editable}
                    className="text-lg font-bold text-[#00FF62] justify-end"
                    inputClassName="text-right w-16"
                  />
                  <div className="text-xs text-gray-400">Rating</div>
                </div>
              </div>

              {/* Teams and Score */}
              <div className="mb-4 flex items-center justify-start">
                <div className="flex items-center gap-3 ">
                  <div className="text-sm">
                    <CMSField
                      value={match.team1}
                      onUpdate={(val) => handleMatchUpdate(idx, "team1", val)}
                      canEdit={editable}
                      className="font-semibold"
                    />
                  </div>
                </div>
                <div className="mx-4 text-center bg-cardBg p-3 px-5 rounded-lg -mt-8">
                  <CMSField
                    value={match.score}
                    onUpdate={(val) => handleMatchUpdate(idx, "score", val)}
                    canEdit={editable}
                    className="text-xl font-bold"
                    inputClassName="text-center w-14"
                  />
                </div>
                <div className="flex items-center gap-3  justify-end">
                  <div className="text-sm text-right">
                    <CMSField
                      value={match.team2}
                      onUpdate={(val) => handleMatchUpdate(idx, "team2", val)}
                      canEdit={editable}
                      className="font-semibold"
                    />
                  </div>
                  <Badge
                    className={`${getResultColor(match.result)} font-bold cursor-pointer`}
                    onClick={() => {
                      if (!editable) return;
                      const next: Record<string, "W"|"D"|"L"> = { W: "D", D: "L", L: "W" };
                      handleMatchUpdate(idx, "result", next[match.result]);
                    }}
                  >
                    {getResultText(match.result)}
                  </Badge>
                </div>
              </div>

              {/* Stadium */}
              <div className=" flex items-center gap-2 text-sm text-gray-400">
                <MapPinIcon className="h-4 w-4" />
                <CMSField
                  value={match.stadium}
                  onUpdate={(val) => handleMatchUpdate(idx, "stadium", val)}
                  canEdit={editable}
                  className="text-gray-400"
                />
              </div>

              {/* Stats Grid */}
              <div className="mb-4 grid grid-cols-4 gap-4 border-t border-b border-border py-4">
                <div className="text-center">
                  <CMSField
                    value={match.goals}
                    onUpdate={(val) => handleMatchUpdate(idx, "goals", val)}
                    canEdit={editable}
                    isNumeric
                    className="text-lg font-bold text-white justify-center"
                    inputClassName="text-center w-12"
                  />
                  <div className="text-xs text-gray-400">Goals</div>
                </div>
                <div className="text-center">
                  <CMSField
                    value={match.assists}
                    onUpdate={(val) => handleMatchUpdate(idx, "assists", val)}
                    canEdit={editable}
                    isNumeric
                    className="text-lg font-bold text-white justify-center"
                    inputClassName="text-center w-12"
                  />
                  <div className="text-xs text-gray-400">Assists</div>
                </div>
                <div className="text-center">
                  <CMSField
                    value={match.passes}
                    onUpdate={(val) => handleMatchUpdate(idx, "passes", val)}
                    canEdit={editable}
                    isNumeric
                    className="text-lg font-bold text-white justify-center"
                    inputClassName="text-center w-12"
                  />
                  <div className="text-xs text-gray-400">Passes</div>
                </div>
                <div className="text-center">
                  <CMSField
                    value={match.timePlayedMinutes}
                    onUpdate={(val) => handleMatchUpdate(idx, "timePlayedMinutes", val)}
                    canEdit={editable}
                    isNumeric
                    className="text-lg font-bold text-white justify-center"
                    inputClassName="text-center w-12"
                  />
                  <div className="text-xs text-gray-400">Time Played</div>
                </div>
              </div>

              {/* Cards and Accuracy */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="h-6 w-4 bg-[#FFCC00]" />
                    </div>
                    <CMSField
                      value={match.yellowCards}
                      onUpdate={(val) => handleMatchUpdate(idx, "yellowCards", val)}
                      canEdit={editable}
                      isNumeric
                      className="text-xs justify-center"
                      inputClassName="text-center w-8"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="h-6 w-4 bg-[#DC143C]" />
                    </div>
                    <CMSField
                      value={match.redCards}
                      onUpdate={(val) => handleMatchUpdate(idx, "redCards", val)}
                      canEdit={editable}
                      isNumeric
                      className="text-xs justify-center"
                      inputClassName="text-center w-8"
                    />
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="flex items-center justify-end">
                    <CMSField
                      value={match.passAccuracy}
                      onUpdate={(val) => handleMatchUpdate(idx, "passAccuracy", val)}
                      canEdit={editable}
                      isNumeric
                      className="font-semibold text-white justify-end"
                      inputClassName="text-right w-10"
                    />
                    <span className="text-white font-semibold">%</span>
                  </div>
                  <div className="text-xs text-gray-400">Pass Accuracy</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SportsAnalycies;
