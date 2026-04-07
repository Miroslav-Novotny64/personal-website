"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";

export function SiteHeader() {
  return (
    <header className="fixed top-8 left-8 right-8 z-50 flex justify-end items-start pointer-events-none">
      <div className="flex gap-4 pointer-events-auto">
        <LangToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
