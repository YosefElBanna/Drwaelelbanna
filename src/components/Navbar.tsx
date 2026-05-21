"use client";

import { useState, useEffect } from "react";
import { Menu, X, CalendarDays } from "lucide-react";
import { DOCTOR_NAME, DOCTOR_TITLE } from "@/lib/constants";

const NAV_LINKS = [
    { label: "عن الدكتور", href: "#about" },
    { label: "الخدمات", href: "#services" },
    { label: "الحجز", href: "#booking" },
    { label: "تواصل معنا", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        const el = document.querySelector(href);
        if (!el) return;

        const navbarHeight = 80;
        const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let startTime: number | null = null;

        function easeInOutCubic(t: number): number {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(currentTime: number) {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + distance * eased);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                background: isScrolled ? "rgba(255,255,255,0.92)" : "transparent",
                backdropFilter: isScrolled ? "blur(16px)" : "none",
                WebkitBackdropFilter: isScrolled ? "blur(16px)" : "none",
                borderBottom: isScrolled ? "1px solid rgba(8,15,40,0.06)" : "1px solid transparent",
                boxShadow: isScrolled ? "0 4px 24px -4px rgba(8,15,40,0.08)" : "none",
            }}
        >
            <div className="container mx-auto px-5 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-[72px]">

                    {/* Brand */}
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex items-center gap-2 group"
                    >
                        <div
                            className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-white font-black text-sm md:text-base transition-transform duration-300 group-hover:scale-105"
                            style={{ background: "linear-gradient(135deg, #1447E6, #2556F5)" }}
                        >
                            و.ب
                        </div>
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-bold leading-tight" style={{ color: "#080F28" }}>{DOCTOR_NAME}</p>
                            <p className="text-[10px] font-medium" style={{ color: "#6B7A99" }}>{DOCTOR_TITLE}</p>
                        </div>
                    </button>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.href}
                                type="button"
                                onClick={() => handleNavClick(link.href)}
                                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-brand-50"
                                style={{ color: "#3D4D6B" }}
                            >
                                {link.label}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleNavClick("#booking")}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 mr-2"
                            style={{
                                background: "linear-gradient(135deg, #1447E6 0%, #2556F5 100%)",
                                boxShadow: "0 4px 16px -4px rgba(20,71,230,0.35)",
                            }}
                        >
                            <CalendarDays className="w-4 h-4" />
                            احجز الآن
                        </button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90"
                        style={{
                            background: isMobileMenuOpen ? "rgba(20,71,230,0.08)" : "transparent",
                            color: "#080F28",
                        }}
                        aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className="md:hidden overflow-hidden transition-all duration-300"
                style={{
                    maxHeight: isMobileMenuOpen ? "320px" : "0px",
                    opacity: isMobileMenuOpen ? 1 : 0,
                    background: "rgba(255,255,255,0.97)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderTop: isMobileMenuOpen ? "1px solid rgba(8,15,40,0.06)" : "none",
                }}
            >
                <div className="px-5 py-4 space-y-1">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.href}
                            type="button"
                            onClick={() => handleNavClick(link.href)}
                            className="w-full text-right px-4 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
                            style={{ color: "#3D4D6B" }}
                        >
                            {link.label}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleNavClick("#booking")}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white mt-2 transition-all active:scale-[0.97]"
                        style={{
                            background: "linear-gradient(135deg, #1447E6 0%, #2556F5 100%)",
                            boxShadow: "0 4px 16px -4px rgba(20,71,230,0.35)",
                        }}
                    >
                        <CalendarDays className="w-4 h-4" />
                        احجز الآن
                    </button>
                </div>
            </div>
        </header>
    );
}
