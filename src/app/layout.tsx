import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "د. وائل البنا - عيادة الباطنة والغدد الصماء",
  description: "الموقع الرسمي لعيادة الدكتور وائل البنا، استشاري الباطنة والغدد الصماء. حجز المواعيد والاستشارات الطبية.",
  openGraph: {
    title: "د. وائل البنا - عيادة الباطنة والغدد الصماء",
    description: "استشارة طبية عبر الإنترنت. تشخيص دقيق ومتابعة للسيطرة على السكر والغدد.",
    url: "https://dr-wael.vercel.app", 
    siteName: "عيادة د. وائل البنا",
    images: [
      {
        url: "/doctor.jpg", 
        width: 800,
        height: 600,
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${cairo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
