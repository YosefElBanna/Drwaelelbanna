import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "استشاري غدد صماء وسكر أونلاين | د. وائل البنا - استشارة أونلاين للخليج والوطن العربي",
  description: "استشارة أونلاين عبر Zoom مع د. وائل البنا، استشاري الغدد الصماء والسكر بخبرة أكثر من 20 سنة. متابعة السكر، الغدة الدرقية، واضطرابات الهرمونات من أي مكان في الخليج.",
  openGraph: {
    title: "استشاري غدد صماء وسكر أونلاين | د. وائل البنا",
    description: "استشارة أونلاين عبر Zoom مع د. وائل البنا، استشاري الغدد الصماء والسكر بخبرة أكثر من 20 سنة. متابعة السكر، الغدة الدرقية، واضطرابات الهرمونات من أي مكان في الخليج.",
    url: "https://dr-waelbanna.vercel.app", 
    siteName: "عيادة د. وائل البنا أونلاين",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "د. وائل البنا",
  "medicalSpecialty": "Endocrine",
  "description": "استشاري غدد صماء وسكر بخبرة أكثر من 20 سنة. تقديم استشارات أونلاين ومتابعة لمرضى الخليج والوطن العربي.",
  "image": "https://dr-waelbanna.vercel.app/doctor.jpg",
  "url": "https://dr-waelbanna.vercel.app",
  "telephone": "+201000000000", // سيتم استخدام رقم الواتساب لو موجود، هنا كقيمة افتراضية
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Online",
    "addressCountry": "EG"
  },
  "isAcceptingNewPatients": true,
  "availableService": {
    "@type": "MedicalTest",
    "name": "استشارة طبية أونلاين عبر Zoom"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cairo.variable} antialiased`}>
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
