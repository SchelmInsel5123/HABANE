import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAllProducts } from '../services/productService';
import './ExplorePage.css';

gsap.registerPlugin(ScrollTrigger);

export default function ExplorePage() {
  const pageRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    if (loading || products.length === 0) return;

    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo('.explore__header > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'expo.out', delay: 0.2 }
      );

      gsap.fromTo('.product-card-explore',
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'expo.out',
          delay: 0.5,
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [loading, products]);

  if (loading) {
    return (
      <div ref={pageRef} className="explore-page">
        <div className="grid-bg"></div>
        <div className="explore__header container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="body-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="explore-page">
      <div className="grid-bg"></div>
      <div className="explore__glow glow-dot glow-dot-gold"></div>

      <div className="explore__header container">
        <Link to="/" className="explore__back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>
        <span className="label">The Collection</span>
        <h1 className="headline-xl">
          Explore <span className="gold-text">agrandir grand font</span>
        </h1>
        <p className="body-lg explore__subtitle">
          Discover our range of AI-powered smart luggage — engineered for the modern traveler.
        </p>
      </div>

      <div className="explore__grid container">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/Explore/${product.id}`}
            className="product-card-explore"
            id={`explore-card-${product.id}`}
          >
            <div className="product-card-explore__badge">{product.badge}</div>

            <div className="product-card-explore__image-wrap">
              <div className="product-card-explore__image-glow" style={{ background: `radial-gradient(circle, ${product.color}15 0%, transparent 70%)` }}></div>
              <img
                src={product.heroImage}
                alt={product.name}
                className="product-card-explore__image"
              />
            </div>

            <div className="product-card-explore__info">
              <span className="product-card-explore__tagline">{product.tagline}</span>
              <h2 className="headline-md product-card-explore__name">{product.name}</h2>
              <p className="body-md product-card-explore__desc">{product.shortDescription}</p>

              <div className="product-card-explore__bottom">
                <div className="product-card-explore__pricing">
                  <span className="product-card-explore__price">{product.price}</span>
                  <span className="product-card-explore__original-price">{product.originalPrice}</span>
                </div>
                <span className="product-card-explore__cta">
                  View Details
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
