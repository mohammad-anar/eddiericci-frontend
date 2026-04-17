"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";

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
  },
  {
    date: "2023-10-16",
    league: "La Liga",
    team1: "Villarreal CF",
    team2: "FC Barcelona",
    score: "3-0",
    result: "L",
    stadium: "Camp Nou",
    goals: 0,
    assists: 1,
    passes: 82,
    timePlayedMinutes: 52,
    yellowCards: 0,
    redCards: 1,
    passAccuracy: 82,
    rating: "8.3",
  },
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

const getResultText = (result: "W" | "D" | "L") => {
  switch (result) {
    case "W":
      return "W";
    case "D":
      return "D";
    case "L":
      return "L";
  }
};

export default function SportsAnalycies() {
  const wins = matchesData.filter((m) => m.result === "W").length;
  const draws = matchesData.filter((m) => m.result === "D").length;
  const losses = matchesData.filter((m) => m.result === "L").length;
  const totalGoals = matchesData.reduce((sum, m) => sum + m.goals, 0);
  const totalAssists = matchesData.reduce((sum, m) => sum + m.assists, 0);
  const avgRating = (
    matchesData.reduce((sum, m) => sum + parseFloat(m.rating), 0) /
    matchesData.length
  ).toFixed(1);

  const avgPassAccuracy = Math.round(
    matchesData.reduce((sum, m) => sum + m.passAccuracy, 0) /
      matchesData.length,
  );
  const avgTackles = (2.4).toFixed(1);
  const avgInterceptions = (2.4).toFixed(1);

  return (
    <div className="container ">
      <h1 className="mb-8 text-center text-3xl font-bold text-white font-heading">
        GAME SUMMARY (LAST 5 MATCHES)
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Match Cards */}
        <div className="lg:col-span-2 space-y-4">
          {matchesData.map((match, idx) => (
            <Card
              key={idx}
              className="border border-gray-600 bg-black p-6 text-white rounded-lg"
            >
              {/* Header Row */}
              <div className="mb-4 flex items-center justify-between ">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">{match.date}</span>
                  </div>
                  <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700">
                    {match.league}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#00FF62]">
                    {match.rating}
                  </div>
                  <div className="text-xs text-gray-400">Rating</div>
                </div>
              </div>

              {/* Teams and Score */}
              <div className="mb-4 flex items-center justify-start">
                <div className="flex items-center gap-3 ">
                  <div className="text-sm">
                    <div className="font-semibold">{match.team1}</div>
                  </div>
                </div>
                <div className="mx-4 text-center bg-slate-300/10 p-3 px-5 rounded-lg -mt-8">
                  <div className="text-xl font-bold">{match.score}</div>
                </div>
                <div className="flex items-center gap-3  justify-end">
                  
                  <div className="text-sm text-right">
                    <div className="font-semibold">{match.team2}</div>
                  </div>
                  <Badge
                    className={`${getResultColor(match.result)} font-bold`}
                  >
                    {getResultText(match.result)}
                  </Badge>
                </div>
              </div>

              {/* Stadium */}
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-400">
                <MapPinIcon className="h-4 w-4" />
                <span>{match.stadium}</span>
              </div>

              {/* Stats Grid */}
              <div className="mb-4 grid grid-cols-4 gap-4 border-t border-b border-gray-600 py-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">
                    {match.goals}
                  </div>
                  <div className="text-xs text-gray-400">Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">
                    {match.assists}
                  </div>
                  <div className="text-xs text-gray-400">Assists</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">
                    {match.passes}
                  </div>
                  <div className="text-xs text-gray-400">Passes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">
                    {match.timePlayedMinutes}
                  </div>
                  <div className="text-xs text-gray-400">Time Played</div>
                </div>
              </div>

              {/* Cards and Accuracy */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {
                    <div>
                      <div className="flex items-center gap-1">
                        <div className="h-6 w-4 bg-[#FFCC00]" />
                      </div>
                      <span>{match.yellowCards}</span>
                    </div>
                  }
                  {
                    <div>
                      <div className="flex items-center gap-1">
                        <div className="h-6 w-4 bg-[#DC143C]" />
                      </div>
                      <span>{match.redCards}</span>
                    </div>
                  }
                </div>
                <div className="text-right text-sm">
                  <div className="font-semibold text-white">
                    {match.passAccuracy}%
                  </div>
                  <div className="text-xs text-gray-400">Pass Accuracy</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Right Column - Performance Cards */}
        <div className="space-y-4">
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
          <Card className="border border-gray-600 bg-black p-6 text-white rounded-lg">
            <div className="mb-4 text-sm font-semibold text-gray-300">
              Form Guide
            </div>
            <div className="mb-4 flex gap-2">
              {matchesData.map((match, idx) => (
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
          <Card className="border border-gray-600 bg-black p-6 text-white rounded-lg">
            <div className="mb-4 text-sm font-semibold text-gray-300">
              Key Stats
            </div>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-300">Average Pass Accuracy</span>
                  <span className="text-[#00FF62] font-semibold">
                    {avgPassAccuracy}
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
      </div>
    </div>
  );
}
