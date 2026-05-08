import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import badge1 from "@/assets/cvs-page/id/badge-image1.png";
import badge2 from "@/assets/cvs-page/id/badge-image2.png";
import badge3 from "@/assets/cvs-page/id/badge-image3.png";
import flagFr from "@/assets/cvs-page/id/flag-fr.png";
import flagIt from "@/assets/cvs-page/id/flag-itally.png";
import flagImage from "@/assets/cvs-page/id/flag.png";
import leftLeg from "@/assets/cvs-page/id/left-leg-image.png";
import right from "@/assets/cvs-page/id/right-legt-image.png";
import playerImage from "@/assets/cvs-page/id/player-image.png";
import trofeeIcon from "@/assets/cvs-page/id/trofeeIcon.png";

export interface PlayerData {
  fullName: string;
  dob: string;
  age: string;
  birthCountry: string;
  birthCountryFlag: any;
  dualNationality: string;
  dualNationalityFlag: any;
  email: string;
  phone: string;
  location: string;
  website: string;
  height: string;
  weight: string;
  leftLegUsage: number;
  rightLegUsage: number;
  leftLegImage: any;
  rightLegImage: any;
  languages: { name: string; level: string; color: string }[];
  rating: number;
  playerImage: any;
  strengths: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  performanceMetrics: {
    passAccuracy: number;
    shootAccuracy: number;
    dribbleSuccess: number;
    tackleSuccess: number;
  };
  marketValue: string;
  marketTrend: string;
  transferStatus: string;
  contractUntil: string;
  agent: string;
  agency: string;
  mainFlag: any;
  position: string;
  selectedStyleIds: string[];
  careerHighlights: {
    year: string;
    title: string;
    club: string;
    icon: any;
  }[];
  seasonStats: {
    matches: number;
    goals: number;
    assists: number;
    avgRating: number;
  };
}

const initialState: PlayerData = {
  fullName: "Marcus Silva",
  dob: "15/03/1996",
  age: "24",
  birthCountry: "France",
  birthCountryFlag: flagFr,
  dualNationality: "Italy",
  dualNationalityFlag: flagIt,
  email: "marcus.silva@email.com",
  phone: "+351 912 345 678",
  location: "France",
  website: "www.k10football.com",
  height: "1.82",
  weight: "76",
  leftLegUsage: 31,
  rightLegUsage: 87,
  leftLegImage: leftLeg,
  rightLegImage: right,
  languages: [
    { name: "Portuguese", level: "NATIVE", color: "text-primary" },
    { name: "English", level: "FLUENT", color: "text-yellow" },
    { name: "Spanish", level: "INTERMEDIATE", color: "text-orange" },
  ],
  rating: 94,
  playerImage: playerImage,
  strengths: {
    pace: 82,
    shooting: 84,
    passing: 89,
    dribbling: 85,
    defending: 78,
    physical: 70,
  },
  performanceMetrics: {
    passAccuracy: 92,
    shootAccuracy: 78,
    dribbleSuccess: 85,
    tackleSuccess: 72,
  },
  marketValue: "45M",
  marketTrend: "5 Mln last season",
  transferStatus: "Active",
  contractUntil: "June, 2026",
  agent: "John Morrison",
  agency: "Elite Sports Mgmt",
  mainFlag: flagImage,
  position: "Defensive Midfielder",
  selectedStyleIds: ["technical", "finesse-shot", "incisive-pass"],
  careerHighlights: [
    {
      year: "2019",
      title: "BRAZILIAN CHAMPIONSHIP",
      club: "FLAMENGO",
      icon: trofeeIcon,
    },
    {
      year: "2010",
      title: "CAMPEONATA - PAULISTA",
      club: "CORINTHIANS",
      icon: trofeeIcon,
    },
    {
      year: "2015",
      title: "BRAZILIAN CHAMPIONSHIP",
      club: "FLAMENGO FC",
      icon: trofeeIcon,
    },
    {
      year: "2014",
      title: "PAULISTA CUP",
      club: "SAO PAULO FC",
      icon: trofeeIcon,
    },
    {
      year: "2017/2020",
      title: "CAMPEONATO CARIOCA",
      club: "VASCO FC",
      icon: trofeeIcon,
    },
  ],
  seasonStats: {
    matches: 28,
    goals: 8,
    assists: 16,
    avgRating: 8.4,
  },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerData: (state, action: PayloadAction<Partial<PlayerData>>) => {
      return { ...state, ...action.payload };
    },
    updatePlayerField: (state, action: PayloadAction<{ field: string; value: any }>) => {
      const { field, value } = action.payload;
      const keys = field.split(".");
      if (keys.length === 1) {
        (state as any)[field] = value;
      } else {
        let current = state as any;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      }
    },
  },
});

export const { setPlayerData, updatePlayerField } = playerSlice.actions;

export default playerSlice.reducer;
