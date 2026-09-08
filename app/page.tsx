"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
const MotionLink = motion(Link);
import { motion } from "motion/react";
import { getRestaurantInfo, RESTAURANT_FALLBACK, type RestaurantInfo } from "@/lib/restaurant";
import {
  fetchHours,
  getClosedWeekdays,
  getWeekdaySchedule,
  getTimeSlotsForDay,
  FALLBACK_CLOSED_WEEKDAYS,
  FALLBACK_WEEKDAY_SCHEDULE,
  parseLocalDate,
  type WeekdaySchedule,
} from "@/lib/hours";
import { ReservationDatePicker } from "@/components/ReservationDatePicker";
import LazyVideo from "@/components/LazyVideo";
import { preload } from "react-dom";

const PARTY_SIZES = Array.from({ length: 14 }, (_, i) => i + 1);

const EventsSlider = dynamic(() => import("@/components/EventsSlider"), { ssr: false });
// SSR enabled (unlike the other two below) so the 9 real Google reviews it
// renders exist in server HTML for crawlers, instead of only appearing after
// client JS mounts.
const TestimonialsSlider = dynamic(() => import("@/components/TestimonialsSlider"));
const VideosSection = dynamic(() => import("@/components/VideosSection"), { ssr: false });

const slides = [
  "/assets/slider_about1.webp",
  "/assets/slider_about2.webp",
];

