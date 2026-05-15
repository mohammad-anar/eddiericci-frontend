import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import clubImage from "@/assets/cvs-page/club1.png";
import badge1 from "@/assets/cvs-page/id/coach-badge1.png";
import badge2 from "@/assets/cvs-page/id/coach-badge2.png";
import badge3 from "@/assets/cvs-page/id/coach-badge3.png";
import flagImage from "@/assets/cvs-page/id/coach-bio-flag.png";
import coachStyleImage from "@/assets/cvs-page/id/coach-style-image.png";
import flagFr from "@/assets/cvs-page/id/flag-fr.png";
import flagIt from "@/assets/cvs-page/id/flag-itally.png";
import trophyIcon from "@/assets/cvs-page/id/trofeeIcon.png";

export interface CoachLanguage {
  name: string;
  level: string;
  color: string;
}

export interface CoachData {
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
  keySkills: { name: string; value: number }[];
  clubs: { id: string; name: string; from: string; to: string; logo?: any }[];
  qualifications: { id: number; text: string }[];
  coachImage: any;
  mainFlag: any;
  coachType: string;
  selectedStyleIds: string[];
}

const initialState: CoachData = {
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
  coachImage: coachStyleImage,
  mainFlag: flagImage,
  cupHistory: [
    "2021 - K10 FOOTBALL LEAGUE - K10 FOOTBALL FC",
    "2019 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
    "2018 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
    "2017 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
    "2016 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
  ],
  keySkills: [
    { name: "Youth Development", value: 92 },
    { name: "Leadership", value: 88 },
    { name: "Adaptability", value: 85 },
    { name: "Constructive Feedback", value: 80 },
  ],
  clubs: [
    { id: "1", name: "Manchester City", from: "2020", to: "Present", logo: clubImage },
    { id: "2", name: "Manchester City", from: "2020", to: "Present", logo: clubImage },
    { id: "3", name: "Manchester City", from: "2020", to: "Present", logo: clubImage },
  ],
  qualifications: [
    {
      id: 1,
      text: "Strong communication skills, empathy and high expectations combine to create strong individuals and winning teams.",
    },
    {
      id: 2,
      text: "Highly skilled professional with 15 years of experience developing improvement programs for athletes of all age groups.",
    },
    {
      id: 3,
      text: "Five years of experience assistant coach at the college level",
    },
  ],
  coachType: "Head Coach",
  selectedStyleIds: ["tiki-taka", "motivator", "youth-development"],
};

export const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    setCoachData: (state, action: PayloadAction<Partial<CoachData>>) => {
      return { ...state, ...action.payload };
    },
    updateCoachField: (state, action: PayloadAction<{ field: string; value: any }>) => {
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

export const { setCoachData, updateCoachField } = coachSlice.actions;

export default coachSlice.reducer;
