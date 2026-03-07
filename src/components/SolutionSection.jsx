import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import getImageUrl from '../lib/imageUtils';
import './SolutionSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function SolutionSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Product scale-in reveal
      gsap.fromTo('.solution__product-img',
        { scale: 0.6, opacity: 0, rotateY: 15 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 15%',
            scrub: 1.2,
          }
        }
      );

      // Text slides in from left
      gsap.fromTo('.solution__text',
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );

      // Floating particles behind product
      gsap.to('.solution__glow', {
        scale: 1.2,
        opacity: 0.15,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="solution section section-dark" id="solution">
      <div className="solution__glow glow-dot glow-dot-gold"></div>
      
      <div className="container solution__grid">
        <div className="solution__text">
          <span className="label">The Solution</span>
          <h2 className="headline-lg">
            Meet <span className="gold-text">HABÄNE</span>
          </h2>
          <p className="body-lg">
            HABÄNE is not just luggage. It's an AI-powered travel companion designed 
            to move with you and simplify every step of your journey.
          </p>
          <p className="body-lg">
            Powered by intelligent motion technology, HABÄNE follows your movement 
            and adapts to your pace — giving you true hands-free travel.
          </p>
          <div className="solution__badge">
            <div className="solution__badge-dot"></div>
            <span>Welcome to the future of luggage</span>
          </div>
        </div>

        <div className="solution__product">
          <div className="solution__product-frame">
            <img src={getImageUrl('/Paralex_Media/2.png')} alt="HABÄNE - 3/4 view" className="solution__product-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
