import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Sparkles } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const GeminiSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex items-center justify-center gap-8">
    <GlassPanel className="max-w-2xl w-full p-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <EditableText
          as="h2"
          value={content.heading || "Gemini — Your Professional Hub"}
          onChange={(v) => onUpdate("heading", v)}
          className="text-4xl font-bold text-foreground"
        />
      </div>
      <div className="space-y-5">
        {[
          { key: "hack", def: "Student Hack: 1-year FREE subscription (Google One AI Premium)." },
          { key: "multi", def: "Multimodal: Upload the novel PDF + your hand sketches." },
          { key: "nano", def: "Nano Banana 2: High-speed concept generation." },
          { key: "loop", def: 'The Loop: Analyze book → Extract materials → Generate "Cheat Code" prompt.' },
        ].map(({ key, def }) => (
          <div key={key} className="flex gap-4 items-start">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mt-3 shrink-0" />
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
  </div>
);

export default GeminiSlide;
