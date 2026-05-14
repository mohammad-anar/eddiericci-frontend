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
import { cn } from "@/lib/utils";
import { usePlayer } from "@/lib/hooks/usePlayer";

const COUNTRY_CODES: Record<string, string> = {
  "afghanistan": "af", "albania": "al", "algeria": "dz", "andorra": "ad", "angola": "ao",
  "antigua and barbuda": "ag", "argentina": "ar", "armenia": "am", "australia": "au",
  "austria": "at", "azerbaijan": "az", "bahamas": "bs", "bahrain": "bh", "bangladesh": "bd",
  "barbados": "bb", "belarus": "by", "belgium": "be", "belize": "bz", "benin": "bj",
  "bhutan": "bt", "bolivia": "bo", "bosnia and herzegovina": "ba", "botswana": "bw",
  "brazil": "br", "brunei": "bn", "bulgaria": "bg", "burkina faso": "bf", "burundi": "bi",
  "cambodia": "kh", "cameroon": "cm", "canada": "ca", "cape verde": "cv",
  "central african republic": "cf", "chad": "td", "chile": "cl", "china": "cn",
  "colombia": "co", "comoros": "km", "congo": "cg", "costa rica": "cr", "croatia": "hr",
  "cuba": "cu", "cyprus": "cy", "czech republic": "cz", "denmark": "dk", "djibouti": "dj",
  "dominica": "dm", "dominican republic": "do", "ecuador": "ec", "egypt": "eg",
  "el salvador": "sv", "equatorial guinea": "gq", "eritrea": "er", "estonia": "ee",
  "ethiopia": "et", "fiji": "fj", "finland": "fi", "france": "fr", "gabon": "ga",
  "gambia": "gm", "georgia": "ge", "germany": "de", "ghana": "gh", "greece": "gr",
  "grenada": "gd", "guatemala": "gt", "guinea": "gn", "guinea-bissau": "gw",
  "guyana": "gy", "haiti": "ht", "honduras": "hn", "hungary": "hu", "iceland": "is",
  "india": "in", "indonesia": "id", "iran": "ir", "iraq": "iq", "ireland": "ie",
  "israel": "il", "italy": "it", "jamaica": "jm", "japan": "jp", "jordan": "jo",
  "kazakhstan": "kz", "kenya": "ke", "kiribati": "ki", "korea, north": "kp",
  "korea, south": "kr", "kuwait": "kw", "kyrgyzstan": "kg", "laos": "la", "latvia": "lv",
  "lebanon": "lb", "lesotho": "ls", "liberia": "lr", "libya": "ly", "liechtenstein": "li",
  "lithuania": "lt", "luxembourg": "lu", "macedonia": "mk", "madagascar": "mg",
  "malawi": "mw", "malaysia": "my", "maldives": "mv", "mali": "ml", "malta": "mt",
  "marshall islands": "mh", "mauritania": "mr", "mauritius": "mu", "mexico": "mx",
  "micronesia": "fm", "moldova": "md", "monaco": "mc", "mongolia": "mn", "montenegro": "me",
  "morocco": "ma", "mozambique": "mz", "myanmar": "mm", "namibia": "na", "nauru": "nr",
  "nepal": "np", "netherlands": "nl", "new zealand": "nz", "nicaragua": "ni",
  "niger": "ne", "nigeria": "ng", "norway": "no", "oman": "om", "pakistan": "pk",
  "palau": "pw", "panama": "pa", "papua new guinea": "pg", "paraguay": "py", "peru": "pe",
  "philippines": "ph", "poland": "pl", "portugal": "pt", "qatar": "qa", "romania": "ro",
  "russia": "ru", "rwanda": "rw", "saint kitts and nevis": "kn", "saint lucia": "lc",
  "saint vincent and the grenadines": "vc", "samoa": "ws", "san marino": "sm",
  "sao tome and principe": "st", "saudi arabia": "sa", "senegal": "sn", "serbia": "rs",
  "seychelles": "sc", "sierra leone": "sl", "singapore": "sg", "slovakia": "sk",
  "slovenia": "si", "solomon islands": "sb", "somalia": "so", "south africa": "za",
  "spain": "es", "sri lanka": "lk", "sudan": "sd", "suriname": "sr", "swaziland": "sz",
  "sweden": "se", "switzerland": "ch", "syria": "sy", "taiwan": "tw", "tajikistan": "tj",
  "tanzania": "tz", "thailand": "th", "timor-leste": "tl", "togo": "tg", "tonga": "to",
  "trinidad and tobago": "tt", "tunisia": "tn", "turkey": "tr", "turkmenistan": "tm",
  "tuvalu": "tv", "uganda": "ug", "ukraine": "ua", "united arab emirates": "ae",
  "united kingdom": "gb", "united states": "us", "uruguay": "uy", "uzbekistan": "uz",
  "vanuatu": "vu", "vatican city": "va", "venezuela": "ve", "vietnam": "vn", "yemen": "ye",
  "zambia": "zm", "zimbabwe": "zw"
};

interface Attribute {
  name: string;
  score: number;
  status: "Excellent" | "Good" | "Average";
}

