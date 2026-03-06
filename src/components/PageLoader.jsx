import { useEffect, useState } from 'react';
import './PageLoader.css';

export default function PageLoader({ onComplete }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Total animation: ~6.5s for letters + tagline, then 1s fade out
    const timer = setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
    }, 7000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`page-loader ${hidden ? 'page-loader--hidden' : ''}`}>
      <svg className="loader-svg" viewBox="0 0 820 160" xmlns="http://www.w3.org/2000/svg">
        <text className="loader-letter" x="0" y="130" style={{ animationDelay: '0s, 0.7s' }}>H</text>
        <text className="loader-letter" x="125" y="130" style={{ animationDelay: '0.8s, 1.5s' }}>A</text>
        <text className="loader-letter" x="250" y="130" style={{ animationDelay: '1.6s, 2.3s' }}>B</text>
        <text className="loader-letter" x="375" y="130" style={{ animationDelay: '2.4s, 3.1s' }}>Ä</text>
        <text className="loader-letter" x="510" y="130" style={{ animationDelay: '3.2s, 3.9s' }}>N</text>
        <text className="loader-letter" x="650" y="130" style={{ animationDelay: '4.0s, 4.7s' }}>E</text>
      </svg>
      <div className="loader-tagline">The Future of Smart Mobility</div>
    </div>
  );
}
