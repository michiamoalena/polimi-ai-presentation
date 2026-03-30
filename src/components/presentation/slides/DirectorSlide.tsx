import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const bullets = [
  { key: "partner", def: "The Partnership: AI is not your slave, nor a magic oracle. It's your Partner (Buddy)." },
  { key: "exo", def: "Techno-Exoskeleton: It amplifies you, but you guide it. If the result is bad, check the context or the prompt first." },
  { key: "imperfect", def: "Embrace the Imperfection: AI can hallucinate, and models aren't perfect. Be ready for iterations — the best results never come from the first click." },
  { key: "phase0", def: 'Phase 0 ("The Brainstorm"): Stuck? Don\'t worry about the "perfect prompt." Just dump your thoughts and ask the AI: "I\'m thinking this... what do you think? Let\'s brainstorm."' },
  { key: "eli5", def: 'The ELI5 Method: Use it for complex research or technical tasks: "Explain this research paper to me like I\'m 5."' },
  { key: "golden", def: 'The Golden Rule: Before finishing, ask: "What information do you lack to give me the perfect result? Ask me."' },
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
    <GlassPanel className="flex-1 p-8">
      <div className="space-y-3 h-full flex flex-col justify-center">
        {bullets.map(({ key, def }) => (
          <div key={key} className="flex gap-4 items-start p-4 rounded-xl bg-background/40">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 mt-3 shrink-0" />
            <EditableText
              as="p"
              value={content[key] || def}
              onChange={(v) => onUpdate(key, v)}
              className="text-xl text-foreground/90 leading-relaxed font-medium"
            />
          </div>
        ))}
      </div>
    </GlassPanel>
  </div>
);

export default DirectorSlide;
