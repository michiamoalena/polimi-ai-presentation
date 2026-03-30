import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Paintbrush } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const bullets = [
  { key: "rule", def: "Rule: Fixing one window is better than starting over." },
  { key: "tools", def: 'The Tools: Use "Brush" in ChatGPT Canvas or Vary Region in Midjourney.' },
  { key: "camera", def: "Camera Hack: Use Kling AI settings to adjust FOV and Tilt for the perfect shot." },
];

const EditingSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-6 flex items-center gap-5">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
        <Paintbrush className="w-7 h-7 text-white" />
      </div>
      <div>
        <EditableText
          as="h1"
          value={content.heading || "Fix, Don't Regenerate"}
          onChange={(v) => onUpdate("heading", v)}
          className="text-6xl font-extrabold text-foreground leading-tight"
        />
        <EditableText
          as="p"
          value={content.sub || "In-painting"}
          onChange={(v) => onUpdate("sub", v)}
          className="text-2xl text-muted-foreground mt-1 font-medium"
        />
      </div>
    </div>
    <GlassPanel className="flex-1 p-10">
      <div className="space-y-6 h-full flex flex-col justify-center">
        {bullets.map(({ key, def }) => (
          <div key={key} className="flex gap-4 items-start p-6 rounded-xl bg-background/40">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 mt-3 shrink-0" />
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
  </div>
);

export default EditingSlide;
