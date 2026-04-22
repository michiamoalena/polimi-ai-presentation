import EditableText from "../EditableText";
import GlassPanel from "../GlassPanel";
import { Camera, Globe, ExternalLink } from "lucide-react";

interface Props {
  content: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}

const TwoDToThreeDSlide = ({ content, onUpdate }: Props) => (
  <div className="w-full h-full flex flex-col">
    <div className="mb-4">
      <EditableText
        as="h1"
        value={content.heading || "From 2D to 3D"}
        onChange={(v) => onUpdate("heading", v)}
        className="text-6xl font-extrabold text-foreground leading-tight"
      />
      <EditableText
        as="p"
        value={content.sub || "One photo → mesh. One image → walkable world."}
        onChange={(v) => onUpdate("sub", v)}
        className="text-2xl text-muted-foreground mt-2 font-medium"
      />
    </div>

    <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
      {/* LEFT: Photo → 3D Mesh */}
      <GlassPanel className="p-7 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center shrink-0">
            <Camera className="w-7 h-7 text-white" />
          </div>
          <EditableText
            as="h2"
            value={content.leftTitle || "Photo → 3D Mesh"}
            onChange={(v) => onUpdate("leftTitle", v)}
            className="text-3xl font-bold text-foreground leading-tight"
          />
        </div>

        <div>
          <EditableText
            as="p"
            value={content.oldLabel || "OLD WAY"}
            onChange={(v) => onUpdate("oldLabel", v)}
            className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1"
          />
          <EditableText
            as="p"
            value={content.oldWay || "Hours of remodelling a reference photo from scratch in Rhino."}
            onChange={(v) => onUpdate("oldWay", v)}
            className="text-lg text-foreground/85 leading-relaxed"
          />
        </div>

        <div>
          <EditableText
            as="p"
            value={content.newLabel || "NEW WAY"}
            onChange={(v) => onUpdate("newLabel", v)}
            className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent mb-1"
          />
          <EditableText
            as="p"
            value={content.newWay || "Mask the object → generate a clean 3D mesh you can edit in Rhino."}
            onChange={(v) => onUpdate("newWay", v)}
            className="text-lg text-foreground/90 leading-relaxed font-medium"
          />
        </div>

        <div>
          <EditableText
            as="p"
            value={content.flowLabel || "FLOW"}
            onChange={(v) => onUpdate("flowLabel", v)}
            className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1"
          />
          <EditableText
            as="p"
            value={content.flow || "Photo → Meta SAM (mask) → Rodin (mesh) → Rhino"}
            onChange={(v) => onUpdate("flow", v)}
            className="text-lg text-foreground/90 leading-relaxed font-mono"
          />
        </div>

        <EditableText
          as="p"
          value={content.leftHack || "💡 Best for: facades, furniture, single objects."}
          onChange={(v) => onUpdate("leftHack", v)}
          className="text-base text-foreground/70 italic mt-auto"
        />
      </GlassPanel>

      {/* RIGHT: Image → 3D World */}
      <GlassPanel className="p-7 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
            <Globe className="w-7 h-7 text-white" />
          </div>
          <EditableText
            as="h2"
            value={content.rightTitle || "Image → 3D World"}
            onChange={(v) => onUpdate("rightTitle", v)}
            className="text-3xl font-bold text-foreground leading-tight"
          />
        </div>

        <div>
          <EditableText
            as="p"
            value={content.trickLabel || "THE TRICK"}
            onChange={(v) => onUpdate("trickLabel", v)}
            className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1"
          />
          <EditableText
            as="p"
            value={content.trick || "Drop one render → AI builds a navigable spatial scene around it."}
            onChange={(v) => onUpdate("trick", v)}
            className="text-lg text-foreground/85 leading-relaxed"
          />
        </div>

        <div>
          <EditableText
            as="p"
            value={content.useLabel || "USE FOR"}
            onChange={(v) => onUpdate("useLabel", v)}
            className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent mb-1"
          />
          <EditableText
            as="p"
            value={content.useCase || "Concept reviews, atmosphere checks, client walk-arounds — before you model anything."}
            onChange={(v) => onUpdate("useCase", v)}
            className="text-lg text-foreground/90 leading-relaxed font-medium"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <EditableText
              as="p"
              value={content.toolLabel || "TOOL"}
              onChange={(v) => onUpdate("toolLabel", v)}
              className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1"
            />
            <EditableText
              as="p"
              value={content.tool || "World Labs"}
              onChange={(v) => onUpdate("tool", v)}
              className="text-xl text-foreground/90 font-bold"
            />
          </div>
          <a
            href="https://www.worldlabs.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <ExternalLink className="w-4 h-4" />
            worldlabs.ai
          </a>
        </div>

        <EditableText
          as="p"
          value={content.rightHack || "💡 Best for: full scenes, atmospheres, urban moods."}
          onChange={(v) => onUpdate("rightHack", v)}
          className="text-base text-foreground/70 italic mt-auto"
        />
      </GlassPanel>
    </div>

    <EditableText
      as="p"
      value={content.tagline || "You stop modelling everything. You start curating what AI gives you."}
      onChange={(v) => onUpdate("tagline", v)}
      className="text-xl text-center text-foreground/70 italic font-medium mt-6"
    />
  </div>
);

export default TwoDToThreeDSlide;
