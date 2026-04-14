"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";
import { useTranslations } from "next-intl";

type Href = "/" | "/projects" | "/cv" | "/blog" | "/contact";

const NAV_LINKS: { href: Href; key: string }[] = [
  { href: "/",         key: "home" },
  { href: "/projects", key: "projects" },
  { href: "/cv",       key: "cv" },
  { href: "/blog",     key: "blog" },
  { href: "/contact",  key: "contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 lg:px-24 h-14 border-b border-border/20 bg-background/70 backdrop-blur-md">
      <nav className="flex items-center gap-6">
        {NAV_LINKS.map(({ href, key }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`font-mono text-[13px] tracking-wider transition-colors duration-150 ${
                active
                  ? "text-primary"
                  : "text-muted-foreground/50 hover:text-foreground"
              }`}
            >
              {t(key as any)}
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center gap-2">
        <LangToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
