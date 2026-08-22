import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Furniture & Collectibles',
    projectScope: 'Residential',
    city: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0E8DD 0%, #F7F3EC 40%, #E9DEC9 100%)', color: '#0A0A0A', paddingTop: '6.5rem', paddingBottom: '6rem' }}>
      <div className="kdh-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 500, color: 'var(--ekkayi-forest)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-block', paddingBottom: '0.75rem', borderBottom: '2px solid var(--terracotta)' }}>
            Contact the Atelier
          </h1>
          <p style={{ color: '#4A504C', fontSize: '1rem', marginTop: '1rem', letterSpacing: '0.02em', maxWidth: '680px', marginInline: 'auto', lineHeight: 1.7 }}>
            Initiate conversations for bespoke furniture commissions, high-end residential architecture, or trade partnerships.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            maxWidth: '1080px',
            margin: '0 auto',
            alignItems: 'start'
          }}
          className="lg:grid-cols-2"
        >
          {/* Left Column: Studio Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div 
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(45, 76, 58, 0.15)',
                boxShadow: '0 12px 35px rgba(45, 76, 58, 0.08)',
                borderRadius: '16px',
                padding: '2.5rem'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '600', color: 'var(--ekkayi-forest)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>
                EKKAYI Atelier &amp; Studio
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <MapPin size={22} style={{ color: 'var(--terracotta)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--ekkayi-forest)', fontSize: '0.95rem' }}>EKKAYI Furniture Atelier</strong>
                    <p style={{ color: '#4A504C', fontSize: '0.85rem', marginTop: '3px', lineHeight: '1.5' }}>
                      Flagship Studio &amp; Experience Gallery, Mumbai, India
                    </p>
                    <p style={{ color: '#7A807C', fontSize: '0.78rem', marginTop: '2px', fontWeight: 600 }}>
                      Pan-India Delivery • Bespoke Architectural Projects
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Phone size={22} style={{ color: 'var(--terracotta)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--ekkayi-forest)', fontSize: '0.95rem' }}>Direct Line</strong>
                    <p style={{ color: '#4A504C', fontSize: '0.85rem' }}>
                      +91 98201 23456 / +91 79771 12242
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Mail size={22} style={{ color: 'var(--terracotta)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>Studio Email</strong>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      studio@ekkayi.com / concierge@ekkayi.com
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Clock size={20} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#ffffff', fontSize: '0.85rem' }}>Studio Consultations</strong>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      Monday – Saturday, 10:00 AM – 7:30 PM IST (By Appointment)
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Button */}
              <div style={{ marginTop: '2rem' }}>
                <a
                  href="https://wa.me/+917977112242"
                  target="_blank"
                  rel="noopener noreferrer"
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
                    padding: '0.85rem',
                    borderRadius: '0'
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  <MessageCircle size={18} />
                  Connect Instantly on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div 
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(45, 76, 58, 0.15)',
              boxShadow: '0 12px 35px rgba(45, 76, 58, 0.08)',
              borderRadius: '16px',
              padding: '2.5rem'
            }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '600', color: 'var(--ekkayi-forest)', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
                  Studio Consultation Form
                </h3>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#6A706C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ar. Sameer Mehta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      background: '#F9F6F0',
                      border: '1px solid rgba(45, 76, 58, 0.2)',
                      borderRadius: '6px',
                      color: '#0A0A0A',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#6A706C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        background: '#F9F6F0',
                        border: '1px solid rgba(45, 76, 58, 0.2)',
                        borderRadius: '6px',
                        color: '#0A0A0A',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#6A706C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
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
                        padding: '0.85rem',
                        background: '#F9F6F0',
                        border: '1px solid rgba(45, 76, 58, 0.2)',
                        borderRadius: '6px',
                        color: '#0A0A0A',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#6A706C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Type of Inquiry
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      background: '#F9F6F0',
                      border: '1px solid rgba(45, 76, 58, 0.2)',
                      borderRadius: '6px',
                      color: '#0A0A0A',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Furniture &amp; Living Room">Furniture &amp; Living Room Pieces</option>
                    <option value="Dining &amp; Bedroom Suites">Dining &amp; Bedroom Suites</option>
                    <option value="Bespoke Residential Commission">Bespoke Residential Commission</option>
                    <option value="Architectural Trade Partnership">Architectural Trade Partnership</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#6A706C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Project Location &amp; Scope
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your room dimensions, floor plan requirements, or preferred delivery timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      background: '#F9F6F0',
                      border: '1px solid rgba(45, 76, 58, 0.2)',
                      borderRadius: '6px',
                      color: '#0A0A0A',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    marginTop: '0.5rem',
                    background: 'var(--ekkayi-forest)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '1rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 6px 20px rgba(45, 76, 58, 0.25)'
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  <Send size={15} />
                  {isSubmitting ? 'Submitting...' : 'Send Message to Studio'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle size={48} style={{ color: 'var(--ekkayi-forest)', margin: '0 auto 1.25rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: '600', color: 'var(--ekkayi-forest)', marginBottom: '0.5rem' }}>
                  Thank You, {formData.name}
                </h3>
                <p style={{ color: '#4A504C', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                  Your consultation request for <strong>{formData.inquiryType}</strong> has been received. Our atelier team will connect with you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    background: '#FFFFFF',
                    color: 'var(--ekkayi-forest)',
                    border: '1.5px solid var(--ekkayi-forest)',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
