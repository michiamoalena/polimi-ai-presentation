import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Code } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

// пометка: надо сгенерить картинки "Bad" vs "Good" (AI soup vs Clean 2-point perspective)
const PromptingSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-6">
      <EditableText
        as="h1"
        value={content.heading || "Architectural Precision"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
      <EditableText
        as="p"
        value={content.sub || "The Cheat Code"}
        onChange={(v) => onUpdate("sub", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>

    <div className="flex-1 grid grid-cols-[1fr_auto] gap-6 min-h-0">
      <GlassPanel className="p-8 flex flex-col justify-center">
        <div className="space-y-5">
          {[
            { key: "goal", def: "The Goal: An image that is easy to redraw in Rhino." },
            { key: "noise", def: 'Avoid "Noise": Don\'t ask for "beautiful" — ask for Logic.' },
          ].map(({ key, def }) => (
            <div key={key} className="flex gap-4 items-start p-5 rounded-xl bg-background/40">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 mt-3 shrink-0" />
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

      <GlassPanel className="w-96 p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-foreground mb-5">The Formula</h3>
        <div className="bg-foreground/5 rounded-xl p-6 font-mono text-xl space-y-3">
          {["[2-point perspective]", "[Minimalist volumes]", "[Sharp edges]", "[Straight vertical lines]"].map((line, i) => (
            <EditableText
              key={i}
              value={content[`formula${i}`] || `+ ${line}`}
              onChange={(v) => onUpdate(`formula${i}`, v)}
              className="text-foreground/90"
            />
          ))}
        </div>
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-orange-500/10 to-pink-500/10">
          <EditableText
            as="p"
            value={content.hack || "MJ Hack: Use --s 0 (Stylize Zero) to stop hallucinations."}
            onChange={(v) => onUpdate("hack", v)}
            className="text-lg font-bold text-foreground/90"
          />
        </div>
      </GlassPanel>
    </div>
  </div>
);

export default PromptingSlide;
