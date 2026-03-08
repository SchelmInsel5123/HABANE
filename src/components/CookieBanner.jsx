import { useState, useEffect } from 'react';
import './CookieBanner.css';

const translations = {
  de: {
    text: 'Wir verwenden technisch notwendige Cookies, um die ordnungsgemäße Funktion dieser Website zu gewährleisten. Es werden keine Tracking- oder Analyse-Cookies verwendet.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen'
  },
  en: {
    text: 'We use technically necessary cookies to ensure the proper functioning of this website. No tracking or analytics cookies are used.',
    accept: 'Accept',
    decline: 'Decline'
  }
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }

    // Detect user's preferred language
    const userLang = navigator.language || navigator.userLanguage;
    const isGerman = userLang.toLowerCase().startsWith('de');
    setLang(isGerman ? 'de' : 'en');
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const t = translations[lang];

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__content">
        <div className="cookie-banner__text">
          <p className="body-md">
            {t.text}
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button onClick={handleDecline} className="cookie-banner__btn cookie-banner__btn--secondary">
            {t.decline}
          </button>
          <button onClick={handleAccept} className="cookie-banner__btn cookie-banner__btn--primary">
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
