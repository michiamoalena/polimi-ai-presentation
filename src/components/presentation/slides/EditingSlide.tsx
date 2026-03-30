import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Paintbrush } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const bullets = [
  { key: "regen", def: "Don't Regenerate — Edit: Fixing one window is better than starting over." },
  { key: "tool", def: 'The Tool: Use the "Brush" in ChatGPT or Vary Region in Midjourney.' },
  { key: "pov", def: "The POV Hack: Use Kling AI settings to adjust Zoom, Pan, and Tilt to get the perfect perspective for your 3D model." },
];

const EditingSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
        <Paintbrush className="w-6 h-6 text-white" />
      </div>
      <div>
        <EditableText
          as="h1"
          value={content.heading || "Editing without Photoshop"}
          onChange={(v) => onUpdate("heading", v)}
          className="text-5xl font-extrabold text-foreground leading-tight"
        />
        <EditableText
          as="p"
          value={content.sub || "In-painting"}
          onChange={(v) => onUpdate("sub", v)}
          className="text-xl text-muted-foreground mt-1"
        />
      </div>
    </div>
    <GlassPanel className="flex-1 p-10">
      <div className="space-y-5 h-full flex flex-col justify-center">
        {bullets.map(({ key, def }) => (
          <div key={key} className="flex gap-4 items-start p-5 rounded-xl bg-background/40">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 mt-2.5 shrink-0" />
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

export default EditingSlide;
