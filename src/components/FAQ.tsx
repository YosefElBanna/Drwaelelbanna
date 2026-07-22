"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "كيف تتم الاستشارة الأونلاين بالظبط؟",
        answer: "عبر Zoom - مكالمة فيديو مباشرة مع د. وائل، تتكلم وتسأل وتعرض تحاليلك زي ما لو كنت في العيادة."
    },
    {
        question: "هل في متابعة بعد الكشف؟",
        answer: "نعم، استشارة متابعة مجانية لمدة أسبوعين بعد الكشف، لأي سؤال أو تعديل في الخطة العلاجية."
    },
    {
        question: "هل الاستشارة مناسبة لو أنا في السعودية أو الإمارات أو أي بلد؟",
        answer: "نعم، الاستشارة متاحة لأي مكان في الخليج والوطن العربي."
    },
    {
        question: "هل أحصل على خطة علاجية واضحة بعد الاستشارة؟",
        answer: "نعم، تستلم خطة علاجية واضحة من د. وائل بناءً على حالتك وتحاليلك."
    },
    {
        question: "هل لازم أسافر مصر أو أعمل التحاليل هناك؟",
        answer: "لا، الاستشارة كاملة وانت في بيتك. تعمل التحاليل في بلدك وترفعها، ويراجعها د. وائل معاك في الاستشارة."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-14 md:py-24 bg-slate-50">
            <div className="container mx-auto px-5 md:px-6 max-w-3xl">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-extrabold mb-4 text-[#080F28]">
                        الأسئلة الشائعة
                    </h2>
                    <div className="w-16 h-1 mx-auto rounded-full mb-4 bg-[#1447E6]" />
                    <p className="text-sm md:text-base text-[#5A6A88]">
                        اضغط على السؤال لمعرفة الإجابة
                    </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div 
                                key={idx} 
                                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#1447E6] shadow-md ring-1 ring-[#1447E6]/20' : 'border-slate-200 shadow-sm hover:border-[#1447E6]/50'}`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="flex w-full items-center justify-between p-4 md:p-6 text-right focus:outline-none group transition-colors hover:bg-slate-50/50"
                                >
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className={`w-8 h-8 md:w-10 md:h-10 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors ${isOpen ? 'bg-[#1447E6] text-white' : 'bg-[#EEF3FF] text-[#1447E6]'}`}>
                                            ؟
                                        </div>
                                        <span className={`font-bold text-sm md:text-lg transition-colors ${isOpen ? 'text-[#1447E6]' : 'text-[#080F28] group-hover:text-[#1447E6]'}`}>
                                            {faq.question}
                                        </span>
                                    </div>
                                    
                                    <div className={`w-7 h-7 md:w-8 md:h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#1447E6]/10 text-[#1447E6]' : 'bg-slate-100 text-slate-400 group-hover:bg-[#1447E6]/10 group-hover:text-[#1447E6]'}`}>
                                        <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                </button>
                                
                                <div 
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="p-4 md:p-6 pt-0 pr-12 md:pr-20 text-sm md:text-base text-[#3D4D6B] leading-relaxed font-medium">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
