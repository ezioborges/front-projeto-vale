import AcolhimentoSection from "@/src/components/landing/AcolhimentoSection";
import BackgroundBlobs from "@/src/components/landing/BackgroundBlobs";
import Footer from "@/src/components/landing/Footer";
import Header from "@/src/components/landing/Header";
import HeroSection from "@/src/components/landing/HeroSection";
import MarketRadarSection from "@/src/components/landing/MarketRadarSection";
import SignupSection from "@/src/components/landing/SignupSection";
import TickerBar from "@/src/components/landing/TickerBar";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-800 antialiased">
      <BackgroundBlobs />
      <TickerBar />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <MarketRadarSection />
        <AcolhimentoSection />
        <SignupSection />
      </main>
      <Footer />
    </div>
  );
}
