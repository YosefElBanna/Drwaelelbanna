import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function About() {
    const features = [
        {
            title: "تشخيص دقيق لسبب التعب",
            desc: "بنسمع تفاصيل حالتك كاملة، ونوصل للسبب الحقيقي - مش بس وصف دواء سريع."
        },
        {
            title: "متابعة شاملة للسكر والغدة الدرقية",
            desc: "خطة علاجية واضحة تتابع معاك تذبذب السكر وكسل أو فرط الغدة، بدقة وأمان."
        },
        {
            title: "علاج أسباب ثبات الوزن",
            desc: "لو وزنك مش بينزل، ممكن السبب هرموني. نكشف السبب الحقيقي ونعالجه طبيًا."
        },
        {
            title: "متابعة مجانية أسبوعين بعد الكشف",
            desc: "أي سؤال أو تعديل في الخطة بعد الاستشارة، إحنا معاك بدون أي تكلفة إضافية."
        }
    ];

    return (
        <section id="about" className="py-14 md:py-32" style={{ background: "#FFFFFF" }}>
            <div className="container mx-auto px-5 md:px-6">
                
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">

                    {/* Image Column */}
                    <div className="w-full lg:w-5/12 relative pb-8 flex justify-center lg:justify-start">
                        {/* Decorative Background */}
                        <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] hidden lg:block" style={{ background: "rgba(20,71,230,0.1)" }} />
                        
                        {/* Small Image (Mobile) vs Large Image (Desktop) */}
                        <div className="relative rounded-2xl lg:rounded-[2rem] overflow-hidden border-[3px] border-white lg:border-none w-40 lg:w-full lg:aspect-[4/5] aspect-[3/4]"
                            style={{ boxShadow: "0 12px 32px -8px rgba(8,15,40,0.12)" }}>
                            <Image 
                                src="/doctor.jpg" 
                                alt="دكتور وائل البنا" 
                                fill 
                                className="object-cover object-top scale-[1.1] origin-top"
                                sizes="(max-width: 1024px) 128px, 50vw"
                            />
                        </div>
                        
                        {/* Floating Experience Badge */}
                        <div className="absolute -bottom-3 lg:-bottom-4 left-1/2 lg:left-auto lg:-right-8 -translate-x-1/2 lg:translate-x-0 bg-white p-3 lg:p-5 rounded-2xl flex items-center gap-2 lg:gap-4 z-10 whitespace-nowrap shadow-lg">
                            <div className="w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl text-white font-bold text-sm lg:text-xl flex-shrink-0" style={{ background: "linear-gradient(135deg, #1447E6, #2556F5)" }}>
                                <span>+٢٠</span>
                            </div>
                            <div>
                                <p className="font-extrabold text-xs lg:text-base" style={{ color: "#080F28" }}>سنة خبرة</p>
                                <p className="text-[10px] lg:text-sm mt-0.5 hidden lg:block" style={{ color: "#3D4D6B" }}>في الغدد الصماء والسكر</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full lg:w-7/12 mt-4 lg:mt-0">
                        <div className="text-center lg:text-right">
                            <h2 className="text-2xl lg:text-5xl font-extrabold mb-4 lg:mb-6 leading-tight" style={{ color: "#080F28" }}>
                                لماذا تختار د. وائل البنا؟
                            </h2>
                            <p className="text-sm lg:text-xl leading-relaxed mb-8 lg:mb-10 text-[#3D4D6B] max-w-2xl mx-auto lg:mx-0">
                                استشارة طبية عبر الإنترنت مع أكثر من 20 عامًا من الخبرة في علاج السكري واضطرابات الغدة الدرقية والهرمونات.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 text-right">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex flex-row items-start gap-3 lg:gap-4 bg-white lg:bg-transparent p-4 lg:p-0 rounded-2xl shadow-sm lg:shadow-none border border-slate-100 lg:border-none">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(201,151,31,0.15)" }}>
                                            <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: "#C9971F" }} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm lg:text-base mb-1.5 lg:mb-2" style={{ color: "#080F28" }}>{feature.title}</h3>
                                        <p className="text-xs lg:text-sm leading-relaxed" style={{ color: "#3D4D6B" }}>{feature.desc}</p>
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
