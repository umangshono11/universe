import React, { useState, useEffect, useRef } from 'react';
import { getProductById, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Minus, 
  Plus, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Grid, 
  Heart, 
  Check, 
  Star,
  Search,
  User,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { EnquireModal } from '../components/EnquireModal';
import { MediaGridModal } from '../components/MediaGridModal';

/* ─── Top Feature Bar Data ───────────────────────────────── */
const TOP_FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#162C1F" strokeWidth="1.8">
        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/>
        <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/>
        <path d="M6 18v2"/><path d="M18 18v2"/>
      </svg>
    ),
    title: 'Dual Power Recline',
    sub: 'Smooth & silent motion',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#162C1F" strokeWidth="1.8">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'USB Fast-Charging',
    sub: 'Integrated ports',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#162C1F" strokeWidth="1.8">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
    ),
    title: 'Zero Gravity Comfort',
    sub: 'Reduces pressure points',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#162C1F" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'High Resilience Foam',
    sub: 'Long-lasting support',
  },
];

/* ─── Bottom Trust Badges Data ───────────────────────────── */
const TRUST_BADGES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#162C1F" strokeWidth="1.6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Secure Payments',
    sub: '100% safe & encrypted',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#162C1F" strokeWidth="1.6">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
      </svg>
    ),
    title: 'Easy Returns',
    sub: '30-day return policy',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#162C1F" strokeWidth="1.6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6.13 6.13l1.19-1.19a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 17v-.08z"/>
      </svg>
    ),
    title: 'Live Support',
    sub: 'Mon - Sat (10AM - 7PM)',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#162C1F" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M12 8v4"/><path d="M12 16h.01"/>
      </svg>
    ),
    title: 'Trusted by 10k+ Homes',
    sub: '4.9/5 customer rating',
  },
];

/* ─── Fabric Colors ──────────────────────────────────────── */
const SWATCHES = [
  { id: 'taupe', color: '#8C7764', name: 'Warm Taupe' },
  { id: 'terracotta', color: '#AC6644', name: 'Terracotta' },
  { id: 'forest', color: '#1F382B', name: 'Forest Green' },
  { id: 'mist', color: '#B6BBB8', name: 'Mist Grey' },
];

