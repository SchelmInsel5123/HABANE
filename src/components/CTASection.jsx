import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CTASection.css';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta__content > *',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
        }
      );

      // Background pulse
      gsap.to('.cta__glow-ring', {
        scale: 1.3,
        opacity: 0.06,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btnRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <section ref={sectionRef} className="cta-section section" id="cta">
      <div className="cta__bg">
        <div className="cta__glow-ring"></div>
        <div className="cta__glow-ring cta__glow-ring-2"></div>
        <div className="grid-bg"></div>
      </div>
      
      <div className="container cta__content">
        <span className="label">Stay Updated</span>
        <h2 className="headline-xl">
          Sei der Erste<br/>
          <span className="gold-text">Beim Launch</span>
        </h2>
        <p className="body-lg cta__desc">
          Melde dich für unseren exklusiven Newsletter an und erlebe HABÄNE als Erster.
        </p>
        <div
          className="cta__btn-wrapper"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Link ref={btnRef} to="/newsletter" className="btn btn-primary cta__btn">
            Zum Newsletter
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
