"use client";
import Image from "next/image";
import playerImage from "@/assets/cvs-page/id/player-image.png";
import flagImage from "@/assets/cvs-page/id/flag.png";
import badge1 from "@/assets/cvs-page/id/badge-image1.png";
import badge2 from "@/assets/cvs-page/id/badge-image2.png";
import badge3 from "@/assets/cvs-page/id/badge-image3.png";
import { Button } from "@/components/ui/button";
import { IconShare } from "@tabler/icons-react";
import leftLeg from "@/assets/cvs-page/id/left-leg-image.png";
import right from "@/assets/cvs-page/id/right-legt-image.png";
import positionMap from "@/assets/cvs-page/id/positionmap.png";
import trofeeIcon from "@/assets/cvs-page/id/trofeeIcon.png";
import flagFr from "@/assets/cvs-page/id/flag-fr.png";
import flagIt from "@/assets/cvs-page/id/flag-itally.png";
import { useState, useEffect } from "react";
import { usePlayerStats } from "./FullEditablePage";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const ALL_STYLES = [
  { id: "technical", label: "Technical" },
  { id: "finesse-shot", label: "Finesse Shot" },
  { id: "incisive-pass", label: "Incisive Pass" },
  { id: "long-ball", label: "Long Ball Specialist" },
  { id: "speedster", label: "Speedster" },
  { id: "power-header", label: "Power Header" },
  { id: "interceptor", label: "Interceptor" },
  { id: "block", label: "Block Specialist" },
  { id: "clinical-finisher", label: "Clinical Finisher" },
  { id: "dribbling", label: "Dribbling Wizard" },
  { id: "set-piece", label: "Set Piece Specialist" },
  { id: "playmaker", label: "Playmaker" },
];

