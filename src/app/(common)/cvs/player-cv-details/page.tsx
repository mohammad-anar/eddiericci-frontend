import React from "react";
import PlayerBioSection from "./components/PlayerBioSection";
import ClubSection from "./components/ClubSection";
import { SkillsAttributes } from "./components/SkillAttributeSection";
import { PerformanceAnalytics } from "./components/PerformanceChart";
import AttributesAnalysis from "./components/AttributeAnalycies";
import ImageCarousel from "../../components/ImageCarousel";
import StartJourneySection from "../../components/StartJourneySection";
import { MetricsAnalysis } from "./components/MatricsAnalycies";
import SportsAnalytics from "./components/SportsAnalycies";
import PlayerProfile from "./components/PlayerProfile";
import DocSection from "./components/DocSection";
import MyImagesSection from "./components/MyImageSection";

const PlayerCvDetailsPage = () => {
  return (
    <>
      <PlayerBioSection />
      <ClubSection />
      <SkillsAttributes/>
      <PerformanceAnalytics/>
      <AttributesAnalysis/>
      <MetricsAnalysis/>
      <SportsAnalytics/>
      <PlayerProfile/>
      <DocSection/>
      <MyImagesSection/>
      <ImageCarousel/>
      <StartJourneySection/>
    </>
  );
};

export default PlayerCvDetailsPage;
