import React from 'react';
import { Sparkles, Award, Globe, Building, ArrowRight, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export const AboutPage = ({ onNavigate }) => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0E8DD 0%, #F7F3EC 40%, #E9DEC9 100%)', color: '#0A0A0A', paddingTop: '6.5rem', paddingBottom: '6rem' }}>
      <div className="kdh-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 500, color: 'var(--ekkayi-forest)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-block', paddingBottom: '0.75rem', borderBottom: '2px solid var(--terracotta)' }}>
            About EKKAYI
          </h1>
          <p style={{ color: '#4A504C', fontSize: '1rem', marginTop: '1rem', letterSpacing: '0.02em', maxWidth: '680px', marginInline: 'auto', lineHeight: 1.7 }}>
            Artisanal luxury furniture and architectural living created with raw materials, master carpentry, and modern geometry.
          </p>
        </div>

        {/* Brand Card & Story */}
        <div 
          style={{
            maxWidth: '980px',
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1px solid rgba(45, 76, 58, 0.15)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(45, 76, 58, 0.08)'
          }}
        >
          {/* Brand Visual Banner */}
          <div style={{ position: 'relative', height: '360px', overflow: 'hidden', background: '#2D4C3A' }}>
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
              alt="EKKAYI Atelier"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.85
              }}
            />
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(45, 76, 58, 0.95) 0%, rgba(45, 76, 58, 0.4) 60%, transparent 100%)'
              }}
            />
            <div 
              style={{
                position: 'absolute',
                bottom: '2rem',
                left: '2.5rem',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem'
              }}
            >
              <img src="/ekkayi-logo.svg" alt="EKKAYI" style={{ width: '75px', height: '75px', objectFit: 'contain' }} />
              <div>
                <h2 style={{ fontSize: '2.4rem', fontWeight: '700', color: '#FFFFFF', letterSpacing: '0.12em', fontFamily: 'var(--font-sans)' }}>
                  EKKAYI
                </h2>
                <p style={{ color: 'var(--soft-parchment)', fontSize: '0.85rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '2px', fontWeight: 600 }}>
                  Artisanal Furniture • Architectural Sanctuaries
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div style={{ padding: '3rem 2.5rem' }} className="md:px-14">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', color: '#333835', fontSize: '1rem', lineHeight: '1.8' }}>
              <p>
                <strong style={{ color: 'var(--ekkayi-forest)', fontSize: '1.15rem' }}>EKKAYI</strong> is born out of a passion for authentic raw materiality, timeless proportion, and uncompromising Indian and European artisanal craft.
              </p>

              <p>
                Our aesthetic is anchored in an earthy palette derived directly from the earth: <strong style={{ color: 'var(--ekkayi-forest)' }}>Ekkayi Forest Green (#2D4C3A)</strong>, <strong style={{ color: 'var(--terracotta)' }}>Terracotta Clay (#AC6644)</strong>, <strong style={{ color: '#8C7860' }}>Unbleached Sand (#DAC8B1)</strong>, <strong style={{ color: '#0A0A0A' }}>Charred Shou Sugi Ban Wood (#0A0A0A)</strong>, and <strong style={{ color: '#7A6B52' }}>Soft Parchment (#F0E8DD)</strong>.
              </p>

              <p>
                The EKKAYI mark is a geometric abstraction of growth and human precision. The outer organic curve represents the arc of the natural palm canopy, while the interior linework and golden focal point celebrate human engineering, mindfulness, and the beauty of bespoke sanctuaries.
              </p>

              <blockquote style={{
                background: 'rgba(45, 76, 58, 0.06)',
                borderLeft: '4px solid var(--ekkayi-forest)',
                borderRadius: '0 8px 8px 0',
                padding: '1.5rem 1.75rem',
                margin: '1.25rem 0',
                color: 'var(--ekkayi-forest)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                lineHeight: '1.6'
              }}>
                "At EKKAYI, every piece is sculpted to command attention—bridging the space between monumental architectural sculpture and everyday tactile comfort."
              </blockquote>
            </div>

            {/* Studio Metrics */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem',
                margin: '3rem 0 2rem',
                padding: '2rem',
                background: 'linear-gradient(135deg, #F0E8DD 0%, #F5EFE6 100%)',
                borderRadius: '12px',
                border: '1px solid rgba(45, 76, 58, 0.12)'
              }}
            >
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--ekkayi-forest)' }}>100%</div>
                <div style={{ fontSize: '0.75rem', color: '#555A56', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Artisanal Handcraft</div>
              </div>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--ekkayi-forest)' }}>20+</div>
                <div style={{ fontSize: '0.75rem', color: '#555A56', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Furniture Designs</div>
              </div>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--ekkayi-forest)' }}>Grade-A</div>
                <div style={{ fontSize: '0.75rem', color: '#555A56', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Kiln-Dried Hardwood</div>
              </div>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--ekkayi-forest)' }}>Bespoke</div>
                <div style={{ fontSize: '0.75rem', color: '#555A56', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Custom Modular Sizes</div>
              </div>
            </div>

            {/* Call to Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2.5rem' }}>
              <button
                onClick={() => onNavigate('/collections')}
                style={{
                  background: 'var(--ekkayi-forest)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.95rem 1.8rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(45, 76, 58, 0.25)'
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Browse Furniture Collections
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                style={{
                  background: '#FFFFFF',
                  color: 'var(--ekkayi-forest)',
                  border: '1.5px solid var(--ekkayi-forest)',
                  padding: '0.95rem 1.8rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                className="hover:bg-[#2D4C3A] hover:text-white transition-colors"
              >
                Inquire Bespoke Commission
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
