"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-300 font-sans selection:bg-primary selection:text-primary-foreground">
      <main className="max-w-4xl mx-auto p-8 sm:p-20 flex flex-col gap-16 text-foreground">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 border-b border-border pb-12">
          <div className="flex flex-col gap-3">
            <h1 className="text-6xl font-black tracking-tighter text-primary uppercase">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-xl font-medium tracking-tight">
              {t("description")}
            </p>
          </div>
          
          <div className="flex gap-4">
            <LangToggle />
            <ThemeToggle />
          </div>
        </header>

        {/* Hero / About Section */}
        <section className="flex flex-col gap-8 max-w-2xl px-2">
          <h2 className="text-3xl font-bold text-foreground">
            {t("hero")}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl">
            {t.rich("heroDescription", {
              primary: (chunks) => <span className="text-primary font-bold">{chunks}</span>
            })}
          </p>
          
          <div className="flex flex-wrap gap-5 pt-4">
            <button className="px-10 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/10">
              {t("getStarted")}
            </button>
            <button className="px-10 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold border border-border hover:bg-secondary/80 transition-all cursor-pointer">
              {t("docs")}
            </button>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-2xl border border-border bg-card/10 hover:border-primary/50 transition-all duration-500">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-primary uppercase">01</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <h4 className="font-bold text-xl mb-3">{t("features.modular.title")}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{t("features.modular.description")}</p>
          </div>
          
          <div className="group p-8 rounded-2xl border border-border bg-card/10 hover:border-primary/50 transition-all duration-500">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-primary uppercase">02</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <h4 className="font-bold text-xl mb-3">{t("features.adaptive.title")}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{t("features.adaptive.description")}</p>
          </div>

          <div className="group p-8 rounded-2xl border border-border bg-card/10 hover:border-primary/50 transition-all duration-500">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-primary uppercase">03</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <h4 className="font-bold text-xl mb-3">{t("features.focused.title")}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{t("features.focused.description")}</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-muted-foreground text-sm pt-20 pb-8 flex flex-col sm:flex-row justify-between items-center gap-6 opacity-60">
          <div className="flex gap-8 font-semibold tracking-tight">
            <span>Tailwind v4</span>
            <span>Next.js 16</span>
            <span>Shadcn Logic</span>
          </div>
          <p>© 2026 {t("footer")}</p>
        </footer>
      </main>
    </div>
  );
}





