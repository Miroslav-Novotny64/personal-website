import { Funnel_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${funnelDisplay.variable} h-full antialiased transition-colors duration-300`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
