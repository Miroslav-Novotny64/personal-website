import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["cs", "en"],
  defaultLocale: "cs",
  localePrefix: "never",
  pathnames: {
    "/": {
      en: "/home",
      cs: "/",
    },
    "/projects": {
      en: "/projects",
      cs: "/projekty",
    },
    "/projects/[slug]": {
      en: "/projects/[slug]",
      cs: "/projekty/[slug]",
    },
    "/cv": {
      en: "/cv",
      cs: "/zivotopis",
    },
    "/blog": {
      en: "/blog",
      cs: "/clanky",
    },
    "/blog/[slug]": {
      en: "/blog/[slug]",
      cs: "/clanky/[slug]",
    },
    "/contact": {
      en: "/contact",
      cs: "/kontakt",
    },
    "/experience/[slug]": {
      en: "/experience/[slug]",
      cs: "/zkusenosti/[slug]",
    },
    "/education/[slug]": {
      en: "/education/[slug]",
      cs: "/studium/[slug]",
    },
  },
});
