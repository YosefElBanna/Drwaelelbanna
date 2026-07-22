"use client";

import Image from "next/image";
import { useCallback } from "react";
import { CalendarDays, MessageCircle, Star, ShieldCheck, Activity } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

function smoothScrollTo(targetId: string) {
    const el = document.getElementById(targetId);
    if (!el) return;

        const navbarHeight = 64;
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
}

export default function Hero() {
    const handleBookingClick = useCallback(() => {
        smoothScrollTo("booking");
    }, []);

    return (
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F4F7FF 0%, #EEF3FF 100%)" }}>
            {/* Decorative glows */}
            <div className="absolute top-0 right-0 lg:left-0 w-64 h-64 lg:w-[600px] lg:h-[600px] rounded-full pointer-events-none opacity-40" 
                 style={{ background: "radial-gradient(circle, rgba(20,71,230,0.12) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 lg:right-0 w-56 h-56 lg:w-96 lg:h-96 rounded-full pointer-events-none opacity-40" 
                 style={{ background: "radial-gradient(circle, rgba(201,151,31,0.12) 0%, transparent 70%)" }} />

            <div className="container mx-auto px-5 lg:px-6 relative z-10 pt-20 pb-12 lg:pt-24 lg:pb-24">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
                    
                    {/* Content */}
                    <div className="flex-1 text-center lg:text-right w-full">
                        {/* Availability badge */}
                        <div className="flex justify-center lg:justify-start mb-6 lg:mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                                style={{ background: "rgba(20,71,230,0.08)", borderColor: "rgba(20,71,230,0.15)" }}>
                                <span className="w-2 h-2 rounded-full animate-pulse block flex-shrink-0" style={{ background: "#1447E6" }} />
                                <span className="text-xs font-semibold tracking-wide" style={{ color: "#1447E6" }}>متاح للحجز الآن</span>
                            </div>
                        </div>

                        <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 lg:mb-6 leading-tight" style={{ color: "#080F28" }}>
                            السكر والغدة الدرقية تحت السيطرة...
                            <br className="hidden lg:block" />
                            <span className="text-[#1447E6] lg:block lg:mt-2">من بيتك، مع استشاري بخبرة +20 سنة</span>
                        </h1>
                        
                        <p className="text-sm lg:text-lg font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-3 text-[#3D4D6B]">
                            آلاف المرضى اعتمدوا على خبرته في السكر والغدة الدرقية. مش وصف دواء سريع، لكن فهم حقيقي لسبب حالتك.
                        </p>
                        <p className="text-sm lg:text-lg font-bold leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6 text-[#080F28]">
                            وانت في بيتك - تعمل تحاليلك في بلدك، ويراجعها د. وائل معاك أونلاين.
                        </p>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-3 mb-8">
                            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-bold bg-white text-[#3D4D6B] border border-slate-100 shadow-sm">
                                <Star className="w-4 h-4 text-[#C9971F]" /> +10,000 حالة من مصر والخليج
                            </span>
                            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-bold bg-white text-[#3D4D6B] border border-slate-100 shadow-sm">
                                <Activity className="w-4 h-4 text-[#1447E6]" /> +20 سنة خبرة
                            </span>
                            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-bold bg-white text-[#3D4D6B] border border-slate-100 shadow-sm">
                                <ShieldCheck className="w-4 h-4 text-[#16A34A]" /> متابعة مجانية أسبوعين بعد الكشف
                            </span>
                        </div>

                        {/* CTAs */}
                        <div className="space-y-3 lg:space-y-0 lg:flex lg:flex-row lg:gap-4 lg:justify-start">
                            <button
                                type="button"
                                onClick={handleBookingClick}
                                className="flex items-center justify-center gap-2.5 w-full lg:w-auto lg:px-8 py-4 rounded-2xl font-bold text-[15px] lg:text-lg text-white transition-all hover:opacity-90 active:scale-[0.97] lg:hover:-translate-y-0.5"
                                style={{ background: "linear-gradient(135deg, #1447E6 0%, #2556F5 100%)", boxShadow: "0 8px 24px -6px rgba(20,71,230,0.4)" }}>
                                <CalendarDays className="w-5 h-5 flex-shrink-0" />
                                احجز موعدك الآن
                            </button>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2.5 w-full lg:w-auto lg:px-8 py-4 rounded-2xl font-bold text-[15px] lg:text-lg transition-all active:scale-[0.97] lg:hover:-translate-y-0.5"
                                style={{ color: "#16A34A", background: "#F0FDF4", border: "1px solid #DCFCE7", boxShadow: "0 2px 8px rgba(22,163,74,0.05)" }}>
                                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                                تواصل عبر واتساب
                            </a>
                        </div>
                        {/* Risk Reducer */}
                        <p className="text-center lg:text-right text-xs lg:text-sm font-semibold mt-4 text-[#5A6A88]">
                            متابعة مجانية أسبوعين بعد الكشف - دفع آمن - تأكيد فوري
                        </p>
                    </div>

                    {/* Image */}
                    <div className="flex-shrink-0 relative w-64 md:w-80 lg:w-[420px] lg:mt-0">
                        {/* Gold ring / background for image */}
                        <div className="absolute -inset-[3px] lg:-inset-4 rounded-[2.2rem] lg:rounded-[3rem] pointer-events-none"
                            style={{ background: "linear-gradient(135deg, rgba(20,71,230,0.2), rgba(201,151,31,0.2))", padding: "3px" }} />
                        <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border-[4px] lg:border-8 border-white group"
                            style={{ boxShadow: "0 20px 40px -10px rgba(8,15,40,0.15)" }}>
                            <Image src="/doctor.jpg" alt="د. وائل البنا" fill quality={100} sizes="(max-width: 1024px) 280px, 420px"
                                className="object-cover object-top scale-[1.12] origin-top transition-transform duration-1000 group-hover:scale-[1.18]" priority />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
