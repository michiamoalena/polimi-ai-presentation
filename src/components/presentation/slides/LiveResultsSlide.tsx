import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
  roleCount: Record<string, number>;
  statusCount: Record<string, number>;
  aiCount: { yes: number; no: number };
  toolCount: Record<string, number>;
  noReasonCount?: Record<string, number>;
}

const BUBBLE_COLORS = [
  "from-orange-400 to-pink-500",
  "from-pink-500 to-fuchsia-500",
  "from-violet-500 to-purple-600",
  "from-cyan-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-red-500",
  "from-indigo-400 to-violet-500",
];

interface StatCardProps {
  label: string;
  items: { name: string; count: number; pct: number }[];
  total: number;
}

const StatCard = ({ label, items, total }: StatCardProps) => (
  <GlassPanel className="p-5 flex flex-col">
    <h3 className="text-lg font-bold text-foreground mb-3">{label}</h3>
    <div className="flex-1 flex flex-col justify-center gap-2">
      {items.length === 0 && (
        <p className="text-muted-foreground text-base italic">Waiting for responses…</p>
      )}
      {items.map((item) => (
        <div key={item.name}>
          <div className="flex justify-between mb-1">
            <span className="text-base font-semibold text-foreground truncate">{item.name}</span>
            <span className="text-base font-bold text-foreground tabular-nums ml-2">{item.count}</span>
          </div>
          <div className="h-2.5 rounded-full bg-foreground/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${item.pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
    <div className="mt-3 pt-3 border-t border-border">
      <span className="text-2xl font-extrabold text-foreground">{total}</span>
      <span className="text-base text-muted-foreground ml-2">total</span>
    </div>
  </GlassPanel>
);

interface BubbleCloudProps {
  label: string;
  data: Record<string, number>;
}

const BubbleCloud = ({ label, data }: BubbleCloudProps) => {
  const bubbles = useMemo(() => {
    const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const maxCount = Math.max(...entries.map(([, c]) => c), 1);
    return entries.map(([name, count], i) => ({
      name,
      count,
      scale: 0.6 + (count / maxCount) * 0.4,
      color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
    }));
  }, [data]);

  return (
    <GlassPanel className="p-5 flex flex-col">
      <h3 className="text-lg font-bold text-foreground mb-3">{label}</h3>
      <div className="flex-1 flex flex-wrap gap-2 items-center content-center justify-center overflow-hidden">
        <AnimatePresence>
          {bubbles.length === 0 && (
            <p className="text-muted-foreground text-base italic">Waiting for responses…</p>
          )}
          {bubbles.map((b) => (
            <motion.div
              key={b.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`bg-gradient-to-br ${b.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
              style={{
                width: `${Math.round(b.scale * 110)}px`,
                height: `${Math.round(b.scale * 110)}px`,
                fontSize: `${Math.max(11, Math.round(b.scale * 16))}px`,
              }}
            >
              <div className="text-center leading-tight px-1">
                <div className="truncate max-w-[90px]">{b.name}</div>
                <div className="text-white/80 text-xs">{b.count}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassPanel>
  );
};

const LiveResultsSlide = ({ content, onUpdate, roleCount, statusCount, aiCount, toolCount, noReasonCount = {} }: Props) => {
  const total = Object.values(roleCount).reduce((a, b) => a + b, 0) || 0;

  const toItems = (obj: Record<string, number>) => {
    const t = Object.values(obj).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count, pct: (count / t) * 100 }));
  };

  const aiItems = [
    { name: "Yes", count: aiCount.yes, pct: total ? (aiCount.yes / total) * 100 : 0 },
    { name: "No", count: aiCount.no, pct: total ? (aiCount.no / total) * 100 : 0 },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4">
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

      <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-4 min-h-0">
        {/* Row 1: Metrics */}
        <StatCard label="Specialization" items={toItems(roleCount)} total={total} />
        <StatCard label="Status" items={toItems(statusCount)} total={total} />
        <StatCard label="Uses AI?" items={aiItems} total={total} />

        {/* Row 2: Bubble clouds */}
        <div className="col-span-2">
          <BubbleCloud label="AI Tools" data={toolCount} />
        </div>
        <BubbleCloud label="Why not AI?" data={noReasonCount} />
      </div>
    </div>
  );
};

export default LiveResultsSlide;
