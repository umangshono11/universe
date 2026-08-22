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
  const { cartCount, setIsCartOpen } = useCart();

  const isLightPage = currentPath !== '/' && !currentPath.startsWith('/productdetails');

  return (
    <>
      <nav 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          pointerEvents: 'none'
        }}
      >
        {/* Left: Burger Menu Button */}
        <div style={{ pointerEvents: 'auto' }} className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className={`nav-menu-btn ${isMenuOpen ? 'open' : ''}`}
            aria-label="Toggle navigation menu"
            title="Toggle Menu"
            style={isLightPage ? {
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(45, 76, 58, 0.2)',
              boxShadow: '0 4px 15px rgba(45, 76, 58, 0.08)'
            } : {}}
          >
            <span style={isLightPage ? { background: 'var(--ekkayi-forest)' } : {}} />
            <span style={isLightPage ? { background: 'var(--ekkayi-forest)' } : {}} />
            <span style={isLightPage ? { background: 'var(--ekkayi-forest)' } : {}} />
          </button>
        </div>

        {/* Center: EKKAYI Brand Logo */}
        <div 
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'auto',
            textAlign: 'center'
          }}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-block transition-transform duration-300 hover:scale-105"
            aria-label="EKKAYI Home"
          >
            <img 
              src={isLightPage ? "/ekkayi-nav-logo-green.svg" : "/ekkayi-nav-logo.svg"} 
              alt="EKKAYI" 
              style={{
                height: '38px',
                width: 'auto',
                maxWidth: '180px',
                objectFit: 'contain',
                filter: isLightPage ? 'none' : 'drop-shadow(0 2px 12px rgba(0,0,0,0.8))'
              }}
            />
          </a>
        </div>

        {/* Right: Sound, Search & Cart Controls */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            pointerEvents: 'auto'
          }}
        >
          {/* Ambient Sound Toggle */}
          <button
            onClick={onAudioToggle}
            style={{
              padding: '0.55rem',
              borderRadius: '50%',
              backgroundColor: isLightPage ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              border: isLightPage ? '1px solid rgba(45, 76, 58, 0.2)' : '1px solid rgba(255, 255, 255, 0.12)',
              color: isAudioPlaying ? 'var(--gold)' : (isLightPage ? 'var(--ekkayi-forest)' : 'rgba(255, 255, 255, 0.75)'),
              boxShadow: isLightPage ? '0 4px 15px rgba(45, 76, 58, 0.08)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            className={isLightPage ? "hover:bg-[#2D4C3A] hover:text-white" : "hover:bg-black/80 hover:text-white"}
            title={isAudioPlaying ? "Mute Ambient Sound" : "Play Ambient Sound"}
          >
            {isAudioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Search Trigger */}
          <button
            onClick={onSearchOpen}
            style={{
              padding: '0.55rem',
              borderRadius: '50%',
              backgroundColor: isLightPage ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              border: isLightPage ? '1px solid rgba(45, 76, 58, 0.2)' : '1px solid rgba(255, 255, 255, 0.12)',
              color: isLightPage ? 'var(--ekkayi-forest)' : '#ffffff',
              boxShadow: isLightPage ? '0 4px 15px rgba(45, 76, 58, 0.08)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            className={isLightPage ? "hover:bg-[#2D4C3A] hover:text-white" : "hover:bg-black/80 hover:text-white"}
            title="Search Products & Collections"
          >
            <Search size={18} />
          </button>

          {/* Shopping Cart Button with Count Badge */}
          <button
            onClick={() => onNavigate('/cart')}
            style={{
              position: 'relative',
              padding: '0.55rem',
              borderRadius: '50%',
              backgroundColor: isLightPage ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              border: isLightPage ? '1px solid rgba(45, 76, 58, 0.2)' : '1px solid rgba(255, 255, 255, 0.12)',
              color: isLightPage ? 'var(--ekkayi-forest)' : '#ffffff',
              boxShadow: isLightPage ? '0 4px 15px rgba(45, 76, 58, 0.08)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            className={isLightPage ? "hover:bg-[#2D4C3A] hover:text-white" : "hover:bg-black/80 hover:text-white"}
            title="View Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: isLightPage ? 'var(--terracotta)' : 'var(--gold)',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
