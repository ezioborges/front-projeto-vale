import AcolhimentoSection from "./AcolhimentoSection";
import BackgroundBlobs from "./BackgroundBlobs";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import MarketRadarSection from "./MarketRadarSection";
import SignupSection from "./SignupSection";
import TickerBar from "./TickerBar";

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
