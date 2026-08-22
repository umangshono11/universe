import React from 'react';
import { COLLABORATIONS } from '../data/collaborations';
import { ExternalLink, ArrowRight } from 'lucide-react';

export const CollaborationsPage = ({ onNavigate }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#000000', paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="kdh-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 className="section-title">
            Collaborations
          </h1>
          <p className="section-subtitle">
            Partnering with global titans of Italian marble craft, Austrian kinetic engineering, Scandinavian espresso technology, and heritage Indian tile artistry.
          </p>
        </div>

        {/* Collaborations Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', maxWidth: '1080px', margin: '0 auto' }}>
          {COLLABORATIONS.map((collab, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={collab.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '2.5rem',
                  alignItems: 'center',
                  background: 'rgba(16, 16, 18, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  padding: '2rem'
                }}
                className="md:grid-cols-2 group hover:border-gold transition-all"
              >
                {/* Visual */}
                <div 
                  style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    background: '#09090b',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    order: isEven ? 1 : 2
                  }}
                >
                  <img
                    src={collab.image}
                    alt={collab.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.4s ease' }}
                    className="group-hover:scale-105"
                  />
                  {collab.logo && (
                    <img
                      src={collab.logo}
                      alt={collab.name}
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        height: '28px',
                        width: 'auto',
                        filter: 'brightness(2)',
                        opacity: 0.8
                      }}
                    />
                  )}
                </div>

                {/* Text Content */}
                <div style={{ order: isEven ? 2 : 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    {collab.location} • {collab.year}
                  </div>

                  <h2 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#ffffff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {collab.name}
                  </h2>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {collab.collections.map((c, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.68rem',
                          color: '#ffffff',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          letterSpacing: '0.08em'
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.7' }}>
                    {collab.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                    {collab.link && (
                      <a
                        href={collab.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                        style={{ fontSize: '0.75rem', padding: '0.55rem 1.25rem' }}
                      >
                        Visit Partner Site
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <button
                      onClick={() => onNavigate('/collections')}
                      style={{ fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}
                      className="hover:underline"
                    >
                      View Pieces <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
