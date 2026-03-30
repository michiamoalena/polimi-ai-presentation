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

const BAR_GRADIENTS = [
  "from-orange-500 to-pink-500",
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
}

const StatCard = ({ label, items }: StatCardProps) => (
  <GlassPanel className="p-5 flex flex-col">
    <h3 className="text-lg font-bold text-foreground mb-3">{label}</h3>
    <div className="flex flex-col justify-start gap-2">
      {items.length === 0 && (
        <p className="text-muted-foreground text-base italic">Waiting…</p>
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
  </GlassPanel>
);

interface VerticalBarsProps {
  label: string;
  data: Record<string, number>;
}

const VerticalBars = ({ label, data }: VerticalBarsProps) => {
  const bars = useMemo(() => {
    const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const maxCount = Math.max(...entries.map(([, c]) => c), 1);
    return entries.map(([name, count], i) => ({
      name,
      count,
      pct: (count / maxCount) * 100,
      gradient: BAR_GRADIENTS[i % BAR_GRADIENTS.length],
    }));
  }, [data]);

  return (
    <GlassPanel className="p-5 flex flex-col h-full">
      <h3 className="text-lg font-bold text-foreground mb-3">{label}</h3>
      <div className="flex-1 flex items-end justify-center gap-3 min-h-0 pb-1">
        {bars.length === 0 && (
          <p className="text-muted-foreground text-base italic pb-4">Waiting…</p>
        )}
        {bars.map((b) => (
          <div
            key={b.name}
            className="flex flex-col items-center gap-1"
            style={{ flex: "1 1 0", maxWidth: 72 }}
          >
            <span className="text-sm font-bold text-foreground tabular-nums">{b.count}</span>
            <div className="w-full rounded-t-lg bg-foreground/5 relative" style={{ height: 120 }}>
              <motion.div
                className={`absolute bottom-0 left-0 right-0 rounded-t-lg bg-gradient-to-t ${b.gradient}`}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(b.pct, 10)}%` }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              />
            </div>
            <span className="text-[11px] font-medium text-foreground text-center leading-tight w-full truncate">{b.name}</span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

interface WordCloudProps {
  label: string;
  data: Record<string, number>;
}

const WORD_COLORS = [
  "text-orange-500",
  "text-pink-500",
  "text-violet-500",
  "text-cyan-500",
  "text-emerald-500",
  "text-amber-500",
  "text-rose-500",
  "text-indigo-500",
];

const WordCloud = ({ label, data }: WordCloudProps) => {
  const words = useMemo(() => {
    const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const maxCount = Math.max(...entries.map(([, c]) => c), 1);
    return entries.map(([text, count]) => ({
      text,
      count,
      scale: 0.5 + (count / maxCount) * 1.5,
    }));
  }, [data]);

  return (
    <GlassPanel className="p-5 flex flex-col h-full">
      <h3 className="text-lg font-bold text-foreground mb-3">{label}</h3>
      <div className="flex-1 flex flex-wrap gap-x-5 gap-y-3 items-center content-center justify-center overflow-hidden">
        <AnimatePresence>
          {words.length === 0 && (
            <p className="text-muted-foreground text-base italic">Waiting…</p>
          )}
          {words.map((w, i) => (
            <motion.span
              key={w.text}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`font-bold ${WORD_COLORS[i % WORD_COLORS.length]} whitespace-nowrap`}
              style={{ fontSize: `${Math.round(w.scale * 24)}px` }}
            >
              {w.text}
              <span className="text-foreground/40 ml-1" style={{ fontSize: "0.55em" }}>{w.count}</span>
            </motion.span>
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

      <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
        {/* Left column */}
        <div className="flex flex-col gap-4 min-h-0">
          <StatCard label="Specialization" items={toItems(roleCount)} />
          <div className="flex-1 min-h-0">
            <VerticalBars label="AI Tools" data={toolCount} />
          </div>
        </div>
        {/* Right two columns */}
        <div className="col-span-2 flex flex-col gap-4 min-h-0">
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Status" items={toItems(statusCount)} />
            <StatCard label="Uses AI?" items={aiItems} />
          </div>
          <div className="flex-1 min-h-0">
            <WordCloud label="Why not AI?" data={noReasonCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveResultsSlide;
