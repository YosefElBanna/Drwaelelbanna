"use client";

import Image from "next/image";
import { useCallback } from "react";
import { CalendarDays, HeartHandshake, ShieldCheck, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

function smoothScrollTo(targetId: string) {
    const el = document.getElementById(targetId);
    if (!el) return;

    const navbarHeight = 80; // offset for fixed navbar
    const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // 1 second
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
        <section className="relative overflow-hidden">

            {/* ══════════ MOBILE HERO ══════════ */}
            <div className="lg:hidden relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F4F7FF 0%, #EEF3FF 100%)" }}>

                {/* Decorative glows */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-40" style={{ background: "radial-gradient(circle, rgba(20,71,230,0.12) 0%, transparent 70%)" }} />
                <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none opacity-40" style={{ background: "radial-gradient(circle, rgba(201,151,31,0.12) 0%, transparent 70%)" }} />

                <div className="relative z-10 px-5 pt-20 pb-10">

                    {/* Availability badge */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                            style={{ background: "rgba(20,71,230,0.08)", borderColor: "rgba(20,71,230,0.15)" }}>
                            <span className="w-2 h-2 rounded-full animate-pulse block flex-shrink-0" style={{ background: "#1447E6" }} />
                            <span className="text-xs font-semibold tracking-wide" style={{ color: "#1447E6" }}>متاح للحجز الآن</span>
                        </div>
                    </div>

                    {/* Doctor photo */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            {/* Gold ring glow */}
                            <div className="absolute -inset-[3px] rounded-full pointer-events-none"
                                style={{ background: "linear-gradient(135deg, rgba(20,71,230,0.2), rgba(201,151,31,0.2))", borderRadius: "50%", padding: "3px" }} />
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-[3px] border-white shadow-xl bg-white"
                                style={{ boxShadow: "0 12px 32px -8px rgba(8,15,40,0.15)" }}>
                                <Image src="/doctor.jpg" alt="د. وائل البنا" fill quality={100} className="object-cover object-top scale-[1.15] origin-top" priority />
                            </div>
                        </div>
                    </div>

                    {/* Name & title */}
                    <div className="text-center mb-6">
                        <p className="text-sm font-bold mb-2 flex flex-col items-center gap-1" style={{ color: "#1447E6" }}>
                            <span>د. وائل البنا</span>
                            <span className="text-xs font-medium" style={{ color: "#3D4D6B" }}>استشاري باطنة وغدد صماء</span>
                        </p>
                        <h1 className="text-3xl font-extrabold mb-4 leading-tight" style={{ color: "#080F28" }}>
                            خيارك الأمثل
                            <br />
                            <span style={{ color: "#1447E6" }}>لحياة صحية ومتوازنة</span>
                        </h1>
                        <p className="text-sm font-medium leading-relaxed max-w-[320px] mx-auto" style={{ color: "#3D4D6B" }}>
                            استشارة طبية <span className="font-extrabold text-[#080F28]">وأنت في بيتك</span>. نكتشف الأسباب الطبية لثبات الوزن ونعالج ضعف الحرق، مع متابعة دقيقة لمرضى السكر والغدد.
                        </p>
                    </div>

                    {/* Patient-centric mini-badges */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold"
                            style={{ background: "#FFFFFF", color: "#3D4D6B", border: "1px solid #F1F5F9", boxShadow: "0 2px 8px rgba(8,15,40,0.03)" }}>
                            <HeartHandshake className="w-3.5 h-3.5" style={{ color: "#1447E6" }} /> +٢٠ سنة خبرة
                        </span>
                        <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold"
                            style={{ background: "#FFFFFF", color: "#3D4D6B", border: "1px solid #F1F5F9", boxShadow: "0 2px 8px rgba(8,15,40,0.03)" }}>
                            <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#16A34A" }} /> استشارة من بيتك
                        </span>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-3 mb-8">
                        <button
                            type="button"
                            onClick={handleBookingClick}
                            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-[15px] text-white transition-all hover:opacity-90 active:scale-[0.97]"
                            style={{ background: "linear-gradient(135deg, #1447E6 0%, #2556F5 100%)", boxShadow: "0 8px 24px -6px rgba(20,71,230,0.4)" }}>
                            <CalendarDays className="w-5 h-5 flex-shrink-0" />
                            احجز موعدك الآن
                        </button>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-[15px] transition-all active:scale-[0.97]"
                            style={{ color: "#16A34A", background: "#F0FDF4", border: "1px solid #DCFCE7", boxShadow: "0 2px 8px rgba(22,163,74,0.05)" }}>
                            <MessageCircle className="w-5 h-5 flex-shrink-0" />
                            تواصل عبر واتساب
                        </a>
                    </div>

                    {/* Location note */}
                    <p className="text-center text-xs" style={{ color: "#3D4D6B" }}>
                        استشارة أونلاين من أي مكان في الخليج والوطن العربي
                    </p>

                </div>
            </div>

            {/* ══════════ DESKTOP HERO ══════════ */}
            <div className="hidden lg:block relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F4F7FF 0%, #EEF3FF 100%)" }}>
                {/* Blobs */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
                    style={{ background: "radial-gradient(circle, rgba(20,71,230,0.12) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-30"
                    style={{ background: "radial-gradient(circle, rgba(201,151,31,0.15) 0%, transparent 70%)" }} />

                <div className="container mx-auto px-6 relative z-10 pt-24 pb-24">
                    <div className="flex flex-row items-center justify-between gap-16">

                        {/* Text */}
                        <div className="flex-1 text-right">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
                                style={{ background: "rgba(20,71,230,0.08)", color: "#1447E6", border: "1px solid rgba(20,71,230,0.15)" }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#1447E6" }} />
                                د. وائل البنا — استشاري باطنة وغدد صماء | استشارات أونلاين
                            </div>

                            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6" style={{ color: "#080F28" }}>
                                خيارك الأمثل <br />
                                <span className="text-3xl lg:text-5xl mt-2 inline-block" style={{ color: "#1447E6" }}>لحياة صحية ومتوازنة</span>
                            </h1>
                            <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl" style={{ color: "#3D4D6B" }}>
                                استشارة طبية <span className="font-extrabold text-[#080F28]">وأنت في بيتك</span>. نكتشف الأسباب الحقيقية وراء ثبات الوزن ونعالج الخلل الهرموني وضعف الحرق، مع رعاية متكاملة لمرضى السكر والغدد.
                            </p>

                            <div className="flex flex-row items-center gap-4 justify-start">
                                <button
                                    type="button"
                                    onClick={handleBookingClick}
                                    className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                                    style={{ background: "linear-gradient(135deg, #1447E6 0%, #2556F5 100%)", boxShadow: "0 8px 28px -6px rgba(20,71,230,0.45)" }}>
                                    <CalendarDays className="w-5 h-5" />
                                    احجز موعدك الآن
                                </button>
                                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-0.5"
                                    style={{ color: "#16A34A", background: "#F0FDF4", border: "1px solid #DCFCE7", boxShadow: "0 2px 12px rgba(22,163,74,0.08)" }}>
                                    <MessageCircle className="w-5 h-5" />
                                    تواصل عبر واتساب
                                </a>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="flex-shrink-0 w-96 lg:w-[420px] relative overflow-visible">
                            <div className="absolute -inset-4 rounded-[3rem] pointer-events-none"
                                style={{ background: "linear-gradient(135deg, rgba(20,71,230,0.08), rgba(201,151,31,0.08))", transform: "rotate(2deg)" }} />
                            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border-8 border-white group"
                                style={{ boxShadow: "0 40px 80px -20px rgba(8,15,40,0.2)" }}>
                                <Image src="/doctor.jpg" alt="د. وائل البنا" fill quality={100} sizes="33vw"
                                    className="object-cover object-top scale-[1.12] origin-top transition-transform duration-1000 group-hover:scale-[1.18]" priority />
                            </div>
                            {/* Floating badge */}
                            <div className="absolute -bottom-6 -right-6 flex items-center gap-3 p-4 rounded-2xl"
                                style={{ background: "#FFFFFF", boxShadow: "0 20px 48px -12px rgba(8,15,40,0.18)", border: "1px solid rgba(20,71,230,0.1)" }}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg"
                                    style={{ background: "linear-gradient(135deg, #1447E6, #2556F5)" }}>
                                    <HeartHandshake className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-extrabold text-sm" style={{ color: "#080F28" }}>استشاري متخصص</p>
                                    <p className="text-xs mt-0.5" style={{ color: "#3D4D6B" }}>باطنة وغدد صماء وسكر</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
}
