import React, { useState, useEffect, useRef } from 'react';
import { getProductById, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  X, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Tag,
  Check
} from 'lucide-react';
import { EnquireModal } from '../components/EnquireModal';
import { MediaGridModal } from '../components/MediaGridModal';

export const ProductDetailPage = ({ productId, onNavigate }) => {
  const product = getProductById(productId) || PRODUCTS[0];
  const { addToCart, isInCart } = useCart();

  const [currentMediaIdx, setCurrentMediaIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMediaGridOpen, setIsMediaGridOpen] = useState(false);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [isDimensionsOpen, setIsDimensionsOpen] = useState(false);
  const [isLockedZoom, setIsLockedZoom] = useState(false);

  const stageRef = useRef(null);
  const imgRef = useRef(null);

  const images = product.images?.length > 0 
    ? product.images.map(img => img.filePath) 
    : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'];

  const totalMedia = images.length;
  const inCart = isInCart(product._id?.$oid || product.id);

  // Interactive Lens Zoom
  const handleLensZoom = (e) => {
    if (isLockedZoom || !stageRef.current || !imgRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
    imgRef.current.style.transform = 'scale(2.2)';
    imgRef.current.style.cursor = 'zoom-in';
  };

  const handleLensLeave = () => {
    if (isLockedZoom || !imgRef.current) return;
    imgRef.current.style.transformOrigin = 'center center';
    imgRef.current.style.transform = 'scale(1)';
  };

  const toggleLockedZoom = (e) => {
    if (!stageRef.current || !imgRef.current) return;
    const nextLocked = !isLockedZoom;
    setIsLockedZoom(nextLocked);

    if (nextLocked) {
      const rect = stageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      imgRef.current.style.transformOrigin = `${x}% ${y}%`;
      imgRef.current.style.transform = 'scale(2.6)';
      imgRef.current.style.cursor = 'zoom-out';
    } else {
      imgRef.current.style.transformOrigin = 'center center';
      imgRef.current.style.transform = 'scale(1)';
      imgRef.current.style.cursor = 'zoom-in';
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentMediaIdx((prev) => (prev + 1) % totalMedia);
      } else if (e.key === 'ArrowLeft') {
        setCurrentMediaIdx((prev) => (prev - 1 + totalMedia) % totalMedia);
      } else if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        if (isMediaGridOpen) setIsMediaGridOpen(false);
        if (isDimensionsOpen) setIsDimensionsOpen(false);
        setIsLockedZoom(false);
        if (imgRef.current) {
          imgRef.current.style.transform = 'scale(1)';
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalMedia, isFullscreen, isMediaGridOpen, isDimensionsOpen]);

  const handlePrevMedia = () => {
    setCurrentMediaIdx((prev) => (prev - 1 + totalMedia) % totalMedia);
    setIsLockedZoom(false);
    if (imgRef.current) imgRef.current.style.transform = 'scale(1)';
  };

  const handleNextMedia = () => {
    setCurrentMediaIdx((prev) => (prev + 1) % totalMedia);
    setIsLockedZoom(false);
    if (imgRef.current) imgRef.current.style.transform = 'scale(1)';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0E8DD 0%, #F8F5EE 40%, #EAE0CD 100%)', color: '#0A0A0A', position: 'relative' }}>
      
      {/* Top Floating Header for PDP */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '4.5rem',
          background: 'rgba(240, 232, 221, 0.94)',
          backdropFilter: 'blur(16px)',
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          borderBottom: '1px solid rgba(45, 76, 58, 0.15)'
        }}
      >
        <button 
          onClick={() => onNavigate('/')} 
          style={{ background: 'none', border: 'none', color: 'var(--ekkayi-forest)', cursor: 'pointer' }}
          aria-label="Back to 3D Globe"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '24px' }}>
            <span style={{ display: 'block', height: '1.8px', background: 'var(--ekkayi-forest)', width: '100%' }}></span>
            <span style={{ display: 'block', height: '1.8px', background: 'var(--ekkayi-forest)', width: '70%' }}></span>
            <span style={{ display: 'block', height: '1.8px', background: 'var(--ekkayi-forest)', width: '100%' }}></span>
          </div>
        </button>

        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <img 
            src="/ekkayi-nav-logo-green.svg" 
            alt="EKKAYI" 
            style={{ height: '38px', width: 'auto', cursor: 'pointer', objectFit: 'contain' }}
            onClick={() => onNavigate('/')}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button 
            onClick={() => onNavigate('/')}
            style={{ background: 'none', border: 'none', color: 'var(--ekkayi-forest)', cursor: 'pointer', padding: '4px' }}
            title="Close & Return to 3D Galaxy"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="kdh-container" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '4rem',
            alignItems: 'center',
            minHeight: '75vh'
          }}
          className="kdh-pdp-responsive-grid"
        >
          {/* ================= LEFT COLUMN: MEDIA VIEWER & ZOOM ================= */}
          <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div 
              style={{
                position: 'relative',
                width: '100%',
                height: '70vh',
                maxHeight: '640px',
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(45, 76, 58, 0.15)',
                boxShadow: '0 16px 45px rgba(45, 76, 58, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Top-Left: 3x3 All Photos Modal Icon */}
              <button
                onClick={() => setIsMediaGridOpen(true)}
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  background: 'rgba(240, 232, 221, 0.85)',
                  border: '1px solid rgba(45, 76, 58, 0.2)',
                  borderRadius: '6px',
                  color: 'var(--ekkayi-forest)',
                  cursor: 'pointer',
                  padding: '6px',
                  zIndex: 10
                }}
                title="All Photos"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              </button>

              {/* Top-Right: Fullscreen Lightbox Icon */}
              <button
                onClick={() => setIsFullscreen(true)}
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: 'rgba(240, 232, 221, 0.85)',
                  border: '1px solid rgba(45, 76, 58, 0.2)',
                  borderRadius: '6px',
                  color: 'var(--ekkayi-forest)',
                  cursor: 'pointer',
                  padding: '6px',
                  zIndex: 10
                }}
                title="Fullscreen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
              </button>

              {/* Main Product Image with Interactive Lens Zoom */}
              <div 
                ref={stageRef}
                onMouseMove={handleLensZoom}
                onMouseLeave={handleLensLeave}
                onClick={toggleLockedZoom}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  cursor: isLockedZoom ? 'zoom-out' : 'zoom-in'
                }}
              >
                <img
                  ref={imgRef}
                  src={images[currentMediaIdx]}
                  alt={product.title}
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.95))',
                    transition: 'transform 0.22s ease-out',
                    transformOrigin: 'center center'
                  }}
                />
              </div>

              {/* Minimal Navigation Arrows */}
              <button
                onClick={handlePrevMedia}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '2.4rem',
                  fontWeight: 200,
                  color: 'rgba(255, 255, 255, 0.6)',
                  background: 'none',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                aria-label="Previous"
              >
                ‹
              </button>

              <button
                onClick={handleNextMedia}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '2.4rem',
                  fontWeight: 200,
                  color: 'rgba(255, 255, 255, 0.6)',
                  background: 'none',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                aria-label="Next"
              >
                ›
              </button>

              {/* Minimal Counter */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textTransform: 'uppercase',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '2px 10px',
                  borderRadius: '12px'
                }}
              >
                {currentMediaIdx + 1} / {totalMedia}
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  marginTop: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentMediaIdx(idx);
                      setIsLockedZoom(false);
                    }}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: currentMediaIdx === idx ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.15)',
                      padding: 0,
                      background: '#070708',
                      cursor: 'pointer',
                      opacity: currentMediaIdx === idx ? 1 : 0.6,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= RIGHT COLUMN: PRODUCT INFO & ACTIONS ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            
            {/* Seating Capacity / Discount Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {product.seatingCapacity && (
                <span style={{
                  background: 'rgba(172, 102, 68, 0.12)',
                  border: '1px solid var(--terracotta)',
                  color: 'var(--terracotta)',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '0.12em',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  textTransform: 'uppercase'
                }}>
                  {product.seatingCapacity}
                </span>
              )}
              {product.discount && (
                <span style={{
                  background: 'rgba(45, 76, 58, 0.12)',
                  border: '1px solid var(--ekkayi-forest)',
                  color: 'var(--ekkayi-forest)',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}>
                  {product.discount}
                </span>
              )}
              <span style={{
                background: '#FFFFFF',
                border: '1px solid rgba(45, 76, 58, 0.2)',
                color: 'var(--ekkayi-forest)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                padding: '4px 12px',
                borderRadius: '20px',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}>
                EKKAYI Artisanal
              </span>
            </div>

            {/* Title */}
            <h1 
              style={{
                fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                fontWeight: 500,
                letterSpacing: '0.03em',
                color: 'var(--ekkayi-forest)',
                fontFamily: 'var(--font-serif)',
                lineHeight: 1.15
              }}
            >
              {product.title}
            </h1>

            {/* Price Display in INR */}
            {product.priceFormatted && (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ekkayi-forest)', letterSpacing: '0.01em' }}>
                  {product.priceFormatted}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1.1rem', color: '#888E8A', textDecoration: 'line-through' }}>
                    {product.originalPrice}
                  </span>
                )}
                <span style={{ fontSize: '0.74rem', color: '#6A706C', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                  (Inclusive of all taxes &amp; Insurance)
                </span>
              </div>
            )}

            {/* Trust Assurance Bar */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.6rem',
                padding: '1rem',
                background: '#FFFFFF',
                border: '1px solid rgba(45, 76, 58, 0.15)',
                boxShadow: '0 4px 15px rgba(45, 76, 58, 0.04)',
                borderRadius: '10px',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: '#2C302D'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--ekkayi-forest)' }}>✓</span> Free Pan-India Delivery
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--ekkayi-forest)' }}>✓</span> 3-Year Warranty
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--ekkayi-forest)' }}>✓</span> Free Expert Assembly
              </div>
            </div>

            {/* 3-Column Specifications Row */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.25rem',
                borderTop: '1px solid rgba(45, 76, 58, 0.15)',
                borderBottom: '1px solid rgba(45, 76, 58, 0.15)',
                padding: '1.1rem 0'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#7A807C', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Dimensions
                </span>
                <button 
                  onClick={() => setIsDimensionsOpen(true)} 
                  style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.85rem', color: 'var(--terracotta)', textDecoration: 'underline', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}
                >
                  View Specs
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#7A807C', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Lead Time
                </span>
                <span style={{ fontSize: '0.88rem', color: '#1A1A1A', fontWeight: 600 }}>
                  {product.leadTime || '5 - 7 Days'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#7A807C', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Primary Material
                </span>
                <span style={{ fontSize: '0.88rem', color: '#1A1A1A', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.material?.split('&')[0] || 'Solid Wood'}
                </span>
              </div>
            </div>

            {/* Narrative Block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', color: '#3A403C', lineHeight: 1.75 }}>
              <p style={{ color: '#1A1A1A', fontWeight: 500 }}>
                {product.description?.split('\n\n')?.[0]}
              </p>
              {product.description?.split('\n\n')?.[1] && (
                <p>
                  {product.description?.split('\n\n')?.[1]}
                </p>
              )}
            </div>

            {/* Bottom Action CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem' }}>
                <button 
                  onClick={() => addToCart(product)}
                  style={{
                    background: 'var(--ekkayi-forest)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '1rem 1.25rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    boxShadow: '0 6px 20px rgba(45, 76, 58, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  className="hover:opacity-90 hover:scale-[1.01]"
                >
                  {inCart ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>

                <button 
                  onClick={() => setIsEnquireOpen(true)}
                  style={{
                    background: '#FFFFFF',
                    color: 'var(--ekkayi-forest)',
                    border: '1.5px solid var(--ekkayi-forest)',
                    padding: '1rem 1.25rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  className="hover:bg-[#2D4C3A] hover:text-white"
                >
                  Custom Request
                </button>
              </div>

              {/* WhatsApp Instant Order Button */}
              <a
                href={`https://wa.me/+919820123456?text=${encodeURIComponent(`Hi EKKAYI, I want to inquire about ${product.title} (${product.priceFormatted || ''}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: '#25D366',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.95rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)'
                }}
                className="hover:opacity-90 transition-opacity"
              >
                <span>💬</span> WhatsApp Instant Specialist Consultation
              </a>
            </div>

          </div>
        </div>

        {/* Related Furniture Recommendations Grid */}
        <div style={{ marginTop: '5.5rem', borderTop: '1px solid rgba(45, 76, 58, 0.15)', paddingTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 500, color: 'var(--ekkayi-forest)', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)' }}>
              Complete the Sanctuary
            </h2>
            <p style={{ color: '#5A605C', fontSize: '0.85rem', letterSpacing: '0.08em', marginTop: '0.35rem' }}>
              Handcrafted complementary furniture pieces by EKKAYI
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.75rem' }}>
            {PRODUCTS.filter(p => (p.id || p._id?.$oid) !== (product.id || product._id?.$oid)).slice(0, 4).map((rel) => (
              <div 
                key={rel.id || rel._id?.$oid}
                onClick={() => {
                  onNavigate(`/productdetails/${rel.id || rel._id?.$oid}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(45, 76, 58, 0.15)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(45, 76, 58, 0.06)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                className="hover:border-[#2D4C3A] hover:shadow-xl hover:scale-[1.02]"
              >
                <div style={{ aspectRatio: '4/3', background: '#F0E8DD', overflow: 'hidden' }}>
                  <img 
                    src={rel.images?.[0]?.filePath} 
                    alt={rel.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    {rel.groupName}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ekkayi-forest)', margin: '0.35rem 0' }}>
                    {rel.title}
                  </h4>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0A0A0A' }}>
                    {rel.priceFormatted || '₹' + rel.price?.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3x3 All Media Grid Modal */}
      <MediaGridModal 
        isOpen={isMediaGridOpen}
        onClose={() => setIsMediaGridOpen(false)}
        images={product.images || []}
        currentIndex={currentMediaIdx}
        onSelectMedia={(idx) => setCurrentMediaIdx(idx)}
      />

      {/* Fullscreen Lightbox */}
      {isFullscreen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.98)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <button 
            onClick={() => setIsFullscreen(false)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
          <button 
            onClick={handlePrevMedia}
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '3rem', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', padding: '1.5rem', cursor: 'pointer' }}
          >
            ‹
          </button>
          <button 
            onClick={handleNextMedia}
            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '3rem', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', padding: '1.5rem', cursor: 'pointer' }}
          >
            ›
          </button>
          <img src={images[currentMediaIdx]} alt={product.title} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} />
        </div>
      )}

      {/* Dimensions Modal */}
      {isDimensionsOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(12px)',
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div style={{ background: '#111114', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', maxWidth: '550px', width: '100%', padding: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Architectural Dimensions</h3>
              <button onClick={() => setIsDimensionsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>
            <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>{product.title}</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--gold)', marginBottom: '1.5rem' }}>
              {product.dimensions || '22" Diameter • 34" Height • Weight: 120 kg'}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
              Precision CNC carved from a single natural monolithic quarry block. Custom waste fitting included. Suitable for deck-mount or wall-mount tapware.
            </p>
          </div>
        </div>
      )}

      {/* Enquire Modal */}
      <EnquireModal
        isOpen={isEnquireOpen}
        onClose={() => setIsEnquireOpen(false)}
        productTitle={product.title}
        variant={product.groupName || 'Artisanal Furniture'}
      />

    </div>
  );
};
