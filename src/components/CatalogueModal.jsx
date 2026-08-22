import React, { useState } from 'react';
import { X, Download, CheckCircle, FileText } from 'lucide-react';

export const CatalogueModal = ({ isOpen, onClose, collectionTitle = '', pdfUrl = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsReady(true);
      if (pdfUrl && pdfUrl.startsWith('http')) {
        window.open(pdfUrl, '_blank');
      }
    }, 600);
  };

  return (
    <div className="kdh-modal-backdrop" onClick={onClose}>
      <div 
        className="kdh-modal-card" 
        style={{ maxWidth: '460px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: 'rgba(255, 255, 255, 0.6)',
            padding: '0.4rem',
            borderRadius: '50%'
          }}
          className="hover:text-white hover:bg-white/10"
        >
          <X size={20} />
        </button>

        {!isReady ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <FileText size={36} style={{ color: 'var(--gold)', margin: '0 auto 0.75rem' }} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#ffffff' }}>
                Download Catalogue
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {collectionTitle ? `Official ${collectionTitle} Spec & Lookbook` : 'Karan Desai Home Luxury Lookbook'}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  className="focus:border-gold"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@architecture.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  className="focus:border-gold"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Mobile / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  className="focus:border-gold"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                <Download size={16} />
                {isSubmitting ? 'Accessing File...' : 'View / Download PDF'}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
            <CheckCircle size={44} style={{ color: 'var(--gold)', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.5rem' }}>
              Catalogue Unlocked
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Your catalogue for <strong>{collectionTitle}</strong> is ready.
            </p>
            {pdfUrl && pdfUrl.startsWith('http') && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ display: 'inline-flex', marginBottom: '1rem', width: '100%' }}
              >
                <Download size={16} />
                Open PDF Document
              </a>
            )}
            <button
              onClick={onClose}
              className="btn-outline"
              style={{ width: '100%' }}
            >
              Back to Collections
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
