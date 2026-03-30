import { useState } from "react";
import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Copy, Check } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const DEFAULT_PROMPT = `Act as my Senior Architectural Partner. I am using Wispr Flow to talk to you, so clean up my thoughts.

Phase 0: Explain the spatial vibe of my text in simple terms (ELI5).

Phase 1: Ask me what information you lack to understand the vision, and ask me specific questions before we generate anything.

Phase 2: Generate a minimalist, low-noise prompt for Midjourney. Use 2-point perspective and clear geometry so it's easy to model in Rhino.`;

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
      <div className="mb-6">
        <EditableText
          as="h1"
          value={content.heading || "The Ultimate AI Coach Prompt"}
          onChange={(v) => onUpdate("heading", v)}
          className="text-6xl font-extrabold text-foreground leading-tight"
        />
        <EditableText
          as="p"
          value={content.subtitle || "Copy-paste this to any Chat (Gemini or ChatGPT) to start your project:"}
          onChange={(v) => onUpdate("subtitle", v)}
          className="text-2xl text-muted-foreground mt-2 font-medium"
        />
        {/* TODO: переписать промт согласно программе курса которую проф пришлет */}
        <p className="text-amber-500 text-sm font-semibold mt-2">📌 Пометка: переписать промт согласно программе курса которую проф пришлёт</p>
      </div>

      <GlassPanel className="flex-1 p-8 relative">
        <div className="bg-foreground/5 rounded-xl p-8 font-mono text-xl leading-relaxed border border-border h-full">
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
          className="absolute top-12 right-12 p-3 rounded-xl glass-panel hover:scale-105 transition-transform"
        >
          {copied ? <Check className="w-7 h-7 text-green-500" /> : <Copy className="w-7 h-7 text-foreground/60" />}
        </button>
      </GlassPanel>
    </div>
  );
};

export default CoachPromptSlide;
