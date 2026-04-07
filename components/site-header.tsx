"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";

type Href = "/" | "/projects" | "/cv" | "/blog" | "/contact";

const NAV_LINKS: { href: Href; label: Record<string, string> }[] = [
  { href: "/",         label: { en: "[/]",          cs: "[/]"          } },
  { href: "/projects", label: { en: "[/projects]",   cs: "[/projekty]"  } },
  { href: "/cv",       label: { en: "[/cv]",         cs: "[/cv]"        } },
  { href: "/blog",     label: { en: "[/blog]",       cs: "[/blog]"      } },
  { href: "/contact",  label: { en: "[/contact]",    cs: "[/kontakt]"   } },
];

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 lg:px-24 h-14 border-b border-border/20 bg-background/70 backdrop-blur-md">
      <nav className="flex items-center gap-6">
        {NAV_LINKS.map(({ href, label }) => {
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
              {label[locale] ?? label.en}
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
