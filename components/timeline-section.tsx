"use client";

const ENTRIES = [
  { year: "2026", label: "FIT ČVUT — Computer Engineering" },
  { year: "2026", label: "Graduated Educanet Praha (IT)" },
  { year: "2025", label: "Expertov — Graduation Thesis (SaaS)" },
  { year: "2024", label: "FIKS 12th year — 90.5 pts" },
];

export function TimelineSection() {
  return (
    <div className="relative">
      {/* Horizontal spine */}
      <div className="absolute top-[7px] left-0 right-0 h-px bg-border/30" />

      <div className="relative flex gap-0 overflow-x-auto pb-4">
        {ENTRIES.map((entry, i) => (
          <div key={i} className="flex-1 min-w-[160px] pr-8 group">
            {/* Dot on the spine */}
            <div className="w-3.5 h-3.5 rounded-full border border-border/50 bg-background group-hover:border-primary/60 group-hover:bg-primary/10 transition-all duration-200 mb-4" />

            <p className="font-mono text-[9px] tracking-widest text-primary/50 mb-1">
              {entry.year}
            </p>
            <p className="text-xs text-muted-foreground leading-snug">
              {entry.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
