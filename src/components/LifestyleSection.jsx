import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import getImageUrl from '../lib/imageUtils';
import './LifestyleSection.css';

gsap.registerPlugin(ScrollTrigger);

const personas = [
  { icon: '✈️', label: 'Business travelers' },
  { icon: '🌍', label: 'Frequent flyers' },
  { icon: '⚡', label: 'Tech enthusiasts' },
  { icon: '🧭', label: 'Modern explorers' },
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
