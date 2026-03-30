import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { GraduationCap, LayoutGrid, Zap } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const loopSteps = [
  { num: 1, color: "bg-orange-500", def: "Analyze book" },
  { num: 2, color: "bg-pink-500", def: "Extract materials" },
  { num: 3, color: "bg-violet-500", def: 'Generate "Cheat Code" prompt' },
];

const features = [
  {
    key: "hack",
    icon: <GraduationCap className="w-7 h-7 text-orange-500" />,
    title: "Student Hack",
    def: "1-year FREE subscription (Google One AI Premium).",
  },
  {
    key: "multi",
    icon: <LayoutGrid className="w-7 h-7 text-pink-500" />,
    title: "Multimodal",
    def: "Upload the novel PDF + your hand sketches.",
  },
  {
    key: "nano",
    icon: <Zap className="w-7 h-7 text-violet-500" />,
    title: "Nano Banana 2",
    def: "High-speed concept generation.",
  },
];

const GeminiSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-6">
      <EditableText
        as="h1"
        value={content.heading || "Gemini"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
      <EditableText
        as="p"
        value={content.sub || "Your Professional Hub"}
        onChange={(v) => onUpdate("sub", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>

    <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
      <GlassPanel className="p-8 flex flex-col justify-center">
        <EditableText
          as="h3"
          value={content.loopTitle || "The Loop"}
          onChange={(v) => onUpdate("loopTitle", v)}
          className="text-3xl font-bold text-foreground mb-8"
        />
        <div className="space-y-2">
          {loopSteps.map((step, i) => (
            <div key={step.num}>
              <div className="flex items-center gap-4 p-5 rounded-xl bg-background/60">
                <div className={`w-10 h-10 rounded-full ${step.color} text-white flex items-center justify-center text-lg font-bold shrink-0`}>
                  {step.num}
                </div>
                <EditableText
                  as="p"
                  value={content[`loop${step.num}`] || step.def}
                  onChange={(v) => onUpdate(`loop${step.num}`, v)}
                  className="text-2xl text-foreground/90 font-medium"
                />
              </div>
              {i < loopSteps.length - 1 && (
                <div className="ml-10 h-6 border-l-2 border-muted-foreground/20" />
              )}
            </div>
          ))}
        </div>
      </GlassPanel>

      <div className="flex flex-col gap-4">
        {features.map((f) => (
          <GlassPanel key={f.key} className="p-7 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              {f.icon}
              <EditableText
                as="h3"
                value={content[`${f.key}Title`] || f.title}
                onChange={(v) => onUpdate(`${f.key}Title`, v)}
                className="text-2xl font-bold text-foreground"
              />
            </div>
            <EditableText
              as="p"
              value={content[f.key] || f.def}
              onChange={(v) => onUpdate(f.key, v)}
              className="text-xl text-muted-foreground leading-relaxed font-medium"
            />
          </GlassPanel>
        ))}
      </div>
    </div>
  </div>
);

export default GeminiSlide;
