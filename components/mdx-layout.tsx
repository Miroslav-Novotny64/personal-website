import { Download, ExternalLink, FileText, Globe } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { MdxFrontmatter } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";

import Gallery from "./gallery";

interface MdxLayoutProps {
  frontmatter: MdxFrontmatter;
  content: string;
  // biome-ignore lint/suspicious/noExplicitAny: generic fallback route
  backHref?: string | any;
}

const components = {
  MdxGallery: Gallery,
  Button: ({
    href,
    children,
    icon,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    icon?: "download" | "file" | "external";
    className?: string;
  }) => {
    const isExternal = href.startsWith("http") || href.endsWith(".pdf");
    return (
      <div className="flex justify-center w-full my-12">
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={cn(
            "not-prose group relative flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] text-xs rounded-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(244,34,114,0.3)] overflow-hidden shrink-0",
            className,
          )}
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full transition-transform duration-500" />
          <span className="relative z-10 flex items-center gap-2">
            {icon === "download" && (
              <Download
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-y-0.5"
              />
            )}
            {icon === "file" && (
              <FileText
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:scale-110"
              />
            )}
            {children}
            <ExternalLink size={16} strokeWidth={2} className="opacity-70" />
          </span>
        </a>
      </div>
    );
  },
};

export async function MdxLayout({
  frontmatter,
  content,
  backHref = "/",
}: MdxLayoutProps) {
  const t = await getTranslations("Common");

  return (
    <main className="min-h-screen pt-26 pb-20 px-6 lg:px-24">
      <BackButton fallback={backHref} />

      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-2">
          {frontmatter.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-mono text-sm mb-4 border-b border-border/40 pb-4">
          <span className="text-primary/80">{frontmatter.date}</span>
          {frontmatter.role && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span>{frontmatter.role}</span>
            </>
          )}
          {frontmatter.tech && frontmatter.tech.length > 0 && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <div className="flex flex-wrap gap-2 text-xs">
                {frontmatter.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 border border-border/50 rounded-md bg-muted/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {frontmatter.links && frontmatter.links.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 mb-8">
            {frontmatter.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group/btn flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-300",
                  link.type === "live"
                    ? "bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(244,34,114,0.3)]"
                    : "bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50",
                )}
              >
                {t(link.type)}
                {link.type === "live" ? (
                  <Globe
                    size={12}
                    className="group-hover/btn:rotate-12 transition-transform"
                  />
                ) : link.type === "repo" ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    role="img"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                ) : (
                  <FileText
                    size={12}
                    className="group-hover/btn:rotate-12 transition-transform"
                  />
                )}
              </a>
            ))}
          </div>
        )}

        <div className="prose prose-invert prose-p:text-muted-foreground prose-p:text-justify prose-h2:text-foreground prose-h2:font-bold prose-a:text-primary max-w-none">
          <MDXRemote
            source={content}
            components={components}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [rehypePrettyCode, { theme: "github-dark-dimmed" }],
                ],
              },
            }}
          />
        </div>
      </article>
    </main>
  );
}
