"use client";
import Image from "next/image";
import { motion } from "motion/react";

const GIFT_CARD_URL = "https://order.toasttab.com/egiftcards/siena-restaurant-bar-124-devore-road";

const steps = [
  {
    num: "01",
    title: "Choose Your Amount",
    desc: "Select any denomination that fits the occasion, from a small treat to a full lavish dining experience.",
  },
  {
    num: "02",
    title: "Personalize It",
    desc: "Add a heartfelt personal message to make the gift feel truly special and memorable for the recipient.",
  },
  {
    num: "03",
    title: "Send Instantly",
    desc: "Delivered digitally, perfect for last-minute gifts or sending to someone who lives far away.",
  },
];

const occasions = [
  { label: "Birthdays", img: "/assets/pages/GiftCards/Birthday-optimized.jpg" },
  { label: "Anniversaries", img: "/assets/pages/GiftCards/Anniversary-optimized.jpg" },
  { label: "Holidays", img: "/assets/pages/GiftCards/Holidays-optimized.jpg" },
  { label: "Thank You Gifts", img: "/assets/pages/GiftCards/ThankYouGifts-optimized.jpg" },
  { label: "Corporate Gifting", img: "/assets/pages/GiftCards/CorporateGifting-optimized.jpg" },
  { label: "Just Because", img: "/assets/pages/GiftCards/JustBecuase-optimized.jpg" },
];

