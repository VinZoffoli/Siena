"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NewsletterForm from "../components/newsletterform";
import { getRestaurantInfo, RESTAURANT_FALLBACK, type RestaurantInfo } from "@/lib/restaurant";
import { fetchGroupedHours, FALLBACK_HOURS, type GroupedHourEntry } from "@/lib/hours";
import { ORDER_ONLINE_URL } from "@/lib/order-menu";

// Re-fetch the live hours on this interval so the footer picks up changes
// made on the reservations backend without needing a page reload.
const HOURS_POLL_INTERVAL_MS = 5 * 60 * 1000;

export default function Footer() {
    const pathname = usePathname();
    const [info, setInfo] = useState<RestaurantInfo>(RESTAURANT_FALLBACK);
    useEffect(() => { getRestaurantInfo().then(setInfo); }, []);

    const [hours, setHours] = useState<GroupedHourEntry[] | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadHours = () => {
            fetchGroupedHours()
                .then((grouped) => {
                    if (cancelled) return;
                    setHours(grouped);
                })
                .catch(() => {
                    // API unreachable — show the standard hours as a
                    // last-resort placeholder rather than leaving this blank.
                    if (cancelled) return;
                    setHours(FALLBACK_HOURS);
                });
        };

        loadHours();
        const interval = setInterval(loadHours, HOURS_POLL_INTERVAL_MS);
        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, []);

    return (

        <footer data-bg="/assets/footer-bg-siena.webp" className="relative font-sans w-full bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black/80 pointer-events-none" />

            <div className="relative z-10">
                <NewsletterForm />
            </div>

            <div className="relative z-10 w-full h-[58px]">
                <img width={1512} height={58} loading="lazy"
                    src="/assets/divisor_negro.svg"
                    alt="divider"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 w-full max-w-[1180px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-[40px] lg:gap-[60px] py-[40px] lg:py-[80px] px-6 lg:px-0">

                {/* Izquierda - Logo + info */}
                <div className="flex flex-col gap-4 max-w-[580px] items-center lg:items-start text-center lg:text-left">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#e0b265]/20 blur-3xl rounded-full"></div>
                        <img width={730} height={422} loading="lazy" src="/assets/logofooter.webp" alt="Siena" className="relative w-[200px] lg:w-[261px] mb-[10px] lg:mb-[20px]" />
                    </div>

                    <p className="text-white text-[22px] lg:text-[28px] leading-[110%] lg:leading-[100%] font-semibold mt-2">
                        Your taste of Siena, anytime.
                    </p>
                    <p className="text-white/80 text-[15px] lg:text-[16px] leading-[22px] lg:leading-[24px] max-w-[540px]">
                        From handcrafted dishes to unforgettable moments, enjoy Siena favorites fresh, easy, and ready when you are.
                    </p>

                    {/* Dirección con icono */}
                    <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#979797] leading-[20px] text-[15px] lg:text-[16px] uppercase hover:text-[#e0b265] transition group"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" className="fill-current" />
                        </svg>
                        <span className="border-b border-transparent group-hover:border-[#e0b265] transition-colors">
                            {info.address}
                        </span>
                    </a>

                    {/* Botones */}
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                        <a
                            href="/reservations"
                            className="relative bg-[#e0b265] text-[#1b312e] px-[24px] py-[12px] h-[46px] font-normal text-[18px] lg:text-[15px] leading-[20px] flex items-center gap-2 w-fit overflow-hidden group uppercase"
                        >
                            <span className="absolute inset-0 bg-[#1b312e] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative z-10 group-hover:text-[#e0b265] transition-colors duration-300">Reservations</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                                <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" className="fill-[#1b312e] group-hover:fill-[#e0b265] transition-colors duration-300" />
                            </svg>
                        </a>

                        <a
                            href={ORDER_ONLINE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative border border-[#e0b265] text-[#e0b265] px-[24px] py-[12px] h-[46px] font-normal text-[18px] lg:text-[15px] leading-[20px] flex items-center gap-2 w-fit overflow-hidden group uppercase hover:bg-[#e0b265] hover:text-[#1b312e] transition-colors duration-300"
                        >
                            <span>Order Online</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                                <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" className="fill-[#e0b265] group-hover:fill-[#1b312e] transition-colors duration-300" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Wrapper de columnas */}
                <div className="flex flex-row lg:contents gap-12 sm:gap-20 w-full justify-center lg:w-auto lg:justify-start">

                    {/* Columna Restaurant */}
                    <div className="flex flex-col gap-3 items-start lg:relative lg:pl-8">
                        <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#e0b265]/30 to-transparent"></div>
                        <div className="flex flex-col mb-2">
                            <p
                                className="text-[#e0b265] text-[28px] leading-[100%] tracking-wide uppercase"
                                style={{ fontFamily: "'Palmore-Light', serif" }}
                            >
                                Restaurant
                            </p>
                            <div className="w-8 h-[2px] bg-[#e0b265] mt-2"></div>
                        </div>
                        {[
                            { label: "Home", href: "/" },
                            { label: "Menu", href: "/menus" },
                            { label: "Events", href: "/events" },
                            { label: "Gift Card", href: "/gift-card" },
                            { label: "Live Music Fridays", href: "/live-music-fridays" },
                        ].map(({ label, href }) => {
                            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                            return (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`text-[15px] leading-[21px] uppercase whitespace-nowrap hover:text-[#e0b265] hover:translate-x-1 transition-all duration-200 inline-block ${isActive ? "text-[#e0b265] border-b border-[#e0b265]" : "text-white"}`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Columna More */}
                    <div className="flex flex-col gap-3 items-start lg:relative lg:pl-8">
                        <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#e0b265]/30 to-transparent"></div>
                        <div className="flex flex-col mb-2">
                            <p
                                className="text-[#e0b265] text-[28px] leading-[100%] tracking-wide uppercase"
                                style={{ fontFamily: "'Palmore-Light', serif" }}
                            >
                                More
                            </p>
                            <div className="w-8 h-[2px] bg-[#e0b265] mt-2"></div>
                        </div>
                        {[
                            { label: "About Us", href: "/about-us" },
                            { label: "Gallery", href: "/gallery" },
                            { label: "Careers", href: "/careers" },
                            { label: "Contact Us", href: "/contact-us" },
                        ].map(({ label, href }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`text-[15px] leading-[21px] uppercase whitespace-nowrap hover:text-[#e0b265] hover:translate-x-1 transition-all duration-200 inline-block ${isActive ? "text-[#e0b265] border-b border-[#e0b265]" : "text-white"}`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Columna Social + Phone + Hours */}
                <div className="flex flex-col gap-6 w-full lg:w-auto bg-black/25 lg:bg-transparent p-6 lg:p-0 items-center lg:items-start text-center lg:text-left lg:relative lg:pl-8">
                    <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#e0b265]/30 to-transparent"></div>

                    {/* Social Media */}
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="flex flex-col mb-3">
                            <p
                                className="text-[#e0b265] text-[28px] leading-[100%] tracking-wide uppercase"
                                style={{ fontFamily: "'Palmore-Light', serif" }}
                            >
                                Social Media
                            </p>
                            <div className="w-8 h-[2px] bg-[#e0b265] mt-2 mx-auto lg:mx-0"></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.instagram.com/sienaatl/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="group w-10 h-10 flex items-center justify-center border border-white/30 hover:border-[#e0b265] hover:bg-[#e0b265] transition-all duration-300"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
                                        className="fill-white group-hover:fill-[#1b312e] transition-colors duration-300"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/sienaatl/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="group w-10 h-10 flex items-center justify-center border border-white/30 hover:border-[#e0b265] hover:bg-[#e0b265] transition-all duration-300"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z"
                                        className="fill-white group-hover:fill-[#1b312e] transition-colors duration-300"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://www.tiktok.com/@sienaatl"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="group w-10 h-10 flex items-center justify-center border border-white/30 hover:border-[#e0b265] hover:bg-[#e0b265] transition-all duration-300"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M16.5 2C16.8 4.1 18.4 5.7 20.5 6V9C18.9 8.95 17.4 8.45 16 7.6V14.5C16 18.1 13.1 21 9.5 21C5.9 21 3 18.1 3 14.5C3 10.9 5.9 8 9.5 8C10 8 10.5 8.05 11 8.15V11.2C10.5 11.05 10 11 9.5 11C7.6 11 6 12.6 6 14.5C6 16.4 7.6 18 9.5 18C11.4 18 13 16.4 13 14.5V2H16.5Z"
                                        className="fill-white group-hover:fill-[#1b312e] transition-colors duration-300"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="flex flex-col mb-2">
                            <p
                                className="text-[#e0b265] text-[28px] leading-[100%] tracking-wide uppercase"
                                style={{ fontFamily: "'Palmore-Light', serif" }}
                            >
                                Phone
                            </p>
                            <div className="w-8 h-[2px] bg-[#e0b265] mt-2 mx-auto lg:mx-0"></div>
                        </div>
                        <a href={`tel:${info.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-white text-[15px] uppercase hover:text-[#e0b265] transition group">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                                <path d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.3 14.9 16.2 14.9 16.1 14.9C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5Z" className="fill-current" />
                            </svg>
                            {info.phone}
                        </a>
                    </div>

                    {/* Hours */}
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="flex flex-col mb-2">
                            <p
                                className="text-[#e0b265] text-[28px] leading-[100%] tracking-wide uppercase"
                                style={{ fontFamily: "'Palmore-Light', serif" }}
                            >
                                Hours
                            </p>
                            <div className="w-8 h-[2px] bg-[#e0b265] mt-2 mx-auto lg:mx-0"></div>
                        </div>
                        <div className="text-white text-[15px] leading-[22px] space-y-0.5 uppercase">
                            {hours === null && (
                                <p className="whitespace-nowrap text-white/60">Loading hours…</p>
                            )}
                            {hours?.map(({ label, value }) => (
                                <p key={label} className="whitespace-nowrap">
                                    <span className="text-white/60">{label}</span> {value}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Legal links */}
            <div className="relative z-10 w-full max-w-[1180px] mx-auto px-6 lg:px-0">
                <div className="h-px bg-gradient-to-r from-transparent via-[#e0b265]/40 to-transparent"></div>
            </div>
            <div className="relative z-10 w-full py-6 px-6">
                <div className="w-full max-w-[1180px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[13px] text-white/70 uppercase tracking-wide">
                    <Link href="/privacy-policy" className="hover:text-[#e0b265] transition">
                        Privacy Notice
                    </Link>
                    <span className="hidden sm:inline text-white/30">|</span>
                    <Link href="/terms-of-service" className="hover:text-[#e0b265] transition">
                        Terms of Service
                    </Link>
                </div>
            </div>

        </footer>

    );
}
