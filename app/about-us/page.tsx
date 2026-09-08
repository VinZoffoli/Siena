"use client";
import Image from "next/image";
import { motion } from "motion/react";

const EVENT_INQUIRY_URL = "/event-inquiry";

export default function AboutUs() {
  return (
    <main>

      {/* HERO  section*/}
      <section className="relative w-full h-[400px] md:h-[45vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <Image
            src="/assets/pages/About-us/AboutusHero-aerial.jpg"
            alt="About Siena"
            fill
            className="object-cover object-center"
            preload
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,3,2,0.6)_0%,rgba(3,3,2,0.28)_45%,rgba(3,3,2,0.72)_100%)]" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-14 md:pt-16">
          <motion.div
            className="flex items-center gap-4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-12 md:w-24 h-px bg-gradient-to-r from-transparent to-[#e0b265]/80" />
            <span className="text-[#e0b265] text-[11px] tracking-[0.4em]">✦</span>
            <div className="w-12 md:w-24 h-px bg-gradient-to-l from-transparent to-[#e0b265]/80" />
          </motion.div>
          <motion.h1
            className="text-[#e0b265] text-[58px] md:text-[78px] lg:text-[98px] leading-none tracking-[0.06em] uppercase"
            style={{ fontFamily: "'Palmore-Light', serif" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            ABOUT US
          </motion.h1>
          <motion.div
            className="flex items-center gap-4 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <div className="w-12 md:w-24 h-px bg-gradient-to-r from-transparent to-[#e0b265]/80" />
            <span className="text-[#e0b265] text-[11px] tracking-[0.4em]">✦</span>
            <div className="w-12 md:w-24 h-px bg-gradient-to-l from-transparent to-[#e0b265]/80" />
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="w-full bg-[#030302] py-5 overflow-hidden">
        <style>{`
          @keyframes mq-au { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .mq-au { display:flex; width:max-content; animation:mq-au 22s linear infinite; }
        `}</style>
        <div className="mq-au">
          {[0, 1, 2, 3].map((r) => (
            <div key={r} className="flex items-center">
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                MEDITERRANEAN INSPIRED
              </span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                ALPHARETTA, GEORGIA
              </span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                CHEF-DRIVEN CUISINE
              </span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                AUTHENTIC FLAVORS
              </span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#1b312e" }}>
        <div className="w-full max-w-[600px] mx-auto px-4 py-[80px] md:py-[100px] flex flex-col items-center text-center">

          {/* Icon */}
          <motion.img
            src="/assets/icon_aboutus.svg"
            alt="Our Story"
            className="w-[80px] md:w-[95px] mb-4"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />

          {/* Section title */}
          <div className="relative inline-block mb-[60px] md:mb-[80px]">
            <motion.h2
              className="text-[#e0b265] text-[60px] md:text-[80px] lg:text-[95px] leading-[0.9] tracking-[0.06em] uppercase"
              style={{ fontFamily: "'Palmore-Light', serif" }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              Our Story
            </motion.h2>
            <motion.span
              className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-[20%] md:-translate-y-[35%] text-[#e0b265] text-[28px] md:text-[60px] lg:text-[85px] leading-none whitespace-nowrap"
              style={{
                fontFamily: "'AguafinaScript-Regular', cursive",
                textShadow: "2px 2px 0 #1b312e,-2px -2px 0 #1b312e,2px -2px 0 #1b312e,-2px 2px 0 #1b312e",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            >
              the beginning
            </motion.span>
          </div>

          {/* Text */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-white/80 text-[16px] md:text-[18px] leading-[1.8]">
              Siena was born from a passion for the sun-drenched flavors of the Mediterranean, a cuisine
              built on honest ingredients, bold character, and the timeless tradition of gathering around
              a beautiful table. Located in the heart of Alpharetta, Georgia, we bring the essence of
              coastal Mediterranean dining to the American South.
            </p>
            <p className="text-white/70 text-[16px] md:text-[18px] leading-[1.8]">
              Our name, Siena, draws inspiration from the warmth of the Tuscan city, with its rich terracotta
              tones, the golden afternoon light, and a culture that has always treated food as an art form
              and a reason to gather. We carry that spirit into every plate we craft, every glass we pour,
              and every table we set.
            </p>
            <p className="text-white/70 text-[16px] md:text-[18px] leading-[1.8]">
              From wood-fired flavors to hand-selected wines and seasonal ingredients sourced with care,
              every detail at Siena is a love letter to the Mediterranean way of life: vibrant, generous,
              and deeply alive.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="group w-full mt-12 relative overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <img
              src="/assets/hero5.webp"
              alt="Siena Restaurant interior"
              className="w-full h-[340px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 pointer-events-none" />
            <div className="absolute inset-4 border border-[#e0b265] pointer-events-none" />
          </motion.div>

        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative w-full overflow-hidden bg-[#030302]">
        <div className="w-full max-w-[1180px] mx-auto px-4 py-[80px] md:py-[100px]">

          {/* Section title */}
          <div className="flex flex-col items-center text-center mb-[70px] md:mb-[90px]">
            <div className="relative inline-block">
              <motion.h2
                className="text-[#e0b265] text-[60px] md:text-[80px] lg:text-[95px] leading-[0.9] tracking-[0.06em] uppercase"
                style={{ fontFamily: "'Palmore-Light', serif" }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              >
                Our Philosophy
              </motion.h2>
              <motion.span
                className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-[20%] md:-translate-y-[35%] text-[#e0b265] text-[28px] md:text-[60px] lg:text-[85px] leading-none whitespace-nowrap"
                style={{
                  fontFamily: "'AguafinaScript-Regular', cursive",
                  textShadow:
                    "2px 2px 0 #030302,-2px -2px 0 #030302,2px -2px 0 #030302,-2px 2px 0 #030302",
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              >
                how we cook
              </motion.span>
            </div>
          </div>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-4">

            {[
              {
                title: "Sourced with Intention",
                desc:
                  "We partner with local farms and trusted purveyors to bring the freshest seasonal ingredients to your plate. Sustainability and quality are never an afterthought; they are our foundation.",
              },
              {
                title: "Crafted with Precision",
                desc:
                  "Our chef-driven menus are a dialogue between tradition and innovation. Each dish is a careful composition that respects time-honored techniques while embracing creative vision.",
              },
              {
                title: "Served with Heart",
                desc:
                  "Hospitality at Siena goes beyond service. We want every guest to feel the warmth of a family table: welcomed, seen, and well taken care of from the first moment to the last.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="border border-white/10 bg-white/5 p-8 flex flex-col gap-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <span className="text-[#e0b265] text-[32px] leading-none select-none">✦</span>
                <h3
                  className="text-[#e0b265] text-[22px] md:text-[24px] leading-tight tracking-wide uppercase"
                  style={{ fontFamily: "'Palmore-Light', serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-white/60 text-[15px] md:text-[16px] leading-[1.75]">
                  {card.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* THE SPACE */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#1b312e" }}>
        <div className="w-full max-w-[1180px] mx-auto px-4 py-[80px] md:py-[100px]">

          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

            {/* Left: image */}
            <motion.div
              className="group flex-1 w-full relative overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <img
                src="/assets/hero6.webp"
                alt="Siena dining room"
                className="w-full h-[340px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-4 border border-[#e0b265] pointer-events-none" />
            </motion.div>

            {/* Right: text */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Section title */}
              <div className="relative inline-block mb-[60px] md:mb-[72px]">
                <motion.h2
                  className="text-[#e0b265] text-[60px] md:text-[75px] lg:text-[90px] leading-[0.9] tracking-[0.06em] uppercase"
                  style={{ fontFamily: "'Palmore-Light', serif" }}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                >
                  The Space
                </motion.h2>
                <motion.span
                  className="pointer-events-none absolute left-0 top-full -translate-y-[15%] md:-translate-y-[30%] text-[#e0b265] text-[28px] md:text-[50px] lg:text-[68px] leading-none whitespace-nowrap"
                  style={{
                    fontFamily: "'AguafinaScript-Regular', cursive",
                    textShadow: "2px 2px 0 #1b312e,-2px -2px 0 #1b312e,2px -2px 0 #1b312e,-2px 2px 0 #1b312e",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                >
                  dine in beauty
                </motion.span>
              </div>

              <p className="text-white/80 text-[16px] md:text-[18px] leading-[1.8] mb-5">
                Step inside and feel the warmth of rich textures, soft candlelight, and Mediterranean accents
                that evoke the timeless beauty of the Old World — reimagined in the heart of Alpharetta.
              </p>
              <p className="text-white/70 text-[16px] md:text-[18px] leading-[1.8] mb-8">
                Every corner is an invitation to slow down and savor the moment — whether it&apos;s a special
                occasion, a date night, or simply a meal worth remembering.
              </p>

              <a
                href={EVENT_INQUIRY_URL}
                className="group bg-[#e0b265] text-[#1b312e] px-4 md:px-9 py-2 font-normal text-[14px] md:text-[15px] leading-[20px] md:leading-[24px] inline-flex items-center gap-2 border border-transparent hover:bg-white hover:text-[#1b312e] hover:border-white transition"
              >
                RESERVE A TABLE
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z"
                    className="fill-[#1b312e] transition-colors duration-300"
                  />
                </svg>
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="w-full overflow-hidden">
        <style>{`
          @keyframes strip-au { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .strip-au { display:flex; width:max-content; animation:strip-au 35s linear infinite; }
        `}</style>
        <div className="strip-au">
          {[0, 1, 2, 3].map((r) => (
            <div key={r} className="flex">
              {[3, 6, 10, 14, 20, 26].map((n) => (
                <div key={n} className="flex-shrink-0 h-[220px] md:h-[300px] w-[220px] md:w-[300px] overflow-hidden group">
                  <img
                    src={`/assets/gallery${n}.webp`}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* DIVISOR STRIPE */}
      <section className="relative w-full h-[28px] overflow-hidden bg-[#030302]">
        <img
          src="/assets/divisor_estrella3.svg"
          alt="divider"
          className="absolute inset-0 w-full h-full object-cover scale-y-125"
        />
      </section>

      

    </main>
  );
}
