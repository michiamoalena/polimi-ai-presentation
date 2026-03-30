import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { ExternalLink } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const links = [
  { key: "gemini", label: "Gemini: Official Image Editing Guide", color: "from-blue-500 to-cyan-400" },
  { key: "chatgpt", label: "ChatGPT: DALL-E 3 & Canvas Tutorial", color: "from-green-500 to-emerald-400" },
  { key: "midjourney", label: 'Midjourney: Web Editor & "Vary Region"', color: "from-orange-500 to-pink-500" },
  { key: "kling", label: "Kling AI: Camera Control Settings Guide", color: "from-violet-500 to-fuchsia-500" },
];

const DocsSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex items-center justify-center">
    <GlassPanel className="max-w-4xl w-full p-12">
      <EditableText
        as="h2"
        value={content.heading || "Official Docs & Tutorials"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-4xl font-bold text-foreground mb-4"
      />
      <EditableText
        as="p"
        value={content.subtitle || "Click the buttons below for official guides:"}
        onChange={(v) => onUpdate("subtitle", v)}
        className="text-xl text-muted-foreground mb-10"
      />
      <div className="grid grid-cols-2 gap-6">
        {links.map((link) => (
          <div
            key={link.key}
            className={`rounded-xl p-6 bg-gradient-to-r ${link.color} text-white flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform`}
          >
            <ExternalLink className="w-6 h-6 shrink-0" />
            <EditableText
              as="p"
              value={content[link.key] || link.label}
              onChange={(v) => onUpdate(link.key, v)}
              className="text-lg font-semibold text-white"
            />
          </div>
        ))}
      </div>
    </GlassPanel>
  </div>
);

export default DocsSlide;
