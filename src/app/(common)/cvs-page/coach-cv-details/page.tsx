import ImageCarousel from "../../components/ImageCarousel";
import StartJourneySection from "../../components/StartJourneySection";
import CoachBioSection from "./components/CoachBioSection";

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
