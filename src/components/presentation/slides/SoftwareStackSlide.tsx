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
  <div className="w-full h-full flex flex-col">
    <div className="mb-6">
      <EditableText
        as="h1"
        value={content.heading || "Your Software Stack"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
      <EditableText
        as="p"
        value={content.sub || "Grouped by Need"}
        onChange={(v) => onUpdate("sub", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>
    <GlassPanel className="flex-1 p-8">
      <div className="rounded-xl overflow-hidden border border-border h-full flex flex-col">
        <div className="grid grid-cols-3 bg-gradient-to-r from-violet-500/10 to-pink-500/10 font-bold text-foreground">
          <div className="p-5 text-xl">Task</div>
          <div className="p-5 text-xl">Tool</div>
          <div className="p-5 text-xl">Why?</div>
        </div>
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-3 border-t border-border flex-1">
            <div className="p-5 flex items-center">
              <EditableText
                value={content[`task${i}`] || row.task}
                onChange={(v) => onUpdate(`task${i}`, v)}
                className="text-xl text-foreground font-medium"
              />
            </div>
            <div className="p-5 flex items-center">
              <EditableText
                value={content[`tool${i}`] || row.tool}
                onChange={(v) => onUpdate(`tool${i}`, v)}
                className="text-xl font-bold text-foreground"
              />
            </div>
            <div className="p-5 flex items-center">
              <EditableText
                value={content[`why${i}`] || row.why}
                onChange={(v) => onUpdate(`why${i}`, v)}
                className="text-xl text-foreground/80 font-medium"
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  </div>
);

export default SoftwareStackSlide;
