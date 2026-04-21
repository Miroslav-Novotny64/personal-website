import { ArrowLeft, FileText, Download, ExternalLink } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/navigation";
import type { MdxFrontmatter } from "@/lib/mdx";
import { cn } from "@/lib/utils";

interface MdxLayoutProps {
  frontmatter: MdxFrontmatter;
  content: string;
  backHref?: string | any;
}

const components = {
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

export function MdxLayout({
  frontmatter,
  content,
  backHref = "/",
}: MdxLayoutProps) {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 lg:px-24">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 font-mono text-sm uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tighter uppercase">
          {frontmatter.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-mono text-sm mb-16 border-b border-border/40 pb-8">
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

        <div className="prose prose-invert prose-p:text-muted-foreground prose-h2:text-foreground prose-h2:font-bold prose-a:text-primary max-w-none">
          <MDXRemote source={content} components={components} />
        </div>
      </article>
    </main>
  );
}
