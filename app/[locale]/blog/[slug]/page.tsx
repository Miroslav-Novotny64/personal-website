import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getMdxContent } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const data = await getMdxContent(locale, 'blog', slug);
  if (!data) notFound();

  const { frontmatter, content } = data;
  const tCommon = await getTranslations("Common");

  return (
    <main className="min-h-screen pt-32 pb-24 px-8 lg:px-24">
      <article className="max-w-[1000px] mx-auto w-full">
        {/* Post Navigation */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors mb-12 font-mono text-sm uppercase tracking-widest group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {tCommon("back")}
        </Link>

        {/* Post Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary/60 font-bold">// post //</span>
            <span className="h-px flex-1 bg-border/20"></span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-10 leading-[0.9]">
            {frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 border-y border-border/10 py-8">
            <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground uppercase tracking-[0.2em] font-bold">
              <Calendar size={14} className="text-primary" />
              {new Date(frontmatter.date).toLocaleDateString(locale === 'cs' ? 'cs-CZ' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            {frontmatter.readingTime && (
              <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground uppercase tracking-[0.2em] font-bold">
                <Clock size={14} className="text-primary" />
                {frontmatter.readingTime}
              </div>
            )}
          </div>
        </header>

        {/* Post Content */}
        <div className="prose prose-invert prose-p:text-muted-foreground prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter prose-a:text-primary hover:prose-a:opacity-80 transition-all max-w-none prose-lg">
          <MDXRemote source={content} />
        </div>
      </article>
    </main>
  );
}
