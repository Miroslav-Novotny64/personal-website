"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageItem {
  src: string;
  caption?: string;
}

interface GalleryProps {
  images: string;
  autoScrollInterval?: number;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
};

export default function Gallery({ images, autoScrollInterval = 5000 }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const items: ImageItem[] = (() => {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const navigate = useCallback((newIndex: number, dir: number) => {
    setDirection(dir);
    setCurrentIndex(newIndex);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const stopAutoScroll = () => setIsAutoScrolling(false);

  useEffect(() => {
    if (isAutoScrolling && items.length > 1 && !isFullscreen) {
      autoScrollTimer.current = setInterval(next, autoScrollInterval);
    } else {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    }
    return () => { if (autoScrollTimer.current) clearInterval(autoScrollTimer.current); };
  }, [isAutoScrolling, next, autoScrollInterval, items.length, isFullscreen]);

  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isFullscreen, next, prev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent, onNext: () => void, onPrev: () => void) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      stopAutoScroll();
      diff > 0 ? onNext() : onPrev();
    }
    touchStartX.current = null;
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  const slide = (index: number, dir: number) => (
    <AnimatePresence initial={false} custom={dir} mode="popLayout">
      <motion.div
        key={index}
        custom={dir}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="absolute inset-0"
      >
        <Image
          src={items[index].src}
          alt={items[index].caption || `Gallery image ${index + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority={index === 0}
        />
      </motion.div>
    </AnimatePresence>
  );

  const counter = (
    <div className="flex items-center gap-2 sm:gap-4 text-white/50 font-mono text-[9px] sm:text-[10px] shrink-0">
      <span>{String(currentIndex + 1).padStart(2, "0")}</span>
      <div className="w-8 sm:w-12 h-px bg-white/20 relative">
        <motion.div
          className="absolute inset-0 bg-primary origin-left"
          animate={{ scaleX: (currentIndex + 1) / items.length }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <span>{String(items.length).padStart(2, "0")}</span>
    </div>
  );

  const dots = (fullscreen = false) => (
    <div className={cn("flex justify-center gap-2", fullscreen ? "pb-4" : "mt-3 sm:mt-4")}>
      {items.map((_, idx) => (
        <button
          key={idx}
          onClick={() => { navigate(idx, idx > currentIndex ? 1 : -1); stopAutoScroll(); }}
          className={cn(
            "h-1.5 rounded-full transition-all duration-500",
            idx === currentIndex
              ? "bg-primary w-6"
              : "bg-white/20 hover:bg-white/40 w-4"
          )}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  );

  return (
    <>
      {mounted && isFullscreen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 sm:p-3 bg-white/10 hover:bg-primary text-white rounded-full transition-colors duration-200"
              aria-label="Close fullscreen"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="relative flex-1"
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, next, prev)}
          >
            {slide(currentIndex, direction)}

            {items.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 hover:bg-primary text-white rounded-full transition-colors duration-200 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 hover:bg-primary text-white rounded-full transition-colors duration-200 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          <div className="px-4 sm:px-6 pt-3 pb-2 flex justify-between items-end gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                {"//"} image_{currentIndex + 1} {"//"}
              </span>
              {currentItem.caption && (
                <p className="text-white text-sm font-medium">{currentItem.caption}</p>
              )}
            </div>
            {counter}
          </div>

          {dots(true)}
        </div>,
        document.body
      )}

      <div
        className="not-prose relative my-10 sm:my-16 group/gallery"
        onMouseEnter={stopAutoScroll}
      >
        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-primary/40 pointer-events-none" />

        <div
          className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden bg-black/20 rounded-sm border border-border/50"
          onTouchStart={handleTouchStart}
          onTouchEnd={(e) => handleTouchEnd(e, () => { stopAutoScroll(); next(); }, () => { stopAutoScroll(); prev(); })}
        >
          {slide(currentIndex, direction)}

          <div className="absolute bottom-0 left-0 right-0 px-3 py-3 sm:p-6 bg-linear-to-t from-black/80 via-black/40 to-transparent flex justify-between items-end gap-4 z-10">
            <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-primary">
                {"//"} image_{currentIndex + 1} {"//"}
              </span>
              {currentItem.caption && (
                <p className="text-white text-xs sm:text-sm font-medium truncate">
                  {currentItem.caption}
                </p>
              )}
            </div>
            {counter}
          </div>

          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 p-1.5 sm:p-2 bg-black/50 hover:bg-primary text-white rounded-full transition-colors duration-200 z-10 opacity-100 sm:opacity-0 sm:group-hover/gallery:opacity-100"
            aria-label="Open fullscreen"
          >
            <Maximize2 size={15} />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.preventDefault(); stopAutoScroll(); prev(); }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 hover:bg-primary text-white rounded-full transition-colors duration-200 z-10 opacity-100 sm:opacity-0 sm:group-hover/gallery:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); stopAutoScroll(); next(); }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 hover:bg-primary text-white rounded-full transition-colors duration-200 z-10 opacity-100 sm:opacity-0 sm:group-hover/gallery:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {dots()}
      </div>
    </>
  );
}
