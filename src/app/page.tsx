
import Hero from "@/components/Hero";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Booking from "@/components/Booking";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <FAQ />
      <Booking />
      <Footer />
    </main>
  );
}
