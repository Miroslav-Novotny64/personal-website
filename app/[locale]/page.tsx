import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProjectTile } from "@/components/project-tile";
import { ExperiencesSection } from "@/components/experiences-section";
import { LiveStatus } from "@/components/live-status";
import { ScrollDownButton } from "@/components/scroll-down-button";


export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");
  const tProjects = await getTranslations("Projects");
  const tExperiences = await getTranslations("Experiences");
  const tLinks = await getTranslations("Links");

  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* ── CONSOLIDATED HERO + BIO ── */}
      <section className="min-h-[95vh] flex flex-col justify-between pt-20 lg:pt-28 px-10 lg:px-24 pb-12 relative">
        
        {/* Top: Name & Right Sidebar */}
          <div className="flex flex-col gap-10">
            {/* Identity Group */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <h1 className="text-[clamp(3.5rem,15vw,9rem)] font-black tracking-tighter uppercase leading-[0.85] lg:leading-[0.6]">
                {t("name").split(" ")[0]}
                <br />
                <span className="text-primary">{t("name").split(" ")[1]}</span>
              </h1>
              <div className="flex flex-col gap-4 sm:gap-6">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-tight max-w-xs">
                  {t("role")}
                </p>
                <p className="text-[13px] sm:text-[14px] text-muted-foreground/70 leading-relaxed max-w-lg font-medium">
                  {t("intro")}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute top-20 lg:top-28 right-10 lg:right-24 hidden lg:flex flex-col items-end gap-10 group h-fit z-20">
            {/* Status Widget */}
            <LiveStatus />

            {/* Socials Block */}
            <div className="flex flex-row items-stretch gap-6 h-fit group/socials">
              <div className="flex flex-col items-center gap-5 border-r border-border/20 group-hover/socials:border-primary/30 transition-colors duration-500">
                <a href={tLinks("github")} target="_blank" rel="noopener noreferrer" className="text-muted-foreground/30 hover:text-primary transition-all duration-300 hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </a>
                <a href={tLinks("linkedin")} target="_blank" rel="noopener noreferrer" className="text-muted-foreground/30 hover:text-primary transition-all duration-300 hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.771-.773 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
                </a>
                <a href={`mailto:${tLinks("email")}`} className="text-muted-foreground/30 hover:text-primary transition-all duration-300 hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </a>
              </div>
              <div className="w-1 bg-primary/20 group-hover/socials:bg-primary transition-colors duration-500 rounded-full" />
            </div>
          </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:px-0 mt-24 sm:mt-0">
          <ScrollDownButton label={t("sections.projects_label")} />
          
          <div className="relative max-w-lg w-full">
            <div className="absolute -top-px -left-px w-10 h-[2px] bg-primary" />
            <div className="absolute -top-px -left-px w-[2px] h-10 bg-primary" />
            <div className="absolute -bottom-px -right-px w-10 h-[2px] bg-primary" />
            <div className="absolute -bottom-px -right-px w-[2px] h-10 bg-primary" />

            <div className="border border-dashed border-border/40 p-6 sm:p-8 flex flex-col gap-6 sm:gap-8">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t("bio")}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                <Link 
                  href="/cv"
                  className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] text-xs rounded-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(244,34,114,0.3)] overflow-hidden shrink-0"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("see_cv")}
                    <ExternalLink size={16} strokeWidth={2} />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
                <a 
                  href={`mailto:${tLinks("email")}`}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-primary font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300 whitespace-nowrap ml-2 sm:ml-0"
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
      <section className="pt-20 px-8 lg:px-24">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary/60 font-bold">{t("sections.journey")}</span>
            <span className="h-px flex-1 bg-border/20"></span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-8 sm:mb-12">
            {tExperiences("title")}
            <span className="text-primary">.</span>
          </h2>
          <ExperiencesSection />
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="px-8 lg:px-24 mb-16 sm:mb-24">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary/60 font-bold">{t("sections.projects")}</span>
            <span className="h-px flex-1 bg-border/20"></span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-8 sm:mb-12">
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
              repoUrl={tLinks("projects.vyhledavac_adres")}
              variant="grid"
            />

            <ProjectTile
              index="02"
              title={tProjects("items.impostor.title")}
              description={tProjects("items.impostor.description")}
              slug="impostor"
              video="/videos/impostor-game_preview.mp4"
              liveUrl={tLinks("projects.impostor_live")}
              repoUrl={tLinks("projects.impostor_repo")}
              tags={["React", "Tailwind", "PWA"]}
              variant="grid"
            />

            <ProjectTile
              index="03"
              title={tProjects("items.fractal.title")}
              description={tProjects("items.fractal.description")}
              slug="fractal"
              video="/videos/fractals_preview.mp4"
              repoUrl={tLinks("projects.fractal")}
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
