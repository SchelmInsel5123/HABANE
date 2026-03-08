import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TeamSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.team__card');

      gsap.fromTo(cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const teamImage = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200';

  const founders = [
    {
      name: 'Dr. Michael Schmidt',
      role: 'CEO & Co-Founder',
      bio: 'Former robotics engineer at BMW with 15 years of experience in AI-powered mobility solutions. Holds a PhD in Mechanical Engineering from TU Munich.',
      linkedin: '#'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO & Co-Founder',
      bio: 'AI researcher and former lead engineer at Tesla. Specializes in autonomous systems and machine learning. MIT graduate with multiple patents in smart mobility.',
      linkedin: '#'
    },
    {
      name: 'Lucas Hoffmann',
      role: 'CPO & Co-Founder',
      bio: 'Industrial designer with a passion for merging technology and aesthetics. Previously designed premium luggage for luxury brands. Graduated from Bauhaus University.',
      linkedin: '#'
    }
  ];

  return (
    <section ref={sectionRef} className="team section" id="team">
      <div className="container">
        <div className="team__header">
          <span className="label">Our Team</span>
          <h2 className="headline-lg">Meet the Founders</h2>
          <p className="body-lg team__description">
            The visionaries behind HABÄNE, combining decades of expertise in AI,
            robotics, and design to revolutionize the way we travel.
          </p>
        </div>

        <div className="team__layout">
          <div className="team__image-container">
            <img src={teamImage} alt="HABÄNE Founders" className="team__photo" />
            <div className="team__photo-overlay"></div>
          </div>

          <div className="team__grid">
            {founders.map((founder, index) => (
              <div key={index} className="team__card">
                <div className="team__content">
                  <h3 className="team__name">{founder.name}</h3>
                  <p className="team__role">{founder.role}</p>
                  <p className="team__bio">{founder.bio}</p>
                  <a href={founder.linkedin} className="team__social" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="3"/>
                      <line x1="8" y1="11" x2="8" y2="16"/>
                      <line x1="8" y1="8" x2="8" y2="8.01" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M12 16v-5c0-1 .5-2 2-2s2 1 2 2v5"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
