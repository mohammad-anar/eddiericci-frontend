"use client";
import React, { createContext, useContext, useState } from "react";
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

interface PlayerStatsContextType {
    bioRating: number;
    setBioRating: (v: number) => void;
    skillsAvg: number;
    setSkillsAvg: (v: number) => void;
    metricsAvg: number;
    setMetricsAvg: (v: number) => void;
    attributesAvg: number;
    setAttributesAvg: (v: number) => void;
}

export const PlayerStatsContext = createContext<PlayerStatsContextType | undefined>(undefined);

export const usePlayerStats = () => {
    const context = useContext(PlayerStatsContext);
    if (!context) throw new Error('usePlayerStats must be used within a PlayerStatsProvider');
    return context;
};

const FullEditablePage = () => {
    const [bioRating, setBioRating] = useState(94);
    const [skillsAvg, setSkillsAvg] = useState(85);
    const [metricsAvg, setMetricsAvg] = useState(88);
    const [attributesAvg, setAttributesAvg] = useState(82);

    return (
        <PlayerStatsContext.Provider value={{
            bioRating, setBioRating,
            skillsAvg, setSkillsAvg,
            metricsAvg, setMetricsAvg,
            attributesAvg, setAttributesAvg
        }}>
            <PlayerBioSection editable={true} />
            <ClubSection />
            <SkillsAttributes editable={true} />
            <PerformanceAnalytics  />
            <AttributesAnalysis editable={true} />
            <MetricsAnalysis editable={true} />
            <SportsAnalytics />
            <PlayerProfile editable={true} />
            <DocSection editable={true} />
            <MyImagesSection />
            <MyVideosSection />
            <AdditionalNotesSection editable={true} />
        </PlayerStatsContext.Provider>
    );
};

export default FullEditablePage;