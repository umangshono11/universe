import React from 'react';
import { ArrowRight } from 'lucide-react';

/* ── Color palette swatches ──────────────────────────────────── */
const PALETTE = [
  { color: '#2D4C3A', label: 'Ekkayi Forest Green (#2D4C3A),' },
  { color: '#AC6644', label: 'Terracotta Clay (#AC6644),' },
  { color: '#DAC8B1', label: 'Unbleached Sand (#DAC8B1),', border: true },
  { color: '#0A0A0A', label: 'Charred Shou Sugi Ban Wood (#0A0AAA),' },
  { color: '#F0E8DD', label: 'and Soft Parchment (#F0E8DD).', border: true },
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
    label: 'ARTISANAL\nHANDCRAFT',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/>
        <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/>
        <path d="M6 18v2"/><path d="M18 18v2"/>
      </svg>
    ),
    stat: '20+',
    label: 'FURNITURE\nDESIGNS',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    stat: 'GRADE-A',
    label: 'KILN-DRIED\nHARDWOOD',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>
      </svg>
    ),
    stat: 'BESPOKE',
    label: 'CUSTOM MODULAR\nSIZES',
  },
];

/* ── Values strip ────────────────────────────────────────────── */
const VALUES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#AC6644" strokeWidth="1.4">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'SUSTAINABLY SOURCED',
    sub: 'Responsibly selected raw materials',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#AC6644" strokeWidth="1.4">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h6"/>
      </svg>
    ),
    title: 'CRAFTED TO LAST',
    sub: 'Timeless designs, built for generations',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#AC6644" strokeWidth="1.4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'ETHICAL & MINDFUL',
    sub: 'Conscious practices for people and planet',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#AC6644" strokeWidth="1.4">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    ),
    title: 'PERSONALIZED SERVICE',
    sub: 'Design guidance & bespoke solutions',
  },
];

