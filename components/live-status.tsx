"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function LiveStatus() {
  const tStatus = useTranslations("Status");
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/40 leading-relaxed uppercase text-right">
      <p className="flex items-center gap-2 justify-end mb-1">
        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
        <span>{tStatus("location")}</span>
      </p>
      <div className="text-primary/60">
        {mounted
          ? time.toLocaleTimeString("cs-CZ", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "••:••:••"}
      </div>
    </div>
  );
}
