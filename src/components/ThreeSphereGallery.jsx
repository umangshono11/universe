import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PRODUCTS } from '../data/products';
import { Plus, Minus, RotateCcw, Play, Pause, Sparkles } from 'lucide-react';

// --- High-Performance Material & Framed Texture Cache ---
const textureLoader = new THREE.TextureLoader();
const materialsCache = new Map();

// Helper to create a premium framed furniture card canvas texture
function createFramedFurnitureTexture(imgUrl, callback) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // 1. Base card container with rounded corners
    const r = 24;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(512 - r, 0);
    ctx.quadraticCurveTo(512, 0, 512, r);
    ctx.lineTo(512, 512 - r);
    ctx.quadraticCurveTo(512, 512, 512 - r, 512);
    ctx.lineTo(r, 512);
    ctx.quadraticCurveTo(0, 512, 0, 512 - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.clip();

    // 2. Background off-white / parchment backdrop
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 512);

    // 3. Draw image centered
    const aspect = img.width / img.height;
    let dw, dh, dx, dy;
    if (aspect >= 1) {
      dw = 512;
      dh = 512 / aspect;
      dx = 0;
      dy = (512 - dh) / 2;
    } else {
      dh = 512;
      dw = 512 * aspect;
      dx = (512 - dw) / 2;
      dy = 0;
    }
    ctx.drawImage(img, dx, dy, dw, dh);

    // 4. Subtle gold / forest border
    ctx.strokeStyle = 'rgba(45, 76, 58, 0.4)';
    ctx.lineWidth = 8;
    ctx.stroke();

    const canvasTexture = new THREE.CanvasTexture(canvas);
    if (THREE.SRGBColorSpace) canvasTexture.colorSpace = THREE.SRGBColorSpace;
    canvasTexture.minFilter = THREE.LinearFilter;

    const mat = new THREE.MeshBasicMaterial({
      map: canvasTexture,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    materialsCache.set(imgUrl, mat);
    if (callback) callback(mat);
  };

  img.onerror = () => {
    const tex = textureLoader.load(imgUrl);
    if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    materialsCache.set(imgUrl, mat);
    if (callback) callback(mat);
  };

  img.src = imgUrl;
}

// Pre-create shared materials for all products
PRODUCTS.forEach((prod) => {
  const url = prod.images?.[0]?.filePath;
  if (url && !materialsCache.has(url)) {
    createFramedFurnitureTexture(url);
  }
});

// Shared Gold Stardust particle canvas
const stardustCanvas = document.createElement('canvas');
stardustCanvas.width = 64;
stardustCanvas.height = 64;
const sCtx = stardustCanvas.getContext('2d');
const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
sGrad.addColorStop(0, 'rgba(255, 235, 175, 1)');
sGrad.addColorStop(0.25, 'rgba(197, 167, 92, 0.85)');
sGrad.addColorStop(0.6, 'rgba(45, 76, 58, 0.3)');
sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
sCtx.fillStyle = sGrad;
sCtx.fillRect(0, 0, 64, 64);
const stardustTexture = new THREE.CanvasTexture(stardustCanvas);

const cardGeometry = new THREE.PlaneGeometry(3.6, 3.6);

