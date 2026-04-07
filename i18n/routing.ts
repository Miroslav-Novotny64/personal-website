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
    '/cv': '/cv',
    '/blog': '/blog',
    '/contact': {
      en: '/contact',
      cs: '/kontakt',
    },
  }
});