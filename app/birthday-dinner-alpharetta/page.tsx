import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Birthday Dinner in Alpharetta, GA",
  description: "Celebrate a birthday dinner at Siena in Alpharetta with Mediterranean-inspired cuisine, cocktails, wine and an elevated atmosphere.",
  alternates: { canonical: "https://sienaatl.com/birthday-dinner-alpharetta" },
  openGraph: { title: "Birthday Dinner in Alpharetta | Siena", description: "Celebrate birthdays and special occasions at Siena in Alpharetta, Georgia.", url: "https://sienaatl.com/birthday-dinner-alpharetta" },
};

export default function BirthdayDinnerPage() {
  return (
    <main className="bg-[#1b312e] text-white pt-28 pb-20 px-5">
      <BreadcrumbSchema trail={[{ name: "Birthday Dinner Alpharetta", path: "/birthday-dinner-alpharetta" }]} />
      <section className="max-w-4xl mx-auto text-center">
        <p className="text-[#e0b265] uppercase tracking-[0.3em] text-sm mb-4">Celebrate at Siena</p>
        <h1 className="text-5xl md:text-7xl uppercase leading-none mb-8">Birthday Dinner in Alpharetta</h1>
        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">Make your next birthday dinner feel like an occasion. Siena pairs chef-driven Mediterranean and Italian-inspired dishes with cocktails, wine and a stylish Alpharetta dining room.</p>
        <h2 className="text-3xl text-[#e0b265] mb-4">Dinner for Two or a Group Celebration</h2>
        <p className="text-white/80 leading-relaxed mb-10">Reserve a table for an intimate celebration, or contact our private events team when your birthday calls for a larger gathering or dedicated event space.</p>
        <div className="text-left space-y-8 mb-10 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-3xl text-[#e0b265] mb-4">Plan Your Birthday Evening</h2>
            <p>Start with the date and number of guests, then check the reservation calendar for available times. Siena is at 124 Devore Road in Alpharetta, GA 30009. The online form lets you share your occasion and notes with the team when you book.</p>
            <p className="mt-4">For a larger celebration, use our <Link className="underline text-[#e0b265]" href="/event-inquiry">event inquiry form</Link> to discuss the group size and arrangements before making plans. An inquiry is a request; the team will confirm what is available.</p>
          </section>
          <section>
            <h2 className="text-3xl text-[#e0b265] mb-4">Choose the Food and Atmosphere</h2>
            <p>Explore the <Link className="underline text-[#e0b265]" href="/menus">current dinner and drinks menus</Link> before inviting your guests. Mediterranean and Italian-inspired dishes, cocktails and wine give your group a starting point for planning the evening. Tell the team about dietary needs before you arrive so they can discuss suitable options.</p>
            <p className="mt-4">Planning a Friday celebration? See our <Link className="underline text-[#e0b265]" href="/live-music-fridays">Live Music Fridays</Link> page for music from 7–10 PM. For a birthday dinner for two, explore our <Link className="underline text-[#e0b265]" href="/date-night-alpharetta">date-night dining</Link> page and choose the evening that suits you.</p>
          </section>
          <section>
            <h2 className="text-3xl text-[#e0b265] mb-4">Questions Before You Book?</h2>
            <h3 className="text-xl text-white mb-2">Can I bring a cake or decorations?</h3>
            <p>Call <a className="underline text-[#e0b265]" href="tel:+14049990373">(404) 999-0373</a> to check arrangements for cakes, decorations and other special requests before bringing them. The team can confirm any applicable requirements.</p>
            <h3 className="text-xl text-white mt-5 mb-2">How do I reserve for a group?</h3>
            <p>Check the online calendar for your party size. If your group needs arrangements beyond the available table options, contact the private dining team through the event inquiry form.</p>
          </section>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link className="bg-[#e0b265] text-[#1b312e] px-6 py-3 uppercase" href="/reservations">Reserve a Table</Link>
          <Link className="border border-[#e0b265] px-6 py-3 uppercase" href="/private-dining-alpharetta">Private Dining</Link>
          <Link className="border border-[#e0b265] px-6 py-3 uppercase" href="/menus">View Menu</Link>
        </div>
      </section>
    </main>
  );
}
