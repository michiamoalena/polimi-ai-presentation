import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { PlayCircle } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const items = [
  { key: "video", def: "Image-to-Video: Cinematic fly-throughs with VidMuse (Professor's Pick) and Luma." },
  { key: "sound", def: "AI Sound: Generate atmospheric soundscapes with Gemini (Lyria) and Suno." },
  { key: "3d", def: "3D Magic: From 2D Image to 3D Mesh with Rodin and Meta SAM." },
];

const TeaserSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-6 flex items-center gap-4">
      <PlayCircle className="w-10 h-10 text-orange-500" />
      <div>
        <EditableText
          as="h1"
          value={content.heading || '"In the Next Episode..."'}
          onChange={(v) => onUpdate("heading", v)}
          className="text-5xl font-extrabold text-foreground leading-tight"
        />
        <EditableText
          as="p"
          value={content.intro || "Coming soon to your studio:"}
          onChange={(v) => onUpdate("intro", v)}
          className="text-xl text-muted-foreground mt-1"
        />
      </div>
    </div>
    <div className="flex-1 flex flex-col gap-5 min-h-0">
      {items.map(({ key, def }) => (
        <GlassPanel key={key} className="flex-1 p-8 flex items-center">
          <div className="flex gap-4 items-start">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-500 mt-2 shrink-0" />
            <EditableText
              as="p"
              value={content[key] || def}
              onChange={(v) => onUpdate(key, v)}
              className="text-xl text-foreground/85 leading-relaxed"
            />
          </div>
        </GlassPanel>
      ))}
    </div>
  </div>
);

export default TeaserSlide;
