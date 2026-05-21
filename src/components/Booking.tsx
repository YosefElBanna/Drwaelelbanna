"use client";

import { useState, useEffect } from "react";
import { format, parseISO, addDays, getDay, startOfDay } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar, Clock, User, Phone, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import Script from "next/script";



// Time slots and allowed days are now fetched dynamically from the database.

const COUNTRIES_MAP: Record<string, { currency: string, price: number, dialCode: string }> = {
    "EG": { currency: "جنيه مصري", price: 500, dialCode: "+20" },
    "AE": { currency: "درهم إماراتي", price: 170, dialCode: "+971" },
    "SA": { currency: "ريال سعودي", price: 150, dialCode: "+966" },
    "KW": { currency: "دينار كويتي", price: 12, dialCode: "+965" },
    "QA": { currency: "ريال قطري", price: 150, dialCode: "+974" },
    "OM": { currency: "ريال عماني", price: 15, dialCode: "+968" },
    "BH": { currency: "دينار بحريني", price: 15, dialCode: "+973" },
    "DEFAULT": { currency: "دولار", price: 50, dialCode: "+" },
};

export default function Booking() {
    const [date, setDate] = useState("");
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [allowedDays, setAllowedDays] = useState<number[]>([5]);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [disabledDates, setDisabledDates] = useState<string[]>([]);
    const [settingsLoaded, setSettingsLoaded] = useState(false);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [detectedCountry, setDetectedCountry] = useState("EG");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Auto-detect country
    useEffect(() => {
        fetch("https://api.country.is")
            .then(res => res.json())
            .then(data => {
                if (data && data.country) {
                    setDetectedCountry(data.country);
                }
            })
            .catch(() => console.log("Geolocation fallback to EG"));
    }, []);

    // Check for PayTabs return payment status
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            if (params.get("payment") === "success") {
                setSuccess(true);
                const savedInfo = localStorage.getItem("bookingInfo");
                if (savedInfo) {
                    const info = JSON.parse(savedInfo);
                    setFullName(info.fullName);
                    setDate(info.date);
                    setSelectedSlot(info.timeSlot);
                    localStorage.removeItem("bookingInfo");
                }
                window.history.replaceState({}, document.title, window.location.pathname);
            } else if (params.get("payment") === "failed") {
                setError("فشلت عملية الدفع. يرجى المحاولة مرة أخرى.");
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }, []);

    // Fetch clinic settings
    useEffect(() => {
        fetch("/api/settings", { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data && data.allowed_days) {
                    setAllowedDays(data.allowed_days);
                }
                if (data && data.time_slots) {
                    setTimeSlots(data.time_slots);
                }
                setDisabledDates(data?.disabled_dates || []);
                setSettingsLoaded(true);
            })
            .catch(err => {
                console.error("Failed to fetch settings", err);
                setSettingsLoaded(true);
            });
    }, []);

    const isAllowedDay = (dateString: string) => {
        if (!dateString || allowedDays.length === 0) return false;
        const d = parseISO(dateString);
        const day = getDay(d);
        return allowedDays.includes(day);
    };

    const generateUpcomingDates = () => {
        const dates = [];
        const today = startOfDay(new Date());

        if (allowedDays.length === 0) return [];

        for (let i = 0; i < 60; i++) { // Look ahead 60 days
            const d = addDays(today, i);
            const day = getDay(d);
            const dateStr = format(d, 'yyyy-MM-dd');
            if (allowedDays.includes(day) && !disabledDates.includes(dateStr)) {
                dates.push(dateStr);
            }
            if (dates.length >= 6) break; // Get next 6 available dates
        }
        return dates;
    };

    const upcomingDates = settingsLoaded ? generateUpcomingDates() : [];

    useEffect(() => {
        if (!date || !isAllowedDay(date)) {
            setBookedSlots([]);
            setSelectedSlot("");
            return;
        }

        const fetchSlots = async () => {
            setIsLoading(true);
            setError("");
            try {
                const res = await fetch(`/api/slots?date=${date}`);
                if (!res.ok) throw new Error("فشل في تحميل المواعيد");
                const data = await res.json();
                setBookedSlots(data.bookedSlots || []);
            } catch (err: any) {
                setError(err.message || "حدث خطأ ما");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSlots();
    }, [date]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !selectedSlot || !fullName || !phone) {
            setError("يرجى إكمال جميع البيانات");
            return;
        }

        if (fullName.trim().split(/\s+/).length < 3) {
            setError("يرجى كتابة الاسم الثلاثي");
            return;
        }

        const currentCountryInfo = COUNTRIES_MAP[detectedCountry] || COUNTRIES_MAP["DEFAULT"];
        const cleanPhone = phone.trim().replace(/\D/g, "");

        if (detectedCountry === "EG" && cleanPhone.length < 10) {
            setError("يرجى إدخال رقم هاتف صحيح");
            return;
        } else if (cleanPhone.length < 7) {
            setError("يرجى إدخال رقم هاتف صحيح");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
            const payload = {
                date,
                timeSlot: selectedSlot,
                fullName,
                phone: `${currentCountryInfo.dialCode}${cleanPhone}`,
                type: "online",
                countryCode: detectedCountry,
                amount: currentCountryInfo.price,
                currency: currentCountryInfo.currency === "جنيه مصري" ? "EGP" : 
                          currentCountryInfo.currency === "درهم إماراتي" ? "AED" :
                          currentCountryInfo.currency === "ريال سعودي" ? "SAR" : "USD"
            };

            // Save info to restore after redirect
            localStorage.setItem("bookingInfo", JSON.stringify(payload));

            const res = await fetch("/api/paytabs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "فشل في إنشاء جلسة الدفع");

            if (data.redirect_url) {
                window.location.href = data.redirect_url;
            } else {
                throw new Error("لم يتم استلام رابط الدفع");
            }
        } catch (err: any) {
            setError(err.message || "حدث خطأ أثناء الاتصال ببوابة الدفع. يرجى المحاولة لاحقاً.");
            setIsSubmitting(false);
        }
    };

    const formatTimeSlot = (slot: string) => {
        const [hours, mins] = slot.split(":");
        let h = parseInt(hours);
        const m = mins;
        const ampm = "م";
        h = h > 12 ? h - 12 : h;
        return `${h}:${m} ${ampm}`;
    };

    const resetBooking = () => {
        setSuccess(false);
        setDate("");
        setSelectedSlot("");
        setFullName("");
        setPhone("");
    };

    const currentCountryInfo = COUNTRIES_MAP[detectedCountry] || COUNTRIES_MAP["DEFAULT"];

    // Calculate current step for mobile progress
    const currentStep = !date ? 1 : !selectedSlot ? 2 : 3;

    return (
        <>
            <section id="booking" className="py-12 md:py-20" style={{ background: "#FFFFFF" }}>
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "#080F28" }}>احجز استشارتك الأونلاين</h2>
                    <div className="w-16 h-1 mx-auto rounded-full mb-8" style={{ background: "linear-gradient(90deg, #1447E6, #C9971F)" }} />
                    
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center max-w-sm mx-auto relative px-2">
                        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
                        {[
                            { step: 1, label: "اليوم" },
                            { step: 2, label: "الوقت" },
                            { step: 3, label: "التأكيد" }
                        ].map((s) => (
                            <div key={s.step} className="flex-1 flex flex-col items-center gap-2 relative z-10">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500 ${currentStep > s.step ? 'bg-[#1447E6] border-[#1447E6] text-white scale-110 shadow-md' : currentStep === s.step ? 'bg-white border-[#1447E6] text-[#1447E6] scale-110 shadow-sm' : 'bg-white border-slate-200 text-slate-400'}`}>
                                    {currentStep > s.step ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${currentStep >= s.step ? 'text-[#080F28]' : 'text-slate-400'}`}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {success ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center shadow-sm">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                            <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-emerald-800 mb-2">تم الحجز بنجاح، {fullName.split(' ')[0]}!</h3>
                        <p className="text-emerald-700 text-sm md:text-base mb-4">
                            تم تأكيد الموعد يوم {format(parseISO(date), 'EEEE d MMMM', { locale: ar })} الساعة {formatTimeSlot(selectedSlot)}.
                        </p>
                        <p className="text-emerald-700 text-sm md:text-base mb-6 md:mb-8 font-medium">
                            سنتواصل معك عبر واتساب قريباً لتأكيد التفاصيل.
                        </p>
                        <button
                            onClick={resetBooking}
                            className="px-6 py-3 bg-white text-emerald-600 border border-emerald-200 rounded-xl font-bold hover:bg-emerald-50 transition-all text-sm"
                        >
                            حجز موعد جديد
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                        {/* Header */}
                        <div className="sticky top-0 z-20 text-white p-4 md:p-6 shadow-sm border-b border-white/10" style={{ background: "linear-gradient(135deg, #1447E6 0%, #2556F5 100%)" }}>
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-right bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner flex-1 max-w-[200px]">
                                    <p className="text-[10px] md:text-xs text-white/80 mb-0.5">سعر الاستشارة</p>
                                    <p className="text-base md:text-xl font-extrabold">{currentCountryInfo.price} <span className="text-xs font-normal">{currentCountryInfo.currency}</span></p>
                                </div>
                                <div className="text-left">
                                    <h3 className="text-base md:text-xl font-bold mb-1">استشارة أونلاين</h3>
                                    <p className="text-white/80 text-[10px] md:text-xs">
                                        دفع إلكتروني آمن
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-6 md:space-y-8">
                            {error && (
                                <div className="flex items-center gap-2 p-3 md:p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs md:text-sm font-semibold">
                                    <span className="text-xl">⚠️</span>
                                    {error}
                                </div>
                            )}

                            {/* Date Selection */}
                            <div>
                                <label className="block text-xs md:text-sm font-bold mb-2 md:mb-3" style={{ color: "#080F28" }}>١. اختر اليوم المناسب</label>
                                <div className="relative">
                                    {!settingsLoaded ? (
                                        <div className="flex bg-slate-50 p-6 rounded-xl md:rounded-2xl border border-slate-200 justify-center items-center">
                                            <Loader2 className="w-6 h-6 animate-spin text-[#1447E6]" />
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-200">
                                        {upcomingDates.map((d, index) => {
                                            const parsedDate = parseISO(d);
                                            const dayName = format(parsedDate, 'EEEE', { locale: ar });
                                            const dateNum = format(parsedDate, 'd MMM', { locale: ar });
                                            const isSelected = date === d;
                                            const isClosest = index === 0;
                                            return (
                                                <button
                                                    key={d}
                                                    type="button"
                                                    onClick={() => { setDate(d); setSelectedSlot(""); setError(""); }}
                                                    className={`relative flex flex-col items-center justify-center py-4 px-2 rounded-2xl font-bold transition-all duration-300 border active:scale-95 ${isSelected
                                                        ? "text-white shadow-lg scale-105"
                                                        : "bg-white border-slate-200 hover:border-[#1447E6] hover:shadow-md hover:-translate-y-1"
                                                        }`}
                                                    style={{
                                                        background: isSelected ? "linear-gradient(135deg, #1447E6 0%, #2556F5 100%)" : "",
                                                        borderColor: isSelected ? "#1447E6" : "",
                                                        boxShadow: isSelected ? "0 8px 16px -4px rgba(20,71,230,0.3)" : "",
                                                        color: isSelected ? "#FFFFFF" : "#080F28"
                                                    }}
                                                >
                                                    {isClosest && !isSelected && (
                                                        <span className="absolute -top-3 bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-3 py-0.5 rounded-full z-10 shadow-sm">
                                                            أقرب موعد
                                                        </span>
                                                    )}
                                                    <span className={`text-xs md:text-sm mb-1 ${isSelected ? 'text-white/90' : 'text-[#5A6A88]'}`}>{dayName}</span>
                                                    <span className={`text-base md:text-xl ${isSelected ? 'text-white' : 'text-[#080F28]'}`}>{dateNum}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    )}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div className={`transition-all duration-500 ease-in-out origin-top ${date && isAllowedDay(date) ? 'opacity-100 scale-y-100 h-auto' : 'opacity-0 scale-y-0 h-0 overflow-hidden'}`}>
                                <label className="block text-xs md:text-sm font-bold mb-2 md:mb-3" style={{ color: "#080F28" }}>
                                    ٢. المواعيد المتاحة يوم {date ? format(parseISO(date), 'EEEE', { locale: ar }) : ''}
                                </label>
                                {isLoading ? (
                                    <div className="flex items-center gap-2 font-semibold p-3 md:p-4 rounded-xl justify-center text-sm" style={{ background: "#EEF3FF", color: "#1447E6" }}>
                                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> جاري تحميل المواعيد...
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                                        {timeSlots.map((slot) => {
                                            const isBooked = bookedSlots.includes(slot);
                                            const isSelected = selectedSlot === slot;
                                            return (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    disabled={isBooked}
                                                    onClick={() => { setSelectedSlot(slot); setError(""); }}
                                                    className={`flex items-center justify-center gap-1.5 md:gap-2 py-3 px-2 md:px-4 rounded-xl font-bold transition-all duration-300 border text-sm md:text-base active:scale-95 ${isBooked
                                                        ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
                                                        : isSelected
                                                            ? "text-white shadow-lg scale-105"
                                                            : "bg-white border-slate-200 hover:border-[#1447E6] hover:shadow-md hover:-translate-y-0.5"
                                                        }`}
                                                    style={{
                                                        background: isSelected && !isBooked ? "linear-gradient(135deg, #1447E6 0%, #2556F5 100%)" : "",
                                                        borderColor: isSelected && !isBooked ? "#1447E6" : "",
                                                        boxShadow: isSelected && !isBooked ? "0 8px 16px -4px rgba(20,71,230,0.3)" : "",
                                                        color: isSelected && !isBooked ? "#FFFFFF" : isBooked ? "" : "#080F28"
                                                    }}
                                                >
                                                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                    {formatTimeSlot(slot)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Personal Details */}
                            <div className={`transition-all duration-500 ease-in-out origin-top ${selectedSlot ? 'opacity-100 scale-y-100 h-auto' : 'opacity-0 scale-y-0 h-0 overflow-hidden'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6 border-t border-slate-100">
                                    <div>
                                        <label className="block text-xs md:text-sm font-bold mb-1.5 md:mb-2" style={{ color: "#080F28" }}>٣. الاسم الثلاثي</label>
                                        <div className="relative">
                                            <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5" style={{ color: "#5A6A88" }} />
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="أحمد محمد محمود"
                                                className="w-full pl-4 pr-10 md:pr-11 py-3 border border-slate-200 rounded-xl outline-none transition-all text-sm md:text-base focus:border-[#1447E6] focus:ring-1 focus:ring-[#1447E6]"
                                                style={{ color: "#080F28" }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs md:text-sm font-bold mb-1.5 md:mb-2" style={{ color: "#080F28" }}>رقم الهاتف (لتأكيد الحجز)</label>
                                        <div className="relative flex shadow-sm rounded-xl border border-slate-200 overflow-hidden focus-within:border-[#1447E6] focus-within:ring-1 focus-within:ring-[#1447E6]" dir="ltr">
                                            <div className="bg-slate-50 px-3 md:px-4 py-3 border-r border-slate-200 flex items-center justify-center min-w-[60px] md:min-w-[70px] text-sm" style={{ color: "#080F28" }}>
                                                <span className="font-semibold text-center w-full">{currentCountryInfo.dialCode}</span>
                                            </div>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/[^\d\s-]/g, ''))}
                                                placeholder={detectedCountry === "EG" ? "1X XXX XXXX" : "XXXXXXXXX"}
                                                className="w-full px-3 md:px-4 py-3 outline-none transition-all text-left bg-white font-medium text-sm md:text-base"
                                                style={{ color: "#080F28" }}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !date || !selectedSlot}
                                    className="w-full text-white font-bold text-sm md:text-lg py-3.5 md:py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 md:mt-8 active:scale-[0.98]"
                                    style={{ background: "linear-gradient(135deg, #1447E6 0%, #2556F5 100%)", boxShadow: "0 8px 24px -6px rgba(20,71,230,0.4)" }}
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> جاري التحويل للدفع ...</>
                                    ) : (
                                        <>
                                            دفع وتأكيد الحجز
                                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </section>
        </>
    );
}
