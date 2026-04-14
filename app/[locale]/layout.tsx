import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { DotBackground } from '@/components/dot-background';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  return {
    title: {
      template: `%s | ${t('name')}`,
      default: t('name')
    },
    description: t('role'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

   setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="relative min-h-screen">
        <DotBackground />
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}


