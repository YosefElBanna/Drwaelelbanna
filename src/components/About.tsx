import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function About() {
    const features = [
        {
            title: "تقييم طبي دقيق لحالتك",
            desc: "لا نعتمد على التخمين، بل نبني خطتنا العلاجية على تحليل دقيق لتاريخك الطبي، وظائف الغدة الدرقية، ومستويات السكر لضمان اختيار العلاج الأنسب."
        },
        {
            title: "علاج مسببات السمنة وثبات الوزن",
            desc: "لا نرهقك بأنظمة رجيم قاسية، بل نعالج الأسباب الطبية الخفية التي تمنع نزول وزنك (مثل مقاومة الإنسولين أو كسل الغدة) ليعود جسمك للحرق بشكل طبيعي."
        },
        {
            title: "بروتوكولات دوائية متطورة",
            desc: "نعتمد على أحدث التدخلات الدوائية لتنشيط الحرق، التخلص من الدهون المتراكمة، والسيطرة التامة على مستويات السكر في الدم بشكل آمن ومستمر."
        },
        {
            title: "متابعة طبية لضمان النتيجة",
            desc: "نراقب استجابتك للعلاج من خلال التحاليل الدورية، ونعدل جرعات الأدوية بدقة لضمان نزول الوزن واستقرار الغدة والسكر حتى تصل لهدفك."
        }
    ];

    return (
        <section id="about" className="py-14 md:py-32" style={{ background: "#FFFFFF" }}>
            <div className="container mx-auto px-5 md:px-6">
                
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">

                    {/* ══════════ MOBILE: Image + Intro side by side ══════════ */}
                    <div className="lg:hidden w-full">
                        <div className="flex flex-row items-center gap-5">
                            {/* Small image */}
                            <div className="flex-shrink-0 relative" style={{ width: "120px" }}>
                                <div className="absolute -inset-[3px] rounded-2xl pointer-events-none"
                                    style={{ background: "linear-gradient(135deg, rgba(20,71,230,0.15), rgba(201,151,31,0.15))" }} />
                                <div className="relative rounded-2xl overflow-hidden border-[3px] border-white"
                                    style={{ aspectRatio: "3/4", boxShadow: "0 12px 32px -8px rgba(8,15,40,0.12)" }}>
                                    <Image 
                                        src="/doctor.jpg" 
                                        alt="دكتور وائل البنا" 
                                        fill 
                                        className="object-cover object-top scale-[1.1] origin-top"
                                        sizes="120px"
                                    />
                                </div>
                                {/* Mini experience badge */}
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-xl flex items-center gap-2 z-10 whitespace-nowrap"
                                    style={{ boxShadow: "0 6px 20px rgba(8,15,40,0.1)" }}>
                                    <div className="w-7 h-7 flex items-center justify-center rounded-lg text-white font-bold text-[11px] flex-shrink-0"
                                        style={{ background: "linear-gradient(135deg, #1447E6, #2556F5)" }}>
                                        <span>+٢٠</span>
                                    </div>
                                    <div>
                                        <p className="font-extrabold text-[11px] leading-tight" style={{ color: "#080F28" }}>سنة خبرة</p>
                                    </div>
                                </div>
                            </div>
                            {/* Text beside image */}
                            <div className="flex-1 text-right min-w-0">

                                <h2 className="text-xl font-extrabold mb-2 leading-tight" style={{ color: "#080F28" }}>
                                    لماذا تختار د. وائل البنا؟
                                </h2>
                                <p className="text-xs leading-relaxed" style={{ color: "#3D4D6B" }}>
                                    استشارة طبية عبر الإنترنت مع أكثر من ٢٠ عاماً من الخبرة. نهتم بفهم أعراضك بالتفصيل وتحديد الأسباب بدقة لتصل إلى راحة واطمئنان على صحتك.
                                </p>
                            </div>
                        </div>

                        {/* Features grid - mobile */}
                        <div className="grid grid-cols-1 gap-3 mt-8 text-right">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex flex-row items-start gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(201,151,31,0.15)" }}>
                                            <CheckCircle2 className="w-4 h-4" style={{ color: "#C9971F" }} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm mb-1.5" style={{ color: "#080F28" }}>{feature.title}</h3>
                                        <p className="text-xs leading-relaxed" style={{ color: "#3D4D6B" }}>{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* ══════════ DESKTOP: Original layout ══════════ */}
                    {/* Image Column - Desktop only */}
                    <div className="hidden lg:block w-5/12 relative pb-8">
                        {/* Decorative Background */}
                        <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem]" style={{ background: "rgba(20,71,230,0.1)" }} />
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden" style={{ boxShadow: "0 20px 40px -10px rgba(8,15,40,0.1)" }}>
                            <Image 
                                src="/doctor.jpg" 
                                alt="دكتور وائل البنا" 
                                fill 
                                className="object-cover object-top scale-[1.1] origin-top"
                                sizes="50vw"
                            />
                        </div>
                        
                        {/* Floating Experience Badge */}
                        <div className="absolute -bottom-4 -right-8 bg-white p-5 rounded-2xl flex items-center gap-4 z-10" style={{ boxShadow: "0 10px 30px rgba(8,15,40,0.12)" }}>
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl text-white font-bold text-xl flex-shrink-0" style={{ background: "linear-gradient(135deg, #1447E6, #2556F5)" }}>
                                <span>+٢٠</span>
                            </div>
                            <div>
                                <p className="font-extrabold text-base" style={{ color: "#080F28" }}>عاماً من الخبرة</p>
                                <p className="text-sm mt-0.5" style={{ color: "#3D4D6B" }}>في الباطنة والغدد</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Column - Desktop only */}
                    <div className="hidden lg:block w-7/12">
                        <div className="text-right">

                            <h2 className="text-5xl font-extrabold mb-6 leading-tight" style={{ color: "#080F28" }}>
                                لماذا تختار د. وائل البنا؟
                            </h2>
                            <p className="text-xl leading-relaxed mb-10" style={{ color: "#3D4D6B" }}>
                                استشارة طبية عبر الإنترنت مع أكثر من ٢٠ عاماً من الخبرة. نهتم بفهم أعراضك بالتفصيل وتحديد الأسباب بدقة لتصل إلى راحة واطمئنان على صحتك.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 text-right">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex flex-row items-start gap-4">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(201,151,31,0.15)" }}>
                                            <CheckCircle2 className="w-5 h-5" style={{ color: "#C9971F" }} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base mb-2" style={{ color: "#080F28" }}>{feature.title}</h3>
                                        <p className="text-sm leading-relaxed" style={{ color: "#3D4D6B" }}>{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
