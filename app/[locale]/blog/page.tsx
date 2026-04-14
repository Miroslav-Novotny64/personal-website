import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllMdxContent } from "@/lib/mdx";
import { BlogCard } from "@/components/blog-card";
import { BreadcrumbsJsonLd } from "@/components/json-ld";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });

  return {
    title: t('seo_title') || t('title'),
    description: t('seo_description') || t('description'),
  };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Blog");
  const tCommon = await getTranslations("Common");
  const tNav = await getTranslations("Navigation");
  
  const posts = await getAllMdxContent(locale, 'blog');

  return (
    <main className="min-h-screen pt-32 pb-24 px-8 lg:px-24">
      <BreadcrumbsJsonLd 
        items={[
          { name: tNav("home"), item: "/" },
          { name: t("title"), item: "/blog" },
        ]}
      />
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header Section */}
        <div className="mb-20">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors mb-12 font-mono text-sm uppercase tracking-widest group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {tCommon("back")}
          </Link>
          
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl lg:text-[7rem] font-black tracking-tighter uppercase leading-[0.8] mb-4">
              {t("title")}<span className="text-primary">.</span>
            </h1>
            <p className="max-w-2xl text-muted-foreground text-lg leading-relaxed font-medium">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Section Divider */}
        <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary/60 font-bold">{t("archive")}</span>
            <span className="h-px flex-1 bg-border/20"></span>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post, idx) => (
              <BlogCard
                key={post.slug}
                index={(posts.length - idx).toString().padStart(2, '0')}
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
                readingTime={post.readingTime}
              />
            ))
          ) : (
            <div className="col-span-full border border-dashed border-border/40 p-12 text-center rounded-sm bg-card/5">
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
                {t("no_posts")}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
