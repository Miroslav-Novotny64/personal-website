"use client";

import { useTranslations } from "next-intl";
import { GraduationCap, Briefcase, Code, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type Item = {
  id: string;
  logo?: string;
  type: "education" | "work" | "internship" | "freelance";
};

// All items sorted strictly chronologically within their respective categorizations 
// (the exact order they'll map out in columns, so maintain logical flow).
const ALL_ITEMS: Item[] = [
  { id: "cvut",      logo: "/CVUT_znak.svg.png", type: "education" },
  { id: "parot",     logo: "/parot.png", type: "freelance" },
  { id: "e55",       logo: "/E55-logo.webp", type: "internship" },
  { id: "eywo",      logo: "/eywo_logo.jpg", type: "internship" },
  { id: "expertov",  logo: "/expertov.png", type: "freelance" },
  { id: "tretera",   type: "internship" },
  { id: "referee",   logo: "/ceskyflorbal_logo.jpg", type: "work" },
  { id: "itnetwork", logo: "/itnetworkcz_logo.jpg", type: "work" },
  { id: "educanet",  logo: "/educanet.jpg", type: "education" },
];

export function ExperiencesSection() {
  const t = useTranslations("Experiences");

  const renderItem = (item: Item) => {
    const title = t(`items.${item.id}.title`);
    const date = t(`items.${item.id}.date`);
    // Use t.has() to safely check for translations without throwing MISSING_MESSAGE
    const orgOrSubtitle = (t as any).has(`items.${item.id}.org`)
      ? t(`items.${item.id}.org` as any)
      : (t as any).has(`items.${item.id}.subtitle`)
        ? t(`items.${item.id}.subtitle` as any)
        : "";
    const description = t(`items.${item.id}.description`);

    const Icon = item.type === "education" ? GraduationCap : item.type === "freelance" ? Code : Briefcase;
    const pathname = item.type === "education" ? "/education/[slug]" : "/experience/[slug]";

    return (
      <Link 
        key={item.id} 
        href={{ pathname: pathname as any, params: { slug: item.id } }} 
        className="group relative flex flex-col gap-3 rounded-2xl border border-transparent hover:border-border/40 hover:bg-muted/10 p-5 transition-all duration-300"
      >
        <div className="absolute top-5 right-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
          <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors duration-300" />
        </div>

        <div className="flex items-start gap-4">
            {/* Logo */}
            <div className={cn("relative flex h-[46px] w-[46px] shrink-0 items-center justify-center bg-transparent overflow-hidden", item.id === "educanet" ? "rounded-full" : "rounded-xl")}>
            {item.logo ? (
                <Image src={item.logo} alt={title} fill sizes="46px" className="object-contain" />
            ) : (
                <div className="text-muted-foreground/50">
                <Icon className="w-5 h-5" />
                </div>
            )}
            </div>
            
            <div className="flex flex-col flex-1 pt-0.5">
                <h3 className="font-bold text-[14px] leading-tight text-foreground flex items-center flex-wrap gap-2">
                  {title}
                  
                  {item.type === "internship" && (
                     <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 border rounded-sm text-primary border-primary/50 bg-primary/10">
                       {t("tags.intern")}
                     </span>
                  )}
                  {item.type === "freelance" && (
                     <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 border rounded-sm text-emerald-500 border-emerald-500/50 bg-emerald-500/10">
                       {t("tags.freelance")}
                     </span>
                  )}
                </h3>
                <span className="text-[11px] font-mono text-muted-foreground mt-1">
                  {date}
                </span>
            </div>
        </div>

        <div className="flex flex-col gap-0.5 mt-1">
            {orgOrSubtitle && (
            <div className={cn("text-[13px] font-mono font-bold leading-tight", item.type === "freelance" ? "text-emerald-500/90" : "text-primary/90")}>
                {orgOrSubtitle}
            </div>
            )}
            <p className="text-[13px] text-muted-foreground/80 mt-1.5 leading-relaxed">
            {description}
            </p>
        </div>
      </Link>
    );
  };

  const jobs = ALL_ITEMS.filter(i => i.type === "work" || i.type === "internship");
  const freelance = ALL_ITEMS.filter(i => i.type === "freelance");
  const education = ALL_ITEMS.filter(i => i.type === "education");

  return (
    <div className="flex w-full flex-col lg:flex-row gap-10 lg:gap-8 xl:gap-12">
      
      {/* Column 1: Education */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3 px-2 mb-6">
          <GraduationCap className="w-4 h-4 text-primary" />
          <h2 className="text-[13px] font-mono font-bold uppercase tracking-[0.2em] text-foreground/80">
            {t("categories.education")}
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {education.map((item) => renderItem(item))}
        </div>
      </div>

      {/* Column 2: Jobs & Internships (Moved to Middle) */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3 px-2 mb-6">
          <Briefcase className="w-4 h-4 text-primary" />
          <h2 className="text-[13px] font-mono font-bold uppercase tracking-[0.2em] text-foreground/80">
            {t("categories.jobs")}
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {jobs.map((item) => renderItem(item))}
        </div>
      </div>

      {/* Column 2: Freelance */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3 px-2 mb-6">
          <Code className="w-4 h-4 text-emerald-500" />
          <h2 className="text-[13px] font-mono font-bold uppercase tracking-[0.2em] text-foreground/80">
            {t("categories.freelance")}
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {freelance.map((item) => renderItem(item))}
        </div>
      </div>

    </div>
  );
}
