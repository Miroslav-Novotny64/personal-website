import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getMdxContent } from "@/lib/mdx";
import { MdxLayout } from "@/components/mdx-layout";
import { BreadcrumbsJsonLd } from "@/components/json-ld";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const mdxData = await getMdxContent(locale, "education", slug);
  if (!mdxData) return {};
  
  return {
    title: mdxData.frontmatter.seo_title || mdxData.frontmatter.title,
    description: mdxData.frontmatter.seo_description || mdxData.frontmatter.description,
  };
}

export default async function EducationPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const mdxData = await getMdxContent(locale, "education", slug);
  if (!mdxData) return notFound();

  const tNav = await getTranslations("Navigation");
  const tCV = await getTranslations("CV");

  return (
    <>
      <BreadcrumbsJsonLd 
        items={[
          { name: tNav("home"), item: "/" },
          { name: tCV("title"), item: "/cv" },
          { name: mdxData.frontmatter.title, item: `/education/${slug}` },
        ]}
      />
      <MdxLayout frontmatter={mdxData.frontmatter} content={mdxData.content} backHref="/cv" />
    </>
  );
}
