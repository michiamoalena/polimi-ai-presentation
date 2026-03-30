import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const TitleSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex items-center justify-center">
    <GlassPanel className="max-w-3xl w-full text-center py-16 px-12">
      <EditableText
        as="h1"
        value={content.title || "Meta & Techno Skills of Working with Gen AI"}
        onChange={(v) => onUpdate("title", v)}
        className="text-5xl font-extrabold text-foreground mb-6 leading-tight"
      />
      <EditableText
        as="h2"
        value={content.subtitle || "For Architects and Urbanists"}
        onChange={(v) => onUpdate("subtitle", v)}
        className="text-2xl font-medium text-muted-foreground mb-8"
      />
      <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500" />
      <EditableText
        as="p"
        value={content.author || "PoliMi — 2025"}
        onChange={(v) => onUpdate("author", v)}
        className="text-lg text-muted-foreground mt-6"
      />
    </GlassPanel>
  </div>
);

export default TitleSlide;
