import React, { useState, useEffect, useRef } from 'react';
import { getProductById, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ChevronRight, ChevronLeft, Maximize2, Grid } from 'lucide-react';
import { EnquireModal } from '../components/EnquireModal';
import { MediaGridModal } from '../components/MediaGridModal';

/* ─── Feature Strip data ─────────────────────────────────── */
const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Premium Craftsmanship',
    sub: 'Handcrafted by skilled artisans',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Sustainable Materials',
    sub: 'Responsibly sourced wood',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
      </svg>
    ),
    title: 'Customizable Options',
    sub: 'Fabric, color & configuration',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6.13 6.13l1.19-1.19a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 17v-.08z"/>
      </svg>
    ),
    title: 'Dedicated Support',
    sub: 'Design experts at your service',
  },
];

const TRUST_BADGES = [
  { icon: '🔒', title: 'Secure Payments', sub: '100% safe & encrypted' },
  { icon: '↩️', title: 'Easy Returns', sub: '30-day return policy' },
  { icon: '🎧', title: 'Live Support', sub: 'Mon – Sat (10AM – 7PM)' },
  { icon: '⭐', title: 'Trust & Safety', sub: '4.9/5 rating' },
];

export const ProductDetailPage = ({ productId, onNavigate }) => {
  const product = getProductById(productId) || PRODUCTS[0];
  const { addToCart, isInCart } = useCart();

  const [currentMediaIdx, setCurrentMediaIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMediaGridOpen, setIsMediaGridOpen] = useState(false);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [isDimensionsOpen, setIsDimensionsOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const stageRef = useRef(null);
  const imgRef = useRef(null);

  const images = product.images?.length > 0
    ? product.images.map(img => img.filePath)
    : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'];

  const totalMedia = images.length;
  const inCart = isInCart(product._id?.$oid || product.id);

  /* ─── Zoom ─────────────────────────────────────────────── */
  const handleLensZoom = (e) => {
    if (!stageRef.current || !imgRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
    imgRef.current.style.transform = 'scale(2.2)';
  };
  const handleLensLeave = () => {
    if (!imgRef.current) return;
    imgRef.current.style.transformOrigin = 'center center';
    imgRef.current.style.transform = 'scale(1)';
  };

  /* ─── Keyboard nav ──────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setCurrentMediaIdx(p => (p + 1) % totalMedia);
      else if (e.key === 'ArrowLeft') setCurrentMediaIdx(p => (p - 1 + totalMedia) % totalMedia);
      else if (e.key === 'Escape') { setIsFullscreen(false); setIsMediaGridOpen(false); setIsDimensionsOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [totalMedia]);

  const handlePrev = () => setCurrentMediaIdx(p => (p - 1 + totalMedia) % totalMedia);
  const handleNext = () => setCurrentMediaIdx(p => (p + 1) % totalMedia);

  /* ─── Breadcrumb ────────────────────────────────────────── */
  const crumbGroup = product.groupName || 'Collections';

  /* ─── Related products ──────────────────────────────────── */
  const related = PRODUCTS.filter(p => (p.id || p._id?.$oid) !== (product.id || product._id?.$oid)).slice(0, 4);
  const youMayAlsoLike = PRODUCTS.filter(p => (p.id || p._id?.$oid) !== (product.id || product._id?.$oid)).slice(4, 8);

  return (
    <div style={{ minHeight: '100vh', background: '#F8F5EF', color: '#0A0A0A' }}>

      {/* ══ STICKY HEADER ══════════════════════════════════════ */}
      <div className="kdh-pdp-sticky-header">
        <button
          onClick={() => onNavigate('/')}
          style={{ background: 'none', border: 'none', color: 'var(--ekkayi-forest)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', width: '24px', padding: 0 }}
          aria-label="Back"
        >
          <span style={{ display: 'block', height: '1.8px', background: 'var(--ekkayi-forest)', width: '100%', borderRadius: '2px' }} />
          <span style={{ display: 'block', height: '1.8px', background: 'var(--ekkayi-forest)', width: '70%', borderRadius: '2px' }} />
          <span style={{ display: 'block', height: '1.8px', background: 'var(--ekkayi-forest)', width: '100%', borderRadius: '2px' }} />
        </button>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <img src="/ekkayi-nav-logo-green.svg" alt="EKKAYI" style={{ height: '36px', width: 'auto', cursor: 'pointer', objectFit: 'contain' }} onClick={() => onNavigate('/')} />
        </div>
        <button onClick={() => onNavigate('/')} style={{ background: 'none', border: 'none', color: 'var(--ekkayi-forest)', cursor: 'pointer' }} title="Close">
          <X size={22} />
        </button>
      </div>

      <div className="kdh-container" style={{ paddingTop: '1.5rem', paddingBottom: '5rem' }}>

        {/* ══ BREADCRUMB ═══════════════════════════════════════ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#7A807C', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('/')} style={{ background: 'none', border: 'none', color: '#7A807C', cursor: 'pointer', padding: 0, fontSize: '0.78rem' }}>Home</button>
          <ChevronRight size={12} />
          <button onClick={() => onNavigate('/collections')} style={{ background: 'none', border: 'none', color: '#7A807C', cursor: 'pointer', padding: 0, fontSize: '0.78rem' }}>{crumbGroup}</button>
          <ChevronRight size={12} />
          <span style={{ color: '#0A0A0A', fontWeight: 600 }}>{product.title}</span>
        </div>

        {/* ══ MAIN GRID ════════════════════════════════════════ */}
        <div className="pdp-main-grid">

          {/* ─── LEFT: Image Section ─────────────────────────── */}
          <div className="pdp-image-section">
            {/* Vertical thumbnail strip */}
            {images.length > 1 && (
              <div className="pdp-thumb-strip">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentMediaIdx(idx)}
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: currentMediaIdx === idx ? '2px solid var(--ekkayi-forest)' : '1.5px solid rgba(45,76,58,0.15)',
                      padding: 0,
                      background: '#fff',
                      cursor: 'pointer',
                      opacity: currentMediaIdx === idx ? 1 : 0.65,
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    <img src={img} alt={`View ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Main image stage */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div
                ref={stageRef}
                onMouseMove={handleLensZoom}
                onMouseLeave={handleLensLeave}
                style={{
                  position: 'relative',
                  width: '100%',
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid rgba(45,76,58,0.12)',
                  boxShadow: '0 12px 40px rgba(45,76,58,0.07)',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  cursor: 'zoom-in',
                }}
              >
                <img
                  ref={imgRef}
                  src={images[currentMediaIdx]}
                  alt={product.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.22s ease-out', transformOrigin: 'center center' }}
                />

                {/* All Photos */}
                <button
                  onClick={() => setIsMediaGridOpen(true)}
                  style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(45,76,58,0.15)', borderRadius: '8px', color: 'var(--ekkayi-forest)', cursor: 'pointer', padding: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                  title="All Photos"
                >
                  <Grid size={16} />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={() => setIsFullscreen(true)}
                  style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(45,76,58,0.15)', borderRadius: '8px', color: 'var(--ekkayi-forest)', cursor: 'pointer', padding: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                  title="Fullscreen"
                >
                  <Maximize2 size={16} />
                </button>

                {/* Arrows */}
                {totalMedia > 1 && (
                  <>
                    <button onClick={handlePrev} style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(45,76,58,0.12)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ekkayi-forest)' }}>
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={handleNext} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(45,76,58,0.12)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ekkayi-forest)' }}>
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                {totalMedia > 1 && (
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentMediaIdx(idx)}
                        style={{ width: currentMediaIdx === idx ? '20px' : '7px', height: '7px', borderRadius: '10px', background: currentMediaIdx === idx ? 'var(--ekkayi-forest)' : 'rgba(45,76,58,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Product Info ──────────────────────────── */}
          <div className="pdp-info-section">

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
              {product.seatingCapacity && (
                <span style={{ background: 'rgba(172,102,68,0.1)', border: '1px solid var(--terracotta)', color: 'var(--terracotta)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
                  {product.seatingCapacity}
                </span>
              )}
              {product.discount && (
                <span style={{ background: 'rgba(45,76,58,0.1)', border: '1px solid var(--ekkayi-forest)', color: 'var(--ekkayi-forest)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', padding: '4px 12px', borderRadius: '20px' }}>
                  {product.discount}
                </span>
              )}
              <span style={{ background: '#F0E8DD', border: '1px solid rgba(45,76,58,0.2)', color: 'var(--ekkayi-forest)', fontSize: '0.7rem', letterSpacing: '0.1em', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', fontWeight: 600 }}>
                EKKAYI Artisanal
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 500, color: '#0A0A0A', lineHeight: 1.2, marginBottom: '0.85rem', letterSpacing: '0.01em' }}>
              {product.title}
            </h1>

            {/* Price */}
            {product.priceFormatted && (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.1rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ekkayi-forest)', letterSpacing: '0.01em' }}>
                  {product.priceFormatted}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1rem', color: '#999', textDecoration: 'line-through', fontWeight: 500 }}>
                    {product.originalPrice}
                  </span>
                )}
                <span style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>
                  (Inclusive of all taxes & insurance)
                </span>
              </div>
            )}

            {/* Trust Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', padding: '0.85rem 1rem', background: '#FFFFFF', border: '1px solid rgba(45,76,58,0.12)', borderRadius: '10px', marginBottom: '1.1rem' }}>
              {[
                { icon: '🚚', label: 'Free Pan-India\nDelivery' },
                { icon: '🛡️', label: '3-Year\nWarranty' },
                { icon: '🔧', label: 'Free Expert\nAssembly' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '1.35rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#2C302D', lineHeight: 1.3, whiteSpace: 'pre-line' }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Specs 3-col */}
            <div className="pdp-specs-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px solid rgba(45,76,58,0.12)', borderBottom: '1px solid rgba(45,76,58,0.12)', padding: '1rem 0', marginBottom: '1.1rem' }}>
              <div>
                <div style={{ fontSize: '0.65rem', color: '#7A807C', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Dimensions</div>
                <button onClick={() => setIsDimensionsOpen(true)} style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.82rem', color: 'var(--terracotta)', textDecoration: 'underline', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>View Specs</button>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', color: '#7A807C', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Lead Time</div>
                <div style={{ fontSize: '0.82rem', color: '#0A0A0A', fontWeight: 600 }}>{product.leadTime || '12 – 15 Days'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', color: '#7A807C', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Primary Material</div>
                <div style={{ fontSize: '0.82rem', color: '#0A0A0A', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.material?.split('&')[0]?.trim() || 'Solid Wood'}</div>
              </div>
            </div>

            {/* Description */}
            <div style={{ fontSize: '0.9rem', color: '#3A403C', lineHeight: 1.75, marginBottom: '1.35rem' }}>
              <p style={{ marginBottom: '0.6rem', fontWeight: 500, color: '#1A1A1A' }}>{product.description?.split('\n\n')?.[0]}</p>
              {product.description?.split('\n\n')?.[1] && (
                <p>{product.description?.split('\n\n')?.[1]}</p>
              )}
            </div>

            {/* Quantity + CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Qty + Add to Cart row */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'stretch' }}>
                {/* Qty Selector */}
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid rgba(45,76,58,0.25)', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    style={{ width: '38px', height: '100%', border: 'none', background: 'none', color: 'var(--ekkayi-forest)', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ minWidth: '32px', textAlign: 'center', fontSize: '0.92rem', fontWeight: 700, color: '#0A0A0A' }}>{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    style={{ width: '38px', height: '100%', border: 'none', background: 'none', color: 'var(--ekkayi-forest)', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); }}
                  style={{ flex: 1, background: 'var(--ekkayi-forest)', color: '#FFFFFF', border: 'none', padding: '0.9rem 1rem', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', borderRadius: '8px', boxShadow: '0 6px 20px rgba(45,76,58,0.28)', transition: 'all 0.2s ease' }}
                >
                  🛒 {inCart ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>

                {/* Custom Request */}
                <button
                  onClick={() => setIsEnquireOpen(true)}
                  style={{ padding: '0.9rem 1rem', background: '#FFFFFF', color: 'var(--ekkayi-forest)', border: '1.5px solid var(--ekkayi-forest)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '8px', transition: 'all 0.2s ease', whiteSpace: 'nowrap' }}
                >
                  Custom<br/>Request
                </button>
              </div>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/+919820123456?text=${encodeURIComponent(`Hi EKKAYI, I want to inquire about ${product.title} (${product.priceFormatted || ''}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#25D366', color: '#FFFFFF', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.9rem', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 15px rgba(37,211,102,0.25)', transition: 'opacity 0.2s' }}
              >
                <span>💬</span> WhatsApp Instant Specialist Consultation
              </a>
            </div>

          </div>
        </div>

        {/* ══ FEATURE STRIP ════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: '#FFFFFF', border: '1px solid rgba(45,76,58,0.1)', borderRadius: '14px', padding: '1.5rem 2rem', marginTop: '2.5rem' }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <span style={{ color: 'var(--ekkayi-forest)', flexShrink: 0, marginTop: '2px' }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0A0A0A', marginBottom: '2px' }}>{f.title}</div>
                <div style={{ fontSize: '0.72rem', color: '#7A807C' }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ COMPLETE THE SANCTUARY ═══════════════════════════ */}
        {related.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                COMPLETE THE SANCTUARY
              </h2>
              <p style={{ color: '#7A807C', fontSize: '0.8rem', marginTop: '4px' }}>Handcrafted complementary furniture pieces by EKKAYI</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: '1.25rem' }}>
              {related.map(rel => (
                <div
                  key={rel.id || rel._id?.$oid}
                  onClick={() => { onNavigate(`/productdetails/${rel.id || rel._id?.$oid}`); window.scrollTo({ top: 0 }); }}
                  style={{ background: '#FFFFFF', border: '1px solid rgba(45,76,58,0.1)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.25s ease' }}
                  className="hover:border-[#2D4C3A] hover:shadow-lg hover:scale-[1.02]"
                >
                  <div style={{ aspectRatio: '4/3', background: '#F0E8DD', overflow: 'hidden' }}>
                    <img src={rel.images?.[0]?.filePath} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '0.85rem' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px' }}>{rel.groupName}</div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0A0A0A', marginBottom: '6px', lineHeight: 1.3 }}>{rel.title}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ekkayi-forest)' }}>{rel.priceFormatted || '₹' + rel.price?.toLocaleString()}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(rel); }}
                        style={{ background: 'none', border: '1px solid rgba(45,76,58,0.25)', borderRadius: '6px', color: 'var(--ekkayi-forest)', cursor: 'pointer', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 600 }}
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ YOU MAY ALSO LIKE ════════════════════════════════ */}
        {youMayAlsoLike.length > 0 && (
          <div style={{ marginTop: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                YOU MAY ALSO LIKE
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid rgba(45,76,58,0.2)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ekkayi-forest)' }}>
                  <ChevronLeft size={16} />
                </button>
                <button style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid rgba(45,76,58,0.2)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ekkayi-forest)' }}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: '1.25rem' }}>
              {youMayAlsoLike.map(rel => (
                <div
                  key={rel.id || rel._id?.$oid}
                  onClick={() => { onNavigate(`/productdetails/${rel.id || rel._id?.$oid}`); window.scrollTo({ top: 0 }); }}
                  style={{ background: '#FFFFFF', border: '1px solid rgba(45,76,58,0.1)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.25s ease' }}
                  className="hover:border-[#2D4C3A] hover:shadow-lg hover:scale-[1.02]"
                >
                  <div style={{ aspectRatio: '4/3', background: '#F0E8DD', overflow: 'hidden' }}>
                    <img src={rel.images?.[0]?.filePath} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '0.85rem' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px' }}>{rel.groupName}</div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0A0A0A', marginBottom: '6px', lineHeight: 1.3 }}>{rel.title}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ekkayi-forest)' }}>{rel.priceFormatted || '₹' + rel.price?.toLocaleString()}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(rel); }}
                        style={{ background: 'none', border: '1px solid rgba(45,76,58,0.25)', borderRadius: '6px', color: 'var(--ekkayi-forest)', cursor: 'pointer', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 600 }}
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ TRUST BADGES ═════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', background: '#FFFFFF', border: '1px solid rgba(45,76,58,0.1)', borderRadius: '14px', padding: '1.5rem 2rem', marginTop: '3.5rem' }}>
          {TRUST_BADGES.map((b) => (
            <div key={b.title} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{b.icon}</span>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0A0A0A', marginBottom: '2px' }}>{b.title}</div>
                <div style={{ fontSize: '0.7rem', color: '#7A807C' }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ ALL MEDIA GRID MODAL ═════════════════════════════════ */}
      <MediaGridModal
        isOpen={isMediaGridOpen}
        onClose={() => setIsMediaGridOpen(false)}
        images={product.images || []}
        currentIndex={currentMediaIdx}
        onSelectMedia={(idx) => setCurrentMediaIdx(idx)}
      />

      {/* ══ FULLSCREEN ═══════════════════════════════════════════ */}
      {isFullscreen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.97)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => setIsFullscreen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
          <button onClick={handlePrev} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '3rem', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', padding: '1rem' }}>‹</button>
          <button onClick={handleNext} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '3rem', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', padding: '1rem' }}>›</button>
          <img src={images[currentMediaIdx]} alt={product.title} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} />
        </div>
      )}

      {/* ══ DIMENSIONS MODAL ═════════════════════════════════════ */}
      {isDimensionsOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)', zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: '#111114', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', maxWidth: '550px', width: '100%', padding: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>Architectural Dimensions</h3>
              <button onClick={() => setIsDimensionsOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>
            <p style={{ fontSize: '1.15rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>{product.title}</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--gold)', marginBottom: '1.5rem' }}>{product.dimensions || '22" Diameter • 34" Height • Weight: 120 kg'}</p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
              Precision crafted from premium materials. Custom sizes available on request.
            </p>
          </div>
        </div>
      )}

      {/* ══ ENQUIRE MODAL ════════════════════════════════════════ */}
      <EnquireModal
        isOpen={isEnquireOpen}
        onClose={() => setIsEnquireOpen(false)}
        productTitle={product.title}
        variant={product.groupName || 'Artisanal Furniture'}
      />
    </div>
  );
};
