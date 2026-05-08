"use client";

import DocSection from "../../player-cv-details/components/DocSection";
import CoachBioSection from "./CoachBioSection";
import ComplementaryCoursesSection from "./ComplementaryCoursesSection";
import TestimonialSection from "./TestimonialSection";
import Top3Formation from "./Top3Formation";
import MyImagesSection from "../../player-cv-details/components/MyImageSection";
import MyVideosSection from "../../player-cv-details/components/MyVideoSection";
import AdditionalNotesSection from "../../player-cv-details/components/AdditionalNotesSection";
import {
  PlayerStatsProvider,
  usePlayerStats,
} from "../../player-cv-details/components/FullEditablePage";

const FullEditableCv = ({ editable = true }: { editable?: boolean }) => {
  const { role } = usePlayerStats() || { role: "player" };
  const canEdit = editable && role === "coach";

  return (
    <>
      <CoachBioSection editable={canEdit} />
      <ComplementaryCoursesSection editable={canEdit} />
      <Top3Formation editable={canEdit} />
      <TestimonialSection editable={canEdit} />
      <MyImagesSection editable={canEdit} />
      <MyVideosSection editable={canEdit} />
      <AdditionalNotesSection editable={canEdit} />
      <DocSection editable={canEdit} />
    </>
  );
};

const FullEditableCvWrapper = ({ editable = true }: { editable?: boolean }) => (
  <PlayerStatsProvider>
    <FullEditableCv editable={editable} />
  </PlayerStatsProvider>
);

export default FullEditableCvWrapper;