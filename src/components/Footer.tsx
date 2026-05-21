import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL, DOCTOR_NAME, DOCTOR_TITLE } from "@/lib/constants";

export default function Footer() {
    return (
        <footer id="contact" style={{ background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>

            {/* ══════════ MOBILE FOOTER ══════════ */}
            <div className="md:hidden">
                <div className="px-5 pt-10 pb-8">
                    {/* Brand & Quick Actions */}
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-1" style={{ color: "#080F28" }}>{DOCTOR_NAME}</h3>
                        <p className="text-sm font-semibold mb-8" style={{ color: "#1447E6" }}>
                            {DOCTOR_TITLE}
                        </p>
                        
                        {/* Quick action button */}
                        <div className="flex flex-row justify-center mx-auto mt-2">
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl transition-all active:scale-95"
                                style={{ background: "#16A34A", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(22,163,74,0.2)" }}>
                                <MessageCircle className="w-5 h-5" />
                                <span className="font-bold text-sm">تواصل واتساب</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center py-4 flex flex-col items-center gap-2" style={{ borderTop: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                    <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: "#1447E6" }}>
                        <a href="/privacy" className="hover:underline">سياسة الخصوصية</a>
                    </div>
                    <p className="text-[11px] font-medium" style={{ color: "#5A6A88" }}>
                        © {new Date().getFullYear()} {DOCTOR_NAME} · جميع الحقوق محفوظة
                    </p>
                </div>
            </div>

            {/* ══════════ DESKTOP FOOTER ══════════ */}
            <div className="hidden md:block pt-12 pb-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-row justify-between items-start mb-8 pb-8" style={{ borderBottom: "1px solid #E2E8F0" }}>
                        
                        {/* Brand */}
                        <div>
                            <h3 className="text-2xl font-bold mb-2" style={{ color: "#080F28" }}>{DOCTOR_NAME}</h3>
                            <p className="text-base font-medium" style={{ color: "#1447E6" }}>{DOCTOR_TITLE}</p>
                        </div>

                        {/* Quick Nav Links */}
                        <nav className="flex items-center gap-6">
                            {[
                                { label: "عن الدكتور", href: "#about" },
                                { label: "الخدمات", href: "#services" },
                                { label: "الحجز", href: "#booking" },
                            ].map((link) => (
                                <a key={link.href} href={link.href}
                                    className="text-sm font-semibold transition-colors hover:text-brand-600"
                                    style={{ color: "#3D4D6B" }}>
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        {/* Contact */}
                        <div className="flex items-center">
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
                                style={{ background: "#16A34A", color: "#FFFFFF", boxShadow: "0 4px 12px rgba(22,163,74,0.2)" }}>
                                <MessageCircle className="w-5 h-5" />
                                <span className="font-bold">تواصل واتساب</span>
                            </a>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-row items-center justify-between text-sm">
                        <p className="font-medium" style={{ color: "#5A6A88" }}>
                            © {new Date().getFullYear()} {DOCTOR_NAME} · جميع الحقوق محفوظة
                        </p>
                        <a href="/privacy" className="font-semibold transition-colors hover:text-[#1447E6]" style={{ color: "#5A6A88" }}>
                            سياسة الخصوصية
                        </a>
                    </div>
                </div>
            </div>

        </footer>
    );
}
