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
import { ChevronDown, PencilIcon, Plus, Trash2, X, Check, Upload } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CMSField } from "@/components/shared/CMSField";
import { useCoach } from "@/lib/hooks/useCoach";
import { usePlayerStats } from "../../player-cv-details/components/FullEditablePage";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "sonner";

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

const ALL_COUNTRIES = Object.keys(COUNTRY_CODES).map(c =>
  c.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
).sort();

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

const ALL_COACH_STYLES = COACH_STYLE_GROUPS.flatMap(group =>
  group.styles.map(style => ({
    id: style.toLowerCase().replace(/ /g, "-"),
    label: style
  }))
);

const YEARS = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i));
const TO_YEARS = ["Present", ...YEARS];

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

const CoachBioSection = ({ editable }: { editable?: boolean }) => {
  const { coachData, handleUpdate } = useCoach();

  const [isAddingClub, setIsAddingClub] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [newClubLogo, setNewClubLogo] = useState<string | null>(null);
  const [fromYear, setFromYear] = useState(YEARS[0]);
  const [toYear, setToYear] = useState("Present");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const styleBadges = [badge1, badge2, badge3];
  const { role, bioRating, skillsAvg, metricsAvg, attributesAvg } = usePlayerStats();

  const canEdit = !!(editable && (role === "coach" || role === "admin" || !role));

  const overallRating = Math.round(
    (bioRating + skillsAvg + metricsAvg + attributesAvg) / 4,
  );

  const attrData: Attribute[] = coachData.keySkills.map((skill) => ({
    name: skill.name,
    score: skill.value,
    status: getBadgeStatus(skill.value)
  }));

  const handleAttrUpdate = async (index: number, value: number) => {
    const newSkills = [...coachData.keySkills];
    newSkills[index] = { ...newSkills[index], value };
    handleUpdate("keySkills", newSkills);
  };

  const calculateAge = (dobString: string) => {
    if (!dobString) return "";
    let birthDate: Date;

    if (dobString.includes("/")) {
      const [day, month, year] = dobString.split("/");
      birthDate = new Date(`${year}-${month}-${day}`);
    } else {
      birthDate = new Date(dobString);
    }

    if (isNaN(birthDate.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getFlagUrl = (countryName: string) => {
    if (!countryName) return "";
    const code = COUNTRY_CODES[countryName.toLowerCase()];
    if (!code) return "";
    return `https://flagcdn.com/w160/${code}.png`;
  };

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

  const handleClubLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size too large. Max 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewClubLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addClub = () => {
    if (!newClubName.trim()) {
      toast.error("Please enter a club name");
      return;
    }

    const newClub = {
      id: Math.random().toString(36).substr(2, 9),
      name: newClubName,
      from: fromYear,
      to: toYear,
      logo: newClubLogo || "",
    };

    handleUpdate("clubs", [...coachData.clubs, newClub]);
    setIsAddingClub(false);
    setNewClubName("");
    setNewClubLogo(null);
    toast.success("Club added successfully");
  };

  const removeClub = (id: string) => {
    const newClubs = coachData.clubs.filter(c => c.id !== id);
    handleUpdate("clubs", newClubs);
    toast.success("Club removed");
  };

  const updateClub = (id: string, field: string, value: any) => {
    const newClubs = coachData.clubs.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    );
    handleUpdate("clubs", newClubs);
  };

  const toggleStyle = (styleId: string) => {
    const currentStyles = coachData.selectedStyleIds || [];
    if (currentStyles.includes(styleId)) {
      handleUpdate(
        "selectedStyleIds",
        currentStyles.filter((id) => id !== styleId)
      );
    } else if (currentStyles.length < 4) {
      handleUpdate("selectedStyleIds", [...currentStyles, styleId]);
    } else {
      toast.error("Maximum 4 styles allowed");
    }
  };

  const orderedSelectedStyles = (coachData.selectedStyleIds || []).map(
    (id) => ALL_COACH_STYLES.find((s) => s.id === id)!
  ).filter(Boolean);

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
                    type="date"
                    onUpdate={(val) => {
                      handleUpdate("dob", val);
                      const newAge = calculateAge(String(val));
                      if (newAge !== "") {
                        handleUpdate("age", `${newAge} years`);
                      }
                    }}
                    canEdit={canEdit}
                    className="w-1/2 justify-end"
                    inputClassName="text-right w-full bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-3 py-1.5 rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">Age</span>
                  <div className="flex items-center gap-1">
                    <span>{coachData.age || 0}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Birth Country</span>
                  <div className="flex items-center gap-2">
                    <CMSField
                      value={coachData.birthCountry}
                      onUpdate={(val) => handleUpdate("birthCountry", val)}
                      canEdit={canEdit}
                      type="combobox"
                      options={ALL_COUNTRIES}
                      className="w-24 justify-end"
                      inputClassName="text-right"
                    />
                    <div className="relative w-6 h-4 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={getFlagUrl(coachData.birthCountry)}
                        alt="birth country flag"
                        width={24}
                        height={16}
                        className="object-cover"
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
                      type="combobox"
                      options={ALL_COUNTRIES}
                      className="w-24 justify-end"
                      inputClassName="text-right"
                    />
                    <div className="relative w-6 h-4 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={getFlagUrl(coachData.dualNationality)}
                        alt="dual nationality flag"
                        width={24}
                        height={16}
                        className="object-cover"
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
                      type="select"
                      options={["Native", "Fluent", "Intermediate", "Beginner"]}
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
              <div className="flex items-center mb-8 justify-center">
                <div className="relative w-32 h-20">
                  <Image
                    src={getFlagUrl(coachData.birthCountry)}
                    alt="Birth Country"
                    layout="fill"
                    className="object-cover rounded shadow-lg border border-border"
                  />
                  {coachData.dualNationality && (
                    <div className="absolute -bottom-2 -right-2 w-12 h-8 border-2 border-white rounded shadow-md overflow-hidden">
                      <Image
                        src={getFlagUrl(coachData.dualNationality)}
                        alt="Dual Nationality"
                        layout="fill"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-2xl font-bold font-heading mb-2 uppercase flex items-center justify-center gap-2">
                <CMSField
                  value={coachData.fullName}
                  onUpdate={(val) => handleUpdate("fullName", val)}
                  canEdit={canEdit}
                  className="text-2xl font-bold font-heading uppercase"
                />
                <span className="text-primary">[{overallRating}]</span>
              </h1>
            </div>

            {/* Position Selector */}
            <div className="mb-8">
              <CMSField
                value={coachData.coachType}
                onUpdate={(val) => handleUpdate("coachType", String(val))}
                canEdit={canEdit}
                type="combobox"
                options={COACH_TYPES}
                className="flex items-center gap-2 border border-border px-4 py-2 rounded hover:bg-gray-900 bg-transparent text-foreground h-auto w-fit mx-auto"
              />
            </div>

            <div className="relative w-full h-[723px] mb-8 flex items-end justify-center">
              <EditableImage
                src={coachData.coachImage}
                alt={coachData.fullName}
                className="object-contain w-auto mx-auto h-full"
                width={800}
                height={800}
                field="coachImage"
              />
            </div>

            {/* Coach Style Section */}
            <div className="w-full space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <h3 className="text-2xl font-bold font-heading">
                    Coach Style
                  </h3>
                  {canEdit && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-cardBg border-border text-foreground">
                        <DialogHeader>
                          <DialogTitle>Select Coach Styles (Max 4)</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4 max-h-[60vh] overflow-y-auto">
                          {ALL_COACH_STYLES.map((style) => (
                            <div
                              key={style.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={style.id}
                                checked={(coachData.selectedStyleIds || []).includes(
                                  style.id
                                )}
                                onCheckedChange={() => toggleStyle(style.id)}
                                disabled={
                                  !(coachData.selectedStyleIds || []).includes(
                                    style.id
                                  ) && (coachData.selectedStyleIds || []).length >= 4
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
                  )}
                </div>

                <div className="space-y-4">
                  {orderedSelectedStyles.map((style: any, index: number) => (
                    <div key={style.id} className="space-y-4">
                      <div className="flex justify-center">
                        <Image
                          src={styleBadges[index % styleBadges.length]}
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
              <div className="space-y-6 border-l-2 border-green-600 pl-4 mt-6">
                {coachData.cupHistory.map((cup, index) => {
                  const parts = cup.split(" - ");
                  const year = parts[0];
                  const title = parts.slice(1).join(" - ");

                  return (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                        <Image
                          src={trophyIcon}
                          alt="Achievement"
                          width={36}
                          height={36}
                          className="object-contain drop-shadow-md"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 w-full">
                        <CMSField
                          value={year}
                          onUpdate={(val) => {
                            const newCups = [...coachData.cupHistory];
                            newCups[index] = `${val} - ${title}`;
                            handleUpdate("cupHistory", newCups);
                          }}
                          canEdit={canEdit}
                          type="textarea"
                          className="text-xs font-black text-primary/80 tracking-widest leading-relaxed uppercase"
                          inputClassName="text-xs font-black min-h-[30px] py-0.5 uppercase"
                        />
                        <CMSField
                          value={title}
                          onUpdate={(val) => {
                            const newCups = [...coachData.cupHistory];
                            newCups[index] = `${year} - ${val}`;
                            handleUpdate("cupHistory", newCups);
                          }}
                          canEdit={canEdit}
                          type="textarea"
                          className="text-sm md:text-base text-gray-400 leading-relaxed tracking-tight uppercase"
                          inputClassName="text-base font-black min-h-[40px] py-1 uppercase"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Skills */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-6">
                Key Skills
              </h2>
              <div className="space-y-4">
                {coachData.keySkills.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <CMSField
                        value={skill.name}
                        onUpdate={(val) => {
                          const newSkills = [...coachData.keySkills];
                          newSkills[idx] = { ...newSkills[idx], name: String(val) };
                          handleUpdate("keySkills", newSkills);
                        }}
                        canEdit={canEdit}
                        className="text-sm font-bold text-gray-200 uppercase"
                      />
                      <Badge className={cn(getBadgeVariant(getBadgeStatus(skill.value)), "text-[10px] uppercase font-black py-0 px-2")}>
                        {getBadgeStatus(skill.value)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 transition-all duration-300">
                        {canEdit ? (
                          <div className="relative flex items-center h-2 group">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.value}
                              onChange={(e) => handleAttrUpdate(idx, parseInt(e.target.value))}
                              style={{
                                background: `linear-gradient(to right, ${getHexColor(skill.value)} ${skill.value}%, #333 ${skill.value}%)`,
                              }}
                              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100"
                            />
                            <div className="w-full h-2 bg-[#333] rounded-full overflow-hidden relative">
                              <div
                                className={cn("h-full transition-all duration-300 ease-out", getIndicatorColor(skill.value))}
                                style={{ width: `${skill.value}%` }}
                              />
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.value}
                              onChange={(e) => handleAttrUpdate(idx, parseInt(e.target.value))}
                              className="w-full h-8 opacity-0 cursor-pointer absolute inset-0 z-20"
                            />
                          </div>
                        ) : (
                          <Progress
                            value={skill.value}
                            className="h-1.5"
                            style={{ backgroundColor: '#333' }}
                            indicatorClassName={getIndicatorColor(skill.value)}
                          />
                        )}
                      </div>
                      <div className="shrink-0 text-right min-w-[3rem]">
                        <CMSField
                          value={skill.value}
                          onUpdate={(val) => handleAttrUpdate(idx, parseInt(String(val)))}
                          canEdit={canEdit}
                          type="number"
                          editTrigger="doubleClick"
                          className="text-sm font-black justify-end"
                          style={{ color: getHexColor(skill.value) }}
                          inputClassName="text-right h-6 w-12 text-xs bg-gray-900/50 border-gray-700 rounded uppercase"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Clubs */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="w-10" /> {/* Spacer */}
                <h2 className="text-lg text-center font-heading font-normal">
                  Clubs
                </h2>
                {canEdit && (
                  <Button
                    onClick={() => setIsAddingClub(true)}
                    size="sm"
                    className="bg-primary text-black hover:bg-primary/90 h-8 w-8 p-0 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {coachData.clubs.map((club, index) => (
                  <Card key={club.id || index} className="p-5 relative group">
                    {canEdit && (
                      <button
                        onClick={() => removeClub(club.id)}
                        className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={club.logo || clubImage}
                          className="object-contain w-full h-full"
                          alt={club.name}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="w-full min-w-0">
                        <CMSField
                          value={club.name}
                          onUpdate={(val) => updateClub(club.id, "name", val)}
                          canEdit={canEdit}
                          className="font-bold truncate uppercase"
                        />
                        <div className="flex items-center gap-1 text-[12px] text-gray-400">
                          <CMSField
                            value={club.from}
                            onUpdate={(val) => updateClub(club.id, "from", val)}
                            canEdit={canEdit}
                            type="combobox"
                            options={YEARS}
                            editTrigger="doubleClick"
                            hideIcon={true}
                            className="w-12"
                          />
                          <span>-</span>
                          <CMSField
                            value={club.to}
                            onUpdate={(val) => updateClub(club.id, "to", val)}
                            canEdit={canEdit}
                            type="combobox"
                            options={TO_YEARS}
                            editTrigger="doubleClick"
                            hideIcon={true}
                            className="w-16"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                {isAddingClub && (
                  <Card className="p-5 border-dashed border-primary/50 bg-primary/5 animate-in fade-in zoom-in duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold text-primary uppercase">New Club</span>
                      <button onClick={() => setIsAddingClub(false)} className="text-gray-400 hover:text-white">
                        <X size={14} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="w-16 h-16 rounded-full border-2 border-dashed border-gray-700 bg-black/40 flex items-center justify-center cursor-pointer hover:border-primary overflow-hidden"
                        >
                          {newClubLogo ? (
                            <Image src={newClubLogo} alt="Preview" width={64} height={64} className="object-contain p-2" />
                          ) : (
                            <Upload size={20} className="text-gray-500" />
                          )}
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleClubLogoUpload}
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Club Name"
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary"
                        value={newClubName}
                        onChange={(e) => setNewClubName(e.target.value)}
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <select
                          className="bg-gray-900 border border-gray-800 rounded px-2 py-1 text-xs text-white"
                          value={fromYear}
                          onChange={(e) => setFromYear(e.target.value)}
                        >
                          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <select
                          className="bg-gray-900 border border-gray-800 rounded px-2 py-1 text-xs text-white"
                          value={toYear}
                          onChange={(e) => setToYear(e.target.value)}
                        >
                          {TO_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>

                      <Button
                        onClick={addClub}
                        disabled={!newClubName.trim()}
                        className="w-full bg-primary text-black font-bold h-8"
                        size="sm"
                      >
                        <Check className="h-4 w-4 mr-2" /> Add
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachBioSection;
