import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL, DOCTOR_NAME, DOCTOR_TITLE } from "@/lib/constants";

export default function Footer() {
    return (
        <footer id="contact" style={{ background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
            <div className="container mx-auto px-5 lg:px-6 pt-10 pb-6 lg:pt-12">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 pb-8" style={{ borderBottom: "1px solid #E2E8F0" }}>
                    
                    {/* Brand */}
                    <div className="text-center md:text-right mb-6 md:mb-0">
                        <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2" style={{ color: "#080F28" }}>{DOCTOR_NAME}</h3>
                        <p className="text-sm md:text-base font-semibold md:font-medium" style={{ color: "#1447E6" }}>{DOCTOR_TITLE}</p>
                    </div>

                    {/* Quick Nav Links */}
                    <nav className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6 mb-6 md:mb-0">
                        {[
                            { label: "عن الدكتور", href: "#about" },
                            { label: "الخدمات", href: "#services" },
                            { label: "الحجز", href: "#booking" },
                        ].map((link) => (
                            <a key={link.href} href={link.href}
                                className="text-sm font-semibold transition-colors hover:text-[#1447E6]"
                                style={{ color: "#3D4D6B" }}>
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Contact */}
                    <div className="w-full md:w-auto flex justify-center md:justify-start">
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 rounded-xl transition-all active:scale-95 hover:-translate-y-0.5"
                            style={{ background: "#16A34A", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(22,163,74,0.2)" }}>
                            <MessageCircle className="w-5 h-5" />
                            <span className="font-bold text-sm md:text-base">تواصل واتساب</span>
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right text-xs md:text-sm">
                    <p className="font-medium order-2 md:order-1" style={{ color: "#5A6A88" }}>
                        © {new Date().getFullYear()} {DOCTOR_NAME} · جميع الحقوق محفوظة
                    </p>
                    <a href="/privacy" className="font-semibold transition-colors hover:text-[#1447E6] order-1 md:order-2" style={{ color: "#1447E6" }}>
                        سياسة الخصوصية
                    </a>
                </div>
            </div>
        </footer>
    );
}
