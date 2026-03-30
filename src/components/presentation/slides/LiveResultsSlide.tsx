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
    <div className="w-full h-full flex flex-col">
      <div className="mb-6">
        <EditableText
          as="h1"
          value={content.heading || "The Course Data"}
          onChange={(v) => onUpdate("heading", v)}
          className="text-6xl font-extrabold text-foreground leading-tight"
        />
        <EditableText
          as="p"
          value={content.subtitle || "Live Results"}
          onChange={(v) => onUpdate("subtitle", v)}
          className="text-2xl text-muted-foreground mt-2 font-medium"
        />
      </div>

      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 min-h-0">
        {[
          { title: "Specialization", data: toChartData(roleCount) },
          { title: "Status", data: toChartData(statusCount) },
          { title: "Uses AI?", data: aiData },
          { title: "AI Tools", data: toChartData(toolCount) },
        ].map((chart) => (
          <GlassPanel key={chart.title} className="p-5 flex flex-col">
            <h3 className="text-xl font-bold text-foreground mb-3">{chart.title}</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart.data} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 14, fontWeight: 600 }} angle={-20} textAnchor="end" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 14 }} />
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
    </div>
  );
};

export default LiveResultsSlide;
