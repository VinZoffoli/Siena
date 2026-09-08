"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { itemsByKey, RESTAURANT_NAME, RESTAURANT_ADDRESS } from "@/lib/order-menu";
import { loadCart, saveCart } from "@/lib/cart";
import { CartLine } from "@/components/order/CartLine";
import { ChevronLeftIcon, ClockIcon, PinIcon, CardIcon } from "@/components/order/icons";

const MAP_SRC = RESTAURANT_ADDRESS
  ? `https://www.google.com/maps?q=${encodeURIComponent(`${RESTAURANT_NAME}, ${RESTAURANT_ADDRESS}`)}&output=embed`
  : "";

function GooglePayIcon() {
  return (
    <span className="inline-flex items-center gap-1 border border-black/15 rounded px-2 py-0.5 bg-white text-black text-[12px] font-medium">
      <span style={{ color: "#4285F4" }}>G</span>
      <span>Pay</span>
    </span>
  );
}

export default function Checkout() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [hydrated, setHydrated] = useState(false);

  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [textNotification, setTextNotification] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"googlepay" | "card">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [instructions, setInstructions] = useState("");
  const MAX_INSTRUCTION_CHARS = 1000;

  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    setCart(loadCart());
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) saveCart(cart);
  }, [cart, hydrated]);

  const addItem = (key: string) => setCart((c) => ({ ...c, [key]: (c[key] ?? 0) + 1 }));
  const removeItem = (key: string) =>
    setCart((c) => {
      const next = { ...c };
      const n = (next[key] ?? 0) - 1;
      if (n <= 0) delete next[key];
      else next[key] = n;
      return next;
    });
  const deleteItem = (key: string) =>
    setCart((c) => {
      const next = { ...c };
      delete next[key];
      return next;
    });

  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
  const totalItems = entries.reduce((sum, [, qty]) => sum + qty, 0);
  const subtotal = entries.reduce((sum, [key, qty]) => {
    const item = itemsByKey[key];
    if (!item) return sum;
    const price = parseFloat(item.price);
    return sum + (isNaN(price) ? 0 : price * qty);
  }, 0);

  const contactValid = phone.trim() !== "" && fullName.trim() !== "" && email.trim() !== "";
  const paymentValid =
    paymentMethod === "card"
      ? cardNumber.trim() !== "" && expiration.trim() !== "" && securityCode.trim() !== "" && zipCode.trim() !== ""
      : false; // Google Pay isn't wired up yet — see note below.
  const canPlaceOrder = entries.length > 0 && contactValid && paymentValid;

  const handlePlaceOrder = () => {
    setAttempted(true);
    if (!canPlaceOrder) return;
    // No payment backend is connected yet — this simply simulates the
    // confirmation step and clears the cart, rather than actually charging
    // the card details entered above.
    setSubmitted(true);
    setCart({});
  };

  if (submitted) {
    return (
      <main className="bg-[#1b312e] min-h-screen">
        <div className="w-full max-w-[600px] mx-auto px-4 pt-[160px] pb-[120px] text-center">
          <div className="w-16 h-16 rounded-full bg-[#e0b265]/15 border border-[#e0b265]/40 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e0b265" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h1
            className="text-[#e0b265] text-[36px] md:text-[44px] leading-tight uppercase tracking-[0.04em]"
            style={{ fontFamily: "'Palmore-Light', serif" }}
          >
            Order Received
          </h1>
          <p className="text-white/70 text-[15px] mt-4 leading-relaxed">
            Thanks, {fullName.split(" ")[0] || "there"} — we&apos;ve got your order for pickup at {RESTAURANT_NAME}.
            You&apos;ll get updates at {email}.
          </p>
          <Link
            href="/order-online"
            className="inline-block mt-8 border border-[#e0b265] text-[#e0b265] px-8 py-3 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-[#e0b265] hover:text-[#1b312e] transition-colors"
          >
            Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#1b312e] min-h-screen">
      <div className="w-full max-w-[1180px] mx-auto px-4 md:px-6 pt-[140px] pb-[120px]">
        <Link
          href="/order-online"
          className="inline-flex items-center gap-1.5 text-[#e0b265] text-[14px] hover:text-white transition-colors mb-4"
        >
          <ChevronLeftIcon />
          Back
        </Link>
        <h1
          className="text-[#e0b265] text-[36px] md:text-[46px] leading-tight uppercase tracking-[0.04em] mb-10"
          style={{ fontFamily: "'Palmore-Light', serif" }}
        >
          Checkout
        </h1>

        {entries.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/60 text-[15px] mb-6">Your cart is empty.</p>
            <Link
              href="/order-online"
              className="inline-block border border-[#e0b265] text-[#e0b265] px-8 py-3 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-[#e0b265] hover:text-[#1b312e] transition-colors"
            >
              Browse the Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
            {/* ─── LEFT: pickup, contact, payment, instructions, totals ─── */}
            <div>
              {/* Pickup */}
              <section className="pb-8 border-b border-white/10">
                <h2 className="text-white text-[20px] font-medium mb-4">Pickup</h2>
                <div className="flex items-center gap-2 text-white/80 text-[14px] mb-3">
                  <span className="text-[#e0b265]"><ClockIcon /></span>
                  Pickup <span className="text-white font-medium">ASAP</span>
                </div>
                <div className="flex items-start gap-2 text-white/80 text-[14px] mb-4">
                  <span className="text-[#e0b265] mt-0.5"><PinIcon /></span>
                  <span>
                    Pickup at <span className="text-white font-medium">{RESTAURANT_NAME}</span>
                    {RESTAURANT_ADDRESS && <span className="block text-white/50 mt-0.5">{RESTAURANT_ADDRESS}</span>}
                  </span>
                </div>
                {MAP_SRC && (
                  <div className="w-full h-[220px] border border-white/15 overflow-hidden grayscale-[15%]">
                    <iframe
                      src={MAP_SRC}
                      title="Pickup location map"
                      loading="lazy"
                      className="w-full h-full border-0"
                    />
                  </div>
                )}
              </section>

              {/* Contact */}
              <section className="py-8 border-b border-white/10">
                <h2 className="text-white text-[20px] font-medium mb-1">Contact</h2>
                <p className="text-white/40 text-[12px] mb-4">* required field</p>
                <div className="flex flex-col gap-3 max-w-[440px]">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className={`bg-white/8 border text-white placeholder-white/40 text-[14px] px-4 py-3 outline-none transition-colors ${
                      attempted && !phone.trim() ? "border-red-400/60" : "border-white/15 focus:border-[#e0b265]/60"
                    }`}
                  />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name *"
                    className={`bg-white/8 border text-white placeholder-white/40 text-[14px] px-4 py-3 outline-none transition-colors ${
                      attempted && !fullName.trim() ? "border-red-400/60" : "border-white/15 focus:border-[#e0b265]/60"
                    }`}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email *"
                    className={`bg-white/8 border text-white placeholder-white/40 text-[14px] px-4 py-3 outline-none transition-colors ${
                      attempted && !email.trim() ? "border-red-400/60" : "border-white/15 focus:border-[#e0b265]/60"
                    }`}
                  />
                </div>

                <p className="text-white/50 text-[13px] mt-4 max-w-[440px]">
                  You&apos;ll receive order updates by email. To also receive text updates:
                </p>
                <label className="flex items-center gap-2 mt-2 cursor-pointer w-fit">
                  <input
                    type="checkbox"
                    checked={textNotification}
                    onChange={(e) => setTextNotification(e.target.checked)}
                    className="w-4 h-4 accent-[#e0b265]"
                  />
                  <span className="text-white text-[14px]">Text notification</span>
                </label>
                {textNotification && (
                  <p className="text-white/35 text-[11px] mt-2 max-w-[440px] leading-relaxed">
                    By opting in, you agree to receive order update text messages. Message frequency varies per
                    order. Standard message and data rates may apply. Reply STOP to opt out at any time.
                  </p>
                )}
              </section>

              {/* Payment */}
              <section className="py-8 border-b border-white/10">
                <h2 className="text-white text-[20px] font-medium mb-4">Payment</h2>

                <label className="flex items-center gap-3 py-3 border-b border-white/10 cursor-not-allowed opacity-50">
                  <input type="radio" name="payment" disabled className="w-4 h-4 accent-[#e0b265]" />
                  <GooglePayIcon />
                  <span className="text-white text-[14px]">Google Pay</span>
                  <span className="text-white/40 text-[12px] ml-auto">Coming soon</span>
                </label>

                <label className="flex items-center gap-3 py-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-4 h-4 accent-[#e0b265]"
                  />
                  <span className="text-[#e0b265]"><CardIcon /></span>
                  <span className="text-white text-[14px] font-medium">Card</span>
                </label>

                {paymentMethod === "card" && (
                  <div className="flex flex-col gap-3 max-w-[440px] mt-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card number *"
                      className={`bg-white/8 border text-white placeholder-white/40 text-[14px] px-4 py-3 outline-none transition-colors ${
                        attempted && !cardNumber.trim() ? "border-red-400/60" : "border-white/15 focus:border-[#e0b265]/60"
                      }`}
                    />
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={expiration}
                        onChange={(e) => setExpiration(e.target.value)}
                        placeholder="Expiration date *"
                        className={`flex-1 bg-white/8 border text-white placeholder-white/40 text-[14px] px-4 py-3 outline-none transition-colors ${
                          attempted && !expiration.trim() ? "border-red-400/60" : "border-white/15 focus:border-[#e0b265]/60"
                        }`}
                      />
                      <input
                        type="text"
                        inputMode="numeric"
                        value={securityCode}
                        onChange={(e) => setSecurityCode(e.target.value)}
                        placeholder="Security code *"
                        className={`flex-1 bg-white/8 border text-white placeholder-white/40 text-[14px] px-4 py-3 outline-none transition-colors ${
                          attempted && !securityCode.trim() ? "border-red-400/60" : "border-white/15 focus:border-[#e0b265]/60"
                        }`}
                      />
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="Zip code *"
                      className={`bg-white/8 border text-white placeholder-white/40 text-[14px] px-4 py-3 outline-none transition-colors ${
                        attempted && !zipCode.trim() ? "border-red-400/60" : "border-white/15 focus:border-[#e0b265]/60"
                      }`}
                    />
                  </div>
                )}
              </section>

              {/* Special instructions */}
              <section className="py-8 border-b border-white/10">
                <button
                  onClick={() => setInstructionsOpen((o) => !o)}
                  className="w-full flex items-center justify-between text-white text-[20px] font-medium"
                >
                  Add special instructions
                  <motion.span animate={{ rotate: instructionsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </motion.span>
                </button>
                {instructionsOpen && (
                  <div className="mt-4 max-w-[560px]">
                    <textarea
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value.slice(0, MAX_INSTRUCTION_CHARS))}
                      rows={3}
                      placeholder="Special instructions"
                      className="w-full bg-white/8 border border-white/15 focus:border-[#e0b265]/60 outline-none text-white text-[14px] placeholder-white/40 p-3 resize-none transition-colors"
                    />
                    <p className="text-white/35 text-[11px] mt-1.5">
                      {instructions.length}/{MAX_INSTRUCTION_CHARS} characters
                    </p>
                  </div>
                )}
              </section>

              {/* Totals + place order */}
              <section className="pt-8 max-w-[440px]">
                <div className="flex items-center justify-between text-white text-[15px] mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-white text-[17px] font-semibold border-t border-white/10 pt-3 mt-3">
                  <span>Order Total</span>
                  <span className="text-[#e0b265]">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-white/35 text-[11px] mt-2">Tax calculated at pickup.</p>

                {attempted && !canPlaceOrder && (
                  <p className="text-red-400 text-[13px] mt-4">
                    Please fill in all required fields before placing your order.
                  </p>
                )}

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#e0b265] text-[#1b312e] py-4 mt-5 text-[14px] uppercase tracking-[0.1em] font-medium hover:bg-white transition-colors"
                >
                  Place Order — ${subtotal.toFixed(2)}
                </button>
              </section>
            </div>

            {/* ─── RIGHT: item summary ─── */}
            <div className="lg:sticky lg:top-[100px]">
              <h2 className="text-white text-[18px] font-medium mb-4">
                Item summary ({totalItems} {totalItems === 1 ? "item" : "items"})
              </h2>
              <div className="border border-white/10 bg-white/5 px-4">
                {entries.map(([key, qty]) => {
                  const item = itemsByKey[key];
                  if (!item) return null;
                  return (
                    <CartLine
                      key={key}
                      item={item}
                      qty={qty}
                      onAdd={() => addItem(key)}
                      onRemove={() => removeItem(key)}
                      onDelete={() => deleteItem(key)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
