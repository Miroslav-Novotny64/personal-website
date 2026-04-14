"use client";

import { Link } from "@/i18n/navigation";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ProjectTileProps {
  title: string;
  description: string;
  index: string;
  slug?: string;
  video?: string;
  image?: string;
  tags?: string[];
  problem?: string;
  solution?: string;
  impact?: string;
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
  className?: string;
  variant?: "featured" | "grid";
}

export function ProjectTile({
  title,
  description,
  index,
  slug,
  video,
  image,
  tags = [],
  problem,
  solution,
  impact,
  liveUrl,
  repoUrl,
  caseStudyUrl,
  className = "",
  variant = "featured",
}: ProjectTileProps) {
  const isGrid = variant === "grid";
  const t = useTranslations("Home.projects");
  const tCommon = useTranslations("Common");

  const commonClassName = [
    "group relative block overflow-hidden",
    "border border-border/50 bg-card/20",
    "transition-all duration-300",
    "hover:border-primary/30 hover:bg-card/40",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className,
  ].join(" ");

  const content = (
    <div className={cn("grid grid-cols-1", isGrid ? "flex flex-col h-full" : "lg:grid-cols-12")}>
      {/* MEDIA: Left in featured, Top in grid */}
      <div className={cn("relative", isGrid ? "w-full" : "lg:col-span-6")}>
        <div className="relative w-full bg-muted/30">
          <div className="relative aspect-video w-full overflow-hidden">
            {video ? (
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls={false}
                className="h-full w-full object-cover transition-all duration-700"
              />
            ) : image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                {tCommon("no_preview")}
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* TEXT: Right in featured, Bottom in grid */}
      <div className={cn("relative", isGrid ? "flex-1" : "lg:col-span-6")}>
        <div className={cn(
          "flex h-full flex-col justify-between gap-6",
          isGrid ? "p-6" : "p-6 sm:p-8 xl:p-10"
        )}>
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] tracking-[0.3em] text-primary/80 uppercase">
                // project_{index} //
              </p>
              <div className="flex items-center gap-2">
                {tags.slice(0, 3).map(tag => (
                   <span key={tag} className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-tighter">
                     {tag}
                   </span>
                ))}
              </div>
            </div>

            <h3 className={cn(
              "font-black tracking-tight leading-none uppercase",
              isGrid ? "text-xl" : "text-3xl xl:text-4xl"
            )}>
              {title}
            </h3>

            {/* PROBLEM -> SOLUTION */}
            <div className="grid grid-cols-1 gap-4 pt-2 border-t border-border/20">
              {problem && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary/60">{t("problem_label")}</span>
                  <p className="text-xs lg:text-[13px] text-muted-foreground leading-relaxed italic">
                    {problem}
                  </p>
                </div>
              )}
              {solution && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary/60">{t("solution_label")}</span>
                  <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                    {solution}
                  </p>
                </div>
              )}
            </div>

            {impact && (
              <div className="pt-4 border-t border-border/10">
                 <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary/40">{t("impact_label")}:</span>
                    <p className="text-sm font-bold text-foreground tracking-tight">
                      {impact}
                    </p>
                 </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/5">
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group/btn flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-300"
              >
                {tCommon("live")}
                <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            )}
            {repoUrl && (
              <a 
                href={repoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2 border border-border/30 hover:border-primary/40 text-muted-foreground hover:text-foreground text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-300"
              >
                {tCommon("repo")}
                <ExternalLink size={12} />
              </a>
            )}
            {caseStudyUrl && (
               <Link 
                href={caseStudyUrl as any} 
                className="flex items-center gap-2 px-4 py-2 border border-border/30 hover:border-primary/40 text-muted-foreground hover:text-foreground text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-300"
              >
                {tCommon("case_study")}
              </Link>
            )}
            
            {/* Fallback link if no URLs provided but slug exists */}
            {!liveUrl && !repoUrl && !caseStudyUrl && slug && (
              <Link 
                href={{ pathname: "/projects/[slug]" as any, params: { slug } }}
                className="flex items-center gap-2 px-5 py-2.5 bg-border/20 hover:bg-primary hover:text-primary-foreground text-foreground text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-300"
              >
                {tCommon("details")}
                <ArrowUpRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={commonClassName}>
      {content}
    </div>
  );
}