export const ProductDetailPage = ({ productId, onNavigate }) => {
  const product = getProductById(productId) || PRODUCTS[0];
  const { addToCart, isInCart, cartCount } = useCart();

  const [currentMediaIdx, setCurrentMediaIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState('mist');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMediaGridOpen, setIsMediaGridOpen] = useState(false);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [isDimensionsOpen, setIsDimensionsOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const stageRef = useRef(null);
  const imgRef = useRef(null);

  const images = product.images?.length > 0
    ? product.images.map(img => img.filePath)
    : [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      ];

  const totalMedia = images.length;
  const inCart = isInCart(product._id?.$oid || product.id);

  /* ─── Interactive Zoom ─────────────────────────────────── */
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

  /* ─── Keyboard Nav ─────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setCurrentMediaIdx((p) => (p + 1) % totalMedia);
      else if (e.key === 'ArrowLeft') setCurrentMediaIdx((p) => (p - 1 + totalMedia) % totalMedia);
      else if (e.key === 'Escape') {
        setIsFullscreen(false);
        setIsMediaGridOpen(false);
        setIsDimensionsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [totalMedia]);

  const handlePrev = () => setCurrentMediaIdx((p) => (p - 1 + totalMedia) % totalMedia);
  const handleNext = () => setCurrentMediaIdx((p) => (p + 1) % totalMedia);

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', color: '#0A0A0A' }}>

      {/* ══ 1. PDP STICKY TOP NAVBAR ═════════════════════════════ */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 80,
          backgroundColor: 'rgba(250, 247, 242, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(45, 76, 58, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 2rem',
        }}
      >
        {/* Left: Burger + Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <button
            onClick={() => onNavigate('/')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              width: '22px',
              padding: 0,
            }}
            aria-label="Menu"
          >
            <span style={{ display: 'block', height: '1.8px', background: '#162C1F', width: '100%', borderRadius: '2px' }} />
            <span style={{ display: 'block', height: '1.8px', background: '#162C1F', width: '70%', borderRadius: '2px' }} />
            <span style={{ display: 'block', height: '1.8px', background: '#162C1F', width: '100%', borderRadius: '2px' }} />
          </button>

          <div style={{ display: 'none' }} className="md:flex items-center gap-6 text-[0.82rem] font-semibold tracking-wider text-[#162C1F] uppercase">
            <button onClick={() => onNavigate('/collections')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#162C1F', padding: 0 }}>Shop</button>
            <button onClick={() => onNavigate('/collections')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#162C1F', padding: 0 }}>Collections</button>
            <button onClick={() => onNavigate('/about')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#162C1F', padding: 0 }}>About</button>
            <button onClick={() => onNavigate('/lookbook')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#162C1F', padding: 0 }}>Lookbook</button>
          </div>
        </div>

        {/* Center: EKKAYI Logo */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
          >
            <img src="/ekkayi-logo-green.svg" alt="EKKAYI" style={{ height: '32px', width: '32px', objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', letterSpacing: '0.18em', color: '#162C1F', fontWeight: 600 }}>
              EKKAYI
            </span>
          </a>
        </div>

        {/* Right: Search, User, Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => onNavigate('/collections')}
            style={{ background: 'none', border: 'none', color: '#162C1F', cursor: 'pointer', padding: '4px' }}
            title="Search"
          >
            <Search size={19} />
          </button>
          <button
            onClick={() => onNavigate('/about')}
            style={{ background: 'none', border: 'none', color: '#162C1F', cursor: 'pointer', padding: '4px' }}
            title="Account"
          >
            <User size={19} />
          </button>
          <button
            onClick={() => onNavigate('/cart')}
            style={{ background: 'none', border: 'none', color: '#162C1F', cursor: 'pointer', padding: '4px', position: 'relative' }}
            title="Cart"
          >
            <ShoppingBag size={19} />
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-4px',
                background: '#162C1F',
                color: '#FFFFFF',
                fontSize: '0.62rem',
                fontWeight: 700,
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {cartCount > 0 ? cartCount : 2}
            </span>
          </button>
        </div>
      </nav>

      {/* ══ 2. BREADCRUMB & MAIN CONTAINER ═════════════════════════ */}
      <div className="kdh-container" style={{ paddingTop: '1.25rem', paddingBottom: '4rem' }}>
        
        {/* Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.74rem',
            color: '#767C78',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <button onClick={() => onNavigate('/')} style={{ background: 'none', border: 'none', color: '#767C78', cursor: 'pointer', padding: 0, fontSize: '0.74rem' }}>Home</button>
          <ChevronRight size={11} />
          <button onClick={() => onNavigate('/collections')} style={{ background: 'none', border: 'none', color: '#767C78', cursor: 'pointer', padding: 0, fontSize: '0.74rem' }}>Living Room</button>
          <ChevronRight size={11} />
          <button onClick={() => onNavigate('/collections')} style={{ background: 'none', border: 'none', color: '#767C78', cursor: 'pointer', padding: 0, fontSize: '0.74rem' }}>Sofas</button>
          <ChevronRight size={11} />
          <span style={{ color: '#162C1F', fontWeight: 600 }}>{product.title}</span>
        </div>

        {/* ══ 3. MAIN HERO SPLIT: Left Gallery, Right Details ═════ */}
        <div className="pdp-main-grid">

          {/* ── Left: Image Gallery ────────────────────────────── */}
          <div className="pdp-image-section">
            {/* Vertical thumbnails */}
            <div className="pdp-thumb-strip">
              {images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentMediaIdx(idx)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: currentMediaIdx === idx ? '2px solid #162C1F' : '1px solid rgba(45,76,58,0.18)',
                    padding: 0,
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    opacity: currentMediaIdx === idx ? 1 : 0.7,
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}

              {/* +2 More Box */}
              <button
                onClick={() => setIsMediaGridOpen(true)}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '8px',
                  border: '1px dashed rgba(45,76,58,0.3)',
                  background: '#F0EBE0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#162C1F',
                  lineHeight: 1.2,
                  padding: 0,
                  flexShrink: 0,
                }}
                title="View All Photos"
              >
                <span>+2</span>
                <span style={{ fontSize: '0.62rem', fontWeight: 600 }}>More</span>
              </button>
            </div>

            {/* Main Image Stage */}
            <div style={{ flex: 1, position: 'relative' }}>
              <div
                ref={stageRef}
                onMouseMove={handleLensZoom}
                onMouseLeave={handleLensLeave}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1/1.08',
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid rgba(45,76,58,0.12)',
                  boxShadow: '0 12px 35px rgba(22, 44, 31, 0.06)',
                  overflow: 'hidden',
                  cursor: 'zoom-in',
                }}
              >
                <img
                  ref={imgRef}
                  src={images[currentMediaIdx] || images[0]}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.2s ease-out',
                    transformOrigin: 'center center',
                  }}
                />

                {/* Top-Right: Fullscreen / Expand */}
                <button
                  onClick={() => setIsFullscreen(true)}
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    right: '0.85rem',
                    background: 'rgba(255,255,255,0.92)',
                    border: '1px solid rgba(45,76,58,0.15)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    color: '#162C1F',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  }}
                  title="Expand"
                >
                  <Maximize2 size={16} />
                </button>

                {/* Bottom-Left: 01 / 06 Counter */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#162C1F',
                    border: '1px solid rgba(45,76,58,0.12)',
                  }}
                >
                  {String(currentMediaIdx + 1).padStart(2, '0')} / {String(totalMedia).padStart(2, '0')}
                </div>

                {/* Bottom-Right: Arrow Controls */}
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={handlePrev}
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      border: '1px solid rgba(45,76,58,0.15)',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#162C1F',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      border: '1px solid rgba(45,76,58,0.15)',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#162C1F',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Product Info ─────────────────────────── */}
          <div className="pdp-info-section">
            {/* Badges Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span
                style={{
                  border: '1px solid #AC6644',
                  color: '#AC6644',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                }}
              >
                {product.seatingCapacity || '3 SEATER (DUAL POWER RECLINER)'}
              </span>
              <span
                style={{
                  backgroundColor: '#E8E4DB',
                  color: '#555A56',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '20px',
                }}
              >
                {product.discount || '32% OFF'}
              </span>
              <span
                style={{
                  border: '1px solid rgba(22, 44, 31, 0.3)',
                  color: '#162C1F',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                }}
              >
                EKKAYI ARTISANAL
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                fontWeight: 500,
                color: '#162C1F',
                lineHeight: 1.2,
                marginBottom: '0.5rem',
              }}
            >
              {product.title}
            </h1>

            {/* Rating Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', color: '#D4A340' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#D4A340" stroke="none" />
                ))}
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#3A423E' }}>
                {product.rating || '4.8'} ({product.reviewsCount || 126} reviews)
              </span>
            </div>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.1rem', fontWeight: 700, color: '#162C1F' }}>
                {product.priceFormatted || '₹74,900'}
              </span>
              <span style={{ fontSize: '1.05rem', color: '#909692', textDecoration: 'line-through', fontWeight: 500 }}>
                {product.originalPrice || '₹109,990'}
              </span>
              <span style={{ fontSize: '0.66rem', color: '#7E8580', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
                (INCLUSIVE OF ALL TAXES &amp; INSURANCE)
              </span>
            </div>

            {/* Quick Benefits Pill Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                padding: '0.8rem 1rem',
                background: '#FFFFFF',
                border: '1px solid rgba(45,76,58,0.12)',
                borderRadius: '10px',
                marginBottom: '1.1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🚚</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#242C27', lineHeight: 1.25 }}>Free Pan-India Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🛡️</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#242C27', lineHeight: 1.25 }}>3-Year Warranty</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🔧</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#242C27', lineHeight: 1.25 }}>Expert Assembly</span>
              </div>
            </div>

            {/* Short Description */}
            <p style={{ fontSize: '0.86rem', color: '#3A423D', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              {product.description?.split('\n\n')?.[0] ||
                'Cinema-grade luxury in your living room. The Liora 3-Seater Electric Recliner features dual whisper-quiet motorized mechanisms with integrated USB fast-charging ports.'}
            </p>

            {/* Variant Selectors: Upholstery Swatches & Color Dropdown */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 1fr',
                gap: '1rem',
                borderTop: '1px solid rgba(45,76,58,0.12)',
                paddingTop: '1rem',
                marginBottom: '1.1rem',
              }}
            >
              {/* Left: Upholstery */}
              <div>
                <div style={{ fontSize: '0.68rem', color: '#767C78', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                  UPHOLSTERY
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#162C1F', marginBottom: '8px' }}>
                  Ultra-Soft Suede Fabric
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  {SWATCHES.map((sw) => (
                    <button
                      key={sw.id}
                      onClick={() => setSelectedColor(sw.id)}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: sw.color,
                        border: selectedColor === sw.id ? '2px solid #162C1F' : '1px solid rgba(0,0,0,0.15)',
                        outline: selectedColor === sw.id ? '2px solid #FAF7F2' : 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      title={sw.name}
                    />
                  ))}
                  <button
                    onClick={() => setIsEnquireOpen(true)}
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#555A56',
                      border: '1px solid rgba(45,76,58,0.2)',
                      borderRadius: '12px',
                      padding: '2px 6px',
                      background: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    +8
                  </button>
                </div>
              </div>

              {/* Right: Color Dropdown */}
              <div>
                <div style={{ fontSize: '0.68rem', color: '#767C78', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                  COLOR
                </div>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(45,76,58,0.2)',
                    background: '#FFFFFF',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#162C1F',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="mist">Mist Grey</option>
                  <option value="taupe">Warm Taupe</option>
                  <option value="terracotta">Terracotta Tan</option>
                  <option value="forest">Forest Green</option>
                </select>
              </div>
            </div>

            {/* Micro Specs: Dimensions, Lead Time, Warranty */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                borderTop: '1px solid rgba(45,76,58,0.12)',
                borderBottom: '1px solid rgba(45,76,58,0.12)',
                padding: '0.85rem 0',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <div style={{ fontSize: '0.65rem', color: '#767C78', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>
                  DIMENSIONS
                </div>
                <div style={{ fontSize: '0.78rem', color: '#162C1F', fontWeight: 600, lineHeight: 1.3 }}>
                  {product.dimensions || 'W 198 x D 95 x H 102 cm'}
                </div>
                <button
                  onClick={() => setIsDimensionsOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.74rem',
                    color: '#AC6644',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontWeight: 600,
                    marginTop: '2px',
                  }}
                >
                  View Specs
                </button>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', color: '#767C78', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>
                  LEAD TIME
                </div>
                <div style={{ fontSize: '0.78rem', color: '#162C1F', fontWeight: 600 }}>
                  {product.leadTime || '12 - 15 Days'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', color: '#767C78', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>
                  WARRANTY
                </div>
                <div style={{ fontSize: '0.78rem', color: '#162C1F', fontWeight: 600 }}>
                  {product.warranty || '3 Years'}
                </div>
              </div>
            </div>

            {/* Add to Cart, Quantity & Custom CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Row 1: Quantity + Add to Cart + Heart */}
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'stretch' }}>
                {/* Quantity */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid rgba(45,76,58,0.25)',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                  }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    style={{ width: '34px', height: '100%', border: 'none', background: 'none', color: '#162C1F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Minus size={13} />
                  </button>
                  <span style={{ minWidth: '28px', textAlign: 'center', fontSize: '0.88rem', fontWeight: 700, color: '#162C1F' }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    style={{ width: '34px', height: '100%', border: 'none', background: 'none', color: '#162C1F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    for (let i = 0; i < qty; i++) addToCart(product);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: '#162C1F',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.9rem 1.25rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    boxShadow: '0 6px 20px rgba(22, 44, 31, 0.25)',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:bg-[#203D2B]"
                >
                  <ShoppingBag size={16} />
                  {inCart ? 'ADDED TO CART ✓' : 'ADD TO CART'}
                </button>

                {/* Wishlist Heart */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  style={{
                    width: '46px',
                    borderRadius: '8px',
                    border: '1px solid rgba(45,76,58,0.25)',
                    background: '#FFFFFF',
                    color: isWishlisted ? '#AC6644' : '#162C1F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  title="Save to Wishlist"
                >
                  <Heart size={18} fill={isWishlisted ? '#AC6644' : 'none'} />
                </button>
              </div>

              {/* Row 2: Custom Request */}
              <button
                onClick={() => setIsEnquireOpen(true)}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  background: '#FFFFFF',
                  color: '#162C1F',
                  border: '1.5px solid #162C1F',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                }}
                className="hover:bg-[#162C1F] hover:text-[#FFFFFF]"
              >
                CUSTOM REQUEST
              </button>

              {/* Row 3: WhatsApp Consultation */}
              <a
                href={`https://wa.me/+919820123456?text=${encodeURIComponent(`Hi EKKAYI, I want to inquire about ${product.title} (${product.priceFormatted || ''}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#1EAA55',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.76rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.85rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(30,170,85,0.2)',
                  transition: 'opacity 0.2s',
                }}
              >
                <span style={{ fontSize: '1rem' }}>💬</span> WHATSAPP INSTANT SPECIALIST CONSULTATION
              </a>
            </div>
          </div>
        </div>

        {/* ══ 4. FEATURE HIGHLIGHTS BAR (4 Items) ════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            background: '#FFFFFF',
            border: '1px solid rgba(45,76,58,0.1)',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            marginTop: '3.5rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.02)',
          }}
        >
          {TOP_FEATURES.map((f) => (
            <div key={f.title} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#162C1F', marginBottom: '2px' }}>{f.title}</div>
                <div style={{ fontSize: '0.72rem', color: '#767C78' }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ 5. "WHY YOU'LL LOVE IT" SECTION ═════════════════════ */}
        <div style={{ marginTop: '4rem' }}>
          <div className="pdp-love-grid">
            {/* Left: Heading + Bullet points */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#162C1F',
                  marginBottom: '1.5rem',
                }}
              >
                WHY YOU'LL LOVE IT
              </h2>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  'Dual power recline with independent head & footrest',
                  'Whisper-quiet motors for uninterrupted comfort',
                  'Integrated USB A & C ports for seamless charging',
                  'High-resilience foam with plush cushioning',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.82rem', color: '#2C342F', lineHeight: 1.5 }}>
                    <Check size={16} color="#162C1F" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setIsDimensionsOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'none',
                  border: 'none',
                  color: '#162C1F',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                KNOW MORE <ArrowRight size={13} />
              </button>
            </div>

            {/* Right: 4 Photo Feature Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                {
                  img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
                  title: 'Integrated USB Ports',
                  sub: 'Charge your devices while you unwind.',
                },
                {
                  img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
                  title: 'Dual Power Recline',
                  sub: 'Independent head & footrest for personalized comfort.',
                },
                {
                  img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
                  title: 'Premium Suede Fabric',
                  sub: 'Ultra-soft, breathable & built to last.',
                },
                {
                  img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
                  title: 'High Resilience Foam',
                  sub: 'Plush cushioning that retains its shape.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid rgba(45,76,58,0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ aspectRatio: '4/3', background: '#F0EBE0', overflow: 'hidden' }}>
                    <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '0.85rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#162C1F', marginBottom: '4px' }}>
                      {card.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#767C78', lineHeight: 1.4 }}>
                      {card.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ 6. SPECIFICATIONS & BESPOKE CUSTOMIZATION ═══════════ */}
        <div style={{ marginTop: '3.5rem' }}>
          <div className="pdp-specs-custom-grid">
            {/* Card 1: Specifications */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(45,76,58,0.1)',
                padding: '2rem',
              }}
            >
              <h3
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#162C1F',
                  marginBottom: '1.25rem',
                }}
              >
                SPECIFICATIONS
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem 1.5rem', fontSize: '0.8rem' }}>
                <div>
                  <div style={{ color: '#767C78', fontSize: '0.72rem', marginBottom: '2px' }}>Seating Capacity</div>
                  <div style={{ fontWeight: 600, color: '#162C1F', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    3 Seater <span style={{ fontSize: '0.7rem' }}>›</span>
                  </div>
                </div>
                <div>
                  <div style={{ color: '#767C78', fontSize: '0.72rem', marginBottom: '2px' }}>USB Ports</div>
                  <div style={{ fontWeight: 600, color: '#162C1F' }}>2 Fast-Charging Ports</div>
                </div>

                <div>
                  <div style={{ color: '#767C78', fontSize: '0.72rem', marginBottom: '2px' }}>Upholstery</div>
                  <div style={{ fontWeight: 600, color: '#162C1F' }}>Ultra-Soft Suede Fabric</div>
                </div>
                <div>
                  <div style={{ color: '#767C78', fontSize: '0.72rem', marginBottom: '2px' }}>Foam Type</div>
                  <div style={{ fontWeight: 600, color: '#162C1F' }}>High Resilience Foam</div>
                </div>

                <div>
                  <div style={{ color: '#767C78', fontSize: '0.72rem', marginBottom: '2px' }}>Frame Material</div>
                  <div style={{ fontWeight: 600, color: '#162C1F' }}>Kiln-Dried Hardwood</div>
                </div>
                <div>
                  <div style={{ color: '#767C78', fontSize: '0.72rem', marginBottom: '2px' }}>Care</div>
                  <div style={{ fontWeight: 600, color: '#162C1F' }}>Easy to Clean</div>
                </div>

                <div>
                  <div style={{ color: '#767C78', fontSize: '0.72rem', marginBottom: '2px' }}>Recliner Mechanism</div>
                  <div style={{ fontWeight: 600, color: '#162C1F', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    Dual Motorized <span style={{ fontSize: '0.7rem' }}>›</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Bespoke Customization */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(45,76,58,0.1)',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ maxWidth: '240px', zIndex: 2 }}>
                <h3
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#162C1F',
                    marginBottom: '0.65rem',
                  }}
                >
                  BESPOKE CUSTOMIZATION
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#656D67', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Choose your fabric, color &amp; configuration.
                </p>
                <button
                  onClick={() => setIsEnquireOpen(true)}
                  style={{
                    backgroundColor: '#FAF7F2',
                    border: '1px solid rgba(45,76,58,0.3)',
                    borderRadius: '6px',
                    padding: '0.65rem 1.15rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#162C1F',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:bg-[#162C1F] hover:text-[#FFFFFF]"
                >
                  EXPLORE OPTIONS
                </button>
              </div>

              {/* Fanned Swatches Visual Artwork */}
              <div
                style={{
                  width: '200px',
                  height: '140px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=500&q=80"
                  alt="Fabric swatches fan"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transform: 'rotate(-5deg)',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ══ 7. TRUST BADGES STRIP ══════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            background: '#FFFFFF',
            border: '1px solid rgba(45,76,58,0.1)',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            marginTop: '3.5rem',
          }}
        >
          {TRUST_BADGES.map((b) => (
            <div key={b.title} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ flexShrink: 0 }}>{b.icon}</div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#162C1F', marginBottom: '2px' }}>{b.title}</div>
                <div style={{ fontSize: '0.72rem', color: '#767C78' }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ══ MODALS: ALL MEDIA GRID, FULLSCREEN, DIMENSIONS, ENQUIRE ══ */}
      <MediaGridModal
        isOpen={isMediaGridOpen}
        onClose={() => setIsMediaGridOpen(false)}
        images={product.images || []}
        currentIndex={currentMediaIdx}
        onSelectMedia={(idx) => setCurrentMediaIdx(idx)}
      />

      {isFullscreen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.97)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
          <button
            onClick={handlePrev}
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '3rem', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', padding: '1rem' }}
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '3rem', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', padding: '1rem' }}
          >
            ›
          </button>
          <img
            src={images[currentMediaIdx]}
            alt={product.title}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
          />
        </div>
      )}

      {isDimensionsOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 95,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(45,76,58,0.15)',
              borderRadius: '16px',
              maxWidth: '520px',
              width: '100%',
              padding: '2rem',
              textAlign: 'left',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(45,76,58,0.1)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '0.92rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#162C1F', fontWeight: 800, margin: 0 }}>
                Architectural Specifications
              </h3>
              <button onClick={() => setIsDimensionsOpen(false)} style={{ background: 'none', border: 'none', color: '#162C1F', fontSize: '1.2rem', cursor: 'pointer' }}>
                ✕
              </button>
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#162C1F', marginBottom: '0.4rem' }}>{product.title}</p>
            <p style={{ fontSize: '0.92rem', color: '#AC6644', fontWeight: 600, marginBottom: '1.25rem' }}>
              {product.dimensions || 'W 198 x D 95 x H 102 cm'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem', color: '#3A423D', lineHeight: 1.6 }}>
              <div><strong>Frame:</strong> Kiln-Dried Hardwood</div>
              <div><strong>Mechanism:</strong> Dual Electric Recline</div>
              <div><strong>Foam:</strong> 35-Density High Resilience</div>
              <div><strong>Ports:</strong> USB-A &amp; USB-C Rapid</div>
            </div>
          </div>
        </div>
      )}

      <EnquireModal
        isOpen={isEnquireOpen}
        onClose={() => setIsEnquireOpen(false)}
        productTitle={product.title}
        variant={product.groupName || 'Artisanal Furniture'}
      />
    </div>
  );
};
