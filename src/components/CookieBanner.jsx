import { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './CookieBanner.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
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

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__content">
        <div className="cookie-banner__text">
          <p className="body-md">
            {t('cookies.text')}
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button onClick={handleDecline} className="cookie-banner__btn cookie-banner__btn--secondary">
            {t('cookies.decline')}
          </button>
          <button onClick={handleAccept} className="cookie-banner__btn cookie-banner__btn--primary">
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
