import type { MetadataRoute } from "next";
import { getAllMdxContent, parseSafeDate } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://novotnymiroslav.cz";
  const locales = ["cs", "en"];
  const baseRoutes = ["", "/projects", "/cv", "/contact", "/blog"];

  // Static routes for all locales
  const routes = locales.flatMap((locale) =>
    baseRoutes.map((route) => {
      const url = `${domain}${locale === "cs" ? "" : `/${locale}`}${route}`;
      return {
        url,
        lastModified: new Date(),
        changeFrequency: (route === "" ? "daily" : "weekly") as any,
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            cs: `${domain}${route}`,
            en: `${domain}/en${route}`,
          },
        },
      };
    }),
  );

  // Dynamic Content
  const contentTypes = ["projects", "blog", "experience", "education"] as const;

  const dynamicRoutes = await Promise.all(
    locales.flatMap(async (locale) => {
      const typeResults = await Promise.all(
        contentTypes.map(async (type) => {
          const contents = await getAllMdxContent(locale, type);
          return contents.map((content) => ({
            url: `${domain}${locale === "cs" ? "" : `/${locale}`}/${type}/${content.slug}`,
            lastModified: parseSafeDate(content.date),
            changeFrequency: "monthly" as any,
            priority: 0.6,
            alternates: {
              languages: {
                cs: `${domain}/${type}/${content.slug}`,
                en: `${domain}/en/${type}/${content.slug}`,
              },
            },
          }));
        }),
      );
      return typeResults.flat();
    }),
  );

  const flatDynamicRoutes = (await Promise.all(dynamicRoutes)).flat();

  return [...routes, ...flatDynamicRoutes];
}
