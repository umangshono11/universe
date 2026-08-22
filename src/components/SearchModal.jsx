import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Layers, Box } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { COLLECTIONS } from '../data/collections';

export const SearchModal = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingProducts = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmed) ||
          p.material.toLowerCase().includes(trimmed) ||
          p.group.toLowerCase().includes(trimmed) ||
          (p.collabtext && p.collabtext.toLowerCase().includes(trimmed))
      )
    : [];

  const matchingCollections = trimmed
    ? COLLECTIONS.filter(
        (c) =>
          c.title.toLowerCase().includes(trimmed) ||
          c.collaborator.toLowerCase().includes(trimmed) ||
          c.description.toLowerCase().includes(trimmed)
      )
    : [];

  const handleProductSelect = (id) => {
    onClose();
    onNavigate(`/productdetails/${id}`);
  };

  const handleCollectionSelect = (id) => {
    onClose();
    onNavigate(`/collections/${id}`);
  };

  return (
    <div className="kdh-modal-backdrop" onClick={onClose}>
      <div 
        className="kdh-modal-card" 
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Search Box */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Search size={22} style={{ color: 'var(--gold)' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, materials, collections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '1.1rem',
              letterSpacing: '0.06em',
              fontFamily: 'inherit'
            }}
          />
          <button 
            onClick={onClose}
            style={{ color: 'rgba(255,255,255,0.5)', padding: '0.25rem' }}
            className="hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Container */}
        <div style={{ marginTop: '1.5rem', maxHeight: '60vh', overflowY: 'auto' }}>
          {!trimmed ? (
            <div>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Featured Collections
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
                {COLLECTIONS.slice(0, 6).map((col) => (
                  <button
                    key={col.id}
                    onClick={() => handleCollectionSelect(col.id)}
                    style={{
                      textAlign: 'left',
                      padding: '0.75rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease'
                    }}
                    className="hover:bg-white/10 hover:border-gold"
                  >
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#ffffff' }}>{col.shortTitle}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--gold)', marginTop: '2px' }}>{col.year}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Product Results */}
              {matchingProducts.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Box size={14} style={{ color: 'var(--gold)' }} />
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Products ({matchingProducts.length})
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {matchingProducts.map((prod) => (
                      <div
                        key={prod._id.$oid}
                        onClick={() => handleProductSelect(prod._id.$oid)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '0.6rem 0.75rem',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        className="hover:bg-white/10 hover:border-white/20"
                      >
                        <img 
                          src={prod.images?.[0]?.filePath} 
                          alt={prod.title} 
                          style={{ width: '44px', height: '44px', objectFit: 'contain', background: '#000', borderRadius: '4px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff' }}>{prod.title}</h4>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{prod.material} • {prod.groupName || prod.group}</p>
                        </div>
                        <ArrowRight size={16} style={{ color: 'var(--gold)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Collection Results */}
              {matchingCollections.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Layers size={14} style={{ color: 'var(--gold)' }} />
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Collections ({matchingCollections.length})
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {matchingCollections.map((col) => (
                      <div
                        key={col.id}
                        onClick={() => handleCollectionSelect(col.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '0.6rem 0.75rem',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        className="hover:bg-white/10 hover:border-white/20"
                      >
                        <img 
                          src={col.image} 
                          alt={col.title} 
                          style={{ width: '44px', height: '44px', objectFit: 'contain', background: '#000', borderRadius: '4px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff' }}>{col.title}</h4>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{col.collaborator} • {col.year}</p>
                        </div>
                        <ArrowRight size={16} style={{ color: 'var(--gold)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingProducts.length === 0 && matchingCollections.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2.5rem 0', color: 'var(--text-muted)' }}>
                  <p style={{ fontSize: '0.9rem' }}>No matching furniture or collections found for "{query}"</p>
                  <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Try searching "Sofa", "Bouclé", "Teak", "Bed", or "Console"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
