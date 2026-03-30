import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const rows = [
  { task: "Brainstorm & Analyze", tool: "Gemini", why: "FREE for students. Best for long PDFs/Books." },
  { task: "Quick Fixes & Edits", tool: "ChatGPT (Canvas)", why: 'Best "Brush" tool. Fix details by talking to the image.' },
  { task: "Aesthetic Mastery", tool: "Midjourney", why: "Best lighting and textures. Use --sref for style." },
  { task: "Camera & POV", tool: "Kling AI / LookX", why: "Set exact angles (Top-down, 2-point perspective)." },
];

const SoftwareStackSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex items-center justify-center">
    <GlassPanel className="max-w-5xl w-full p-12">
      <EditableText
        as="h2"
        value={content.heading || "Your Software Stack (Grouped by Need)"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-4xl font-bold text-foreground mb-8"
      />
      <div className="rounded-xl overflow-hidden border border-border">
        <div className="grid grid-cols-3 bg-gradient-to-r from-violet-500/10 to-pink-500/10 font-semibold text-foreground">
          <div className="p-4 text-lg">Task</div>
          <div className="p-4 text-lg">Tool</div>
          <div className="p-4 text-lg">Why?</div>
        </div>
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-3 border-t border-border">
            <div className="p-4">
              <EditableText
                value={content[`task${i}`] || row.task}
                onChange={(v) => onUpdate(`task${i}`, v)}
                className="text-lg text-foreground"
              />
            </div>
            <div className="p-4">
              <EditableText
                value={content[`tool${i}`] || row.tool}
                onChange={(v) => onUpdate(`tool${i}`, v)}
                className="text-lg font-semibold text-foreground"
              />
            </div>
            <div className="p-4">
              <EditableText
                value={content[`why${i}`] || row.why}
                onChange={(v) => onUpdate(`why${i}`, v)}
                className="text-lg text-foreground/80"
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  </div>
);

export default SoftwareStackSlide;
