"use client";

import React, { useState, useMemo } from "react";
import {
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconEye,
  IconBell,
  IconX,
  IconDownload,
  IconShield,
  IconUser,
  IconStar,
  IconTrophy,
  IconMapPin,
  IconPhone,
  IconMail,
  IconBallFootball,
  IconLoader2,
  IconCheck,
} from "@tabler/icons-react";
import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { PlayerStateItem } from "@/lib/features/player/playerSlice";
import { toast } from "sonner";

// ─── CV Tier calculation ───────────────────────────────────────────────────
type CvTier = "Gold" | "Silver" | "Bronze";

function getCvTier(rating: number): CvTier {
  if (rating >= 80) return "Gold";
  if (rating >= 60) return "Silver";
  return "Bronze";
}

const TIER_STYLES: Record<CvTier, { label: string; color: string; border: string; bg: string; glow: string }> = {
  Gold:   { label: "GOLD",   color: "text-[#FBBF24]", border: "border-[#FBBF24]/40", bg: "bg-[#FBBF24]/10", glow: "shadow-[0_0_16px_rgba(251,191,36,0.25)]" },
  Silver: { label: "SILVER", color: "text-[#CBD5E1]", border: "border-[#CBD5E1]/40", bg: "bg-[#CBD5E1]/10", glow: "shadow-[0_0_16px_rgba(203,213,225,0.15)]" },
  Bronze: { label: "BRONZE", color: "text-[#F97316]", border: "border-[#F97316]/40", bg: "bg-[#F97316]/10", glow: "shadow-[0_0_16px_rgba(249,115,22,0.15)]" },
};

// ─── Player type based on position ────────────────────────────────────────
function getPlayerType(position: string): string {
  const p = position.toLowerCase();
  if (p.includes("goalkeeper") || p === "gk") return "Goalkeeper";
  if (p.includes("defender") || p.includes("back") || p.includes("cb") || p.includes("lb") || p.includes("rb")) return "Defender";
  if (p.includes("midfielder") || p.includes("mid") || p.includes("cm") || p.includes("dm") || p.includes("am")) return "Midfielder";
  if (p.includes("forward") || p.includes("striker") || p.includes("winger") || p.includes("cf") || p.includes("lw") || p.includes("rw")) return "Forward";
  return "Field Player";
}

function getPositionCode(position: string): string {
  const p = position.toLowerCase();
  if (p.includes("goalkeeper")) return "GK";
  if (p.includes("defensive mid")) return "CDM";
  if (p.includes("center back") || p.includes("cb")) return "CB";
  if (p.includes("left back")) return "LB";
  if (p.includes("right back")) return "RB";
  if (p.includes("midfielder")) return "CM";
  if (p.includes("forward") || p.includes("striker")) return "ST";
  if (p.includes("winger")) return "LW";
  if (p.includes("defender")) return "CB";
  return "MF";
}

const VALIDATION_BADGE: Record<string, { label: string; color: string; border: string; bg: string }> = {
  verified: { label: "Verified",   color: "text-[#4ADE80]", border: "border-[#4ADE80]/30", bg: "bg-[#4ADE80]/10" },
  pending:  { label: "Pending",    color: "text-[#FBBF24]", border: "border-[#FBBF24]/30", bg: "bg-[#FBBF24]/10" },
  expired:  { label: "Expired",    color: "text-[#EF4444]", border: "border-[#EF4444]/30", bg: "bg-[#EF4444]/10" },
  not_needed: { label: "N/A",      color: "text-white/40",  border: "border-white/10",     bg: "bg-white/5" },
};

