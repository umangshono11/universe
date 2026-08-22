import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from './Icons';

export const SidebarMenu = ({ isOpen, onClose, onNavigate, currentPath = '/' }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const menuItems = [
    { label: 'home', href: '/' },
    { label: 'about', href: '/about' },
    { label: 'collections', href: '/collections' },
    { label: 'press & awards', href: '/press' },
    { label: 'cart', href: '/cart' },
    { label: 'contact us', href: '/contact' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    onNavigate(href);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className={`sidebar-menu-drawer ${isOpen ? 'active' : ''}`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            color: 'rgba(255, 255, 255, 0.6)',
            padding: '0.5rem',
            borderRadius: '50%',
            transition: 'all 0.2s ease'
          }}
          className="hover:text-white hover:bg-white/10"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Brand Header */}
        <div style={{ marginBottom: '2rem' }}>
          <img 
            src="/ekkayi-logo.svg" 
            alt="EKKAYI" 
            style={{ width: '95px', height: 'auto', marginBottom: '0.85rem', objectFit: 'contain' }}
          />
          <p style={{
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--gold)',
            textTransform: 'uppercase'
          }}>
            Artisanal Furniture • Architecture
          </p>
        </div>

        {/* Navigation Links with Luxury Blur-On-Hover Effect */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {menuItems.map((item, idx) => {
            const isActive = currentPath === item.href;
            const isBlur = hoveredIndex !== null && hoveredIndex !== idx;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  fontSize: '1.4rem',
                  fontWeight: isActive ? '700' : '500',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--gold)' : '#ffffff',
                  filter: isBlur ? 'blur(2px)' : 'none',
                  opacity: isBlur ? 0.4 : 1,
                  transform: hoveredIndex === idx ? 'translateX(8px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'inline-block'
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Footer & Socials */}
        <div style={{ marginTop: 'auto', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
              title="Instagram"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="https://wa.me/+919820123456"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-colors"
              title="WhatsApp Enquiry"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              <WhatsAppIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
              title="LinkedIn"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              <LinkedInIcon size={20} />
            </a>
          </div>

          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
            © {new Date().getFullYear()} EKKAYI
          </p>
        </div>
      </aside>
    </>
  );
};
