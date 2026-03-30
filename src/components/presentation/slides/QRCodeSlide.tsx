import { QRCodeSVG } from "qrcode.react";
import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { ExternalLink } from "lucide-react";

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
        value={content.heading || "Welcome!"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
      <EditableText
        as="p"
        value={content.subheading || "Live Poll"}
        onChange={(v) => onUpdate("subheading", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>
    <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
      <GlassPanel className="flex flex-col items-center justify-center p-8">
        <div className="bg-white p-5 rounded-2xl shadow-lg">
          <QRCodeSVG value={pollUrl} size={300} level="H" />
        </div>
        <EditableText
          as="p"
          value={content.instruction || "Scan the QR Code to join the live session"}
          onChange={(v) => onUpdate("instruction", v)}
          className="text-xl text-muted-foreground mt-6 text-center max-w-sm font-medium"
        />
        <a
          href={pollUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          <ExternalLink className="w-5 h-5" />
          <span>Open in browser</span>
        </a>
      </GlassPanel>
      <GlassPanel className="flex flex-col items-center justify-center p-8">
        <EditableText
          as="h3"
          value={content.pollTitle || "The Poll"}
          onChange={(v) => onUpdate("pollTitle", v)}
          className="text-3xl font-bold text-foreground mb-6"
        />
        <div className="space-y-4 text-left w-full">
          {[
            "1. What is your specialization? (Architect / Urbanist / Engineer)",
            "2. Status? (Erasmus / Resident)",
            "3. Do you use AI in your daily life? (Yes / No)",
            "4. If YES: Which tools? (ChatGPT, Gemini, Midjourney, etc.)",
            "5. If NO: Why not? (Too complex / Not accurate / Other)",
          ].map((q, i) => (
            <EditableText
              key={i}
              as="p"
              value={content[`q${i}`] || q}
              onChange={(v) => onUpdate(`q${i}`, v)}
              className="text-xl text-foreground/85 font-medium"
            />
          ))}
        </div>
        <div className="mt-8 flex items-center gap-4">
          <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
          <span className="text-3xl font-bold text-foreground">{liveCount}</span>
          <span className="text-xl text-muted-foreground font-medium">joined</span>
        </div>
      </GlassPanel>
    </div>
  </div>
);

export default QRCodeSlide;
