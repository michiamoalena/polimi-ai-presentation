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
      {currentSlide !== 0 && <AnimatedBackground />}

      {/* Navigation — top right */}
      <div className="fixed top-6 right-8 z-50 flex items-center gap-3">
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className="p-1.5 rounded-full text-foreground/40 hover:text-foreground disabled:opacity-20 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-foreground/40 tabular-nums min-w-[3rem] text-center">
          {currentSlide + 1} / {totalSlides}
        </span>
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="p-1.5 rounded-full text-foreground/40 hover:text-foreground disabled:opacity-20 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <div className="w-full h-full max-w-[1920px] max-h-[1080px] mx-auto p-10 pt-6 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SlideContainer;
