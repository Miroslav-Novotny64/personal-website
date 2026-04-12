"use client";

import { Link } from "@/i18n/navigation";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectTileProps {
  title: string;
  description: string;
  index: string;
  slug?: string;
  video?: string;
  image?: string;
  tags?: string[];
  className?: string; // e.g. "min-h-[500px]"
  variant?: "featured" | "grid";
}

export function ProjectTile({
  title,
  description,
  index,
  slug,
  video,
  image,
  tags = [],
  className = "",
  variant = "featured",
}: ProjectTileProps) {
  const isGrid = variant === "grid";

  const commonClassName = [
    "group relative block overflow-hidden",
    "border border-border/70 bg-card/40",
    "transition-all duration-300",
    "hover:border-primary/50 hover:bg-card/60",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className,
  ].join(" ");

  const content = (
    <>
      <span className="pointer-events-none absolute left-0 top-0 z-10 h-4 w-4 border-l-2 border-t-2 border-primary/90" />
      <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-4 w-4 border-b-2 border-r-2 border-primary/90" />

      <div className={cn("grid grid-cols-1", isGrid ? "flex flex-col" : "lg:grid-cols-12")}>
        {/* MEDIA: Left in featured, Top in grid */}
        <div className={cn("relative", isGrid ? "w-full" : "lg:col-span-7")}>
          <div className="relative w-full bg-muted">
            <div className="relative aspect-video w-full overflow-hidden">
              {video ? (
                <video
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls={false}
                  className="h-full w-full object-cover"
                />
              ) : image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                  No preview available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TEXT: Right in featured, Bottom in grid */}
        <div className={cn("relative", isGrid ? "flex-1" : "lg:col-span-5")}>
          <div className={cn(
            "flex h-full flex-col justify-between gap-5",
            isGrid ? "p-6" : "p-5 sm:p-6 xl:p-8"
          )}>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs tracking-[0.35em] text-primary">
                  // {index} //
                </p>
                {slug ? (
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                ) : null}
              </div>

              <h3 className={cn(
                "font-semibold leading-tight text-foreground",
                isGrid ? "text-lg" : "text-2xl xl:text-3xl"
              )}>
                {title}
              </h3>

              <p className={cn(
                "max-w-prose text-muted-foreground leading-relaxed",
                isGrid ? "text-[13px]" : "text-base"
              )}>
                {description}
              </p>
            </div>

            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border bg-background/40 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );

  if (slug) {
    return (
      <Link
        href={{ pathname: "/projects/[slug]" as any, params: { slug } }}
        className={commonClassName}
      >
        {content}
      </Link>
    );
  }

  return <div className={commonClassName}>{content}</div>;
}