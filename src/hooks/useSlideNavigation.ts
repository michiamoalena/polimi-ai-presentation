import { useState, useEffect, useCallback } from "react";

export function useSlideNavigation(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goTo = useCallback((n: number) => {
    setCurrentSlide(Math.max(0, Math.min(n, totalSlides - 1)));
  }, [totalSlides]);

  const next = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);
  const prev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't navigate if user is editing text
      if ((e.target as HTMLElement)?.isContentEditable) return;
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  return { currentSlide, goTo, next, prev, totalSlides };
}
