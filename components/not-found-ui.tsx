import { ReactNode } from "react";
import { BackButton } from "./back-button";

interface NotFoundUIProps {
  heading: string;
  subheading: string;
  description: string;
}

export function NotFoundUI({
  heading,
  subheading,
  description,
}: NotFoundUIProps) {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(244,34,114,0.05),transparent_50%)]" />
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="flex flex-col items-center text-center max-w-2xl gap-8 relative z-10">
        <div className="relative group">
          {/* Large stylized 404 */}
          <h1 className="text-[clamp(8rem,30vw,18rem)] font-black leading-none tracking-tighter uppercase select-none transition-all duration-700">
            {heading}
          </h1>
          
          {/* Glitch-like shadow layers */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10 translate-x-2 translate-y-2 text-primary blur-sm">
            <span className="text-[clamp(8rem,30vw,18rem)] font-black tracking-tighter uppercase">
              {heading}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-mono text-xs sm:text-sm text-primary font-bold uppercase tracking-[0.5em] animate-pulse">
            {"//"} {subheading} {"//"}
          </p>
          <p className="text-muted-foreground text-sm sm:text-base font-medium max-w-sm mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <BackButton fallback={"/"}/>
      </div>

      {/* Footer decorative elements */}
      <div className="absolute bottom-10 left-10 lg:left-24 font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest hidden sm:block">
        Error_Code: 0x404_NOT_FOUND
      </div>
      <div className="absolute bottom-10 right-10 lg:right-24 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
        <span className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest hidden sm:block">
          Connection Status: Disconnected
        </span>
      </div>
    </main>
  );
}
