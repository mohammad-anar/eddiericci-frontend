"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import AdditionalNotesSection from "./AdditionalNotesSection";
import AttributesAnalysis from "./AttributeAnalycies";
import ClubSection from "./ClubSection";
import DocSection from "./DocSection";
import { MetricsAnalysis } from "./MatricsAnalycies";
import MyImagesSection from "./MyImageSection";
import MyVideosSection from "./MyVideoSection";
import { PerformanceAnalytics } from "./PerformanceChart";
import PlayerBioSection from "./PlayerBioSection";
import PlayerProfile from "./PlayerProfile";
import { SkillsAttributes } from "./SkillAttributeSection";
import SportsAnalytics from "./SportsAnalycies";

type UserRole = "player" | "parent" | "coach" | "academy" | "club" | "agent" | "admin";

interface PlayerStatsContextType {
    bioRating: number;
    setBioRating: (v: number) => void;
    skillsAvg: number;
    setSkillsAvg: (v: number) => void;
    metricsAvg: number;
    setMetricsAvg: (v: number) => void;
    attributesAvg: number;
    setAttributesAvg: (v: number) => void;
    role: UserRole;
}

export const PlayerStatsContext = createContext<PlayerStatsContextType | undefined>(undefined);

export const usePlayerStats = () => {
    const context = useContext(PlayerStatsContext);
    if (!context) {
        return {
            bioRating: 0,
            setBioRating: () => {},
            skillsAvg: 0,
            setSkillsAvg: () => {},
            metricsAvg: 0,
            setMetricsAvg: () => {},
            attributesAvg: 0,
            setAttributesAvg: () => {},
            role: "player" as UserRole,
        };
    }
    return context;
};

export const PlayerStatsProvider = ({ children }: { children: React.ReactNode }) => {
    const [bioRating, setBioRating] = useState(94);
    const [skillsAvg, setSkillsAvg] = useState(85);
    const [metricsAvg, setMetricsAvg] = useState(88);
    const [attributesAvg, setAttributesAvg] = useState(82);
    const [role, setRole] = useState<UserRole>(() => {
        if (typeof window === "undefined") {
            return "player";
        }
        return (localStorage.getItem("userRole") as UserRole) || "player";
    });

    return (
        <PlayerStatsContext.Provider value={{
            bioRating, setBioRating,
            skillsAvg, setSkillsAvg,
            metricsAvg, setMetricsAvg,
            attributesAvg, setAttributesAvg,
            role
        }}>
            {children}
        </PlayerStatsContext.Provider>
    );
};

const FullEditablePage = ({ editable = false }: { editable?: boolean }) => {
    const { role } = usePlayerStats() || { role: 'player' }; 

    // Logic for role-based editability
    // Player/Parent can edit bio, profile, and documents/media
    const canEditBio = editable && (role === "player" || role === "parent");
    // Coach, Player, and Parent can edit evaluations
    const canEditEvaluations = editable && (role === "player" || role === "parent" || role === "coach");
    // Player/Parent can edit media
    const canEditMedia = editable && (role === "player" || role === "parent");

    return (
        <>
            <PlayerBioSection editable={editable} />
            <ClubSection />
            <SkillsAttributes editable={canEditEvaluations} />
            <PerformanceAnalytics />
            <AttributesAnalysis editable={canEditEvaluations} />
            <MetricsAnalysis editable={canEditEvaluations} />
            <SportsAnalytics editable={canEditEvaluations}/>
            <PlayerProfile editable={canEditBio} />
            <DocSection editable={canEditMedia} />
            <MyImagesSection editable={canEditMedia} />
            <MyVideosSection editable={canEditMedia} />
            <AdditionalNotesSection editable={canEditEvaluations} />
        </>
    );
};

const FullEditablePageWrapper = (props: { editable?: boolean }) => (
    <PlayerStatsProvider>
        <FullEditablePage {...props} />
    </PlayerStatsProvider>
);

export default FullEditablePageWrapper;