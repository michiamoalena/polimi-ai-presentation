import { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

interface SlideContainerProps {
  children: ReactNode;
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
}

const SlideContainer = ({ children, currentSlide, totalSlides, onNext, onPrev }: SlideContainerProps) => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <AnimatedBackground />
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="w-full h-full max-w-[1920px] max-h-[1080px] p-8 flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className="p-2 rounded-full glass-panel text-foreground/60 hover:text-foreground disabled:opacity-30 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-foreground/50 tabular-nums min-w-[3rem] text-center">
          {currentSlide + 1} / {totalSlides}
        </span>
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="p-2 rounded-full glass-panel text-foreground/60 hover:text-foreground disabled:opacity-30 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SlideContainer;
