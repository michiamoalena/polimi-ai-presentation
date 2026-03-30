import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Mic } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const bullets = [
  { key: "talk", def: "Don't Type — Talk: Capture your ideas naturally without internal blocks." },
  { key: "tool", def: "The Tool: Use Whispr Flow to turn your thoughts into clear architectural prompts." },
  { key: "why", def: "Why? It cleans up your speech and formats it perfectly for Gemini or ChatGPT." },
  { key: "buddy", def: "The Buddy Rule: Talk to Gemini/ChatGPT while sketching. Discuss materials out loud." },
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
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <Mic className="w-12 h-12 text-white" />
        </div>
        <EditableText
          as="p"
          value={content.cta || "Try Whispr Flow"}
          onChange={(v) => onUpdate("cta", v)}
          className="text-xl font-bold text-foreground text-center"
        />
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
