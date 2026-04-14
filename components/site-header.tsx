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

              <div className="p-6 border-t border-border/10">
                <div className="flex items-center justify-between mb-2">
                   <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Settings</p>
                </div>
                <div className="flex items-center gap-4">
                  <LangToggle />
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