const getBadgeStatus = (score: number): "Excellent" | "Good" | "Average" => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Average";
};

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Excellent":
      return "bg-green-500/10 text-green-500 border-green-500/50";
    case "Good":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/50";
    case "Average":
      return "bg-red-500/10 text-red-500 border-red-500/50";
    default:
      return "bg-green-500/10 text-green-500 border-green-500/50";
  }
};

const getIndicatorColor = (val: number) => {
  if (val >= 80) return "bg-green-500";
  if (val >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

const getHexColor = (val: number) => {
  if (val >= 80) return "#22c55e";
  if (val >= 60) return "#eab308";
  return "#ef4444";
};

const getFlagUrl = (countryName: string) => {
  if (!countryName) return "";
  const code = COUNTRY_CODES[countryName.toLowerCase()];
  return code ? `https://flagcdn.com/${code}.svg` : "";
};

export default function PlayerProfile({
  editable = false,
}: {
  editable?: boolean;
}) {
  const { bioRating, skillsAvg, metricsAvg, attributesAvg, role } =
    usePlayerStats();
  const { playerData, handleUpdate: updatePlayerData } = usePlayer();
  const [updatePlayer] = useUpdatePlayerProfileMutation();

  const overallRating = Math.round(
    (bioRating + skillsAvg + metricsAvg + attributesAvg) / 4,
  );

  const attrData: Attribute[] = playerData.skillsCategories
    .flatMap(c => c.skills)
    .slice(0, 12) // Keep it to 12 as before
    .map(s => ({
      name: s.name,
      score: s.value,
      status: getBadgeStatus(s.value)
    }));

  const [editingField, setEditingField] = useState<string | null>(null);

  const handleUpdate = async (attrName: string, value: number) => {
    // Find which category this skill belongs to
    playerData.skillsCategories.forEach((cat, catIdx) => {
      const skillIdx = cat.skills.findIndex(s => s.name === attrName);
      if (skillIdx !== -1) {
        updatePlayerData(`skillsCategories.${catIdx}.skills.${skillIdx}.value`, value);
      }
    });
  };

  const handleInfoChange = async (field: string, value: any) => {
    updatePlayerData(field, value);
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
                src={playerData.playerImage || playerImage}
                alt="Player"
                width={500}
                height={500}
                className="w-full h-full object-contain"
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
                value={playerData.fullName}
                onUpdate={(val) => handleInfoChange("fullName", val)}
                canEdit={false}
                className="text-2xl font-bold justify-center"
                inputClassName="text-center"
              />
              <div className="flex items-center justify-center gap-2">
                <CMSField
                  value={playerData.birthCountry}
                  onUpdate={(val) => handleInfoChange("birthCountry", val)}
                  canEdit={false}
                  className="text-base text-gray-300"
                  inputClassName="text-center"
                />
                <div className="flex items-center gap-1.5 ml-1">
                  {getFlagUrl(playerData.birthCountry) && (
                    <Image
                      src={getFlagUrl(playerData.birthCountry)}
                      alt="birth country flag"
                      width={32}
                      height={20}
                      className="w-6 h-4 object-cover rounded-sm shadow-sm"
                    />
                  )}
                  {playerData.dualNationality && getFlagUrl(playerData.dualNationality) && (
                    <Image
                      src={getFlagUrl(playerData.dualNationality)}
                      alt="dual nationality flag"
                      width={32}
                      height={20}
                      className="w-6 h-4 object-cover rounded-sm shadow-sm"
                    />
                  )}
                </div>
              </div>
              <CMSField
                value={playerData.position}
                onUpdate={(val) => handleInfoChange("position", val)}
                canEdit={false}
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

                  {/* Progress Bar / Slider */}
                  <div className="flex-1 min-w-0 max-w-xs transition-all duration-300">
                    {editable ? (
                      <div className="relative flex items-center h-2 group">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={attr.score}
                          onChange={(e) =>
                            handleUpdate(attr.name, parseInt(e.target.value))
                          }
                          style={{
                            background: `linear-gradient(to right, ${getHexColor(attr.score)} ${attr.score}%, #333 ${attr.score}%)`,
                          }}
                          className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100"
                        />
                        <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden relative">
                          <div
                            className={cn("h-full transition-all duration-300 ease-out", getIndicatorColor(attr.score))}
                            style={{ width: `${attr.score}%` }}
                          />
                        </div>
                        {/* Always show range input but overlay it */}
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={attr.score}
                          onChange={(e) =>
                            handleUpdate(attr.name, parseInt(e.target.value))
                          }
                          className="w-full h-6 opacity-0 cursor-pointer absolute inset-0 z-20"
                        />
                      </div>
                    ) : (
                      <Progress
                        value={attr.score}
                        className="h-1.5"
                        style={{ backgroundColor: '#333' }}
                        indicatorClassName={getIndicatorColor(attr.score)}
                      />
                    )}
                  </div>

                  {/* Score */}
                  <div className="shrink-0 text-right min-w-[4rem] transition-all duration-300">
                    <CMSField
                      value={attr.score}
                      onUpdate={(val) => handleUpdate(attr.name, parseInt(String(val)))}
                      canEdit={editable}
                      type="number"
                      editTrigger="doubleClick"
                      className="text-base font-semibold justify-end"
                      style={{ color: getHexColor(attr.score) }}
                      inputClassName="text-right h-7 w-16 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-md"
                    />
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
