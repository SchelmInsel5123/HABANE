import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import getImageUrl from '../lib/imageUtils';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#" className="navbar__logo" id="nav-logo">
          <img src={getImageUrl('/Media/LOGOHABANE.png')} alt="agrandir grand font" className="navbar__logo-img" />
          <span className="navbar__logo-text">agrandir grand font</span>
        </a>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <a href="#features" className="navbar__link" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="navbar__link" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#lifestyle" className="navbar__link" onClick={() => setMenuOpen(false)}>Lifestyle</a>
          <a href="#trust" className="navbar__link" onClick={() => setMenuOpen(false)}>About</a>
        </div>

        <div className="navbar__actions">
          <Link to="/Explore" className="btn btn-primary navbar__cta" id="nav-shop-btn">Shop Now</Link>
        </div>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="nav-burger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
