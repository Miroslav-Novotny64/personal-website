import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BreadcrumbsJsonLd } from "@/components/json-ld";
import { MdxLayout } from "@/components/mdx-layout";
import { getMdxContent } from "@/lib/mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const mdxData = await getMdxContent(locale, "experience", slug);
  if (!mdxData) return {};

  return {
    title: mdxData.frontmatter.seo_title || mdxData.frontmatter.title,
    description:
      mdxData.frontmatter.seo_description || mdxData.frontmatter.role,
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const mdxData = await getMdxContent(locale, "experience", slug);
  if (!mdxData) return notFound();

  const tNav = await getTranslations("Navigation");
  const tCV = await getTranslations("CV");

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: tNav("home"), item: "/" },
          { name: tCV("title"), item: "/cv" },
          { name: mdxData.frontmatter.title, item: `/experience/${slug}` },
        ]}
      />
      <MdxLayout
        frontmatter={mdxData.frontmatter}
        content={mdxData.content}
        backHref="/cv"
      />
    </>
  );
}
