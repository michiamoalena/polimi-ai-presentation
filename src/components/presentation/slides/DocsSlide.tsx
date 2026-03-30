import EditableText from "../EditableText";
import { ExternalLink } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const links = [
  { key: "gemini", label: "Gemini: Official Editing Guide", color: "from-blue-500 to-cyan-400", url: "#" },
  { key: "chatgpt", label: "ChatGPT: DALL-E 3 & Canvas Tutorial", color: "from-green-500 to-emerald-400", url: "#" },
  { key: "midjourney", label: "Midjourney: Web Editor Guide", color: "from-orange-500 to-pink-500", url: "#" },
  { key: "kling", label: "Kling AI: Camera Control Guide", color: "from-violet-500 to-fuchsia-500", url: "#" },
];

const DocsSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-6">
      <EditableText
        as="h1"
        value={content.heading || "Official Docs & Tutorials"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
    </div>
    <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
      {links.map((link) => (
        <div
          key={link.key}
          className={`rounded-2xl p-8 bg-gradient-to-r ${link.color} text-white flex items-center gap-5 cursor-pointer hover:scale-[1.02] transition-transform`}
        >
          <ExternalLink className="w-8 h-8 shrink-0" />
          <EditableText
            as="p"
            value={content[link.key] || link.label}
            onChange={(v) => onUpdate(link.key, v)}
            className="text-2xl font-bold text-white"
          />
        </div>
      ))}
    </div>
  </div>
);

export default DocsSlide;
