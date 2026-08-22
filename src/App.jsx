import React, { useState, useEffect, useRef } from 'react';
import { CartProvider } from './context/CartContext';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { SidebarMenu } from './components/SidebarMenu';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CollectionGroupPage } from './pages/CollectionGroupPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { PressPage } from './pages/PressPage';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Web Audio Context for Luxury Ambient Pad Drone
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  const toggleAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;

        const frequencies = [110, 164.81, 220, 329.63, 440];
        frequencies.forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const lfo = ctx.createOscillator();
          lfo.frequency.value = 0.15 + Math.random() * 0.1;
          const lfoGain = ctx.createGain();
          lfoGain.gain.value = 1.5;
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          osc.connect(gainNode);
          osc.start();
        });

        setIsAudioPlaying(true);
      } else {
        if (isAudioPlaying) {
          audioCtxRef.current.suspend();
          setIsAudioPlaying(false);
        } else {
          audioCtxRef.current.resume();
          setIsAudioPlaying(true);
        }
      }
    } catch (e) {
      console.log('Audio toggle error', e);
    }
  };

  // Browser History & Navigation
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Parse Current Route
  const renderCurrentPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} />;
    }

    if (currentPath === '/collections' || currentPath === '/collections/') {
      return <CollectionsPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/collections/')) {
      const group = currentPath.replace('/collections/', '').replace(/\/$/, '');
      return <CollectionGroupPage group={group} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/productdetails/')) {
      const productId = currentPath.replace('/productdetails/', '').replace(/\/$/, '');
      return <ProductDetailPage productId={productId} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/products/')) {
      const productId = currentPath.replace('/products/', '').replace(/\/$/, '');
      return <ProductDetailPage productId={productId} onNavigate={navigate} />;
    }

    if (currentPath === '/about' || currentPath === '/about/') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (currentPath === '/press' || currentPath === '/press/') {
      return <PressPage onNavigate={navigate} />;
    }

    if (currentPath === '/cart' || currentPath === '/cart/') {
      return <CartPage onNavigate={navigate} />;
    }

    if (currentPath === '/contact' || currentPath === '/contact/') {
      return <ContactPage onNavigate={navigate} />;
    }

    return <HomePage onNavigate={navigate} />;
  };

  const isHome = currentPath === '/' || currentPath === '';
  const isPDP = currentPath.startsWith('/productdetails/') || currentPath.startsWith('/products/');

  return (
    <CartProvider>
      <div className="app-container">
        {/* Luxury Overlay Intro Loader (Fades out smoothly over the preloaded 3D globe) */}
        {showLoadingScreen && (
          <LoadingScreen onComplete={() => setShowLoadingScreen(false)} />
        )}

        {/* Global Navbar (shown on home & collection pages, PDP has its own header) */}
        {!isPDP && (
          <Navbar
            onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
            onSearchOpen={() => setIsSearchOpen(true)}
            onNavigate={navigate}
            currentPath={currentPath}
            isAudioPlaying={isAudioPlaying}
            onAudioToggle={toggleAudio}
          />
        )}

        {/* Slide-out Menu Drawer */}
        <SidebarMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onNavigate={navigate}
          currentPath={currentPath}
        />

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={navigate}
        />

        {/* Main Page Body */}
        <main className="main-content">
          {renderCurrentPage()}
        </main>

        {/* Global Footer (only on subpages, NOT on home or PDP) */}
        {!isHome && !isPDP && <Footer onNavigate={navigate} />}
      </div>
    </CartProvider>
  );
}

export default App;
