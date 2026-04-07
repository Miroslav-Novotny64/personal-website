"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";
import { 
  Cpu, 
  Terminal, 
} from "lucide-react";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-300 font-sans selection:bg-primary selection:text-primary-foreground relative overflow-x-hidden">
      {/* Technical Background Elements */}
      <div className="fixed inset-1 bg-halftone-grid opacity-40 pointer-events-none" />
      
      {/* Branding - Top Left */}
      <header className="fixed top-8 left-8 z-50 mix-blend-difference">
        <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">
          {t("name")}
        </h1>
        <div className="h-px w-full bg-primary mt-1 origin-left animate-in fade-in slide-in-from-left duration-1000" />
      </header>

      {/* Controls - Top Right */}
      <div className="fixed top-8 right-8 z-50 flex gap-4">
        <LangToggle />
        <ThemeToggle />
      </div>

      <main className="relative pt-32 pb-20 px-8 max-w-7xl mx-auto">
        {/* Scattered Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold tracking-widest uppercase mb-4 animate-in fade-in zoom-in duration-500">
              <Terminal size={14} />
              <span>Full-stack Systems Architecture</span>
            </div>
            
            <p className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              {t("bio")}
            </p>
            
            <div className="h-24 w-px bg-border hidden lg:block ml-4 my-4" />
            
            <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
              {t("about")}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8 lg:mt-24">
            <div className="tech-card p-6 rounded-lg tech-border transform lg:translate-x-12 animate-in fade-in slide-in-from-right duration-700">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="text-primary" size={20} />
                <span className="text-xs font-bold tracking-widest uppercase opacity-60">Status: Successful Solver</span>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {t("fiks")}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer outside main to cover dots fully */}
      <footer className="relative z-20 bg-background border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground text-sm font-medium tracking-tight">
          <div className="flex items-center gap-6">
            <span className="hover:text-primary transition-colors cursor-pointer">GitHub</span>
            <span className="hover:text-primary transition-colors cursor-pointer">LinkedIn</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span>{t("footer")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
