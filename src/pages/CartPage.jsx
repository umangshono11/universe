import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, MessageCircle, Send, ArrowRight, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartPage = ({ onNavigate }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();

  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWhatsAppCheckout = () => {
    let itemsText = cartItems.map((item, i) => 
      `${i + 1}. *${item.title}* (Qty: ${item.quantity})${item.variant ? ` - Variant: ${item.variant}` : ''}`
    ).join('%0A');

    const text = `Hello Karan Desai Home,%0A%0AI would like to request a bespoke price & lead time quotation for the following curated pieces:%0A%0A${itemsText}%0A%0A*Client Details:*%0AName: ${encodeURIComponent(clientInfo.name || 'Client')}%0APhone: ${encodeURIComponent(clientInfo.phone || '')}%0ACity: ${encodeURIComponent(clientInfo.city || '')}%0ANotes: ${encodeURIComponent(clientInfo.notes || 'None')}`;

    window.open(`https://wa.me/+917977112242?text=${text}`, '_blank');
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c5a75c', '#ffffff', '#e0c57d']
      });
    }, 700);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000000', paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="kdh-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="section-title">
            Curated Selection
          </h1>
          <p className="section-subtitle">
            Review your shortlisted architectural pieces and request custom finish options, bespoke sizing, and delivery timelines.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div 
            style={{
              maxWidth: '540px',
              margin: '0 auto',
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(18, 18, 20, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px'
            }}
          >
            <ShoppingBag size={48} style={{ color: 'var(--gold)', margin: '0 auto 1.5rem', opacity: 0.8 }} />
            <h2 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.5rem' }}>
              Your Curation is Empty
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Explore the Monster, Matilda, or Jina Shilp collections to add collectible furniture, vanities, or luminaires to your selection.
            </p>
            <button
              onClick={() => onNavigate('/collections')}
              className="btn-gold"
            >
              Explore Collections
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          /* Active Cart Grid */
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2.5rem',
              alignItems: 'start'
            }}
            className="lg:grid-cols-3"
          >
            {/* Left 2 Cols: Cart Items List */}
            <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {cartCount} {cartCount === 1 ? 'Piece Selected' : 'Pieces Selected'}
                </span>
                <button
                  onClick={clearCart}
                  style={{ fontSize: '0.72rem', color: 'rgba(239,68,68,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  className="hover:text-red-400"
                >
                  Clear Selection
                </button>
              </div>

              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.variant}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1.25rem',
                    background: 'rgba(18, 18, 20, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '72px',
                      height: '72px',
                      objectFit: 'contain',
                      background: '#000000',
                      borderRadius: '6px',
                      padding: '4px'
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', letterSpacing: '0.04em' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--gold)', marginTop: '2px' }}>
                      Variant: {item.variant}
                    </p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Lead time: {item.leadTime}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                      style={{ color: '#ffffff', padding: '2px' }}
                      title="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', minWidth: '18px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                      style={{ color: '#ffffff', padding: '2px' }}
                      title="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.variant)}
                    style={{ color: 'rgba(255,255,255,0.4)', padding: '0.5rem', borderRadius: '50%' }}
                    className="hover:text-red-400 hover:bg-white/5"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Right Col: Quote Request Form */}
            <div 
              style={{
                background: 'rgba(18, 18, 20, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '2rem'
              }}
            >
              {!isSubmitted ? (
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#ffffff', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                    Request Studio Quotation
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                    Submit your details for official pricing, material customization options, and global freight estimation.
                  </p>

                  <form onSubmit={handleQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Karan Shah"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '4px',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '4px',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={clientInfo.phone}
                        onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '4px',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        Destination City / Project Site
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai, New York, London"
                        value={clientInfo.city}
                        onChange={(e) => setClientInfo({ ...clientInfo, city: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '4px',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{ width: '100%', marginTop: '0.5rem' }}
                    >
                      <Send size={15} />
                      {isSubmitting ? 'Sending Request...' : 'Submit Quotation Request'}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppCheckout}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        background: '#25D366',
                        color: '#000000',
                        fontWeight: '600',
                        fontSize: '0.8rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '0.75rem',
                        borderRadius: '0'
                      }}
                      className="hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle size={18} />
                      Send Cart via WhatsApp
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <CheckCircle size={44} style={{ color: 'var(--gold)', margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.5rem' }}>
                    Quotation Request Sent
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    Thank you, {clientInfo.name}. Our architectural studio concierge has received your shortlisted {cartCount} pieces and will provide itemized pricing and production scheduling.
                  </p>
                  <button
                    onClick={() => {
                      clearCart();
                      onNavigate('/collections');
                    }}
                    className="btn-outline"
                    style={{ width: '100%' }}
                  >
                    Continue Browsing
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
