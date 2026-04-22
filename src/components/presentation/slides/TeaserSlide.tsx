import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Film, Boxes, Music, Sparkles } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const cards = [
  {
    icon: Film,
    gradient: "from-orange-500 to-pink-500",
    titleKey: "motionTitle",
    titleDef: "Motion & Camera",
    bodyKey: "motion",
    bodyDef: "Fly-throughs, POV walkthroughs, exact cinema moves.",
    toolsKey: "motionTools",
    toolsDef: "Veo 3 (Gemini) · Kling · Higgsfield",
  },
  {
    icon: Boxes,
    gradient: "from-pink-500 to-fuchsia-500",
    titleKey: "threeDTitle",
    titleDef: "From 2D to 3D",
    bodyKey: "threeD",
    bodyDef: "One photo → 3D mesh. One image → navigable world.",
    toolsKey: "threeDTools",
    toolsDef: "Meta SAM · Rodin · World Labs",
  },
  {
    icon: Music,
    gradient: "from-fuchsia-500 to-violet-500",
    titleKey: "soundTitle",
    titleDef: "Sound",
    bodyKey: "sound",
    bodyDef: "Soundscapes for your scenes, generated from text or image.",
    toolsKey: "soundTools",
    toolsDef: "Lyria (Gemini) · Suno · Udio",
  },
  {
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-600",
    titleKey: "gemTitle",
    titleDef: "Your Own Gem",
    bodyKey: "gem",
    bodyDef: "Turn Gemini into your personal architecture coach.",
    toolsKey: "gemTools",
    toolsDef: "Gem + course syllabus + your style",
  },
];

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
        value={content.intro || "Teaser — what we open up next"}
        onChange={(v) => onUpdate("intro", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>

    <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <GlassPanel key={c.titleKey} className="p-7 flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <EditableText
                as="h2"
                value={content[c.titleKey] || c.titleDef}
                onChange={(v) => onUpdate(c.titleKey, v)}
                className="text-3xl font-bold text-foreground leading-tight"
              />
            </div>
            <EditableText
              as="p"
              value={content[c.bodyKey] || c.bodyDef}
              onChange={(v) => onUpdate(c.bodyKey, v)}
              className="text-xl text-foreground/85 leading-relaxed font-medium"
            />
            <EditableText
              as="p"
              value={content[c.toolsKey] || c.toolsDef}
              onChange={(v) => onUpdate(c.toolsKey, v)}
              className={`text-base font-bold bg-gradient-to-r ${c.gradient} bg-clip-text text-transparent mt-auto`}
            />
          </GlassPanel>
        );
      })}
    </div>
  </div>
);

export default TeaserSlide;
