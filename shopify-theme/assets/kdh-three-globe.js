/* =========================================================
   EKKAYI — 3D SPHERICAL FURNITURE GALAXY (Three.js)
   Brand Atmosphere: Deep Forest Ambient Glow & Gold Stardust
   ========================================================= */

(function () {
  'use strict';

  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';
  script.onload = function () { initGlobe(); };
  document.head.appendChild(script);

  function initGlobe() {
    var THREE = window.THREE;
    var products = window.KDH_PRODUCTS || [];
    var baseUrl  = window.KDH_BASE_URL || '/';
    var mount = document.getElementById('three-globe-mount');
    var tooltip = document.getElementById('globe-tooltip');
    var ttName  = document.getElementById('tt-name');
    var ttGroup = document.getElementById('tt-group');
    var ttPrice = document.getElementById('tt-price');
    var zoomOverlay = document.getElementById('zoom-overlay');
    if (!mount || !THREE || products.length === 0) return;

    var W = window.innerWidth, H = window.innerHeight;

    /* ─── SCENE, CAMERA, RENDERER ─── */
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070908, 0.010);

    var camera = new THREE.PerspectiveCamera(56, W / H, 0.1, 1000);
    camera.position.set(0, 0, 46);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    /* ─── LIGHTING ─── */
    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    var pLightGold = new THREE.PointLight(0xc5a75c, 3.0, 140);
    pLightGold.position.set(0, 5, 32);
    scene.add(pLightGold);

    var pLightEmerald = new THREE.PointLight(0x2d4c3a, 2.5, 120);
    pLightEmerald.position.set(-20, -15, 25);
    scene.add(pLightEmerald);

    /* ─── GOLD STARDUST PARTICLES ─── */
    var sCanvas = document.createElement('canvas');
    sCanvas.width = 64; sCanvas.height = 64;
    var sCtx = sCanvas.getContext('2d');
    var sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sGrad.addColorStop(0, 'rgba(255, 235, 175, 1)');
    sGrad.addColorStop(0.25, 'rgba(197, 167, 92, 0.85)');
    sGrad.addColorStop(0.6, 'rgba(45, 76, 58, 0.3)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);
    var stardustTex = new THREE.CanvasTexture(sCanvas);

    var pGeo = new THREE.BufferGeometry();
    var pPos = new Float32Array(450 * 3);
    for (var p = 0; p < 450; p++) {
      var pR = 25 + Math.random() * 65, pT = Math.random() * Math.PI * 2, pP = Math.acos(2 * Math.random() - 1);
      pPos[p*3]   = pR * Math.sin(pP) * Math.cos(pT);
      pPos[p*3+1] = pR * Math.sin(pP) * Math.sin(pT);
      pPos[p*3+2] = pR * Math.cos(pP);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    var stardustField = new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 3.5,
      map: stardustTex,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    scene.add(stardustField);

    /* ─── FRAMED TEXTURE CACHE ─── */
    var materialsCache = {};
    var loader = new THREE.TextureLoader();

    function getFramedMaterial(imgUrl, onReady) {
      if (materialsCache[imgUrl]) return materialsCache[imgUrl];

      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        var c = document.createElement('canvas');
        c.width = 512; c.height = 512;
        var ctx = c.getContext('2d');
        var r = 24;
        ctx.beginPath();
        ctx.moveTo(r, 0); ctx.lineTo(512 - r, 0); ctx.quadraticCurveTo(512, 0, 512, r);
        ctx.lineTo(512, 512 - r); ctx.quadraticCurveTo(512, 512, 512 - r, 512);
        ctx.lineTo(r, 512); ctx.quadraticCurveTo(0, 512, 0, 512 - r);
        ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();
        ctx.clip();

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 512, 512);

        var asp = img.width / img.height;
        var dw, dh, dx, dy;
        if (asp >= 1) {
          dw = 512; dh = 512 / asp; dx = 0; dy = (512 - dh) / 2;
        } else {
          dh = 512; dw = 512 * asp; dx = (512 - dw) / 2; dy = 0;
        }
        ctx.drawImage(img, dx, dy, dw, dh);
        ctx.strokeStyle = 'rgba(45, 76, 58, 0.4)';
        ctx.lineWidth = 8;
        ctx.stroke();

        var cTex = new THREE.CanvasTexture(c);
        if (THREE.SRGBColorSpace) cTex.colorSpace = THREE.SRGBColorSpace;
        cTex.minFilter = THREE.LinearFilter;
        var mat = new THREE.MeshBasicMaterial({ map: cTex, transparent: true, opacity: 0.96, side: THREE.DoubleSide, depthWrite: false });
        materialsCache[imgUrl] = mat;
        if (onReady) onReady(mat);
      };
      img.onerror = function () {
        var tex = loader.load(imgUrl);
        if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
        var mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.95, side: THREE.DoubleSide, depthWrite: false });
        materialsCache[imgUrl] = mat;
        if (onReady) onReady(mat);
      };
      img.src = imgUrl;

      // Fallback
      var fbTex = loader.load(imgUrl);
      if (THREE.SRGBColorSpace) fbTex.colorSpace = THREE.SRGBColorSpace;
      var fbMat = new THREE.MeshBasicMaterial({ map: fbTex, transparent: true, opacity: 0.95, side: THREE.DoubleSide, depthWrite: false });
      materialsCache[imgUrl] = fbMat;
      return fbMat;
    }

    /* ─── DENSE PRODUCT MESHES ─── */
    var totalItems = 110, sphereRadius = 20.5;
    var group = new THREE.Group();
    scene.add(group);
    var meshes = [];
    var cardGeo = new THREE.PlaneGeometry(3.6, 3.6);

    for (var i = 0; i < totalItems; i++) {
      var prod = products[i % products.length];
      var phi = Math.acos(-1 + (2 * i) / totalItems);
      var theta = Math.sqrt(totalItems * Math.PI) * phi;

      var x = sphereRadius * Math.cos(theta) * Math.sin(phi);
      var y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      var z = sphereRadius * Math.cos(phi);

      (function(pData) {
        var mesh = new THREE.Mesh(cardGeo, getFramedMaterial(pData.image, function(loadedMat) {
          mesh.material = loadedMat;
        }));
        mesh.position.set(x, y, z);
        mesh.lookAt(0, 0, 0);
        mesh.rotation.y += Math.PI;
        mesh.userData = {
          product: pData,
          id: pData.id,
          handle: pData.handle,
          title: pData.title,
          group: pData.group || pData.groupName || 'EKKAYI',
          priceFormatted: pData.priceFormatted || ''
        };
        group.add(mesh);
        meshes.push(mesh);
      })(prod);
    }

    /* ─── INTERACTION & ORBIT STATE ─── */
    var isDragging = false;
    var prevMouse = { x: 0, y: 0 };
    var targetRot = { x: 0.15, y: 0 };
    var currentRot = { x: 0.15, y: 0 };
    var hoveredMesh = null;
    var cameraTargetZ = 46;
    var isFlying = false;
    var autoRotate = true;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(-999, -999);

    /* ─── ORBIT CONTROLS LISTENERS ─── */
    var btnZoomIn = document.getElementById('globe-zoom-in');
    var btnZoomOut = document.getElementById('globe-zoom-out');
    var btnRotateToggle = document.getElementById('globe-rotate-toggle');
    var btnResetView = document.getElementById('globe-reset-view');

    if (btnZoomIn) btnZoomIn.addEventListener('click', function() { cameraTargetZ = Math.max(22, cameraTargetZ - 8); });
    if (btnZoomOut) btnZoomOut.addEventListener('click', function() { cameraTargetZ = Math.min(62, cameraTargetZ + 8); });
    if (btnRotateToggle) btnRotateToggle.addEventListener('click', function() {
      autoRotate = !autoRotate;
      btnRotateToggle.innerHTML = autoRotate ? '&#10074;&#10074;' : '&#9658;';
      btnRotateToggle.style.color = autoRotate ? 'var(--gold)' : '#FFFFFF';
    });
    if (btnResetView) btnResetView.addEventListener('click', function() {
      targetRot = { x: 0.15, y: 0 };
      cameraTargetZ = 46;
    });

    window.addEventListener('mousedown', function (e) {
      if (e.target !== renderer.domElement) return;
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', function (e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (tooltip) {
        tooltip.style.left = (e.clientX + 18) + 'px';
        tooltip.style.top  = (e.clientY + 18) + 'px';
      }

      if (isDragging) {
        var dx = e.clientX - prevMouse.x;
        var dy = e.clientY - prevMouse.y;
        targetRot.y += dx * 0.0055;
        targetRot.x += dy * 0.0055;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    });

    window.addEventListener('mouseup', function () { isDragging = false; });

    window.addEventListener('wheel', function (e) {
      e.preventDefault();
      cameraTargetZ = Math.max(22, Math.min(62, cameraTargetZ + e.deltaY * 0.035));
    }, { passive: false });

    // Touch events
    var touchStart = { x: 0, y: 0 };
    window.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchmove', function(e) {
      if (isDragging && e.touches.length === 1) {
        var dx = e.touches[0].clientX - touchStart.x;
        var dy = e.touches[0].clientY - touchStart.y;
        targetRot.y += dx * 0.0075;
        targetRot.x += dy * 0.0075;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', function() { isDragging = false; });

    /* ─── CLICK TO NAVIGATE TO PDP ─── */
    renderer.domElement.addEventListener('click', function () {
      if (isFlying) return;
      raycaster.setFromCamera(mouse, camera);
      var hits = raycaster.intersectObjects(meshes);

      if (hits.length > 0) {
        var hit = hits[0].object;
        var prod = hit.userData.product;
        if (prod && prod.handle) {
          isFlying = true;
          if (zoomOverlay) zoomOverlay.classList.add('active');
          if (tooltip) tooltip.style.display = 'none';

          var worldPos = new THREE.Vector3();
          hit.getWorldPosition(worldPos);
          var startPos = camera.position.clone();
          var targetPos = worldPos.clone().normalize().multiplyScalar(sphereRadius - 3.5);
          var startTime = Date.now();
          var duration = 700;

          (function animateFlight() {
            var now = Date.now();
            var p = Math.min(1, (now - startTime) / duration);
            var ease = 0.5 - Math.cos(p * Math.PI) / 2;
            camera.position.lerpVectors(startPos, targetPos, ease);
            camera.lookAt(worldPos);

            if (p < 1) {
              requestAnimationFrame(animateFlight);
            } else {
              window.location.href = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'products/' + prod.handle;
            }
          })();
        }
      }
    });

    window.addEventListener('resize', function () {
      var w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    /* ─── ANIMATION LOOP ─── */
    (function animate() {
      requestAnimationFrame(animate);

      if (!isDragging && !isFlying && autoRotate) {
        targetRot.y += 0.0012;
      }

      currentRot.x += (targetRot.x - currentRot.x) * 0.08;
      currentRot.y += (targetRot.y - currentRot.y) * 0.08;
      group.rotation.x = currentRot.x;
      group.rotation.y = currentRot.y;

      stardustField.rotation.y += 0.0004;
      stardustField.rotation.x += 0.0002;

      if (!isFlying) {
        camera.position.z += (cameraTargetZ - camera.position.z) * 0.06;
      }

      if (!isFlying) {
        raycaster.setFromCamera(mouse, camera);
        var hits = raycaster.intersectObjects(meshes);

        if (hits.length > 0) {
          var h = hits[0].object;
          if (hoveredMesh !== h) {
            if (hoveredMesh) hoveredMesh.scale.set(1, 1, 1);
            hoveredMesh = h;
            hoveredMesh.scale.set(1.55, 1.55, 1.55);

            if (tooltip && ttName && ttGroup) {
              ttName.textContent  = h.userData.title;
              ttGroup.textContent = h.userData.group;
              if (ttPrice) ttPrice.textContent = h.userData.priceFormatted || '';
              tooltip.style.display = 'block';
            }
            document.body.style.cursor = 'pointer';
          }
        } else {
          if (hoveredMesh) {
            hoveredMesh.scale.set(1, 1, 1);
            hoveredMesh = null;
            if (tooltip) tooltip.style.display = 'none';
            document.body.style.cursor = 'auto';
          }
        }
      }

      renderer.render(scene, camera);
    })();
  }
})();
