export interface MatchStats {
  id: number;
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
  rating: number;
  scoutName: string;
  gameType: string;
  weather: string;
  temperature: string;
  playerPosition: string;
  foot: string;
  characteristics: string[];
  weight: string;
  height: string;
  status: "Paid" | "Pending";
  amount: string;
}

export let SHARED_REPORTS_DATA: MatchStats[] = [
  {
    id: 1,
    date: "2024-01-15",
    league: "Friendly League",
    team1: "FC Barcelona",
    team2: "Chelsea U19",
    score: "2-1",
    result: "W",
    stadium: "London",
    goals: 1,
    assists: 1,
    passes: 87,
    timePlayedMinutes: 90,
    yellowCards: 1,
    redCards: 0,
    passAccuracy: 94,
    rating: 8.5,
    scoutName: "Mario Lopez",
    gameType: "Competitive",
    weather: "Rainy",
    temperature: "19",
    playerPosition: "Goalkeeper",
    foot: "Right",
    characteristics: ["Fast", "Skillful", "Finisher"],
    weight: "45kg",
    height: "1.20m",
    status: "Paid",
    amount: "$ 6.99"
  },
  {
    id: 2,
    date: "2024-02-01",
    league: "Junior Cup",
    team1: "FC Barcelona",
    team2: "Arsenal U19",
    score: "1-1",
    result: "D",
    stadium: "Madrid",
    goals: 0,
    assists: 1,
    passes: 76,
    timePlayedMinutes: 90,
    yellowCards: 0,
    redCards: 0,
    passAccuracy: 91,
    rating: 7.8,
    scoutName: "John Doe",
    gameType: "Friendly",
    weather: "Sunny",
    temperature: "24",
    playerPosition: "Goalkeeper",
    foot: "Right",
    characteristics: ["Agile", "Strong"],
    weight: "48kg",
    height: "1.25m",
    status: "Paid",
    amount: "$ 6.99"
  },
  {
    id: 3,
    date: "2023-12-01",
    league: "Elite Youth League",
    team1: "FC Barcelona",
    team2: "Liverpool U19",
    score: "TBD",
    result: "D",
    stadium: "Liverpool",
    goals: 0,
    assists: 0,
    passes: 0,
    timePlayedMinutes: 0,
    yellowCards: 0,
    redCards: 0,
    passAccuracy: 0,
    rating: 0.0,
    scoutName: "Pending Analysis",
    gameType: "Competitive",
    weather: "Cloudy",
    temperature: "12",
    playerPosition: "Goalkeeper",
    foot: "Right",
    characteristics: [],
    weight: "45kg",
    height: "1.20m",
    status: "Pending",
    amount: "$ 6.99"
  },
  {
    id: 4,
    date: "2024-03-10",
    league: "Friendly League",
    team1: "FC Barcelona",
    team2: "City U19",
    score: "3-0",
    result: "W",
    stadium: "Manchester",
    goals: 1,
    assists: 2,
    passes: 92,
    timePlayedMinutes: 90,
    yellowCards: 0,
    redCards: 0,
    passAccuracy: 95,
    rating: 8.2,
    scoutName: "Mario Lopez",
    gameType: "Friendly",
    weather: "Sunny",
    temperature: "18",
    playerPosition: "Goalkeeper",
    foot: "Right",
    characteristics: ["Fast", "Skillful"],
    weight: "45kg",
    height: "1.20m",
    status: "Paid",
    amount: "$ 6.99"
  },
  {
    id: 5,
    date: "2024-04-05",
    league: "Elite Youth League",
    team1: "FC Barcelona",
    team2: "Real Madrid U19",
    score: "2-0",
    result: "W",
    stadium: "Barcelona",
    goals: 1,
    assists: 0,
    passes: 80,
    timePlayedMinutes: 90,
    yellowCards: 1,
    redCards: 0,
    passAccuracy: 88,
    rating: 7.9,
    scoutName: "Diego Silva",
    gameType: "Competitive",
    weather: "Windy",
    temperature: "17",
    playerPosition: "Goalkeeper",
    foot: "Right",
    characteristics: ["Agile", "Fast"],
    weight: "46kg",
    height: "1.22m",
    status: "Paid",
    amount: "$ 6.99"
  },
  {
    id: 6,
    date: "2024-04-20",
    league: "Junior Cup",
    team1: "FC Barcelona",
    team2: "PSG U19",
    score: "1-2",
    result: "L",
    stadium: "Paris",
    goals: 0,
    assists: 0,
    passes: 84,
    timePlayedMinutes: 90,
    yellowCards: 0,
    redCards: 0,
    passAccuracy: 92,
    rating: 6.8,
    scoutName: "Jean Dupont",
    gameType: "Competitive",
    weather: "Rainy",
    temperature: "14",
    playerPosition: "Goalkeeper",
    foot: "Right",
    characteristics: ["Positioning"],
    weight: "46kg",
    height: "1.22m",
    status: "Paid",
    amount: "$ 6.99"
  }
];

export const addReport = (report: MatchStats) => {
  SHARED_REPORTS_DATA = [report, ...SHARED_REPORTS_DATA];
};
