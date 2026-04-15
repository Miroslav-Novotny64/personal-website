"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/**
 * Synchronizes the <html> lang attribute with the active locale
 * during client-side navigation, ensuring correctness for accessibility
 * without causing full shell re-renders (flicker).
 */
export function LocaleSync() {
  const locale = useLocale();

  useEffect(() => {
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
