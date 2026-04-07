"use client";

import { ExternalLink } from "lucide-react";

interface ProjectTileProps {
  title: string;
  description: string;
  index: string;
  size?: "small" | "medium" | "large";
  tags?: string[];
  className?: string;
}

export function ProjectTile({ title, description, index, size = "medium", tags = [], className }: ProjectTileProps) {
  const sizeStyles = {
    small: "p-5",
    medium: "p-7",
    large: "p-8",
  };

  const titleStyles = {
    small: "text-base",
    medium: "text-xl",
    large: "text-2xl",
  };

  return (
    <div className={`group relative border border-border/40 rounded-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(244,34,114,0.06)] bg-card/10 backdrop-blur-sm ${sizeStyles[size]} ${className}`}>

      {/* Corner bracket decoration */}
      <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none">
        <div className="absolute top-0 left-0 w-4 h-px bg-primary/40 group-hover:bg-primary/70 transition-colors duration-300" />
        <div className="absolute top-0 left-0 h-4 w-px bg-primary/40 group-hover:bg-primary/70 transition-colors duration-300" />
      </div>
      <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-4 h-px bg-border/40 group-hover:bg-primary/30 transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 h-4 w-px bg-border/40 group-hover:bg-primary/30 transition-colors duration-300" />
      </div>

      {/* Index */}
      <div className="font-mono text-[9px] tracking-widest text-primary/50 mb-3">
        [{index}]
      </div>

      {/* Title row */}
      <div className="flex justify-between items-start mb-3">
        <h3 className={`font-bold tracking-tight ${titleStyles[size]}`}>{title}</h3>
        <ExternalLink size={14} className="opacity-0 group-hover:opacity-50 transition-opacity text-primary mt-1 ml-4 shrink-0" />
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-widest uppercase px-2 py-1 border border-border/30 text-muted-foreground/50 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
