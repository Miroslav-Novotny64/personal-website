"use client";

import { ArrowDown } from "lucide-react";

interface ScrollDownButtonProps {
  label: string;
}

export function ScrollDownButton({ label }: ScrollDownButtonProps) {
  return (
    <button 
      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      className="group hidden lg:flex flex-col items-center gap-4 transition-all duration-500 cursor-pointer lg:items-start lg:gap-6"
    >
      <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-bold group-hover:scale-105 transition-transform origin-center lg:origin-left">
        {label}
      </span>
      <div className="relative shrink-0">
         <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
         <ArrowDown className="w-10 h-10 lg:w-20 lg:h-20 stroke-[0.5px] lg:stroke-[0.3px] text-primary group-hover:translate-y-2 lg:group-hover:translate-y-4 transition-all duration-500 relative z-10 animate-bounce sm:animate-none" />
      </div>
    </button>
  );
}
