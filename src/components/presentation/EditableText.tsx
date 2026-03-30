import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "li";
  multiline?: boolean;
}

const EditableText = ({ value, onChange, className, as: Tag = "p", multiline = false }: EditableTextProps) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  return (
    <Tag
      ref={ref as any}
      className={cn(
        className,
        "outline-none transition-all cursor-text",
        editing
          ? "ring-2 ring-primary/30 rounded-lg px-2 -mx-2 bg-white/50"
          : "hover:ring-1 hover:ring-primary/10 hover:rounded-lg"
      )}
      contentEditable={editing}
      suppressContentEditableWarning
      onClick={() => setEditing(true)}
      onBlur={(e) => {
        setEditing(false);
        onChange((e.target as HTMLElement).innerText);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !multiline) {
          e.preventDefault();
          (e.target as HTMLElement).blur();
        }
        if (e.key === "Escape") {
          (e.target as HTMLElement).blur();
        }
      }}
    >
      {value}
    </Tag>
  );
};

export default EditableText;
