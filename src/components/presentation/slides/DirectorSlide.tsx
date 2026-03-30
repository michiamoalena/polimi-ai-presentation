import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const DirectorSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex items-center justify-center">
    <GlassPanel className="max-w-4xl w-full p-12">
      <EditableText
        as="h2"
        value={content.heading || "You are the Director, AI is your Buddy"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-4xl font-bold text-foreground mb-8"
      />
      <div className="space-y-6">
        {[
          { key: "shift", def: "The Shift: Stop working for the AI. Start working with it." },
          { key: "exo", def: "The Exoskeleton: Use AI to handle the heavy lifting, so you can focus on design." },
          { key: "phase0", def: 'Phase 0 ("Defrosting"): Use Chat to break internal blocks and explain complex literary metaphors in simple terms (ELI5).' },
          { key: "goal", def: 'Goal: Move from a "vibe" in a book to a rigorous project in Rhino.' },
        ].map(({ key, def }) => (
          <div key={key} className="flex gap-4 items-start">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 mt-3 shrink-0" />
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

export default DirectorSlide;
