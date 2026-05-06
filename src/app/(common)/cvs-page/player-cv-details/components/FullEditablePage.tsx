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


const FullEditablePage = () => {
    return (
        <>
            <PlayerBioSection />
            <ClubSection />
            <SkillsAttributes />
            <PerformanceAnalytics />
            <AttributesAnalysis />
            <MetricsAnalysis />
            <SportsAnalytics />
            <PlayerProfile />
            <DocSection />
            <MyImagesSection />
            <MyVideosSection />
            <AdditionalNotesSection />
        </>
    );
};

export default FullEditablePage;