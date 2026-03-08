import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CTASection.css';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const btnRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeStatus('');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/newsletter-subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'cta-section' }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeStatus('success');
        setEmail('');
      } else {
        setSubscribeStatus('error');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscribeStatus('error');
    } finally {
      setIsSubscribing(false);
    }
  };

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
          Be First to Know<br/>
          <span className="gold-text">When We Launch</span>
        </h2>
        <p className="body-lg cta__desc">
          Join our exclusive newsletter and be the first to experience HABÄNE when we launch.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="cta__newsletter-form">
          <div className="cta__newsletter-input-group">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="cta__newsletter-input"
              disabled={isSubscribing}
            />
            <button
              type="submit"
              className="btn btn-primary cta__newsletter-btn"
              disabled={isSubscribing}
            >
              {isSubscribing ? 'Subscribing...' : 'Get Updated'}
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
          {subscribeStatus === 'success' && (
            <p className="cta__newsletter-message cta__newsletter-message--success">
              Thanks for subscribing! We'll keep you updated.
            </p>
          )}
          {subscribeStatus === 'error' && (
            <p className="cta__newsletter-message cta__newsletter-message--error">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
