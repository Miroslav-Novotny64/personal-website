"use client";

import { ArrowLeft } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  fallback: string;
  className?: string;
}

export function BackButton({ fallback, className }: BackButtonProps) {
  const router = useRouter();
  const t = useTranslations("Common");

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();

    // Check if we have history within the same origin
    if (typeof window !== "undefined" && window.history.length > 2) {
      router.back();
    } else {
      router.push(fallback as any);
    }
  };

  return (
    <Link
      href={fallback as any}
      onClick={handleBack}
      className={cn(
        "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 font-mono text-sm uppercase tracking-wider",
        className
      )}
    >
      <ArrowLeft className="w-4 h-4" />
      {t("back")}
    </Link>
  );
}
