import React from 'react';
import { ShoppingBag, Search, Volume2, VolumeX } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = ({ 
  onMenuToggle, 
  isMenuOpen, 
  onSearchOpen, 
  onNavigate, 
  currentPath = '/',
  isAudioPlaying = false,
  onAudioToggle = () => {}
}) => {
  const { cartCount } = useCart();
  const isLightPage = currentPath !== '/' && !currentPath.startsWith('/productdetails');

  /* ─── Shared icon button style ─────────────────────────── */
  const iconBtnStyle = {
    padding: '0.5rem',
    borderRadius: '50%',
    backgroundColor: isLightPage ? 'rgba(255,255,255,0.9)' : 'rgba(10,10,10,0.65)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: isLightPage
      ? '1px solid rgba(45,76,58,0.25)'
      : '1px solid rgba(255,255,255,0.2)',
    color: isLightPage ? 'var(--ekkayi-forest)' : '#ffffff',
    boxShadow: isLightPage
      ? '0 4px 15px rgba(45,76,58,0.1)'
      : '0 4px 15px rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    flexShrink: 0,
  };

  return (
    <>
      <nav className="ekkayi-navbar">

        {/* ── Left: Hamburger ──────────────────────────────── */}
        <div style={{ pointerEvents: 'auto', flexShrink: 0 }}>
          <button
            id="nav-menu-toggle"
            onClick={onMenuToggle}
            className={`nav-menu-btn ${isMenuOpen ? 'open' : ''}`}
            aria-label="Toggle navigation menu"
            style={isLightPage ? {
              backgroundColor: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(45,76,58,0.25)',
              boxShadow: '0 4px 15px rgba(45,76,58,0.1)'
            } : {
              backgroundColor: 'rgba(10,10,10,0.65)',
              border: '1px solid rgba(255,255,255,0.22)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}
          >
            <span style={isLightPage ? { background: 'var(--ekkayi-forest)' } : { background: '#ffffff' }} />
            <span style={isLightPage ? { background: 'var(--ekkayi-forest)' } : { background: '#ffffff' }} />
            <span style={isLightPage ? { background: 'var(--ekkayi-forest)' } : { background: '#ffffff' }} />
          </button>
        </div>

        {/* ── Center: Logo ─────────────────────────────────── */}
        <div className="ekkayi-nav-logo-wrap" style={{ pointerEvents: 'auto' }}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
            aria-label="EKKAYI Home"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {/* Mobile: icon-only mark */}
            <img
              src={isLightPage ? '/ekkayi-logo-green.svg' : '/ekkayi-logo.svg'}
              alt="EKKAYI"
              className="nav-logo-mobile"
              style={{
                height: '34px',
                width: '34px',
                objectFit: 'contain',
                filter: isLightPage ? 'none' : 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))'
              }}
            />
            {/* Desktop: full wordmark */}
            <img
              src={isLightPage ? '/ekkayi-nav-logo-green.svg' : '/ekkayi-nav-logo.svg'}
              alt="EKKAYI"
              className="nav-logo-desktop"
              style={{
                height: '36px',
                width: 'auto',
                maxWidth: '170px',
                objectFit: 'contain',
                filter: isLightPage ? 'none' : 'drop-shadow(0 2px 12px rgba(0,0,0,0.85))'
              }}
            />
          </a>
        </div>

        {/* ── Right: Sound + Search + Cart ─────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          pointerEvents: 'auto',
          flexShrink: 0,
        }}>
          {/* Ambient Sound Toggle */}
          <button
            id="nav-audio-toggle"
            onClick={onAudioToggle}
            style={{
              ...iconBtnStyle,
              color: isAudioPlaying ? 'var(--gold)' : iconBtnStyle.color
            }}
            title={isAudioPlaying ? 'Mute Ambient Sound' : 'Play Ambient Sound'}
          >
            {isAudioPlaying ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>

          {/* Search */}
          <button
            id="nav-search-open"
            onClick={onSearchOpen}
            style={iconBtnStyle}
            title="Search Products & Collections"
          >
            <Search size={17} />
          </button>

          {/* Cart */}
          <button
            id="nav-cart-btn"
            onClick={() => onNavigate('/cart')}
            style={{ ...iconBtnStyle, position: 'relative' }}
            title="View Cart"
          >
            <ShoppingBag size={17} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                background: isLightPage ? 'var(--terracotta)' : 'var(--gold)',
                color: '#FFFFFF',
                fontSize: '0.6rem',
                fontWeight: '700',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
