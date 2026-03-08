import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import FeaturesSection from '../components/FeaturesSection';
import ParallaxInterstitial from '../components/ParallaxInterstitial';
import BenefitsSection from '../components/BenefitsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import LifestyleSection from '../components/LifestyleSection';
import TrustSection from '../components/TrustSection';
import CTASection from '../components/CTASection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh ScrollTrigger after mount
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, []);

  return (
    <>
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <ParallaxInterstitial />
        <BenefitsSection />
        <HowItWorksSection />
        <LifestyleSection />
        <TrustSection />
        <CTASection />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
