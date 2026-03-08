import { useState, useEffect } from 'react';
import './CookieBanner.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

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
            We use technically necessary cookies to ensure the proper functioning of this website.
            No tracking or analytics cookies are used.
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button onClick={handleDecline} className="cookie-banner__btn cookie-banner__btn--secondary">
            Decline
          </button>
          <button onClick={handleAccept} className="cookie-banner__btn cookie-banner__btn--primary">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
