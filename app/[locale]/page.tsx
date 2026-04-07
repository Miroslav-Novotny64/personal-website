"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ProjectTile } from "@/components/project-tile";
import { TechStack } from "@/components/tech-stack";
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

        <div className="mt-10 flex items-start justify-between gap-8 pl-2">
          <p className="text-sm text-muted-foreground font-medium tracking-tight shrink-0 max-w-xs text-right">
            {t("role")}
          </p>
        </div>
      </section>

      {/* ── BIO + CTA — right-offset, spacious ── */}
      <section className="mt-24 px-10 lg:px-24 flex justify-end">
        <div className="flex flex-col gap-6 max-w-sm">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("bio")}
          </p>
          <div className="flex items-center gap-3">
            <button className="group flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs rounded-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(244,34,114,0.25)]">
              {t("cta")}
              <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 border border-border/40 rounded-sm text-xs font-mono text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all duration-200"
            >
              <ExternalLink size={12} />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="mt-28 px-10 lg:px-24 border-t border-border/30 pt-8">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-muted-foreground/40 mb-6">
          Stack
        </p>
        <TechStack />
      </section>

      {/* ── TIMELINE ── */}
      <section className="mt-28 border-t border-border/30 pt-8 px-10 lg:px-24">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-muted-foreground/40 mb-8">
          Timeline
        </p>
        <TimelineSection />
      </section>

      {/* ── PROJECTS — centered bento ── */}
      <section className="mt-36 px-10 lg:px-24 mb-40">
        <div
          className="mx-auto"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gridTemplateRows: "auto auto",
            gap: "6px",
            maxWidth: "700px",
          }}
        >
          <div style={{ gridRow: "1", gridColumn: "1" }}>
            <ProjectTile
              index="01"
              title={t("projects.expertov.title")}
              description={t("projects.expertov.description")}
              size="medium"
              tags={["Next.js", "tRPC", "PostgreSQL", "Docker"]}
            />
          </div>

          <div style={{ gridRow: "1 / 3", gridColumn: "2" }}>
            <ProjectTile
              index="02"
              title={t("projects.flashscore.title")}
              description={t("projects.flashscore.description")}
              size="large"
              tags={["API", "Scraping"]}
              className="h-full"
            />
          </div>

          <div style={{ gridRow: "2", gridColumn: "1" }}>
            <ProjectTile
              index="03"
              title={t("projects.impostor.title")}
              description={t("projects.impostor.description")}
              size="small"
              tags={["React", "PWA"]}
            />
          </div>
        </div>
      </section>

    </main>
  );
}
