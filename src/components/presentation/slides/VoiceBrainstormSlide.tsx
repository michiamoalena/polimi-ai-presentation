import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { ExternalLink } from "lucide-react";
import wisprLogo from "@/assets/wispr-flow-logo.png";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const bullets = [
  { key: "talk", def: "Don't Type — Talk: Capture ideas naturally. Typing kills the creative flow." },
  { key: "tool", def: "The Tool: Wispr Flow. Turns rambling thoughts into professional prompts." },
  { key: "speed", def: "Efficiency: 10x faster than typing. Brainstorm while you sketch." },
];

const VoiceBrainstormSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-6">
      <EditableText
        as="h1"
        value={content.heading || "Phase 0"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
      <EditableText
        as="p"
        value={content.sub || 'The "Voice-to-Text" Brainstorm'}
        onChange={(v) => onUpdate("sub", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>
    <div className="flex-1 grid grid-cols-[1fr_auto] gap-6 min-h-0">
      <GlassPanel className="p-8 flex flex-col justify-center">
        <div className="space-y-4">
          {bullets.map(({ key, def }) => (
            <div key={key} className="flex gap-4 items-start p-4 rounded-xl bg-background/40">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mt-3 shrink-0" />
              <EditableText
                as="p"
                value={content[key] || def}
                onChange={(v) => onUpdate(key, v)}
                className="text-2xl text-foreground/90 leading-relaxed font-medium"
              />
            </div>
          ))}
        </div>
      </GlassPanel>
      <GlassPanel className="p-8 flex flex-col items-center justify-center gap-5 w-56">
        <div className="w-24 h-24 rounded-2xl overflow-hidden">
          <img src={wisprLogo} alt="Wispr Flow" className="w-full h-full object-contain" />
        </div>
        <EditableText
          as="p"
          value={content.cta || "Try Wispr Flow"}
          onChange={(v) => onUpdate("cta", v)}
          className="text-xl font-bold text-foreground text-center"
        />
        <a
          href="https://wisprflow.ai/r?ALENA16"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <ExternalLink className="w-4 h-4" />
          1 month Pro FREE
        </a>
        <EditableText
          as="p"
          value={content.ctaSub || "(My Referral)"}
          onChange={(v) => onUpdate("ctaSub", v)}
          className="text-base text-muted-foreground font-medium"
        />
      </GlassPanel>
    </div>
  </div>
);

export default VoiceBrainstormSlide;
