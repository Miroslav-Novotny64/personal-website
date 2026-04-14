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
  const mdxData = await getMdxContent(locale, "projects", slug);
  if (!mdxData) return {};

  const title = mdxData.frontmatter.seo_title || mdxData.frontmatter.title;
  const description =
    mdxData.frontmatter.seo_description || mdxData.frontmatter.description;
  const image = mdxData.frontmatter.thumbnail || "/og-image.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const mdxData = await getMdxContent(locale, "projects", slug);
  if (!mdxData) return notFound();

  const tNav = await getTranslations("Navigation");
  const tProjects = await getTranslations("Projects");

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: tNav("home"), item: "/" },
          { name: tProjects("title"), item: "/projects" },
          { name: mdxData.frontmatter.title, item: `/projects/${slug}` },
        ]}
      />
      <MdxLayout
        frontmatter={mdxData.frontmatter}
        content={mdxData.content}
        backHref="/#projects"
      />
    </>
  );
}
