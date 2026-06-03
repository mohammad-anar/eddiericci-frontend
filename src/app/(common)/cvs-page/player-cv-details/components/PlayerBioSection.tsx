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
import { PencilIcon, Award, Printer, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { usePlayerStats } from "./FullEditablePage";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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

const getThemeClasses = (theme: string) => {
  switch (theme) {
    case 'neon':
      return {
        cardBorder: "border-2 border-[#00FF62]/40 shadow-[0_0_20px_rgba(0,255,98,0.2)]",
        cardBg: "bg-[#111111]",
        textColor: "text-[#00FF62]",
        titleColor: "text-white",
        subtitleColor: "text-gray-400",
        badgeBg: "bg-[#00FF62]/10 border-[#00FF62]/30 text-[#00FF62]",
        accentBorder: "border-[#00FF62]/30",
        accentText: "text-[#00FF62]",
        watermarkColor: "text-[#00FF62]/5",
      };
    case 'sapphire':
      return {
        cardBorder: "border-4 border-double border-[#1e40af]/60 shadow-[0_0_25px_rgba(30,58,138,0.25)]",
        cardBg: "bg-[#0b132b]",
        textColor: "text-[#60a5fa]",
        titleColor: "text-white",
        subtitleColor: "text-gray-400",
        badgeBg: "bg-blue-900/25 border-blue-500/30 text-[#60a5fa]",
        accentBorder: "border-[#1e40af]/30",
        accentText: "text-[#d4af37]",
        watermarkColor: "text-[#1e40af]/5",
      };
    case 'crimson':
      return {
        cardBorder: "border-2 border-[#E31B23]/40 shadow-[0_0_20px_rgba(227,27,35,0.2)]",
        cardBg: "bg-[#020202]",
        textColor: "text-[#E31B23]",
        titleColor: "text-white",
        subtitleColor: "text-gray-400",
        badgeBg: "bg-[#E31B23]/10 border-[#E31B23]/30 text-[#E31B23]",
        accentBorder: "border-[#E31B23]/30",
        accentText: "text-[#E31B23]",
        watermarkColor: "text-[#E31B23]/5",
      };
    case 'gold':
    default:
      return {
        cardBorder: "border-4 border-double border-[#d4af37]/60 shadow-[0_0_20px_rgba(212,175,55,0.1)]",
        cardBg: "bg-[#0a0a0a]",
        textColor: "text-[#d4af37]",
        titleColor: "text-white",
        subtitleColor: "text-gray-500",
        badgeBg: "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]",
        accentBorder: "border-white/5",
        accentText: "text-[#d4af37]",
        watermarkColor: "text-[#d4af37]/5",
      };
  }
};

const PlayerBioSection = ({ editable = true }: { editable?: boolean }) => {
  const { playerData, handleUpdate } = usePlayer();

  const { setBioRating, role } = usePlayerStats();

  // Canva Certificate Designer States
  const [certTheme, setCertTheme] = useState<'gold' | 'neon' | 'sapphire' | 'crimson'>('gold');
  const [certTitle, setCertTitle] = useState('CERTIFICATE OF CV VALIDATION');
  const [certSubtitle, setCertSubtitle] = useState('PROFESSIONAL ATHLETIC RECORD');
  const [certAcademyName, setCertAcademyName] = useState('EDDIE SOCCER ACADEMY');
  const [certCoachName, setCertCoachName] = useState('N/A');
  const [certClubName, setCertClubName] = useState('N/A');
  const [certDirectorName, setCertDirectorName] = useState('John Doe');
  const [certDirectorTitle, setCertDirectorTitle] = useState('Academy Director');
  const [certCoachSignName, setCertCoachSignName] = useState('Marcus Silva');
  const [certCoachTitle, setCertCoachTitle] = useState('Authorized Coach');
  const [certShowRating, setCertShowRating] = useState(true);
  const [certShowStats, setCertShowStats] = useState(true);
  const [certShowLogo, setCertShowLogo] = useState(true);
  const [certLogoPlacement, setCertLogoPlacement] = useState<'top' | 'bottom' | 'watermark'>('top');

  useEffect(() => {
    if (playerData) {
      setCertAcademyName(playerData.academyName || "EDDIE SOCCER ACADEMY");
      setCertCoachName(playerData.coachName || "N/A");
      setCertClubName(playerData.clubs?.[0]?.name || "N/A");
      setCertCoachSignName(playerData.coachName || "Marcus Silva");
    }
  }, [playerData]);

  const certificateRef = useRef<HTMLDivElement>(null);

  const getOffscreenThemeStyles = (theme: string) => {
    switch (theme) {
      case 'neon':
        return {
          containerBorder: "4px solid #00FF62",
          containerBg: "#111111",
          boxShadow: "0 0 25px rgba(0, 255, 98, 0.2)",
          textColor: "#00FF62",
          titleColor: "#ffffff",
          subtitleColor: "#a3a3a3",
          accentBorder: "1px solid rgba(0, 255, 98, 0.3)",
          accentText: "#00FF62",
        };
      case 'sapphire':
        return {
          containerBorder: "12px double #1e40af",
          containerBg: "#0b132b",
          boxShadow: "0 0 25px rgba(30, 58, 138, 0.3)",
          textColor: "#60a5fa",
          titleColor: "#ffffff",
          subtitleColor: "#a3a3a3",
          accentBorder: "1px solid rgba(30, 58, 138, 0.3)",
          accentText: "#d4af37",
        };
      case 'crimson':
        return {
          containerBorder: "4px solid #E31B23",
          containerBg: "#020202",
          boxShadow: "0 0 25px rgba(227, 27, 35, 0.2)",
          textColor: "#E31B23",
          titleColor: "#ffffff",
          subtitleColor: "#a3a3a3",
          accentBorder: "1px solid rgba(227, 27, 35, 0.3)",
          accentText: "#E31B23",
        };
      case 'gold':
      default:
        return {
          containerBorder: "12px double #d4af37",
          containerBg: "#0a0a0a",
          boxShadow: "0 0 35px rgba(212, 175, 55, 0.2)",
          textColor: "#d4af37",
          titleColor: "#ffffff",
          subtitleColor: "#6b7280",
          accentBorder: "1px solid rgba(255, 255, 255, 0.05)",
          accentText: "#d4af37",
        };
    }
  };

  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    try {
      toast.loading("Generating high-resolution PDF... Please wait.", { id: "pdf-gen" });
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1123, 794]
      });
      pdf.addImage(imgData, "PNG", 0, 0, 1123, 794);
      pdf.save(`certificate-${playerData.fullName.toLowerCase().replace(/\s+/g, "-")}.pdf`);
      toast.success("PDF Certificate downloaded successfully!", { id: "pdf-gen" });
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF. Please try printing/saving instead.", { id: "pdf-gen" });
    }
  };

  const handlePrintCustom = (settings: any) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let themeStyles = "";
    if (settings.theme === "neon") {
      themeStyles = `
        body { background-color: #0d0d0d; }
        .certificate-container {
          border: 4px solid #00FF62;
          background-color: #111111;
          box-shadow: 0 0 25px rgba(0, 255, 98, 0.2);
        }
        .academy-header { color: #00FF62; }
        .player-name { color: #00FF62; border-bottom: 2px solid #00FF62; }
        .highlight-text { color: #00FF62; }
        .detail-val { color: #00FF62; }
        .seal-decor { border: 2px solid #00FF62; color: #00FF62; }
      `;
    } else if (settings.theme === "sapphire") {
      themeStyles = `
        body { background-color: #050b18; }
        .certificate-container {
          border: 12px double #1e40af;
          background-color: #0b132b;
          box-shadow: 0 0 25px rgba(30, 58, 138, 0.3);
        }
        .academy-header { color: #60a5fa; }
        .player-name { color: #60a5fa; border-bottom: 2px solid #1e40af; }
        .highlight-text { color: #d4af37; }
        .detail-val { color: #60a5fa; }
        .seal-decor { border: 2px solid #1e40af; color: #60a5fa; }
      `;
    } else if (settings.theme === "crimson") {
      themeStyles = `
        body { background-color: #010101; }
        .certificate-container {
          border: 4px solid #E31B23;
          background-color: #020202;
          box-shadow: 0 0 25px rgba(227, 27, 35, 0.2);
        }
        .academy-header { color: #E31B23; }
        .player-name { color: #E31B23; border-bottom: 2px solid #E31B23; }
        .highlight-text { color: #E31B23; }
        .detail-val { color: #E31B23; }
        .seal-decor { border: 2px solid #E31B23; color: #E31B23; }
      `;
    } else {
      themeStyles = `
        body { background-color: #030303; }
        .certificate-container {
          border: 12px double #d4af37;
          background-color: #0a0a0a;
          box-shadow: 0 0 35px rgba(212, 175, 55, 0.2);
        }
        .academy-header { color: #d4af37; }
        .player-name { color: #d4af37; border-bottom: 2px solid #d4af37; }
        .highlight-text { color: #d4af37; }
        .detail-val { color: #d4af37; }
        .seal-decor { border: 2px solid #d4af37; color: #d4af37; }
      `;
    }

    const showLogo = settings.showLogo;
    const logoPlacement = settings.logoPlacement;

    let logoHtmlTop = "";
    let logoHtmlBottom = "";
    let logoHtmlWatermark = "";

    if (showLogo) {
      const logoTag = `<img src="/logo.png" alt="Website Logo" style="height: 35px; width: auto; object-fit: contain; margin-bottom: 5px;" />`;
      if (logoPlacement === "top") {
        logoHtmlTop = `<div style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center;">${logoTag}</div>`;
      } else if (logoPlacement === "bottom") {
        logoHtmlBottom = `<div style="margin-top: 15px; margin-bottom: 10px; display: flex; justify-content: center; align-items: center;">${logoTag}</div>`;
      } else if (logoPlacement === "watermark") {
        logoHtmlWatermark = `
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; pointer-events: none; z-index: 0; width: 450px; height: 450px; display: flex; justify-content: center; align-items: center;">
            <img src="/logo.png" style="width: 100%; height: auto; object-fit: contain;" />
          </div>
        `;
      }
    }

    let statsGridHtml = "";
    if (settings.showStats) {
      statsGridHtml = `
        <div style="display: flex; gap: 15px; justify-content: center; margin-top: 10px; margin-bottom: 10px; font-size: 10px; z-index: 10;">
          <span>PAC: <b>${playerData.strengths.pace}</b></span>
          <span>SHO: <b>${playerData.strengths.shooting}</b></span>
          <span>PAS: <b>${playerData.strengths.passing}</b></span>
          <span>DRI: <b>${playerData.strengths.dribbling}</b></span>
          <span>DEF: <b>${playerData.strengths.defending}</b></span>
          <span>PHY: <b>${playerData.strengths.physical}</b></span>
        </div>
      `;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate of Verification - ${playerData.fullName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@400;600&display=swap');
            body {
              margin: 0;
              padding: 20px;
              color: #ffffff;
              font-family: 'Inter', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              box-sizing: border-box;
            }
            .certificate-container {
              width: 800px;
              height: 560px;
              padding: 35px 45px;
              border-radius: 8px;
              box-sizing: border-box;
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              text-align: center;
              z-index: 5;
            }
            ${themeStyles}
            .academy-header {
              font-family: 'Cinzel', serif;
              font-size: 13px;
              font-weight: 700;
              letter-spacing: 4px;
              margin-top: 5px;
              z-index: 10;
            }
            .cert-title {
              font-family: 'Cinzel', serif;
              font-size: 24px;
              color: #ffffff;
              margin: 10px 0 3px 0;
              letter-spacing: 2px;
              z-index: 10;
            }
            .cert-subtitle {
              font-size: 10px;
              color: #888;
              margin-bottom: 12px;
              letter-spacing: 1px;
              z-index: 10;
            }
            .player-name {
              font-family: 'Playfair Display', serif;
              font-size: 32px;
              font-weight: 700;
              text-transform: uppercase;
              padding-bottom: 5px;
              margin-bottom: 12px;
              min-width: 320px;
              z-index: 10;
            }
            .cert-text {
              font-size: 12px;
              color: #cccccc;
              line-height: 1.5;
              max-width: 620px;
              margin-bottom: 15px;
              z-index: 10;
            }
            .details-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              width: 100%;
              border-top: 1px solid rgba(255,255,255,0.05);
              border-bottom: 1px solid rgba(255,255,255,0.05);
              padding: 10px 0;
              margin-bottom: 15px;
              z-index: 10;
            }
            .detail-item {
              display: flex;
              flex-direction: column;
              gap: 4px;
            }
            .detail-label {
              font-size: 8px;
              color: #666666;
              text-transform: uppercase;
              letter-spacing: 1.5px;
            }
            .detail-val {
              font-size: 11px;
              font-weight: 600;
            }
            .footer-signatures {
              display: flex;
              justify-content: space-between;
              width: 100%;
              padding: 0 30px;
              margin-top: 10px;
              z-index: 10;
            }
            .signature-block {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 180px;
            }
            .sig-font {
              font-family: 'Playfair Display', serif;
              font-style: italic;
              font-size: 16px;
              color: #d4af37;
              height: 25px;
              line-height: 25px;
            }
            .signature-line {
              border-top: 1px solid rgba(255, 255, 255, 0.2);
              width: 100%;
              margin-top: 5px;
              padding-top: 3px;
              font-size: 8px;
              color: #888888;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .seal-decor {
              position: absolute;
              bottom: 25px;
              left: 50%;
              transform: translateX(-50%);
              width: 45px;
              height: 45px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #0a0a0a;
              font-size: 14px;
              z-index: 10;
            }

            @media print {
              @page {
                size: A4 landscape;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
                background-color: #000000 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                height: 100vh !important;
              }
              .certificate-container {
                width: 297mm !important;
                height: 210mm !important;
                border-radius: 0 !important;
                margin: 0 !important;
                padding: 20mm 25mm !important;
                box-sizing: border-box !important;
                box-shadow: none !important;
                page-break-inside: avoid !important;
                position: relative !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: space-between !important;
                align-items: center !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            ${logoHtmlWatermark}
            
            <div style="width: 100%; display: flex; flex-direction: column; align-items: center; z-index: 10;">
              ${logoHtmlTop}
              <div class="academy-header">${settings.academyName}</div>
            </div>
            
            <div style="z-index: 10; margin-top: -5px;">
              <div class="cert-title">${settings.title}</div>
              <div class="cert-subtitle">${settings.subtitle}</div>
            </div>
            
            <div style="z-index: 10; margin-top: -5px;">
              <p style="font-size: 8px; font-style: italic; color: ${settings.theme === 'neon' ? '#888' : settings.theme === 'crimson' ? '#888' : settings.theme === 'sapphire' ? '#888' : '#555'}; margin: 0; text-transform: none;">This certifies the profile of</p>
              <div class="player-name" style="margin-top: 5px; margin-bottom: 5px;">${playerData.fullName}</div>
              <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: ${settings.theme === 'neon' ? '#00FF62' : settings.theme === 'crimson' ? '#E31B23' : settings.theme === 'sapphire' ? '#60a5fa' : '#d4af37'};">${getVeryShortPosition(playerData.position)}</div>
            </div>
            
            <div class="cert-text">
              This document officially validates that the athletic profile, performance stats, and position maps listed on this CV have been assessed and verified. The athlete has demonstrated an exceptional overall rating of <span class="highlight-text">${settings.showRating ? playerData.rating + ' OVR' : 'VALIDATED OVR'}</span> at the level of <span class="highlight-text">${getVeryShortPosition(playerData.position)}</span>.
            </div>
            
            ${statsGridHtml}
            
            <div class="details-grid">
              <div class="detail-item">
                <span class="detail-label">Current Club</span>
                <span class="detail-val">${settings.clubName}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Assigned Coach</span>
                <span class="detail-val">${settings.coachName}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Status</span>
                <span class="detail-val" style="color: #4ade80;">VERIFIED PROFILE</span>
              </div>
            </div>
            
            <div class="footer-signatures">
              <div class="signature-block">
                <div class="sig-font" style="color: ${settings.theme === 'neon' ? '#00FF62' : settings.theme === 'crimson' ? '#E31B23' : settings.theme === 'sapphire' ? '#60a5fa' : '#d4af37'}">${settings.directorName}</div>
                <div class="signature-line">${settings.directorTitle}</div>
              </div>
              
              ${logoHtmlBottom}
              
              <div class="signature-block">
                <div class="sig-font" style="color: ${settings.theme === 'neon' ? '#00FF62' : settings.theme === 'crimson' ? '#E31B23' : settings.theme === 'sapphire' ? '#60a5fa' : '#d4af37'}">${settings.coachSignName}</div>
                <div class="signature-line">${settings.coachTitle}</div>
              </div>
            </div>
            
            <div class="seal-decor">★</div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

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

  const styleBadges = [
    badge1,
    badge2,
    badge3,
    "https://cdn-icons-png.flaticon.com/128/5323/5323862.png", // whistle
    "https://cdn-icons-png.flaticon.com/128/3002/3002655.png", // tactics board
    "https://cdn-icons-png.flaticon.com/128/861/861506.png",    // trophy
    "https://cdn-icons-png.flaticon.com/128/33/33736.png",      // soccer ball
    "https://cdn-icons-png.flaticon.com/128/3126/3126588.png"   // strategy
  ];
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
                        idx === 0 ? "text-[10px] px-2 font-semibold border-primary/40 bg-primary/10 text-primary backdrop-blur-sm" : ""
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
                  {orderedSelectedStyles.map((style: any, index: number) => {
                    const badge = styleBadges[index % styleBadges.length];
                    const badgeSrc = typeof badge === "string" ? badge : badge.src;
                    return (
                      <div key={style.id} className="space-y-4">
                        <div className="flex justify-center">
                          <img
                            src={badgeSrc}
                            className="w-20 h-20 object-contain"
                            alt={style.label}
                          />
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
            <div className="p-6 border border-border/50 bg-[#151515] rounded-2xl relative overflow-hidden group hover:border-primary/20 transition-all">
              <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-4">
                Certification
              </h2>

              {/* Outer certificate container fitting the sidebar */}
              {(() => {
                const t = getThemeClasses(certTheme);
                return (
                  <div
                    className={cn(
                      "w-full aspect-[1.41] p-4 rounded-xl flex flex-col justify-between items-center text-center relative overflow-hidden select-none border-box shadow-md transition-all duration-300 text-[8px] md:text-[9px] min-h-[220px]",
                      t.cardBg,
                      t.cardBorder
                    )}
                  >
                    {/* Watermark Logo */}
                    {certShowLogo && certLogoPlacement === "watermark" && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 z-0">
                        <img src="/logo.png" alt="K10 Logo Watermark" className="w-[60%] h-auto object-contain" />
                      </div>
                    )}

                    {/* Header Section */}
                    <div className="w-full flex flex-col items-center gap-0.5 z-10">
                      {certShowLogo && certLogoPlacement === "top" && (
                        <img src="/logo.png" alt="K10 Logo Top" className="h-3.5 w-auto object-contain mb-0.5" />
                      )}
                      <p className={cn("text-[6px] font-bold uppercase tracking-[0.25em]", t.textColor)}>
                        {certAcademyName}
                      </p>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="z-10 -mt-1">
                      <h3 className={cn("text-[9px] font-heading font-black tracking-wider uppercase leading-none", t.titleColor)}>
                        {certTitle}
                      </h3>
                      <p className={cn("text-[5px] uppercase tracking-widest mt-0.5 leading-none", t.subtitleColor)}>
                        {certSubtitle}
                      </p>
                    </div>

                    {/* Athlete Name */}
                    <div className="z-10 -mt-1">
                      <p className={cn("text-[5px] italic leading-none", t.subtitleColor)}>This certifies the profile of</p>
                      <h4 className={cn("text-xs font-bold font-heading uppercase tracking-wide border-b pb-0.5 mt-0.5 px-4 inline-block leading-none", t.accentText, t.accentBorder)}>
                        {playerData.fullName}
                      </h4>
                      <p className={cn("text-[6px] font-medium mt-0.5 leading-none", t.titleColor)}>
                        {getVeryShortPosition(playerData.position)}
                      </p>
                    </div>

                    {/* Text Description */}
                    <p className={cn("text-[6px] max-w-[95%] leading-relaxed z-10", t.subtitleColor)}>
                      This document officially validates that the athletic profile, performance stats, and position maps listed on this CV have been assessed and verified. The athlete has demonstrated an exceptional overall rating of <span className={cn("font-bold", t.textColor)}>{certShowRating ? playerData.rating + ' OVR' : 'VALIDATED OVR'}</span> at the level of <span className={cn("font-bold", t.textColor)}>{getVeryShortPosition(playerData.position)}</span>.
                    </p>

                    {/* Technical Stats Block */}
                    {certShowStats && (
                      <div className={cn("flex gap-1.5 justify-center py-0.5 px-2 rounded bg-white/5 border text-[5.5px] leading-none z-10", t.accentBorder)}>
                        <span>PAC: <strong className={t.titleColor}>{playerData.strengths.pace}</strong></span>
                        <span>SHO: <strong className={t.titleColor}>{playerData.strengths.shooting}</strong></span>
                        <span>PAS: <strong className={t.titleColor}>{playerData.strengths.passing}</strong></span>
                        <span>DRI: <strong className={t.titleColor}>{playerData.strengths.dribbling}</strong></span>
                        <span>DEF: <strong className={t.titleColor}>{playerData.strengths.defending}</strong></span>
                        <span>PHY: <strong className={t.titleColor}>{playerData.strengths.physical}</strong></span>
                      </div>
                    )}

                    {/* Credentials Grid */}
                    <div className="w-full grid grid-cols-3 border-t border-b py-1 my-0.5 border-white/5 text-[6px] leading-none z-10">
                      <div className="flex flex-col">
                        <span className="text-[5px] text-gray-500 uppercase tracking-wider">Current Club</span>
                        <span className={cn("font-semibold truncate max-w-[80px] mx-auto", t.titleColor)}>{certClubName}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[5px] text-gray-500 uppercase tracking-wider">Assigned Coach</span>
                        <span className={cn("font-semibold truncate max-w-[80px] mx-auto", t.titleColor)}>{certCoachName}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[5px] text-gray-500 uppercase tracking-wider">Status</span>
                        <span className="font-semibold text-green-400">VERIFIED PROFILE</span>
                      </div>
                    </div>

                    {/* Signatures */}
                    <div className="w-full flex justify-between px-2 z-10">
                      <div className="flex flex-col items-center w-[60px]">
                        <span className={cn("font-heading italic text-[7px] leading-none", t.textColor)}>{certDirectorName}</span>
                        <span className="w-full border-t border-white/20 mt-0.5 pt-0.5 text-[5px] text-gray-500 uppercase tracking-wider leading-none">{certDirectorTitle}</span>
                      </div>

                      {certShowLogo && certLogoPlacement === "bottom" && (
                        <img src="/logo.png" alt="K10 Logo Bottom" className="h-3 w-auto object-contain self-end mb-0.5" />
                      )}

                      <div className="flex flex-col items-center w-[60px]">
                        <span className={cn("font-heading italic text-[7px] leading-none", t.textColor)}>{certCoachSignName}</span>
                        <span className="w-full border-t border-white/20 mt-0.5 pt-0.5 text-[5px] text-gray-500 uppercase tracking-wider leading-none">{certCoachTitle}</span>
                      </div>
                    </div>

                    {/* Gold Seal decoration */}
                    <div className={cn("absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border flex items-center justify-center text-[6px] font-bold bg-[#0a0a0a] z-10", t.cardBorder, t.textColor)}>
                      ★
                    </div>

                    {/* Not Verified Overlay */}
                    {playerData.validationStatus !== "verified" && (
                      <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-3 z-20 backdrop-blur-xs">
                        <div className="text-[#E31B23] font-black uppercase text-[10px] tracking-widest mb-1.5 flex items-center gap-1">
                          <span>⚠️</span> Pending Validation
                        </div>
                        <p className="text-[8px] text-gray-400 max-w-[180px]">
                          A coach must validate your CV details from the academy dashboard to unlock your certificate.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Action Buttons below the Certificate Preview */}
              {playerData.validationStatus === "verified" && (
                <div className="flex flex-col gap-2 mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-primary text-black font-bold h-8 text-xs hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl"
                        size="sm"
                      >
                        <Award size={14} /> Customize Certificate
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-5xl w-[95vw] h-[85vh] bg-[#0c0c0c] border border-border/40 text-white rounded-2xl flex flex-col p-0 overflow-hidden shadow-2xl">
                      <DialogHeader className="p-4 border-b border-border/20 bg-[#111111] flex flex-row items-center justify-between">
                        <DialogTitle className="text-md font-heading font-normal flex items-center gap-2">
                          <Award className="text-primary w-5 h-5" />
                          EDDIE Certificate Designer (Canva Edition)
                        </DialogTitle>
                      </DialogHeader>

                      <div className="flex-1 flex overflow-hidden">
                        {/* LEFT COLUMN: CONTROLS */}
                        <div className="w-[340px] bg-[#111111] border-r border-border/20 p-5 flex flex-col overflow-y-auto space-y-6 scrollbar-thin select-none">

                          {/* Themes */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">1. Select Template Theme</label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { id: 'gold', name: 'Classic Gold', color: 'bg-[#d4af37]', border: 'border-[#d4af37]' },
                                { id: 'neon', name: 'Futuristic Neon', color: 'bg-[#00FF62]', border: 'border-[#00FF62]' },
                                { id: 'sapphire', name: 'Royal Sapphire', color: 'bg-blue-600', border: 'border-blue-600' },
                                { id: 'crimson', name: 'Cyber Crimson', color: 'bg-[#E31B23]', border: 'border-[#E31B23]' }
                              ].map((t) => (
                                <button
                                  key={t.id}
                                  onClick={() => setCertTheme(t.id as any)}
                                  className={cn(
                                    "flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-all hover:bg-white/5",
                                    certTheme === t.id ? cn("bg-white/5", t.border) : "border-border/30 bg-transparent"
                                  )}
                                >
                                  <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", t.color)} />
                                  <span className="truncate">{t.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Certificate Details */}
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">2. Text & Credentials</label>

                            <div className="space-y-1.5">
                              <span className="text-[10px] text-gray-400">Certificate Title</span>
                              <Input
                                value={certTitle}
                                onChange={(e) => setCertTitle(e.target.value)}
                                className="bg-[#181818] border-border/40 text-xs h-8 rounded-lg"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <span className="text-[10px] text-gray-400">Subtitle</span>
                              <Input
                                value={certSubtitle}
                                onChange={(e) => setCertSubtitle(e.target.value)}
                                className="bg-[#181818] border-border/40 text-xs h-8 rounded-lg"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <span className="text-[10px] text-gray-400">Academy Name</span>
                              <Input
                                value={certAcademyName}
                                onChange={(e) => setCertAcademyName(e.target.value)}
                                className="bg-[#181818] border-border/40 text-xs h-8 rounded-lg"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <span className="text-[10px] text-gray-400">Assigned Coach</span>
                              <Input
                                value={certCoachName}
                                onChange={(e) => setCertCoachName(e.target.value)}
                                className="bg-[#181818] border-border/40 text-xs h-8 rounded-lg"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <span className="text-[10px] text-gray-400">Current Club</span>
                              <Input
                                value={certClubName}
                                onChange={(e) => setCertClubName(e.target.value)}
                                className="bg-[#181818] border-border/40 text-xs h-8 rounded-lg"
                              />
                            </div>
                          </div>

                          {/* Signatures */}
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">3. Signatures Config</label>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <span className="text-[9px] text-gray-400">Director Name</span>
                                <Input
                                  value={certDirectorName}
                                  onChange={(e) => setCertDirectorName(e.target.value)}
                                  className="bg-[#181818] border-border/40 text-[11px] h-7 rounded-lg px-2"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] text-gray-400">Director Title</span>
                                <Input
                                  value={certDirectorTitle}
                                  onChange={(e) => setCertDirectorTitle(e.target.value)}
                                  className="bg-[#181818] border-border/40 text-[11px] h-7 rounded-lg px-2"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <span className="text-[9px] text-gray-400">Coach Name</span>
                                <Input
                                  value={certCoachSignName}
                                  onChange={(e) => setCertCoachSignName(e.target.value)}
                                  className="bg-[#181818] border-border/40 text-[11px] h-7 rounded-lg px-2"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] text-gray-400">Coach Title</span>
                                <Input
                                  value={certCoachTitle}
                                  onChange={(e) => setCertCoachTitle(e.target.value)}
                                  className="bg-[#181818] border-border/40 text-[11px] h-7 rounded-lg px-2"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Toggle Elements */}
                          <div className="space-y-3 bg-white/5 p-3 rounded-lg border border-border/30">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">4. Certificate Elements</label>

                            <div className="flex items-center gap-2">
                              <Checkbox
                                id="showRating"
                                checked={certShowRating}
                                onCheckedChange={(val) => setCertShowRating(!!val)}
                                className="border-border/60"
                              />
                              <label htmlFor="showRating" className="text-xs text-gray-300 cursor-pointer">Show Overall Rating (OVR)</label>
                            </div>

                            <div className="flex items-center gap-2">
                              <Checkbox
                                id="showStats"
                                checked={certShowStats}
                                onCheckedChange={(val) => setCertShowStats(!!val)}
                                className="border-border/60"
                              />
                              <label htmlFor="showStats" className="text-xs text-gray-300 cursor-pointer">Show Technical Stats</label>
                            </div>

                            <div className="flex items-center gap-2">
                              <Checkbox
                                id="showLogo"
                                checked={certShowLogo}
                                onCheckedChange={(val) => setCertShowLogo(!!val)}
                                className="border-border/60"
                              />
                              <label htmlFor="showLogo" className="text-xs text-gray-300 cursor-pointer">Show Website Brand Logo</label>
                            </div>

                            {certShowLogo && (
                              <div className="space-y-1 pl-6 pt-1">
                                <span className="text-[9px] text-gray-400 block">Logo Placement</span>
                                <select
                                  value={certLogoPlacement}
                                  onChange={(e) => setCertLogoPlacement(e.target.value as any)}
                                  className="bg-[#181818] border border-border/40 text-xs h-7 rounded-lg px-2 w-full text-white outline-none focus:border-primary"
                                >
                                  <option value="top">Top Center</option>
                                  <option value="bottom">Bottom Center</option>
                                  <option value="watermark">As Watermark (Center)</option>
                                </select>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* RIGHT COLUMN: LIVE CANVAS PREVIEW */}
                        <div className="flex-1 bg-[#161616] p-6 flex flex-col items-center justify-between overflow-y-auto">

                          {/* Live Canvas Certificate */}
                          <div className="w-full flex items-center justify-center flex-1 my-2">
                            {(() => {
                              const t = getThemeClasses(certTheme);
                              return (
                                <div
                                  className={cn(
                                    "w-[640px] h-[448px] p-8 rounded-xl flex flex-col justify-between items-center text-center relative overflow-hidden select-none border-box shadow-xl transition-all duration-300 scale-90 md:scale-95 lg:scale-100",
                                    t.cardBg,
                                    t.cardBorder
                                  )}
                                >
                                  {/* Watermark Logo */}
                                  {certShowLogo && certLogoPlacement === "watermark" && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 z-0">
                                      <img src="/logo.png" alt="K10 Logo Watermark" className="w-[320px] h-auto object-contain" />
                                    </div>
                                  )}

                                  {/* Header Section */}
                                  <div className="w-full flex flex-col items-center gap-1 z-10">
                                    {certShowLogo && certLogoPlacement === "top" && (
                                      <img src="/logo.png" alt="K10 Logo Top" className="h-6 w-auto object-contain mb-1" />
                                    )}
                                    <p className={cn("text-[9px] font-bold uppercase tracking-[0.25em]", t.textColor)}>
                                      {certAcademyName}
                                    </p>
                                  </div>

                                  {/* Title & Subtitle */}
                                  <div className="z-10 mt-1">
                                    <h3 className={cn("text-lg font-heading font-black tracking-wider uppercase", t.titleColor)}>
                                      {certTitle}
                                    </h3>
                                    <p className={cn("text-[8px] uppercase tracking-widest mt-1", t.subtitleColor)}>
                                      {certSubtitle}
                                    </p>
                                  </div>

                                  {/* Athlete Name */}
                                  <div className="my-2 z-10">
                                    <p className={cn("text-[8px] italic", t.subtitleColor)}>This certifies the profile of</p>
                                    <h4 className={cn("text-2xl font-bold font-heading uppercase tracking-wide border-b pb-1 mt-1 px-8 inline-block", t.accentText, t.accentBorder)}>
                                      {playerData.fullName}
                                    </h4>
                                    <p className={cn("text-[10px] font-medium mt-1", t.titleColor)}>
                                      {getVeryShortPosition(playerData.position)}
                                    </p>
                                  </div>

                                  {/* Text Description */}
                                  <p className={cn("text-[10px] max-w-[500px] leading-relaxed z-10", t.subtitleColor)}>
                                    This document officially validates that the athletic profile, performance stats, and position maps listed on this CV have been assessed and verified. The athlete has demonstrated an exceptional overall rating of <span className={cn("font-bold", t.textColor)}>{certShowRating ? playerData.rating + ' OVR' : 'VALIDATED OVR'}</span> at the level of <span className={cn("font-bold", t.textColor)}>{getVeryShortPosition(playerData.position)}</span>.
                                  </p>

                                  {/* Technical Stats Block */}
                                  {certShowStats && (
                                    <div className={cn("flex gap-4 justify-center py-1.5 px-4 rounded-lg bg-white/5 border text-[9px] z-10", t.accentBorder)}>
                                      <span>PAC: <strong className={t.titleColor}>{playerData.strengths.pace}</strong></span>
                                      <span>SHO: <strong className={t.titleColor}>{playerData.strengths.shooting}</strong></span>
                                      <span>PAS: <strong className={t.titleColor}>{playerData.strengths.passing}</strong></span>
                                      <span>DRI: <strong className={t.titleColor}>{playerData.strengths.dribbling}</strong></span>
                                      <span>DEF: <strong className={t.titleColor}>{playerData.strengths.defending}</strong></span>
                                      <span>PHY: <strong className={t.titleColor}>{playerData.strengths.physical}</strong></span>
                                    </div>
                                  )}

                                  {/* Credentials Grid */}
                                  <div className="w-full grid grid-cols-3 border-t border-b py-2 my-1 border-white/5 text-[9px] z-10">
                                    <div className="flex flex-col">
                                      <span className="text-[7px] text-gray-500 uppercase tracking-wider">Current Club</span>
                                      <span className={cn("font-semibold truncate max-w-[120px] mx-auto", t.titleColor)}>{certClubName}</span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[7px] text-gray-500 uppercase tracking-wider">Assigned Coach</span>
                                      <span className={cn("font-semibold truncate max-w-[120px] mx-auto", t.titleColor)}>{certCoachName}</span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[7px] text-gray-500 uppercase tracking-wider">Status</span>
                                      <span className="font-semibold text-green-400">VERIFIED PROFILE</span>
                                    </div>
                                  </div>

                                  {/* Signatures */}
                                  <div className="w-full flex justify-between px-6 z-10">
                                    <div className="flex flex-col items-center w-[120px]">
                                      <span className={cn("font-heading italic text-[11px]", t.textColor)}>{certDirectorName}</span>
                                      <span className="w-full border-t border-white/20 mt-1 pt-1 text-[7px] text-gray-500 uppercase tracking-wider">{certDirectorTitle}</span>
                                    </div>

                                    {certShowLogo && certLogoPlacement === "bottom" && (
                                      <img src="/logo.png" alt="K10 Logo Bottom" className="h-6 w-auto object-contain self-end mb-1" />
                                    )}

                                    <div className="flex flex-col items-center w-[120px]">
                                      <span className={cn("font-heading italic text-[11px]", t.textColor)}>{certCoachSignName}</span>
                                      <span className="w-full border-t border-white/20 mt-1 pt-1 text-[7px] text-gray-500 uppercase tracking-wider">{certCoachTitle}</span>
                                    </div>
                                  </div>

                                  {/* Gold Seal decoration */}
                                  <div className={cn("absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold bg-[#0a0a0a] z-10", t.cardBorder, t.textColor)}>
                                    ★
                                  </div>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Control Bar Actions */}
                          <div className="w-full border-t border-border/20 pt-4 flex justify-end gap-3 mt-auto">
                            <DialogTrigger asChild>
                              <Button variant="ghost" className="text-gray-400 hover:text-white text-xs hover:bg-transparent">
                                Close Designer
                              </Button>
                            </DialogTrigger>
                            <Button
                              onClick={() => handlePrintCustom({
                                theme: certTheme,
                                title: certTitle,
                                subtitle: certSubtitle,
                                academyName: certAcademyName,
                                coachName: certCoachName,
                                clubName: certClubName,
                                directorName: certDirectorName,
                                directorTitle: certDirectorTitle,
                                coachSignName: certCoachSignName,
                                coachTitle: certCoachTitle,
                                showRating: certShowRating,
                                showStats: certShowStats,
                                showLogo: certShowLogo,
                                logoPlacement: certLogoPlacement
                              })}
                              className="bg-primary text-black font-bold text-xs px-6 hover:bg-primary/90 flex items-center gap-2 rounded-xl"
                            >
                              <Printer size={14} /> Print Certificate
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    onClick={handleDownloadPdf}
                    className="w-full bg-transparent hover:bg-white/5 border border-border/50 text-white font-bold h-8 text-xs flex items-center justify-center gap-2 rounded-xl"
                    size="sm"
                  >
                    <Download size={14} /> Download Certificate (A4 PDF)
                  </Button>
                </div>
              )}
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

      {/* Hidden high-res certificate container for direct PDF download */}
      <div
        ref={certificateRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '1123px',
          height: '794px',
          padding: '50px 60px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: getOffscreenThemeStyles(certTheme).containerBg,
          border: getOffscreenThemeStyles(certTheme).containerBorder,
          boxShadow: getOffscreenThemeStyles(certTheme).boxShadow,
          color: '#ffffff',
          fontFamily: 'Inter, sans-serif',
          zIndex: -100,
        }}
      >
        {/* Watermark Logo */}
        {certShowLogo && certLogoPlacement === "watermark" && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.05,
            pointerEvents: 'none',
            zIndex: 0
          }}>
            <img src="/logo.png" alt="K10 Logo Watermark" style={{ width: '450px', height: 'auto', objectFit: 'contain' }} />
          </div>
        )}

        {/* Header Section */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
          {certShowLogo && certLogoPlacement === "top" && (
            <img src="/logo.png" alt="K10 Logo Top" style={{ height: '40px', width: 'auto', objectFit: 'contain', marginBottom: '8px' }} />
          )}
          <p style={{
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            margin: 0,
            color: getOffscreenThemeStyles(certTheme).textColor
          }}>
            {certAcademyName}
          </p>
        </div>

        {/* Title & Subtitle */}
        <div style={{ zIndex: 10, marginTop: '-10px' }}>
          <h3 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '28px',
            fontWeight: 900,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: '0 0 4px 0',
            color: getOffscreenThemeStyles(certTheme).titleColor
          }}>
            {certTitle}
          </h3>
          <p style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            margin: 0,
            color: getOffscreenThemeStyles(certTheme).subtitleColor
          }}>
            {certSubtitle}
          </p>
        </div>

        {/* Athlete Name */}
        <div style={{ zIndex: 10, marginTop: '-10px' }}>
          <p style={{ fontSize: '11px', fontStyle: 'italic', margin: 0, color: getOffscreenThemeStyles(certTheme).subtitleColor }}>This certifies the profile of</p>
          <h4 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '36px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: `2px solid ${getOffscreenThemeStyles(certTheme).textColor}`,
            paddingBottom: '8px',
            marginTop: '8px',
            paddingLeft: '32px',
            paddingRight: '32px',
            display: 'inline-block',
            margin: 0,
            color: getOffscreenThemeStyles(certTheme).accentText
          }}>
            {playerData.fullName}
          </h4>
          <p style={{
            fontSize: '14px',
            fontWeight: 600,
            marginTop: '8px',
            margin: 0,
            color: getOffscreenThemeStyles(certTheme).titleColor
          }}>
            {getVeryShortPosition(playerData.position)}
          </p>
        </div>

        {/* Text Description */}
        <p style={{
          fontSize: '14px',
          maxWidth: '850px',
          lineHeight: '1.6',
          margin: 0,
          zIndex: 10,
          color: getOffscreenThemeStyles(certTheme).subtitleColor
        }}>
          This document officially validates that the athletic profile, performance stats, and position maps listed on this CV have been assessed and verified. The athlete has demonstrated an exceptional overall rating of <span style={{ fontWeight: 'bold', color: getOffscreenThemeStyles(certTheme).textColor }}>{certShowRating ? playerData.rating + ' OVR' : 'VALIDATED OVR'}</span> at the level of <span style={{ fontWeight: 'bold', color: getOffscreenThemeStyles(certTheme).textColor }}>{getVeryShortPosition(playerData.position)}</span>.
        </p>

        {/* Technical Stats Block */}
        {certShowStats && (
          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            padding: '10px 24px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: getOffscreenThemeStyles(certTheme).accentBorder,
            fontSize: '13px',
            zIndex: 10
          }}>
            <span>PAC: <strong style={{ color: getOffscreenThemeStyles(certTheme).titleColor }}>{playerData.strengths.pace}</strong></span>
            <span>SHO: <strong style={{ color: getOffscreenThemeStyles(certTheme).titleColor }}>{playerData.strengths.shooting}</strong></span>
            <span>PAS: <strong style={{ color: getOffscreenThemeStyles(certTheme).titleColor }}>{playerData.strengths.passing}</strong></span>
            <span>DRI: <strong style={{ color: getOffscreenThemeStyles(certTheme).titleColor }}>{playerData.strengths.dribbling}</strong></span>
            <span>DEF: <strong style={{ color: getOffscreenThemeStyles(certTheme).titleColor }}>{playerData.strengths.defending}</strong></span>
            <span>PHY: <strong style={{ color: getOffscreenThemeStyles(certTheme).titleColor }}>{playerData.strengths.physical}</strong></span>
          </div>
        )}

        {/* Credentials Grid */}
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '14px 0',
          margin: '10px 0',
          fontSize: '13px',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Current Club</span>
            <span style={{ fontWeight: 'semibold', color: getOffscreenThemeStyles(certTheme).titleColor }}>{certClubName}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Assigned Coach</span>
            <span style={{ fontWeight: 'semibold', color: getOffscreenThemeStyles(certTheme).titleColor }}>{certCoachName}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</span>
            <span style={{ fontWeight: 'semibold', color: '#4ade80' }}>VERIFIED PROFILE</span>
          </div>
        </div>

        {/* Signatures */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 40px', boxSizing: 'border-box', zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '180px' }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px', color: getOffscreenThemeStyles(certTheme).textColor }}>{certDirectorName}</span>
            <span style={{ width: '100%', borderTop: '1px solid rgba(255, 255, 255, 0.2)', marginTop: '8px', paddingTop: '4px', fontSize: '10px', color: '#888888', textTransform: 'uppercase', letterSpacing: '1px' }}>{certDirectorTitle}</span>
          </div>

          {certShowLogo && certLogoPlacement === "bottom" && (
            <img src="/logo.png" alt="K10 Logo Bottom" style={{ height: '35px', width: 'auto', objectFit: 'contain', alignSelf: 'flex-end', marginBottom: '8px' }} />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '180px' }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px', color: getOffscreenThemeStyles(certTheme).textColor }}>{certCoachSignName}</span>
            <span style={{ width: '100%', borderTop: '1px solid rgba(255, 255, 255, 0.2)', marginTop: '8px', paddingTop: '4px', fontSize: '10px', color: '#888888', textTransform: 'uppercase', letterSpacing: '1px' }}>{certCoachTitle}</span>
          </div>
        </div>

        {/* Gold Seal decoration */}
        <div style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          border: `2px solid ${getOffscreenThemeStyles(certTheme).textColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          fontSize: '16px',
          fontWeight: 'bold',
          color: getOffscreenThemeStyles(certTheme).textColor,
          zIndex: 10
        }}>
          ★
        </div>
      </div>
    </>
  );
};

export default PlayerBioSection;
