import { setRequestLocale } from "next-intl/server";
import { ProjectTile } from "@/components/project-tile";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function ProjectsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations("Home.projects");
  const tCommon = await getTranslations("Common");
  const tPage = await getTranslations("ProjectsPage");
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 lg:px-24 max-w-[1400px] mx-auto w-full">
      <div className="mb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-colors mb-8 font-mono text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          {tCommon("back")}
        </Link>
        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6">{t("title")}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          {tPage("description")}
        </p>
      </div>

      <div className="flex flex-col gap-24 lg:gap-32">
        {/* All projects stacked */}
        <ProjectTile
          index="01"
          title={t("vyhledavac-adres.title")}
          description={t("vyhledavac-adres.description")}
          problem={t("vyhledavac-adres.problem")}
          solution={t("vyhledavac-adres.solution")}
          impact={t("vyhledavac-adres.impact")}
          slug="vyhledavac-adres"
          video="/videos/vyhledavac-adres_preview.mp4"
          tags={["Rust", "WebAssembly", "Leptos", "Database"]}
          className="min-h-0"
        />

        <ProjectTile
          index="02"
          title={t("impostor.title")}
          description={t("impostor.description")}
          problem={t("impostor.problem")}
          solution={t("impostor.solution")}
          impact={t("impostor.impact")}
          slug="impostor"
          video="/videos/impostor-game_preview.mp4"
          tags={["React", "Tailwind", "PWA"]}
          className="min-h-0"
        />

        <ProjectTile
          index="03"
          title={t("fractal.title")}
          description={t("fractal.description")}
          problem={t("fractal.problem")}
          solution={t("fractal.solution")}
          impact={t("fractal.impact")}
          slug="fractal"
          video="/videos/fractals_preview.mp4"
          tags={["Rust", "Maths"]}
          className="min-h-0"
        />

        <ProjectTile
          index="04"
          title={t("flashscore.title")}
          description={t("flashscore.description")}
          problem={t("flashscore.problem")}
          solution={t("flashscore.solution")}
          impact={t("flashscore.impact")}
          slug="flashscore"
          tags={["Node.js", "API", "Scraping"]}
          className="min-h-0"
        />

        <ProjectTile
          index="05"
          title={t("tree.title")}
          description={t("tree.description")}
          problem={t("tree.problem")}
          solution={t("tree.solution")}
          impact={t("tree.impact")}
          slug="tree"
          image="/tree.png"
          tags={["C", "CLI"]}
          className="min-h-0"
        />
      </div>
    </main>
  );
}