export default function Home() {
  // The hero poster is the LCP element. A <video poster> is found by the
  // preload scanner but not prioritised, so ask for it explicitly.
  preload("/assets/hero_poster.webp", { as: "image", fetchPriority: "high" });

  const router = useRouter();
  const [info, setInfo] = useState<RestaurantInfo>(RESTAURANT_FALLBACK);
  useEffect(() => { getRestaurantInfo().then(setInfo); }, []);

  const [weekdaySchedule, setWeekdaySchedule] = useState<WeekdaySchedule>(FALLBACK_WEEKDAY_SCHEDULE);
  const [closedWeekdays, setClosedWeekdays] = useState<number[]>(FALLBACK_CLOSED_WEEKDAYS);
  useEffect(() => {
    fetchHours()
      .then((entries) => {
        setWeekdaySchedule(getWeekdaySchedule(entries));
        setClosedWeekdays(getClosedWeekdays(entries));
      })
      .catch(() => {
        setWeekdaySchedule(FALLBACK_WEEKDAY_SCHEDULE);
        setClosedWeekdays(FALLBACK_CLOSED_WEEKDAYS);
      });
  }, []);

  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [bookPartySize, setBookPartySize] = useState("2");

  // Same per-day slot logic the reservations page itself uses, so a time
  // offered here is guaranteed to still be valid once the user lands there.
  const bookTimeOptions = useMemo(() => {
    if (!bookDate) return [];
    const weekday = parseLocalDate(bookDate).getDay();
    return getTimeSlotsForDay(weekdaySchedule[weekday]);
  }, [bookDate, weekdaySchedule]);

  // Derived rather than stored: if the chosen date turns out to be closed
  // (or hours change under us), a stale time just stops being "current"
  // instead of needing a separate effect to go correct the state for it.
  const effectiveBookTime = bookTimeOptions.includes(bookTime) ? bookTime : "";

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookDate || !effectiveBookTime) return;
    const params = new URLSearchParams({ date: bookDate, time: effectiveBookTime, partySize: bookPartySize });
    // Handing the picks off via the URL — the reservations page reads
    // these same params and prefills step 1 of the form with them.
    router.push(`/reservations?${params.toString()}`);
  };

  return (
    <main>

      {/* HERO + BANNER wrapper = 100vh en mobile */}
      <div className="flex flex-col h-screen md:h-auto md:block">

      {/* HERO */}
      <section className="relative w-full flex-1 md:h-screen overflow-hidden">
        {/* The poster is the hero still, so this one element covers both what
            used to be a separate <Image> and the video, and it is what LCP
            measures. See eagerPoster in LazyVideo for why that matters. */}
        <LazyVideo
          src="/assets/hero_video_v2.mp4"
          mobileSrc="/assets/hero_video_mobile_v2.mp4"
          poster="/assets/hero_poster.webp"
          eagerPoster
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          {/* Above the fold, so it competes with the LCP poster. next/image
              serves AVIF at the size actually rendered instead of the full
              746px original; eager because the default here would be lazy. */}
          <Image
            src="/assets/logo_hero.webp"
            alt="Logo"
            width={746}
            height={440}
            sizes="(max-width: 767px) 280px, 400px"
            loading="eager"
            className="w-[280px] md:w-[400px] h-auto mb-5 hero-fadein"
          />

          <form
            onSubmit={handleBookNow}
            className="hero-fadein w-full max-w-[760px] flex flex-col sm:flex-row items-stretch bg-black/35 backdrop-blur-md border border-white/25 divide-y sm:divide-y-0 sm:divide-x divide-white/20"
          >
            <div className="flex-1 min-w-0">
              <ReservationDatePicker
                value={bookDate}
                onChange={setBookDate}
                closedWeekdays={closedWeekdays}
                placeholder="Date"
                buttonClassName="w-full flex items-center justify-between gap-2.5 px-4 py-3 bg-transparent text-white text-[13px] md:text-[14px] tracking-wide text-left cursor-pointer"
              />
            </div>

            <div className="flex-1 flex items-center gap-2.5 px-4 py-3 min-w-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e0b265" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              <select
                required
                disabled={!bookDate}
                value={effectiveBookTime}
                onChange={(e) => setBookTime(e.target.value)}
                className="w-full bg-transparent text-white text-[13px] md:text-[14px] tracking-wide outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 appearance-none [color-scheme:dark]"
                aria-label="Reservation time"
              >
                <option value="" style={{ backgroundColor: "#152C29", color: "#fff" }}>
                  {!bookDate ? "Time" : bookTimeOptions.length ? "Time" : "Closed"}
                </option>
                {bookTimeOptions.map((t) => (
                  <option key={t} value={t} style={{ backgroundColor: "#152C29", color: "#fff" }}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex items-center gap-2.5 px-4 py-3 min-w-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e0b265" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <select
                value={bookPartySize}
                onChange={(e) => setBookPartySize(e.target.value)}
                className="w-full bg-transparent text-white text-[13px] md:text-[14px] tracking-wide outline-none cursor-pointer appearance-none [color-scheme:dark]"
                aria-label="Party size"
              >
                {PARTY_SIZES.map((n) => (
                  <option key={n} value={n} style={{ backgroundColor: "#152C29", color: "#fff" }}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={!bookDate || !effectiveBookTime}
              className="group bg-[#e0b265] text-[#1b312e] px-6 md:px-9 py-3 font-normal text-[13px] md:text-[14px] tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:bg-[#1b312e] hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
            >
              Book Now
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z"
                  className="fill-[#1b312e] group-hover:fill-white transition-colors duration-300"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Barra inferior — ubicación e Instagram */}
        <div className="w-full max-w-[1180px] absolute bottom-0 left-1/2 -translate-x-1/2 z-10 py-4 hidden md:flex items-center justify-between">
          {/* Ubicación */}
          <a
            href={info.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white/80 text-[14px] md:text-[16px] tracking-wide hover:text-[#E0B265] transition text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70 group-hover:opacity-100 flex-shrink-0"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>

            <span>{info.address}</span>
          </a>

          {/* Teléfono */}
          <a
            href={`tel:${info.phone.replace(/\D/g, '')}`}
            className="group flex items-center gap-2 text-white/80 text-[14px] md:text-[16px] tracking-wide hover:text-[#E0B265] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 flex-shrink-0">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.99 5.99l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{info.phone}</span>
          </a>

        </div>

      </section>

      {/* CARRUSEL INFINITO */}
      <section className="w-full bg-[#030302] py-5 overflow-hidden">
        <style>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee-track {
      display: flex;
      width: max-content;
      animation: marquee 20s linear infinite;
    }
  `}</style>

        <div className="marquee-track">
          {[...Array(4)].map((_, repeat) => (
            <div key={repeat} className="flex items-center">

              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                MEDI-TALIAN CUISINE
              </span>
              <img width={29} height={29} src="/assets/star.svg" alt="star" className="w-5 h-5 flex-shrink-0" />

              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                CHEF-DRIVEN EXPERIENCE
              </span>
              <img width={29} height={29} src="/assets/star.svg" alt="star" className="w-5 h-5 flex-shrink-0" />

              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                ELEVATED SHARED PLATES
              </span>
              <img width={29} height={29} src="/assets/star.svg" alt="star" className="w-5 h-5 flex-shrink-0" />

              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                REFINED YET INVITING ATMOSPHERE
              </span>
              <img width={29} height={29} src="/assets/star.svg" alt="star" className="w-5 h-5 flex-shrink-0" />

            </div>
          ))}
        </div>

      </section>

      </div>{/* fin hero+banner 100vh */}


      {/* ABOUT US */}
      <section
        className="relative w-full overflow-hidden"
        data-bg="/assets/dark-green-wall-backdrop-grunge-background-texture.jpg"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="w-full max-w-[900px] mx-auto py-12 md:py-20 px-4">
          <div className="flex flex-col items-center text-center">

            {/* Icono arriba centrado */}
            <motion.img width={132} height={98} loading="lazy"
              src="/assets/icono_123.svg"
              alt="icono1"
              className="w-[60px] md:w-[75px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: 0, ease: "easeOut" }}
              animate={{ y: [0, -7, 0] }}
            />

            <div className="relative inline-block">
              {/* Título — the page's h1. Names the cuisine and the city, and still
                  reads as a phrase with the "reimagined" script sitting under it. */}
              <motion.h1
                className="text-white text-[60px] md:text-[80px] lg:text-[95px] leading-[0.9] tracking-[0.06em] uppercase"
                style={{ fontFamily: "'Palmore-Light', serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38, delay: 0.08, ease: "easeOut" }}
              >
                A Taste of the Mediterranean in Alpharetta
              </motion.h1>

              {/* Reimagined superpuesto */}
              <motion.span
                className="absolute left-1/2 top-[100%] md:top-[105%] -translate-x-1/2 -translate-y-[12%] text-[#e0b265] text-[40px] md:text-[60px] lg:text-[85px] leading-none"
                style={{
                  fontFamily: "'AguafinaScript-Regular', cursive",
                  textShadow: "3px 3px 0 #1b312e,-3px -3px 0 #1b312e,3px -3px 0 #1b312e,-3px 3px 0 #1b312e,0 3px 0 #1b312e,0 -3px 0 #1b312e,3px 0 0 #1b312e,-3px 0 0 #1b312e"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38, delay: 0.16, ease: "easeOut" }}
              >
                reimagined
              </motion.span>
            </div>

            <motion.p
              className="text-white/80 text-lg md:text-[34px] lg:text-xl leading-[140%] max-w-[1180px] mt-12 md:mt-25"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.38, delay: 0.24, ease: "easeOut" }}
            >
              At Siena, every detail is guided by a creative vision rooted in Mediterranean warmth and Italian soul. A place where flavors, atmosphere, and hospitality come together to create a truly memorable experience.
            </motion.p>

          <MotionLink
          href="/about-us"
          className="relative z-10 group bg-[#e0b265] text-[#1b312e] px-4 md:px-9 mt-[30px] py-2 font-normal text-[14px] md:text-[15px] leading-[20px] md:leading-[24px] flex items-center gap-2 border border-transparent hover:bg-white hover:text-[#1b312e] hover:border-white transition"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, delay: 0.28, ease: "easeOut" }}
        >
          <span>ABOUT US</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z"
              className="fill-[#1b312e] transition-colors duration-300"
            />
          </svg>
        </MotionLink>
          </div>
        </div>

        <VideosSection />
      </section>


      <section className="relative w-full h-[40px] md:h-[58px] overflow-hidden bg-[#e0b265]">
        <img width={1512} height={58} loading="lazy"
          src="/assets/divisor_beige.svg"
          alt="divider"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>



      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#1b312e" }}
      >

        <div className="w-full max-w-[1180px] mx-auto px-4 mt-[80px]">
          <div className="flex flex-col items-center text-center">

            <motion.img width={59} height={45} loading="lazy"
              src="/assets/icon_menu.svg"
              alt="Menu icon"
              className="w-[60px] md:w-[75px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: 0, ease: "easeOut" }}
              animate={{ y: [0, -7, 0] }}
            />

            <div className="relative inline-block">
              <motion.h2
                className="text-[#e0b265] text-[60px] md:text-[80px] lg:text-[95px] leading-[0.9] tracking-[0.06em] uppercase"
                style={{ fontFamily: "'Palmore-Light', serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38, delay: 0.08, ease: "easeOut" }}
              >
                Enjoy the Flavors
              </motion.h2>

              <motion.span
                className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-[20%] md:-translate-y-[35%] text-[#e0b265] text-[28px] md:text-[60px] lg:text-[85px] leading-none whitespace-nowrap"
                style={{
                  fontFamily: "'AguafinaScript-Regular', cursive",
                  textShadow: `
            2px 2px 0 #1b312e,
            -2px -2px 0 #1b312e,
            2px -2px 0 #1b312e,
            -2px 2px 0 #1b312e
          `,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38, delay: 0.16, ease: "easeOut" }}
              >
                inspired
              </motion.span>
            </div>

            <motion.p
              className="text-white/80 text-lg md:text-[34px] lg:text-xl leading-[140%] max-w-[1180px] mt-12 md:mt-25"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.38, delay: 0.24, ease: "easeOut" }}
            >
              From handcrafted pasta to fresh Mediterranean plates. <br className="hidden md:block" />
              Every dish tells a story worth savoring .
            </motion.p>

                  <MotionLink
          href="/menus"
          className="relative z-10 group bg-[#e0b265] text-[#1b312e] px-4 md:px-9 mt-[30px] py-2 font-normal text-[14px] md:text-[15px] leading-[20px] md:leading-[24px] flex items-center gap-2 border border-transparent hover:bg-white hover:text-[#1b312e] hover:border-white transition"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, delay: 0.28, ease: "easeOut" }}
        >
          <span>FULL MENU</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z"
              className="fill-[#1b312e] transition-colors duration-300"
            />
          </svg>
        </MotionLink>

          </div>
        </div>

        <div className="absolute inset-0 " />
        <div className="w-full max-w-[1180px] mx-auto mt-10 mb-[80px] px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:[grid-template-rows:280px_280px]">

            {/* Card grande izquierda - Dinner */}
            <motion.a
              href="/menus?tab=main-menu"
              className="group relative overflow-hidden shadow-lg md:row-span-2 h-[220px] md:h-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.38, delay: 0, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
            >
              <Image src="/assets/pages/Home/ETF-Dinner.jpg" alt="Dinner" fill quality={65} sizes="(max-width: 767px) 100vw, 390px" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

              <div className="absolute inset-4 border border-[#e0b265]">
                <div className="flex flex-col justify-end h-full p-4 md:p-6">
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white text-[28px] md:text-[32px] font-semibold leading-tight">DINNER</h3>
                      <p className="text-white/80 text-[14px] md:text-[18px] mt-1">
                        Chef-crafted Mediterranean plates
                      </p>
                    </div>
                    <div className="w-9 h-9 border border-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>

            {/* Card top centro - Brunch */}
            <motion.a
              href="/menus?tab=weekend-brunch"
              className="group relative overflow-hidden shadow-lg h-[220px] md:h-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.38, delay: 0.08, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
            >
              <Image src="/assets/pages/Home/ETF-Brunch.jpg" alt="Brunch" fill quality={65} sizes="(max-width: 767px) 100vw, 390px" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

              <div className="absolute inset-4 border border-[#e0b265]">
                <div className="flex flex-col justify-end h-full p-4 md:p-6">
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white text-[28px] md:text-[32px] font-semibold leading-tight">BRUNCH</h3>
                      <p className="text-white/80 text-[14px] md:text-[18px] mt-1">Weekend mornings done right</p>
                    </div>
                    <div className="w-9 h-9 border border-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>

            {/* Card top derecha - Happy Hour */}
            <motion.a
              href="/menus?tab=happy-hour"
              className="group relative overflow-hidden shadow-lg h-[220px] md:h-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.38, delay: 0.12, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
            >
              <Image src="/assets/pages/Home/ETF-HappyHour.jpg" alt="Happy Hour" fill sizes="(max-width: 767px) 100vw, 390px" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

              <div className="absolute inset-4 border border-[#e0b265]">
                <div className="flex flex-col justify-end h-full p-4 md:p-6">
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white text-[28px] md:text-[32px] font-semibold leading-tight md:whitespace-nowrap">HAPPY HOUR</h3>
                      <p className="text-white/80 text-[14px] md:text-[18px] mt-1">Deals and drinks from 4 to 7pm</p>
                    </div>
                    <div className="w-9 h-9 border border-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>

            {/* Card ancha abajo - Beverages */}
            <motion.a
              href="/menus?tab=libations"
              className="group relative overflow-hidden shadow-lg md:col-span-2 h-[220px] md:h-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.38, delay: 0.18, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
            >
              <Image src="/assets/pages/Home/ETF-Beverages-2-landscape.jpg" alt="Beverages" fill sizes="(max-width: 767px) 100vw, 66vw" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

              <div className="absolute inset-4 border border-[#e0b265]">
                <div className="flex flex-col justify-end h-full p-4 md:p-6">
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white text-[28px] md:text-[32px] font-semibold leading-tight">BEVERAGES</h3>
                      <p className="text-white/80 text-[14px] md:text-[18px] mt-1">Cocktails, wines and craft drinks</p>
                    </div>
                    <div className="w-9 h-9 border border-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>


          </div>
        </div>

      </section>

      <section className="relative w-full h-[40px] md:h-[58px] overflow-hidden bg-[#e0b265]">
        <img width={1512} height={58} loading="lazy"
          src="/assets/divisor_beige.svg"
          alt="divider"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* EVENTS */}
      <section
        className="relative w-full pt-[80px] pb-[80px] overflow-hidden mt-[-5px]"
        data-bg="/assets/update_homepage_something_esp.webp"
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}
      >

        <div className="w-full max-w-[1180px] mx-auto px-4">
          <div className="flex flex-col items-center text-center pb-[30px]">

            {/* Icono arriba centrado */}
            <motion.img width={59} height={54} loading="lazy"
              src="/assets/icon6.svg"
              alt="icono1"
              className="w-[60px] md:w-[75px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: 0, ease: "easeOut" }}
              animate={{ y: [0, -7, 0] }}
            />

            <div className="relative inline-block">

              {/* Título */}
              <motion.h2
                className="text-white text-[60px] md:text-[80px] lg:text-[95px] leading-[0.9] tracking-[0.06em] uppercase"
                style={{ fontFamily: "'Palmore-Light', serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38, delay: 0.08, ease: "easeOut" }}
              >
                Something Special
              </motion.h2>

              {/* "every day" superpuesto */}
              <motion.span
                className="absolute left-1/2 top-[105%] -translate-x-1/2 -translate-y-[12%] w-full max-w-[900px] text-[#e0b265] text-[40px] md:text-[60px] lg:text-[85px] leading-none"
                style={{
                  fontFamily: "'AguafinaScript-Regular', cursive",
                  textShadow: "3px 3px 0 #1b312e,-3px -3px 0 #1b312e,3px -3px 0 #1b312e,-3px 3px 0 #1b312e,0 3px 0 #1b312e,0 -3px 0 #1b312e,3px 0 0 #1b312e,-3px 0 0 #1b312e",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38, delay: 0.16, ease: "easeOut" }}
              >
                every day
              </motion.span>

            </div>

            <motion.p
              className="text-white/80 text-lg md:text-[34px] lg:text-xl leading-[140%] max-w-[1180px] mt-12 md:mt-25"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.38, delay: 0.24, ease: "easeOut" }}
            >
              Designed for celebration, connection, and unforgettable meals.
            </motion.p>

            <motion.a
              href="/event-inquiry"
              className="group bg-[#e0b265] text-[#1b312e] px-4 md:px-9 mt-[30px] py-2 font-normal text-[14px] md:text-[15px] leading-[20px] md:leading-[24px] flex items-center gap-2 border border-transparent hover:bg-white hover:text-[#1b312e] hover:border-white transition"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: 0.28, ease: "easeOut" }}
            >
              BOOK AN EVENT

              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z"
                  className="fill-[#1b312e] transition-colors duration-300"
                />
              </svg>
            </motion.a>
          </div>

        </div>


        {/* Slider */}
        <div className="w-full max-w-[1180px] mx-auto">
          <EventsSlider />
        </div>

      </section>

      <section className="relative w-full h-[58px]">
        <img width={1512} height={58} loading="lazy"
          src="/assets/divisor_negro.svg"
          alt="divider"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* SOCIAL MEDIA */}
      <section className="w-full py-[80px] px-4 overflow-hidden" style={{ backgroundColor: "#1b312e" }}>
        <div className="w-full max-w-[1180px] mx-auto">
          <div className="flex flex-col items-center text-center mb-[60px] md:mb-[80px]">
            <motion.img width={132} height={98} loading="lazy"
              src="/assets/icono_123.svg"
              alt=""
              className="w-[60px] md:w-[75px] mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="relative inline-block">
              <motion.h2
                className="text-[#e0b265] text-[60px] md:text-[80px] lg:text-[95px] leading-[0.9] tracking-[0.06em] uppercase"
                style={{ fontFamily: "'Palmore-Light', serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38, delay: 0.08, ease: "easeOut" }}
              >
                Follow Us
              </motion.h2>
              <motion.span
                className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-[20%] md:-translate-y-[35%] text-[#e0b265] text-[28px] md:text-[60px] lg:text-[85px] leading-none whitespace-nowrap"
                style={{
                  fontFamily: "'AguafinaScript-Regular', cursive",
                  textShadow: "2px 2px 0 #1b312e,-2px -2px 0 #1b312e,2px -2px 0 #1b312e,-2px 2px 0 #1b312e",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38, delay: 0.16, ease: "easeOut" }}
              >
                on social
              </motion.span>
            </div>
            <motion.p
              className="text-white/70 text-lg md:text-xl leading-[140%] max-w-[560px] mt-12 md:mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.38, delay: 0.24, ease: "easeOut" }}
            >
              Stay connected with Siena. Follow along for daily specials, events, and behind-the-scenes moments.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                platform: "Instagram",
                handle: "@sienaatl",
                href: "https://www.instagram.com/sienaatl/",
                img: "/assets/gallery11_original.webp",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M7.6 2H16.4C19.4 2 22 4.6 22 7.6V16.4C22 17.9 21.4 19.3 20.3 20.3C19.2 21.4 17.8 22 16.4 22H7.6C4.6 22 2 19.4 2 16.4V7.6C2 6.2 2.6 4.8 3.7 3.7C4.8 2.6 6.2 2 7.6 2ZM7.4 4C6.5 4 5.7 4.4 5.1 5.1C4.4 5.7 4 6.5 4 7.4V16.6C4 18.5 5.5 20 7.4 20H16.6C17.5 20 18.3 19.6 18.9 18.9C19.6 18.3 20 17.5 20 16.6V7.4C20 5.5 18.5 4 16.6 4H7.4ZM17.3 5.5C17.6 5.5 17.9 5.6 18.1 5.9C18.4 6.1 18.5 6.4 18.5 6.8C18.5 7.1 18.4 7.4 18.1 7.6C17.9 7.9 17.6 8 17.3 8C16.9 8 16.6 7.9 16.4 7.6C16.1 7.4 16 7.1 16 6.8C16 6.4 16.1 6.1 16.4 5.9C16.6 5.6 16.9 5.5 17.3 5.5ZM12 7C13.3 7 14.5 7.5 15.5 8.5C16.5 9.4 17 10.7 17 12C17 13.3 16.5 14.6 15.5 15.5C14.6 16.5 13.3 17 12 17C10.7 17 9.4 16.5 8.5 15.5C7.5 14.6 7 13.3 7 12C7 10.7 7.5 9.4 8.5 8.5C9.4 7.5 10.7 7 12 7ZM12 9C11.2 9 10.4 9.3 9.9 9.9C9.3 10.4 9 11.2 9 12C9 12.8 9.3 13.6 9.9 14.1C10.4 14.7 11.2 15 12 15C12.8 15 13.6 14.7 14.1 14.1C14.7 13.6 15 12.8 15 12C15 11.2 14.7 10.4 14.1 9.9C13.6 9.3 12.8 9 12 9Z" fill="currentColor" />
                  </svg>
                ),
              },
              {
                platform: "Facebook",
                handle: "Siena ATL",
                href: "https://www.facebook.com/sienaatl/",
                img: "/assets/gallery16_original.webp",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="currentColor" />
                  </svg>
                ),
              },
              {
                platform: "TikTok",
                handle: "@sienaatl",
                href: "https://www.tiktok.com/@sienaatl",
                img: "/assets/gallery21_original.webp",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M16.5 2C16.8 4.1 18.4 5.7 20.5 6V9C18.9 8.95 17.4 8.45 16 7.6V14.5C16 18.1 13.1 21 9.5 21C5.9 21 3 18.1 3 14.5C3 10.9 5.9 8 9.5 8C10 8 10.5 8.05 11 8.15V11.2C10.5 11.05 10 11 9.5 11C7.6 11 6 12.6 6 14.5C6 16.4 7.6 18 9.5 18C11.4 18 13 16.4 13 14.5V2H16.5Z" fill="currentColor" />
                  </svg>
                ),
              },
            ].map(({ platform, handle, href, img, icon }, i) => (
              <motion.a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden"
                style={{ aspectRatio: "3/4" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.22 } }}
              >
                <Image
                  src={img}
                  alt={platform}
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <span className="text-[#e0b265] mb-3 group-hover:scale-110 transition-transform duration-300 w-fit">{icon}</span>
                  <span className="text-[#e0b265] text-[10px] tracking-[0.4em] uppercase mb-1">{platform}</span>
                  <span className="text-white text-[26px] md:text-[30px] leading-none mb-4" style={{ fontFamily: "'Palmore-Light', serif" }}>{handle}</span>
                  <div className="flex items-center gap-2 text-white/60 group-hover:text-[#e0b265] text-[12px] tracking-[0.25em] uppercase transition-colors duration-300">
                    <span>Follow</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="relative w-full py-20 overflow-hidden"
        data-bg="/assets/fondo_testimonials.webp"
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}
      >

        <div className="w-full max-w-[1180px] mx-auto px-4">
          <div className="flex flex-col items-center text-center pb-[30px]">

            {/* Icono arriba centrado */}
            <motion.img width={323} height={103} loading="lazy"
              src="/assets/icono_testimonios.svg"
              alt="icono1"
              className="w-[130px] md:w-[172px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: 0, ease: "easeOut" }}
            />

            <div className="relative inline-block mb-[30px]">

              {/* Título */}
              <motion.h2
                className="text-[#e0b265] text-[60px] md:text-[80px] lg:text-[95px] leading-[0.9] tracking-[0.06em] uppercase mb-[10px]"
                style={{ fontFamily: "'Palmore-Light', serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38, delay: 0.08, ease: "easeOut" }}
              >
                From the food to the atmosphere, <br></br>
              </motion.h2>

              <motion.span
                className="absolute left-1/2 md:top-[115%] -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] text-[#e0b265] text-[40px] md:text-[60px] lg:text-[85px] leading-none"
                style={{
                  fontFamily: "'AguafinaScript-Regular', cursive"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38, delay: 0.16, ease: "easeOut" }}
              >
                unforgettable
              </motion.span>

            </div>

          </div>

        </div>

        {/* Slider */}
        <div className="mt-8 md:mt-15">
          <TestimonialsSlider />
        </div>

      </section>

      <section className="relative w-full h-[28px] overflow-hidden bg-[#030302]">
        <img width={1512} height={27} loading="lazy"
          src="/assets/divisor_estrella3.svg"
          alt="divider"
          className="absolute inset-0 w-full h-full object-cover scale-y-125"
        />
      </section>

      {/* FIND US */}
      <section
        className="relative w-full py-12 md:py-20 overflow-hidden"
        data-bg="/assets/dark-green-wall-backdrop-grunge-background-texture.jpg"
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="w-full max-w-[1180px] mx-auto px-4 md:px-0">
          <div
            className="relative overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-stretch gap-8 md:gap-12"
            data-bg="/assets/pattern-dark.png"
            style={{ backgroundColor: "#1e3833", backgroundSize: "160px", backgroundRepeat: "repeat" }}
          >
            <div className="absolute inset-3 border border-[#e0b265]/20 pointer-events-none" />

            {/* Columna izquierda */}
            <div className="flex-1 flex flex-col gap-4 md:gap-5 relative z-10 w-full">
              <img width={61} height={51} loading="lazy" src="/assets/icono_findus.svg" alt="Find Us" className="w-[55px] md:w-[68px] h-auto" />

              <h2
                className="text-[#e0b265] text-[52px] md:text-[72px] font-bold tracking-wide leading-none"
                style={{ fontFamily: "'Palmore-Light', serif" }}
              >
                FIND US
              </h2>

              <a
                href={info.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2 text-white/85 text-[16px] md:text-[18px] leading-[1.5] hover:text-[#e0b265] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    className="fill-[#e0b265] group-hover:fill-white transition-colors duration-300" />
                </svg>
                {info.address}
              </a>

              <a
                href={`tel:${info.phone.replace(/\D/g, '')}`}
                className="group flex items-center gap-2 text-white/85 text-[16px] md:text-[18px] hover:text-[#e0b265] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    className="fill-[#e0b265] group-hover:fill-white transition-colors duration-300" />
                </svg>
                {info.phone}
              </a>

              <div className="flex flex-col gap-2 mt-2">
                <p
                  className="text-white text-[30px] md:text-[38px] tracking-wide uppercase leading-none"
                  style={{ fontFamily: "'Palmore-Light', serif" }}
                >
                  Opening Hours
                </p>
                <div className="w-8 h-[2px] bg-[#e0b265]/40 mb-1" />
                {info.hours.map(({ label, value }) => (
                  <p key={label} className="text-white/80 text-[16px] md:text-[18px]">
                    <span className="font-semibold">{label}</span>: {value}
                  </p>
                ))}
              </div>

              <a
                href={info.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#e0b265] text-[#1b312e] px-4 md:px-9 py-2 font-normal text-[14px] md:text-[15px] leading-[20px] md:leading-[24px] flex items-center gap-2 w-fit border border-transparent hover:bg-white hover:text-[#1b312e] hover:border-white transition mt-1 md:mt-2"
              >
                OPEN IN MAP
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z"
                    className="fill-[#1b312e] transition-colors duration-300"
                  />
                </svg>
              </a>
            </div>

            {/* Mapa */}
            <div className="flex-1 overflow-hidden shadow-lg relative z-10 w-full min-h-[260px] md:min-h-0 md:h-auto self-stretch">
              <iframe
                title="Siena Restaurant location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.051868613463!2d-84.2991249!3d34.06818459999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f575f4dbde006b%3A0x8a505a045593f782!2sSiena%20Restaurant!5e0!3m2!1ses-419!2scr!4v1777903381535!5m2!1ses-419!2scr"
                className="w-full h-full absolute inset-0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full h-[28px] overflow-hidden bg-[#030302]">
        <img width={1512} height={27} loading="lazy"
          src="/assets/divisor_estrella3.svg"
          alt="divider"
          className="absolute inset-0 w-full h-full object-cover scale-y-125"
        />
      </section>

      {/*<section className="w-full overflow-hidden">
        <style>{`
    @keyframes carrusel {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .carrusel-track {
      display: flex;
      width: max-content;
      animation: carrusel 30s linear infinite;
    }
  `}</style>

        <div className="carrusel-track">
          {[...Array(2)].map((_, repeat) => (
            <div key={repeat} className="flex">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="flex-shrink-0 h-[320px] w-[320px]">
                  <img loading="lazy"
                    src={`/assets/carrusel${i + 1}.webp`}
                    alt={`carrusel ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>*/}

    </main >
  );
}