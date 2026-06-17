/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import positionMap from "@/assets/cvs-page/id/position-map.png";
import technicalIcon from "@/assets/cvs-page/id/player-styles-icons/technical.png";
import finesseShotIcon from "@/assets/cvs-page/id/player-styles-icons/finesse shot.png";
import incisivePassIcon from "@/assets/cvs-page/id/player-styles-icons/incisiver pass.png";
import longBallIcon from "@/assets/cvs-page/id/player-styles-icons/long ball specialist.png";
import speedsterIcon from "@/assets/cvs-page/id/player-styles-icons/speedster.png";
import powerHeaderIcon from "@/assets/cvs-page/id/player-styles-icons/power header.png";
import interceptorIcon from "@/assets/cvs-page/id/player-styles-icons/interceptor.png";
import blockIcon from "@/assets/cvs-page/id/player-styles-icons/block specialist.png";
import clinicalFinisherIcon from "@/assets/cvs-page/id/player-styles-icons/clinical finisher.png";
import dribblingIcon from "@/assets/cvs-page/id/player-styles-icons/dribbling wizard.png";
import setPieceIcon from "@/assets/cvs-page/id/player-styles-icons/set piece specialist.png";
import playmakerIcon from "@/assets/cvs-page/id/player-styles-icons/playmark.png";
import acrobaticIcon from "@/assets/cvs-page/id/player-styles-icons/acrobatic.png";
import deadballIcon from "@/assets/cvs-page/id/player-styles-icons/dead ball specialist.png";
import relentlessIcon from "@/assets/cvs-page/id/player-styles-icons/relentless.png";
import quickStepIcon from "@/assets/cvs-page/id/player-styles-icons/quick step.png";
import tricksterIcon from "@/assets/cvs-page/id/player-styles-icons/trickster.png";
import whippedCrossIcon from "@/assets/cvs-page/id/player-styles-icons/whipped cross.png";

const STYLE_ICONS: Record<string, any> = {
  "technical": technicalIcon,
  "finesse-shot": finesseShotIcon,
  "incisive-pass": incisivePassIcon,
  "long-ball": longBallIcon,
  "speedster": speedsterIcon,
  "power-header": powerHeaderIcon,
  "interceptor": interceptorIcon,
  "block": blockIcon,
  "clinical-finisher": clinicalFinisherIcon,
  "dribbling": dribblingIcon,
  "set-piece": setPieceIcon,
  "playmaker": playmakerIcon,
  "acrobatic": acrobaticIcon,
  "deadball": deadballIcon,
  "relentless": relentlessIcon,
  "quick-step": quickStepIcon,
  "trickster": tricksterIcon,
  "whipped-cross": whippedCrossIcon,
};
import positionIcon from "@/assets/cvs-page/id/positionIcon.png";
import trofeeIcon from "@/assets/cvs-page/id/trofeeIcon.png";
import { CMSField } from "@/components/shared/CMSField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
import { cn, getShortForm, getFullWithShortForm, getVeryShortPosition } from "@/lib/utils";
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

