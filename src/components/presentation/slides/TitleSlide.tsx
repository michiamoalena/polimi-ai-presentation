import EditableText from "../EditableText";
import polimiLogo from "@/assets/polimi-logo.png";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const TitleSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col px-4 relative overflow-hidden">
    {/* Vibrant gradient orb — left-center */}
    <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-400/60 via-pink-500/50 to-fuchsia-500/40 blur-[120px] pointer-events-none" />
    <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-violet-500/35 to-pink-400/25 blur-[100px] pointer-events-none" />
    {/* Title — vertically centered */}
    <div className="flex-1 flex flex-col justify-center max-w-5xl pb-20">
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
