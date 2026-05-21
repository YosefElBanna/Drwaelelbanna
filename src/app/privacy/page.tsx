import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DOCTOR_NAME } from '@/lib/constants';

export const metadata = {
  title: `سياسة الخصوصية | ${DOCTOR_NAME}`,
  description: 'سياسة الخصوصية لعيادة د. وائل البنا توضح كيفية حماية بيانات المرضى واستخدامها.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[#1447E6] hover:text-[#080F28] font-bold mb-8 transition-colors">
          <ArrowRight className="w-5 h-5" />
          العودة للرئيسية
        </Link>
        
        <h1 className="text-3xl font-extrabold text-[#080F28] mb-6">سياسة الخصوصية</h1>
        <p className="text-[#5A6A88] mb-8 font-medium">آخر تحديث: مايو 2026</p>
        
        <div className="space-y-8 text-[#3D4D6B] leading-relaxed font-medium">
          <section>
            <h2 className="text-xl font-bold text-[#080F28] mb-4">1. مقدمة</h2>
            <p>
              نحن في عيادة {DOCTOR_NAME} نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا عند استخدامك لموقعنا الإلكتروني لغرض حجز المواعيد.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-[#080F28] mb-4">2. المعلومات التي نجمعها</h2>
            <p className="mb-3">نقوم بجمع المعلومات الضرورية فقط لإتمام عملية الحجز وتقديم الرعاية الطبية المناسبة، وتشمل:</p>
            <ul className="list-disc list-inside space-y-2 pr-4">
              <li>الاسم المكتمل</li>
              <li>رقم الهاتف للتواصل وتأكيد الحجز</li>
              <li>بيانات الدفع (تتم معالجتها بشكل آمن ومشفّر عبر بوابة PayTabs ولا نحتفظ بتفاصيل بطاقتك الائتمانية في خوادمنا نهائياً)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#080F28] mb-4">3. كيف نستخدم معلوماتك</h2>
            <ul className="list-disc list-inside space-y-2 pr-4">
              <li>تأكيد وجدولة المواعيد الطبية الخاصة بك.</li>
              <li>التواصل معك في حالات الطوارئ أو لتعديل المواعيد.</li>
              <li>تحسين جودة الخدمات الطبية والتنظيمية المقدمة.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#080F28] mb-4">4. حماية البيانات</h2>
            <p>
              نحن نتخذ كافة التدابير التقنية والأمنية المعيارية لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف. يتم نقل جميع بياناتك عبر اتصالات آمنة (HTTPS).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#080F28] mb-4">5. مشاركة المعلومات</h2>
            <p>
              نحن لا نقوم ببيع أو تأجير أو مشاركة بياناتك الشخصية لأي أطراف خارجية لأغراض تسويقية. قد نشارك بعض البيانات فقط مع مزودي الخدمات الموثوقين (مثل بوابة الدفع الإلكتروني) بالقدر اللازم لإتمام معاملاتك وحجوزاتك.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#080F28] mb-4">6. موافقتك</h2>
            <p>
              باستخدامك لموقعنا الإلكتروني وقيامك بالحجز، فإنك توافق صراحةً على سياسة الخصوصية هذه وشروط معالجة البيانات الموضحة أعلاه.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
