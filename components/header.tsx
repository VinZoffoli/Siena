"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ORDER_ONLINE_URL } from "@/lib/order-menu";

export default function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Bloquear scroll del body cuando el menú está abierto
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const mobileLinks = [
        { href: "/", label: "Home" },
        { href: "/menus", label: "Menu" },
        { href: ORDER_ONLINE_URL, label: "Order Online" },
        { href: "/events", label: "Events" },
        { href: "/live-music-fridays", label: "Live Music Fridays" },
        { href: "/reservations", label: "Reservations" },
        { href: "/gift-card", label: "Gift Card" },
        { href: "/about-us", label: "About Us" },
        { href: "/gallery", label: "Gallery" },
        { href: "/careers", label: "Careers" },
        { href: "/blogs", label: "Blogs" },
        { href: "/contact-us", label: "Contact Us" },
    ];

    return (
        <>
            <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${scrolled
                ? "h-[60px] md:h-[60px] bg-[#1B312E] shadow-sm"
                : "h-[72px] md:h-[80px] backdrop-blur-md border-white/10"
                }`}>
                <div className="max-w-[1180px] mx-auto h-full flex items-center justify-between px-4 md:px-0 relative">

                    <Link href="/" className="block">
                        <div className={`transition-all duration-300 ${scrolled
                            ? "w-[70px] h-[36px] md:w-[80px] md:h-[40px]"
                            : "w-[70px] h-[40px] md:w-[90px] md:h-[50px]"
                            }`}>
                            <Image width={270} height={151}
                                src="/assets/logo_beige.png"
                                alt="logo"
                                priority
                                sizes="90px"
                                className="w-full h-full object-contain cursor-pointer transition-all duration-300"
                            />
                        </div>
                    </Link>

                    {/* Nav Desktop */}
                    <nav className="hidden md:flex items-center gap-0 lg:gap-1 text-[15px] font-normal uppercase tracking-wide absolute left-1/2 -translate-x-1/2">
                        <Link href="/" className={`px-3 flex justify-center relative text-white ${scrolled && pathname === "/" ? "text-[#E0B265] after:w-full" : ""
                            } after:absolute after:left-0 after:-bottom-3 after:h-[2px] after:bg-current after:w-0 after:transition-all after:duration-300 hover:after:w-full`}>
                            Home
                        </Link>
                        <Link href="/menus" className={`px-3 flex justify-center relative text-white ${scrolled && pathname === "/menus" ? "text-[#E0B265] after:w-full" : ""
                            } after:absolute after:left-0 after:-bottom-3 after:h-[2px] after:bg-current after:w-0 after:transition-all after:duration-300 hover:after:w-full`}>
                            Menu
                        </Link>
                        <Link href="/events" className="px-3 whitespace-nowrap flex justify-center relative text-white after:absolute after:left-0 after:-bottom-3 after:h-[2px] after:bg-current after:w-0 after:transition-all after:duration-300 hover:after:w-full">
                            Events
                        </Link>
                        <Link href="/gift-card" className={`px-3 whitespace-nowrap flex justify-center relative text-white ${scrolled && pathname === "/gift-card" ? "text-[#E0B265] after:w-full" : ""
                            } after:absolute after:left-0 after:-bottom-3 after:h-[2px] after:bg-current after:w-0 after:transition-all after:duration-300 hover:after:w-full`}>
                            Gift Card
                        </Link>


                        <div className="relative group inline-block z-[50]">
                            <div className="px-3 flex items-center gap-1 justify-center relative cursor-pointer text-white after:absolute after:left-0 after:-bottom-3 after:h-[2px] after:bg-current after:w-0 after:transition-all after:duration-300 hover:after:w-full">
                                More
                                <img width={24} height={24} loading="lazy"
                                    src="/assets/Arrow_Down.svg"
                                    alt="arrow"
                                    className="w-[15px] h-[15px] transition-all duration-300 brightness-0 invert"
                                />
                            </div>

                            <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[280px] bg-[#1B312E] shadow-xl p-4 flex flex-col gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <Link href="/about-us" className="flex items-center justify-center gap-4 p-3 hover:bg-[#E0B265] hover:text-[#1B312E] transition text-white">
                                    <span className="text-[15px] font-normal uppercase tracking-wide text-center">About Us</span>
                                </Link>
                                <Link href="/gallery" className="flex items-center justify-center gap-4 p-3 hover:bg-[#E0B265] hover:text-[#1B312E] transition text-white">
                                    <span className="text-[15px] font-normal uppercase tracking-wide text-center">Gallery</span>
                                </Link>
                                <Link href="/live-music-fridays" className="flex items-center justify-center gap-4 p-3 hover:bg-[#E0B265] hover:text-[#1B312E] transition text-white">
                                    <span className="text-[15px] font-normal uppercase tracking-wide text-center">Live Music Fridays</span>
                                </Link>
                                <Link href="/careers" className="flex items-center justify-center gap-4 p-3 hover:bg-[#E0B265] hover:text-[#1B312E] transition text-white">
                                    <span className="text-[15px] font-normal uppercase tracking-wide text-center">Careers</span>
                                </Link>
                                <Link href="/blogs" className="flex items-center justify-center gap-4 p-3 hover:bg-[#E0B265] hover:text-[#1B312E] transition text-white">
                                    <span className="text-[15px] font-normal uppercase tracking-wide text-center">Blogs</span>
                                </Link>
                                <Link href="/contact-us" className="flex items-center justify-center gap-4 p-3 hover:bg-[#E0B265] hover:text-[#1B312E] transition text-white">
                                    <span className="text-[15px] font-normal uppercase tracking-wide text-center">Contact Us</span>
                                </Link>
                            </div>
                        </div>
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-2 md:gap-2 lg:gap-4">
                        <Link href={ORDER_ONLINE_URL} target="_blank" rel="noopener noreferrer" className="hidden lg:block">
                            <button className="cursor-pointer px-3 py-[11px] font-normal text-[12px] leading-[18px] tracking-wide border border-[#E0B265] bg-[#1B312E]/50 backdrop-blur-sm text-[#E0B265] transition hover:bg-[#E0B265] hover:text-[#1B312E] whitespace-nowrap">
                                ORDER ONLINE
                            </button>
                        </Link>

                        <Link href="/reservations">
                            <button className="cursor-pointer px-4 lg:px-6 py-[11px] font-normal text-[12px] lg:text-[13px] leading-[18px] tracking-wide border transition bg-[#E0B265] text-[#1B312E] border-transparent hover:bg-white hover:text-[#1B312E] hover:border-white">
                                RESERVATIONS
                            </button>
                        </Link>

                        {/* Instagram - solo desktop */}
                        <a
                            href="https://www.instagram.com/sienaatl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hidden md:flex group p-2 cursor-pointer items-center justify-center transition-colors duration-300 border bg-transparent ${
                                scrolled
                                    ? "border-[#E0B265] hover:bg-[#E0B265]"
                                    : "border-[#f4eedd] hover:bg-[#f4eedd]"
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="w-[24px] h-[24px]" fill="none">
                                <path
                                    d="M8.67699 0H21.2437C26.031 0 29.9206 3.88968 29.9206 8.67699V21.2437C29.9206 23.5449 29.0065 25.752 27.3792 27.3792C25.752 29.0065 23.5449 29.9206 21.2437 29.9206H8.67699C3.88968 29.9206 0 26.031 0 21.2437V8.67699C0 6.37571 0.91418 4.16868 2.54143 2.54143C4.16868 0.91418 6.37571 0 8.67699 0ZM8.37778 2.99206C6.9494 2.99206 5.57952 3.55949 4.5695 4.5695C3.55949 5.57952 2.99206 6.9494 2.99206 8.37778V21.5429C2.99206 24.52 5.40067 26.9286 8.37778 26.9286H21.5429C22.9712 26.9286 24.3411 26.3612 25.3511 25.3511C26.3612 24.3411 26.9286 22.9712 26.9286 21.5429V8.37778C26.9286 5.40067 24.52 2.99206 21.5429 2.99206H8.37778ZM22.8145 5.23611C23.3105 5.23611 23.7861 5.43313 24.1368 5.78383C24.4875 6.13453 24.6845 6.61019 24.6845 7.10615C24.6845 7.60212 24.4875 8.07777 24.1368 8.42847C23.7861 8.77917 23.3105 8.97619 22.8145 8.97619C22.3185 8.97619 21.8429 8.77917 21.4922 8.42847C21.1415 8.07777 20.9444 7.60212 20.9444 7.10615C20.9444 6.61019 21.1415 6.13453 21.4922 5.78383C21.8429 5.43313 22.3185 5.23611 22.8145 5.23611ZM14.9603 7.48016C16.9442 7.48016 18.8468 8.26825 20.2496 9.67105C21.6524 11.0738 22.4405 12.9765 22.4405 14.9603C22.4405 16.9442 21.6524 18.8468 20.2496 20.2496C18.8468 21.6524 16.9442 22.4405 14.9603 22.4405C12.9765 22.4405 11.0738 21.6524 9.67105 20.2496C8.26825 18.8468 7.48016 16.9442 7.48016 14.9603C7.48016 12.9765 8.26825 11.0738 9.67105 9.67105C11.0738 8.26825 12.9765 7.48016 14.9603 7.48016ZM14.9603 10.4722C13.77 10.4722 12.6284 10.9451 11.7868 11.7868C10.9451 12.6284 10.4722 13.77 10.4722 14.9603C10.4722 16.1506 10.9451 17.2922 11.7868 18.1339C12.6284 18.9756 13.77 19.4484 14.9603 19.4484C16.1506 19.4484 17.2922 18.9756 18.1339 18.1339C18.9756 17.2922 19.4484 16.1506 19.4484 14.9603C19.4484 13.77 18.9756 12.6284 18.1339 11.7868C17.2922 10.9451 16.1506 10.4722 14.9603 10.4722Z"
                                    className={`transition-colors duration-300 ${
                                        scrolled
                                            ? "fill-[#E0B265] group-hover:fill-[#1B312E]"
                                            : "fill-[#f4eedd] group-hover:fill-[#1B312E]"
                                    }`}
                                />
                            </svg>
                        </a>

                        {/* Botón hamburguesa - solo mobile */}
                        <button
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open menu"
                            className={`md:hidden flex items-center justify-center w-[42px] self-stretch border bg-transparent cursor-pointer transition-colors duration-300 ${
                                scrolled ? "border-[#E0B265]" : "border-[#f4eedd]"
                            }`}
                        >
                            <div className="relative w-[20px] h-[16px] flex flex-col justify-between">
                                <span className={`block h-[2px] w-full transition-colors duration-300 ${scrolled ? "bg-[#E0B265]" : "bg-[#f4eedd]"}`}></span>
                                <span className={`block h-[2px] w-full transition-colors duration-300 ${scrolled ? "bg-[#E0B265]" : "bg-[#f4eedd]"}`}></span>
                                <span className={`block h-[2px] w-full transition-colors duration-300 ${scrolled ? "bg-[#E0B265]" : "bg-[#f4eedd]"}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Overlay del menú móvil */}
            <div
                onClick={() => setMenuOpen(false)}
                className={`md:hidden fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            {/* Menú lateral móvil - completo desde arriba */}
            <aside
                className={`md:hidden fixed top-0 right-0 bottom-0 w-full bg-[#1B312E] z-[70] shadow-2xl transition-transform duration-300 overflow-y-auto ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header interno del menú */}
                <div className="flex items-center justify-between px-4 h-[72px] border-b border-white/10">
                    <Link href="/" onClick={() => setMenuOpen(false)} className="block">
                        <div className="w-[70px] h-[40px]">
                            <img width={746} height={414} loading="lazy"
                                src="/assets/logo_siena.svg"
                                alt="logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </Link>

                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                        className="flex items-center justify-center w-[42px] h-[42px] bg-[#E0B265] cursor-pointer transition-colors duration-300 hover:bg-[#F5EFDD] hover:border hover:border-[#1B312E] group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-[18px] h-[18px]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" className="stroke-[#1B312E]" />
                            <line x1="6" y1="6" x2="18" y2="18" className="stroke-[#1B312E]" />
                        </svg>
                    </button>
                </div>

                {/* Lista de links */}
                <nav className="flex flex-col p-4 gap-1">
                    {mobileLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const isExternal = link.href.startsWith("http");
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className={`flex items-center justify-center px-4 py-4 text-[15px] font-semibold uppercase tracking-wide transition-colors duration-200 ${isActive
                                    ? "bg-[#E0B265]/15 text-[#E0B265]"
                                    : "text-white hover:bg-[#E0B265]/15 hover:text-[#E0B265]"
                                    }`}
                            >
                                <span className="text-center">{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}