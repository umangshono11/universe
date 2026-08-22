import React, { useState } from 'react';
import { X, CheckCircle, Send, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EnquireModal = ({ isOpen, onClose, productTitle = '', variant = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c5a75c', '#ffffff', '#e0c57d']
      });
    }, 700);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Karan Desai Home,%0A%0AI am interested in enquiring about:*${encodeURIComponent(productTitle)}*${variant ? ` (Variant: ${encodeURIComponent(variant)})` : ''}.%0A%0AName: ${encodeURIComponent(formData.name || 'Client')}%0APhone: ${encodeURIComponent(formData.phone || '')}%0ACity: ${encodeURIComponent(formData.city || '')}`;
    window.open(`https://wa.me/+917977112242?text=${text}`, '_blank');
  };

  return (
    <div className="kdh-modal-backdrop" onClick={onClose}>
      <div 
        className="kdh-modal-card" 
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

        {!isSubmitted ? (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                Bespoke Studio Enquiry
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#ffffff', marginTop: '0.25rem' }}>
                {productTitle || 'Product Enquiry'}
              </h2>
              {variant && (
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Variant: <span style={{ color: '#ffffff' }}>{variant}</span>
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karan Shah"
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
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
                    Phone / WhatsApp *
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
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai / Delhi / Chicago / London"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
                  Custom Specifications or Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Dimensions, finishes, residential or commercial project scope..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                  className="focus:border-gold"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  <Send size={16} />
                  {isSubmitting ? 'Sending Request...' : 'Submit Studio Enquiry'}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: '#25D366',
                    color: '#000000',
                    fontWeight: '600',
                    fontSize: '0.825rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.75rem',
                    borderRadius: '0'
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  <MessageCircle size={18} />
                  Enquire Directly via WhatsApp
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle size={48} style={{ color: 'var(--gold)', margin: '0 auto 1.25rem' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.5rem' }}>
              Enquiry Received
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              Thank you, <strong style={{ color: '#ffffff' }}>{formData.name}</strong>. The Karan Desai Home architectural concierge team has received your enquiry for <em>{productTitle}</em> and will be in touch within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="btn-outline"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
