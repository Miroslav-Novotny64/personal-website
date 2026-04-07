"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";

export function SiteFooter() {
  const t = useTranslations("Home");

  return (
    <footer className="relative z-20 border-t border-border/30 mt-20">
      <div className="max-w-none px-10 lg:px-24 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left: social links */}
        <div className="flex items-center gap-6 font-mono text-[10px] tracking-widest uppercase">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground/50 hover:text-primary transition-colors duration-200">
            <ExternalLink size={12} />
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground/50 hover:text-primary transition-colors duration-200">
            <ExternalLink size={12} />
            LinkedIn
          </a>
        </div>

        {/* Center: status */}
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground/30">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse" />
          SYS ONLINE
        </div>

        {/* Right: copyright */}
        <div className="font-mono text-[10px] tracking-widest text-muted-foreground/30 uppercase">
          {t("footer")}
        </div>

      </div>
    </footer>
  );
}
