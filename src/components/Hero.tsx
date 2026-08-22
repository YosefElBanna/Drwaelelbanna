"use client";

import Image from "next/image";
import { useCallback } from "react";
import { CalendarDays, MessageCircle, Star, ShieldCheck, ClipboardList, Award, Globe, Lock, CheckCircle2 } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Hero() {
    const handleBookingClick = useCallback(() => {
        const el = document.getElementById("booking");
        if (el) {
            const navbarHeight = 64;
            const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
    }, []);

    return (
        <section className="relative overflow-hidden pt-20 pb-12 lg:pt-28 lg:pb-24 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                
                {/* Top Section: Title & Image (Side by Side) */}
                <div className="flex flex-row items-center justify-between gap-3 md:gap-12 mb-10 md:mb-16">
                    {/* Text (Right Side) */}
                    <div className="flex-1 text-right">
                        <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-100 bg-blue-50 mb-4 md:mb-6">
                            <span className="w-2 h-2 rounded-full animate-pulse bg-[#1447E6]" />
                            <span className="text-[11px] md:text-xs font-bold text-[#1447E6]">مواعيد متاحة الآن</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#080F28] mb-2 md:mb-4">
                            السكر والغدة الدرقية تحت السيطرة...
                        </h1>
                        <p className="text-sm sm:text-base md:text-2xl font-bold text-[#1447E6]">
                            من بيتك، مع استشاري بخبرة +20 سنة
                        </p>
                    </div>

                    {/* Image (Left Side) */}
                    <div className="w-[45%] md:w-[40%] max-w-[400px] relative flex-shrink-0">
                        {/* Background Shape */}
                        <div className="absolute inset-0 bg-[#EEF3FF] rounded-2xl md:rounded-[3rem] -z-10 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4" />
                        
                        <div className="relative aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden border-2 md:border-4 border-white shadow-sm">
                            <Image src="/doctor.jpg" alt="د. وائل البنا" fill quality={100} sizes="(max-width: 768px) 150px, 400px"
                                className="object-cover object-top scale-110" priority />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 bg-white border border-slate-100 shadow-xl py-1.5 px-2 md:py-2 md:px-4 rounded-xl md:rounded-2xl flex items-center gap-1.5 md:gap-3 w-max">
                            <div className="bg-[#EEF3FF] p-1 md:p-2 rounded-lg md:rounded-xl">
                                <Star className="w-3 h-3 md:w-5 md:h-5 text-[#1447E6]" fill="#1447E6" />
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-[11px] md:text-sm font-extrabold text-[#080F28] leading-tight">+5,000 حالة</span>
                                <span className="text-[9px] md:text-xs font-bold text-[#5A6A88]">تم متابعتها</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Paragraph */}
                <p className="text-sm md:text-xl font-medium leading-relaxed text-center text-[#3D4D6B] max-w-3xl mx-auto mb-8 md:mb-12">
                    نهج طبي يبدأ بفهم حالتك وتقييم أسبابها، وليس مجرد وصف علاج سريع.
                    <br className="hidden md:block" />
                    خبرة متخصصة في تشخيص ومتابعة أمراض السكري واضطرابات الغدد الصماء، حظيت بثقة آلاف المرضى.
                </p>

                {/* White Card */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-5 md:p-8 mb-8 max-w-4xl mx-auto">
                    {/* Top of Card */}
                    <div className="flex flex-row items-start gap-3 md:gap-6 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-slate-100">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#EEF3FF] flex items-center justify-center flex-shrink-0 mt-1 md:mt-0">
                            <ClipboardList className="w-5 h-5 md:w-7 md:h-7 text-[#1447E6]" />
                        </div>
                        <p className="text-xs md:text-lg font-bold leading-relaxed text-[#080F28] text-right">
                            يقوم د. وائل بمراجعة تحاليلك وتقاريرك الطبية، أينما كنت، ومناقشة حالتك معك بشكل مباشر، للوصول إلى تقييم واضح وخطة علاجية مناسبة من خلال <span className="text-[#1447E6]">الاستشارة الطبية أونلاين.</span>
                        </p>
                    </div>
                    
                    {/* Bottom of Card (Grid) */}
                    <div className="flex flex-row justify-between items-start gap-1 md:gap-4 divide-x divide-x-reverse divide-slate-100">
                        <div className="flex flex-col items-center text-center flex-1 px-1">
                            <Award className="w-6 h-6 md:w-8 md:h-8 text-[#1447E6] mb-2 md:mb-3" />
                            <span className="text-[10px] md:text-base font-bold text-[#3D4D6B]">خبرة تتجاوز 20 عامًا</span>
                        </div>
                        <div className="flex flex-col items-center text-center flex-1 px-1">
                            <Globe className="w-6 h-6 md:w-8 md:h-8 text-[#1447E6] mb-2 md:mb-3" />
                            <span className="text-[10px] md:text-base font-bold text-[#3D4D6B]">أكثر من 5,000 حالة من مصر ودول الخليج</span>
                        </div>
                        <div className="flex flex-col items-center text-center flex-1 px-1">
                            <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-[#1447E6] mb-2 md:mb-3" />
                            <span className="text-[10px] md:text-base font-bold text-[#3D4D6B]">متابعة مجانية لمدة أسبوعين بعد الاستشارة</span>
                        </div>
                    </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3 md:gap-4 max-w-xl mx-auto mb-8">
                    <button
                        type="button"
                        onClick={handleBookingClick}
                        className="flex items-center justify-center gap-3 w-full py-4 md:py-5 rounded-2xl font-extrabold text-base md:text-xl text-white transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{ background: "#0841D6", boxShadow: "0 8px 24px -4px rgba(8,65,214,0.4)" }}>
                        <CalendarDays className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                        احجز موعد استشارتك
                    </button>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 md:py-5 rounded-2xl font-extrabold text-base md:text-xl transition-all hover:bg-emerald-50 active:scale-[0.98]"
                        style={{ color: "#16A34A", background: "#F0FDF4", border: "2px solid #DCFCE7" }}>
                        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                        تواصل معنا عبر واتساب
                    </a>
                </div>
                
                {/* Risk Reducer Bottom Bar */}
                <div className="flex flex-row items-center justify-between bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl py-3 md:py-4 px-2 md:px-6 max-w-4xl mx-auto text-[10px] md:text-sm font-bold text-[#5A6A88]">
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-center md:text-right flex-1">
                        <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#0841D6]" />
                        <span>متابعة مجانية أسبوعين<br className="md:hidden" /> بعد الاستشارة</span>
                    </div>
                    <div className="w-px h-6 md:h-6 bg-slate-200 mx-1 md:mx-2"></div>
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-center md:text-right flex-1 justify-center">
                        <Lock className="w-4 h-4 md:w-5 md:h-5 text-[#0841D6]" />
                        <span>دفع آمن</span>
                    </div>
                    <div className="w-px h-6 md:h-6 bg-slate-200 mx-1 md:mx-2"></div>
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-center md:text-right flex-1 justify-end">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#0841D6]" />
                        <span>تأكيد فوري<br className="md:hidden" /> للحجز</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
