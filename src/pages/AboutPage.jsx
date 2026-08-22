import React from 'react';
import { ArrowRight } from 'lucide-react';

/* ── Color palette swatches ──────────────────────────────────── */
const PALETTE = [
  { color: '#2D4C3A', label: 'Ekkayi Forest Green (#2D4C3A)' },
  { color: '#AC6644', label: 'Terracotta Clay (#AC6644)' },
  { color: '#DAC8B1', label: 'Unbleached Sand (#DAC8B1)', border: true },
  { color: '#0A0A0A', label: 'Charred Shou Sugi Ban Wood (#0A0AAA)' },
  { color: '#F0E8DD', label: 'Soft Parchment (#F0EBDD)', border: true },
];

/* ── Stats ───────────────────────────────────────────────────── */
const STATS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    stat: '100%',
    label: 'Artisanal\nHandcraft',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    stat: '20+',
    label: 'Furniture\nDesigns',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    stat: 'Grade-A',
    label: 'Kiln-Dried\nHardwood',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
    stat: 'Bespoke',
    label: 'Custom Modular\nSizes',
  },
];

/* ── Values strip ────────────────────────────────────────────── */
const VALUES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.6">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Sustainably Sourced',
    sub: 'Responsibly selected raw materials',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.6">
        <path d="M2 20h20M6 20V10M12 20V4M18 20v-8"/>
      </svg>
    ),
    title: 'Crafted to Last',
    sub: 'Timeless designs, built for generations',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Ethical & Mindful',
    sub: 'Conscious practices for people and planet',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l4 2"/>
      </svg>
    ),
    title: 'Personalized Service',
    sub: 'Design guidance & bespoke solutions',
  },
];

export const AboutPage = ({ onNavigate }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E8', color: '#0A0A0A' }}>

      {/* ══ HERO: Split layout ═══════════════════════════════════ */}
      <div style={{ paddingTop: '6.5rem', paddingBottom: 0 }}>
        <div className="kdh-container">
          <div className="about-hero-grid">

            {/* Left: text */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '1rem' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--terracotta)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'var(--terracotta)' }} />
                Our Story
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.6rem, 5vw, 4rem)', fontWeight: 500, color: '#0A0A0A', lineHeight: 1.1, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.35rem' }}>
                About EKKAYI
              </h1>
              <p style={{ color: '#555A56', fontSize: '1rem', lineHeight: 1.75, maxWidth: '360px' }}>
                Artisanal luxury furniture and architectural living created with raw materials, master carpentry, and modern geometry.
              </p>
            </div>

            {/* Right: large image */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '0 0 0 80px', overflow: 'hidden', aspectRatio: '4/3.2', background: '#2D4C3A' }}>
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
                  alt="EKKAYI luxury interior"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ BRAND STORY CARD ═════════════════════════════════════ */}
      <div style={{ margin: '3rem 0', padding: '3rem 0', background: 'var(--ekkayi-forest)' }}>
        <div className="kdh-container">
          <div className="about-brand-grid">

            {/* Left: logo */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', padding: '1.5rem 2rem 1.5rem 0', borderRight: '1px solid rgba(255,255,255,0.12)' }}>
              <img src="/ekkayi-logo.svg" alt="EKKAYI mark" style={{ width: '90px', height: '90px', objectFit: 'contain', filter: 'brightness(1.1)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.18em', fontFamily: 'var(--font-sans)' }}>EKKAYI</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(240,232,221,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px', lineHeight: 1.4 }}>
                  Artisanal Furniture •<br/>Architectural Sanctuaries
                </div>
              </div>
            </div>

            {/* Right: narrative */}
            <div style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <p style={{ color: 'rgba(240,232,221,0.92)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                <strong style={{ color: '#DAC8B1' }}>EKKAYI</strong> is born out of a passion for authentic raw materiality, timeless proportion, and uncompromising Indian and European artisanal craft.
              </p>

              {/* Color palette */}
              <div>
                <p style={{ color: 'rgba(240,232,221,0.75)', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '0.6rem' }}>
                  Our aesthetic is anchored in an earthy palette derived directly from the earth:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem' }}>
                  {PALETTE.map(p => (
                    <div key={p.color} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: p.color, border: p.border ? '1.5px solid rgba(255,255,255,0.3)' : 'none', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.72rem', color: 'rgba(240,232,221,0.8)' }}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p style={{ color: 'rgba(240,232,221,0.82)', fontSize: '0.88rem', lineHeight: 1.8 }}>
                The EKKAYI mark is a geometric abstraction of growth and human precision. The outer organic curve represents the arc of the natural palm canopy, while the interior linework and golden focal point celebrate human engineering, mindfulness, and the beauty of bespoke sanctuaries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ QUOTE SECTION ════════════════════════════════════════ */}
      <div style={{ background: '#F5F0E8', padding: '3.5rem 0' }}>
        <div className="kdh-container">
          <div className="about-quote-grid">

            {/* Left: craftsman image */}
            <div style={{ borderRadius: '14px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img
                src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=800&q=80"
                alt="Artisan crafting furniture"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Right: quote */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem 0 1.5rem 1.5rem', position: 'relative' }}>
              {/* Big quote mark */}
              <div style={{ fontSize: '6rem', lineHeight: 0.8, color: 'var(--terracotta)', fontFamily: 'Georgia, serif', marginBottom: '0.75rem', opacity: 0.9 }}>"</div>
              <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', fontStyle: 'italic', color: '#1A1A1A', lineHeight: 1.6, fontWeight: 400, margin: 0 }}>
                At EKKAYI, every piece is sculpted to command attention—bridging the space between monumental architectural sculpture and everyday tactile comfort.
              </blockquote>

              {/* Botanical illustration / decorative */}
              <div style={{ position: 'absolute', right: '-10px', bottom: '0', opacity: 0.08, fontSize: '120px', lineHeight: 1, pointerEvents: 'none' }}>🌿</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ STATS BAR ════════════════════════════════════════════ */}
      <div style={{ background: '#FFFFFF', borderTop: '1px solid rgba(45,76,58,0.1)', borderBottom: '1px solid rgba(45,76,58,0.1)', padding: '2.5rem 0' }}>
        <div className="kdh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem' }}>
            {STATS.map((s) => (
              <div key={s.stat} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Circle icon */}
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--ekkayi-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0A0A0A', lineHeight: 1.1 }}>{s.stat}</div>
                  <div style={{ fontSize: '0.68rem', color: '#7A807C', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, lineHeight: 1.4, whiteSpace: 'pre-line', marginTop: '2px' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CTA BUTTONS ══════════════════════════════════════════ */}
      <div style={{ padding: '2.5rem 0', background: '#F5F0E8' }}>
        <div className="kdh-container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={() => onNavigate('/collections')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--ekkayi-forest)', color: '#FFFFFF', border: 'none', padding: '1rem 1.75rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '6px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(45,76,58,0.25)', transition: 'all 0.2s ease' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              Browse Furniture Collections <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'transparent', color: 'var(--ekkayi-forest)', border: '1.5px solid var(--ekkayi-forest)', padding: '1rem 1.75rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              Inquire Bespoke Commission <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ══ VALUES STRIP ═════════════════════════════════════════ */}
      <div style={{ borderTop: '1px solid rgba(45,76,58,0.1)', padding: '2.5rem 0', background: '#F5F0E8' }}>
        <div className="kdh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem 2.5rem' }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <span style={{ flexShrink: 0, marginTop: '2px' }}>{v.icon}</span>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '3px' }}>{v.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#7A807C', lineHeight: 1.5 }}>{v.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
