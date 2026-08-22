import React from 'react';
import { PRESS_ITEMS, AWARDS } from '../data/press';
import { Award, ExternalLink, Newspaper, Sparkles } from 'lucide-react';

export const PressPage = ({ onNavigate }) => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0E8DD 0%, #F7F3EC 40%, #E9DEC9 100%)', color: '#0A0A0A', paddingTop: '6.5rem', paddingBottom: '6rem' }}>
      <div className="kdh-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 500, color: 'var(--ekkayi-forest)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-block', paddingBottom: '0.75rem', borderBottom: '2px solid var(--terracotta)' }}>
            Press &amp; Recognition
          </h1>
          <p style={{ color: '#4A504C', fontSize: '1rem', marginTop: '1rem', letterSpacing: '0.02em', maxWidth: '680px', marginInline: 'auto', lineHeight: 1.7 }}>
            Critical acclaim and media coverage celebrating EKKAYI's architectural furniture and interior sanctuaries across Architectural Digest, Elle Decor, and Vogue Living.
          </p>
        </div>

        {/* Featured Press Stories */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2.5rem 2rem',
            marginBottom: '5rem'
          }}
        >
          {PRESS_ITEMS.map((item) => (
            <article
              key={item.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(45, 76, 58, 0.15)',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(45, 76, 58, 0.06)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
              className="group hover:border-[#2D4C3A] hover:shadow-xl"
            >
              <div>
                <div style={{ height: '220px', background: '#F0E8DD', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    className="group-hover:scale-105"
                  />
                </div>

                <div style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--terracotta)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: '700' }}>
                      {item.publication}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#7A807C' }}>
                      {item.date}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: '600', color: 'var(--ekkayi-forest)', lineHeight: '1.4', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#4A504C', lineHeight: '1.6' }}>
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div style={{ padding: '0 1.75rem 1.75rem' }}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.76rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--ekkayi-forest)',
                    fontWeight: 700
                  }}
                  className="hover:text-[#AC6644] transition-colors"
                >
                  Read Feature <ExternalLink size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Awards Section */}
        <div style={{ maxWidth: '900px', margin: '0 auto', background: '#FFFFFF', border: '1px solid rgba(45, 76, 58, 0.15)', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 12px 35px rgba(45, 76, 58, 0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: '600', color: 'var(--ekkayi-forest)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Design Honors &amp; Accolades
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {AWARDS.map((award, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  background: 'linear-gradient(135deg, #F0E8DD 0%, #F5EFE6 100%)',
                  borderRadius: '8px',
                  border: '1px solid rgba(45, 76, 58, 0.12)',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Award size={20} style={{ color: 'var(--terracotta)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--ekkayi-forest)', fontSize: '0.9rem' }}>{award.title}</strong>
                    <p style={{ color: '#555A56', fontSize: '0.75rem', marginTop: '2px' }}>{award.organization} • {award.project}</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--ekkayi-forest)', fontWeight: '700', letterSpacing: '0.1em' }}>
                  {award.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
