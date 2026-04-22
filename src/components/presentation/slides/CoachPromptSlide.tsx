import { useState } from "react";
import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Copy, Check, ExternalLink, Sparkles } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const DEFAULT_PROMPT = `Act as my Senior Architectural Partner. I am using Wispr Flow to talk to you, so clean up my thoughts.

Phase 0: Explain the spatial vibe of my text in simple terms (ELI5).

Phase 1: Ask me what information you lack to understand the vision, and ask me specific questions before we generate anything.

Phase 2: Generate a minimalist, low-noise prompt for Midjourney. Use 2-point perspective and clear geometry so it's easy to model in Rhino.

Phase 3: Whenever possible, keep everything inside Gemini. It is my hub: images via Imagen, video via Veo, sound via Lyria, 3D attempts via Canvas. Fewer tabs = more flow.`;

const gemSteps = [
  { num: 1, color: "from-orange-500 to-pink-500", titleKey: "gem1Title", titleDef: "Create", textKey: "gem1Text", textDef: "Go to gemini.google.com/gems → New Gem" },
  { num: 2, color: "from-pink-500 to-fuchsia-500", titleKey: "gem2Title", titleDef: "Upload", textKey: "gem2Text", textDef: "The course syllabus PDF + your reference books or briefs" },
  { num: 3, color: "from-fuchsia-500 to-violet-500", titleKey: "gem3Title", titleDef: "Paste", textKey: "gem3Text", textDef: "The prompt on the left as Gem instructions. Save." },
];

const CoachPromptSlide = ({ content, onUpdate }: Props) => {
  const [copied, setCopied] = useState(false);
  const prompt = content.prompt || DEFAULT_PROMPT;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4">
        <EditableText
          as="h1"
          value={content.heading || "The Ultimate AI Coach Prompt"}
          onChange={(v) => onUpdate("heading", v)}
          className="text-6xl font-extrabold text-foreground leading-tight"
        />
        <EditableText
          as="p"
          value={content.subtitle || "Copy the prompt → drop it into a Gem → you have your own architecture coach."}
          onChange={(v) => onUpdate("subtitle", v)}
          className="text-2xl text-muted-foreground mt-2 font-medium"
        />
        <p className="text-amber-500 text-sm font-semibold mt-2">
          📌 Пометка: переписать промт согласно программе курса которую проф пришлёт
        </p>
      </div>

      <div className="flex-1 grid grid-cols-[1.3fr_1fr] gap-5 min-h-0">
        {/* LEFT — the prompt */}
        <GlassPanel className="p-7 relative flex flex-col">
          <EditableText
            as="h2"
            value={content.promptTitle || "The Prompt"}
            onChange={(v) => onUpdate("promptTitle", v)}
            className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide"
          />
          <div className="bg-foreground/5 rounded-xl p-6 font-mono text-base leading-relaxed border border-border flex-1 overflow-auto">
            <EditableText
              as="p"
              value={prompt}
              onChange={(v) => onUpdate("prompt", v)}
              className="text-foreground/90 whitespace-pre-wrap"
              multiline
            />
          </div>
          <button
            onClick={handleCopy}
            className="absolute top-7 right-7 p-3 rounded-xl glass-panel hover:scale-105 transition-transform"
          >
            {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6 text-foreground/60" />}
          </button>
        </GlassPanel>

        {/* RIGHT — Build your own Gem */}
        <GlassPanel className="p-7 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <EditableText
              as="h2"
              value={content.gemTitle || "Build Your Own Gem"}
              onChange={(v) => onUpdate("gemTitle", v)}
              className="text-2xl font-bold text-foreground leading-tight"
            />
          </div>

          <EditableText
            as="p"
            value={content.gemIntro || "A Gem is a custom Gemini that already knows your course, your taste, and your prompt rules."}
            onChange={(v) => onUpdate("gemIntro", v)}
            className="text-base text-foreground/80 leading-relaxed"
          />

          <div className="flex flex-col gap-3 flex-1">
            {gemSteps.map((s) => (
              <div key={s.num} className="flex gap-3 items-start">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-extrabold text-lg shrink-0`}>
                  {s.num}
                </div>
                <div className="flex-1">
                  <EditableText
                    as="h3"
                    value={content[s.titleKey] || s.titleDef}
                    onChange={(v) => onUpdate(s.titleKey, v)}
                    className="text-lg font-bold text-foreground leading-tight"
                  />
                  <EditableText
                    as="p"
                    value={content[s.textKey] || s.textDef}
                    onChange={(v) => onUpdate(s.textKey, v)}
                    className="text-sm text-foreground/75 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://gemini.google.com/gems"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-base hover:opacity-90 transition-opacity"
          >
            <ExternalLink className="w-5 h-5" />
            Open Gemini Gems
          </a>

          <p className="text-amber-500 text-xs font-semibold text-center">
            📌 Пометка: вставить QR на свой референс-Gem, если успею
          </p>
        </GlassPanel>
      </div>
    </div>
  );
};

export default CoachPromptSlide;
