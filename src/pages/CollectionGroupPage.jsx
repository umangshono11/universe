import React, { useState } from 'react';
import { getCollectionById, COLLECTIONS } from '../data/collections';
import { getProductsByGroup, PRODUCTS } from '../data/products';
import { ArrowLeft, Download } from 'lucide-react';
import { CatalogueModal } from '../components/CatalogueModal';

export const CollectionGroupPage = ({ group = 'sofas', onNavigate }) => {
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const collection = getCollectionById(group) || COLLECTIONS[0];
  let groupProducts = getProductsByGroup(group);

  if (groupProducts.length === 0) {
    groupProducts = PRODUCTS.slice(0, 4);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0E8DD 0%, #F7F3EC 40%, #E9DEC9 100%)', color: '#0A0A0A', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="kdh-container">
        {/* Back Button */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => onNavigate('/collections')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--ekkayi-forest)',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: '#FFFFFF',
              border: '1px solid rgba(45, 76, 58, 0.2)',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
            className="hover:bg-[#2D4C3A] hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Collections
          </button>
        </div>

        {/* Dual Co-Branding Header */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            borderBottom: '2px solid rgba(45, 76, 58, 0.15)',
            paddingBottom: '2.5rem',
            marginBottom: '3.5rem'
          }}
        >
          <img 
            src="/ekkayi-logo-green.svg" 
            alt="EKKAYI" 
            style={{ width: '85px', height: 'auto', marginBottom: '1.25rem', objectFit: 'contain' }}
          />

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', fontWeight: 500, color: 'var(--ekkayi-forest)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {collection.title}
          </h1>

          <p style={{ color: 'var(--terracotta)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '0.4rem' }}>
            {collection.subtitle || collection.collaborator} • {collection.year}
          </p>

          <p style={{ maxWidth: '680px', color: '#4A504C', fontSize: '0.95rem', lineHeight: '1.7', marginTop: '1rem' }}>
            {collection.description}
          </p>

          {/* Download Catalogue Lead Button */}
          {collection.pdf && collection.pdf.startsWith('http') && (
            <div style={{ marginTop: '1.5rem' }}>
              <button
                onClick={() => setIsCatalogueOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--ekkayi-forest)',
                  background: '#FFFFFF',
                  border: '1.5px solid var(--ekkayi-forest)',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                className="hover:bg-[#2D4C3A] hover:text-white transition-colors"
              >
                <Download size={15} />
                Download Spec Catalogue
              </button>
            </div>
          )}
        </div>

        {/* Product Grid in this Collection */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '3rem 2rem'
          }}
        >
          {groupProducts.map((prod) => (
            <div
              key={prod._id?.$oid || prod.id}
              onClick={() => onNavigate(`/productdetails/${prod._id?.$oid || prod.id}`)}
              onMouseEnter={() => setHoveredProduct(prod._id?.$oid || prod.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer'
              }}
              className="group"
            >
              <div 
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  borderRadius: '14px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(45, 76, 58, 0.15)',
                  boxShadow: '0 10px 30px rgba(45, 76, 58, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease'
                }}
                className="group-hover:border-[#2D4C3A] group-hover:shadow-2xl"
              >
                <img
                  src={prod.images?.[0]?.filePath}
                  alt={prod.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="group-hover:scale-105"
                />
              </div>

              <div style={{ marginTop: '1.25rem', width: '100%' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--terracotta)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {prod.groupName}
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--ekkayi-forest)', margin: '0.35rem 0' }} className="group-hover:text-[#AC6644] transition-colors">
                  {prod.title}
                </h3>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0A0A0A' }}>
                  {prod.priceFormatted || '₹' + prod.price?.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalogue Download Modal */}
      <CatalogueModal
        isOpen={isCatalogueOpen}
        onClose={() => setIsCatalogueOpen(false)}
        collectionTitle={collection.title}
        pdfUrl={collection.pdf}
      />
    </div>
  );
};
