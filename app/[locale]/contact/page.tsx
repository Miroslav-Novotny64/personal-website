import {
  ArrowUpRight,
  ExternalLink,
  FileText,
  Mail,
  MessageSquare,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BreadcrumbsJsonLd } from "@/components/json-ld";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("seo_title") || t("title"),
    description: t("seo_description") || t("intro"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const tLinks = await getTranslations("Links");
  const tNav = await getTranslations("Navigation");

  const email = tLinks("email");

  const SOCIALS = [
    {
      name: "GitHub",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          role="img"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
      href: tLinks("github"),
      label: t("socials.github"),
      color: "hover:text-[#24292e]",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          role="img"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.771-.773 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
        </svg>
      ),
      href: tLinks("linkedin"),
      label: t("socials.linkedin"),
      color: "hover:text-[#0077b5]",
    },
    {
      name: "Discord",
      icon: <MessageSquare size={20} />,
      href: tLinks("discord"),
      label: t("socials.discord"),
      color: "hover:text-[#5865F2]",
    },
  ];

  return (
    <main className="relative min-h-screen pt-28 lg:px-24 pb-20 overflow-x-hidden">
      <BreadcrumbsJsonLd
        items={[
          { name: tNav("home"), item: "/" },
          { name: t("title"), item: "/contact" },
        ]}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-0">
        {/* Header Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary/60 font-bold">
              {t("subtitle")}
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-8">
            {t("title")}
            <span className="text-primary">.</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed font-medium border-l-2 border-primary/20 pl-8">
            {t("intro")}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Contact Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Card */}
            <div className="md:col-span-2 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-colors duration-700" />

              <div className="relative z-10 p-8 border border-border/20 bg-card/5 backdrop-blur-sm rounded-sm flex flex-col items-start gap-8">
                <div className="flex flex-col gap-2">
                  <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold">
                    {t("socials.email")}
                  </h2>
                  <a
                    href={`mailto:${email}`}
                    className="text-xl lg:text-3xl font-black tracking-tight hover:text-primary transition-all duration-300 break-all"
                  >
                    {email}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-6 w-full justify-between mt-2">
                  <a
                    href={`mailto:${email}`}
                    className="group relative flex items-center justify-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] text-[10px] rounded-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(244,34,114,0.2)] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2 text-primary-foreground">
                      NAPSAT E-MAIL
                      <Mail size={14} />
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </a>

                  <p className="text-muted-foreground/40 font-mono text-[10px] uppercase tracking-widest leading-none hidden sm:block">
                    {t("form_disclaimer")}
                  </p>
                </div>
              </div>
            </div>

            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="group flex items-center justify-between p-6 bg-card/5 border border-border/10 rounded-sm hover:border-primary/20 hover:bg-card/10 transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`text-muted-foreground group-hover:scale-110 transition-all duration-300 ${social.color}`}
                  >
                    {social.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary/60 transition-colors">
                      {social.name}
                    </span>
                    <span className="text-sm font-medium">{social.label}</span>
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </a>
            ))}
          </div>

          {/* Sidebar: CV & Availability */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* View CV Card */}
            <div className="p-8 border border-primary/20 bg-primary/5 relative overflow-hidden group rounded-sm">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-colors" />
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-sm text-primary">
                    <FileText size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                      PROFESNÍ
                    </span>
                    <span className="text-sm font-bold uppercase tracking-tighter">
                      Profil
                    </span>
                  </div>
                </div>

                <Link
                  href="/cv"
                  className="group relative flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] text-xs rounded-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(244,34,114,0.3)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("view_cv")}
                    <ExternalLink size={16} />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
              </div>
            </div>

            {/* Availability Widget */}
            <div className="p-8 border border-dashed border-border/40 bg-card/5 relative overflow-hidden group rounded-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-colors" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80 font-bold">
                    LOKACE
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-foreground font-bold uppercase tracking-tight">
                    Praha, ČR
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    K dispozici pro remote i on-site spolupráci.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
