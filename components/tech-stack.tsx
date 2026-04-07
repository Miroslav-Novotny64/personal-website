"use client";

const STACK = [
  { label: "React", group: "frontend" },
  { label: "Next.js", group: "frontend" },
  { label: "TypeScript", group: "frontend" },
  { label: "tRPC", group: "backend" },
  { label: "Node.js", group: "backend" },
  { label: "Drizzle ORM", group: "backend" },
  { label: "PostgreSQL", group: "database" },
  { label: "Redis", group: "database" },
  { label: "MySQL", group: "database" },
  { label: "Docker", group: "devops" },
  { label: "Cloudflare", group: "devops" },
  { label: "GH Actions", group: "devops" },
  { label: "Arch Linux", group: "devops" },
  { label: "C", group: "lowlevel" },
  { label: "Java", group: "lowlevel" },
  { label: "Python", group: "lowlevel" },
];

const GROUP_COLORS: Record<string, string> = {
  frontend:  "text-primary/80",
  backend:   "text-foreground/60",
  database:  "text-muted-foreground",
  devops:    "text-foreground/60",
  lowlevel:  "text-muted-foreground/60",
};

export function TechStack() {
  return (
    <div className="relative">
      {/* Horizontal scrolling ticker-style stack list */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
        {STACK.map((item, i) => (
          <span
            key={item.label}
            className={`font-mono text-xs tracking-wider uppercase transition-colors duration-200 hover:text-primary cursor-default ${GROUP_COLORS[item.group]}`}
          >
            <span className="text-primary/30 mr-1">{String(i + 1).padStart(2, "0")}.</span>
            {item.label}
          </span>
        ))}
      </div>
      {/* Bottom rule */}
      <div className="mt-6 h-px bg-border/20" />
    </div>
  );
}
