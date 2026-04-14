import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'cs'],
  defaultLocale: 'cs',
  pathnames: {
    '/': '/',
    '/projects': {
      en: '/projects',
      cs: '/projekty',
    },
    '/projects/[slug]': {
      en: '/projects/[slug]',
      cs: '/projekty/[slug]',
    },
    '/cv': '/cv',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/contact': {
      en: '/contact',
      cs: '/kontakt',
    },
    '/experience/[slug]': {
      en: '/experience/[slug]',
      cs: '/zkusenosti/[slug]',
    },
    '/education/[slug]': {
      en: '/education/[slug]',
      cs: '/studium/[slug]',
    },
  }
});