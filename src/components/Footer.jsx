import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import getImageUrl from '../lib/imageUtils';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useTranslation();

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
              <img src={getImageUrl('/Media/LOGOHABANE.png')} alt="HABÄNE" className="footer__logo-img" />
              <span className="footer__logo-text">HABÄNE</span>
            </div>
            <p className="body-md footer__tagline">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">{t('footer.company')}</h4>
            <a href="#" className="footer__link">{t('footer.about')}</a>
            <Link to="/contact" className="footer__link">{t('footer.contact')}</Link>
            <Link to="/newsletter" className="footer__link">{t('footer.newsletter')}</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">{t('footer.legal')}</h4>
            <Link to="/terms" className="footer__link">{t('footer.terms')}</Link>
            <Link to="/privacy" className="footer__link">{t('footer.privacy')}</Link>
            <Link to="/impressum" className="footer__link">{t('footer.impressum')}</Link>
          </div>

          <div className="footer__newsletter">
            <h4 className="footer__links-title">{t('footer.newsletter')}</h4>
            <p className="body-md footer__newsletter-desc">
              {t('newsletter.subtitle')}
            </p>
            <form className="footer__form" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="footer__input"
                id="footer-email"
                required
              />
              <button type="submit" className="btn btn-primary footer__submit" id="footer-subscribe-btn">
                {subscribed ? '✓' : t('newsletter.button')}
              </button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright-wrapper">
            <p className="footer__copyright">
              © 2026 HABÄNE. {t('footer.rights')}
            </p>
            <p className="footer__disclaimer">
              Product visuals may represent prototypes or conceptual designs.
            </p>
          </div>
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
