import EditableText from "../EditableText";
import polimiLogo from "@/assets/polimi-logo.png";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const TitleSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col justify-center px-4 relative">
    <div className="max-w-5xl">
      <EditableText
        as="h1"
        value={content.title || "Meta & Techno Skills\nof working with Gen AI"}
        onChange={(v) => onUpdate("title", v)}
        className="text-8xl font-extrabold text-foreground mb-8 leading-[1.05]"
        multiline
      />
      <EditableText
        as="p"
        value={content.subtitle || "For Architects and Urbanists"}
        onChange={(v) => onUpdate("subtitle", v)}
        className="text-3xl text-muted-foreground font-medium"
      />
    </div>

    <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
      <div>
        <EditableText
          as="p"
          value={content.author || "Alena Pavlova"}
          onChange={(v) => onUpdate("author", v)}
          className="text-2xl font-bold text-foreground"
        />
        <EditableText
          as="p"
          value={content.authorSub || "AI Enthusiast & PoliMi AUIC Student"}
          onChange={(v) => onUpdate("authorSub", v)}
          className="text-lg text-muted-foreground font-medium"
        />
      </div>
      <div className="flex items-end gap-6">
        <div className="text-right">
          <EditableText
            as="p"
            value={content.course || "Strumenti di Rappresentazione Innovativa del Progetto — 2026"}
            onChange={(v) => onUpdate("course", v)}
            className="text-lg text-muted-foreground uppercase tracking-wide font-medium"
          />
        </div>
        <img src={polimiLogo} alt="Politecnico di Milano" className="h-20 w-auto opacity-80" />
      </div>
    </div>
  </div>
);

export default TitleSlide;
