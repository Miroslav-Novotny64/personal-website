"use client";

import { useEffect, useState } from "react";

export function LiveStatus() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Prague",
        }) + " CET"
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-10 font-mono text-xs tracking-[0.25em] uppercase leading-none opacity-80">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground/40 text-[10px]">LOC:</span>
        <span className="text-foreground/90">PRAGUE, CZ</span>
      </div>
      
      <span className="text-muted-foreground/20">/</span>
      
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground/40 text-[10px]">TIME:</span>
        <span className="text-foreground/90">{time || "--:-- CET"}</span>
      </div>

      <span className="text-muted-foreground/20">/</span>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
          </span>
          <span className="text-primary font-bold tracking-widest text-[10px]">Available</span>
        </div>
      </div>
    </div>
  );
}
