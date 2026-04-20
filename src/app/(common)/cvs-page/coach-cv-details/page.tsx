import ImageCarousel from "../../components/ImageCarousel";
import StartJourneySection from "../../components/StartJourneySection";
import AdditionalNotesSection from "../player-cv-details/components/AdditionalNotesSection";
import DocSection from "../player-cv-details/components/DocSection";
import MyImagesSection from "../player-cv-details/components/MyImageSection";
import MyVideosSection from "../player-cv-details/components/MyVideoSection";
import CoachBioSection from "./components/CoachBioSection";
import ComplementaryCoursesSection from "./components/ComplementaryCoursesSection";
import TestimonialSection from "./components/TestimonialSection";
import Top3Formation from "./components/Top3Formation";

const CoachCVPage = () => {
  return (
    <div>
      <CoachBioSection />
      <ComplementaryCoursesSection />
      <Top3Formation/>
      <TestimonialSection/>
      <DocSection/>
      <MyImagesSection/>
      <MyVideosSection/>
      <AdditionalNotesSection/>
      <ImageCarousel />
      <StartJourneySection />
    </div>
  );
};

export default CoachCVPage;
