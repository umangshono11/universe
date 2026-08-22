import React, { useState } from 'react';
import { MANDIRS } from '../data/mandirs';
import { ChevronLeft, ChevronRight, Sparkles, MessageSquare, Check } from 'lucide-react';
import { EnquireModal } from '../components/EnquireModal';

export const MandirsPage = ({ onNavigate }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);

  const mandir = MANDIRS[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % MANDIRS.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + MANDIRS.length) % MANDIRS.length);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0E8DD 0%, #F7F3EC 40%, #E9DEC9 100%)', color: '#0A0A0A', paddingTop: '6.5rem', paddingBottom: '6rem' }}>
      <div className="kdh-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 500, color: 'var(--ekkayi-forest)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-block', paddingBottom: '0.75rem', borderBottom: '2px solid var(--terracotta)' }}>
            Sacred Mandirs
          </h1>
          <p style={{ color: '#4A504C', fontSize: '1rem', marginTop: '1rem', letterSpacing: '0.02em', maxWidth: '680px', marginInline: 'auto', lineHeight: 1.7 }}>
            Bespoke prayer sanctuaries reimagined through solid hardwood carpentry, warm backlighting, and Vedic sacred geometry.
          </p>
        </div>

        {/* 3D Perspective Carousel Stage */}
        <div 
          style={{
            position: 'relative',
            maxWidth: '900px',
            margin: '0 auto',
            minHeight: '440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px'
          }}
        >
          {/* Arrow Left */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '-1rem',
              zIndex: 30,
              background: '#FFFFFF',
              border: '1px solid rgba(45, 76, 58, 0.2)',
              color: 'var(--ekkayi-forest)',
              padding: '0.75rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
            className="hover:bg-[#2D4C3A] hover:text-white transition-all"
            title="Previous Mandir Design"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Track */}
          <div style={{ position: 'relative', width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {MANDIRS.map((item, index) => {
              const offset = index - currentIdx;
              const isActive = index === currentIdx;
              const isPrev = offset === -1 || (currentIdx === 0 && index === MANDIRS.length - 1);
              const isNext = offset === 1 || (currentIdx === MANDIRS.length - 1 && index === 0);

              let transform = 'scale(0.7) translateZ(-300px)';
              let opacity = 0;
              let zIndex = 5;

              if (isActive) {
                transform = 'scale(1) translateZ(0)';
                opacity = 1;
                zIndex = 20;
              } else if (isPrev) {
                transform = 'scale(0.82) translateX(-240px) translateZ(-150px) rotateY(18deg)';
                opacity = 0.6;
                zIndex = 10;
              } else if (isNext) {
                transform = 'scale(0.82) translateX(240px) translateZ(-150px) rotateY(-18deg)';
                opacity = 0.6;
                zIndex = 10;
              }

              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentIdx(index)}
                  style={{
                    position: 'absolute',
                    width: '320px',
                    height: '380px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: isActive ? '2px solid var(--ekkayi-forest)' : '1px solid rgba(45, 76, 58, 0.15)',
                    boxShadow: isActive ? '0 20px 50px rgba(45, 76, 58, 0.15)' : 'none',
                    transform,
                    opacity,
                    zIndex,
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      background: 'linear-gradient(to top, rgba(45, 76, 58, 0.95) 0%, transparent 100%)',
                      padding: '1.5rem 1rem 1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '1.15rem', fontWeight: '700', color: '#FFFFFF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      Mandir {item.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--soft-parchment)', letterSpacing: '0.1em', fontWeight: 600 }}>
                      {item.year} EDITION
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrow Right */}
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '-1rem',
              zIndex: 30,
              background: '#FFFFFF',
              border: '1px solid rgba(45, 76, 58, 0.2)',
              color: 'var(--ekkayi-forest)',
              padding: '0.75rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
            className="hover:bg-[#2D4C3A] hover:text-white transition-all"
            title="Next Mandir Design"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Selected Mandir Full Specs & Details */}
        <div 
          style={{
            maxWidth: '840px',
            margin: '3.5rem auto 0',
            background: '#FFFFFF',
            border: '1px solid rgba(45, 76, 58, 0.15)',
            borderRadius: '16px',
            padding: '2.75rem',
            boxShadow: '0 12px 35px rgba(45, 76, 58, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(45, 76, 58, 0.12)', paddingBottom: '1.5rem', marginBottom: '1.75rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--terracotta)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                Bespoke Sacred Architecture
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: '600', color: 'var(--ekkayi-forest)', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                Mandir {mandir.name} ({mandir.year})
              </h2>
            </div>

            <button
              onClick={() => setIsEnquireOpen(true)}
              style={{
                background: 'var(--ekkayi-forest)',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.85rem 1.4rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(45, 76, 58, 0.25)'
              }}
            >
              <MessageSquare size={16} />
              Commission Custom Mandir
            </button>
          </div>

          <p style={{ color: '#4A504C', fontSize: '0.95rem', lineHeight: '1.8', whiteSpace: 'pre-line', marginBottom: '2rem' }}>
            {mandir.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '0.72rem', color: 'var(--terracotta)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 700 }}>
                Material Composition
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#1A1A1A', fontWeight: 600 }}>
                {mandir.material}
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.72rem', color: 'var(--terracotta)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 700 }}>
                Architectural Dimensions
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#1A1A1A', fontWeight: 600 }}>
                {mandir.dimensions}
              </p>
            </div>
          </div>

          {/* Key Sanctum Features */}
          {mandir.features && (
            <div>
              <h4 style={{ fontSize: '0.72rem', color: 'var(--terracotta)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.85rem', fontWeight: 700 }}>
                Sanctuary Specifications
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                {mandir.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#3A403C', fontWeight: 500 }}>
                    <Check size={16} style={{ color: 'var(--ekkayi-forest)', flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <EnquireModal
        isOpen={isEnquireOpen}
        onClose={() => setIsEnquireOpen(false)}
        productTitle={`Bespoke Mandir ${mandir.name}`}
      />
    </div>
  );
};
