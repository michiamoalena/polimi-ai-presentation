import { QRCodeSVG } from "qrcode.react";
import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
  pollUrl: string;
  liveCount: number;
}

const QRCodeSlide = ({ content, onUpdate, pollUrl, liveCount }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-6">
      <EditableText
        as="h1"
        value={content.heading || "Let's Connect!"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-5xl font-extrabold text-foreground leading-tight"
      />
      <EditableText
        as="p"
        value={content.subheading || "Live Poll"}
        onChange={(v) => onUpdate("subheading", v)}
        className="text-xl text-muted-foreground mt-1"
      />
    </div>
    <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
      <GlassPanel className="flex flex-col items-center justify-center p-8">
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <QRCodeSVG value={pollUrl} size={260} level="H" />
        </div>
        <EditableText
          as="p"
          value={content.instruction || "Scan the QR Code to join our live session"}
          onChange={(v) => onUpdate("instruction", v)}
          className="text-lg text-muted-foreground mt-6 text-center max-w-sm"
        />
      </GlassPanel>
      <GlassPanel className="flex flex-col items-center justify-center p-8">
        <EditableText
          as="h3"
          value={content.pollTitle || "The Poll"}
          onChange={(v) => onUpdate("pollTitle", v)}
          className="text-2xl font-bold text-foreground mb-6"
        />
        <div className="space-y-3 text-left w-full">
          {["1. What is your role?", "2. Status?", "3. Do you use AI?", "4. Which tools? / Why not?"].map((q, i) => (
            <EditableText
              key={i}
              as="p"
              value={content[`q${i}`] || q}
              onChange={(v) => onUpdate(`q${i}`, v)}
              className="text-lg text-foreground/80"
            />
          ))}
        </div>
        <div className="mt-8 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-2xl font-bold text-foreground">{liveCount}</span>
          <span className="text-muted-foreground">joined</span>
        </div>
      </GlassPanel>
    </div>
  </div>
);

export default QRCodeSlide;
