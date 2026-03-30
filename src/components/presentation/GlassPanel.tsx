import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

const GlassPanel = ({ children, className }: GlassPanelProps) => (
  <div className={cn("glass-panel rounded-2xl p-8", className)}>
    {children}
  </div>
);

export default GlassPanel;
