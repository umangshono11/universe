import React from 'react';
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from './Icons';

export const Footer = ({ onNavigate = () => {} }) => {
  const footerSections = [
    {
      title: 'ABOUT',
      links: [
        { label: 'Our Story', href: '/about' },
        { label: 'Craftsmanship', href: '/about' },
        { label: 'Sustainability', href: '/about' },
      ],
    },
    {
      title: 'COLLECTIONS',
      links: [
        { label: 'Living Room', href: '/collections' },
        { label: 'Dining Room', href: '/collections' },
        { label: 'Bedroom', href: '/collections' },
        { label: 'Outdoor', href: '/collections' },
      ],
    },
    {
      title: 'PRESS & AWARDS',
      links: [
        { label: 'In The Press', href: '/press' },
        { label: 'Awards', href: '/press' },
        { label: 'Collaborations', href: '/press' },
      ],
    },
    {
      title: 'CONTACT US',
      links: [
        { label: 'Our Studios', href: '/contact' },
        { label: 'Enquiries', href: '/contact' },
        { label: 'Bespoke Projects', href: '/contact' },
      ],
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: '#162C1F',
        color: '#FFFFFF',
        position: 'relative',
        zIndex: 20,
        overflow: 'hidden',
        borderTop: '1px solid rgba(197, 167, 92, 0.25)',
      }}
    >
      {/* Decorative background chair ambient image in bottom right */}
      <div
        style={{
          position: 'absolute',
          right: '0',
          bottom: '0',
          width: '320px',
          height: '280px',
          backgroundImage: 'radial-gradient(circle at 80% 80%, rgba(45, 76, 58, 0.6) 0%, transparent 70%), url("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to top left, black 20%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to top left, black 20%, transparent 80%)',
        }}
      />

      <div className="kdh-container" style={{ paddingTop: '4rem', paddingBottom: '2.5rem', position: 'relative', zIndex: 2 }}>
        {/* Main Footer Top Grid */}
        <div className="ekkayi-footer-grid">
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', textDecoration: 'none' }}
              aria-label="EKKAYI Home"
            >
              <img
                src="/ekkayi-logo.svg"
                alt="EKKAYI"
                style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '0.5rem' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  letterSpacing: '0.18em',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  lineHeight: 1,
                }}
              >
                EKKAYI
              </span>
            </a>
            <p
              style={{
                fontSize: '0.68rem',
                color: 'var(--soft-parchment)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                opacity: 0.85,
                fontWeight: 500,
                lineHeight: 1.5,
                maxWidth: '220px',
                marginTop: '0.25rem',
              }}
            >
              Artisanal Luxury Furniture &amp; Architectural Living
            </p>
          </div>

          {/* Navigation Link Columns */}
          {footerSections.map((sec) => (
            <div key={sec.title} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                {sec.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {sec.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.href);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        fontSize: '0.8rem',
                        color: 'rgba(240, 232, 221, 0.78)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      className="hover:text-[#C5A75C] hover:translate-x-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              FOLLOW US
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  transition: 'all 0.2s ease',
                  background: 'rgba(255, 255, 255, 0.05)',
                }}
                className="hover:border-[#C5A75C] hover:text-[#C5A75C] hover:scale-105"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  transition: 'all 0.2s ease',
                  background: 'rgba(255, 255, 255, 0.05)',
                }}
                className="hover:border-[#C5A75C] hover:text-[#C5A75C] hover:scale-105"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://wa.me/+919820123456"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  transition: 'all 0.2s ease',
                  background: 'rgba(255, 255, 255, 0.05)',
                }}
                className="hover:border-[#C5A75C] hover:text-[#C5A75C] hover:scale-105"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bottom Row */}
        <div
          style={{
            marginTop: '3.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            fontSize: '0.72rem',
            color: 'rgba(240, 232, 221, 0.7)',
            letterSpacing: '0.08em',
          }}
          className="sm:flex-row"
        >
          <div>© {new Date().getFullYear()} EKKAYI. All Rights Reserved.</div>
          <div>Earthy Luxury • Artisanal Handcrafted Furniture</div>
        </div>
      </div>
    </footer>
  );
};
