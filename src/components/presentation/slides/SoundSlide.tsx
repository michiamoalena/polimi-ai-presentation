import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import logoGemini from "@/assets/logo-gemini.png";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const steps = [
  {
    num: "0",
    color: "bg-orange-500",
    titleKey: "step0Title",
    titleDef: "Dump",
    textKey: "step0Text",
    textDef: "Before generating anything, talk to Gemini. Give full context: brief, mood, book, site.",
  },
  {
    num: "1",
    color: "bg-pink-500",
    titleKey: "step1Title",
    titleDef: "Explain",
    textKey: "step1Text",
    textDef: "Ask it to explain the vibe back to you (ELI5). If it gets it, the prompt will.",
  },
  {
    num: "2",
    color: "bg-violet-500",
    titleKey: "step2Title",
    titleDef: "Generate",
    textKey: "step2Text",
    textDef: "Only now — image, video, or sound. And when possible, inside the same Gemini chat.",
  },
];

const tools = [
  { name: "Lyria", where: "Inside Gemini (your hub)", when: "First choice — no context switch", logo: logoGemini },
  { name: "Suno", where: "Standalone", when: "Vocal / musical soundscapes", logo: null as string | null },
  { name: "Udio", where: "Standalone", when: "Textured ambient, spatial audio", logo: null as string | null },
];

const SoundSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-4">
      <EditableText
        as="h1"
        value={content.heading || "AI Sound"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
      <EditableText
        as="p"
        value={content.sub || "Soundscapes for your scenes — but the principle matters more than the tool."}
        onChange={(v) => onUpdate("sub", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>

    <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
      {/* LEFT — The Principle */}
      <GlassPanel className="p-7 flex flex-col">
        <EditableText
          as="h2"
          value={content.principleTitle || "The Principle: Dump → Explain → Generate"}
          onChange={(v) => onUpdate("principleTitle", v)}
          className="text-2xl font-bold text-foreground mb-4"
        />
        <div className="flex flex-col gap-3 flex-1">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              <div className="flex gap-4 items-start">
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center text-white font-extrabold text-xl shrink-0`}>
                  {s.num}
                </div>
                <div className="flex-1">
                  <EditableText
                    as="h3"
                    value={content[s.titleKey] || s.titleDef}
                    onChange={(v) => onUpdate(s.titleKey, v)}
                    className="text-xl font-bold text-foreground leading-tight mb-0.5"
                  />
                  <EditableText
                    as="p"
                    value={content[s.textKey] || s.textDef}
                    onChange={(v) => onUpdate(s.textKey, v)}
                    className="text-base text-foreground/80 leading-relaxed"
                  />
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="ml-6 h-3 w-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* RIGHT — Sound tools */}
      <GlassPanel className="p-7 flex flex-col">
        <EditableText
          as="h2"
          value={content.toolsTitle || "Where to actually generate sound"}
          onChange={(v) => onUpdate("toolsTitle", v)}
          className="text-2xl font-bold text-foreground mb-4"
        />
        <div className="flex flex-col">
          <div className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-3 pb-3 border-b border-border">
            <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Tool</p>
            <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Where</p>
            <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">When</p>
          </div>
          {tools.map((t, i) => (
            <div key={i} className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-3 py-4 border-b border-border last:border-b-0 items-center">
              <div className="flex items-center gap-2">
                {t.logo && <img src={t.logo} alt="" className="w-6 h-6 object-contain" />}
                <EditableText
                  as="p"
                  value={content[`tool${i}`] || t.name}
                  onChange={(v) => onUpdate(`tool${i}`, v)}
                  className="text-lg font-bold text-foreground"
                />
              </div>
              <EditableText
                as="p"
                value={content[`where${i}`] || t.where}
                onChange={(v) => onUpdate(`where${i}`, v)}
                className="text-base text-foreground/80 font-medium"
              />
              <EditableText
                as="p"
                value={content[`when${i}`] || t.when}
                onChange={(v) => onUpdate(`when${i}`, v)}
                className="text-base text-foreground/80 font-medium"
              />
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>

    <EditableText
      as="p"
      value={content.tagline || "Same principle, every medium: text → image → video → sound."}
      onChange={(v) => onUpdate("tagline", v)}
      className="text-2xl text-center font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent mt-6"
    />
  </div>
);

export default SoundSlide;
