import { getPathname } from "@/i18n/navigation";

export function getSeoAlternates(locale: string, href: any) {
  const csPath = getPathname({ locale: "cs", href });
  const enPath = getPathname({ locale: "en", href });

  return {
    canonical: locale === "cs" ? csPath : enPath,
    languages: {
      "cs-CZ": csPath,
      "en-US": enPath,
    },
  };
}
