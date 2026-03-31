import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";


const HOLD_DURATION = 2500;
const BUTTON_SIZE = 280;
const RADIUS = BUTTON_SIZE / 2;
const RING_RADIUS = RADIUS + 8;
const STROKE = 8;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

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
        <div className="glass-panel rounded-2xl max-w-3xl text-center p-16 animate-scale-in">
          <h2 className="text-5xl font-bold text-foreground mb-8 leading-tight">
            What are you thinking?
          </h2>
          <p className="text-2xl text-muted-foreground leading-relaxed mb-4">
            Ask your questions now.
          </p>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            Do you have specific cases? Let's analyze them together.
          </p>
        </div>
      </div>
    );
  }

  const svgSize = (RING_RADIUS + STROKE) * 2;
  const svgCenter = RING_RADIUS + STROKE;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative gap-10">
      {/* Title above the button */}
      <h2 className="text-5xl font-extrabold text-foreground tracking-tight">
        The theory is over.
      </h2>

      {/* Button with progress ring */}
      <div
        className={`relative select-none cursor-pointer transition-transform duration-150 ${progress > 0 ? "scale-95" : "hover:scale-105"}`}
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
      >
        {/* SVG ring overlay */}
        <svg
          width={svgSize}
          height={svgSize}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          {/* Track */}
          <circle
            cx={svgCenter}
            cy={svgCenter}
            r={RING_RADIUS}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={STROKE}
            transform={`rotate(-90 ${svgCenter} ${svgCenter})`}
          />
          {/* Progress */}
          <circle
            cx={svgCenter}
            cy={svgCenter}
            r={RING_RADIUS}
            fill="none"
            stroke="hsl(210 100% 55%)"
            strokeWidth={STROKE}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${svgCenter} ${svgCenter})`}
            style={{ transition: progress === 0 ? "none" : "stroke-dashoffset 50ms linear" }}
          />
        </svg>

        {/* The actual circle button */}
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            background: "hsl(var(--background))",
            boxShadow: "0 20px 60px -10px rgba(0,0,0,0.18), 0 8px 24px -6px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <p className="text-xl font-medium text-muted-foreground text-center px-8 leading-relaxed">
            Hold the button<br />to continue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinallyButtonSlide;
