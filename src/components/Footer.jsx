import React, { useState } from 'react';
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from './Icons';

export const Footer = ({ onNavigate }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const footerLinks = [
    { label: 'About', href: '/about' },
    { label: 'Collections', href: '/collections' },
    { label: 'Press & Awards', href: '/press' },
    { label: 'Contact us', href: '/contact' }
  ];

  return (
    <footer 
      style={{
        backgroundColor: 'var(--ekkayi-forest)',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(197, 167, 92, 0.3)',
        position: 'relative',
        zIndex: 20
      }}
    >
      <div className="kdh-container" style={{ paddingTop: '3.5rem', paddingBottom: '3rem' }}>
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2.5rem'
          }}
          className="md:flex-row"
        >
          {/* Logo & Monogram */}
          <div style={{ textAlign: 'center' }} className="md:text-left">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
              style={{ display: 'inline-block' }}
              aria-label="EKKAYI Home"
            >
              <img 
                src="/ekkayi-logo.svg" 
                alt="EKKAYI" 
                style={{ width: '100px', height: 'auto', marginBottom: '0.5rem', objectFit: 'contain' }}
              />
            </a>
            <p style={{
              fontSize: '0.72rem',
              color: 'var(--soft-parchment)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              opacity: 0.9,
              fontWeight: 500
            }}>
              Artisanal Luxury Furniture &amp; Architectural Living
            </p>
          </div>

          {/* Navigation Links with Hover Blur */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem 2.25rem'
            }}
          >
            {footerLinks.map((link, idx) => {
              const isBlurred = hoveredIdx !== null && hoveredIdx !== idx;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.href);
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: '600',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--soft-parchment)',
                    filter: isBlurred ? 'blur(1.5px)' : 'none',
                    opacity: isBlurred ? 0.35 : 1,
                    transition: 'all 0.3s ease'
                  }}
                  className="hover:text-[#C5A75C]"
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Social Links */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                transition: 'all 0.2s ease'
              }}
              className="hover:border-gold hover:text-gold"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                transition: 'all 0.2s ease'
              }}
              className="hover:border-gold hover:text-gold"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a 
              href="https://wa.me/+919820123456" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                transition: 'all 0.2s ease'
              }}
              className="hover:border-gold hover:text-gold"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div 
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            fontSize: '0.7rem',
            color: 'rgba(240, 232, 221, 0.75)',
            letterSpacing: '0.1em'
          }}
          className="sm:flex-row"
        >
          <div>
            © {new Date().getFullYear()} EKKAYI. All Rights Reserved.
          </div>
          <div>
            Earthy Luxury • Artisanal Handcrafted Furniture
          </div>
        </div>
      </div>
    </footer>
  );
};
