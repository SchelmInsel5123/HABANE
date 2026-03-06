import { useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/Media/LOGOHABANE.png" alt="HABÄNE" className="footer__logo-img" />
              <span className="footer__logo-text">HABÄNE</span>
            </div>
            <p className="body-md footer__tagline">
              The world's first true AI travel companion.<br/>
              Engineered in Germany.
            </p>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Company</h4>
            <a href="#" className="footer__link">About Us</a>
            <a href="#" className="footer__link">Contact</a>
            <a href="#" className="footer__link">Press</a>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">Legal</h4>
            <a href="#" className="footer__link">Terms & Conditions</a>
            <a href="#" className="footer__link">Privacy Policy</a>
            <a href="#" className="footer__link">Returns & Refunds</a>
            <a href="#" className="footer__link">Impressum</a>
          </div>

          <div className="footer__newsletter">
            <h4 className="footer__links-title">Newsletter</h4>
            <p className="body-md footer__newsletter-desc">
              Get <span className="gold-text" style={{WebkitTextFillColor: 'var(--color-gold)'}}>10% off</span> your first order and be the first to hear about new releases.
            </p>
            <form className="footer__form" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="footer__input"
                id="footer-email"
                required
              />
              <button type="submit" className="btn btn-primary footer__submit" id="footer-subscribe-btn">
                {subscribed ? '✓' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 HABÄNE. All rights reserved.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#" className="footer__social" aria-label="X">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l6.5 8L4 20h2l5.5-6.5L16 20h4l-6.5-8L20 4h-2l-5.5 6.5L8 4H4z"/>
              </svg>
            </a>
            <a href="#" className="footer__social" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="3"/>
                <line x1="8" y1="11" x2="8" y2="16"/>
                <line x1="8" y1="8" x2="8" y2="8.01" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M12 16v-5c0-1 .5-2 2-2s2 1 2 2v5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
