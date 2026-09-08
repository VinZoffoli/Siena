"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const images: string[] = [];

for (let i = 1; i <= 43; i++) {
  if (i !== 24) {
    images.push(`/assets/gallery${i}.webp`);
  }
}

for (let i = 45; i <= 186; i++) {
  images.push(`/assets/gallery${i}.webp`);
}

const TOTAL = images.length;

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = useCallback(
    () => setLightbox((l) => (l !== null ? (l - 1 + TOTAL) % TOTAL : null)),
    []
  );
  const next = useCallback(
    () => setLightbox((l) => (l !== null ? (l + 1) % TOTAL : null)),
    []
  );

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, prev, next]);

  return (
    <main>
      {/* HERO */}
      <section className="relative w-full h-[400px] md:h-[45vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <Image
            src="/assets/Siena_20.03.26-A-02.webp"
            alt="Gallery"
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-14 md:pt-16">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent to-[#e0b265]/80" />
            <span className="text-[#e0b265] text-[11px] tracking-[0.4em]">✦</span>
            <div className="w-10 md:w-16 h-px bg-gradient-to-l from-transparent to-[#e0b265]/80" />
          </motion.div>
          <motion.h1
            className="text-[#e0b265] text-[62px] md:text-[82px] lg:text-[104px] leading-none tracking-[0.06em] uppercase"
            style={{ fontFamily: "'Palmore-Light', serif" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            GALLERY
          </motion.h1>
          <motion.div
            className="flex items-center gap-3 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent to-[#e0b265]/80" />
            <span className="text-[#e0b265] text-[11px] tracking-[0.4em]">✦</span>
            <div className="w-10 md:w-16 h-px bg-gradient-to-l from-transparent to-[#e0b265]/80" />
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="w-full bg-[#030302] py-5 overflow-hidden">
        <style>{`
          @keyframes mq-gal { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .mq-gal { display:flex; width:max-content; animation:mq-gal 22s linear infinite; }
        `}</style>
        <div className="mq-gal">
          {[0, 1, 2, 3].map((r) => (
            <div key={r} className="flex items-center">
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">MEDITERRANEAN FLAVORS</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">CRAFTED WITH PASSION</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">ELEVATED ATMOSPHERE</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">UNFORGETTABLE MOMENTS</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION HEADER */}
      <section className="w-full pt-[70px] pb-[40px] px-4 md:px-6" style={{ backgroundColor: "#1b312e" }}>
        <div className="flex flex-col items-center text-center">
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
              A Visual Story
            </motion.h2>
            <motion.span
              className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-[20%] md:-translate-y-[35%] text-[#e0b265] text-[28px] md:text-[60px] lg:text-[85px] leading-none whitespace-nowrap"
              style={{
                fontFamily: "'AguafinaScript-Regular', cursive",
                textShadow: `2px 2px 0 #1b312e,-2px -2px 0 #1b312e,2px -2px 0 #1b312e,-2px 2px 0 #1b312e`,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            >
              crafted
            </motion.span>
          </div>
          <motion.p
            className="text-white/80 text-lg md:text-xl leading-[140%] max-w-[600px] mt-12 md:mt-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          >
            Explore the ambiance, flavors, and moments that make Siena a place worth returning to.
          </motion.p>
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="w-full pb-[80px] px-4 md:px-6" style={{ backgroundColor: "#1b312e" }}>
        <div className="w-full max-w-[1180px] mx-auto">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
            {images.map((src, i) => (
              <motion.div
                key={i}
                className="break-inside-avoid mb-3 md:mb-4 group relative overflow-hidden cursor-pointer"
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: "easeOut" }}
              >
                <img
                  src={src}
                  alt={`Siena ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#1b312e]/0 group-hover:bg-[#1b312e]/30 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-9 h-9 border border-[#f4eedd] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#f4eedd" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0zm-6-3.5v7m-3.5-3.5h7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <button
              className="absolute left-2 md:left-6 z-10 w-12 h-12 bg-[#e0b265] flex items-center justify-center hover:bg-[#1b312e] transition"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.69751 8.97146L18 8.97146L18 11.0285L4.69751 11.0285L8.87864 15.5456L7.51284 17L1 10L7.51284 3L8.87864 4.45436L4.69751 8.97146Z" fill="#1b312e" />
              </svg>
            </button>

            <motion.img
              key={lightbox}
              src={images[lightbox]}
              alt={`Gallery ${lightbox + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-2 md:right-6 z-10 w-12 h-12 bg-[#e0b265] flex items-center justify-center hover:bg-[#1b312e] transition"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="#1b312e" />
              </svg>
            </button>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-[13px] tracking-widest">
              {lightbox + 1} / {TOTAL}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

     
    </main>
  );
}
