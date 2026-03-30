import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Mic } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const VoiceBrainstormSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex items-center justify-center gap-8">
    <GlassPanel className="max-w-2xl w-full p-12">
      <EditableText
        as="h2"
        value={content.heading || 'Phase 0 — The "Voice-to-Text" Brainstorm'}
        onChange={(v) => onUpdate("heading", v)}
        className="text-4xl font-bold text-foreground mb-8"
      />
      <div className="space-y-5">
        {[
          { key: "talk", def: "Don't Type — Talk: Capture your ideas naturally without internal blocks." },
          { key: "tool", def: "The Tool: Use Whispr Flow to turn your thoughts into clear architectural prompts." },
          { key: "why", def: "Why? It cleans up your speech and formats it perfectly for Gemini or ChatGPT." },
          { key: "buddy", def: "The Buddy Rule: Talk to Gemini/ChatGPT while sketching. Discuss materials out loud." },
        ].map(({ key, def }) => (
          <div key={key} className="flex gap-4 items-start">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mt-3 shrink-0" />
            <EditableText
              as="p"
              value={content[key] || def}
              onChange={(v) => onUpdate(key, v)}
              className="text-xl text-foreground/85 leading-relaxed"
            />
          </div>
        ))}
      </div>
    </GlassPanel>

    <GlassPanel className="p-8 flex flex-col items-center gap-4">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
        <Mic className="w-10 h-10 text-white" />
      </div>
      <EditableText
        as="p"
        value={content.cta || "Try Whispr Flow"}
        onChange={(v) => onUpdate("cta", v)}
        className="text-lg font-semibold text-foreground"
      />
      <EditableText
        as="p"
        value={content.ctaSub || "(My Referral)"}
        onChange={(v) => onUpdate("ctaSub", v)}
        className="text-sm text-muted-foreground"
      />
    </GlassPanel>
  </div>
);

export default VoiceBrainstormSlide;
