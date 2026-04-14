"use client";

import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  description?: string;
  date: string;
  slug: string;
  readingTime?: string;
  index: string;
  className?: string;
}

export function BlogCard({
  title,
  description,
  date,
  slug,
  readingTime,
  index,
  className,
}: BlogCardProps) {
  const tCommon = useTranslations("Common");

  return (
    <Link
      href={{ pathname: "/blog/[slug]" as any, params: { slug } }}
      className={cn(
        "group relative flex flex-col justify-between p-8 border border-border/50 bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-500 rounded-sm overflow-hidden min-h-[320px]",
        className,
      )}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
        <span className="text-8xl font-black tracking-tighter uppercase leading-none">
          {index}
        </span>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex items-center gap-4">
          <p className="font-mono text-[10px] tracking-[0.3em] text-primary/80 uppercase">
            {"//"} post_{index} {"//"}
          </p>
          <div className="h-px w-8 bg-border/20 group-hover:w-12 transition-all duration-500" />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl xl:text-3xl font-black tracking-tight leading-none uppercase group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-10 pt-8 mt-auto border-t border-border/5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
            <Calendar size={12} className="text-primary/40" />
            {new Date(date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          {readingTime && (
            <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
              <Clock size={12} className="text-primary/40" />
              {readingTime}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
          <span className="font-mono text-[9px] uppercase tracking-widest font-bold">
            {tCommon("details")}
          </span>
          <ArrowUpRight size={14} />
        </div>
      </div>

      {/* Hover corner highlight */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t border-r border-primary/40 group-hover:w-8 group-hover:h-8 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-0 h-0 border-b border-l border-primary/40 group-hover:w-8 group-hover:h-8 transition-all duration-500" />
    </Link>
  );
}