export const ThreeSphereGallery = ({ onNavigate }) => {
  const mountRef = useRef(null);
  const tooltipRef = useRef(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const controlsRef = useRef({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    container.innerHTML = '';

    const W = window.innerWidth;
    const H = window.innerHeight;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070908, 0.010);

    const camera = new THREE.PerspectiveCamera(56, W / H, 0.1, 1000);
    camera.position.set(0, 0, 46);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xc5a75c, 3.0, 140);
    goldPointLight.position.set(0, 5, 32);
    scene.add(goldPointLight);

    const emeraldPointLight = new THREE.PointLight(0x2d4c3a, 2.5, 120);
    emeraldPointLight.position.set(-20, -15, 25);
    scene.add(emeraldPointLight);

    // --- Golden Stardust Atmosphere ---
    const particleCount = 450;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      const pRadius = 25 + Math.random() * 65;
      const pTheta = Math.random() * Math.PI * 2;
      const pPhi = Math.acos(2 * Math.random() - 1);
      particlePositions[p * 3] = pRadius * Math.sin(pPhi) * Math.cos(pTheta);
      particlePositions[p * 3 + 1] = pRadius * Math.sin(pPhi) * Math.sin(pTheta);
      particlePositions[p * 3 + 2] = pRadius * Math.cos(pPhi);
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 3.5,
      map: stardustTexture,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const stardustField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(stardustField);

    // --- Dense 110-Item Spherical Galaxy ---
    const totalItems = 110;
    const sphereRadius = 20.5;
    const galleryGroup = new THREE.Group();
    scene.add(galleryGroup);

    const productMeshes = [];

    for (let index = 0; index < totalItems; index++) {
      const prod = PRODUCTS[index % PRODUCTS.length];
      const phi = Math.acos(-1 + (2 * index) / totalItems);
      const theta = Math.sqrt(totalItems * Math.PI) * phi;

      const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(phi);

      const imgUrl = prod.images?.[0]?.filePath || '';
      let mat = materialsCache.get(imgUrl);

      if (!mat) {
        // Temporary placeholder until framed canvas loads
        const tex = textureLoader.load(imgUrl);
        if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
        mat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.95,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        createFramedFurnitureTexture(imgUrl, (newMat) => {
          mesh.material = newMat;
        });
      }

      const mesh = new THREE.Mesh(cardGeometry, mat);
      mesh.position.set(x, y, z);
      mesh.lookAt(0, 0, 0);
      mesh.rotation.y += Math.PI;

      mesh.userData = {
        product: prod,
        id: prod._id?.$oid || prod.id,
        title: prod.title,
        group: prod.groupName || prod.group,
        priceFormatted: prod.priceFormatted || '₹' + prod.price?.toLocaleString(),
        material: prod.material?.split('&')[0] || 'Solid Wood'
      };

      galleryGroup.add(mesh);
      productMeshes.push(mesh);
    }

    // --- Drag, Touch & Interactive States ---
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let targetRot = { x: 0.15, y: 0 };
    let currentRot = { x: 0.15, y: 0 };
    let hoveredMesh = null;
    let cameraTargetZ = 46;
    let isFlying = false;
    let autoRotate = true;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    controlsRef.current = {
      zoomIn: () => {
        cameraTargetZ = Math.max(22, cameraTargetZ - 8);
      },
      zoomOut: () => {
        cameraTargetZ = Math.min(62, cameraTargetZ + 8);
      },
      resetOrbit: () => {
        targetRot = { x: 0.15, y: 0 };
        cameraTargetZ = 46;
      },
      toggleAutoRotate: () => {
        autoRotate = !autoRotate;
        setIsAutoRotating(autoRotate);
      }
    };

    const onMouseDown = (e) => {
      if (e.target !== renderer.domElement) return;
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${e.clientX + 18}px`;
        tooltipRef.current.style.top = `${e.clientY + 18}px`;
      }

      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        targetRot.y += dx * 0.0055;
        targetRot.x += dy * 0.0055;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => { isDragging = false; };

    // Touch handlers
    let touchStart = { x: 0, y: 0 };
    let touchDistStart = 0;

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchDistStart = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const onTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStart.x;
        const dy = e.touches[0].clientY - touchStart.y;
        targetRot.y += dx * 0.0075;
        targetRot.x += dy * 0.0075;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dx2 = e.touches[0].clientX - e.touches[1].clientX;
        const dy2 = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const delta = touchDistStart - dist;
        cameraTargetZ = Math.max(22, Math.min(65, cameraTargetZ + delta * 0.1));
        touchDistStart = dist;
      }
    };

    const onTouchEnd = () => { isDragging = false; };

    // Mouse Wheel Zoom
    const onWheel = (e) => {
      e.preventDefault();
      cameraTargetZ = Math.max(22, Math.min(62, cameraTargetZ + e.deltaY * 0.035));
    };

    // Click to Fly into Product & Navigate to PDP
    const onClick = () => {
      if (isFlying) return;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(productMeshes);

      if (hits.length > 0) {
        const hit = hits[0].object;
        const prod = hit.userData.product;

        if (prod) {
          isFlying = true;
          setIsZooming(true);
          setHoveredProduct(null);

          const worldPos = new THREE.Vector3();
          hit.getWorldPosition(worldPos);

          const startPos = camera.position.clone();
          const targetPos = worldPos.clone().normalize().multiplyScalar(sphereRadius - 3.5);
          const startTime = Date.now();
          const duration = 700;

          const animateFlight = () => {
            const now = Date.now();
            const p = Math.min(1, (now - startTime) / duration);
            const ease = 0.5 - Math.cos(p * Math.PI) / 2;

            camera.position.lerpVectors(startPos, targetPos, ease);
            camera.lookAt(worldPos);

            if (p < 1) {
              requestAnimationFrame(animateFlight);
            } else {
              onNavigate(`/productdetails/${prod._id?.$oid || prod.id}`);
            }
          };

          animateFlight();
        }
      }
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('wheel', onWheel, { passive: false });
    renderer.domElement.addEventListener('click', onClick);

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // --- Main Animation Loop ---
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!isDragging && !isFlying && autoRotate) {
        targetRot.y += 0.0012;
      }

      currentRot.x += (targetRot.x - currentRot.x) * 0.08;
      currentRot.y += (targetRot.y - currentRot.y) * 0.08;

      galleryGroup.rotation.x = currentRot.x;
      galleryGroup.rotation.y = currentRot.y;

      stardustField.rotation.y += 0.0004;
      stardustField.rotation.x += 0.0002;

      if (!isFlying) {
        camera.position.z += (cameraTargetZ - camera.position.z) * 0.06;
      }

      // Smooth Raycast Hover Focus
      if (!isFlying) {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(productMeshes);

        if (hits.length > 0) {
          const h = hits[0].object;
          if (hoveredMesh !== h) {
            if (hoveredMesh) hoveredMesh.scale.set(1, 1, 1);
            hoveredMesh = h;
            hoveredMesh.scale.set(1.55, 1.55, 1.55);
            setHoveredProduct(h.userData);
            document.body.style.cursor = 'pointer';
          }
        } else {
          if (hoveredMesh) {
            hoveredMesh.scale.set(1, 1, 1);
            hoveredMesh = null;
            setHoveredProduct(null);
            document.body.style.cursor = 'auto';
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('click', onClick);

      document.body.style.cursor = 'auto';
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onNavigate]);

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        width: '100vw', 
        height: '100vh', 
        background: 'radial-gradient(circle at 50% 50%, rgba(45, 76, 58, 0.45) 0%, rgba(20, 36, 28, 0.65) 45%, #070908 85%)', 
        overflow: 'hidden' 
      }}
    >
      <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Cinematic Flash Transition Overlay */}
      <div className={`zoom-cinematic-overlay ${isZooming ? 'active' : ''}`} />

      {/* Rich Interactive Tooltip */}
      <div 
        ref={tooltipRef}
        className={`sphere-tooltip ${hoveredProduct ? 'visible' : ''}`}
        style={{
          position: 'fixed',
          display: hoveredProduct ? 'block' : 'none',
          pointerEvents: 'none',
          zIndex: 100,
          background: 'rgba(18, 24, 21, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(197, 167, 92, 0.4)',
          borderRadius: '10px',
          padding: '12px 18px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.85), 0 0 20px rgba(45, 76, 58, 0.4)'
        }}
      >
        {hoveredProduct && (
          <>
            <div style={{ fontSize: '0.68rem', color: 'var(--terracotta)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {hoveredProduct.group}
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: '600', color: '#FFFFFF', margin: '3px 0' }}>
              {hoveredProduct.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '4px' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--soft-parchment)' }}>
                {hoveredProduct.priceFormatted}
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(197,167,92,0.15)', padding: '2px 8px', borderRadius: '10px' }}>
                Inspect Piece →
              </span>
            </div>
          </>
        )}
      </div>

      {/* Interactive Orbit Controls (Bottom Right) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        <button
          onClick={() => controlsRef.current.zoomIn?.()}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(18, 24, 21, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}
          className="hover:border-gold hover:text-gold transition-all"
          title="Zoom In"
        >
          <Plus size={16} />
        </button>

        <button
          onClick={() => controlsRef.current.zoomOut?.()}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(18, 24, 21, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}
          className="hover:border-gold hover:text-gold transition-all"
          title="Zoom Out"
        >
          <Minus size={16} />
        </button>

        <button
          onClick={() => controlsRef.current.toggleAutoRotate?.()}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(18, 24, 21, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: isAutoRotating ? 'var(--gold)' : '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}
          className="hover:border-gold transition-all"
          title={isAutoRotating ? "Pause Orbit" : "Auto-Rotate Orbit"}
        >
          {isAutoRotating ? <Pause size={15} /> : <Play size={15} />}
        </button>

        <button
          onClick={() => controlsRef.current.resetOrbit?.()}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(18, 24, 21, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}
          className="hover:border-gold hover:text-gold transition-all"
          title="Reset Orbit View"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Luxury Pill Instruction Badge (Bottom Center) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          pointerEvents: 'none'
        }}
      >
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '8px 20px',
            borderRadius: '30px',
            background: 'rgba(18, 24, 21, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(197, 167, 92, 0.35)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C5A75C', display: 'inline-block', boxShadow: '0 0 8px #C5A75C' }} />
          <span style={{
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            fontWeight: '600',
            color: 'var(--soft-parchment)',
            textTransform: 'uppercase'
          }}>
            Drag to Rotate • Click Any Piece to Inspect
          </span>
        </div>
      </div>
    </div>
  );
};
