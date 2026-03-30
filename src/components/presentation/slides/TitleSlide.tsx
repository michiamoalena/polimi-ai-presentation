import EditableText from "../EditableText";
import polimiLogo from "@/assets/polimi-logo.png";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const TitleSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col px-4 relative">
    {/* Gradient covers entire viewport — no frame possible */}
    <div
      className="fixed inset-0 pointer-events-none z-20"
      style={{
        background: 'radial-gradient(ellipse 390% 390% at 95% 95%, rgba(236,72,153,0.65) 0%, rgba(168,85,247,0.40) 15%, rgba(251,146,60,0.20) 30%, transparent 50%)',
      }}
    />

    {/* Title — vertically centered, above gradient */}
    <div className="flex-1 flex flex-col justify-center max-w-5xl pb-20 relative z-30">
      <h1 className="text-7xl font-extrabold text-foreground mb-6 leading-[1.1]">
        <span className="block">Meta & Techno Skills</span>
        <span className="block">of Working with Gen AI</span>
      </h1>
      <EditableText
        as="p"
        value={content.subtitle || "For Architects and Urbanists"}
        onChange={(v) => onUpdate("subtitle", v)}
        className="text-2xl text-muted-foreground font-medium"
      />
    </div>

    {/* Footer — single line with all info */}
    <div className="absolute bottom-8 left-10 right-10 z-30">
      <div className="flex w-full items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <EditableText
            as="p"
            value={content.author || "Alena Pavlova"}
            onChange={(v) => onUpdate("author", v)}
            className="text-lg font-semibold text-foreground"
          />
          <span className="text-muted-foreground/30 text-lg">·</span>
          <EditableText
            as="p"
            value={content.authorSub || "AI Enthusiast & PoliMi AUIC Student"}
            onChange={(v) => onUpdate("authorSub", v)}
            className="text-lg text-muted-foreground font-medium"
          />
        </div>

        <div className="flex items-baseline gap-5">
          <EditableText
            as="p"
            value={content.course || "Strumenti di Rappresentazione Innovativa del Progetto / 2026"}
            onChange={(v) => onUpdate("course", v)}
            className="text-lg font-semibold text-foreground"
          />
          <img src={polimiLogo} alt="Politecnico di Milano" className="h-[4rem] w-auto translate-y-[10px]" />
        </div>
      </div>
    </div>
  </div>
);

export default TitleSlide;
