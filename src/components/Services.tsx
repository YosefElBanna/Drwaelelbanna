import { Stethoscope, Activity, Heart, Droplets, FlaskConical, Salad } from "lucide-react";

const services = [
    {
        icon: <Activity className="w-6 h-6 lg:w-8 lg:h-8" style={{ color: "#1447E6" }} />,
        title: "السيطرة الكاملة على السكر (النوع الأول والثاني)",
        desc: "خطة دقيقة تنهي تذبذب القراءات وتحميك من مضاعفات الأعصاب والعين والكلى على المدى البعيد.",
        accentBg: "rgba(20,71,230,0.06)",
    },
    {
        icon: <Stethoscope className="w-6 h-6 lg:w-8 lg:h-8" style={{ color: "#1447E6" }} />,
        title: "متابعة الحالات المزمنة والمعقدة",
        desc: "سنين من تذبذب السكر أو علاج لم يفلح من قبل؟ نراجع تاريخك الطبي بالتفصيل ونصل لخطة تناسب حالتك بالذات.",
        accentBg: "rgba(20,71,230,0.06)",
    },
    {
        icon: <Droplets className="w-6 h-6 lg:w-8 lg:h-8" style={{ color: "#1447E6" }} />,
        title: "علاج اضطرابات الغدة الدرقية",
        desc: "خمول أو فرط نشاط الغدة الدرقية يسرق طاقتك بصمت. نضبط الهرمونات بدقة لتعود لحيويتك.",
        accentBg: "rgba(20,71,230,0.06)",
    },
    {
        icon: <FlaskConical className="w-6 h-6 lg:w-8 lg:h-8" style={{ color: "#1447E6" }} />,
        title: "إعادة التوازن الهرموني العام",
        desc: "اضطراب الهرمونات يقلب حياتك. نشخص السبب الجذري بدقة ونعيد التوازن لجسمك بالكامل.",
        accentBg: "rgba(20,71,230,0.06)",
    },
    {
        icon: <Salad className="w-6 h-6 lg:w-8 lg:h-8" style={{ color: "#1447E6" }} />,
        title: "كسر ثبات الوزن المرتبط بالهرمونات",
        desc: "ثبات الوزن غالبًا سببه هرموني مثل مقاومة الإنسولين، مش بس أكل زيادة. نكشف السبب ونعالجه طبيًا بدون رجيم قاسٍ.",
        accentBg: "rgba(20,71,230,0.06)",
    },
    {
        icon: <Heart className="w-6 h-6 lg:w-8 lg:h-8" style={{ color: "#1447E6" }} />,
        title: "حماية القلب من مضاعفات السكر الصامتة",
        desc: "متابعة دورية لضغط الدم والقلب تمنع التذبذبات الخطيرة، كجزء من رعاية شاملة لمرضى السكر.",
        accentBg: "rgba(20,71,230,0.06)",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-14 md:py-24 relative" style={{ background: "#FFFFFF", borderTop: "1px solid #F8FAFC", borderBottom: "1px solid #F8FAFC" }}>
            <div className="container mx-auto px-5 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-extrabold mb-4" style={{ color: "#080F28" }}>
                        خدمات الغدد الصماء والسكر
                    </h2>
                    <div className="w-16 h-1 mx-auto rounded-full mb-4" style={{ background: "#1447E6" }} />
                    <p className="text-sm md:text-base max-w-xl mx-auto font-medium" style={{ color: "#5A6A88" }}>
                        متابعتك أونلاين مع نفس الدكتور في كل مرة - ودراسات حديثة تؤكد أن المتابعة المنتظمة تخفض نسبة السكر التراكمي فعليًا.
                    </p>
                </div>

                {/* Grid layout (Responsive for Mobile, Tablet, Desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {services.map((srv, idx) => (
                        <div key={idx} className="flex flex-row md:flex-col items-start md:p-7 p-4 rounded-2xl md:rounded-3xl transition-all duration-300 hover:shadow-lg md:hover:-translate-y-1 bg-white border border-slate-100 shadow-sm md:shadow-[0_4px_16px_rgba(8,15,40,0.03)]">
                            {/* Icon */}
                            <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center ml-4 md:ml-0 md:mb-5 transition-transform duration-300 md:group-hover:scale-110"
                                style={{ background: srv.accentBg }}>
                                {srv.icon}
                            </div>
                            {/* Text */}
                            <div className="flex-1 min-w-0 text-right">
                                <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 leading-snug" style={{ color: "#080F28" }}>{srv.title}</h3>
                                <p className="text-[13px] md:text-sm leading-relaxed" style={{ color: "#5A6A88" }}>{srv.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
