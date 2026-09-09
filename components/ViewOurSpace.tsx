"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Placeholder shots of the space — swap these for the client's own photos
// whenever they're ready. Aspect ratio drives each frame's width in the
// filmstrip (portrait shots render narrower, landscape shots wider), so it
// keeps working correctly with any mix of orientations.
const spaceImages = [
  { src: "/assets/Siena_20.03.26-A-01.webp", ratio: 2048 / 1152 },
  { src: "/assets/Siena_20.03.26-A-02.webp", ratio: 2048 / 1153 },
  { src: "/assets/Siena_20.03.26-A-03.webp", ratio: 1152 / 2048 },
  { src: "/assets/Siena_20.03.26-A-04.webp", ratio: 2048 / 1152 },
  { src: "/assets/Siena_20.03.26-A-05.webp", ratio: 1152 / 2048 },
  { src: "/assets/footer-bg-siena.webp", ratio: 9347 / 6231 },
  { src: "/assets/Siena_20.03.26-A-06.webp", ratio: 1152 / 2048 },
];

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ChevronIcon = ({ flip }: { flip?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={flip ? "rotate-180" : ""}>
    <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="#1b312e" />
  </svg>
);

export default function ViewOurSpace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current && trackRef.current) {
        const d = trackRef.current.scrollWidth - containerRef.current.clientWidth;
        setDistance(d > 0 ? d : 0);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const openAt = (i: number) => {
    setZoomed(false);
    setLightbox(i);
  };
  const prev = () => setLightbox((l) => (l !== null ? (l - 1 + spaceImages.length) % spaceImages.length : null));
  const next = () => setLightbox((l) => (l !== null ? (l + 1) % spaceImages.length : null));

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") { setZoomed(false); prev(); }
      if (e.key === "ArrowRight") { setZoomed(false); next(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <section className="relative w-full py-[80px] overflow-hidden" style={{ backgroundColor: "#1b312e" }}>
      <div className="w-full max-w-[1180px] mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-14">
          <motion.img
            src="/assets/icono_123.svg"
            alt=""
            className="w-[60px] md:w-[75px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="relative inline-block">
            <motion.h2
              className="text-[#e0b265] text-[60px] md:text-[80px] lg:text-[95px] leading-[0.9] tracking-[0.06em] uppercase"
              style={{ fontFamily: "'Palmore-Light', serif" }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              View Our Space
            </motion.h2>
            <motion.span
              className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-[20%] md:-translate-y-[35%] text-[#e0b265] text-[28px] md:text-[60px] lg:text-[85px] leading-none whitespace-nowrap"
              style={{ fontFamily: "'AguafinaScript-Regular', cursive" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            >
              step inside
            </motion.span>
          </div>
        </div>
      </div>

      {/* Full-bleed auto-scrolling filmstrip */}
      <div ref={containerRef} className="w-full overflow-hidden mt-16 md:mt-20">
        <motion.div
          ref={trackRef}
          className="flex gap-4 md:gap-5 w-max px-4"
          animate={distance > 0 ? { x: [0, -distance] } : undefined}
          transition={{
            duration: Math.max(distance / 55, 18),
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          {spaceImages.map((img, i) => (
            <button
              key={i}
              onClick={() => openAt(i)}
              aria-label="Open photo"
              className="relative flex-shrink-0 h-[260px] md:h-[380px] lg:h-[440px] overflow-hidden group cursor-zoom-in border border-[#e0b265]/15"
              style={{ aspectRatio: img.ratio }}
            >
              <img
                src={img.src}
                alt="Inside Siena Restaurant"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1b312e]/0 group-hover:bg-[#1b312e]/25 transition-colors duration-500 flex items-center justify-center">
                <div className="w-10 h-10 border border-[#f4eedd] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#f4eedd" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0zm-6-3.5v7m-3.5-3.5h7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-[#f4eedd] z-10 w-10 h-10 flex items-center justify-center transition"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <CloseIcon />
            </button>

            <button
              className="absolute left-2 md:left-6 z-10 w-12 h-12 bg-[#e0b265] flex items-center justify-center hover:bg-[#1b312e] transition"
              onClick={(e) => { e.stopPropagation(); setZoomed(false); prev(); }}
              aria-label="Previous"
            >
              <ChevronIcon flip />
            </button>

            <div className="max-w-[92vw] max-h-[85vh] overflow-hidden flex items-center justify-center">
              <motion.img
                key={lightbox}
                src={spaceImages[lightbox].src}
                alt="Inside Siena Restaurant"
                className={`max-w-[92vw] max-h-[85vh] object-contain shadow-2xl transition-transform duration-300 ${
                  zoomed ? "scale-[1.9] cursor-zoom-out" : "cursor-zoom-in"
                }`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: zoomed ? 1.9 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
              />
            </div>

            <button
              className="absolute right-2 md:right-6 z-10 w-12 h-12 bg-[#e0b265] flex items-center justify-center hover:bg-[#1b312e] transition"
              onClick={(e) => { e.stopPropagation(); setZoomed(false); next(); }}
              aria-label="Next"
            >
              <ChevronIcon />
            </button>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-[13px] tracking-widest">
              {lightbox + 1} / {spaceImages.length} · click photo to {zoomed ? "zoom out" : "zoom in"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
