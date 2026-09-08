"use client";
import Image from "next/image";
import { motion } from "motion/react";
import EventsSlider from "@/components/EventsSlider";
import TestimonialsSlider from "@/components/TestimonialsSlider";

const steps = [
  {
    num: "01",
    title: "Reach Out",
    desc: "Contact our events team with your vision, date, and party size. We'll get back to you within 24 hours.",
  },
  {
    num: "02",
    title: "We Plan Together",
    desc: "Collaborate with our team to customize the menu, flow, and space to match your occasion perfectly.",
  },
  {
    num: "03",
    title: "You Celebrate",
    desc: "Arrive and enjoy. Every detail is handled, from food and service to ambiance, so you can focus on the moment.",
  },
];

const amenities = [
  "Curated chef-driven menus tailored to your event",
  "Private and semi-private dining spaces available",
  "Full bar with custom cocktail pairings",
  "Dedicated event coordinator from start to finish",
  "Flexible setup for intimate or larger gatherings",
  "Audio/visual support available upon request",
];

export default function Events() {
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
          <Image src="/assets/pages/Events/Events-Hero-optimized.jpg" alt="Events at Siena" fill className="object-cover object-[50%_40%]" priority sizes="100vw" />
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
            EVENTS
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
          @keyframes mq-ev { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .mq-ev { display:flex; width:max-content; animation:mq-ev 22s linear infinite; }
        `}</style>
        <div className="mq-ev">
          {[0, 1, 2, 3].map((r) => (
            <div key={r} className="flex items-center">
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">PRIVATE DINNERS</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">CORPORATE GATHERINGS</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">COCKTAIL RECEPTIONS</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">MILESTONE CELEBRATIONS</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* INTRO + EVENTS SLIDER */}
      <section
        className="relative w-full pt-[80px] pb-[80px] overflow-hidden"
        data-bg="/assets/update_homepage_something_esp.webp"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-[1180px] mx-auto px-4">
          <div className="flex flex-col items-center text-center pb-[30px]">
            <motion.img
              src="/assets/icon6.svg"
              alt=""
              className="w-[60px] md:w-[75px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <div className="relative inline-block">
              <motion.h2
                className="text-white text-[60px] md:text-[80px] lg:text-[95px] leading-[0.9] tracking-[0.06em] uppercase"
                style={{ fontFamily: "'Palmore-Light', serif" }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              >
                Host Your Event
              </motion.h2>
              <motion.span
                className="absolute left-1/2 top-[105%] -translate-x-1/2 -translate-y-[12%] w-full text-[#e0b265] text-[40px] md:text-[60px] lg:text-[85px] leading-none"
                style={{
                  fontFamily: "'AguafinaScript-Regular', cursive",
                  textShadow: "3px 3px 0 #1b312e,-3px -3px 0 #1b312e,3px -3px 0 #1b312e,-3px 3px 0 #1b312e,0 3px 0 #1b312e,0 -3px 0 #1b312e,3px 0 0 #1b312e,-3px 0 0 #1b312e",
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              >
                at Siena
              </motion.span>
            </div>
            <motion.p
              className="text-white/80 text-lg md:text-xl leading-[140%] max-w-[780px] mt-12 md:mt-24"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              Whether it&apos;s an intimate celebration or a curated corporate gathering, Siena provides the perfect
              Mediterranean backdrop: warm, refined, and entirely your own.
            </motion.p>
            <motion.a
              href="/event-inquiry"
              className="group bg-[#e0b265] text-[#1b312e] px-4 md:px-9 mt-[30px] py-2 font-normal text-[14px] md:text-[15px] leading-[24px] flex items-center gap-2 border border-transparent hover:bg-white hover:text-[#1b312e] hover:border-white transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
            >
              BOOK AN EVENT
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="#1b312e" />
              </svg>
            </motion.a>
          </div>
        </div>
        <div className="w-full max-w-[1180px] mx-auto mt-6">
          <EventsSlider />
        </div>
      </section>

      {/* DIVIDER */}
      <section className="relative w-full h-[58px]">
        <img src="/assets/divisor_negro.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </section>

      {/* HOW IT WORKS */}
      <section
        className="relative w-full py-[80px] overflow-hidden"
        style={{ backgroundColor: "#030302" }}
      >
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
                How It Works
              </motion.h2>
              <motion.span
                className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-[20%] md:-translate-y-[35%] text-[#e0b265] text-[28px] md:text-[60px] lg:text-[85px] leading-none whitespace-nowrap"
                style={{ fontFamily: "'AguafinaScript-Regular', cursive" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              >
                simple &amp; seamless
              </motion.span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-16 md:mt-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center md:items-start text-center md:text-left p-6 md:p-8 border-t border-[#e0b265]/20 md:border-t-0 md:border-l first:border-t-0 first:border-l-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
              >
                <span
                  className="text-[#e0b265] text-[48px] md:text-[64px] leading-none mb-3"
                  style={{ fontFamily: "'Palmore-Light', serif" }}
                >
                  {step.num}
                </span>
                <div className="w-8 h-[2px] bg-[#e0b265] mb-4" />
                <h3
                  className="text-[#e0b265] text-[28px] md:text-[32px] leading-tight mb-3"
                  style={{ fontFamily: "'Palmore-Light', serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-white/70 text-[15px] md:text-[16px] leading-[1.7]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <section className="relative w-full h-[40px] md:h-[58px] overflow-hidden bg-[#f4eedd]">
        <img src="/assets/divisor_beige.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </section>

      {/* WHAT WE OFFER */}
      <section
        className="relative w-full py-[80px] overflow-hidden"
        style={{ backgroundColor: "#1b312e" }}
      >
        <div className="w-full max-w-[1180px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden">
                <img
                  src="/assets/pages/Events/what-we-offer-optimized.jpg"
                  alt="Siena event space"
                  className="w-full h-[300px] md:h-[480px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-4 border border-[#e0b265]/50 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              className="flex-1 flex flex-col gap-6"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img src="/assets/icon6.svg" alt="" className="w-[55px] md:w-[65px]" />
              <h2
                className="text-[#e0b265] text-[44px] md:text-[56px] leading-none tracking-[0.06em] uppercase"
                style={{ fontFamily: "'Palmore-Light', serif" }}
              >
                What We Offer
              </h2>
              <div className="w-10 h-[2px] bg-[#e0b265]" />
              <ul className="flex flex-col gap-3">
                {amenities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-[15px] md:text-[16px] leading-[1.6]">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#e0b265] flex-shrink-0 mt-[9px]" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/event-inquiry"
                className="group bg-[#e0b265] text-[#1b312e] px-4 md:px-9 py-2 mt-2 font-normal text-[14px] md:text-[15px] leading-[24px] flex items-center gap-2 w-fit border border-transparent hover:bg-white hover:text-[#1b312e] transition"
              >
                INQUIRE NOW
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="#1b312e" />
                </svg>
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      
    </main>
  );
}
