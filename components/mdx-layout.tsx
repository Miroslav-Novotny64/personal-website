import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxFrontmatter } from "@/lib/mdx";

interface MdxLayoutProps {
  frontmatter: MdxFrontmatter;
  content: string;
  backHref?: string | any;
}

export function MdxLayout({ frontmatter, content, backHref = "/" }: MdxLayoutProps) {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 lg:px-24">
      <Link href={backHref} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 font-mono text-sm uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>
      
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tighter uppercase">{frontmatter.title}</h1>
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
                {frontmatter.tech.map(t => (
                   <span key={t} className="px-2 py-0.5 border border-border/50 rounded-md bg-muted/20">{t}</span>
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="prose prose-invert prose-p:text-muted-foreground prose-h2:text-foreground prose-h2:font-bold prose-a:text-primary max-w-none">
          <MDXRemote source={content} />
        </div>
      </article>
    </main>
  );
}
