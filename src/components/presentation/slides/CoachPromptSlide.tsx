import { useState } from "react";
import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Copy, Check } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const DEFAULT_PROMPT = `Act as my Senior Architectural Partner. I am using Whispr Flow to talk to you, so clean up my thoughts.

Phase 0: Explain the spatial vibe of my text in simple terms (ELI5).

Phase 1: Ask me 3 questions to help me define the 'vibe' before we generate anything.

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
    <div className="w-full h-full flex items-center justify-center">
      <GlassPanel className="max-w-4xl w-full p-12">
        <EditableText
          as="h2"
          value={content.heading || "The Ultimate AI Coach Prompt"}
          onChange={(v) => onUpdate("heading", v)}
          className="text-4xl font-bold text-foreground mb-4"
        />
        <EditableText
          as="p"
          value={content.subtitle || "Copy-paste this to any Chat (Gemini or ChatGPT) to start your project:"}
          onChange={(v) => onUpdate("subtitle", v)}
          className="text-xl text-muted-foreground mb-8"
        />

        <div className="relative">
          <div className="bg-foreground/5 rounded-xl p-8 font-mono text-base leading-relaxed border border-border">
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
            className="absolute top-4 right-4 p-2 rounded-lg glass-panel hover:scale-105 transition-transform"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-foreground/60" />}
          </button>
        </div>
      </GlassPanel>
    </div>
  );
};

export default CoachPromptSlide;
