import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { ExternalLink } from "lucide-react";
import logoGemini from "@/assets/logo-gemini.png";
import logoChatGPT from "@/assets/logo-chatgpt.png";
import logoMidjourney from "@/assets/logo-midjourney.png";
import logoKling from "@/assets/logo-kling.png";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const tools = [
  {
    key: "gemini",
    name: "Gemini",
    logo: logoGemini,
    accent: "border-violet-400/40 hover:border-violet-400",
    links: [
      { label: "Image Generation Prompting Tips", url: "https://blog.google/products/gemini/image-generation-prompting-tips/" },
      { label: "Nano Banana Pro: Advanced Tips", url: "https://blog.google/products/gemini/prompting-tips-nano-banana-pro/" },
    ],
  },
  {
    key: "chatgpt",
    name: "ChatGPT",
    logo: logoChatGPT,
    accent: "border-pink-400/40 hover:border-pink-400",
    links: [
      { label: "Creating Images in ChatGPT", url: "https://help.openai.com/en/articles/8932459-creating-images-in-chatgpt" },
      { label: "Editing Images with ChatGPT", url: "https://help.openai.com/en/articles/9055440-editing-your-images-with-dall-e" },
    ],
  },
  {
    key: "midjourney",
    name: "Midjourney",
    logo: logoMidjourney,
    accent: "border-orange-400/40 hover:border-orange-400",
    links: [
      { label: "Getting Started Guide", url: "https://docs.midjourney.com/hc/en-us/articles/33329261836941-Getting-Started-Guide" },
      { label: "Prompt Basics", url: "https://docs.midjourney.com/hc/en-us/articles/32023408776205-Prompt-Basics" },
    ],
  },
  {
    key: "kling",
    name: "Kling AI",
    logo: logoKling,
    accent: "border-fuchsia-400/40 hover:border-fuchsia-400",
    links: [
      { label: "Camera Control Guide", url: "https://app.klingai.com/global/quickstart/ai-camera-control-guide" },
      { label: "Video 3.0 Director Guide", url: "https://app.klingai.com/global/blog/kling-video-3-0-ai-director-features-guide" },
    ],
  },
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
      <EditableText
        as="p"
        value={content.sub || "Your go-to references for image generation"}
        onChange={(v) => onUpdate("sub", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>
    <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
      {tools.map((tool) => (
        <GlassPanel
          key={tool.key}
          className={`p-5 flex flex-col gap-3 border-2 ${tool.accent} transition-colors`}
        >
          <div className="flex items-center gap-3">
            <img src={tool.logo} alt={tool.name} className="w-16 h-16 object-contain shrink-0" />
            <span className="text-xl font-bold text-foreground">{tool.name}</span>
          </div>
          <div className="flex flex-col gap-2">
            {tool.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-foreground/80 hover:text-foreground font-medium transition-colors group"
              >
                <ExternalLink className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="truncate">{link.label}</span>
              </a>
            ))}
          </div>
        </GlassPanel>
      ))}
    </div>
  </div>
);

export default DocsSlide;
