"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import siteData from "@/lib/site-data.json";

/* ─── Types ─────────────────────────────────────────────── */
interface MenuItem {
  image: string;
  name: string;
  description: string;
  price: string;
}

interface SubSection {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

interface TabData {
  id: string;
  label: string;
  subsections: SubSection[];
  footnote?: string;
}


/* ─── MenuItemCard ───────────────────────────────────────── */
function MenuItemCard({ item }: { item: MenuItem }) {
  const hasImage = !!item.image;

  return (
    <div className="bg-white/8 backdrop-blur-md shadow-sm border border-[#e0b265]/25 hover:border-[#e0b265]/60 hover:bg-white/12 transition-colors duration-300 py-6 px-5 flex flex-col items-center justify-center text-center gap-3">
      {hasImage && (
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <h4
        className="text-[19px] md:text-[22px] leading-tight uppercase text-[#e0b265]"
        style={{ fontFamily: "'Palmore-Light', serif", fontOpticalSizing: "none", fontVariationSettings: "'opsz' 28" }}
      >
        {item.name}
      </h4>
      {item.description && (
        <p className="text-[13px] md:text-[14px] leading-[1.6] text-white/70 whitespace-pre-line">
          {item.description}
        </p>
      )}
      {item.price && (
        <p className="text-[14px] md:text-[15px] font-semibold text-[#e0b265] whitespace-pre-line mt-auto pt-1">
          {item.price}
        </p>
      )}
    </div>
  );
}

/* ─── SubSectionBlock ────────────────────────────────────── */
function SubSectionBlock({ id, title, subtitle, items }: SubSection) {
  return (
    <div id={id} className="w-full py-[40px] md:py-[60px]">
      <div className="flex flex-col items-center text-center mb-[30px] md:mb-[40px] px-4">
        <div className="inline-flex flex-col items-center">
          <img
            src="/assets/icono_123.svg"
            alt=""
            aria-hidden="true"
            className="w-[80px] h-auto pointer-events-none opacity-40 mb-4"
          />
          <h3
            className="text-[42px] md:text-[57px] leading-tight uppercase text-[#e0b265]"
            style={{ fontFamily: "'Palmore-Light', serif" }}
          >
            {title}
          </h3>
        </div>
        {subtitle && (
          <p className="text-[14px] md:text-[16px] text-white/60 mt-2 uppercase tracking-widest">
            {subtitle}
          </p>
        )}
        <div className="flex items-center gap-3 mt-3">
          <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-[#e0b265]/60" />
          <span className="text-[#e0b265] text-[10px] tracking-[0.4em]">✦</span>
          <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-[#e0b265]/60" />
        </div>
      </div>

      {items.length > 0 ? (
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {items.map((item, i) => (
              <MenuItemCard key={i} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-white/40 italic px-4 text-sm">
          Coming soon…
        </div>
      )}
    </div>
  );
}

/* ─── MenuDeepLink ───────────────────────────────────────────
   Handles ?tab= deep links from the homepage. Kept in its own component with its
   own Suspense boundary on purpose: useSearchParams makes the nearest boundary
   render its fallback on the server, and when that boundary wrapped the whole
   page, Google received an empty document. Confining it here lets the menu
   itself server-render while the deep-link behaviour still works. */
function MenuDeepLink({
  tabs,
  headerHeight,
  onSelect,
}: {
  tabs: TabData[];
  headerHeight: number;
  onSelect: (id: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (!tab || !tabs.length) return;
    const timer = setTimeout(() => {
      const section = document.getElementById(tab);
      if (section) {
        const offset = headerHeight + 80;
        window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
        const isTab = tabs.some((t) => t.id === tab);
        if (isTab) {
          onSelect(tab);
        } else {
          const parentTab = tabs.find((t) => t.subsections.some((s) => s.id === tab));
          if (parentTab) onSelect(parentTab.id);
        }
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchParams, tabs, headerHeight, onSelect]);

  return null;
}

/* ─── MenuContent ────────────────────────────────────────── */
function MenuContent() {
  const [tabs] = useState<TabData[]>(siteData.menuTabs as TabData[]);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id ?? "");
  const [headerHeight, setHeaderHeight] = useState(80);
  const loading = false;
  const menuError: string | null = null;
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  /* ── Header shrink on scroll ── */
  useEffect(() => {
    const handleScroll = () => setHeaderHeight(window.scrollY > 10 ? 60 : 80);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── IntersectionObserver for active tab ── */
  useEffect(() => {
    if (!tabs.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { rootMargin: "-220px 0px -60% 0px", threshold: 0 }
    );
    tabs.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tabs]);

  /* ── Auto-scroll active tab button into view ── */
  useEffect(() => {
    const btn = tabsContainerRef.current?.querySelector(
      `[data-tab-id="${activeTab}"]`
    ) as HTMLElement | null;
    const container = tabsContainerRef.current;
    if (btn && container) {
      const scrollLeft = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeTab]);


  const handleTabClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = headerHeight + 80;
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-[#1b312e]">
      <Suspense fallback={null}>
        <MenuDeepLink tabs={tabs} headerHeight={headerHeight} onSelect={setActiveTab} />
      </Suspense>
      {/* HERO */}
      <section className="relative w-full h-[400px] md:h-[45vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <Image
            src="/assets/pages/Menu/menu-hero.webp"
            alt="Menu at Siena"
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-10 md:pt-12">
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
            className="text-[#e0b265] text-[52px] md:text-[82px] lg:text-[104px] leading-none tracking-[0.06em] uppercase"
            style={{ fontFamily: "'Palmore-Light', serif" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            MENU
          </motion.h1>
          <motion.div
            className="flex items-center gap-3 mt-4"
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
          @keyframes mq-menu { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .mq-menu { display:flex; width:max-content; animation:mq-menu 24s linear infinite; }
        `}</style>
        <div className="mq-menu">
          {[0, 1, 2, 3].map((r) => (
            <div key={r} className="flex items-center">
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">MEDITERRANEAN CUISINE</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">SIENA RESTAURANT</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">ALPHARETTA, GEORGIA</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">CRAFTED WITH PASSION</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* STICKY TABS */}
      {tabs.length > 0 && (
        <div
          className="sticky z-40 transition-all duration-300 bg-[#1b312e] border-b border-white/10 shadow-sm"
          style={{ top: `${headerHeight}px` }}
        >
          <div className="max-w-[1180px] mx-auto px-6 md:px-10">
            <div ref={tabsContainerRef} className="overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 md:gap-3 py-3 whitespace-nowrap justify-start md:justify-center">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      data-tab-id={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`px-4 md:px-5 py-[7px] text-[11px] md:text-[12px] tracking-[0.14em] uppercase cursor-pointer transition-all duration-200 border font-medium ${
                        isActive
                          ? "bg-[#e0b265] text-[#1b312e] border-[#e0b265]"
                          : "bg-transparent text-white/55 border-white/20 hover:border-[#e0b265]/50 hover:text-[#e0b265]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MENU SECTIONS */}
      <div className="max-w-[1180px] mx-auto pb-16 pt-8">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-[#e0b265] border-t-transparent rounded-full animate-spin" />
              <p className="text-white/50 text-sm tracking-widest uppercase">Loading menu…</p>
            </div>
          </div>
        )}
        {menuError && (
          <div className="text-center py-16 text-white/50 italic text-sm">{menuError}</div>
        )}
        {!loading && !menuError && (
          <div className="bg-transparent overflow-hidden">
            {tabs.map((tab) => (
              <section
                key={tab.id}
                id={tab.id}
                className="w-full scroll-mt-[180px] md:scroll-mt-[200px] border-b border-white/10 last:border-b-0"
              >
                {/* Tab section header */}
                <div className="w-full py-[50px] md:py-[70px] flex flex-col items-center text-center px-4 bg-transparent">
                  <motion.img
                    src="/assets/icon_menus.svg"
                    alt=""
                    className="w-[55px] md:w-[70px] mb-2 opacity-80"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 0.8, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="relative inline-block">
                    <motion.h2
                      className="text-[#e0b265] text-[52px] md:text-[72px] lg:text-[88px] leading-[0.9] tracking-[0.06em] uppercase"
                      style={{ fontFamily: "'Palmore-Light', serif" }}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                    >
                      {tab.label}
                    </motion.h2>
                    <motion.span
                      className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-[5%] md:-translate-y-[10%] text-[#e0b265] text-[24px] md:text-[50px] lg:text-[68px] leading-none whitespace-nowrap"
                      style={{
                        fontFamily: "'AguafinaScript-Regular', cursive",
                        textShadow: "3px 3px 0 #1b312e,-3px -3px 0 #1b312e,3px -3px 0 #1b312e,-3px 3px 0 #1b312e,0 3px 0 #1b312e,0 -3px 0 #1b312e,3px 0 0 #1b312e,-3px 0 0 #1b312e",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    >
                      at Siena
                    </motion.span>
                  </div>
                </div>

                {/* Subsections */}
                {tab.subsections.map((sub, i) => (
                  <SubSectionBlock key={i} {...sub} />
                ))}

                {tab.footnote && (
                  <div className="px-4 pb-[50px] md:pb-[70px] text-center">
                    {tab.footnote.split("\n").map((line, i) => (
                      <p key={i} className="text-white/50 text-[13px] italic leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/* ─── Page export ────────────────────────────────────────── */
export default function MenuPage() {
  return (
    <Suspense>
      <MenuContent />
    </Suspense>
  );
}
