import React from "react";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import KeyFeatureSection from "./components/KeyFeatureSection";
import HowK10Works from "./components/HowK10Works";
import ChooseYourRoleSection from "./components/ChooseYourRoleSection";
import MembershipPlanSection from "./components/MembershipPlanSection";

const HomePage = () => {
  return (
    <>
      <HeroSection/>
      <StatsSection/>
      <KeyFeatureSection/>
      <StatsSection/>
      <HowK10Works/>
      <ChooseYourRoleSection/>
      <MembershipPlanSection/>
    </>
  );
};

export default HomePage;
