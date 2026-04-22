import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import logoGemini from "@/assets/logo-gemini.png";
import logoKling from "@/assets/logo-kling.png";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const bullets = [
  {
    key: "goal",
    def: 'The Goal: Not "cinematic" — but an architectural fly-through. Think client walkthrough, not music video.',
  },
  {
    key: "camera",
    def: "Camera-first, not Style-first: Lock the POV (eye-level, dolly, top-down) — then let the scene move.",
  },
  {
    key: "rule",
    def: "The Rule: Start from your best still image → animate it. Don't ask AI to \"imagine motion\" from scratch.",
  },
];

const tools = [
  {
    need: "Free & inside your hub",
    tool: "Veo 3 (via Gemini)",
    why: "No extra signup, student plan covers it.",
    logo: logoGemini,
  },
  {
    need: "Exact camera params (POV, FOV, tilt)",
    tool: "Kling AI / LookX",
    why: "Architect-grade control.",
    logo: logoKling,
  },
  {
    need: "Cinematic moves (dolly, crane, zoom)",
    tool: "Higgsfield",
    why: "Built specifically around camera motion.",
    logo: null as string | null,
  },
];

const MotionSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-4">
      <EditableText
        as="h1"
        value={content.heading || "AI Motion & Camera"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
      <EditableText
        as="p"
        value={content.sub || "From a still render to a believable architectural fly-through."}
        onChange={(v) => onUpdate("sub", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>

    <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
      <GlassPanel className="p-7 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {bullets.map(({ key, def }) => (
            <div key={key} className="flex gap-3 items-start">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 mt-2 shrink-0" />
              <EditableText
                as="p"
                value={content[key] || def}
                onChange={(v) => onUpdate(key, v)}
                className="text-xl text-foreground/90 leading-relaxed font-medium"
              />
            </div>
          ))}
        </div>
        <div className="mt-auto p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20">
          <EditableText
            as="p"
            value={content.hack || "🎬 Hack: Render a hero still in Midjourney → animate it in Veo/Kling. Way more control than text-to-video."}
            onChange={(v) => onUpdate("hack", v)}
            className="text-lg font-bold text-foreground/90"
          />
        </div>
      </GlassPanel>

      <GlassPanel className="p-7 flex flex-col">
        <EditableText
          as="h2"
          value={content.tableTitle || "Pick the right tool"}
          onChange={(v) => onUpdate("tableTitle", v)}
          className="text-2xl font-bold text-foreground mb-4"
        />
        <div className="flex flex-col">
          {tools.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_1.2fr] gap-4 py-4 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <div>
                <EditableText
                  as="p"
                  value={content[`need${i}`] || row.need}
                  onChange={(v) => onUpdate(`need${i}`, v)}
                  className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1"
                />
                <div className="flex items-center gap-2">
                  {row.logo && <img src={row.logo} alt="" className="w-6 h-6 object-contain" />}
                  <EditableText
                    as="p"
                    value={content[`tool${i}`] || row.tool}
                    onChange={(v) => onUpdate(`tool${i}`, v)}
                    className="text-lg font-bold text-foreground"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <EditableText
                  as="p"
                  value={content[`why${i}`] || row.why}
                  onChange={(v) => onUpdate(`why${i}`, v)}
                  className="text-base text-foreground/80 font-medium"
                />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  </div>
);

export default MotionSlide;
