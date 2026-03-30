import EditableText from "../EditableText";
import polimiLogo from "@/assets/polimi-logo.png";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const TitleSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col px-4 relative overflow-hidden">
    {/* Full-slide radial gradient from bottom-right corner */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse 120% 120% at 100% 100%, rgba(236,72,153,0.5) 0%, rgba(168,85,247,0.3) 25%, rgba(251,146,60,0.12) 45%, transparent 65%)',
      }}
    />

    {/* Title — vertically centered, above gradient */}
    <div className="flex-1 flex flex-col justify-center max-w-5xl pb-20 relative z-10">
      <EditableText
        as="p"
        value={content.label || "Presentation:"}
        onChange={(v) => onUpdate("label", v)}
        className="text-2xl text-muted-foreground font-medium mb-4"
      />
      <EditableText
        as="h1"
        value={content.title || "Meta & Techno Skills of working with Gen AI"}
        onChange={(v) => onUpdate("title", v)}
        className="text-7xl font-extrabold text-foreground mb-6 leading-[1.1]"
        multiline
      />
      <EditableText
        as="p"
        value={content.subtitle || "For Architects and Urbanists"}
        onChange={(v) => onUpdate("subtitle", v)}
        className="text-2xl text-muted-foreground font-medium"
      />
    </div>

    {/* Footer — single line with all info */}
    <div className="absolute bottom-8 left-10 right-10">
      <div className="flex w-full items-end justify-between">
        <div className="flex items-baseline gap-3 leading-none">
          <EditableText
            as="p"
            value={content.author || "Alena Pavlova"}
            onChange={(v) => onUpdate("author", v)}
            className="text-lg font-bold text-foreground leading-none"
          />
          <span className="text-muted-foreground/30 text-lg leading-none">·</span>
          <EditableText
            as="p"
            value={content.authorSub || "AI Enthusiast & PoliMi AUIC Student"}
            onChange={(v) => onUpdate("authorSub", v)}
            className="text-lg text-muted-foreground font-medium leading-none"
          />
        </div>

        <div className="flex items-end gap-4 leading-none">
          <EditableText
            as="p"
            value={content.course || "Strumenti di Rappresentazione Innovativa del Progetto / 2026"}
            onChange={(v) => onUpdate("course", v)}
            className="text-lg font-semibold text-foreground leading-none mb-[2px]"
          />
          <img src={polimiLogo} alt="Politecnico di Milano" className="h-20 w-auto -mb-[2px]" />
        </div>
      </div>
    </div>
  </div>
);

export default TitleSlide;
