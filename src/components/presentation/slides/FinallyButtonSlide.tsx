import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";


const HOLD_DURATION = 2500;
const RADIUS = 180;
const STROKE = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TEXT_RADIUS = RADIUS - 45; // radius for curved text path

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

  const svgSize = (RADIUS + STROKE) * 2;
  const center = RADIUS + STROKE;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div
        className={`relative select-none cursor-pointer transition-transform duration-150 ${progress > 0 ? "scale-95" : "hover:scale-105"}`}
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
      >
        <svg width={svgSize} height={svgSize} className="block">
          <defs>
            {/* Top arc path for "The theory is over." */}
            <path
              id="topArc"
              d={`M ${center - TEXT_RADIUS},${center} A ${TEXT_RADIUS},${TEXT_RADIUS} 0 0,1 ${center + TEXT_RADIUS},${center}`}
              fill="none"
            />
            {/* Bottom arc path for "Hold the button to continue." */}
            <path
              id="bottomArc"
              d={`M ${center + TEXT_RADIUS},${center} A ${TEXT_RADIUS},${TEXT_RADIUS} 0 0,1 ${center - TEXT_RADIUS},${center}`}
              fill="none"
            />
          </defs>

          {/* Glass circle background */}
          <circle
            cx={center}
            cy={center}
            r={RADIUS - 2}
            fill="hsla(var(--glass-bg))"
            stroke="hsla(var(--glass-border))"
            strokeWidth="1"
            style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.12))" }}
          />

          {/* Progress track */}
          <circle
            cx={center}
            cy={center}
            r={RADIUS}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={STROKE}
            transform={`rotate(-90 ${center} ${center})`}
          />
          {/* Progress fill */}
          <circle
            cx={center}
            cy={center}
            r={RADIUS}
            fill="none"
            stroke="hsl(210 100% 55%)"
            strokeWidth={STROKE}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
            style={{ transition: progress === 0 ? "none" : "stroke-dashoffset 50ms linear" }}
          />

          {/* Top curved text */}
          <text
            fill="hsl(var(--foreground))"
            fontSize="28"
            fontWeight="800"
            letterSpacing="1"
          >
            <textPath href="#topArc" startOffset="50%" textAnchor="middle">
              The theory is over.
            </textPath>
          </text>

          {/* Bottom curved text */}
          <text
            fill="hsl(var(--muted-foreground))"
            fontSize="20"
            fontWeight="500"
          >
            <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
              Hold the button to continue.
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default FinallyButtonSlide;
