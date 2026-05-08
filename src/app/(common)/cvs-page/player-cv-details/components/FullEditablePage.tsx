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
    const [role, setRole] = useState<UserRole>("player");

    useEffect(() => {
        const userRole = localStorage.getItem("userRole") as UserRole;
        if (userRole) {
            setRole(userRole);
        }
    }, []);

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
    const { role } = usePlayerStats() || { role: 'player' }; // Fallback if context not yet initialized

    // Logic for role-based editability
    const canEditBio = editable && (role === "player" || role === "parent" || role === "admin");
    const canEditEvaluations = editable && (role === "player" || role === "parent" || role === "coach" || role === "admin");
    const canEditMedia = editable && (role === "player" || role === "parent" || role === "admin");

    return (
        <>
            <PlayerBioSection editable={canEditBio} />
            <ClubSection />
            <SkillsAttributes editable={canEditEvaluations} />
            <PerformanceAnalytics />
            <AttributesAnalysis editable={canEditEvaluations} />
            <MetricsAnalysis editable={canEditEvaluations} />
            <SportsAnalytics />
            <PlayerProfile editable={canEditBio} />
            <DocSection editable={canEditMedia} />
            <MyImagesSection />
            <MyVideosSection />
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