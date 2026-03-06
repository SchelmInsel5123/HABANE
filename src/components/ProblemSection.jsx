import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProblemSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned text reveal effect
      const lines = sectionRef.current.querySelectorAll('.problem__line');
      
      lines.forEach((line, i) => {
        gsap.fromTo(line,
          { opacity: 0.08, y: 20 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.8,
            }
          }
        );
      });

      // "Until now" dramatic reveal
      gsap.fromTo('.problem__punchline', 
        { opacity: 0, scale: 0.8, letterSpacing: '0.3em' },
        {
          opacity: 1,
          scale: 1,
          letterSpacing: '0.08em',
          scrollTrigger: {
            trigger: '.problem__punchline',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="problem section section-darker" id="problem">
      <div className="container">
        <div className="problem__content">
          <span className="label problem__label">The Problem</span>
          <h2 className="headline-lg problem__heading">
            <span className="problem__line">Travel Should Feel</span>
            <span className="problem__line"><span className="gold-text">Effortless</span> —</span>
            <span className="problem__line">But It Doesn't</span>
          </h2>

          <div className="problem__text-block">
            <p className="body-lg problem__line">
              Airports, train stations, and city streets are crowded and exhausting.
            </p>
            <p className="body-lg problem__line">
              Dragging heavy luggage slows you down and turns travel into unnecessary stress.
            </p>
            <p className="body-lg problem__line" style={{ marginTop: '24px' }}>
              Traditional suitcases haven't changed in decades.
            </p>
          </div>

          <div className="problem__punchline">
            <span className="headline-md gold-text">Until now.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
