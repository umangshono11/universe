import React from 'react';
import { ThreeSphereGallery } from '../components/ThreeSphereGallery';

export const HomePage = ({ onNavigate }) => {
  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', background: '#000000', overflow: 'hidden' }}>
      <ThreeSphereGallery onNavigate={onNavigate} />
    </div>
  );
};
