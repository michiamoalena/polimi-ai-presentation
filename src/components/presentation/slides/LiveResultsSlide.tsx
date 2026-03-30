import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
  roleCount: Record<string, number>;
  statusCount: Record<string, number>;
  aiCount: { yes: number; no: number };
  toolCount: Record<string, number>;
}

const COLORS = ["#f97316", "#ec4899", "#8b5cf6", "#06b6d4", "#10b981"];

const toChartData = (obj: Record<string, number>) =>
  Object.entries(obj).map(([name, value]) => ({ name, value }));

const LiveResultsSlide = ({ content, onUpdate, roleCount, statusCount, aiCount, toolCount }: Props) => {
  const aiData = [
    { name: "Yes", value: aiCount.yes },
    { name: "No", value: aiCount.no },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <EditableText
        as="h2"
        value={content.heading || "The PoliMi AI Pulse"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-4xl font-bold text-foreground text-center"
      />
      <EditableText
        as="p"
        value={content.subtitle || "Live Results"}
        onChange={(v) => onUpdate("subtitle", v)}
        className="text-xl text-muted-foreground text-center"
      />

      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Role", data: toChartData(roleCount) },
          { title: "Status", data: toChartData(statusCount) },
          { title: "Uses AI?", data: aiData },
          { title: "AI Tools", data: toChartData(toolCount) },
        ].map((chart) => (
          <GlassPanel key={chart.title} className="p-4 flex flex-col">
            <h3 className="text-lg font-semibold text-foreground mb-2">{chart.title}</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart.data} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-20} textAnchor="end" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel className="p-4">
        <div className="space-y-2">
          {[
            "discussion1||\"Look at our diversity! Whether you're on Erasmus or a local, we're all building the same future.\"",
            "discussion2||\"Most use ChatGPT, but let's see if you use it as an Exoskeleton or just a search engine.\"",
            "discussion3||\"To those who find it complex—today we fix that.\"",
          ].map((item) => {
            const [key, def] = item.split("||");
            return (
              <EditableText
                key={key}
                as="p"
                value={content[key] || def}
                onChange={(v) => onUpdate(key, v)}
                className="text-base text-foreground/80 italic"
              />
            );
          })}
        </div>
      </GlassPanel>
    </div>
  );
};

export default LiveResultsSlide;
