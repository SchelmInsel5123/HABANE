import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import getImageUrl from '../lib/imageUtils';
import './BenefitsSection.css';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  'Hands-free airport travel',
  'Less physical strain',
  'Faster movement through crowds',
  'Premium tech-driven experience',
  'Designed for modern travelers'
];

export default function BenefitsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger checklist items
      gsap.fromTo('.benefit-item',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.benefits__list',
            start: 'top 75%',
          }
        }
      );

      // Image parallax
      gsap.fromTo('.benefits__image-wrapper img',
        { y: 40 },
        {
          y: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        }
      );

      // Heading
      gsap.fromTo('.benefits__heading',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="benefits section section-dark" id="benefits">
      <div className="container benefits__grid">
        <div className="benefits__content">
          <div className="benefits__heading">
            <span className="label">Benefits</span>
            <h2 className="headline-lg">
              Travel Smarter.<br/>
              <span className="gold-text">Move Freely.</span>
            </h2>
          </div>

          <ul className="benefits__list">
            {benefits.map((b, i) => (
              <li key={i} className="benefit-item">
                <div className="benefit-item__check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <p className="body-lg benefits__tagline">
            With HABÄNE, you focus on the journey — not your luggage.
          </p>
        </div>

        <div className="benefits__image-wrapper">
          <img src={getImageUrl('/New_Media/Gemini_Generated_Image_3j04eg3j04eg3j04.png')} alt="Travel lifestyle" />
          <div className="benefits__image-overlay"></div>
        </div>
      </div>
    </section>
  );
}
