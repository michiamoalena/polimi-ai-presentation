import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { PlayCircle } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const items = [
  { key: "video", def: "AI Video: Fly-throughs with VidMuse and Luma." },
  { key: "sound", def: "AI Sound: Soundscapes with Gemini (Lyria) and Suno." },
  { key: "3d", def: "3D Magic: From 2D Image to 3D Mesh with Rodin and Meta SAM." },
];

// пометка: дополнить список тулов для видео
const TeaserSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-6">
      <EditableText
        as="h1"
        value={content.heading || '"In the Next Episode..."'}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
      <EditableText
        as="p"
        value={content.intro || "Teaser"}
        onChange={(v) => onUpdate("intro", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>
    {/* TODO: дополнить список тулов для видео */}
    <p className="text-amber-500 text-sm font-semibold mb-4">📌 Пометка: дополнить список тулов для AI Video</p>
    <div className="flex-1 flex flex-col gap-5 min-h-0">
      {items.map(({ key, def }) => (
        <GlassPanel key={key} className="flex-1 p-8 flex items-center">
          <div className="flex gap-5 items-start">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-500 mt-2.5 shrink-0" />
            <EditableText
              as="p"
              value={content[key] || def}
              onChange={(v) => onUpdate(key, v)}
              className="text-2xl text-foreground/90 leading-relaxed font-medium"
            />
          </div>
        </GlassPanel>
      ))}
    </div>
  </div>
);

export default TeaserSlide;
