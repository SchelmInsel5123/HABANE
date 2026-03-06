import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ParallaxInterstitial.css';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxInterstitial() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;

      // Orbit ring rotations driven by scroll
      gsap.to('.pi__orbit-ring-1', {
        rotateZ: 360,
        rotateX: 15,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });

      gsap.to('.pi__orbit-ring-2', {
        rotateZ: -270,
        rotateY: 20,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3,
        }
      });

      gsap.to('.pi__orbit-ring-3', {
        rotateZ: 200,
        rotateX: -25,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Central product parallax — rises slower than scroll
      gsap.fromTo('.pi__product',
        { y: 120, scale: 0.7, opacity: 0 },
        {
          y: -80,
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1.5,
          }
        }
      );

      // Floating tech panels at different speeds
      gsap.fromTo('.pi__panel-1',
        { y: 200, x: -40, rotateY: -30, opacity: 0 },
        {
          y: -150, x: 0, rotateY: 0, opacity: 1,
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 2 }
        }
      );

      gsap.fromTo('.pi__panel-2',
        { y: 250, x: 50, rotateY: 25, opacity: 0 },
        {
          y: -120, x: 0, rotateY: 0, opacity: 1,
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 2.5 }
        }
      );

      gsap.fromTo('.pi__panel-3',
        { y: 180, x: -20, opacity: 0 },
        {
          y: -180, x: 20, opacity: 0.7,
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.8 }
        }
      );

      // Circuit line draw animation
      gsap.fromTo('.pi__circuit-path',
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          }
        }
      );

      // Data dots stagger in
      gsap.fromTo('.pi__data-dot',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );

      // Headline split reveal
      gsap.fromTo('.pi__text-line',
        { y: 40, opacity: 0, skewY: 3 },
        {
          y: 0, opacity: 1, skewY: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.pi__text',
            start: 'top 75%',
            end: 'top 45%',
            scrub: 1,
          }
        }
      );

      // Glow pulsing
      gsap.to('.pi__central-glow', {
        scale: 1.4,
        opacity: 0.2,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pi section" id="parallax-interstitial">
      {/* Background layers */}
      <div className="pi__bg">
        <div className="pi__noise"></div>
        <div className="pi__gradient-top"></div>
        <div className="pi__gradient-bottom"></div>
      </div>

      {/* 3D Scene */}
      <div className="pi__scene">
        {/* Central glow */}
        <div className="pi__central-glow"></div>

        {/* Orbit rings */}
        <div className="pi__orbit-ring pi__orbit-ring-1">
          <div className="pi__orbit-dot pi__orbit-dot-1"></div>
          <div className="pi__orbit-dot pi__orbit-dot-2"></div>
        </div>
        <div className="pi__orbit-ring pi__orbit-ring-2">
          <div className="pi__orbit-dot pi__orbit-dot-3"></div>
        </div>
        <div className="pi__orbit-ring pi__orbit-ring-3">
          <div className="pi__orbit-dot pi__orbit-dot-4"></div>
          <div className="pi__orbit-dot pi__orbit-dot-5"></div>
          <div className="pi__orbit-dot pi__orbit-dot-6"></div>
        </div>

        {/* Circuit board SVG */}
        <svg className="pi__circuit-svg" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main circuit paths */}
          <path className="pi__circuit-path" d="M 0 300 Q 100 280 200 300 T 400 280 T 600 320 T 800 300" stroke="rgba(201,169,110,0.2)" strokeWidth="1" strokeDasharray="1000" />
          <path className="pi__circuit-path" d="M 0 350 Q 150 320 300 350 T 500 330 T 700 360 T 800 340" stroke="rgba(201,169,110,0.12)" strokeWidth="0.5" strokeDasharray="1000" />
          <path className="pi__circuit-path" d="M 100 200 L 200 200 L 200 250 L 350 250 L 350 300" stroke="rgba(201,169,110,0.15)" strokeWidth="1" strokeDasharray="1000" />
          <path className="pi__circuit-path" d="M 700 180 L 600 180 L 600 230 L 450 230 L 450 300" stroke="rgba(201,169,110,0.15)" strokeWidth="1" strokeDasharray="1000" />
          <path className="pi__circuit-path" d="M 100 420 L 250 420 L 250 370 L 400 370" stroke="rgba(201,169,110,0.12)" strokeWidth="0.5" strokeDasharray="1000" />
          <path className="pi__circuit-path" d="M 700 430 L 550 430 L 550 380 L 400 380" stroke="rgba(201,169,110,0.12)" strokeWidth="0.5" strokeDasharray="1000" />

          {/* Data junction dots */}
          <circle className="pi__data-dot" cx="200" cy="200" r="3" fill="rgba(201,169,110,0.5)" />
          <circle className="pi__data-dot" cx="200" cy="250" r="2" fill="rgba(201,169,110,0.3)" />
          <circle className="pi__data-dot" cx="350" cy="250" r="3" fill="rgba(201,169,110,0.5)" />
          <circle className="pi__data-dot" cx="350" cy="300" r="4" fill="rgba(201,169,110,0.6)" />
          <circle className="pi__data-dot" cx="600" cy="180" r="3" fill="rgba(201,169,110,0.5)" />
          <circle className="pi__data-dot" cx="600" cy="230" r="2" fill="rgba(201,169,110,0.3)" />
          <circle className="pi__data-dot" cx="450" cy="230" r="3" fill="rgba(201,169,110,0.5)" />
          <circle className="pi__data-dot" cx="450" cy="300" r="4" fill="rgba(201,169,110,0.6)" />
          <circle className="pi__data-dot" cx="400" cy="280" r="5" fill="rgba(201,169,110,0.7)" />
          <circle className="pi__data-dot" cx="400" cy="370" r="3" fill="rgba(201,169,110,0.4)" />
          <circle className="pi__data-dot" cx="250" cy="420" r="2" fill="rgba(201,169,110,0.3)" />
          <circle className="pi__data-dot" cx="550" cy="430" r="2" fill="rgba(201,169,110,0.3)" />

          {/* Hexagonal nodes */}
          <polygon className="pi__data-dot" points="400,270 408,275 408,285 400,290 392,285 392,275" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="1" />
          <polygon className="pi__data-dot" points="400,295 406,299 406,307 400,311 394,307 394,299" fill="rgba(201,169,110,0.15)" stroke="rgba(201,169,110,0.3)" strokeWidth="0.5" />
        </svg>

        {/* Floating tech panels */}
        <div className="pi__panel pi__panel-1">
          <div className="pi__panel-inner">
            <div className="pi__panel-header">
              <div className="pi__panel-dot"></div>
              <span>AI NEURAL CORE</span>
            </div>
            <div className="pi__panel-bars">
              <div className="pi__panel-bar" style={{ width: '85%' }}></div>
              <div className="pi__panel-bar" style={{ width: '62%' }}></div>
              <div className="pi__panel-bar" style={{ width: '94%' }}></div>
              <div className="pi__panel-bar" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        <div className="pi__panel pi__panel-2">
          <div className="pi__panel-inner">
            <div className="pi__panel-header">
              <div className="pi__panel-dot"></div>
              <span>MOTION TRACKING</span>
            </div>
            <div className="pi__panel-wave">
              <svg viewBox="0 0 120 40" fill="none">
                <path d="M0 20 Q15 5 30 20 T60 20 T90 20 T120 20" stroke="rgba(201,169,110,0.5)" strokeWidth="1.5" fill="none">
                  <animate attributeName="d" values="M0 20 Q15 5 30 20 T60 20 T90 20 T120 20;M0 20 Q15 35 30 20 T60 20 T90 20 T120 20;M0 20 Q15 5 30 20 T60 20 T90 20 T120 20" dur="3s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
          </div>
        </div>

        <div className="pi__panel pi__panel-3">
          <div className="pi__panel-inner">
            <div className="pi__panel-header">
              <div className="pi__panel-dot"></div>
              <span>SENSOR ARRAY</span>
            </div>
            <div className="pi__panel-grid-dots">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="pi__panel-gdot" style={{ animationDelay: `${i * 0.15}s` }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Central product */}
        <div className="pi__product">
          <img src="/Paralex_Media/3.png" alt="HABÄNE Technology" className="pi__product-img" />
        </div>
      </div>

      {/* Text overlay */}
      <div className="pi__text container">
        <div className="pi__text-line">
          <span className="label">Intelligent Technology</span>
        </div>
        <h2 className="pi__text-line headline-lg">
          50+ Sensors. <span className="gold-text">One Mind.</span>
        </h2>
        <p className="pi__text-line body-lg" style={{ maxWidth: '480px' }}>
          Every component communicates in real-time — creating an autonomous system 
          that thinks, reacts, and moves with precision.
        </p>
      </div>

      {/* Floating particles */}
      <div className="pi__particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="pi__particle"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}
