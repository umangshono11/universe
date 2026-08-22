import React from 'react';
import { X, Play } from 'lucide-react';

export const MediaGridModal = ({ 
  isOpen, 
  onClose, 
  images = [], 
  video = null, 
  currentIndex = 0, 
  onSelectMedia 
}) => {
  if (!isOpen) return null;

  const totalItems = images.length + (video ? 1 : 0);

  return (
    <div className="kdh-modal-backdrop" onClick={onClose}>
      <div 
        className="kdh-modal-card" 
        style={{ maxWidth: '820px', width: '95%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '500', color: '#ffffff', letterSpacing: '0.1em' }}>
              All Product Media ({totalItems})
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Click any photo or video to inspect high-resolution details
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{ color: 'rgba(255,255,255,0.6)', padding: '0.4rem', borderRadius: '50%' }}
            className="hover:text-white hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Media Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '0.85rem',
            paddingTop: '1.25rem',
            maxHeight: '65vh',
            overflowY: 'auto'
          }}
        >
          {images.map((img, idx) => {
            const isCurrent = currentIndex === idx;
            return (
              <button
                key={img.filePath || idx}
                onClick={() => {
                  onSelectMedia(idx);
                  onClose();
                }}
                style={{
                  position: 'relative',
                  aspectRatio: '1/1',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: '#000000',
                  border: isCurrent ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.15)',
                  boxShadow: isCurrent ? '0 0 15px rgba(197,167,92,0.4)' : 'none',
                  padding: 0
                }}
                className="group hover:border-white transition-all hover:scale-105"
              >
                <img
                  src={img.filePath}
                  alt={img.fileName || `Photo ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    background: 'rgba(0,0,0,0.75)',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  {idx + 1}
                </span>
                {isCurrent && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '4px',
                      background: 'var(--gold)',
                      color: '#000000',
                      fontSize: '0.6rem',
                      fontWeight: '700',
                      padding: '1px 5px',
                      borderRadius: '3px'
                    }}
                  >
                    ACTIVE
                  </span>
                )}
              </button>
            );
          })}

          {/* Video Thumbnail if present */}
          {video && (
            <button
              onClick={() => {
                onSelectMedia(images.length);
                onClose();
              }}
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                borderRadius: '6px',
                overflow: 'hidden',
                background: '#1a1a1c',
                border: currentIndex === images.length ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
              className="group hover:border-white transition-all hover:scale-105"
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000000'
              }}>
                <Play size={18} style={{ marginLeft: '2px' }} />
              </div>
              <span
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.8)',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  letterSpacing: '0.1em'
                }}
              >
                VIDEO
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
