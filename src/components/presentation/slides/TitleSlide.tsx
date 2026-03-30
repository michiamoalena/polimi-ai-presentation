import EditableText from "../EditableText";
import polimiLogo from "@/assets/polimi-logo.png";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const TitleSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col px-4 relative">
    {/* Title — vertically centered */}
    <div className="flex-1 flex flex-col justify-center max-w-5xl pb-20">
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
    <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <EditableText
          as="p"
          value={content.author || "Alena Pavlova"}
          onChange={(v) => onUpdate("author", v)}
          className="text-base font-bold text-foreground"
        />
        <span className="text-muted-foreground/40 text-base">·</span>
        <EditableText
          as="p"
          value={content.authorSub || "AI Enthusiast & PoliMi AUIC Student"}
          onChange={(v) => onUpdate("authorSub", v)}
          className="text-base text-muted-foreground font-medium"
        />
      </div>
      <div className="flex items-center gap-4">
        <EditableText
          as="p"
          value={content.course || "Strumenti di Rappresentazione Innovativa del Progetto / 2026"}
          onChange={(v) => onUpdate("course", v)}
          className="text-base font-semibold text-foreground"
        />
        <img src={polimiLogo} alt="Politecnico di Milano" className="h-10 w-auto" />
      </div>
    </div>
  </div>
);

export default TitleSlide;
