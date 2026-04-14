import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  const [common, home, projects, experiences, cv] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/home.json`),
    import(`../messages/${locale}/projects.json`),
    import(`../messages/${locale}/experiences.json`),
    import(`../messages/${locale}/cv.json`)
  ]);

  return {
    locale,
    messages: {
      ...common.default,
      ...home.default,
      ...projects.default,
      ...experiences.default,
      ...cv.default
    }
  };
});