export default function GiftCard() {
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
          <Image src="/assets/pages/GiftCards/GiftCard-Hero-optimized.jpg" alt="Siena Gift Card" fill className="object-cover object-center" priority sizes="100vw" />
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
            className="text-[#e0b265] text-[54px] md:text-[74px] lg:text-[92px] leading-none tracking-[0.06em] uppercase"
            style={{ fontFamily: "'Palmore-Light', serif" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            GIFT CARD
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
          @keyframes mq-gc { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .mq-gc { display:flex; width:max-content; animation:mq-gc 22s linear infinite; }
        `}</style>
        <div className="mq-gc">
          {[0, 1, 2, 3].map((r) => (
            <div key={r} className="flex items-center">
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">GIVE THE GIFT OF SIENA</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">PERFECT FOR ANY OCCASION</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">MEDITERRANEAN DINING EXPERIENCE</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">EASY TO PURCHASE &amp; SEND</span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="relative w-full py-[80px] md:py-[100px] overflow-hidden" style={{ backgroundColor: "#1b312e" }}>
        <div className="w-full max-w-[1180px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

            <motion.div
              className="flex-1 flex flex-col"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <motion.img
                src="/assets/icono_123.svg"
                alt=""
                className="w-[55px] md:w-[65px] mb-4"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <h2
                className="text-[#e0b265] text-[58px] md:text-[72px] lg:text-[88px] leading-none tracking-[0.06em] uppercase mb-2"
                style={{ fontFamily: "'Palmore-Light', serif" }}
              >
                Share the
                <br />Experience
              </h2>
              <span
                className="text-[#e0b265] text-[34px] md:text-[42px] leading-none block mb-8"
                style={{ fontFamily: "'AguafinaScript-Regular', cursive" }}
              >
                with someone you love
              </span>

              <p className="text-white/70 text-[15px] md:text-[17px] leading-[1.8] mb-8 max-w-[520px]">
                A Siena Gift Card is more than a gift. It&apos;s an invitation to an unforgettable Mediterranean dining
                experience. Perfect for the food lover in your life, for special celebrations, or simply to say thank you
                in the most delicious way possible.
              </p>

              <motion.a
                href={GIFT_CARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#e0b265] text-[#1b312e] px-4 md:px-9 py-3 font-normal text-[14px] md:text-[15px] leading-[24px] flex items-center gap-2 w-fit border border-transparent hover:bg-white hover:text-[#1b312e] transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                BUY A GIFT CARD
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="#1b312e" />
                </svg>
              </motion.a>
            </motion.div>

            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden group">
                <img
                  src="/assets/pages/GiftCards/Unforgotable-gift-optimized.jpg"
                  alt="Siena dining experience"
                  className="w-full h-[360px] md:h-[480px] object-cover shadow-xl transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-4 border border-[#e0b265]/50 pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 bg-[#1b312e]/90 p-4 md:p-6 backdrop-blur-sm">
                  <p className="text-white text-[22px] md:text-[28px] leading-none" style={{ fontFamily: "'Palmore-Light', serif" }}>
                    An Unforgettable Gift
                  </p>
                  <span className="text-[#e0b265] text-[18px] md:text-[24px]" style={{ fontFamily: "'AguafinaScript-Regular', cursive" }}>
                    for anyone you care about
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <section className="relative w-full h-[58px]">
        <img src="/assets/divisor_negro.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </section>

      {/* HOW IT WORKS */}
      <section className="relative w-full py-[80px] overflow-hidden" style={{ backgroundColor: "#030302" }}>
        <div className="w-full max-w-[1180px] mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-14">
            <motion.img
              src="/assets/icono_123.svg"
              alt=""
              className="w-[60px] md:w-[75px] mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <div className="relative inline-block">
              <motion.h2
                className="text-[#e0b265] text-[58px] md:text-[78px] lg:text-[95px] leading-[0.9] tracking-[0.06em] uppercase"
                style={{ fontFamily: "'Palmore-Light', serif" }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              >
                How It Works
              </motion.h2>
              <motion.span
                className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-[20%] md:-translate-y-[35%] text-[#e0b265] text-[28px] md:text-[58px] lg:text-[82px] leading-none whitespace-nowrap"
                style={{ fontFamily: "'AguafinaScript-Regular', cursive" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              >
                simple &amp; thoughtful
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
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <span className="text-[#e0b265] text-[52px] md:text-[68px] leading-none mb-3" style={{ fontFamily: "'Palmore-Light', serif" }}>
                  {step.num}
                </span>
                <div className="w-8 h-[2px] bg-[#e0b265] mb-4" />
                <h3 className="text-[#e0b265] text-[26px] md:text-[30px] leading-tight mb-3" style={{ fontFamily: "'Palmore-Light', serif" }}>
                  {step.title}
                </h3>
                <p className="text-white/65 text-[15px] md:text-[16px] leading-[1.7]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <section className="relative w-full h-[40px] md:h-[58px] overflow-hidden bg-[#f4eedd]">
        <img src="/assets/divisor_beige.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </section>

      {/* PERFECT FOR */}
      <section className="relative w-full py-[80px] overflow-hidden" style={{ backgroundColor: "#1b312e" }}>
        <div className="w-full max-w-[1180px] mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-14">
            <div className="relative inline-block">
              <motion.h2
                className="text-[#e0b265] text-[58px] md:text-[78px] lg:text-[95px] leading-[0.9] tracking-[0.06em] uppercase"
                style={{ fontFamily: "'Palmore-Light', serif" }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              >
                Perfect For
              </motion.h2>
              <motion.span
                className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-[20%] md:-translate-y-[35%] text-[#e0b265] text-[28px] md:text-[58px] lg:text-[82px] leading-none whitespace-nowrap"
                style={{
                  fontFamily: "'AguafinaScript-Regular', cursive",
                  textShadow: `2px 2px 0 #1b312e,-2px -2px 0 #1b312e,2px -2px 0 #1b312e,-2px 2px 0 #1b312e`,
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              >
                every occasion
              </motion.span>
            </div>
            <motion.p
              className="text-white/70 text-lg md:text-xl leading-[140%] max-w-[560px] mt-14 md:mt-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              Whether you&apos;re celebrating a milestone or simply expressing gratitude, a Siena gift card speaks for itself.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {occasions.map((o, i) => (
              <motion.div
                key={i}
                className="group relative overflow-hidden cursor-default"
                style={{ aspectRatio: "4/3" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
              >
                <img
                  src={o.img}
                  alt={o.label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors duration-500" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-3 px-6 py-8">
                  <span className="text-[#e0b265] text-[22px]">✦</span>
                  <h3 className="text-white text-[24px] md:text-[34px] leading-tight" style={{ fontFamily: "'Palmore-Light', serif" }}>
                    {o.label}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <motion.a
              href={GIFT_CARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#e0b265] text-[#1b312e] px-10 py-4 font-normal text-[15px] flex items-center gap-3 border border-transparent hover:bg-white hover:text-[#1b312e] transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              PURCHASE A GIFT CARD
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="#1b312e" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative w-full h-[28px] overflow-hidden bg-[#030302]">
        <img src="/assets/divisor_estrella3.svg" alt="" className="absolute inset-0 w-full h-full object-cover scale-y-125" />
      </section>

     
    </main>
  );
}
