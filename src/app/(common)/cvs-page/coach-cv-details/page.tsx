import React from "react";
import CoachBioSection from "./components/CoachBioSection";
import ImageCarousel from "../../components/ImageCarousel";
import StartJourneySection from "../../components/StartJourneySection";

const CoachCVPage = () => {
  return (
    <div>
      <CoachBioSection />
      <ImageCarousel/>
      <StartJourneySection/>
    </div>
  );
};

export default CoachCVPage;
