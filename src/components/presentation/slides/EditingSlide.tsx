import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Paintbrush } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const EditingSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex items-center justify-center">
    <GlassPanel className="max-w-4xl w-full p-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
          <Paintbrush className="w-7 h-7 text-white" />
        </div>
        <EditableText
          as="h2"
          value={content.heading || "Editing without Photoshop (In-painting)"}
          onChange={(v) => onUpdate("heading", v)}
          className="text-4xl font-bold text-foreground"
        />
      </div>
      <div className="space-y-6">
        {[
          { key: "regen", def: "Don't Regenerate — Edit: Fixing one window is better than starting over." },
          { key: "tool", def: 'The Tool: Use the "Brush" in ChatGPT or Vary Region in Midjourney.' },
          { key: "pov", def: "The POV Hack: Use Kling AI settings to adjust Zoom, Pan, and Tilt to get the perfect perspective for your 3D model." },
        ].map(({ key, def }) => (
          <div key={key} className="flex gap-4 items-start">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 mt-3 shrink-0" />
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
