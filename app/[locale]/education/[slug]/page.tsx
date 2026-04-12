import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getMdxContent } from "@/lib/mdx";
import { MdxLayout } from "@/components/mdx-layout";

export default async function EducationPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const mdxData = await getMdxContent(locale, "education", slug);
  if (!mdxData) return notFound();

  return <MdxLayout frontmatter={mdxData.frontmatter} content={mdxData.content} backHref="/" />;
}
