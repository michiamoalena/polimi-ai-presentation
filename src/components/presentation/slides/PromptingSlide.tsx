import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Code } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const PromptingSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex items-center justify-center gap-8">
    <GlassPanel className="max-w-2xl w-full p-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
          <Code className="w-7 h-7 text-white" />
        </div>
        <EditableText
          as="h2"
          value={content.heading || "Architectural Prompting (The Cheat Code)"}
          onChange={(v) => onUpdate("heading", v)}
          className="text-4xl font-bold text-foreground"
        />
      </div>
      <div className="space-y-5">
        {[
          { key: "goal", def: "The Goal: A clean image that is easy to redraw in Rhino." },
          { key: "noise", def: 'Avoid "Noise": Don\'t ask for "beautiful" (it creates mess). Ask for Logic.' },
        ].map(({ key, def }) => (
          <EditableText
            key={key}
            as="p"
            value={content[key] || def}
            onChange={(v) => onUpdate(key, v)}
            className="text-xl text-foreground/85 leading-relaxed"
          />
        ))}
      </div>
    </GlassPanel>

    <GlassPanel className="max-w-md w-full p-8">
      <h3 className="text-xl font-bold text-foreground mb-4">The Formula</h3>
      <div className="bg-foreground/5 rounded-xl p-6 font-mono text-lg space-y-2">
        {["[2-point perspective]", "[Minimalist volumes]", "[Sharp edges]", "[Straight vertical lines]"].map((line, i) => (
          <EditableText
            key={i}
            value={content[`formula${i}`] || `+ ${line}`}
            onChange={(v) => onUpdate(`formula${i}`, v)}
            className="text-foreground/90"
          />
        ))}
      </div>
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-pink-500/10">
        <EditableText
          as="p"
          value={content.hack || "MJ Hack: Use --s 0 to stop the AI from adding unnecessary artistic details."}
          onChange={(v) => onUpdate("hack", v)}
          className="text-base font-medium text-foreground/90"
        />
      </div>
    </GlassPanel>
  </div>
);

export default PromptingSlide;
