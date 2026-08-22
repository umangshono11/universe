import React, { useState, useEffect } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1600; // 1.6s smooth luxury sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          // Wait for the full opacity transition (700ms) + small buffer (80ms)
          // before calling onComplete, so the page content is fully painted
          // and stable underneath — prevents the blink/flash on unmount.
          setTimeout(() => {
            if (onComplete) onComplete();
            setTimeout(() => setIsHidden(true), 50);
          }, 780);
        }, 200);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Don't hard-unmount (return null) — use visibility:hidden instead to
  // avoid the layout-shift flash that happens when the DOM node disappears
  // at the exact same moment React paints the page content.
  if (isHidden) return <div style={{ display: 'none' }} />;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'all',
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Background Subtle Ambient Glow */}
      <div 
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 167, 92, 0.12) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Luxury Animated Counter */}
      <div 
        style={{
          fontSize: '3.5rem',
          fontWeight: 200,
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.08em',
          marginBottom: '1rem'
        }}
      >
        {progress}%
      </div>

      {/* Brand Logo & Signature */}
      <div style={{ textAlign: 'center', maxWidth: '320px' }}>
        <img 
          src="/ekkayi-logo.svg" 
          alt="EKKAYI" 
          style={{ width: '120px', height: 'auto', margin: '0 auto 0.75rem', display: 'block', filter: 'drop-shadow(0 0 20px rgba(197, 167, 92, 0.3))' }}
        />
        <div style={{ width: `${progress}%`, height: '1.5px', background: 'var(--gold)', margin: '0.75rem auto', transition: 'width 0.1s linear' }} />
        <p style={{
          color: 'var(--unbleached-sand)',
          fontSize: '0.68rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          opacity: 0.75
        }}>
          Artisanal Living • Architectural Furniture
        </p>
      </div>

      {/* Skip Button */}
      <button
        onClick={() => {
          setIsFading(true);
          setTimeout(() => {
            if (onComplete) onComplete();
            setTimeout(() => setIsHidden(true), 50);
          }, 480);
        }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          background: 'none',
          border: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          paddingBottom: '2px',
          cursor: 'pointer'
        }}
      >
        Skip Intro
      </button>
    </div>
  );
};
