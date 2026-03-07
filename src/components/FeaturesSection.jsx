import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import getImageUrl from '../lib/imageUtils';
import './FeaturesSection.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 'ai-motion',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="20" />
        <path d="M24 4c0 11.046-8.954 20-20 20" />
        <path d="M24 4c0 11.046 8.954 20 20 20" />
        <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    title: 'AI Motion Assist',
    description: 'Your suitcase moves with you automatically, eliminating the need to pull or carry it.',
    image: getImageUrl('/Media/suitcase-wheels.png')
  },
  {
    id: 'navigation',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 4L4 44h40L24 4z" />
        <circle cx="24" cy="28" r="4" />
        <line x1="24" y1="12" x2="24" y2="22" />
      </svg>
    ),
    title: 'Intelligent Navigation',
    description: 'Advanced sensors help agrandir grand font navigate crowded environments smoothly and safely.',
    image: getImageUrl('/Media/handle-detail.png')
  },
  {
    id: 'design',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="8" width="32" height="32" rx="4" />
        <line x1="8" y1="20" x2="40" y2="20" />
        <line x1="20" y1="20" x2="20" y2="40" />
      </svg>
    ),
    title: 'Premium German Design',
    description: 'Minimalist design engineered for durability, performance, and modern travel.',
    image: getImageUrl('/Media/polycarbonate-texture.png')
  },
  {
    id: 'smart',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" />
        <path d="M16 24l4 4 8-8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Smart Travel Experience',
    description: 'Technology and travel combine to create the most convenient luggage ever built.',
    image: getImageUrl('/Media/suitcase-lock.png')
  }
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger cards in
      gsap.fromTo('.feature-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.features__grid',
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Heading reveal
      gsap.fromTo('.features__header',
        { y: 50, opacity: 0 },
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
    <section ref={sectionRef} className="features section section-darker" id="features">
      <div className="grid-bg"></div>
      <div className="container">
        <div className="features__header">
          <span className="label">Features</span>
          <h2 className="headline-lg">Built for the <span className="gold-text">Future</span></h2>
          <p className="body-lg" style={{ maxWidth: '560px', marginTop: '16px' }}>
            Every detail engineered to transform the way you move through the world.
          </p>
        </div>

        <div className="features__grid">
          {features.map((f, i) => (
            <div key={f.id} className="feature-card glass-card" id={`feature-${f.id}`}>
              <div className="feature-card__number">0{i + 1}</div>
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="headline-sm feature-card__title">{f.title}</h3>
              <p className="body-md feature-card__desc">{f.description}</p>
              <div className="feature-card__image-wrap">
                <img src={f.image} alt={f.title} className="feature-card__image" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
