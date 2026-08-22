import React, { useState } from 'react';
import { COLLECTIONS } from '../data/collections';
import { ArrowLeft, Download, Filter, Sparkles, Layers } from 'lucide-react';
import { CatalogueModal } from '../components/CatalogueModal';

export const CollectionsPage = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCatalogueCol, setSelectedCatalogueCol] = useState(null);

  const filters = [
    { id: 'all', label: 'All Furniture' },
    { id: 'sofas', label: 'Sofas & Recliners' },
    { id: 'dining', label: 'Dining & Chairs' },
    { id: 'tables', label: 'Coffee & Consoles' },
    { id: 'bedroom', label: 'Bedroom Suites' },
    { id: 'storage', label: 'Kinetic Storage' },
    { id: 'accent', label: 'Accent Chairs & Benches' }
  ];

  const filteredCollections = COLLECTIONS.filter((col) => {
    if (activeFilter === 'all') return true;
    return col.id === activeFilter;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0E8DD 0%, #F7F3EC 40%, #E9DEC9 100%)', color: '#0A0A0A', paddingTop: '6.5rem', paddingBottom: '6rem' }}>
      <div className="kdh-container">
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 500, color: 'var(--ekkayi-forest)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-block', paddingBottom: '0.75rem', borderBottom: '2px solid var(--terracotta)' }}>
            Furniture Collections
          </h1>
          <p style={{ color: '#4A504C', fontSize: '1rem', marginTop: '1rem', letterSpacing: '0.02em', maxWidth: '680px', marginInline: 'auto', lineHeight: 1.7 }}>
            Explore artisanal furniture, sculptural living room sofas, monolithic dining tables, and bespoke bedroom sanctuaries created by EKKAYI.
          </p>
        </div>

        {/* Filter Pills */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '4rem'
          }}
        >
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  padding: '0.65rem 1.45rem',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: '30px',
                  border: isActive ? '1px solid var(--ekkayi-forest)' : '1px solid rgba(45, 76, 58, 0.2)',
                  background: isActive ? 'var(--ekkayi-forest)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--ekkayi-forest)',
                  boxShadow: isActive ? '0 6px 20px rgba(45, 76, 58, 0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer'
                }}
                className="hover:scale-105"
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Collections 4-Column Responsive Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2.5rem 2rem'
          }}
        >
          {filteredCollections.map((col) => (
            <div
              key={col.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
              className="group cursor-pointer"
            >
              {/* Product Visual Container with Interactive Hover Scale */}
              <div
                onClick={() => onNavigate(`/collections/${col.id}`)}
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  position: 'relative',
                  borderRadius: '16px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(45, 76, 58, 0.15)',
                  boxShadow: '0 12px 35px rgba(45, 76, 58, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.25rem',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease'
                }}
                className="group-hover:border-[#2D4C3A] group-hover:shadow-2xl"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="group-hover:scale-105"
                />

                <span
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '14px',
                    fontSize: '0.68rem',
                    color: '#FFFFFF',
                    background: 'rgba(45, 76, 58, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    letterSpacing: '0.12em',
                    fontWeight: '600'
                  }}
                >
                  {col.year}
                </span>
              </div>

              {/* Title & Quick Actions */}
              <div style={{ marginTop: '1.2rem', width: '100%' }}>
                <h3
                  onClick={() => onNavigate(`/collections/${col.id}`)}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: 'var(--ekkayi-forest)',
                    letterSpacing: '0.04em',
                    transition: 'color 0.2s ease'
                  }}
                  className="hover:text-[#AC6644]"
                >
                  {col.title}
                </h3>
                
                <p style={{ fontSize: '0.8rem', color: '#6A706C', marginTop: '0.25rem' }}>
                  {col.subtitle || col.collaborator}
                </p>

                <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                  <button
                    onClick={() => onNavigate(`/collections/${col.id}`)}
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                      background: 'var(--ekkayi-forest)',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    className="hover:opacity-90 transition-opacity"
                  >
                    View Pieces
                  </button>

                  {col.pdf && col.pdf.startsWith('http') && (
                    <button
                      onClick={() => setSelectedCatalogueCol(col)}
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--ekkayi-forest)',
                        padding: '6px 14px',
                        border: '1px solid rgba(45, 76, 58, 0.3)',
                        borderRadius: '4px',
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                      className="hover:bg-[#2D4C3A] hover:text-white transition-colors"
                      title="Download Spec Catalogue"
                    >
                      <Download size={12} />
                      Catalogue
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Capture Catalogue Modal */}
      {selectedCatalogueCol && (
        <CatalogueModal
          isOpen={!!selectedCatalogueCol}
          onClose={() => setSelectedCatalogueCol(null)}
          collectionTitle={selectedCatalogueCol.title}
          pdfUrl={selectedCatalogueCol.pdf}
        />
      )}
    </div>
  );
};
