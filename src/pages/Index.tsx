import { useState, useMemo } from "react";
import SlideContainer from "@/components/presentation/SlideContainer";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";
import { usePollData } from "@/hooks/usePollData";

import TitleSlide from "@/components/presentation/slides/TitleSlide";
import QRCodeSlide from "@/components/presentation/slides/QRCodeSlide";
import LiveResultsSlide from "@/components/presentation/slides/LiveResultsSlide";
import DirectorSlide from "@/components/presentation/slides/DirectorSlide";
import VoiceBrainstormSlide from "@/components/presentation/slides/VoiceBrainstormSlide";
import SoftwareStackSlide from "@/components/presentation/slides/SoftwareStackSlide";
import GeminiSlide from "@/components/presentation/slides/GeminiSlide";
import PromptingSlide from "@/components/presentation/slides/PromptingSlide";
import EditingSlide from "@/components/presentation/slides/EditingSlide";
import DocsSlide from "@/components/presentation/slides/DocsSlide";
import TeaserSlide from "@/components/presentation/slides/TeaserSlide";
import CoachPromptSlide from "@/components/presentation/slides/CoachPromptSlide";
import FinallyButtonSlide from "@/components/presentation/slides/FinallyButtonSlide";

const TOTAL_SLIDES = 13;

const Index = () => {
  const { currentSlide, next, prev, totalSlides } = useSlideNavigation(TOTAL_SLIDES);
  const pollData = usePollData();

  // Editable content state per slide
  const [slideContent, setSlideContent] = useState<Record<number, Record<string, string>>>({});

  const updateContent = (slideIndex: number) => (key: string, value: string) => {
    setSlideContent((prev) => ({
      ...prev,
      [slideIndex]: { ...prev[slideIndex], [key]: value },
    }));
  };

  const c = (i: number) => slideContent[i] || {};

  const pollUrl = useMemo(() => {
    const base = window.location.origin;
    return `${base}/poll`;
  }, []);

  const slides = [
    <TitleSlide key={0} content={c(0)} onUpdate={updateContent(0)} />,
    <QRCodeSlide key={1} content={c(1)} onUpdate={updateContent(1)} pollUrl={pollUrl} liveCount={pollData.total} />,
    <LiveResultsSlide key={2} content={c(2)} onUpdate={updateContent(2)} roleCount={pollData.roleCount} statusCount={pollData.statusCount} aiCount={pollData.aiCount} toolCount={pollData.toolCount} noReasonCount={pollData.noReasonCount} />,
    <DirectorSlide key={3} content={c(3)} onUpdate={updateContent(3)} />,
    <VoiceBrainstormSlide key={4} content={c(4)} onUpdate={updateContent(4)} />,
    <SoftwareStackSlide key={5} content={c(5)} onUpdate={updateContent(5)} />,
    <GeminiSlide key={6} content={c(6)} onUpdate={updateContent(6)} />,
    <PromptingSlide key={7} content={c(7)} onUpdate={updateContent(7)} />,
    <EditingSlide key={8} content={c(8)} onUpdate={updateContent(8)} />,
    <DocsSlide key={9} content={c(9)} onUpdate={updateContent(9)} />,
    <TeaserSlide key={10} content={c(10)} onUpdate={updateContent(10)} />,
    <CoachPromptSlide key={11} content={c(11)} onUpdate={updateContent(11)} />,
  ];

  return (
    <SlideContainer currentSlide={currentSlide} totalSlides={totalSlides} onNext={next} onPrev={prev}>
      {slides[currentSlide]}
    </SlideContainer>
  );
};

export default Index;
