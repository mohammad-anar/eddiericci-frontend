/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import badge1 from "@/assets/cvs-page/id/badge-image1.png";
import badge2 from "@/assets/cvs-page/id/badge-image2.png";
import badge3 from "@/assets/cvs-page/id/badge-image3.png";
import positionMap from "@/assets/cvs-page/id/position-map.png";
import positionIcon from "@/assets/cvs-page/id/positionIcon.png";
import trofeeIcon from "@/assets/cvs-page/id/trofeeIcon.png";
import { CMSField } from "@/components/shared/CMSField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { cn } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { usePlayerStats } from "./FullEditablePage";

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
  { id: "acrobatic", label: "Acrobatic" },
  { id: "deadball", label: "Dead Ball Specialist" },
  { id: "relentless", label: "Relentless" },
  { id: "quick-step", label: "Quick Step" },
  { id: "trickster", label: "Trickster" },
  { id: "whipped-cross", label: "Whipped Cross" },
];

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

const PlayerBioSection = ({ editable = true }: { editable?: boolean }) => {
  const { playerData, handleUpdate } = usePlayer();

  const { setBioRating, role } = usePlayerStats();

  const [editingField, setEditingField] = useState<string | null>(null);

  const canEditBio = editable && (role === "player" || role === "parent" || role === "coach");
  const canEditEvaluation = editable && (role === "player" || role === "parent" || role === "coach");

  useEffect(() => {
    setBioRating(playerData.rating);
  }, [playerData.rating, setBioRating]);

  const [isPositionMap, setIsPositionMap] = useState(true);
  const [activeMarker, setActiveMarker] = useState<{ id: string, type: 'position' | 'futsal' } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const addMarker = () => {
    const field = isPositionMap ? 'positionMarkers' : 'futsalMarkers';
    const markers = (isPositionMap ? playerData.positionMarkers : playerData.futsalMarkers) || [];
    const newMarker = {
      id: Math.random().toString(36).substr(2, 9),
      x: 50,
      y: 50
    };
    handleUpdate(field, [...markers, newMarker]);
  };

  const updateMarkerPosition = (e: MouseEvent | React.MouseEvent) => {
    if (!activeMarker || !mapContainerRef.current) return;

    const rect = mapContainerRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;

    // Constrain to bounds
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    const field = activeMarker.type === 'position' ? 'positionMarkers' : 'futsalMarkers';
    const markers = (activeMarker.type === 'position' ? playerData.positionMarkers : playerData.futsalMarkers) || [];
    
    const newMarkers = markers.map(m => 
      m.id === activeMarker.id ? { ...m, x, y } : m
    );

    handleUpdate(field, newMarkers);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (activeMarker) {
        updateMarkerPosition(e);
      }
    };

    const handleGlobalMouseUp = () => {
      setActiveMarker(null);
    };

    if (activeMarker) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [activeMarker]);

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

  const handleImageUpload = async (
    file: File,
    field: string
  ) => {
    let processedFile = file;

    if (field === "playerImage") {
      try {
        toast.loading("Removing background... Please wait.", { id: "bg-removal" });
        const { removeBackground } = await import("@imgly/background-removal");
        const blob = await removeBackground(file);
        processedFile = new File([blob], file.name, { type: "image/png" });
        toast.success("Background removed!", { id: "bg-removal" });
      } catch (error) {
        console.error("Background removal failed:", error);
        toast.error("Background removal failed. Using original image.", { id: "bg-removal" });
      }
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleUpdate(field, reader.result);
    };
    reader.readAsDataURL(processedFile);
  };

  const EditableImage = ({
    src,
    alt,
    className,
    field,
    width,
    height,
    layout
  }: {
    src: any;
    alt: string;
    className?: string;
    field: string;
    width?: number;
    height?: number;
    layout?: "fill" | "responsive" | "intrinsic" | "fixed";
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const playerStats = usePlayerStats();
    const [role, setRole] = useState<string>("player");


    useEffect(() => {
      const currentRole = localStorage.getItem("userRole") || role || "player";
      setRole(currentRole);
    }, [role]);

    const canUpload = editable && ((field === "playerImage" || field === "birthCountryFlag" || field === "dualNationalityFlag")
      ? (role === "player" || role === "parent" || role === "coach")
      : canEditEvaluation);

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      if (!canUpload) return;
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleImageUpload(file, field);
      }
    };

    return (
      <div
        className={`relative group w-full ${canUpload ? "cursor-pointer" : ""}`}
        onClick={() => canUpload && fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Image
          src={src}
          alt={alt}
          className={className}
          width={width || 500}
          height={height || 500}
          layout={layout}
          draggable={false}
        />
        {canUpload && (
          <>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
              <span className="text-[10px] text-white font-black uppercase tracking-widest">Drop or Click</span>
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

  const toggleStyle = (id: string) => {
    const currentStyles = playerData.selectedStyleIds;
    if (currentStyles.includes(id)) {
      handleUpdate(
        "selectedStyleIds",
        currentStyles.filter((styleId: any) => styleId !== id)
      );
    } else if (currentStyles.length < 4) {
      handleUpdate("selectedStyleIds", [...currentStyles, id]);
    }
  };

  // const handleShare = async () => {
  //   const shareUrl = window.location.href;
  //   const shareData = {
  //     title: `${playerData.fullName}'s Professional Football CV`,
  //     text: `Check out ${playerData.fullName}'s verified football profile on Eddie Ricci Management.`,
  //     url: shareUrl,
  //   };

  //   try {
  //     if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
  //       await navigator.share(shareData);
  //       toast.success("Shared successfully!");
  //     } else {
  //       await navigator.clipboard.writeText(shareUrl);
  //       toast.success("Profile link copied to clipboard!");
  //     }
  //   } catch (err) {
  //     if ((err as Error).name !== "AbortError") {
  //       await navigator.clipboard.writeText(shareUrl);
  //       toast.success("Profile link copied to clipboard!");
  //     }
  //   }
  // };

  const orderedSelectedStyles = playerData.selectedStyleIds.map(
    (id: any) => ALL_STYLES.find((s: any) => s.id === id)!
  );

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

  const styleBadges = [badge1, badge2, badge3];
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="col-span-1 xl:col-span-4 h-fit space-y-6 bg-cardBg">
            <div className=" p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Personal Information
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Full Name</span>
                  <CMSField
                    value={playerData.fullName}
                    onUpdate={(val) => handleUpdate("fullName", val)}
                    canEdit={canEditBio}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Date of Birth</span>
                  <CMSField
                    value={playerData.dob}
                    type="date"
                    onUpdate={(val) => {
                      handleUpdate("dob", val);
                      const newAge = calculateAge(String(val));
                      if (newAge !== "") {
                        handleUpdate("age", newAge);
                      }
                    }}
                    canEdit={canEditBio}
                    className="w-1/2 justify-end"
                    inputClassName="text-right w-full bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-3 py-1.5 rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Age</span>
                  <div className="flex items-center gap-1">
                    <span>{playerData.age || 0}</span> <span className="text-gray-400 text-sm">Years</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Birth Country</span>
                  <div className="flex items-center gap-2">
                    <CMSField
                      value={playerData.birthCountry}
                      onUpdate={(val) => handleUpdate("birthCountry", val)}
                      canEdit={canEditBio}
                      type="combobox"
                      options={ALL_COUNTRIES}
                      className="w-24 justify-end"
                      inputClassName="text-right"
                    />
                    <div className="relative w-6 h-4 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={getFlagUrl(playerData.birthCountry)}
                        alt="birth country flag"
                        layout="fill"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Dual Nationality</span>
                  <div className="flex items-center gap-2">
                    <CMSField
                      value={playerData.dualNationality}
                      onUpdate={(val) => handleUpdate("dualNationality", val)}
                      canEdit={canEditBio}
                      type="combobox"
                      options={ALL_COUNTRIES}
                      className="w-24 justify-end"
                      inputClassName="text-right"
                    />
                    <div className="relative w-6 h-4 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={getFlagUrl(playerData.dualNationality)}
                        alt="dual nationality flag"
                        layout="fill"
                        className="object-cover"
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
                  <CMSField
                    value={playerData.email}
                    onUpdate={(val) => handleUpdate("email", val)}
                    canEdit={canEditBio}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <CMSField
                    value={playerData.phone}
                    onUpdate={(val) => handleUpdate("phone", val)}
                    canEdit={canEditBio}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <CMSField
                    value={playerData.location}
                    onUpdate={(val) => handleUpdate("location", val)}
                    canEdit={canEditBio}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <CMSField
                    value={playerData.website}
                    onUpdate={(val) => handleUpdate("website", val)}
                    canEdit={canEditBio}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Physical Stats
              </h2>
              <div className="flex justify-around text-center mb-6">
                <div>
                  <CMSField
                    value={playerData.height}
                    onUpdate={(val) => handleUpdate("height", val)}
                    canEdit={canEditBio}
                    isNumeric
                    className="text-2xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
                  <div className="text-xs text-gray-400">HEIGHT (m)</div>
                </div>
                <div>
                  <CMSField
                    value={playerData.weight}
                    onUpdate={(val) => handleUpdate("weight", val)}
                    canEdit={canEditBio}
                    isNumeric
                    className="text-2xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
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
                      layout="fill"
                    />
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Left</span>
                    <CMSField
                      value={playerData.leftLegUsage}
                      onUpdate={(val) => handleUpdate("leftLegUsage", parseInt(String(val)))}
                      canEdit={canEditBio}
                      type="number"
                      editTrigger="doubleClick"
                      className="text-primary justify-end w-32"
                      inputClassName="text-right h-7 w-20 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-md"
                    />
                  </div>
                  {canEditBio ? (
                    <div className="relative flex items-center h-2 group translate-y-[5px]">
                      <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden relative">
                        <div
                          className={cn("h-full transition-all duration-300 ease-out", getIndicatorColor(playerData.leftLegUsage))}
                          style={{ width: `${playerData.leftLegUsage}%` }}
                        />
                      </div>
                      {/* Visible Slider on Hover */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={playerData.leftLegUsage}
                        onChange={(e) =>
                          handleUpdate("leftLegUsage", parseInt(e.target.value))
                        }
                        style={{
                          background: `linear-gradient(to right, ${getHexColor(playerData.leftLegUsage)} ${playerData.leftLegUsage}%, #333 ${playerData.leftLegUsage}%)`,
                        }}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100 accent-primary"
                      />
                      {/* Always Active Invisible Slider for Dragging */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={playerData.leftLegUsage}
                        onChange={(e) =>
                          handleUpdate("leftLegUsage", parseInt(e.target.value))
                        }
                        className="w-full h-6 opacity-0 cursor-pointer absolute inset-0 z-20"
                      />
                    </div>
                  ) : (
                    <Progress
                      value={playerData.leftLegUsage}
                      style={{ backgroundColor: '#333' }}
                      indicatorClassName="bg-green-500"
                    />
                  )}
                </div>
                <div className="border-2 bg-gray-600/30 p-3 rounded-xl">
                  <div className="relative w-full h-16 mb-2">
                    <Image
                      src={playerData.rightLegImage}
                      alt="right leg"
                      className="object-contain"
                      layout="fill"
                    />
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Right</span>
                    <CMSField
                      value={playerData.rightLegUsage}
                      onUpdate={(val) => handleUpdate("rightLegUsage", parseInt(String(val)))}
                      canEdit={canEditBio}
                      type="number"
                      editTrigger="doubleClick"
                      className="text-primary justify-end w-32"
                      inputClassName="text-right h-7 w-20 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-md"
                    />
                  </div>
                  {canEditBio ? (
                    <div className="relative flex items-center h-2 group translate-y-[5px]">
                      <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden relative">
                        <div
                          className={cn("h-full transition-all duration-300 ease-out", getIndicatorColor(playerData.rightLegUsage))}
                          style={{ width: `${playerData.rightLegUsage}%` }}
                        />
                      </div>
                      {/* Visible Slider on Hover */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={playerData.rightLegUsage}
                        onChange={(e) =>
                          handleUpdate("rightLegUsage", parseInt(e.target.value))
                        }
                        style={{
                          background: `linear-gradient(to right, ${getHexColor(playerData.rightLegUsage)} ${playerData.rightLegUsage}%, #333 ${playerData.rightLegUsage}%)`,
                        }}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100 accent-primary"
                      />
                      {/* Always Active Invisible Slider for Dragging */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={playerData.rightLegUsage}
                        onChange={(e) =>
                          handleUpdate("rightLegUsage", parseInt(e.target.value))
                        }
                        className="w-full h-6 opacity-0 cursor-pointer absolute inset-0 z-20"
                      />
                    </div>
                  ) : (
                    <Progress
                      value={playerData.rightLegUsage}
                      style={{ backgroundColor: '#333' }}
                      indicatorClassName="bg-green-500"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Languages
              </h2>
              <div className="space-y-3">
                {playerData.languages.map((lang: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-black/20 border border-border/50 rounded-lg group hover:bg-black/40 transition-all">
                    <CMSField
                      value={lang.name}
                      onUpdate={(val) => handleUpdate(`languages.${idx}.name`, val)}
                      canEdit={canEditBio}
                      className="flex-1 font-medium text-gray-200"
                    />
                    <CMSField
                      value={lang.level || "Fluent"}
                      onUpdate={(val) => handleUpdate(`languages.${idx}.level`, val)}
                      canEdit={canEditBio}
                      type="select"
                      options={["Native", "Fluent", "Intermediate", "Beginner"]}
                      className="w-32 justify-end"
                      inputClassName="text-right text-primary font-bold"
                      hideIcon={true}
                    />
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

              <div className="text-end mb-2 w-full">
                <Button 
                  size={"sm"} 
                  variant={"outline"}
                  onClick={addMarker}
                >
                  + Add position icon
                </Button>
              </div>
              
              <div 
                ref={mapContainerRef}
                className="relative w-full h-auto overflow-hidden select-none"
              >
                <Image
                  src={isPositionMap ? (playerData.positionMap || positionMap) : (playerData.futsalMap || positionMap)}
                  alt={isPositionMap ? "position map" : "futsal map"}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded"
                  draggable={false}
                />

                {/* Render markers */}
                {( (isPositionMap ? playerData.positionMarkers : playerData.futsalMarkers) || [] ).map((marker: any, idx: number) => (
                  <div
                    key={marker.id}
                    className="absolute z-20 cursor-move group/marker"
                    style={{
                      left: `${marker.x}%`,
                      top: `${marker.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setActiveMarker({ id: marker.id, type: isPositionMap ? 'position' : 'futsal' });
                    }}
                  >
                    <Image
                      src={positionIcon}
                      alt="position icon"
                      width={idx === 0 ? 60 : 40}
                      height={idx === 0 ? 60 : 40}
                      className={cn(
                        "pointer-events-none drop-shadow-lg transition-transform group-hover/marker:scale-110",
                        idx === 0 ? "w-12 h-12 md:w-16 md:h-16" : "w-8 h-8 md:w-10 md:h-10"
                      )}
                    />
                    {/* Delete button on hover */}
                    <button
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover/marker:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        const field = isPositionMap ? 'positionMarkers' : 'futsalMarkers';
                        const markers = isPositionMap ? playerData.positionMarkers : playerData.futsalMarkers;
                        handleUpdate(field, markers.filter(m => m.id !== marker.id));
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN - PLAYER IMAGE */}
          <div className="col-span-1 xl:col-span-4 flex flex-col items-center">
            {/* Player Name */}
            <div className="text-center mb-8">
              <div className="flex items-center mb-8 justify-center">
                <div className="relative w-32 h-20">
                  <Image
                    src={getFlagUrl(playerData.birthCountry)}
                    alt="Birth Country"
                    layout="fill"
                    className="object-cover rounded shadow-lg border border-border"
                  />
                  {playerData.dualNationality && (
                    <div className="absolute -bottom-2 -right-2 w-12 h-8 border-2 border-white rounded shadow-md overflow-hidden">
                      <Image
                        src={getFlagUrl(playerData.dualNationality)}
                        alt="Dual Nationality"
                        layout="fill"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-2xl font-bold font-heading mb-2 flex items-center justify-center gap-2">
                <CMSField
                  value={playerData.fullName}
                  onUpdate={(val) => handleUpdate("fullName", val)}
                  canEdit={canEditBio}
                  className="text-2xl font-bold font-heading"
                />
                <span className="text-green-500 ">[{playerData.age}]</span>
              </h1>
            </div>

            <div className="mb-8">
              <CMSField
                value={playerData.position}
                onUpdate={(val) => handleUpdate("position", val)}
                canEdit={canEditBio}
                type="combobox"
                options={[
                  "Goalkeeper",
                  "Center Back",
                  "Right Back",
                  "Left Back",
                  "Wing Back",
                  "Defensive Midfielder",
                  "Central Midfielder",
                  "Attacking Midfielder",
                  "Left Midfielder",
                  "Right Midfielder",
                  "Striker",
                  "Center Forward",
                  "Second Striker",
                  "Left Winger",
                  "Right Winger"
                ]}
                className="flex items-center gap-2 border border-border px-4 py-2 rounded hover:bg-gray-900 bg-transparent text-foreground h-auto w-fit mx-auto"
              />
            </div>

            {/* Player Image */}
            <div className="relative w-full h-[523px] mb-8 flex  items-end justify-center">
              <EditableImage
                src={playerData.playerImage}
                alt={playerData.fullName}
                className="object-contain w-auto mx-auto h-[500px]"
                width={800}
                height={1000}
                field="playerImage"
              />
            </div>

            {/* Player Style Section */}
            <div className="w-full space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <h3 className="text-2xl font-bold font-heading">
                    Player Style
                  </h3>
                  {canEditBio && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-cardBg border-border text-foreground">
                        <DialogHeader>
                          <DialogTitle>Select Player Styles (Max 4)</DialogTitle>
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
                                  ) && playerData.selectedStyleIds.length >= 4
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
          <div className="col-span-1 xl:col-span-4 space-y-6 bg-cardBg">
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Strength
              </h2>
              <div className="space-y-2 text-sm">
                {Object.entries(playerData.strengths).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[80px_1fr_auto] items-center gap-2 p-2 bg-[#1a1a1a]/50 border border-border/50 rounded-lg group hover:bg-[#1a1a1a]/80 transition-colors">
                    <div className="truncate">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">{key}</p>
                    </div>

                    <div className="min-w-0 translate-y-[5px]">
                      {canEditEvaluation ? (
                        <div className="relative flex items-center h-2 group">
                          <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden relative">
                            <div
                              className={cn("h-full transition-all duration-300 ease-out", getIndicatorColor(value as number))}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={value as any}
                            onChange={(e) =>
                              handleUpdate(`strengths.${key}`, parseInt(e.target.value))
                            }
                            style={{
                              background: `linear-gradient(to right, ${getHexColor(value as number)} ${value}%, #333 ${value}%)`,
                            }}
                            className="w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100 accent-primary"
                          />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={value as any}
                            onChange={(e) =>
                              handleUpdate(`strengths.${key}`, parseInt(e.target.value))
                            }
                            className="w-full h-6 opacity-0 cursor-pointer absolute inset-0 z-20"
                          />
                        </div>
                      ) : (
                        <Progress
                          value={value as any}
                          className="h-1.5"
                          style={{ backgroundColor: '#333' }}
                          indicatorClassName={getIndicatorColor(value as number)}
                        />
                      )}
                    </div>

                    <div className="flex justify-end">
                      <CMSField
                        value={value as any}
                        onUpdate={(val) => handleUpdate(`strengths.${key}`, parseInt(String(val)))}
                        canEdit={canEditEvaluation}
                        type="number"
                        editTrigger="doubleClick"
                        className="font-bold text-xs justify-end"
                        style={{ color: getHexColor(value as number) }}
                        inputClassName="text-right h-7 w-16 bg-gray-900 border-primary/50 focus:border-primary transition-all px-2 rounded-md"
                        hideIcon={true}
                      />
                    </div>
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
                    <div key={key} className="grid grid-cols-[80px_1fr_auto] items-center gap-2 p-2 bg-[#1a1a1a]/50 border border-border/50 rounded-lg group hover:bg-[#1a1a1a]/80 transition-colors">
                      <div className="truncate">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">{key.replace(/([A-Z])/g, " $1")}</p>
                      </div>

                      <div className="min-w-0 translate-y-[5px]">
                        {canEditEvaluation ? (
                          <div className="relative flex items-center h-2 group">
                            <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden relative">
                              <div
                                className={cn("h-full transition-all duration-300 ease-out", getIndicatorColor(value as number))}
                                style={{ width: `${value}%` }}
                              />
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={value as any}
                              onChange={(e) =>
                                handleUpdate(`performanceMetrics.${key}`, parseInt(e.target.value))
                              }
                              style={{
                                background: `linear-gradient(to right, ${getHexColor(value as number)} ${value}%, #333 ${value}%)`,
                              }}
                              className="w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100 accent-primary"
                            />
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={value as any}
                              onChange={(e) =>
                                handleUpdate(`performanceMetrics.${key}`, parseInt(e.target.value))
                              }
                              className="w-full h-6 opacity-0 cursor-pointer absolute inset-0 z-20"
                            />
                          </div>
                        ) : (
                          <Progress
                            value={value as any}
                            className="h-1.5"
                            style={{ backgroundColor: '#333' }}
                            indicatorClassName={getIndicatorColor(value as number)}
                          />
                        )}
                      </div>

                      <div className="flex justify-end">
                        <CMSField
                          value={value as any}
                          onUpdate={(val) => handleUpdate(`performanceMetrics.${key}`, parseInt(String(val)))}
                          canEdit={canEditEvaluation}
                          type="number"
                          editTrigger="doubleClick"
                          className="font-bold text-xs justify-end"
                          style={{ color: getHexColor(value as number) }}
                          inputClassName="text-right h-7 w-16 bg-gray-900 border-primary/50 focus:border-primary transition-all px-2 rounded-md"
                          hideIcon={true}
                        />
                      </div>
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
                <CMSField
                  value={playerData.marketValue}
                  onUpdate={(val) => handleUpdate("marketValue", val)}
                  canEdit={canEditBio}
                  className="text-3xl font-bold text-primary mb-1"
                  inputClassName="text-3xl font-bold h-12"
                />
                <p className="text-xs text-gray-400">Current Market Value</p>
                <CMSField
                  value={playerData.marketTrend}
                  onUpdate={(val) => handleUpdate("marketTrend", val)}
                  canEdit={canEditBio}
                  className="text-xs text-primary mt-2"
                  inputClassName="h-7 text-xs"
                />
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
                  <CMSField
                    value={playerData.contractUntil}
                    onUpdate={(val) => handleUpdate("contractUntil", val)}
                    canEdit={canEditBio}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Agent</span>
                  <CMSField
                    value={playerData.agent}
                    onUpdate={(val) => handleUpdate("agent", val)}
                    canEdit={canEditBio}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Agency</span>
                  <CMSField
                    value={playerData.agency}
                    onUpdate={(val) => handleUpdate("agency", val)}
                    canEdit={canEditBio}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Career Highlights
              </h2>
              <div className="space-y-6 border-l-2 border-green-600 pl-4 mt-6">
                {playerData.careerHighlights.map((highlight: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                      <Image
                        src={trofeeIcon}
                        alt="Achievement"
                        width={36}
                        height={36}
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 w-full">
                      <CMSField
                        value={highlight.year}
                        onUpdate={(val) => handleUpdate(`careerHighlights.${idx}.year`, val)}
                        canEdit={canEditBio}
                        type="textarea"
                        className="text-xs font-black text-primary/80 tracking-widest leading-relaxed"
                        inputClassName="text-xs font-black min-h-[30px] py-0.5"
                      />
                      <CMSField
                        value={highlight.title}
                        onUpdate={(val) => handleUpdate(`careerHighlights.${idx}.title`, val)}
                        canEdit={canEditBio}
                        type="textarea"
                        className="text-sm md:text-base text-gray-400 leading-relaxed tracking-tight"
                        inputClassName="text-base font-black min-h-[40px] py-1"
                      />
                    </div>
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
                  <CMSField
                    value={playerData.seasonStats.matches}
                    onUpdate={(val) => handleUpdate("seasonStats.matches", val)}
                    canEdit={canEditEvaluation}
                    isNumeric
                    className="text-3xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
                  <div className="text-xs text-gray-400 mt-1">MATCHES</div>
                </div>
                <div className="text-center">
                  <CMSField
                    value={playerData.seasonStats.goals}
                    onUpdate={(val) => handleUpdate("seasonStats.goals", val)}
                    canEdit={canEditEvaluation}
                    isNumeric
                    className="text-3xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
                  <div className="text-xs text-gray-400 mt-1">GOALS</div>
                </div>
                <div className="text-center">
                  <CMSField
                    value={playerData.seasonStats.assists}
                    onUpdate={(val) => handleUpdate("seasonStats.assists", val)}
                    canEdit={canEditEvaluation}
                    isNumeric
                    className="text-3xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
                  <div className="text-xs text-gray-400 mt-1">ASSISTS</div>
                </div>
                <div className="text-center">
                  <CMSField
                    value={playerData.seasonStats.avgRating}
                    onUpdate={(val) => handleUpdate("seasonStats.avgRating", val)}
                    canEdit={canEditEvaluation}
                    isNumeric
                    className="text-3xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
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
