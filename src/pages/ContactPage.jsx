import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import './ContactPage.css';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, []);

  return (
    <>
      <main className="contact-page">
        <div className="contact-page__spacer"></div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
