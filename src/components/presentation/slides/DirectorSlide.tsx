import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Brain, Repeat, MessageCircle } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const sections = [
  {
    icon: Brain,
    gradient: "from-violet-500 to-purple-600",
    titleKey: "sec1Title",
    titleDef: "I. The Relationship",
    subtitleKey: "sec1Sub",
    subtitleDef: "Mindset",
    bullets: [
      {
        key: "partner",
        labelKey: "partnerLabel",
        labelDef: "Buddy, not Oracle",
        def: "AI is your partner, not a slave or a magic solution.",
      },
      {
        key: "exo",
        labelKey: "exoLabel",
        labelDef: "Techno-Exoskeleton",
        def: "It amplifies your skills. You are the driver; it is the engine.",
      },
    ],
  },
  {
    icon: Repeat,
    gradient: "from-orange-500 to-pink-500",
    titleKey: "sec2Title",
    titleDef: "II. The Flow",
    subtitleKey: "sec2Sub",
    subtitleDef: "Process",
    bullets: [
      {
        key: "iterate",
        labelKey: "iterateLabel",
        labelDef: "Iterate to Win",
        def: "The first click is never the final one. Be ready for 3–5 iterations.",
      },
      {
        key: "braindump",
        labelKey: "braindumpLabel",
        labelDef: "The Brain Dump",
        def: 'Stuck? Don\'t seek the "perfect prompt." Just dump your messy thoughts and ask: "Let\'s brainstorm this together."',
      },
    ],
  },
  {
    icon: MessageCircle,
    gradient: "from-fuchsia-500 to-violet-500",
    titleKey: "sec3Title",
    titleDef: "III. The Dialogue",
    subtitleKey: "sec3Sub",
    subtitleDef: "Strategy",
    bullets: [
      {
        key: "eli5",
        labelKey: "eli5Label",
        labelDef: "ELI5 Method",
        def: 'Simplify complex research or tasks: "Explain this like I\'m 5."',
      },
      {
        key: "golden",
        labelKey: "goldenLabel",
        labelDef: "The Golden Rule",
        def: 'Always end with: "What information do you lack to give me the perfect result? Ask me."',
      },
    ],
  },
];

const DirectorSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-6">
      <EditableText
        as="h1"
        value={content.heading || "Meta-Skill: AI as Your Buddy"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
    </div>

    <div className="flex-1 grid grid-cols-3 gap-5 min-h-0">
      {sections.map((sec) => {
        const Icon = sec.icon;
        return (
          <GlassPanel key={sec.titleKey} className="p-6 flex flex-col gap-5">
            {/* Section header */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sec.gradient} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <EditableText
                  as="h2"
                  value={content[sec.titleKey] || sec.titleDef}
                  onChange={(v) => onUpdate(sec.titleKey, v)}
                  className="text-2xl font-bold text-foreground leading-tight"
                />
                <EditableText
                  as="p"
                  value={content[sec.subtitleKey] || sec.subtitleDef}
                  onChange={(v) => onUpdate(sec.subtitleKey, v)}
                  className="text-lg font-semibold text-muted-foreground uppercase tracking-wider"
                />
              </div>
            </div>

            {/* Bullets */}
            <div className="flex flex-col gap-4 flex-1 justify-center">
              {sec.bullets.map((b) => (
                <div key={b.key} className="rounded-xl bg-background/40 p-4">
                  <EditableText
                    as="h3"
                    value={content[b.labelKey] || b.labelDef}
                    onChange={(v) => onUpdate(b.labelKey, v)}
                    className={`text-xl font-bold bg-gradient-to-r ${sec.gradient} bg-clip-text text-transparent mb-1`}
                  />
                  <EditableText
                    as="p"
                    value={content[b.key] || b.def}
                    onChange={(v) => onUpdate(b.key, v)}
                    className="text-lg text-foreground/80 leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </GlassPanel>
        );
      })}
    </div>
  </div>
);

export default DirectorSlide;
