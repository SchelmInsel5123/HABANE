import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import getImageUrl from '../lib/imageUtils';
import './HowItWorksSection.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Power On',
    description: 'Turn on agrandir grand font with one tap.',
    image: getImageUrl('/Paralex_Media/1.png'),
  },
  {
    number: '02',
    title: 'AI Detection',
    description: 'The AI system detects and tracks your movement.',
    image: getImageUrl('/Paralex_Media/3.png'),
  },
  {
    number: '03',
    title: 'Follow Mode',
    description: 'Your suitcase intelligently follows you through your journey.',
    image: getImageUrl('/Paralex_Media/2.png'),
  }
];

export default function HowItWorksSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.hiw__header',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );

      // Step cards stagger
      gsap.fromTo('.hiw-step',
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.2,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.hiw__steps',
            start: 'top 70%',
          }
        }
      );

      // Connecting line draw
      gsap.fromTo('.hiw__connector-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: '.hiw__steps',
            start: 'top 60%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hiw section section-darker" id="how-it-works">
      <div className="container">
        <div className="hiw__header">
          <span className="label">How It Works</span>
          <h2 className="headline-lg">
            Three Simple <span className="gold-text">Steps</span>
          </h2>
          <p className="body-lg">Effortless travel starts instantly.</p>
        </div>

        <div className="hiw__steps-wrapper">
          <div className="hiw__connector">
            <div className="hiw__connector-line"></div>
          </div>
          <div className="hiw__steps">
            {steps.map((step) => (
              <div key={step.number} className="hiw-step" id={`step-${step.number}`}>
                <div className="hiw-step__image-wrap">
                  <img src={step.image} alt={step.title} className="hiw-step__image" />
                  <div className="hiw-step__image-glow"></div>
                </div>
                <div className="hiw-step__number">{step.number}</div>
                <h3 className="headline-sm hiw-step__title">{step.title}</h3>
                <p className="body-md hiw-step__desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
