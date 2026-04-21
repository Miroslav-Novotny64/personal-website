"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

// Suppress the React 19 warning for the next-themes script tag in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const orig = console.error;
  // biome-ignore lint/suspicious/noExplicitAny: overriding console.error dynamically
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag")
    ) {
      return;
    }
    orig.apply(console, args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