const _getMarkersForPosition = (position: string, isFutsal: boolean) => {
  const pos = position?.trim() || "";
  const cleanPos = pos.toLowerCase();

  if (isFutsal) {
    if (cleanPos.includes("goalkeeper") || cleanPos.includes("gk")) {
      return [
        { id: "gk-1", name: "Goalkeeper", x: 50, y: 90 },
        { id: "gk-2", name: "Sweeper Keeper", x: 50, y: 80 },
        { id: "gk-3", name: "Shot Stopper", x: 42, y: 88 }
      ];
    }
    if (cleanPos.includes("fixo")) {
      return [
        { id: "fixo-1", name: "Fixo (Defender)", x: 50, y: 75 },
        { id: "fixo-2", name: "Center Back", x: 50, y: 82 },
        { id: "fixo-3", name: "Defensive Midfielder", x: 50, y: 62 }
      ];
    }
    if (cleanPos.includes("alas") && (cleanPos.includes("right") || cleanPos.includes("rw") || cleanPos.includes("(r)"))) {
      return [
        { id: "alasr-1", name: "Alas (Right Wing)", x: 80, y: 45 },
        { id: "alasr-2", name: "Right Winger", x: 82, y: 25 },
        { id: "alasr-3", name: "Right Midfielder", x: 75, y: 58 }
      ];
    }
    if (cleanPos.includes("alas") && (cleanPos.includes("left") || cleanPos.includes("lw") || cleanPos.includes("(l)"))) {
      return [
        { id: "alasl-1", name: "Alas (Left Wing)", x: 20, y: 45 },
        { id: "alasl-2", name: "Left Winger", x: 18, y: 25 },
        { id: "alasl-3", name: "Left Midfielder", x: 25, y: 58 }
      ];
    }
    if (cleanPos.includes("pivot")) {
      return [
        { id: "pivot-1", name: "Pivot (Forward)", x: 50, y: 20 },
        { id: "pivot-2", name: "Striker", x: 50, y: 12 },
        { id: "pivot-3", name: "Center Forward", x: 50, y: 32 }
      ];
    }
    // Fallbacks if a soccer position is selected but Futsal map is showing:
    return [
      { id: "f-1", name: pos || "Futsal Player", x: 50, y: 50 },
      { id: "f-2", name: "Fixo", x: 50, y: 75 },
      { id: "f-3", name: "Pivot", x: 50, y: 25 }
    ];
  } else {
    // Football (soccer) positions:
    const basePos = pos.split("(")[0].trim();
    switch (basePos) {
      case "Goalkeeper":
        return [
          { id: "gk-1", name: "Goalkeeper", x: 50, y: 92 },
          { id: "gk-2", name: "Sweeper Keeper", x: 50, y: 82 },
          { id: "gk-3", name: "Shot Stopper", x: 42, y: 90 }
        ];
      case "Center Back":
        return [
          { id: "cb-1", name: "Center Back", x: 50, y: 78 },
          { id: "cb-2", name: "Sweeper", x: 50, y: 88 },
          { id: "cb-3", name: "Defensive Midfielder", x: 50, y: 62 }
        ];
      case "Right Back":
        return [
          { id: "rb-1", name: "Right Back", x: 80, y: 78 },
          { id: "rb-2", name: "Right Wing-Back", x: 85, y: 65 },
          { id: "rb-3", name: "Center Back", x: 50, y: 78 }
        ];
      case "Left Back":
        return [
          { id: "lb-1", name: "Left Back", x: 20, y: 78 },
          { id: "lb-2", name: "Left Wing-Back", x: 15, y: 65 },
          { id: "lb-3", name: "Center Back", x: 50, y: 78 }
        ];
      case "Wing Back":
      case "Left Wing Back":
      case "Right Wing Back":
        return [
          { id: "wb-1", name: basePos, x: 82, y: 65 },
          { id: "wb-2", name: "Full-Back", x: 80, y: 78 },
          { id: "wb-3", name: "Side Midfielder", x: 80, y: 50 }
        ];
      case "Defensive Midfielder":
        return [
          { id: "dm-1", name: "Defensive Midfielder", x: 50, y: 62 },
          { id: "dm-2", name: "Central Midfielder", x: 50, y: 50 },
          { id: "dm-3", name: "Center Back", x: 50, y: 78 }
        ];
      case "Central Midfielder":
        return [
          { id: "cm-1", name: "Central Midfielder", x: 50, y: 50 },
          { id: "cm-2", name: "Attacking Midfielder", x: 50, y: 35 },
          { id: "cm-3", name: "Defensive Midfielder", x: 50, y: 62 }
        ];
      case "Attacking Midfielder":
        return [
          { id: "am-1", name: "Attacking Midfielder", x: 50, y: 35 },
          { id: "am-2", name: "Central Midfielder", x: 50, y: 50 },
          { id: "am-3", name: "Second Striker", x: 50, y: 25 }
        ];
      case "Left Midfielder":
        return [
          { id: "lm-1", name: "Left Midfielder", x: 20, y: 50 },
          { id: "lm-2", name: "Left Winger", x: 18, y: 25 },
          { id: "lm-3", name: "Central Midfielder", x: 50, y: 50 }
        ];
      case "Right Midfielder":
        return [
          { id: "rm-1", name: "Right Midfielder", x: 80, y: 50 },
          { id: "rm-2", name: "Right Winger", x: 82, y: 25 },
          { id: "rm-3", name: "Central Midfielder", x: 50, y: 50 }
        ];
      case "Striker":
        return [
          { id: "st-1", name: "Striker", x: 50, y: 15 },
          { id: "st-2", name: "Center Forward", x: 50, y: 25 },
          { id: "st-3", name: "Second Striker", x: 50, y: 32 }
        ];
      case "Center Forward":
        return [
          { id: "cf-1", name: "Center Forward", x: 50, y: 25 },
          { id: "cf-2", name: "Striker", x: 50, y: 15 },
          { id: "cf-3", name: "Attacking Midfielder", x: 50, y: 38 }
        ];
      case "Second Striker":
      case "Left Forward":
      case "Right Forward":
        return [
          { id: "ss-1", name: basePos, x: 50, y: 28 },
          { id: "ss-2", name: "Center Forward", x: 50, y: 20 },
          { id: "ss-3", name: "Attacking Midfielder", x: 50, y: 38 }
        ];
      case "Left Winger":
        return [
          { id: "lw-1", name: "Left Winger", x: 18, y: 25 },
          { id: "lw-2", name: "Left Midfielder", x: 20, y: 50 },
          { id: "lw-3", name: "Forward", x: 50, y: 20 }
        ];
      case "Right Winger":
        return [
          { id: "rw-1", name: "Right Winger", x: 82, y: 25 },
          { id: "rw-2", name: "Right Midfielder", x: 80, y: 50 },
          { id: "rw-3", name: "Forward", x: 50, y: 20 }
        ];
      default:
        return [
          { id: "def-1", name: basePos || "Player", x: 50, y: 50 },
          { id: "def-2", name: "Central Defender", x: 50, y: 75 },
          { id: "def-3", name: "Central Midfielder", x: 50, y: 50 }
        ];
    }
  }
};

