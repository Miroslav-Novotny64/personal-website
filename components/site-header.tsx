"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const tHome = useTranslations("Home");
  const tLinks = useTranslations("Links");
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 lg:px-24 h-14 border-b border-border/20 bg-background/70 backdrop-blur-md">
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link 
            href="/" 
            className="group flex items-center gap-2 font-mono text-[13px] font-bold tracking-[0.2em] text-primary uppercase transition-all duration-300 hover:opacity-80"
          >
            <span className="text-primary/40 group-hover:text-primary transition-colors">//</span>
            {tHome("name")}
            <span className="text-primary/40 group-hover:text-primary transition-colors">//</span>
          </Link>
          
          <div className="h-5 w-px bg-border/20 mx-1" />

          <div className="flex items-center gap-8">
            {NAV_LINKS.map(({ href, key }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative py-1 font-mono text-[13px] tracking-widest uppercase transition-all duration-300",
                    active
                      ? "text-primary font-bold"
                      : "text-muted-foreground/50 hover:text-foreground"
                  )}
                >
                  {t(key as any)}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-primary/60"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Header Elements */}
        <div className="lg:hidden flex items-center">
           <Link href="/" className="group flex items-center gap-2 font-mono text-[13px] font-bold tracking-[0.2em] text-primary uppercase transition-all duration-300">
             <span className="text-primary/40">//</span>
             {tHome("name")}
             <span className="text-primary/40">//</span>
           </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-60 bg-background/80 backdrop-blur-sm lg:hidden"
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-70 w-[280px] bg-background border-l border-border/50 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/10">
                <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">// menu //</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6">
                <nav className="flex flex-col gap-8">
                  {NAV_LINKS.map(({ href, key }, index) => {
                    const active = pathname === href;
                    return (
                      <motion.div
                        key={href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={href}
                          className={cn(
                            "group flex items-center justify-between py-2 text-xl font-bold uppercase tracking-wider transition-all duration-300",
                            active ? "text-primary" : "text-muted-foreground/60 hover:text-foreground"
                          )}
                        >
                          <span className="flex items-center gap-4">
                            {t(key as any)}
                          </span>
                          {active && (
                             <motion.div 
                               layoutId="active-indicator"
                               className="h-1.5 w-1.5 rounded-full bg-primary"
                             />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6 border-t border-border/10 space-y-6 mt-auto">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <LangToggle />
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center gap-4">
                      <a href={tLinks("github")} target="_blank" rel="noopener noreferrer" className="text-muted-foreground/60 hover:text-primary transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                      </a>
                      <a href={tLinks("linkedin")} target="_blank" rel="noopener noreferrer" className="text-muted-foreground/60 hover:text-primary transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.771-.773 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
                      </a>
                      <a href={`mailto:${tLinks("email")}`} className="text-muted-foreground/60 hover:text-primary transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
