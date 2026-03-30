import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { PlayCircle } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const TeaserSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex items-center justify-center">
    <GlassPanel className="max-w-4xl w-full p-12">
      <div className="flex items-center gap-4 mb-8">
        <PlayCircle className="w-10 h-10 text-orange-500" />
        <EditableText
          as="h2"
          value={content.heading || '"In the Next Episode..." (Teaser)'}
          onChange={(v) => onUpdate("heading", v)}
          className="text-4xl font-bold text-foreground"
        />
      </div>
      <EditableText
        as="p"
        value={content.intro || "Coming soon to your studio:"}
        onChange={(v) => onUpdate("intro", v)}
        className="text-xl text-muted-foreground mb-8"
      />
      <div className="space-y-6">
        {[
          { key: "video", def: "Image-to-Video: Cinematic fly-throughs with VidMuse (Professor's Pick) and Luma." },
          { key: "sound", def: "AI Sound: Generate atmospheric soundscapes with Gemini (Lyria) and Suno." },
          { key: "3d", def: "3D Magic: From 2D Image to 3D Mesh with Rodin and Meta SAM." },
        ].map(({ key, def }) => (
          <div key={key} className="flex gap-4 items-start p-4 rounded-xl bg-gradient-to-r from-foreground/5 to-foreground/[0.02]">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-500 mt-2 shrink-0" />
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

export default TeaserSlide;
