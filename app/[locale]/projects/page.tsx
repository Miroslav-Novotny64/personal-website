import { setRequestLocale } from "next-intl/server";
import { ProjectTile } from "@/components/project-tile";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function ProjectsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations("Projects");
  const tCommon = await getTranslations("Common");
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 lg:px-24 max-w-[1400px] mx-auto w-full">
      <div className="mb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-colors mb-8 font-mono text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          {tCommon("back")}
        </Link>
        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6">{t("title")}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t("page_description")}
        </p>
      </div>

      <div className="flex flex-col gap-24 lg:gap-32">
        <ProjectTile
          index="01"
          title={t("items.expertov.title")}
          description={t("items.expertov.description")}
          slug="expertov"
          tags={["Next.js", "SaaS", "Full-stack"]}
          className="min-h-0"
        />

        {/* All projects stacked */}
        <ProjectTile
          index="02"
          title={t("items.vyhledavac-adres.title")}
          description={t("items.vyhledavac-adres.description")}
          slug="vyhledavac-adres"
          video="/videos/vyhledavac-adres_preview.mp4"
          tags={["Rust", "WebAssembly", "Leptos", "Database"]}
          repoUrl="https://github.com/Miroslav-Novotny64/vyhledavac-addres"
          className="min-h-0"
        />

        <ProjectTile
          index="03"
          title={t("items.impostor.title")}
          description={t("items.impostor.description")}
          slug="impostor"
          video="/videos/impostor-game_preview.mp4"
          liveUrl="https://simple-impostor-game.fun/"
          repoUrl="https://github.com/Miroslav-Novotny64/simple-impostor-game"
          tags={["React", "Tailwind", "PWA"]}
          className="min-h-0"
        />

        <ProjectTile
          index="04"
          title={t("items.fractal.title")}
          description={t("items.fractal.description")}
          slug="fractal"
          video="/videos/fractals_preview.mp4"
          repoUrl="https://github.com/Miroslav-Novotny64/fractal-generator"
          tags={["Rust", "Maths"]}
          className="min-h-0"
        />

        <ProjectTile
          index="05"
          title={t("items.flashscore.title")}
          description={t("items.flashscore.description")}
          slug="flashscore"
          repoUrl="https://github.com/Miroslav-Novotny64/FlashscoreScraping"
          tags={["Node.js", "API", "Scraping"]}
          className="min-h-0"
        />

        <ProjectTile
          index="06"
          title={t("items.tree.title")}
          description={t("items.tree.description")}
          slug="tree"
          image="/tree.png"
          repoUrl="https://github.com/Miroslav-Novotny64/Colerful-Tree-Cli"
          tags={["C", "CLI"]}
          className="min-h-0"
        />
      </div>
    </main>
  );
}
