"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";

export function LangToggle() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  function toggleLanguage() {
    const nextLocale = locale === "en" ? "cs" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <Button
      onClick={toggleLanguage}
      disabled={isPending}
      variant="outline"
      size="icon"
      aria-label="Toggle language"
    >
      {locale === "en" ? "CS" : "EN"}
    </Button>
  );
}
