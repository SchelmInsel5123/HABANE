import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import getImageUrl from '../lib/imageUtils';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/');
    }
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__logo" id="nav-logo" onClick={handleLogoClick}>
          <img src={getImageUrl('/Media/LOGOHABANE.png')} alt="HABÄNE" className="navbar__logo-img" />
          <span className="navbar__logo-text">HABÄNE</span>
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
