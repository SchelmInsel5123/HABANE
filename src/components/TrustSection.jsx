import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TrustSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function TrustSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.trust__content > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      );

      // Stats count up
      const statValues = sectionRef.current.querySelectorAll('.trust-stat__value');
      statValues.forEach(el => {
        const target = parseInt(el.dataset.value);
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: { trigger: el, start: 'top 80%' },
          onUpdate: function() {
            el.textContent = Math.round(gsap.getProperty(el, 'innerText'));
            if (el.dataset.suffix) el.textContent += el.dataset.suffix;
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="trust section section-darker" id="trust">
      <div className="grid-bg"></div>
      <div className="container trust__content">
        <span className="label">Trust & Quality</span>
        <h2 className="headline-lg">
          Designed in<br/>
          <span className="gold-text">Germany</span>
        </h2>
        <p className="body-lg trust__desc">
          Built with precision engineering and modern technology to deliver 
          the next generation of travel. Trusted by early adopters and technology 
          enthusiasts who demand smarter solutions.
        </p>

        <div className="trust__stats">
          <div className="trust-stat glass-card">
            <span className="trust-stat__value" data-value="97" data-suffix="%">0</span>
            <span className="trust-stat__label">Customer Satisfaction</span>
          </div>
          <div className="trust-stat glass-card">
            <span className="trust-stat__value" data-value="50" data-suffix="+">0</span>
            <span className="trust-stat__label">AI Sensors</span>
          </div>
          <div className="trust-stat glass-card">
            <span className="trust-stat__value" data-value="12" data-suffix="h">0</span>
            <span className="trust-stat__label">Battery Life</span>
          </div>
          <div className="trust-stat glass-card">
            <span className="trust-stat__value" data-value="3" data-suffix=" yr">0</span>
            <span className="trust-stat__label">Warranty</span>
          </div>
        </div>

        <div className="trust__badges">
          <div className="trust-badge">
            <span className="trust-badge__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18"/>
                <circle cx="8" cy="15" r="1" fill="currentColor"/>
                <circle cx="12" cy="15" r="1" fill="currentColor"/>
                <circle cx="16" cy="15" r="1" fill="currentColor"/>
              </svg>
            </span>
            <span>Engineered in Germany</span>
          </div>
          <div className="trust-badge">
            <span className="trust-badge__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="11" width="14" height="10" rx="2"/>
                <path d="M12 17a1 1 0 1 0 0-2 1 0 0 0 0 2z" fill="currentColor"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <span>TSA Approved Lock</span>
          </div>
          <div className="trust-badge">
            <span className="trust-badge__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 1l4 4-4 4"/>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                <path d="M7 23l-4-4 4-4"/>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
              </svg>
            </span>
            <span>Sustainable Materials</span>
          </div>
        </div>
      </div>
    </section>
  );
}
