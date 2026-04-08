"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, ExternalLink, ArrowDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProjectTile } from "@/components/project-tile";
import { TimelineSection } from "@/components/timeline-section";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="pt-28 lg:px-24">
        <h1 className="text-[clamp(4rem,13vw,9rem)] font-black tracking-tighter uppercase leading-[0.6]">
          {t("name").split(" ")[0]}
          <br />
          <span className="text-primary">{t("name").split(" ")[1]}</span>
        </h1>

        <div className="mt-10 flex flex-col md:flex-row items-start justify-between gap-8 pl-2">
          <p className="text-sm text-muted-foreground font-medium tracking-tight shrink-0 max-w-xs md:text-right">
            {t("role")}
          </p>

          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/30 hover:text-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/30 hover:text-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.771-.773 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/30 hover:text-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.894.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.872.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" /></svg>
            </a>
            <a href="mailto:hello@example.com" className="text-muted-foreground/30 hover:text-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── BIO + CTA — balanced layout ── */}
      <section className="mt-24 px-10 lg:px-24 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
        <button 
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex flex-col items-start gap-4 transition-all duration-300 cursor-pointer"
        >
          <span className="font-mono text-xs tracking-[0.4em] uppercase text-primary font-bold group-hover:scale-105 transition-transform origin-left">
            MÉ PROJEKTY
          </span>
          <div className="relative">
             <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
             <ArrowDown className="w-20 h-20 stroke-[0.3px] text-primary group-hover:translate-y-4 transition-all duration-500 relative z-10" />
          </div>
        </button>
        
        <div className="relative max-w-sm w-full">

          {/* Fat pink corner — top-left */}
          <div className="absolute -top-px -left-px w-10 h-[2px] bg-primary" />
          <div className="absolute -top-px -left-px w-[2px] h-10 bg-primary" />

          {/* Fat pink corner — bottom-right */}
          <div className="absolute -bottom-px -right-px w-10 h-[2px] bg-primary" />
          <div className="absolute -bottom-px -right-px w-[2px] h-10 bg-primary" />

          <div className="border border-dashed border-border/40 p-6 flex flex-col gap-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("bio")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button className="group flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs rounded-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(244,34,114,0.25)]">
                {t("cta")}
                <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button className="flex items-center gap-2 px-5 py-3 border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 font-bold uppercase tracking-widest text-xs rounded-sm transition-all duration-200">
                {t("see_cv")}
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE (between fold) ── */}
      <section className="mt-[60vh] border-t border-border/30 pt-16 px-10 lg:px-24 mb-40">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-muted-foreground/40 mb-8">
          Timeline
        </p>
        <TimelineSection />
      </section>

      {/* ── PROJECTS — 4 cards, asymmetric touching ── */}
      <section id="projects" className="mt-48 px-10 lg:px-24 mb-60">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="flex w-full items-end -mb-px">
            {/* Project 01 */}
            <div className="w-[40%] -mr-px shrink-0">
               <ProjectTile
                index="01"
                title={t("projects.expertov.title")}
                description={t("projects.expertov.description")}
                size="medium"
                tags={["Next.js", "tRPC", "PostgreSQL", "Docker"]}
              />
            </div>
            {/* Project 02 */}
            <div className="w-[60%] shrink-0">
              <ProjectTile
                index="02"
                title={t("projects.flashscore.title")}
                description={t("projects.flashscore.description")}
                size="large"
                tags={["API", "Scraping"]}
                className="h-[400px]"
              />
            </div>
          </div>

          <div className="flex w-full items-start">
            {/* Project 03 */}
            <div className="w-[50%] -mr-px shrink-0 pl-[10%]">
              <ProjectTile
                index="03"
                title={t("projects.impostor.title")}
                description={t("projects.impostor.description")}
                size="small"
                tags={["React", "PWA"]}
                className="h-[300px]"
              />
            </div>
            {/* Project 04 - Active Preview */}
            <div className="w-[40%] shrink-0">
              <ProjectTile
                index="04"
                title={t("projects.placeholder.title")}
                description={t("projects.placeholder.description")}
                size="small"
                tags={["Upcoming"]}
                className="h-[300px]"
              />
            </div>
          </div>

          <div className="mt-16">
            <Link 
              href="/projects" 
              className="group flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50 hover:text-primary transition-all duration-300"
            >
              {t("projects.view_all")}
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
