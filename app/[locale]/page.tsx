"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, ExternalLink, ArrowDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProjectTile } from "@/components/project-tile";
import { ExperiencesSection } from "@/components/experiences-section";
import { useEffect, useState } from "react";

export default function Home() {
  const t = useTranslations("Home");
  const tProjects = useTranslations("Projects");
  const tExperiences = useTranslations("Experiences");
  const tStatus = useTranslations("Status");
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* ── CONSOLIDATED HERO + BIO ── */}
      <section className="min-h-[95vh] flex flex-col justify-between pt-28 lg:px-24 pb-12 relative">
        
        {/* Top: Name & Right Sidebar */}
        <div className="relative">
          <h1 className="text-[clamp(4rem,13vw,9rem)] font-black tracking-tighter uppercase leading-[0.6]">
            {t("name").split(" ")[0]}
            <br />
            <span className="text-primary">{t("name").split(" ")[1]}</span>
          </h1>

          {/* Right Sidebar: Status & Socials */}
          <div className="absolute top-0 right-0 hidden md:flex flex-col items-end gap-8 group h-fit">
            {/* Status Widget */}
            <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/40 leading-relaxed uppercase text-right">
              <p className="flex items-center gap-2 justify-end mb-1">
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                <span>{tStatus("location")}</span>
              </p>
              <div>{mounted ? time.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "••:••:••"}</div>
            </div>

            {/* Socials Block */}
            <div className="flex flex-row items-stretch gap-6 h-fit group/socials">
              <div className="flex flex-col items-center gap-5 pr-4 border-r border-border/20 group-hover/socials:border-primary/30 transition-colors duration-500">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/30 hover:text-primary transition-all duration-300 hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/30 hover:text-primary transition-all duration-300 hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.771-.773 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/30 hover:text-primary transition-all duration-300 hover:scale-110">
                  <svg width="16" height="16" role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.085-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.085-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
                </a>
                <a href="mailto:miroslav.novotny64@gmail.com" className="text-muted-foreground/30 hover:text-primary transition-all duration-300 hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </a>
              </div>
              <div className="w-1 bg-primary/20 group-hover/socials:bg-primary transition-colors duration-500 rounded-full" />
            </div>
          </div>

          <div className="mt-10 pl-2 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground font-medium tracking-tight max-w-xs">
                {t("role")}
              </p>
            </div>
            
            <p className="text-[13px] text-muted-foreground/70 leading-relaxed max-w-lg font-medium">
              {t("intro")}
            </p>
          </div>
        </div>

        {/* Bottom: Bio & CTA */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 px-10 lg:px-0">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex flex-col items-start gap-4 transition-all duration-300 cursor-pointer"
          >
            <span className="font-mono text-xs lg:block hidden tracking-[0.4em] uppercase text-primary font-bold group-hover:scale-105 transition-transform origin-left">
              {t("sections.projects_label")}
            </span>
            <div className="relative">
               <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
               <ArrowDown className="w-20 h-20 stroke-[0.3px] text-primary group-hover:translate-y-4 transition-all duration-500 relative z-10" />
            </div>
          </button>
          
          <div className="relative max-w-lg w-full">
            <div className="absolute -top-px -left-px w-10 h-[2px] bg-primary" />
            <div className="absolute -top-px -left-px w-[2px] h-10 bg-primary" />
            <div className="absolute -bottom-px -right-px w-10 h-[2px] bg-primary" />
            <div className="absolute -bottom-px -right-px w-[2px] h-10 bg-primary" />

            <div className="border border-dashed border-border/40 p-8 flex flex-col gap-8">
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("bio")}
              </p>
              <div className="flex items-center gap-10">
                <button className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] text-xs rounded-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(244,34,114,0.3)] overflow-hidden shrink-0">
                  <span className="relative z-10 flex items-center gap-2">
                    {t("see_cv")}
                    <ExternalLink size={16} strokeWidth={2} />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                <a 
                  href="mailto:miroslav.novotny64@gmail.com"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-primary font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300 whitespace-nowrap"
                >
                  {t("cta")}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCES ── */}
      <section className="pt-20 px-6 lg:px-24">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary/60 font-bold">{t("sections.journey")}</span>
            <span className="h-px flex-1 bg-border/20"></span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-12">
            {tExperiences("title")}
            <span className="text-primary">.</span>
          </h2>
          <ExperiencesSection />
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="px-6 lg:px-24 mb-16">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary/60 font-bold">{t("sections.projects")}</span>
            <span className="h-px flex-1 bg-border/20"></span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-12">
            {tProjects("title")}
            <span className="text-primary">.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <ProjectTile
              index="01"
              title={tProjects("items.vyhledavac-adres.title")}
              description={tProjects("items.vyhledavac-adres.description")}
              slug="vyhledavac-adres"
              video="/videos/vyhledavac-adres_preview.mp4"
              tags={["Rust", "WebAssembly", "Leptos", "Database"]}
              repoUrl="https://github.com/Miroslav-Novotny64/vyhledavac-addres"
              variant="grid"
            />

            <ProjectTile
              index="02"
              title={tProjects("items.impostor.title")}
              description={tProjects("items.impostor.description")}
              slug="impostor"
              video="/videos/impostor-game_preview.mp4"
              liveUrl="https://simple-impostor-game.fun/"
              repoUrl="https://github.com/Miroslav-Novotny64/simple-impostor-game"
              tags={["React", "Tailwind", "PWA"]}
              variant="grid"
            />

            <ProjectTile
              index="03"
              title={tProjects("items.fractal.title")}
              description={tProjects("items.fractal.description")}
              slug="fractal"
              video="/videos/fractals_preview.mp4"
              repoUrl="https://github.com/Miroslav-Novotny64/fractal-generator"
              tags={["Rust", "Maths"]}
              variant="grid"
            />
          </div>

          <div className="flex justify-center mt-8">
            <Link 
              href="/projects" 
              className="group flex items-center gap-3 font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-all duration-300 border border-border/20 bg-card/10 hover:border-primary/20 px-10 py-6 rounded-sm backdrop-blur-sm"
            >
              {tProjects("view_all")}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
