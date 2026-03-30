import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const bullets = [
  { key: "shift", def: "The Shift: Stop working for the AI. Start working with it." },
  { key: "exo", def: "The Exoskeleton: Use AI to handle the heavy lifting, so you can focus on design." },
  { key: "phase0", def: 'Phase 0 ("Defrosting"): Use Chat to break internal blocks and explain complex literary metaphors in simple terms (ELI5).' },
  { key: "goal", def: 'Goal: Move from a "vibe" in a book to a rigorous project in Rhino.' },
];

const DirectorSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-6">
      <EditableText
        as="h1"
        value={content.heading || "You are the Director"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
      <EditableText
        as="p"
        value={content.sub || "AI is your Buddy"}
        onChange={(v) => onUpdate("sub", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>
    <GlassPanel className="flex-1 p-10">
      <div className="space-y-5 h-full flex flex-col justify-center">
        {bullets.map(({ key, def }) => (
          <div key={key} className="flex gap-4 items-start p-5 rounded-xl bg-background/40">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 mt-3 shrink-0" />
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

export default DirectorSlide;
