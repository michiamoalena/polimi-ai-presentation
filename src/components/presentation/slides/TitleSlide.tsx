import EditableText from "../EditableText";
import polimiLogo from "@/assets/polimi-logo.png";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const TitleSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col px-4 relative">
    {/* Title — vertically centered, with room to breathe */}
    <div className="flex-1 flex flex-col justify-center max-w-5xl pb-16">
      <EditableText
        as="h1"
        value={content.title || "Meta & Techno Skills of working with Gen AI"}
        onChange={(v) => onUpdate("title", v)}
        className="text-6xl font-extrabold text-foreground mb-6 leading-[1.1]"
        multiline
      />
      <EditableText
        as="p"
        value={content.subtitle || "For Architects and Urbanists"}
        onChange={(v) => onUpdate("subtitle", v)}
        className="text-2xl text-muted-foreground font-medium"
      />
    </div>

    {/* Footer */}
    <div className="absolute bottom-8 left-10 right-10 flex items-end justify-between">
      <div>
        <EditableText
          as="p"
          value={content.author || "Alena Pavlova"}
          onChange={(v) => onUpdate("author", v)}
          className="text-xl font-bold text-foreground"
        />
        <EditableText
          as="p"
          value={content.authorSub || "AI Enthusiast & PoliMi AUIC Student"}
          onChange={(v) => onUpdate("authorSub", v)}
          className="text-base text-muted-foreground font-medium"
        />
      </div>
      <div className="flex items-end gap-5">
        <EditableText
          as="p"
          value={content.course || "Strumenti di Rappresentazione Innovativa del Progetto — 2026"}
          onChange={(v) => onUpdate("course", v)}
          className="text-sm text-muted-foreground uppercase tracking-wide font-medium"
        />
        <img src={polimiLogo} alt="Politecnico di Milano" className="h-16 w-auto opacity-75" />
      </div>
    </div>
  </div>
);

export default TitleSlide;
