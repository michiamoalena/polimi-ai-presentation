import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";
import GlassPanel from "../GlassPanel";

const HOLD_DURATION = 2500; // ms to fill
const RADIUS = 90;
const STROKE = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const FinallyButtonSlide = ({ content, onUpdate }: Props) => {
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(false);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.6 },
        colors: ["#7c3aed", "#ec4899", "#f97316", "#06b6d4", "#10b981"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.6 },
        colors: ["#7c3aed", "#ec4899", "#f97316", "#06b6d4", "#10b981"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // Big center burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#7c3aed", "#ec4899", "#f97316", "#06b6d4", "#10b981", "#facc15"],
    });
  }, []);

  const startHold = useCallback(() => {
    if (activated) return;
    startTimeRef.current = performance.now() - progressRef.current * HOLD_DURATION;

    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current!;
      const p = Math.min(elapsed / HOLD_DURATION, 1);
      progressRef.current = p;
      setProgress(p);

      if (p >= 1) {
        setActivated(true);
        fireConfetti();
        // Save to DB
        supabase.from("button_completions").insert({}).then(() => {});
        return;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  }, [activated, fireConfetti]);

  const stopHold = useCallback(() => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  }, []);

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  if (activated) {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <GlassPanel className="max-w-3xl text-center p-16 animate-scale-in">
          <h2 className="text-5xl font-bold text-foreground mb-8 leading-tight">
            What are you thinking?
          </h2>
          <p className="text-2xl text-muted-foreground leading-relaxed mb-4">
            Ask your questions now.
          </p>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            Do you have specific cases? Let's analyze them together.
          </p>
        </GlassPanel>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative gap-8">
      {/* The button with SVG ring */}
      <div
        className="relative select-none cursor-pointer"
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
      >
        {/* SVG progress ring */}
        <svg
          width={(RADIUS + STROKE) * 2}
          height={(RADIUS + STROKE) * 2}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90"
        >
          {/* Track */}
          <circle
            cx={RADIUS + STROKE}
            cy={RADIUS + STROKE}
            r={RADIUS}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={STROKE}
          />
          {/* Progress */}
          <circle
            cx={RADIUS + STROKE}
            cy={RADIUS + STROKE}
            r={RADIUS}
            fill="none"
            stroke="hsl(210 100% 55%)"
            strokeWidth={STROKE}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: progress === 0 ? "none" : "stroke-dashoffset 50ms linear" }}
          />
        </svg>

        <GlassPanel
          className={`
            relative z-10 px-16 py-10 rounded-full text-center
            transition-transform duration-150
            ${progress > 0 ? "scale-95" : "hover:scale-105"}
          `}
        >
          <p className="text-3xl font-bold text-foreground whitespace-nowrap">
            THE THEORY IS OVER. FINALLY!
          </p>
        </GlassPanel>
      </div>

      <p className="text-xl text-muted-foreground/50 animate-pulse">
        Hold the button to continue...
      </p>
    </div>
  );
};

export default FinallyButtonSlide;
