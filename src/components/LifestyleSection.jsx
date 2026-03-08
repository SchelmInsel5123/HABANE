import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import getImageUrl from '../lib/imageUtils';
import './LifestyleSection.css';

gsap.registerPlugin(ScrollTrigger);

const personas = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 18h18M3 18v-3l9-9 9 9v3M9 11l3-3 3 3"/>
        <path d="M12 2L3 9l1.5 1.5L12 4l7.5 6.5L21 9z"/>
      </svg>
    ),
    label: 'Business travelers'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    label: 'Frequent flyers'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    label: 'Tech enthusiasts'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    label: 'Modern explorers'
  },
];

export default function LifestyleSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax images at different speeds
      gsap.fromTo('.lifestyle__img-1',
        { y: 60 },
        { y: -60, scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 } }
      );

      gsap.fromTo('.lifestyle__img-2',
        { y: 40 },
        { y: -80, scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } }
      );

      gsap.fromTo('.lifestyle__img-3',
        { y: 80 },
        { y: -40, scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 } }
      );

      // Text
      gsap.fromTo('.lifestyle__content',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.lifestyle__content', start: 'top 75%' }
        }
      );

      // Persona badges
      gsap.fromTo('.persona-badge',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.lifestyle__personas', start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="lifestyle section section-dark" id="lifestyle">
      <div className="container">
        <div className="lifestyle__gallery">
          <div className="lifestyle__img-col lifestyle__img-col-1">
            <div className="lifestyle__img-wrap lifestyle__img-1">
              <img src={getImageUrl('/Media/cobblestone-street.png')} alt="Travel lifestyle" />
            </div>
          </div>
          <div className="lifestyle__img-col lifestyle__img-col-2">
            <div className="lifestyle__img-wrap lifestyle__img-2">
              <img src={getImageUrl('/Media/suitcase-lifestyle.png')} alt="Airport lifestyle" />
            </div>
          </div>
          <div className="lifestyle__img-col lifestyle__img-col-3">
            <div className="lifestyle__img-wrap lifestyle__img-3">
              <img src={getImageUrl('/Media/hotel-room.png')} alt="Hotel lifestyle" />
            </div>
          </div>
        </div>

        <div className="lifestyle__content">
          <span className="label">Lifestyle</span>
          <h2 className="headline-lg">
            Built For<br/>
            <span className="gold-text">Modern Travel</span>
          </h2>
          <p className="body-lg">
            Whether you're navigating airports, hotels, or city streets, HABÄNE moves
            with you — making every trip smoother, lighter, and smarter.
          </p>

          <div className="lifestyle__personas">
            {personas.map((p, i) => (
              <div key={i} className="persona-badge">
                <span className="persona-badge__icon">{p.icon}</span>
                <span className="persona-badge__label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