// ─── CV Detail Dialog ──────────────────────────────────────────────────────
function CvDetailDialog({
  player,
  onClose,
}: {
  player: PlayerStateItem;
  onClose: () => void;
}) {
  const [notifying, setNotifying] = useState(false);
  const [notified, setNotified] = useState(false);
  const tier = getCvTier(player.rating);
  const tierStyle = TIER_STYLES[tier];

  const handleNotifyCoach = async () => {
    if (notified) return;
    setNotifying(true);
    const coachName = player.coachName || "the assigned coach";
    const tid = toast.loading(`Sending validation request to ${coachName}...`);
    await new Promise((r) => setTimeout(r, 1600));
    toast.success(`Validation request sent to ${coachName}! They will review ${player.fullName}'s CV shortly.`, { id: tid, duration: 5000 });
    setNotifying(false);
    setNotified(true);
  };

  const strengths = player.strengths ?? { pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0 };
  const attrs = [
    { label: "Pace",      value: strengths.pace      },
    { label: "Shooting",  value: strengths.shooting   },
    { label: "Passing",   value: strengths.passing    },
    { label: "Dribbling", value: strengths.dribbling  },
    { label: "Defending", value: strengths.defending  },
    { label: "Physical",  value: strengths.physical   },
  ];

  const posCode   = getPositionCode(player.position);
  const pType     = getPlayerType(player.position);
  const imgSrc    = typeof player.playerImage === "string" ? player.playerImage : player.playerImage?.src || "/ronaldo.png";
  const completion = Math.min(100, Math.round((player.rating / 100) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative bg-[#0a0a0a] border border-white/15 rounded-[32px] w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Dialog Header */}
        <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-white/10 px-8 py-5 flex items-center justify-between rounded-t-[32px]">
          <div className="flex items-center gap-4">
            <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${tierStyle.bg} ${tierStyle.border} ${tierStyle.color}`}>
              {tier} CV
            </div>
            <h2 className="text-xl font-black uppercase text-white font-orbitron tracking-tight">{player.fullName}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleNotifyCoach}
              disabled={notifying || notified}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer disabled:cursor-default border ${
                notified
                  ? "bg-[#4ADE80]/10 border-[#4ADE80]/30 text-[#4ADE80]"
                  : "bg-[#E31B23] hover:bg-[#C2181F] border-[#E31B23]/40 text-white shadow-lg shadow-[#E31B23]/20"
              }`}
            >
              {notifying ? (
                <><IconLoader2 size={16} className="animate-spin" /> Sending...</>
              ) : notified ? (
                <><IconCheck size={16} /> Coach Notified</>
              ) : (
                <><IconBell size={16} /> Notify Coach</>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
            >
              <IconX size={18} />
            </button>
          </div>
        </div>

        {/* CV Body */}
        <div className="p-8 flex flex-col gap-8">
          {/* Hero Banner */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-3xl border border-white/10 overflow-hidden min-h-[220px] flex items-end">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute right-0 bottom-0 h-full w-1/3 flex items-end justify-end opacity-80 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgSrc} alt={player.fullName} className="h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]" />
            </div>
            {/* Tier glow */}
            <div className={`absolute top-6 right-6 w-24 h-24 rounded-full blur-3xl opacity-40 ${tier === "Gold" ? "bg-[#FBBF24]" : tier === "Silver" ? "bg-[#CBD5E1]" : "bg-[#F97316]"}`} />
            <div className="relative p-8 flex flex-col gap-4">
              {/* Rating badge */}
              <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 ${tier === "Gold" ? "border-[#FBBF24] bg-[#FBBF24]/10" : tier === "Silver" ? "border-[#CBD5E1] bg-[#CBD5E1]/10" : "border-[#F97316] bg-[#F97316]/10"}`}>
                <span className={`text-3xl font-black font-orbitron leading-none ${tierStyle.color}`}>{player.rating}</span>
                <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">OVR</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#E31B23] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{posCode}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${tierStyle.bg} ${tierStyle.border} ${tierStyle.color}`}>{tier}</span>
                </div>
                <h3 className="text-4xl font-black uppercase text-white font-orbitron tracking-tighter leading-none">{player.fullName}</h3>
                <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest mt-1">
                  {player.position} · {player.birthCountry} · {pType}
                </p>
              </div>
            </div>
          </div>

          {/* Stats + Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attributes */}
            <div className="bg-[#111111] rounded-2xl border border-white/10 p-6 flex flex-col gap-5">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-white/60">Performance Attributes</h4>
              <div className="flex flex-col gap-4">
                {attrs.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">{label}</span>
                      <span className="text-sm font-black text-white font-orbitron">{value}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${tier === "Gold" ? "bg-[#FBBF24]" : tier === "Silver" ? "bg-[#CBD5E1]" : "bg-[#F97316]"}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Player Profile Info */}
            <div className="flex flex-col gap-4">
              {/* CV Tier & Completion */}
              <div className={`bg-[#111111] rounded-2xl border p-5 flex flex-col gap-3 ${tierStyle.border} ${tierStyle.glow}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/60">CV Tier Status</span>
                  <span className={`text-2xl font-black font-orbitron uppercase ${tierStyle.color}`}>{tier}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${tier === "Gold" ? "bg-[#FBBF24]" : tier === "Silver" ? "bg-[#CBD5E1]" : "bg-[#F97316]"}`}
                    style={{ width: `${completion}%` }}
                  />
                </div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">
                  {completion}% profile completeness · {tier === "Gold" ? "Elite recruit status" : tier === "Silver" ? "Good potential – improving" : "Developing – needs attention"}
                </p>
              </div>

              {/* Player Details */}
              <div className="bg-[#111111] rounded-2xl border border-white/10 p-5 flex flex-col gap-3">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-white/60">Player Profile</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <IconUser size={14} />,        label: "Type",       value: pType },
                    { icon: <IconBallFootball size={14} />, label: "Position",   value: player.position },
                    { icon: <IconMapPin size={14} />,       label: "Nation",     value: player.birthCountry },
                    { icon: <IconStar size={14} />,         label: "Validation", value: VALIDATION_BADGE[player.validationStatus]?.label ?? "N/A" },
                    { icon: <IconPhone size={14} />,        label: "Phone",      value: player.phone || "N/A" },
                    { icon: <IconMail size={14} />,         label: "Email",      value: player.email || "N/A" },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2">
                      <div className="text-white/30 mt-0.5">{icon}</div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{label}</p>
                        <p className="text-[11px] font-bold text-white truncate max-w-[120px]">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academy + Coach */}
              <div className="bg-[#111111] rounded-2xl border border-white/10 p-5 flex flex-col gap-3">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-white/60">Academy & Coach</h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#E31B23]/10 border border-[#E31B23]/20 flex items-center justify-center">
                      <IconShield size={14} className="text-[#E31B23]" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Academy</p>
                      <p className="text-[11px] font-bold text-white">{player.academyName || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <IconTrophy size={14} className="text-[#FBBF24]" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Coach</p>
                      <p className="text-[11px] font-bold text-white">{player.coachName || "Unassigned"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notify Coach CTA Section */}
          <div className="bg-gradient-to-r from-[#E31B23]/5 to-transparent border border-[#E31B23]/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-black uppercase text-white font-orbitron tracking-tight">Request Coach Validation</h4>
              <p className="text-[11px] text-white/50 font-bold mt-1 uppercase tracking-widest">
                Send a validation request to {player.coachName || "the assigned coach"} to review and approve this CV
              </p>
            </div>
            <button
              onClick={handleNotifyCoach}
              disabled={notifying || notified}
              className={`shrink-0 flex items-center gap-2 px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer disabled:cursor-default border ${
                notified
                  ? "bg-[#4ADE80]/10 border-[#4ADE80]/30 text-[#4ADE80]"
                  : "bg-[#E31B23] hover:bg-[#C2181F] border-[#E31B23]/40 text-white shadow-lg shadow-[#E31B23]/20"
              }`}
            >
              {notifying ? (
                <><IconLoader2 size={16} className="animate-spin" /> Sending...</>
              ) : notified ? (
                <><IconCheck size={16} /> Notification Sent</>
              ) : (
                <><IconBell size={16} /> Notify Coach</>
              )}
            </button>
          </div>

          {/* Season Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Matches",     value: player.seasonStats?.matches   ?? 0 },
              { label: "Goals",       value: player.seasonStats?.goals     ?? 0 },
              { label: "Assists",     value: player.seasonStats?.assists   ?? 0 },
              { label: "Avg Rating",  value: player.seasonStats?.avgRating ?? 0 },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#111111] rounded-2xl border border-white/10 p-5 text-center">
                <p className="text-2xl font-black text-white font-orbitron">{value}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
const GenerateCv = () => {
  const players = useAppSelector((state) => state.player.players);

  const [searchTerm, setSearchTerm]       = useState("");
  const [tierFilter, setTierFilter]       = useState<"All" | CvTier>("All");
  const [typeFilter, setTypeFilter]       = useState("All");
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStateItem | null>(null);

  const playerTypes = useMemo(() => {
    const types = new Set(players.map((p) => getPlayerType(p.position)));
    return ["All", ...Array.from(types)];
  }, [players]);

  const filtered = useMemo(() => {
    return players.filter((p) => {
      const tier = getCvTier(p.rating);
      const type = getPlayerType(p.position);
      const term = searchTerm.toLowerCase();
      const matchesSearch = !term || p.fullName.toLowerCase().includes(term) || p.position.toLowerCase().includes(term) || p.birthCountry.toLowerCase().includes(term);
      const matchesTier   = tierFilter === "All" || tier === tierFilter;
      const matchesType   = typeFilter === "All" || type === typeFilter;
      return matchesSearch && matchesTier && matchesType;
    });
  }, [players, searchTerm, tierFilter, typeFilter]);

  const stats = useMemo(() => {
    const gold   = players.filter((p) => getCvTier(p.rating) === "Gold").length;
    const silver = players.filter((p) => getCvTier(p.rating) === "Silver").length;
    const bronze = players.filter((p) => getCvTier(p.rating) === "Bronze").length;
    return { gold, silver, bronze, total: players.length };
  }, [players]);

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Generate CV</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Player CV library — view, manage, and notify coaches</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/15 text-white/60 hover:text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all font-bold cursor-pointer">
          <IconDownload size={18} />
          <span className="text-[11px] font-black uppercase tracking-widest">Export All</span>
        </button>
      </div>

      {/* Tier Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { label: "Total Players", value: stats.total, color: "text-white",         border: "border-white/15", bg: "bg-white/5" },
          { label: "Gold CVs",      value: stats.gold,  color: "text-[#FBBF24]",    border: "border-[#FBBF24]/30", bg: "bg-[#FBBF24]/5" },
          { label: "Silver CVs",    value: stats.silver,color: "text-[#CBD5E1]",    border: "border-[#CBD5E1]/30", bg: "bg-[#CBD5E1]/5" },
          { label: "Bronze CVs",    value: stats.bronze,color: "text-[#F97316]",    border: "border-[#F97316]/30", bg: "bg-[#F97316]/5" },
        ].map(({ label, value, color, border, bg }) => (
          <div key={label} className={`bg-[#111111] rounded-[28px] border ${border} p-6 flex flex-col gap-2 shadow-xl`}>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</p>
            <p className={`text-4xl font-black font-orbitron ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[#111111] rounded-3xl border border-white/15 p-4 flex flex-col md:flex-row gap-4 shadow-xl">
        <div className="relative flex-1">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input
            type="text"
            placeholder="Search by name, position, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/15 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-all"
          />
        </div>
        <div className="flex gap-3">
          {/* Tier Filter */}
          <div className="relative">
            <IconFilter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as "All" | CvTier)}
              className="bg-white/5 border border-white/15 rounded-2xl py-3 pl-9 pr-8 text-[11px] font-bold text-white/60 focus:outline-none focus:border-white/25 transition-all cursor-pointer appearance-none"
            >
              <option value="All">All Tiers</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
            <IconChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
          </div>
          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white/5 border border-white/15 rounded-2xl py-3 px-4 pr-8 text-[11px] font-bold text-white/60 focus:outline-none focus:border-white/25 transition-all cursor-pointer appearance-none"
            >
              {playerTypes.map((t) => (
                <option key={t} value={t}>{t === "All" ? "All Positions" : t}</option>
              ))}
            </select>
            <IconChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Players Table */}
      <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase text-white font-orbitron">Player CVs ({filtered.length})</h2>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Click &ldquo;View CV&rdquo; to open full profile</span>
        </div>

        <div className="rounded-2xl border border-white/15 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/15 bg-white/[0.01]">
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15">Player</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Rating</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">CV Tier</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Type</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Position</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Validation</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Coach</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, index) => {
                const tier      = getCvTier(p.rating);
                const tierStyle = TIER_STYLES[tier];
                const pType     = getPlayerType(p.position);
                const vBadge    = VALIDATION_BADGE[p.validationStatus] ?? VALIDATION_BADGE.not_needed;
                const imgSrc    = typeof p.playerImage === "string" ? p.playerImage : p.playerImage?.src || "/ronaldo.png";

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-white/[0.02] transition-colors group ${index !== filtered.length - 1 ? "border-b border-white/15" : ""}`}
                  >
                    {/* Player */}
                    <td className="py-4 px-6 border-r border-white/15">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 shrink-0 bg-white/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imgSrc} alt={p.fullName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white whitespace-nowrap">{p.fullName}</p>
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{p.birthCountry}</p>
                        </div>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className={`text-xl font-black font-orbitron ${tierStyle.color}`}>{p.rating}</span>
                    </td>

                    {/* CV Tier */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${tierStyle.bg} ${tierStyle.border} ${tierStyle.color}`}>
                        {tier}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className="text-[11px] font-bold text-white/60">{pType}</span>
                    </td>

                    {/* Position */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className="text-[11px] font-bold text-white/60 whitespace-nowrap">{p.position}</span>
                    </td>

                    {/* Validation */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${vBadge.bg} ${vBadge.border} ${vBadge.color}`}>
                        {vBadge.label}
                      </span>
                    </td>

                    {/* Coach */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className="text-[11px] font-bold text-white/60 whitespace-nowrap">{p.coachName || "Unassigned"}</span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedPlayer(p)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/50 hover:text-white transition-all cursor-pointer text-[10px] font-black uppercase tracking-widest"
                        >
                          <IconEye size={14} />
                          View CV
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-white/40 text-sm font-medium">
                    No player CVs match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CV Detail Dialog */}
      {selectedPlayer && (
        <CvDetailDialog
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
};

export default GenerateCv;