const PlayerBioSection = ({ editable = true }: { editable?: boolean }) => {
  const [playerData, setPlayerData] = useState({
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
  });

  const { setBioRating } = usePlayerStats();

  useEffect(() => {
    setBioRating(playerData.rating);
  }, [playerData.rating, setBioRating]);

  const [isPositionMap, setIsPositionMap] = useState(true);

  const handleUpdate = (field: string, value: any) => {
    setPlayerData((prev) => {
      const keys = field.split(".");
      if (keys.length === 1) return { ...prev, [field]: value };

      const newState = { ...prev };
      let current: any = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const toggleStyle = (id: string) => {
    const currentStyles = playerData.selectedStyleIds;
    if (currentStyles.includes(id)) {
      handleUpdate(
        "selectedStyleIds",
        currentStyles.filter((styleId) => styleId !== id)
      );
    } else if (currentStyles.length < 5) {
      handleUpdate("selectedStyleIds", [...currentStyles, id]);
    }
  };

  const orderedSelectedStyles = playerData.selectedStyleIds.map(
    (id) => ALL_STYLES.find((s) => s.id === id)!
  );

  const styleBadges = [badge1, badge2, badge3];
  return (
    <>
      <div className="container">
        <div className="py-5 flex items-center justify-end">
          <Button className="bg-gray-500/20">
            Share <IconShare />
          </Button>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="col-span-3 h-fit space-y-6 bg-cardBg">
            <div className=" p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Personal Information
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Full Name</span>
                  {editable ? (
                    <Input
                      value={playerData.fullName}
                      onChange={(e) => handleUpdate("fullName", e.target.value)}
                      className="h-7 text-xs w-32"
                    />
                  ) : (
                    <span>{playerData.fullName}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Date of Birth</span>
                  {editable ? (
                    <Input
                      value={playerData.dob}
                      onChange={(e) => handleUpdate("dob", e.target.value)}
                      className="h-7 text-xs w-32"
                    />
                  ) : (
                    <span>{playerData.dob}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Age</span>
                  {editable ? (
                    <Input
                      value={playerData.age}
                      onChange={(e) => handleUpdate("age", e.target.value)}
                      className="h-7 text-xs w-32"
                    />
                  ) : (
                    <span>{playerData.age} years</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Birth Country</span>
                  <div className="flex items-center gap-2">
                    {editable ? (
                      <Input
                        value={playerData.birthCountry}
                        onChange={(e) =>
                          handleUpdate("birthCountry", e.target.value)
                        }
                        className="h-7 text-xs w-20"
                      />
                    ) : (
                      <span>{playerData.birthCountry}</span>
                    )}
                    <div className="relative w-5 h-4">
                      <Image
                        src={playerData.birthCountryFlag}
                        alt="birth country flag"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Dual Nationality</span>
                  <div className="flex items-center gap-2">
                    {editable ? (
                      <Input
                        value={playerData.dualNationality}
                        onChange={(e) =>
                          handleUpdate("dualNationality", e.target.value)
                        }
                        className="h-7 text-xs w-20"
                      />
                    ) : (
                      <span>{playerData.dualNationality}</span>
                    )}
                    <div className="relative w-5 h-4">
                      <Image
                        src={playerData.dualNationalityFlag}
                        alt="dual nationality flag"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Contact
              </h2>
              <div className="space-y-2 text-sm text-primary">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  {editable ? (
                    <Input
                      value={playerData.email}
                      onChange={(e) => handleUpdate("email", e.target.value)}
                      className="h-7 text-xs bg-transparent border-primary/30"
                    />
                  ) : (
                    <span>{playerData.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  {editable ? (
                    <Input
                      value={playerData.phone}
                      onChange={(e) => handleUpdate("phone", e.target.value)}
                      className="h-7 text-xs bg-transparent border-primary/30"
                    />
                  ) : (
                    <span>{playerData.phone}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  {editable ? (
                    <Input
                      value={playerData.location}
                      onChange={(e) => handleUpdate("location", e.target.value)}
                      className="h-7 text-xs bg-transparent border-primary/30"
                    />
                  ) : (
                    <span>{playerData.location}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  {editable ? (
                    <Input
                      value={playerData.website}
                      onChange={(e) => handleUpdate("website", e.target.value)}
                      className="h-7 text-xs bg-transparent border-primary/30"
                    />
                  ) : (
                    <span>{playerData.website}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Physical Stats
              </h2>
              <div className="flex justify-around text-center mb-6">
                <div>
                  {editable ? (
                    <Input
                      type="number"
                      step="0.01"
                      value={playerData.height}
                      onChange={(e) => handleUpdate("height", e.target.value)}
                      className="h-8 text-center font-bold text-primary w-16 mb-1"
                    />
                  ) : (
                    <div className="text-2xl font-bold text-primary">
                      {playerData.height}
                    </div>
                  )}
                  <div className="text-xs text-gray-400">HEIGHT (m)</div>
                </div>
                <div>
                  {editable ? (
                    <Input
                      type="number"
                      value={playerData.weight}
                      onChange={(e) => handleUpdate("weight", e.target.value)}
                      className="h-8 text-center font-bold text-primary w-16 mb-1"
                    />
                  ) : (
                    <div className="text-2xl font-bold text-primary">
                      {playerData.weight}
                    </div>
                  )}
                  <div className="text-xs text-gray-400">WEIGHT (kg)</div>
                </div>
              </div>

              <div className=" grid grid-cols-2 gap-6">
                <div className="border-2 bg-gray-600/30 p-3 rounded-xl">
                  <div className="relative w-full h-16 mb-2">
                    <Image
                      src={playerData.leftLegImage}
                      alt="left leg"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Left</span>
                    <span className="text-primary">
                      {playerData.leftLegUsage}%
                    </span>
                  </div>
                  {editable ? (
                    <input
                      type="range"
                      value={playerData.leftLegUsage}
                      onChange={(e) =>
                        handleUpdate("leftLegUsage", parseInt(e.target.value))
                      }
                      className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  ) : (
                    <Progress value={playerData.leftLegUsage} />
                  )}
                </div>
                <div className="border-2 bg-gray-600/30 p-3 rounded-xl">
                  <div className="relative w-full h-16 mb-2">
                    <Image
                      src={playerData.rightLegImage}
                      alt="right leg"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Right</span>
                    <span className="text-primary">
                      {playerData.rightLegUsage}%
                    </span>
                  </div>
                  {editable ? (
                    <input
                      type="range"
                      value={playerData.rightLegUsage}
                      onChange={(e) =>
                        handleUpdate("rightLegUsage", parseInt(e.target.value))
                      }
                      className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  ) : (
                    <Progress value={playerData.rightLegUsage} />
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Languages
              </h2>
              <div className="space-y-2 text-sm">
                {playerData.languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    {editable ? (
                      <Input
                        value={lang.name}
                        onChange={(e) => {
                          const newLangs = [...playerData.languages];
                          newLangs[idx].name = e.target.value;
                          handleUpdate("languages", newLangs);
                        }}
                        className="h-7 text-xs w-24 bg-transparent"
                      />
                    ) : (
                      <span>{lang.name}</span>
                    )}
                    {editable ? (
                      <Input
                        value={lang.level}
                        onChange={(e) => {
                          const newLangs = [...playerData.languages];
                          newLangs[idx].level = e.target.value;
                          handleUpdate("languages", newLangs);
                        }}
                        className="h-7 text-xs w-24 bg-transparent text-right"
                      />
                    ) : (
                      <span className={`${lang.color} text-xs`}>
                        {lang.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Position Map */}
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setIsPositionMap(true)}
                  className={`${isPositionMap ? "px-3 py-1 bg-primary text-black text-xs text-center font-heading font-normal rounded" : "px-3 py-1 border border-border text-xs rounded hover:bg-gray-900"}`}
                >
                  Position Map
                </button>

                <button
                  onClick={() => setIsPositionMap(false)}
                  className={`${!isPositionMap ? "px-3 py-1 bg-primary text-black text-xs text-center font-heading font-normal rounded" : "px-3 py-1 border border-border text-xs rounded hover:bg-gray-900"}`}
                >
                  Futsal Map
                </button>
              </div>
              <Image src={positionMap} alt="position map" />
            </div>
          </div>

          {/* CENTER COLUMN - PLAYER IMAGE */}
          <div className="col-span-6 flex flex-col items-center">
            {/* Player Name */}
            <div className="text-center mb-8">
              <div className="flex items-center mb-8 justify-center gap-2">
                <div className="relative w-28 h-20">
                  <Image
                    src={playerData.mainFlag}
                    className="w-full h-full"
                    alt="flag"
                  />
                </div>
              </div>

              <h1 className="text-2xl font-bold font-heading mb-2 flex items-center justify-center gap-2">
                {editable ? (
                  <>
                    <Input
                      value={playerData.fullName}
                      onChange={(e) => handleUpdate("fullName", e.target.value)}
                      className="h-9 text-xl font-bold text-center w-48"
                    />
                    <span className="text-primary flex items-center">
                      [
                      <Input
                        type="number"
                        value={playerData.rating}
                        onChange={(e) =>
                          handleUpdate("rating", parseInt(e.target.value))
                        }
                        className="h-7 w-12 p-1 text-center bg-transparent border-none text-primary font-bold"
                      />
                      ]
                    </span>
                  </>
                ) : (
                  <>
                    {playerData.fullName}{" "}
                    <span className="text-primary">[{playerData.rating}]</span>
                  </>
                )}
              </h1>
            </div>

            {/* Position Selector */}
            <div className="mb-8">
              <Select
                value={playerData.position}
                onValueChange={(val) => handleUpdate("position", val)}
              >
                <SelectTrigger className="border-border px-4 py-2 rounded hover:bg-gray-900 bg-transparent text-foreground">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent className="bg-cardBg border-border text-foreground">
                  <SelectGroup className="mb-2">
                    <SelectLabel className="text-gray-400 font-bold text-xs">Goalkeepers</SelectLabel>
                    <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="mb-2">
                    <SelectLabel className="text-gray-400 font-bold text-xs">Defenders</SelectLabel>
                    <SelectItem value="Center Back">Center Back</SelectItem>
                    <SelectItem value="Right Back">Right Back</SelectItem>
                    <SelectItem value="Left Back">Left Back</SelectItem>
                    <SelectItem value="Wing Back">Wing Back</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="mb-2">
                    <SelectLabel className="text-gray-400 font-bold text-xs">Midfielders</SelectLabel>
                    <SelectItem value="Defensive Midfielder">Defensive Midfielder</SelectItem>
                    <SelectItem value="Central Midfielder">Central Midfielder</SelectItem>
                    <SelectItem value="Attacking Midfielder">Attacking Midfielder</SelectItem>
                    <SelectItem value="Right Midfielder">Right Midfielder</SelectItem>
                    <SelectItem value="Left Midfielder">Left Midfielder</SelectItem>
                  </SelectGroup>
                  <SelectGroup className="mb-2">
                    <SelectLabel className="text-gray-400 font-bold text-xs">Forwards</SelectLabel>
                    <SelectItem value="Right Winger">Right Winger</SelectItem>
                    <SelectItem value="Left Winger">Left Winger</SelectItem>
                    <SelectItem value="Center Forward">Center Forward</SelectItem>
                    <SelectItem value="Striker">Striker</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Player Image */}
            <div className="relative w-full h-[723px] mb-8">
              <Image
                src={playerData.playerImage}
                alt={playerData.fullName}
                className="object-contain w-full h-full"
                width={500}
                height={500}
              />
            </div>

            {/* Player Style Section */}
            <div className="w-full space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <h3 className="text-2xl font-bold font-heading">
                    Player Style
                  </h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-cardBg border-border text-foreground">
                      <DialogHeader>
                        <DialogTitle>Select Player Styles (Max 3)</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        {ALL_STYLES.map((style) => (
                          <div
                            key={style.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={style.id}
                              checked={playerData.selectedStyleIds.includes(
                                style.id
                              )}
                              onCheckedChange={() => toggleStyle(style.id)}
                              disabled={
                                !playerData.selectedStyleIds.includes(
                                  style.id
                                ) && playerData.selectedStyleIds.length >= 5
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
                </div>

                <div className="space-y-4">
                  {orderedSelectedStyles.map((style, index) => (
                    <div key={style.id} className="space-y-4">
                      <div className="flex justify-center">
                        <Image
                          src={styleBadges[index >= 3 ? index - 2 : index]}
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
          <div className="col-span-3 space-y-6 bg-cardBg">
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Strength
              </h2>
              <div className="space-y-2 text-sm">
                {Object.entries(playerData.strengths).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-1 capitalize">
                      <span>{key}</span>
                      <span className="text-primary">{value}</span>
                    </div>
                    {editable ? (
                      <input
                        type="range"
                        value={value}
                        onChange={(e) =>
                          handleUpdate(
                            `strengths.${key}`,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    ) : (
                      <Progress value={value} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Performance Metrics
              </h2>
              <div className="space-y-2 text-sm">
                {Object.entries(playerData.performanceMetrics).map(
                  ([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-1 capitalize">
                        <span>{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="text-primary">{value}%</span>
                      </div>
                      {editable ? (
                        <input
                          type="range"
                          value={value}
                          onChange={(e) =>
                            handleUpdate(
                              `performanceMetrics.${key}`,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      ) : (
                        <Progress value={value} />
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Market Value
              </h2>
              <div className="mb-4">
                {editable ? (
                  <Input
                    value={playerData.marketValue}
                    onChange={(e) =>
                      handleUpdate("marketValue", e.target.value)
                    }
                    className="h-10 text-2xl font-bold text-primary mb-1 bg-transparent"
                  />
                ) : (
                  <div className="text-3xl font-bold text-primary mb-1">
                    ${playerData.marketValue}
                  </div>
                )}
                <p className="text-xs text-gray-400">Current Market Value</p>
                {editable ? (
                  <Input
                    value={playerData.marketTrend}
                    onChange={(e) =>
                      handleUpdate("marketTrend", e.target.value)
                    }
                    className="h-7 text-xs text-primary mt-2 bg-transparent"
                  />
                ) : (
                  <p className="text-xs text-primary mt-2">
                    📈 {playerData.marketTrend}
                  </p>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-center font-heading font-normal">
                  Transfer Status
                </h2>
                <span className="text-xs bg-primary text-black px-2 py-1 rounded">
                  {playerData.transferStatus}
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Contract Until</span>
                  {editable ? (
                    <Input
                      value={playerData.contractUntil}
                      onChange={(e) =>
                        handleUpdate("contractUntil", e.target.value)
                      }
                      className="h-7 text-xs w-28 bg-transparent"
                    />
                  ) : (
                    <span>{playerData.contractUntil}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Agent</span>
                  {editable ? (
                    <Input
                      value={playerData.agent}
                      onChange={(e) => handleUpdate("agent", e.target.value)}
                      className="h-7 text-xs w-28 bg-transparent"
                    />
                  ) : (
                    <span>{playerData.agent}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Agency</span>
                  {editable ? (
                    <Input
                      value={playerData.agency}
                      onChange={(e) => handleUpdate("agency", e.target.value)}
                      className="h-7 text-xs w-28 bg-transparent"
                    />
                  ) : (
                    <span>{playerData.agency}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Career Highlights
              </h2>
              <div className="space-y-2 text-xs text-gray-300 border-l-2 border-green-600 pl-2">
                {playerData.careerHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <div className="relative w-8 h-8 mt-0.5 shrink-0">
                      <Image
                        src={highlight.icon}
                        alt="trofee"
                      />
                    </div>
                    {editable ? (
                      <div className="flex flex-col gap-1 w-full">
                        <Input
                          value={highlight.year}
                          onChange={(e) => {
                            const newHighlights = [
                              ...playerData.careerHighlights,
                            ];
                            newHighlights[idx].year = e.target.value;
                            handleUpdate("careerHighlights", newHighlights);
                          }}
                          className="h-6 text-[10px] p-1 bg-transparent"
                        />
                        <Input
                          value={highlight.title}
                          onChange={(e) => {
                            const newHighlights = [
                              ...playerData.careerHighlights,
                            ];
                            newHighlights[idx].title = e.target.value;
                            handleUpdate("careerHighlights", newHighlights);
                          }}
                          className="h-6 text-[10px] p-1 bg-transparent"
                        />
                        <Input
                          value={highlight.club}
                          onChange={(e) => {
                            const newHighlights = [
                              ...playerData.careerHighlights,
                            ];
                            newHighlights[idx].club = e.target.value;
                            handleUpdate("careerHighlights", newHighlights);
                          }}
                          className="h-6 text-[10px] p-1 bg-transparent"
                        />
                      </div>
                    ) : (
                      <span>
                        {highlight.year} - {highlight.title} - {highlight.club}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-6">
                Current Season Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  {editable ? (
                    <Input
                      type="number"
                      value={playerData.seasonStats.matches}
                      onChange={(e) =>
                        handleUpdate(
                          "seasonStats.matches",
                          parseInt(e.target.value)
                        )
                      }
                      className="h-8 text-center font-bold text-primary w-full bg-transparent"
                    />
                  ) : (
                    <div className="text-3xl font-bold text-primary">
                      {playerData.seasonStats.matches}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">MATCHES</div>
                </div>
                <div className="text-center">
                  {editable ? (
                    <Input
                      type="number"
                      value={playerData.seasonStats.goals}
                      onChange={(e) =>
                        handleUpdate(
                          "seasonStats.goals",
                          parseInt(e.target.value)
                        )
                      }
                      className="h-8 text-center font-bold text-primary w-full bg-transparent"
                    />
                  ) : (
                    <div className="text-3xl font-bold text-primary">
                      {playerData.seasonStats.goals}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">GOALS</div>
                </div>
                <div className="text-center">
                  {editable ? (
                    <Input
                      type="number"
                      value={playerData.seasonStats.assists}
                      onChange={(e) =>
                        handleUpdate(
                          "seasonStats.assists",
                          parseInt(e.target.value)
                        )
                      }
                      className="h-8 text-center font-bold text-primary w-full bg-transparent"
                    />
                  ) : (
                    <div className="text-3xl font-bold text-primary">
                      {playerData.seasonStats.assists}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">ASSISTS</div>
                </div>
                <div className="text-center">
                  {editable ? (
                    <Input
                      type="number"
                      step="0.1"
                      value={playerData.seasonStats.avgRating}
                      onChange={(e) =>
                        handleUpdate(
                          "seasonStats.avgRating",
                          parseFloat(e.target.value)
                        )
                      }
                      className="h-8 text-center font-bold text-primary w-full bg-transparent"
                    />
                  ) : (
                    <div className="text-3xl font-bold text-primary">
                      {playerData.seasonStats.avgRating}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    AVERAGE RATING
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerBioSection;
