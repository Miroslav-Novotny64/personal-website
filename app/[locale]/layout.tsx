import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { DotBackground } from "@/components/dot-background";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  const domain = "https://novotnymiroslav.cz";

  return {
    metadataBase: new URL(domain),
    title: {
      template: `%s | ${t("name")}`,
      default: t("seo_title") || t("name"),
    },
    description: t("seo_description") || t("role"),
    keywords: [
      "Miroslav Novotný",
      "Full-stack Developer",
      "Next.js",
      "Rust",
      "Student IT",
      "Portfolio",
      "software engineer",
      "web developer",
      "softwérový inženýr",
      "webový vývojář",
      "programátor",
      "programátor webu",
      "programátor softwaru",
    ],
    authors: [{ name: "Miroslav Novotný" }],
    creator: "Miroslav Novotný",
    alternates: {
      canonical: locale === "cs" ? "/" : `/${locale}`,
      languages: {
        "cs-CZ": "/",
        "en-US": "/en",
      },
    },
    openGraph: {
      title: t("name"),
      description: t("role"),
      url: domain,
      siteName: t("name"),
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("name"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("name"),
      description: t("role"),
      creator: "@Miroslav-Novotny64",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="relative min-h-screen">
        <JsonLd />
        <DotBackground />
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}
