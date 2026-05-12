/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { useUpdatePlayerProfileMutation } from "@/lib/features/cv/cvApi";
import { CMSField } from "@/components/shared/CMSField";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { SHARED_REPORTS_DATA, MatchStats } from "@/lib/constants/reports";

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
  const matches = SHARED_REPORTS_DATA.filter(m => m.status === "Paid").slice(0, 4);

  const wins = matches.filter((m) => m.result === "W").length;
  const draws = matches.filter((m) => m.result === "D").length;
  const losses = matches.filter((m) => m.result === "L").length;
  const totalGoals = matches.reduce((sum, m) => sum + m.goals, 0);
  const totalAssists = matches.reduce((sum, m) => sum + m.assists, 0);
  
  const avgRating = matches.length > 0 
    ? (matches.reduce((sum, m) => sum + m.rating, 0) / matches.length).toFixed(1)
    : "0.0";

  const avgPassAccuracy = matches.length > 0
    ? Math.round(matches.reduce((sum, m) => sum + m.passAccuracy, 0) / matches.length)
    : 0;

  const avgTackles = (2.4).toFixed(1);
  const avgInterceptions = (2.4).toFixed(1);

  return (
    <div className="container ">
      <h1 className="mb-8 text-center text-3xl font-bold text-white font-heading">
        GAME SUMMARY (LAST 4 MATCHES)
      </h1>

      <div className="space-y-6">
        {/* Overall stats cards */}
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <Card className="border-0 bg-gradient-to-br from-[#1B4D2E] to-[#0F3B1F] p-6 text-white rounded-lg">
            <div className="mb-4 text-sm font-semibold text-[#00FF62]">Overall Performance</div>
            <div className="mb-4">
              <div className="text-xs text-gray-300">Average Rating</div>
              <div className="text-3xl font-bold text-[#00FF62]">{avgRating}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-300">Total Goals</div>
                <div className="text-2xl font-bold text-white">{totalGoals}</div>
              </div>
              <div>
                <div className="text-xs text-gray-300">Total Assists</div>
                <div className="text-2xl font-bold text-white">{totalAssists}</div>
              </div>
            </div>
          </Card>

          <Card className="border border-border bg-black p-6 text-white rounded-lg">
            <div className="mb-4 text-sm font-semibold text-gray-300">Form Guide</div>
            <div className="mb-4 flex gap-2">
              {matches.map((match, idx) => (
                <Badge key={idx} className={`h-8 w-8 flex items-center justify-center p-0 rounded-full font-bold ${getResultColor(match.result)}`}>
                  {getResultText(match.result)}
                </Badge>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-300">Wins</span><span className="font-semibold">{wins}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Draws</span><span className="font-semibold">{draws}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Losses</span><span className="font-semibold">{losses}</span></div>
            </div>
          </Card>

          <Card className="border border-border bg-black p-6 text-white rounded-lg">
            <div className="mb-4 text-sm font-semibold text-gray-300">Key Stats</div>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-300">Average Pass Accuracy</span>
                  <span className="text-[#00FF62] font-semibold">{avgPassAccuracy}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded overflow-hidden">
                  <div className="h-full bg-[#00FF62]" style={{ width: `${avgPassAccuracy}%` }} />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-300">Average Tackles</span>
                  <span className="text-[#00FF62] font-semibold">{avgTackles}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded overflow-hidden">
                  <div className="h-full bg-[#00FF62]" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Game Reports */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {matches.map((match, idx) => (
            <Card
              key={idx}
              className="border border-border bg-black p-6 text-white rounded-lg"
            >
              {/* Header Row */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{match.date}</span>
                  </div>
                  <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700">
                    {match.league}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#00FF62]">{match.rating}</div>
                  <div className="text-xs text-gray-400 font-medium">Rating</div>
                </div>
              </div>

              {/* Teams and Score */}
              <div className="mb-4 flex items-center justify-start">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold">{match.team1}</div>
                </div>
                <div className="mx-4 text-center bg-cardBg p-3 px-5 rounded-lg -mt-8">
                  <div className="text-xl font-bold">{match.score}</div>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <div className="text-sm font-semibold">{match.team2}</div>
                  <Badge className={cn(getResultColor(match.result), "font-bold")}>
                    {getResultText(match.result)}
                  </Badge>
                </div>
              </div>

              {/* Stadium */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPinIcon className="h-4 w-4" />
                <span>{match.stadium}</span>
              </div>

              {/* Stats Grid */}
              <div className="mb-4 grid grid-cols-4 gap-4 border-t border-b border-border py-4 mt-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{match.goals}</div>
                  <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{match.assists}</div>
                  <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Assists</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{match.passes}</div>
                  <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Passes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{match.timePlayedMinutes}</div>
                  <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Time Played</div>
                </div>
              </div>

              {/* Cards and Accuracy */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="h-6 w-4 bg-[#FFCC00] rounded-sm shadow-sm" />
                    </div>
                    <div className="text-xs text-center font-bold">{match.yellowCards}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="h-6 w-4 bg-[#DC143C] rounded-sm shadow-sm" />
                    </div>
                    <div className="text-xs text-center font-bold">{match.redCards}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">
                    {match.passAccuracy}%
                  </div>
                  <div className="text-xs text-gray-400 font-medium">Pass Accuracy</div>
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
