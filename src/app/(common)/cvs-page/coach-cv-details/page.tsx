import ImageCarousel from "../../components/ImageCarousel";
import StartJourneySection from "../../components/StartJourneySection";
import AdditionalNotesSection from "../player-cv-details/components/AdditionalNotesSection";
import MyImagesSection from "../player-cv-details/components/MyImageSection";
import MyVideosSection from "../player-cv-details/components/MyVideoSection";
import FullEditableCv from "./components/FullEditableCv";

const CoachCVPage = () => {
  return (
    <div>
      <FullEditableCv/>
      <MyImagesSection/>
      <MyVideosSection/>
      <AdditionalNotesSection/>
      <ImageCarousel />
      <StartJourneySection />
    </div>
  );
};

export default CoachCVPage;
