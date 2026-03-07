import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import getImageUrl from '../lib/imageUtils';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const productRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Product float animation
      gsap.fromTo(productRef.current, 
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out', delay: 0.3 }
      );

      // Continuous floating
      gsap.to(productRef.current, {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.8
      });

      // Text reveal
      const textElements = textRef.current.querySelectorAll('.hero__reveal');
      gsap.fromTo(textElements,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.12, delay: 0.1 }
      );

      // Parallax on scroll
      gsap.to(productRef.current, {
        y: -120,
        scale: 0.85,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      });

      gsap.to(textRef.current, {
        y: -60,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: '20% top',
          end: '60% top',
          scrub: 1,
        }
      });

      // Glow pulses
      gsap.to('.hero__glow-1', {
        scale: 1.3,
        opacity: 0.12,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('.hero__glow-2', {
        scale: 1.2,
        opacity: 0.08,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero section" id="hero">
      {/* Background effects */}
      <div className="grid-bg"></div>
      <div className="hero__glow-1 glow-dot glow-dot-gold"></div>
      <div className="hero__glow-2 glow-dot glow-dot-blue"></div>
      <div className="hero__gradient-line"></div>

      <div className="hero__content container">
        <div ref={textRef} className="hero__text">
          <div className="hero__reveal">
            <span className="label">Engineered in Germany</span>
          </div>
          <h1 className="hero__reveal headline-xl">
            The World's First<br/>
            <span className="gold-text">True AI Travel</span><br/>
            Companion
          </h1>
          <p className="hero__reveal body-lg hero__description">
            Meet agrandir grand font — the intelligent suitcase that moves with you, assists you,
            and transforms the way you travel. Powered by advanced AI motion technology.
          </p>

          <div className="hero__reveal hero__features">
            <div className="hero__feature">
              <svg className="hero__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              <span>AI-Powered Motion</span>
            </div>
            <div className="hero__feature">
              <svg className="hero__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Smart Lock System</span>
            </div>
            <div className="hero__feature">
              <svg className="hero__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
                <line x1="16" y1="8" x2="2" y2="22"/>
                <line x1="17.5" y1="15" x2="9" y2="15"/>
              </svg>
              <span>Durable Polycarbonate</span>
            </div>
            <div className="hero__feature">
              <svg className="hero__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>10-Hour Battery Life</span>
            </div>
          </div>

          <div className="hero__reveal hero__ctas">
            <Link to="/Explore" className="btn btn-primary" id="hero-shop-btn">
              Shop Now
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a href="#demo" className="btn btn-secondary" id="hero-demo-btn">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Watch Demo
            </a>
          </div>
        </div>

        <div ref={productRef} className="hero__product">
          <div className="hero__product-glow"></div>
          <img src={getImageUrl('/Paralex_Media/1.png')} alt="agrandir grand font AI Suitcase" className="hero__product-img" />
          <div className="hero__product-reflection"></div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
