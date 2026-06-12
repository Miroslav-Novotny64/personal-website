import type { MetadataRoute } from "next";
import { getAllMdxContent } from "@/lib/mdx";
import { getPathname } from "@/i18n/navigation";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://novotnymiroslav.cz";
  const locales = ["cs", "en"] as const;
  const baseRoutes = ["/", "/projects", "/cv", "/contact", "/blog"] as const;

  const routes = locales.flatMap((locale) =>
    baseRoutes.map((route) => {
      const pathname = getPathname({ locale, href: route });
      const url = `${domain}${pathname}`;
      const csPathname = getPathname({ locale: "cs", href: route });
      const enPathname = getPathname({ locale: "en", href: route });

      return {
        url,
        lastModified: new Date(),
        changeFrequency: (route === "/" ? "daily" : "weekly") as
          | "daily"
          | "weekly",
        priority: route === "/" ? 1 : 0.8,
        alternates: {
          languages: {
            cs: `${domain}${csPathname}`,
            en: `${domain}${enPathname}`,
          },
        },
      };
    }),
  );

  const contentTypes = ["projects", "blog", "experience", "education"] as const;

  const dynamicRoutes = await Promise.all(
    locales.flatMap(async (locale) => {
      const typeResults = await Promise.all(
        contentTypes.map(async (type) => {
          const contents = await getAllMdxContent(locale, type);
          return contents.map((content) => {
            const routePattern = `/${type}/[slug]` as const;
            const pathname = getPathname({
              locale,
              href: {
                pathname: routePattern as any,
                params: { slug: content.slug },
              },
            });
            const url = `${domain}${pathname}`;

            const csPathname = getPathname({
              locale: "cs",
              href: {
                pathname: routePattern as any,
                params: { slug: content.slug },
              },
            });

            const enPathname = getPathname({
              locale: "en",
              href: {
                pathname: routePattern as any,
                params: { slug: content.slug },
              },
            });

            return {
              url,
              lastModified: content.parsedDate,
              changeFrequency: "monthly" as const,
              priority: 0.6,
              alternates: {
                languages: {
                  cs: `${domain}${csPathname}`,
                  en: `${domain}${enPathname}`,
                },
              },
            };
          });
        }),
      );
      return typeResults.flat();
    }),
  );

  const flatDynamicRoutes = dynamicRoutes.flat();

  return [...routes, ...flatDynamicRoutes];
}