export const AboutPage = ({ onNavigate }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F5EFE6',
        color: '#0A0A0A',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Subtle organic palm shadow watermark background at top left */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '450px',
          height: '450px',
          backgroundImage: 'radial-gradient(ellipse at 10% 10%, rgba(45, 76, 58, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ══ 1. HERO SECTION: Split Layout ═══════════════════════ */}
      <section style={{ paddingTop: '6.5rem', paddingBottom: '2.5rem', position: 'relative', zIndex: 2 }}>
        <div className="kdh-container">
          <div className="about-hero-grid">
            {/* Left: Text */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.72rem',
                  color: 'var(--terracotta)',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                <span style={{ display: 'inline-block', width: '26px', height: '1.5px', background: 'var(--terracotta)' }} />
                OUR STORY
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.5rem, 5.2vw, 3.8rem)',
                  fontWeight: 400,
                  color: '#162C1F',
                  lineHeight: 1.1,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}
              >
                ABOUT EKKAYI
              </h1>

              <p
                style={{
                  color: '#4D5450',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  maxWidth: '420px',
                  letterSpacing: '0.01em',
                }}
              >
                Artisanal luxury furniture and architectural living created with raw materials, master carpentry, and modern geometry.
              </p>
            </div>

            {/* Right: Arched Sanctuary Living Room Image */}
            <div style={{ position: 'relative', width: '100%' }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  maxHeight: '480px',
                  borderRadius: '160px 0 0 160px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(22, 44, 31, 0.08)',
                  background: '#EAE2D5',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                  alt="EKKAYI sanctuary interior living room"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. BRAND STORY FLOATING CARD (Deep Forest Green) ═══ */}
      <section style={{ padding: '1rem 0 2rem', position: 'relative', zIndex: 2 }}>
        <div className="kdh-container">
          <div
            style={{
              background: '#1A3324',
              borderRadius: '24px',
              border: '1px solid rgba(197, 167, 92, 0.25)',
              boxShadow: '0 25px 60px rgba(22, 44, 31, 0.18)',
              overflow: 'hidden',
              padding: 'clamp(2rem, 4vw, 3.25rem)',
            }}
          >
            <div className="about-brand-grid">
              {/* Left Column: Emblem + Typography */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  paddingRight: 'clamp(1rem, 2.5vw, 2.5rem)',
                  gap: '0.85rem',
                }}
              >
                <img
                  src="/ekkayi-logo.svg"
                  alt="EKKAYI"
                  style={{ width: '85px', height: '85px', objectFit: 'contain', filter: 'brightness(1.05)' }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    letterSpacing: '0.22em',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}
                >
                  EKKAYI
                </span>
                <p
                  style={{
                    fontSize: '0.62rem',
                    color: 'rgba(240, 232, 221, 0.75)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    lineHeight: 1.5,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  ARTISANAL FURNITURE •<br />ARCHITECTURAL SANCTUARIES
                </p>
              </div>

              {/* Right Column: Narrative Content & Earthy Swatches */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  color: 'rgba(240, 232, 221, 0.92)',
                  fontSize: '0.92rem',
                  lineHeight: 1.8,
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>EKKAYI</strong> is born out of a passion for authentic raw materiality, timeless proportion, and uncompromising Indian and European artisanal craft.
                </p>

                <div>
                  <p style={{ margin: '0 0 0.5rem 0', color: 'rgba(240, 232, 221, 0.85)' }}>
                    Our aesthetic is anchored in an earthy palette derived directly from the earth:
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '0.4rem 0.85rem',
                      fontSize: '0.8rem',
                    }}
                  >
                    {PALETTE.map((p) => (
                      <div key={p.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '11px',
                            height: '11px',
                            borderRadius: '50%',
                            backgroundColor: p.color,
                            border: p.border ? '1px solid rgba(255,255,255,0.4)' : 'none',
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ color: 'rgba(240, 232, 221, 0.82)' }}>{p.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p style={{ margin: 0, color: 'rgba(240, 232, 221, 0.85)' }}>
                  The EKKAYI mark is a geometric abstraction of growth and human precision. The outer organic curve represents the arc of the natural palm canopy, while the interior linework and golden focal point celebrate human engineering, mindfulness, and the beauty of bespoke sanctuaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. QUOTE & CRAFTSMAN CARD ═══════════════════════════ */}
      <section style={{ padding: '1.25rem 0', position: 'relative', zIndex: 2 }}>
        <div className="kdh-container">
          <div
            style={{
              background: '#FAF6EE',
              borderRadius: '24px',
              border: '1px solid rgba(45, 76, 58, 0.12)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.03)',
              overflow: 'hidden',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              position: 'relative',
            }}
          >
            <div className="about-quote-grid">
              {/* Left: Woodworker Craftsman Hand Carving */}
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  aspectRatio: '16/10',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                  background: '#E5DDCF',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                  alt="Master carpenter hand-sculpting timber"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Right: Terracotta Quote & Delicate Botanical Watermark */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  paddingLeft: 'clamp(0.5rem, 2vw, 2rem)',
                }}
              >
                {/* Large terracotta double quotation symbol */}
                <div
                  style={{
                    color: 'var(--terracotta)',
                    fontSize: '4.5rem',
                    lineHeight: 0.8,
                    fontFamily: 'Georgia, serif',
                    marginBottom: '0.75rem',
                  }}
                >
                  “
                </div>

                <blockquote
                  style={{
                    margin: 0,
                    padding: 0,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
                    fontStyle: 'italic',
                    color: '#243229',
                    lineHeight: 1.65,
                    fontWeight: 400,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  At EKKAYI, every piece is sculpted to command attention—bridging the space between monumental architectural sculpture and everyday tactile comfort.
                </blockquote>

                {/* Delicate Botanical Sage Leaf Branch Illustration Watermark */}
                <div
                  style={{
                    position: 'absolute',
                    right: '0',
                    bottom: '-10px',
                    width: '120px',
                    height: '120px',
                    opacity: 0.25,
                    pointerEvents: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='%232D4C3A' stroke-width='1.5'%3E%3Cpath d='M80 20 Q50 60 20 90'/%3E%3Cpath d='M65 35 Q75 30 78 25 Q70 24 65 35' fill='%232D4C3A' fill-opacity='0.15'/%3E%3Cpath d='M50 50 Q60 45 64 38 Q56 38 50 50' fill='%232D4C3A' fill-opacity='0.15'/%3E%3Cpath d='M35 65 Q45 60 48 53 Q40 53 35 65' fill='%232D4C3A' fill-opacity='0.15'/%3E%3Cpath d='M55 45 Q45 40 42 35 Q48 34 55 45' fill='%232D4C3A' fill-opacity='0.15'/%3E%3Cpath d='M40 60 Q30 55 28 48 Q35 48 40 60' fill='%232D4C3A' fill-opacity='0.15'/%3E%3C/svg%3E")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. METRICS / STATS CARD ═════════════════════════════ */}
      <section style={{ padding: '1.25rem 0', position: 'relative', zIndex: 2 }}>
        <div className="kdh-container">
          <div
            style={{
              background: '#FAF6EE',
              borderRadius: '24px',
              border: '1px solid rgba(45, 76, 58, 0.12)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.03)',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {STATS.map((s) => (
                <div key={s.stat} style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
                  {/* Dark green badge with white icon */}
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      background: '#1A3324',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 6px 16px rgba(26, 51, 36, 0.2)',
                    }}
                  >
                    {s.icon}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: '#162C1F',
                        lineHeight: 1.1,
                      }}
                    >
                      {s.stat}
                    </div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#656D67',
                        letterSpacing: '0.12em',
                        lineHeight: 1.35,
                        whiteSpace: 'pre-line',
                        marginTop: '3px',
                        borderBottom: '1.5px solid rgba(45, 76, 58, 0.2)',
                        paddingBottom: '3px',
                        display: 'inline-block',
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. ACTION BUTTONS ════════════════════════════════════ */}
      <section style={{ padding: '1.5rem 0', position: 'relative', zIndex: 2 }}>
        <div className="kdh-container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <button
              onClick={() => {
                onNavigate('/collections');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: '#1A3324',
                color: '#FFFFFF',
                border: 'none',
                padding: '1rem 1.85rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(26, 51, 36, 0.25)',
                transition: 'all 0.25s ease',
              }}
              className="hover:scale-[1.02] hover:bg-[#234230]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/>
                <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/>
              </svg>
              BROWSE FURNITURE COLLECTIONS <ArrowRight size={15} />
            </button>

            <button
              onClick={() => {
                onNavigate('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: '#FAF6EE',
                color: '#162C1F',
                border: '1.5px solid rgba(45, 76, 58, 0.35)',
                padding: '1rem 1.85rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.25s ease',
              }}
              className="hover:bg-[#FFFFFF] hover:border-[#1A3324] hover:scale-[1.02]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
              INQUIRE BESPOKE COMMISSION <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ══ 6. VALUES STRIP ══════════════════════════════════════ */}
      <section style={{ padding: '1rem 0 4.5rem', position: 'relative', zIndex: 2 }}>
        <div className="kdh-container">
          <div
            style={{
              background: '#FAF6EE',
              borderRadius: '24px',
              border: '1px solid rgba(45, 76, 58, 0.12)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.03)',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {VALUES.map((v) => (
                <div key={v.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ flexShrink: 0, marginTop: '2px' }}>{v.icon}</div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: '#162C1F',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      {v.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#68706B', lineHeight: 1.5 }}>{v.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
