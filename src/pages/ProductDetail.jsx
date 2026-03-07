import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProductBySlug } from '../services/productService';
import './ProductDetail.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const pageRef = useRef(null);
  const productViewerRef = useRef(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductBySlug(productId);
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  useEffect(() => {
    if (!product) return;

    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Entry animations
      gsap.fromTo('.pd__breadcrumb',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 0.1 }
      );

      gsap.fromTo('.pd__viewer',
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 }
      );

      gsap.fromTo('.pd__info > *',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'expo.out', delay: 0.3 }
      );

      // Story section scroll reveal
      gsap.fromTo('.pd__story-content > *',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: '.pd__story', start: 'top 65%' }
        }
      );

      // Specs grid reveal
      gsap.fromTo('.pd__spec-item',
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: '.pd__specs', start: 'top 70%' }
        }
      );

      // Features list
      gsap.fromTo('.pd__feature-item',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: '.pd__features', start: 'top 70%' }
        }
      );

      // Image gallery parallax
      gsap.fromTo('.pd__gallery-image',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: '.pd__gallery', start: 'top 70%' }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [product]);

  // 3D spin simulation
  useEffect(() => {
    if (!isSpinning || !product) return;

    const imageCount = product.images.length;
    let frame = activeImage;
    const interval = setInterval(() => {
      frame = (frame + 1) % imageCount;
      setActiveImage(frame);
    }, 600);

    const timeout = setTimeout(() => {
      setIsSpinning(false);
      clearInterval(interval);
    }, imageCount * 600);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isSpinning]);

  if (loading) {
    return (
      <div className="pd-notfound">
        <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="body-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-notfound">
        <div className="container">
          <h1 className="headline-lg">Product not found</h1>
          <Link to="/Explore" className="btn btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="product-detail">
      <div className="grid-bg"></div>

      {/* Breadcrumb */}
      <div className="pd__breadcrumb container">
        <Link to="/" className="pd__crumb">Home</Link>
        <span className="pd__crumb-sep">/</span>
        <Link to="/Explore" className="pd__crumb">Explore</Link>
        <span className="pd__crumb-sep">/</span>
        <span className="pd__crumb pd__crumb--active">{product.name}</span>
      </div>

      {/* Product Hero */}
      <section className="pd__hero container">
        <div className="pd__viewer" ref={productViewerRef}>
          <div className="pd__viewer-glow" style={{ background: `radial-gradient(circle, ${product.color}12 0%, transparent 70%)` }}></div>
          
          {/* Main image */}
          <div className="pd__main-image-wrap">
            <img
              src={product.images[activeImage]}
              alt={`${product.name} view ${activeImage + 1}`}
              className="pd__main-image"
              key={activeImage}
            />
          </div>

          {/* 3D spin button */}
          <button
            className={`pd__spin-btn ${isSpinning ? 'pd__spin-btn--active' : ''}`}
            onClick={() => { setIsSpinning(true); }}
            id="product-spin-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-3-6.7"/>
              <path d="M21 3v5h-5"/>
            </svg>
            360° View
          </button>

          {/* Thumbnails */}
          <div className="pd__thumbnails">
            {product.images.map((img, i) => (
              <button
                key={i}
                className={`pd__thumb ${i === activeImage ? 'pd__thumb--active' : ''}`}
                onClick={() => { setActiveImage(i); setIsSpinning(false); }}
              >
                <img src={img} alt={`Thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="pd__info">
          <div className="pd__badge-wrap">
            <span className="pd__badge">{product.badge}</span>
          </div>
          <span className="pd__tagline">{product.tagline}</span>
          <h1 className="headline-xl pd__name">{product.name}</h1>
          <p className="body-lg pd__description">{product.shortDescription}</p>

          <div className="pd__pricing">
            <span className="pd__price">{product.price}</span>
            <span className="pd__original-price">{product.originalPrice}</span>
            <span className="pd__savings">Save {Math.round((1 - parseInt(product.price.replace(/[^\d]/g, '')) / parseInt(product.originalPrice.replace(/[^\d]/g, ''))) * 100)}%</span>
          </div>

          <div className="pd__actions">
            <button className="btn btn-primary pd__buy-btn" id="product-buy-btn">
              Add to Cart
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
            </button>
            <button className="btn btn-secondary pd__wishlist-btn" id="product-wishlist-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>
          </div>

          <div className="pd__quick-specs">
            {product.specs.slice(0, 4).map((s, i) => (
              <div key={i} className="pd__quick-spec">
                <span className="pd__quick-spec-value">{s.value}</span>
                <span className="pd__quick-spec-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="pd__story section section-darker">
        <div className="container pd__story-grid">
          <div className="pd__story-content">
            <span className="label">The Story</span>
            <h2 className="headline-lg">{product.story.headline}</h2>
            {product.story.paragraphs.map((p, i) => (
              <p key={i} className="body-lg">{p}</p>
            ))}
          </div>
          <div className="pd__story-images">
            <div className="pd__story-img-wrap pd__story-img-1">
              <img src={product.images[1]} alt="Product detail" />
            </div>
            <div className="pd__story-img-wrap pd__story-img-2">
              <img src={product.images[2]} alt="Product detail" />
            </div>
          </div>
        </div>
      </section>

      {/* Full Specs */}
      <section className="pd__specs section section-dark">
        <div className="container">
          <div className="pd__specs-header">
            <span className="label">Specifications</span>
            <h2 className="headline-lg">Technical <span className="gold-text">Details</span></h2>
          </div>
          <div className="pd__specs-grid">
            {product.specs.map((spec, i) => (
              <div key={i} className="pd__spec-item glass-card">
                <span className="pd__spec-value">{spec.value}</span>
                <span className="pd__spec-label">{spec.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pd__features section section-darker">
        <div className="container pd__features-grid">
          <div className="pd__features-content">
            <span className="label">Features</span>
            <h2 className="headline-lg">What's <span className="gold-text">Inside</span></h2>
            <ul className="pd__features-list">
              {product.features.map((f, i) => (
                <li key={i} className="pd__feature-item">
                  <div className="pd__feature-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pd__features-image">
            <img src={product.images[3] || product.heroImage} alt={product.name} />
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pd__gallery section section-dark">
        <div className="container">
          <div className="pd__gallery-header">
            <span className="label">Gallery</span>
            <h2 className="headline-lg">Every <span className="gold-text">Angle</span></h2>
          </div>
          <div className="pd__gallery-grid">
            {product.images.map((img, i) => (
              <div key={i} className="pd__gallery-image" onClick={() => setActiveImage(i)}>
                <img src={img} alt={`${product.name} view ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pd__cta section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="headline-lg">Ready to Experience <span className="gold-text">{product.name}</span>?</h2>
          <p className="body-lg" style={{ maxWidth: '480px', margin: '16px auto 32px' }}>
            Join the future of travel. Free shipping worldwide.
          </p>
          <button className="btn btn-primary" style={{ padding: '18px 48px', fontSize: '1.05rem' }} id="product-cta-buy">
            Order Now — {product.price}
          </button>
        </div>
      </section>
    </div>
  );
}
