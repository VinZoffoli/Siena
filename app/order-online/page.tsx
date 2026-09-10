"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { orderTabs as tabs, itemsByKey, keyFor, RESTAURANT_NAME, RESTAURANT_ADDRESS, type MenuItem } from "@/lib/order-menu";
import { loadCart, saveCart } from "@/lib/cart";
import { CartLine } from "@/components/order/CartLine";
import {
  PlusIcon,
  MinusIcon,
  BagIcon,
  PickupIcon,
  TruckIcon,
  ClockIcon,
  PinIcon,
  CloseIcon,
  ChevronRightIcon,
} from "@/components/order/icons";

/* ─── OrderItemCard ──────────────────────────────────────── */
function OrderItemCard({
  item,
  qty,
  onAdd,
  onRemove,
  onOpen,
}: {
  item: MenuItem;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
  onOpen: () => void;
}) {
  const hasImage = !!item.image;

  return (
    <div
      onClick={onOpen}
      className="flex gap-4 bg-white/8 backdrop-blur-md border border-[#e0b265]/25 hover:border-[#e0b265]/60 hover:bg-white/12 transition-colors duration-300 p-4 md:p-5 cursor-pointer"
    >
      <div className="flex-1 min-w-0 flex flex-col">
        <h4
          className="text-[16px] md:text-[18px] leading-snug uppercase text-[#e0b265]"
          style={{ fontFamily: "'Palmore-Light', serif" }}
        >
          {item.name}
        </h4>
        {item.description && (
          <p className="text-[13px] text-white/60 leading-[1.55] mt-1.5 line-clamp-2 whitespace-pre-line">
            {item.description}
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center gap-4">
          {qty > 0 ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 bg-[#e0b265] rounded-full px-1 py-1"
            >
              <button
                onClick={onRemove}
                aria-label={`Remove one ${item.name}`}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#1b312e] hover:bg-[#1b312e]/10 transition"
              >
                <MinusIcon />
              </button>
              <span className="w-5 text-center text-[13px] font-semibold text-[#1b312e]">{qty}</span>
              <button
                onClick={onAdd}
                aria-label={`Add one more ${item.name}`}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#1b312e] hover:bg-[#1b312e]/10 transition"
              >
                <PlusIcon />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onAdd(); }}
              aria-label={`Add ${item.name} to cart`}
              className="w-7 h-7 flex-shrink-0 rounded-full bg-[#e0b265] text-[#1b312e] flex items-center justify-center hover:bg-white transition"
            >
              <PlusIcon />
            </button>
          )}
          {item.price && (
            <span className="text-[14px] font-semibold text-[#e0b265] whitespace-pre-line leading-tight">
              {item.price}
            </span>
          )}
        </div>
      </div>

      {hasImage && (
        <div className="w-[110px] h-[110px] md:w-[135px] md:h-[135px] flex-shrink-0 overflow-hidden rounded-md">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

/* ─── ItemModal ──────────────────────────────────────────── */
function ItemModal({
  item,
  initialQty,
  onClose,
  onConfirm,
}: {
  item: MenuItem;
  initialQty: number;
  onClose: () => void;
  onConfirm: (qty: number) => void;
}) {
  const [qty, setQty] = useState(Math.max(1, initialQty));
  const [specialRequests, setSpecialRequests] = useState("");
  const MAX_CHARS = 500;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const unitPrice = parseFloat(item.price);
  const hasNumericPrice = !isNaN(unitPrice);
  const totalLabel = hasNumericPrice ? ` $${(unitPrice * qty).toFixed(2)}` : "";

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#1b312e] border border-[#e0b265]/25 shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {item.image && (
            <div className="w-full h-64 md:h-72 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
          )}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <h3
              className="text-[22px] md:text-[26px] leading-tight uppercase text-[#e0b265]"
              style={{ fontFamily: "'Palmore-Light', serif" }}
            >
              {item.name}
            </h3>
            {item.price && (
              <span className="text-[18px] font-semibold text-[#e0b265] whitespace-nowrap flex-shrink-0">
                {hasNumericPrice ? `$${unitPrice.toFixed(2)}` : item.price}
              </span>
            )}
          </div>

          {item.description && (
            <p className="text-[14px] text-white/70 leading-[1.6] mt-3 whitespace-pre-line">
              {item.description}
            </p>
          )}

          {item.allergens && item.allergens.length > 0 && (
            <p className="text-[12px] text-white/45 mt-4">
              Allergens: {item.allergens.join(", ")}
            </p>
          )}

          <div className="mt-6">
            <label htmlFor="special-requests" className="block text-[13px] uppercase tracking-[0.08em] text-white/70 mb-2">
              Special Requests
            </label>
            <textarea
              id="special-requests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value.slice(0, MAX_CHARS))}
              rows={3}
              placeholder="Let us know about any preferences or allergies…"
              className="w-full bg-white/8 border border-white/15 focus:border-[#e0b265]/60 outline-none text-white text-[14px] placeholder-white/30 p-3 resize-none transition-colors"
            />
            <p className="text-[11px] text-white/35 mt-1.5">
              {specialRequests.length}/{MAX_CHARS} characters
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 p-5 md:p-6 flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white/8 border border-white/15 rounded-full px-1 py-1 flex-shrink-0">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition"
            >
              <MinusIcon />
            </button>
            <span className="w-8 text-center text-[15px] font-semibold text-white">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              aria-label="Increase quantity"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition"
            >
              <PlusIcon />
            </button>
          </div>

          <button
            onClick={() => onConfirm(qty)}
            className="flex-1 flex items-center justify-center gap-2 bg-[#e0b265] text-[#1b312e] py-3 px-6 text-[13px] uppercase tracking-[0.08em] font-medium hover:bg-white transition-colors"
          >
            <PlusIcon />
            Add to Order{totalLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── CartDrawer ─────────────────────────────────────────── */
function CartDrawer({
  cart,
  onClose,
  onAdd,
  onRemove,
  onDelete,
  onEdit,
  onAddItems,
}: {
  cart: Record<string, number>;
  onClose: () => void;
  onAdd: (key: string) => void;
  onRemove: (key: string) => void;
  onDelete: (key: string) => void;
  onEdit: (key: string) => void;
  onAddItems: () => void;
}) {
  const [offersOpen, setOffersOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
  const subtotal = entries.reduce((sum, [key, qty]) => {
    const item = itemsByKey[key];
    if (!item) return sum;
    const price = parseFloat(item.price);
    return sum + (isNaN(price) ? 0 : price * qty);
  }, 0);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute top-0 right-0 h-full w-full max-w-[420px] bg-[#1b312e] border-l border-[#e0b265]/25 shadow-2xl flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2 text-white">
            <span className="text-[#e0b265]"><BagIcon /></span>
            <h3
              className="text-[20px] uppercase tracking-[0.04em]"
              style={{ fontFamily: "'Palmore-Light', serif" }}
            >
              My Cart
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <span className="text-white/30 mb-3"><BagIcon /></span>
              <p className="text-white/50 text-[14px]">Your cart is empty</p>
            </div>
          ) : (
            entries.map(([key, qty]) => {
              const item = itemsByKey[key];
              if (!item) return null;
              return (
                <CartLine
                  key={key}
                  item={item}
                  qty={qty}
                  onAdd={() => onAdd(key)}
                  onRemove={() => onRemove(key)}
                  onEdit={() => onEdit(key)}
                  onDelete={() => onDelete(key)}
                />
              );
            })
          )}
        </div>

        {entries.length > 0 && (
          <div className="flex-shrink-0">
            <div className="px-5 py-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[15px] text-white">Subtotal</span>
              <span className="text-[16px] font-semibold text-[#e0b265]">${subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setOffersOpen((o) => !o)}
              className="w-full flex items-center justify-between px-5 py-3 border-t border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <span className="text-[14px]">Offers</span>
              <motion.span animate={{ rotate: offersOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronRightIcon />
              </motion.span>
            </button>
            {offersOpen && (
              <p className="px-5 pb-3 text-[13px] text-white/40 italic">No offers available right now.</p>
            )}

            {/* Footer */}
            <div className="px-5 py-4 border-t border-white/10 flex items-center gap-3">
              <button
                onClick={onAddItems}
                className="flex-1 border border-white/25 text-white py-3 text-[13px] uppercase tracking-[0.08em] font-medium hover:border-[#e0b265]/60 hover:text-[#e0b265] transition-colors"
              >
                Add Items
              </button>
              <Link
                href="/checkout"
                className="flex-1 flex items-center justify-center bg-[#e0b265] text-[#1b312e] py-3 text-[13px] uppercase tracking-[0.08em] font-medium hover:bg-white transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── OrderOnline page ───────────────────────────────────── */
export default function OrderOnline() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [barHeight, setBarHeight] = useState(120);
  const barRef = useRef<HTMLDivElement>(null);
  const [modalItem, setModalItem] = useState<{ key: string; item: MenuItem } | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const tab = tabs[activeTab];

  const subAnchor = (tabIdx: number, subIdx: number) => `oo-sub-${tabIdx}-${subIdx}`;

  // Cart lives in localStorage (not a real backend) so it survives
  // navigation over to /checkout.
  useEffect(() => {
    setCart(loadCart());
  }, []);
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addItem = (key: string) => {
    setCart((c) => ({ ...c, [key]: (c[key] ?? 0) + 1 }));
  };
  const removeItem = (key: string) => {
    setCart((c) => {
      const next = { ...c };
      const n = (next[key] ?? 0) - 1;
      if (n <= 0) {
        delete next[key];
      } else {
        next[key] = n;
      }
      return next;
    });
  };
  const setItemQty = (key: string, qty: number) => {
    setCart((c) => ({ ...c, [key]: qty }));
  };
  const deleteItem = (key: string) => {
    setCart((c) => {
      const next = { ...c };
      delete next[key];
      return next;
    });
  };

  const totalItems = Object.values(cart).reduce((sum, n) => sum + n, 0);

  /* ── Global site header shrinks on scroll (80px → 60px); our own sticky
     bar sits fixed underneath it, so it must track the same offset or it
     renders hidden behind the header instead of below it. ── */
  const [headerHeight, setHeaderHeight] = useState(80);
  useEffect(() => {
    const handleScroll = () => setHeaderHeight(window.scrollY > 10 ? 60 : 80);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Measure our own bar height so we can offset anchor scrolling ── */
  useEffect(() => {
    const measure = () => setBarHeight(barRef.current?.offsetHeight ?? 120);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const totalOffset = headerHeight + barHeight;

  /* ── Reset scroll position + active subsection when switching top tabs ── */
  const handleTabClick = (i: number) => {
    setActiveTab(i);
    setActiveSub(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Highlight the sidebar entry for whichever subsection is in view ── */
  useEffect(() => {
    if (!tab) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = tab.subsections.findIndex((_, i) => subAnchor(activeTab, i) === entry.target.id);
            if (idx !== -1) setActiveSub(idx);
          }
        });
      },
      { rootMargin: `-${totalOffset + 20}px 0px -60% 0px`, threshold: 0 }
    );
    tab.subsections.forEach((_, i) => {
      const el = document.getElementById(subAnchor(activeTab, i));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tab, activeTab, totalOffset]);

  const handleSidebarClick = (i: number) => {
    const el = document.getElementById(subAnchor(activeTab, i));
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - totalOffset - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-[#1b312e]">
      {/* ─── HERO ─── */}
      <section className="relative w-full h-[400px] md:h-[45vh] overflow-hidden">
        <Image
          src="/assets/Siena_20.03.26-PS-GoldenOxtail.webp"
          alt="Order Online at Siena"
          fill
          className="object-cover object-center"
          preload
          sizes="100vw"
        />
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
            className="text-[#e0b265] text-[50px] md:text-[70px] lg:text-[88px] leading-none tracking-[0.06em] uppercase"
            style={{ fontFamily: "'Palmore-Light', serif" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            ORDER ONLINE
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

      {/* ─── MARQUEE ─── */}
      <section className="w-full bg-[#030302] py-5 overflow-hidden">
        <style>{`
          @keyframes mq-oo { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .mq-oo { display:flex; width:max-content; animation:mq-oo 24s linear infinite; }
        `}</style>
        <div className="mq-oo">
          {[0, 1, 2, 3].map((r) => (
            <div key={r} className="flex items-center">
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                MEDITERRANEAN FLAVORS
              </span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                FRESH DAILY
              </span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                PICKUP &amp; DELIVERY
              </span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              <span className="text-white text-[15px] font-semibold tracking-[0.2em] uppercase px-8 whitespace-nowrap">
                ORDER WITH TOAST
              </span>
              <img src="/assets/star.svg" alt="" className="w-5 h-5 flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── STICKY: CATEGORY TABS + CART ─── */}
      <div
        ref={barRef}
        className="sticky z-40 bg-[#1b312e] border-b border-white/10 shadow-sm transition-[top] duration-300"
        style={{ top: `${headerHeight}px` }}
      >
        <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-3 flex md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,auto)_minmax(0,1fr)] items-center gap-3">
          <div className="hidden md:block" />

          <div className="flex-1 md:flex-none md:justify-self-center overflow-x-auto scrollbar-hide max-w-full">
            <div className="flex items-center gap-2 md:gap-3 whitespace-nowrap">
              {tabs.map((t, i) => {
                const isActive = activeTab === i;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTabClick(i)}
                    className={`px-4 md:px-5 py-[7px] text-[11px] md:text-[12px] tracking-[0.14em] uppercase cursor-pointer transition-all duration-200 border font-medium ${
                      isActive
                        ? "bg-[#e0b265] text-[#1b312e] border-[#e0b265]"
                        : "bg-transparent text-white/55 border-white/20 hover:border-[#e0b265]/50 hover:text-[#e0b265]"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cart — styled to match the site's own button language */}
          <button
            onClick={() => setCartOpen(true)}
            className="group flex-shrink-0 justify-self-end flex items-center gap-2 border border-[#e0b265] text-[#e0b265] px-4 py-2 text-[11px] uppercase tracking-[0.12em] font-medium hover:bg-[#e0b265] hover:text-[#1b312e] transition-colors duration-200"
          >
            <BagIcon />
            Cart
            <span className="min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-[#1b312e] text-[#e0b265] group-hover:bg-white group-hover:text-[#1b312e] text-[11px] font-semibold transition-colors duration-200">
              {totalItems}
            </span>
          </button>
        </div>
      </div>

      {/* ─── MENU BROWSER ─── */}
      <section className="w-full pb-[90px]">
        <div className="max-w-[1180px] mx-auto px-4 md:px-6 pt-8">
          <div className="flex flex-col items-center text-center mb-10 md:mb-12">
            <img
              src="/assets/icono_123.svg"
              alt=""
              aria-hidden="true"
              className="w-[55px] md:w-[65px] opacity-70 mb-3"
            />
            <h2
              className="text-[#e0b265] text-[38px] md:text-[52px] leading-[0.95] tracking-[0.06em] uppercase"
              style={{ fontFamily: "'Palmore-Light', serif" }}
            >
              Build Your Order
            </h2>
            <p className="text-white/60 text-[14px] md:text-[15px] mt-3 max-w-[520px]">
              Browse our full menu, add your favorites, and place your order for pickup.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* SIDEBAR — jump links to each subsection of the active tab */}
            <div className="md:w-[210px] flex-shrink-0">
              <div
                className="flex flex-col gap-5 md:sticky"
                style={{ top: `${totalOffset + 20}px` }}
              >
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible scrollbar-hide pb-2 md:pb-0">
                  {tab?.subsections.map((s, i) => {
                    const isActive = activeSub === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSidebarClick(i)}
                        className={`px-4 py-2 text-[12px] md:text-[13px] tracking-[0.06em] uppercase whitespace-nowrap md:whitespace-normal text-left rounded-full border transition-all duration-200 flex-shrink-0 ${
                          isActive
                            ? "bg-[#e0b265] text-[#1b312e] border-[#e0b265] font-medium"
                            : "bg-transparent text-white/60 border-white/20 hover:border-[#e0b265]/50 hover:text-[#e0b265]"
                        }`}
                      >
                        {s.title}
                      </button>
                    );
                  })}
                </div>

                {/* Fulfillment info — pickup/delivery, ASAP, location */}
                <div className="border-t border-white/10 pt-5 flex flex-col gap-3">
                  <div className="inline-flex items-center border border-white/15 rounded-md overflow-hidden self-start">
                    <button
                      onClick={() => setFulfillment("pickup")}
                      className={`flex items-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-[0.08em] font-medium transition-colors duration-200 ${
                        fulfillment === "pickup"
                          ? "bg-[#e0b265] text-[#1b312e]"
                          : "bg-transparent text-white/60 hover:text-[#e0b265]"
                      }`}
                    >
                      <PickupIcon />
                      Pickup
                    </button>
                    <div className="w-px self-stretch bg-white/15" />
                    <button
                      disabled
                      title="Delivery is not available yet"
                      className="flex items-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-[0.08em] text-white/25 cursor-not-allowed"
                    >
                      <TruckIcon />
                      Delivery
                    </button>
                  </div>

                  <div className="flex items-start gap-2 text-[12px] text-white/70">
                    <span className="text-[#e0b265] flex-shrink-0 mt-0.5"><ClockIcon /></span>
                    <span>
                      Pickup <span className="text-white font-medium">ASAP</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-[12px] text-white/70">
                    <span className="text-[#e0b265] flex-shrink-0 mt-0.5"><PinIcon /></span>
                    <span>
                      <span className="text-white font-medium">{RESTAURANT_NAME}</span>
                      {RESTAURANT_ADDRESS && <span className="block text-white/45 mt-0.5">{RESTAURANT_ADDRESS}</span>}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FULL MENU — every subsection of the active tab, stacked */}
            <div className="flex-1 min-w-0 flex flex-col gap-14">
              {tab?.subsections.map((s, i) => (
                <div key={i} id={subAnchor(activeTab, i)} className="scroll-mt-[140px]">
                  <div className="mb-6">
                    <h3
                      className="text-[#e0b265] text-[22px] md:text-[26px] uppercase tracking-[0.04em]"
                      style={{ fontFamily: "'Palmore-Light', serif" }}
                    >
                      {s.title}
                    </h3>
                    {s.subtitle && (
                      <p className="text-white/50 text-[12px] uppercase tracking-widest mt-1">{s.subtitle}</p>
                    )}
                  </div>

                  {s.items.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
                      {s.items.map((item, j) => {
                        const key = keyFor(activeTab, i, j);
                        return (
                          <OrderItemCard
                            key={key}
                            item={item}
                            qty={cart[key] ?? 0}
                            onAdd={() => addItem(key)}
                            onRemove={() => removeItem(key)}
                            onOpen={() => setModalItem({ key, item })}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-white/40 italic py-6 text-sm">Coming soon…</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <section className="relative w-full h-[28px] overflow-hidden" style={{ backgroundColor: "#030302" }}>
        <img
          src="/assets/divisor_estrella3.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* ─── ITEM DETAIL MODAL ─── */}
      <AnimatePresence>
        {modalItem && (
          <ItemModal
            item={modalItem.item}
            initialQty={cart[modalItem.key] ?? 1}
            onClose={() => setModalItem(null)}
            onConfirm={(qty) => {
              setItemQty(modalItem.key, qty);
              setModalItem(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* ─── CART DRAWER ─── */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            cart={cart}
            onClose={() => setCartOpen(false)}
            onAdd={addItem}
            onRemove={removeItem}
            onDelete={deleteItem}
            onEdit={(key) => {
              const item = itemsByKey[key];
              if (item) {
                setCartOpen(false);
                setModalItem({ key, item });
              }
            }}
            onAddItems={() => setCartOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
