import EditableText from "../EditableText";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const TitleSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col justify-center px-4">
    <div className="max-w-4xl">
      <EditableText
        as="h1"
        value={content.title || "Meta & Techno Skills\nof working with Gen AI"}
        onChange={(v) => onUpdate("title", v)}
        className="text-7xl font-extrabold text-foreground mb-6 leading-[1.1]"
        multiline
      />
      <EditableText
        as="p"
        value={content.subtitle || "For Architects and Urbanists"}
        onChange={(v) => onUpdate("subtitle", v)}
        className="text-2xl text-muted-foreground"
      />
    </div>

    {/* Bottom info */}
    <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
      <div>
        <EditableText
          as="p"
          value={content.author || "Alena Pavlova"}
          onChange={(v) => onUpdate("author", v)}
          className="text-lg font-semibold text-foreground"
        />
        <EditableText
          as="p"
          value={content.authorSub || "AI Enthusiast & PoliMi AUIC Student"}
          onChange={(v) => onUpdate("authorSub", v)}
          className="text-sm text-muted-foreground"
        />
      </div>
      <div className="text-right">
        <EditableText
          as="p"
          value={content.course || "Strumenti di Rappresentazione Innovativa del Progetto"}
          onChange={(v) => onUpdate("course", v)}
          className="text-sm text-muted-foreground uppercase tracking-wide"
        />
        <EditableText
          as="p"
          value={content.year || "PoliMi — 2026"}
          onChange={(v) => onUpdate("year", v)}
          className="text-sm text-muted-foreground mt-1"
        />
      </div>
    </div>
  </div>
);

export default TitleSlide;
