"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "./ui/button";

export function LangToggle() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  function toggleLanguage() {
    const nextLocale = locale === "en" ? "cs" : "en";
    startTransition(() => {
      // @ts-expect-error -- Using dynamic pathname and params with typed router
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  }

  return (
    <Button
      onClick={toggleLanguage}
      disabled={isPending}
      variant="outline"
      className="h-8 px-3 font-mono text-xs tracking-widest"
      aria-label="Toggle language"
    >
      {locale === "en" ? "CS" : "EN"}
    </Button>
  );
}
