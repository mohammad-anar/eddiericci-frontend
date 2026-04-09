import React from "react";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import KeyFeatureSection from "./components/KeyFeatureSection";

const HomePage = () => {
  return (
    <>
      <HeroSection/>
      <StatsSection/>
      <KeyFeatureSection/>
      <StatsSection/>
    </>
  );
};

export default HomePage;