const getMarkersForPosition = (position: string, isFutsal: boolean) => {
  const markers = _getMarkersForPosition(position, isFutsal);
  return markers.map((m, idx) => ({
    ...m,
    name: `position${idx + 1}`
  }));
};

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

  const prevPositionRef = useRef<string>("");

  // Auto-switch maps when position changes
  useEffect(() => {
    if (!playerData || !playerData.position) return;

    const cleanPos = playerData.position.toLowerCase();
    const shouldBeFutsal = cleanPos.includes("goalkeeper") || cleanPos.includes("fixo") || cleanPos.includes("alas") || cleanPos.includes("pivot");

    // Only auto-switch the map if the position itself has changed
    if (playerData.position !== prevPositionRef.current) {
      setIsPositionMap(!shouldBeFutsal);
      prevPositionRef.current = playerData.position;
    } else if (!shouldBeFutsal && !isPositionMap) {
      // Force Position Map if it's a soccer position and Futsal Map is active
      setIsPositionMap(true);
    }
  }, [playerData.position, isPositionMap]);

  // Synchronize markers for the active map
  useEffect(() => {
    if (!playerData || !playerData.position) return;

    const expected = getMarkersForPosition(playerData.position, !isPositionMap);
    const field = isPositionMap ? 'positionMarkers' : 'futsalMarkers';
    const current = (isPositionMap ? playerData.positionMarkers : playerData.futsalMarkers) || [];

    const needsReset = current.length !== 3 || current.some((m, idx) => m.name !== expected[idx]?.name);

    if (needsReset) {
      handleUpdate(field, expected);
    }
  }, [playerData.position, isPositionMap]);

  const addMarker = () => {
    // Fixed to 3 markers, disabled manual addition
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
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Academy</span>
                  <CMSField
                    value={playerData.academyName || "N/A"}
                    onUpdate={(val) => handleUpdate("academyName", val)}
                    canEdit={canEditBio}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Coach</span>
                  <CMSField
                    value={playerData.coachName || "N/A"}
                    onUpdate={(val) => handleUpdate("coachName", val)}
                    canEdit={canEditBio}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Club Managed</span>
                  <CMSField
                    value={playerData.clubManaged || "N/A"}
                    onUpdate={(val) => handleUpdate("clubManaged", val)}
                    canEdit={canEditBio}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Coach License</span>
                  <CMSField
                    value={playerData.coachLicenseNumber || "N/A"}
                    onUpdate={(val) => handleUpdate("coachLicenseNumber", val)}
                    canEdit={canEditBio}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
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
              {(() => {
                const cleanPos = (playerData.position || "").toLowerCase();
                const isFutsalPos = cleanPos.includes("goalkeeper") || cleanPos.includes("fixo") || cleanPos.includes("alas") || cleanPos.includes("pivot");

                return (
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setIsPositionMap(true)}
                      className={`${isPositionMap ? "px-3 py-1 bg-primary text-black text-xs text-center font-heading font-normal rounded" : "px-3 py-1 border border-border text-xs rounded hover:bg-gray-900"}`}
                    >
                      Position Map
                    </button>

                    <button
                      disabled={!isFutsalPos}
                      onClick={() => setIsPositionMap(false)}
                      className={cn(
                        "px-3 py-1 text-xs rounded transition-all",
                        !isPositionMap
                          ? "bg-primary text-black font-heading font-normal"
                          : "border border-border hover:bg-gray-900",
                        !isFutsalPos && "opacity-40 cursor-not-allowed hover:bg-transparent"
                      )}
                    >
                      Futsal Map
                    </button>
                  </div>
                );
              })()}

              {/* Add position icon button removed to keep exactly 3 markers */}

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
                {((isPositionMap ? playerData.positionMarkers : playerData.futsalMarkers) || []).map((marker: any, idx: number) => (
                  <div
                    key={marker.id}
                    className="absolute z-20 cursor-move group/marker flex flex-col items-center"
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
                      width={idx === 0 ? 34 : 30}
                      height={idx === 0 ? 34 : 30}
                      className={cn(
                        "pointer-events-none drop-shadow-lg transition-transform group-hover/marker:scale-110",
                        idx === 0 ? "w-[32px] h-[32px] md:w-[34px] md:h-[34px]" : "w-[28px] h-[28px] md:w-[30px] md:h-[30px]"
                      )}
                    />
                    {marker.name && (
                      <div className={cn(
                        "mt-1 px-1.5 py-0.5 rounded bg-black/85 border border-white/10 text-white text-[9px] font-medium text-center whitespace-nowrap shadow-md pointer-events-none tracking-wide select-none transition-all",

                      )}>
                        position{idx + 1}
                      </div>
                    )}
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
                value={getFullWithShortForm(playerData.position)}
                onUpdate={(val) => handleUpdate("position", val)}
                canEdit={canEditBio}
                type="combobox"
                options={[
                  "--Futsal Positions--",
                  "Goalkeeper (GK)",
                  "Fixo (Defender / CB)",
                  "Alas (Right Wing / RW)",
                  "Alas (Left Wing / LW)",
                  "Pivot (Forward / CF)",
                  "--Football Positions--",
                  "Goalkeeper (GK)",
                  "Center Back (CB)",
                  "Right Back (RB)",
                  "Left Back (LB)",
                  "Left Wing Back (LWB)",
                  "Right Wing Back (RWB)",
                  "Defensive Midfielder (CDM)",
                  "Central Midfielder (CM)",
                  "Attacking Midfielder (CAM)",
                  "Left Midfielder (LM)",
                  "Right Midfielder (RM)",
                  "Striker (ST)",
                  "Center Forward (CF)",
                  "Left Forward (LF)",
                  "Right Forward (RF)",
                  "Left Winger (LW)",
                  "Right Winger (RW)"
                ]}
                className="flex items-center gap-2 border border-border px-4 py-2 rounded hover:bg-gray-900 bg-transparent text-foreground h-auto w-fit mx-auto"
              />
            </div>

            {/* Player Image */}
            <div className="relative w-full h-[523px]  mb-8 flex  items-end justify-center">
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
                  {orderedSelectedStyles.map((style: any) => {
                    const badge = STYLE_ICONS[style.id];
                    const badgeSrc = typeof badge === "string" ? badge : badge?.src || "";
                    return (
                      <div key={style.id} className="space-y-4">
                        <div className="flex justify-center">
                          {badgeSrc ? (
                            <img
                              src={badgeSrc}
                              className="w-20 h-20 object-contain"
                              alt={style.label}
                            />
                          ) : (
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                              {style.label}
                            </div>
                          )}
                        </div>
                        <p className="text-lg font-heading">{style.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-1 xl:col-span-4 space-y-6 bg-cardBg">
            {/* Certification Card */}
            <div className="p-6 bnorder-none rounded-2xl relative overflow-hidden group hover:border-primary/20 transition-all">


              {/* SVG certificate container */}
              <div className="w-full aspect-square relative select-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
                  <defs>
                    <style>{`
                      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap');
                      .gold-text {
                        fill: url(#gold-grad-static);
                      }
                      .white-text {
                        fill: #FFFFFF;
                      }
                      .badge-heading {
                        font-family: 'Montserrat', 'Inter', sans-serif;
                        text-transform: uppercase;
                      }
                      .badge-content {
                        font-family: 'Inter', 'Montserrat', sans-serif;
                      }
                    `}</style>

                    <linearGradient id="gold-grad-static" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#BF953F" />
                      <stop offset="20%" stopColor="#FCF6BA" />
                      <stop offset="40%" stopColor="#B38728" />
                      <stop offset="60%" stopColor="#FBF5B7" />
                      <stop offset="80%" stopColor="#AA771C" />
                      <stop offset="100%" stopColor="#E2C175" />
                    </linearGradient>

                    <linearGradient id="gold-bright-static" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FCF6BA" />
                      <stop offset="35%" stopColor="#FFEFA6" />
                      <stop offset="70%" stopColor="#B38728" />
                      <stop offset="100%" stopColor="#FCF6BA" />
                    </linearGradient>

                    <linearGradient id="gold-dark-static" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8a6f27" />
                      <stop offset="50%" stopColor="#4e3a0b" />
                      <stop offset="100%" stopColor="#8a6f27" />
                    </linearGradient>

                    <linearGradient id="gold-divider-static" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#BF953F" stopOpacity="0" />
                      <stop offset="30%" stopColor="#FCF6BA" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="#B38728" stopOpacity="0.8" />
                      <stop offset="70%" stopColor="#FCF6BA" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#AA771C" stopOpacity="0" />
                    </linearGradient>

                    <radialGradient id="bg-radial-static" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                      <stop offset="0%" stopColor="#0a2a53" />
                      <stop offset="55%" stopColor="#05152e" />
                      <stop offset="90%" stopColor="#010615" />
                      <stop offset="100%" stopColor="#000207" />
                    </radialGradient>

                    <linearGradient id="ribbon-grad-static" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#020e24" />
                      <stop offset="12%" stopColor="#061b3b" />
                      <stop offset="34%" stopColor="#0f3468" />
                      <stop offset="50%" stopColor="#19488a" />
                      <stop offset="66%" stopColor="#0f3468" />
                      <stop offset="88%" stopColor="#061b3b" />
                      <stop offset="100%" stopColor="#020e24" />
                    </linearGradient>

                    <filter id="drop-shadow-static" x="-10%" y="-10%" width="120%" height="125%">
                      <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000000" floodOpacity="0.65" />
                    </filter>

                    <filter id="glow-static" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    <g id="leaf-node-static">
                      <path d="M 0,0 C -6,-10 -18,-18 -25,-14 C -18,1 -6,4 0,0" fill="url(#gold-grad-static)" stroke="url(#gold-dark-static)" strokeWidth="0.5" />
                      <path d="M 0,0 C 6,-10 18,-18 25,-14 C 18,1 6,4 0,0" fill="url(#gold-bright-static)" stroke="url(#gold-dark-static)" strokeWidth="0.5" />
                    </g>

                    <g id="wreath-half-static">
                      <path d="M -30,0 Q -95,-15 -136,-72" fill="none" stroke="url(#gold-grad-static)" strokeWidth="3" strokeLinecap="round" />
                      <g transform="translate(-42, -1) rotate(-15) scale(0.65)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-62, -6) rotate(-30) scale(0.75)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-82, -14) rotate(-45) scale(0.85)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-101, -24) rotate(-60) scale(0.95)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-118, -37) rotate(-75) scale(0.95)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-130, -52) rotate(-90) scale(0.85)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-136, -69) rotate(-105) scale(0.75)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-137, -86) rotate(-120) scale(0.60)"><use href="#leaf-node-static" /></g>
                    </g>

                    <path id="top-text-arc-shared" d="M 124,400 A 276,276 0 0,1 676,400" fill="none" />

                    <filter id="green-glow-static" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <radialGradient id="green-radar-glow-static" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="green-chart-fill-static" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="red-chart-fill-static" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#DC2626" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  <polygon points="400.00,20.00 414.21,38.28 429.81,21.17 442.55,40.51 459.45,24.68 470.62,44.96 488.71,30.50 498.26,51.59 517.43,38.60 525.29,60.37 545.42,48.93 551.55,71.25 572.52,61.42 576.88,84.16 598.55,76.00 601.12,99.01 623.36,92.57 624.11,115.72 646.79,111.05 645.73,134.18 668.70,131.30 665.82,154.27 688.95,153.21 684.28,175.89 707.43,176.64 700.99,198.88 724.00,201.45 715.84,223.12 738.58,227.48 728.75,248.45 751.07,254.58 739.63,274.71 761.40,282.57 748.41,301.74 769.50,311.29 755.04,329.38 775.32,340.55 759.49,357.45 778.83,370.19 761.72,385.79 780.00,400.00 761.72,414.21 778.83,429.81 759.49,442.55 775.32,459.45 755.04,470.62 769.50,488.71 748.41,498.26 761.40,517.43 739.63,525.29 751.07,545.42 728.75,551.55 738.58,572.52 715.84,576.88 724.00,598.55 700.99,601.12 707.43,623.36 684.28,624.11 688.95,646.79 665.82,645.73 668.70,668.70 645.73,665.82 646.79,688.95 624.11,684.28 623.36,707.43 601.12,700.99 598.55,724.00 576.88,715.84 572.52,738.58 551.55,728.75 545.42,751.07 525.29,739.63 517.43,761.40 498.26,748.41 488.71,769.50 470.62,755.04 459.45,775.32 442.55,759.49 429.81,778.83 414.21,761.72 400.00,780.00 385.79,761.72 370.19,778.83 357.45,759.49 340.55,775.32 329.38,755.04 311.29,769.50 301.74,748.41 282.57,761.40 274.71,739.63 254.58,751.07 248.45,728.75 227.48,738.58 223.12,715.84 201.45,724.00 198.88,700.99 176.64,707.43 175.89,684.28 153.21,688.95 154.27,665.82 131.30,668.70 134.18,645.73 111.05,646.79 115.72,624.11 92.57,623.36 99.01,601.12 76.00,598.55 84.16,576.88 61.42,572.52 71.25,551.55 48.93,545.42 60.37,525.29 38.60,517.43 51.59,498.26 30.50,488.71 44.96,470.62 24.68,459.45 40.51,442.55 21.17,429.81 38.28,414.21 20.00,400.00 38.28,385.79 21.17,370.19 40.51,357.45 24.68,340.55 44.96,329.38 30.50,311.29 51.59,301.74 38.60,282.57 60.37,274.71 48.93,254.58 71.25,248.45 61.42,227.48 84.16,223.12 76.00,201.45 99.01,198.88 92.57,176.64 115.72,175.89 111.05,153.21 134.18,154.27 131.30,131.30 154.27,134.18 153.21,111.05 175.89,115.72 176.64,92.57 198.88,99.01 201.45,76.00 223.12,84.16 227.48,61.42 248.45,71.25 254.58,48.93 274.71,60.37 282.57,38.60 301.74,51.59 311.29,30.50 329.38,44.96 340.55,24.68 357.45,40.51 370.19,21.17 385.79,38.28" fill="url(#gold-grad-static)" filter="url(#drop-shadow-static)" />

                  <circle cx="400" cy="400" r="358" stroke="url(#gold-dark-static)" strokeWidth="1.5" fill="none" />
                  <circle cx="400" cy="400" r="352" stroke="url(#gold-grad-static)" strokeWidth="5" fill="none" />
                  <circle cx="400" cy="400" r="344" stroke="url(#gold-dark-static)" strokeWidth="1.5" fill="none" />

                  <circle cx="400" cy="400" r="342" fill="url(#bg-radial-static)" />

                  <circle cx="400" cy="400" r="328" stroke="url(#gold-grad-static)" strokeWidth="2" strokeDasharray="2 7" fill="none" opacity="0.85" />
                  <circle cx="400" cy="400" r="320" stroke="url(#gold-grad-static)" strokeWidth="1" fill="none" opacity="0.4" />
                  <circle cx="400" cy="400" r="316" stroke="url(#gold-grad-static)" strokeWidth="3" fill="none" />
                  <circle cx="400" cy="400" r="312" stroke="url(#gold-dark-static)" strokeWidth="1.5" fill="none" />
                  <circle cx="400" cy="400" r="276" stroke="url(#gold-grad-static)" strokeDasharray="1.5 5" strokeWidth="1" fill="none" opacity="0.3" />

                  <g opacity="0.08" stroke="url(#gold-grad-static)" strokeWidth="2.5" fill="none" transform="translate(570, 310)">
                    <circle cx="0" cy="0" r="130" strokeWidth="2" opacity="0.6" />
                    <polygon points="0,-32 30,-10 19,26 -19,26 -30,-10" fill="url(#gold-grad-static)" opacity="0.35" />
                    <line x1="0" y1="-32" x2="0" y2="-65" />
                    <line x1="30" y1="-10" x2="60" y2="-20" />
                    <line x1="19" y1="26" x2="38" y2="52" />
                    <line x1="-19" y1="26" x2="-38" y2="52" />
                    <line x1="-30" y1="-10" x2="-60" y2="-20" />
                    <polygon points="0,-65 35,-80 55,-55 60,-20 30,-10" />
                    <polygon points="60,-20 90,-10 95,25 65,45 38,52 19,26 30,-10" />
                    <polygon points="38,52 45,90 10,105 -25,95 -38,52 19,26" />
                    <polygon points="-38,52 -65,45 -95,25 -90,-10 -60,-20 -30,-10 -19,26" />
                    <polygon points="-60,-20 -55,-55 -35,-80 0,-65 -30,-10" />
                    <line x1="35" y1="-80" x2="45" y2="-115" />
                    <line x1="-35" y1="-80" x2="-45" y2="-115" />
                    <line x1="90" y1="-10" x2="118" y2="-15" />
                    <line x1="-90" y1="-10" x2="-118" y2="-15" />
                    <line x1="95" y1="25" x2="122" y2="35" />
                    <line x1="-95" y1="25" x2="-122" y2="35" />
                    <line x1="45" y1="90" x2="55" y2="118" />
                    <line x1="-45" y1="90" x2="-55" y2="118" />
                  </g>

                  <text fontSize="34" fontWeight="900" className="badge-heading" letterSpacing="11">
                    <textPath href="#top-text-arc-shared" startOffset="50%" textAnchor="middle" fill="url(#gold-bright-static)" filter="url(#glow-static)">
                      VERIFIED
                    </textPath>
                  </text>

                  <path d="M 168.32,207 L 168.32,207.00 L 171.26,214.95 L 179.73,215.29 L 173.08,220.55 L 175.37,228.71 L 168.32,224.00 L 161.27,228.71 L 163.56,220.55 L 156.91,215.29 L 165.38,214.95 Z" fill="url(#gold-bright-static)" />
                  <path d="M 631.68,207 L 631.68,207.00 L 634.62,214.95 L 643.09,215.29 L 636.44,220.55 L 638.73,228.71 L 631.68,224.00 L 624.63,228.71 L 626.92,220.55 L 620.27,215.29 L 628.74,214.95 Z" fill="url(#gold-bright-static)" />

                  {/* 7. Official Stats Shield Logo */}
                  <g transform="translate(400, 215) scale(0.74) translate(-400, -180)">
                    {/* Outer Shield Border (Dark Charcoal) */}
                    <path d="M 400,122 C 375,110 330,112 330,112 C 316,160 324,195 400,246 C 476,195 484,160 470,112 C 470,112 425,110 400,122 Z" fill="#0A101D" filter="url(#drop-shadow-static)" stroke="url(#gold-grad-static)" strokeWidth="1.8" />
                    
                    {/* Inner White Shield Field */}
                    <path d="M 400,127 C 377,116 335,118 335,118 C 322,162 329,193 400,241 C 471,193 478,162 465,118 C 465,118 423,116 400,127 Z" fill="#FCFCFC" />
                    
                    {/* Red/Burgundy Bottom Crescent Shape */}
                    <path d="M 335,175 C 354,204 446,204 465,175 C 453,218 400,241 400,241 C 400,241 347,218 335,175 Z" fill="#991B1B" opacity="0.95" />

                    {/* Green Radar glow in background of shield */}
                    <circle cx="400" cy="180" r="45" fill="url(#green-radar-glow-static)" />

                    {/* Radar Chart: Pentagon Guidelines */}
                    <polygon points="400,132 445.6,165.2 428.2,218.8 371.8,218.8 354.4,165.2" fill="none" stroke="#10B981" strokeWidth="1.2" opacity="0.5" />
                    <polygon points="400,156 422.8,172.6 414.1,199.4 385.9,199.4 377.2,172.6" fill="none" stroke="#10B981" strokeWidth="0.8" strokeDasharray="1 1" opacity="0.4" />
                    {/* Radial spokes */}
                    <line x1="400" y1="180" x2="400" y2="132" stroke="#10B981" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
                    <line x1="400" y1="180" x2="445.6" y2="165.2" stroke="#10B981" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
                    <line x1="400" y1="180" x2="428.2" y2="218.8" stroke="#10B981" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
                    <line x1="400" y1="180" x2="371.8" y2="218.8" stroke="#10B981" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
                    <line x1="400" y1="180" x2="354.4" y2="165.2" stroke="#10B981" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />

                    {/* Actual Player Stats Polygon */}
                    <polygon points="400,139.2 434.2,168.9 422.6,211.1 374.0,215.7 359.8,167.0" fill="url(#red-chart-fill-static)" stroke="#EF4444" strokeWidth="2.2" filter="url(#green-glow-static)" />

                    {/* Glowing dot points on vertices */}
                    <circle cx="400" cy="132" r="3.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" filter="url(#green-glow-static)" />
                    <circle cx="445.6" cy="165.2" r="3.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" filter="url(#green-glow-static)" />
                    <circle cx="428.2" cy="218.8" r="3.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" filter="url(#green-glow-static)" />
                    <circle cx="371.8" cy="218.8" r="3.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" filter="url(#green-glow-static)" />
                    <circle cx="354.4" cy="165.2" r="3.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" filter="url(#green-glow-static)" />

                    {/* Skill word labels for vertices */}
                    <text x="390" y="124" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="9" fill="#1A2D24" letterSpacing="0.2">PAS</text>
                    <text x="452" y="167" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="9" fill="#1A2D24" letterSpacing="0.2">SHT</text>
                    <text x="434" y="228" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="9" fill="#1A2D24" letterSpacing="0.2">PHY</text>
                    <text x="346" y="228" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="9" fill="#1A2D24" letterSpacing="0.2">SPD</text>
                    <text x="328" y="167" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="9" fill="#1A2D24" letterSpacing="0.2">DRI</text>

                    {/* Player silhouette running (Dark Slate/Charcoal) */}
                    <path d="M 393,137 C 390,130 403,130 401,137 C 401,140 398,142 396,144 C 388,149 381,156 376,168 C 373,176 375,182 378,182 C 380,178 384,170 388,160 C 388,166 390,181 397,198 C 401,206 406,214 412,222 C 415,226 419,232 424,240 L 428,242 C 428,242 426,234 422,226 C 416,214 410,204 406,194 C 404,188 403,180 404,172 C 407,168 410,164 412,161 C 415,166 418,174 422,184 C 425,191 429,200 433,208 L 436,207 C 432,197 426,186 422,176 C 419,166 415,158 413,154 C 410,148 402,144 396,144" fill="#0A101D" />

                    {/* Highly polished Soccer Ball at runner's feet */}
                    <g transform="translate(-16, 11)">
                      <circle cx="400" cy="210" r="11" fill="#FFFFFF" stroke="#0A101D" strokeWidth="1.5" />
                      <polygon points="400,205.5 404.2,208.5 402.7,213 397.3,213 395.8,208.5" fill="#20252F" />
                      <line x1="400" y1="205.5" x2="400" y2="199" stroke="#0A101D" strokeWidth="1.4" />
                      <line x1="404.2" y1="208.5" x2="410.2" y2="203.5" stroke="#0A101D" strokeWidth="1.4" />
                      <line x1="402.7" y1="213" x2="406.5" y2="219" stroke="#0A101D" strokeWidth="1.4" />
                      <line x1="397.3" y1="213" x2="393.5" y2="219" stroke="#0A101D" strokeWidth="1.4" />
                      <line x1="395.8" y1="208.5" x2="389.8" y2="203.5" stroke="#0A101D" strokeWidth="1.4" />
                    </g>

                    {/* Match Grade Soccer Ball sitting at the top peak */}
                    <g transform="translate(0, -1)">
                      <circle cx="400" cy="111" r="14.5" fill="#FFFFFF" stroke="#0A101D" strokeWidth="2" />
                      <polygon points="400,105 405.5,109 403.5,115 396.5,115 394.5,109" fill="#20252F" />
                      <line x1="400" y1="105" x2="400" y2="96.5" stroke="#0A101D" strokeWidth="1.8" />
                      <line x1="405.5" y1="109" x2="413.5" y2="102.5" stroke="#0A101D" strokeWidth="1.8" />
                      <line x1="403.5" y1="115" x2="408.5" y2="123" stroke="#0A101D" strokeWidth="1.8" />
                      <line x1="396.5" y1="115" x2="391.5" y2="123" stroke="#0A101D" strokeWidth="1.8" />
                      <line x1="394.5" y1="109" x2="386.5" y2="102.5" stroke="#0A101D" strokeWidth="1.8" />
                      {/* Outer dark hexagon/pentagon patches */}
                      <path d="M 413.5,102.5 A 14.5,14.5 0 0,1 414.5,111 L 408.5,112 Z" fill="#20252F" stroke="#0A101D" strokeWidth="1.2" />
                      <path d="M 386.5,102.5 A 14.5,14.5 0 0,0 385.5,111 L 391.5,112 Z" fill="#20252F" stroke="#0A101D" strokeWidth="1.2" />
                      <path d="M 408.5,123 A 14.5,14.5 0 0,1 400,125.5 L 400,119 Z" fill="#20252F" stroke="#0A101D" strokeWidth="1.2" />
                      <path d="M 391.5,123 A 14.5,14.5 0 0,0 400,125.5 L 400,119 Z" fill="#20252F" stroke="#0A101D" strokeWidth="1.2" />
                    </g>
                  </g>

                  {/* 8. Display Field Rows (Coach, License, Club) */}
                  <g transform="translate(15, -45)">
                    {/* Row 1: Coach */}
                    <g transform="translate(0, 0)">
                      {/* Icon Envelope */}
                      <circle cx="220" cy="365" r="28" fill="#010c1e" stroke="url(#gold-grad-static)" strokeWidth="2.5" />
                      <circle cx="220" cy="365" r="24" fill="none" stroke="url(#gold-bright-static)" strokeWidth="0.5" opacity="0.4" />
                      {/* User profiles icon silhouettes */}
                      <circle cx="220" cy="358" r="7" fill="url(#gold-bright-static)" />
                      <path d="M 205,376 Q 205,367 220,367 Q 235,367 235,376" fill="url(#gold-bright-static)" stroke="url(#gold-dark-static)" strokeWidth="0.5" />

                      {/* Labels and bold value */}
                      <text x="265" y="354" fontSize="14" fontWeight="800" className="badge-heading gold-text" letterSpacing="1.5" opacity="0.95">HEAD COACH NAME</text>
                      <text x="265" y="382" fontSize="28" fontWeight="900" className="badge-content white-text" letterSpacing="0.5">{playerData.coachName || "N/A"}</text>

                      {/* Dividing Tapered Line */}
                      <line x1="210" y1="408" x2="590" y2="408" stroke="url(#gold-divider-static)" strokeWidth="1.5" />
                    </g>

                    {/* Row 2: License */}
                    <g transform="translate(0, 88)">
                      {/* Icon Envelope */}
                      <circle cx="220" cy="365" r="28" fill="#010c1e" stroke="url(#gold-grad-static)" strokeWidth="2.5" />
                      <circle cx="220" cy="365" r="24" fill="none" stroke="url(#gold-bright-static)" strokeWidth="0.5" opacity="0.4" />
                      {/* ID Card Profile Outline with Gold elements */}
                      <rect x="204" y="352" width="32" height="24" rx="3.5" fill="none" stroke="url(#gold-bright-static)" strokeWidth="2" />
                      <rect x="209" y="358" width="8" height="11" rx="1" fill="none" stroke="url(#gold-bright-static)" strokeWidth="1.2" />
                      <circle cx="213" cy="361" r="2" fill="url(#gold-bright-static)" />
                      <path d="M 210,367 Q 210,365 213,365 Q 216,365 216,367" fill="none" stroke="url(#gold-bright-static)" strokeWidth="1.2" />
                      <line x1="222" y1="358" x2="231" y2="358" stroke="url(#gold-bright-static)" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="222" y1="364" x2="231" y2="364" stroke="url(#gold-bright-static)" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="222" y1="370" x2="228" y2="370" stroke="url(#gold-bright-static)" strokeWidth="1.8" strokeLinecap="round" />

                      {/* Labels and bold value */}
                      <text x="265" y="354" fontSize="14" fontWeight="800" className="badge-heading gold-text" letterSpacing="1.5" opacity="0.95">LICENSE NUMBER</text>
                      <text x="265" y="382" fontSize="28" fontWeight="900" className="badge-content white-text" letterSpacing="0.5">{playerData.coachLicenseNumber || "CBF-2026-4587"}</text>

                      {/* Dividing Tapered Line */}
                      <line x1="210" y1="408" x2="590" y2="408" stroke="url(#gold-divider-static)" strokeWidth="1.5" />
                    </g>

                    {/* Row 3: Club Managed */}
                    <g transform="translate(0, 176)">
                      {/* Icon Envelope */}
                      <circle cx="220" cy="365" r="28" fill="#010c1e" stroke="url(#gold-grad-static)" strokeWidth="2.5" />
                      <circle cx="220" cy="365" r="24" fill="none" stroke="url(#gold-bright-static)" strokeWidth="0.5" opacity="0.4" />
                      {/* Football Shield Logo Outline */}
                      <path d="M 207,352 Q 220,348 233,352 L 233,366 Q 233,378 220,383 Q 207,378 207,366 Z" fill="none" stroke="url(#gold-bright-static)" strokeWidth="2.2" strokeLinejoin="round" />
                      <circle cx="220" cy="366" r="6" fill="none" stroke="url(#gold-bright-static)" strokeWidth="1.5" />
                      <line x1="220" y1="360" x2="220" y2="372" stroke="url(#gold-bright-static)" strokeWidth="1" />
                      <line x1="214" y1="366" x2="226" y2="366" stroke="url(#gold-bright-static)" strokeWidth="1" />

                      {/* Labels and bold value */}
                      <text x="265" y="354" fontSize="14" fontWeight="800" className="badge-heading gold-text" letterSpacing="1.5" opacity="0.95">CLUB MANAGED</text>
                      <text x="265" y="382" fontSize="28" fontWeight="900" className="badge-content white-text" letterSpacing="0.5">{playerData.clubManaged || "Atlético Nacional"}</text>
                    </g>
                  </g>

                  {/* 9. 3D Ribbon / Banner Overlay */}
                  <g filter="url(#drop-shadow-static)">
                    {/* Left ribbon shadow folded corner under center */}
                    <polygon points="175,615 175,655 150,635" fill="url(#gold-dark-static)" />
                    {/* Right ribbon shadow folded corner under center */}
                    <polygon points="625,615 625,655 650,635" fill="url(#gold-dark-static)" />

                    {/* Left side wing of ribbon (behind center, folded) */}
                    <path d="M 175,615 L 80,635 L 110,665 L 85,695 L 175,655 Z" fill="url(#ribbon-grad-static)" stroke="url(#gold-grad-static)" strokeWidth="2" />
                    {/* Right side wing of ribbon (behind center, folded) */}
                    <path d="M 625,615 L 720,635 L 690,665 L 715,695 L 625,655 Z" fill="url(#ribbon-grad-static)" stroke="url(#gold-grad-static)" strokeWidth="2" />

                    {/* Center plate of ribbon with gold boundaries */}
                    <path d="M 148,595 Q 400,565 652,595 L 642,675 Q 400,645 158,675 Z" fill="url(#ribbon-grad-static)" stroke="url(#gold-grad-static)" strokeWidth="3" />

                    {/* Text paths on ribbon curves */}
                    <path id="ribbon-text-path-static" d="M 160,635 Q 400,605 640,635" fill="none" />
                    <path id="ribbon-subtext-path-static" d="M 175,662 Q 400,632 625,662" fill="none" />

                    {/* Player CV Title text */}
                    <text fontSize="42" fontWeight="900" className="badge-content">
                      <textPath href="#ribbon-text-path-static" startOffset="50%" textAnchor="middle" fill="#FFFFFF">
                        Player CV
                      </textPath>
                    </text>

                    {/* Sub text: VERIFIED BY FOOTBALL COACH */}
                    <text fontSize="18" fontWeight="800" className="badge-heading" letterSpacing="3.5">
                      <textPath href="#ribbon-subtext-path-static" startOffset="50%" textAnchor="middle" fill="url(#gold-bright-static)">
                        VERIFIED BY FOOTBALL COACH
                      </textPath>
                    </text>
                  </g>

                  {/* 10. Center-Bottom Checkmark Coin Emblem with olive branches flanking */}
                  
                  {/* Left Laurel Olive wreath half */}
                  <use href="#wreath-half-static" transform="translate(400, 712) scale(0.60)" />
                  {/* Right Laurel Olive wreath half (Perfect Symmetrical Mirror) */}
                  <use href="#wreath-half-static" transform="translate(400, 712) scale(-0.60, 0.60)" />

                  {/* The Medal Checkmark Coin */}
                  <g filter="url(#drop-shadow-static)">
                    {/* Outer gold ring */}
                    <circle cx="400" cy="712" r="30" fill="url(#bg-radial-static)" stroke="url(#gold-grad-static)" strokeWidth="4.5" />
                    <circle cx="400" cy="712" r="24" fill="url(#bg-radial-static)" stroke="url(#gold-bright-static)" strokeWidth="1.2" opacity="0.6" />
                    
                    {/* Bold Metallic Checkmark */}
                    <path d="M 386,713 L 396,723 L 416,700" fill="none" stroke="url(#gold-bright-static)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>

                  {/* 11. Redundant bottom stars */}
                  <path d="M 400,728 L 400.00,728.00 L 402.65,734.36 L 409.51,734.91 L 404.28,739.39 L 405.88,746.09 L 400.00,742.50 L 394.12,746.09 L 395.72,739.39 L 390.49,734.91 L 397.35,734.36 Z" fill="url(#gold-bright-static)" />
                  <path d="M 478.9,720.66 L 478.90,720.66 L 480.96,725.83 L 486.51,726.19 L 482.23,729.74 L 483.60,735.13 L 478.90,732.16 L 474.20,735.13 L 475.57,729.74 L 471.29,726.19 L 476.84,725.83 Z" fill="url(#gold-bright-static)" />
                  <path d="M 321.1,720.66 L 321.10,720.66 L 323.16,725.83 L 328.71,726.19 L 324.43,729.74 L 325.80,735.13 L 321.10,732.16 L 316.40,735.13 L 317.77,729.74 L 313.49,726.19 L 319.04,725.83 Z" fill="url(#gold-bright-static)" />
                  <path d="M 553.45,694.16 L 553.45,694.16 L 555.21,698.73 L 560.11,699.00 L 556.30,702.09 L 557.56,706.82 L 553.45,704.16 L 549.34,706.82 L 550.60,702.09 L 546.79,699.00 L 551.69,698.73 Z" fill="url(#gold-bright-static)" />
                  <path d="M 246.55,694.16 L 246.55,694.16 L 248.31,698.73 L 253.21,699.00 L 249.40,702.09 L 250.66,706.82 L 246.55,704.16 L 242.44,706.82 L 243.70,702.09 L 239.89,699.00 L 244.79,698.73 Z" fill="url(#gold-bright-static)" />

                  {/* 12. Stamp year (2026) */}
                  <text x="400" y="768" fontSize="19" fontWeight="800" className="badge-heading gold-text" textAnchor="middle" letterSpacing="4.5">2026</text>
                </svg>

                {/* Not Verified Overlay */}
                {playerData.validationStatus !== "verified" && (
                  <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-3 z-20 backdrop-blur-xs rounded-xl">
                    <div className="text-[#E31B23] font-black uppercase text-[10px] tracking-widest mb-1.5 flex items-center gap-1">
                      <span>⚠️</span> Pending Validation
                    </div>
                    <p className="text-[8px] text-gray-400 max-w-[180px] text-center">
                      A coach must validate your CV details from the academy dashboard to unlock your certificate.
                    </p>
                  </div>
                )}
              </div>
            </div>


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

            {/* <div className="p-6">
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
            </div> */}


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
                Accomplishments
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
                        className="text-xs font-black text-primary/80 tracking-widest leading-relaxed uppercase"
                        inputClassName="text-xs font-black min-h-[30px] py-0.5 uppercase"
                      />
                      <CMSField
                        value={highlight.title}
                        onUpdate={(val) => handleUpdate(`careerHighlights.${idx}.title`, val)}
                        canEdit={canEditBio}
                        type="textarea"
                        className="text-sm md:text-base text-gray-400 leading-relaxed tracking-tight uppercase"
                        inputClassName="text-base font-black min-h-[40px] py-1 uppercase"
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
      {/* Certificate is not downloadable */}
    </>
  );
};

export default PlayerBioSection;
