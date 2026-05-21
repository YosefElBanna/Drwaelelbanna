import { Stethoscope, Activity, Heart, Droplets, FlaskConical, Salad } from "lucide-react";

const services = [
    {
        icon: <Activity className="w-6 h-6" style={{ color: "#1447E6" }} />,
        title: "ضبط مستوى السكر والوقاية من المضاعفات",
        desc: "متابعة مستمرة لمستويات السكر والوقاية من التهاب الأعصاب والمضاعفات.",
        accentBg: "rgba(20,71,230,0.06)",
    },
    {
        icon: <Salad className="w-6 h-6" style={{ color: "#1447E6" }} />,
        title: "علاج السمنة ومقاومة الإنسولين",
        desc: "برامج طبية متخصصة لعلاج السمنة وتنشيط الحرق للوصول لوزن مثالي.",
        accentBg: "rgba(20,71,230,0.06)",
    },
    {
        icon: <Stethoscope className="w-6 h-6" style={{ color: "#1447E6" }} />,
        title: "التشخيص الدقيق للأمراض الباطنية المستعصية",
        desc: "نبحث عن السبب الجذري لمعاناتك المستمرة، ونضع خطة علاجية حاسمة بدلاً من المسكنات المؤقتة.",
        accentBg: "rgba(20,71,230,0.06)",
    },
    {
        icon: <Heart className="w-6 h-6" style={{ color: "#1447E6" }} />,
        title: "تنظيم ضغط الدم وحماية القلب",
        desc: "ضبط ضغط الدم لحماية صحة القلب والشرايين وتجنب الأزمات المفاجئة.",
        accentBg: "rgba(20,71,230,0.06)",
    },
    {
        icon: <Droplets className="w-6 h-6" style={{ color: "#1447E6" }} />,
        title: "تشخيص وعلاج اضطرابات الغدة الدرقية",
        desc: "تنظيم هرمونات الغدة الدرقية للتخلص من التعب المستمر وتغيرات الوزن.",
        accentBg: "rgba(20,71,230,0.06)",
    },
    {
        icon: <FlaskConical className="w-6 h-6" style={{ color: "#1447E6" }} />,
        title: "علاج الاضطرابات الهرمونية",
        desc: "تشخيص وعلاج الاضطرابات الهرمونية لاستعادة النشاط والحيوية.",
        accentBg: "rgba(20,71,230,0.06)",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-14 md:py-24 relative" style={{ background: "#FFFFFF", borderTop: "1px solid #F8FAFC", borderBottom: "1px solid #F8FAFC" }}>
            <div className="container mx-auto px-5 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#1447E6" }}>
                        خدماتنا
                    </p>
                    <h2 className="text-2xl md:text-4xl font-extrabold mb-4" style={{ color: "#080F28" }}>
                        خدمات الباطنة والغدد الصماء
                    </h2>
                    <div className="w-16 h-1 mx-auto rounded-full mb-4" style={{ background: "#1447E6" }} />
                    <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: "#5A6A88" }}>
                        جميع الخدمات متاحة عبر استشارة أونلاين من أي مكان
                    </p>
                </div>

                {/* Mobile: stacked list */}
                <div className="md:hidden space-y-3">
                    {services.map((srv, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl transition-all"
                            style={{ background: "#FFFFFF", border: "1px solid #F1F5F9", boxShadow: "0 2px 8px rgba(8,15,40,0.02)" }}>
                            {/* Icon */}
                            <div className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center"
                                style={{ background: srv.accentBg }}>
                                {srv.icon}
                            </div>
                            {/* Text */}
                            <div className="flex-1 min-w-0 text-right">
                                <h3 className="text-sm font-bold mb-1 leading-snug" style={{ color: "#080F28" }}>{srv.title}</h3>
                                <p className="text-xs leading-relaxed" style={{ color: "#5A6A88" }}>{srv.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop: 3-column grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((srv, idx) => (
                        <div key={idx} className="p-7 rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            style={{ background: "#FFFFFF", border: "1px solid #F1F5F9", boxShadow: "0 4px 16px rgba(8,15,40,0.03)" }}>
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                                style={{ background: srv.accentBg }}>
                                {srv.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 leading-snug" style={{ color: "#080F28" }}>{srv.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: "#5A6A88" }}>{srv.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
