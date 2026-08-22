/* =========================================================
   EKKAYI — MASTER THEME JS
   Handles: Loader, Sidebar, Search, Audio, Cart AJAX,
   PDP Zoom/Gallery, Marble Swatches, Modals, Mandirs
   ========================================================= */

(function () {
  'use strict';

  /* ─── HELPERS ────────────────────────────────────────── */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ─── SIDEBAR ────────────────────────────────────────── */
  var menuBtn = qs('#menu-btn');
  var overlay = qs('#sidebar-overlay');
  var drawer  = qs('#sidebar-drawer');

  function openMenu() {
    drawer && drawer.classList.add('active');
    overlay && overlay.classList.add('active');
    if (menuBtn) { menuBtn.classList.add('open'); menuBtn.setAttribute('aria-expanded', 'true'); }
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    drawer && drawer.classList.remove('active');
    overlay && overlay.classList.remove('active');
    if (menuBtn) { menuBtn.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
    document.body.style.overflow = '';
  }
  if (menuBtn) menuBtn.addEventListener('click', function() { drawer && drawer.classList.contains('active') ? closeMenu() : openMenu(); });
  if (overlay) overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMenu(); });

  /* ─── SEARCH MODAL ───────────────────────────────────── */
  var searchModal  = qs('#search-modal');
  var searchBtn    = qs('#search-btn');
  var searchClose  = qs('#search-close');
  var searchInput  = qs('#search-input');
  var searchResults= qs('#search-results');
  var searchTimer;

  function openSearch() {
    if (!searchModal) return;
    searchModal.style.display = 'flex';
    setTimeout(function() { if (searchInput) searchInput.focus(); }, 100);
  }
  function closeSearch() {
    if (searchModal) searchModal.style.display = 'none';
    if (searchResults) searchResults.innerHTML = '';
    if (searchInput) searchInput.value = '';
  }
  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchModal) searchModal.addEventListener('click', function(e) { if (e.target === searchModal) closeSearch(); });

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimer);
      var q = searchInput.value.trim();
      if (q.length < 2) { if (searchResults) searchResults.innerHTML = ''; return; }
      searchTimer = setTimeout(function() {
        fetch('/search/suggest.json?q=' + encodeURIComponent(q) + '&resources[type]=product,collection&resources[limit]=6')
          .then(function(r) { return r.json(); })
          .then(function(data) {
            if (!searchResults) return;
            var html = '';
            var products = (data.resources && data.resources.results && data.resources.results.products) || [];
            var collections = (data.resources && data.resources.results && data.resources.results.collections) || [];
            products.forEach(function(p) {
              html += '<a href="' + p.url + '" style="display:flex;align-items:center;gap:1rem;padding:0.75rem 1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:6px;color:#fff;text-decoration:none;transition:border-color 0.2s;">'
                + (p.featured_image ? '<img src="' + p.featured_image + '" style="width:44px;height:44px;object-fit:contain;background:#111;border-radius:4px;">' : '')
                + '<div><div style="font-size:0.875rem;font-weight:600;">' + p.title + '</div>'
                + '<div style="font-size:0.72rem;color:var(--text-muted);">' + (p.product_type || 'Product') + '</div></div></a>';
            });
            collections.forEach(function(c) {
              html += '<a href="' + c.url + '" style="display:flex;align-items:center;gap:1rem;padding:0.75rem 1rem;background:rgba(197,167,92,0.05);border:1px solid rgba(197,167,92,0.15);border-radius:6px;color:var(--gold);text-decoration:none;font-size:0.875rem;">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>'
                + 'Collection: ' + c.title + '</a>';
            });
            searchResults.innerHTML = html || '<p style="text-align:center;color:rgba(255,255,255,0.35);font-size:0.875rem;padding:1rem;">No results found for "' + q + '"</p>';
          });
      }, 280);
    });
  }

  /* ─── AMBIENT AUDIO ──────────────────────────────────── */
  var audioCtx, gainNode, isPlaying = false;
  var audioBtn = qs('#audio-btn');
  var iconOff  = qs('#audio-icon-off');
  var iconOn   = qs('#audio-icon-on');

  function toggleAudio() {
    try {
      if (!audioCtx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AC();
        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3);
        gainNode.connect(audioCtx.destination);
        [110, 164.81, 220, 329.63, 440].forEach(function(freq) {
          var osc = audioCtx.createOscillator(); osc.type = 'sine'; osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
          var lfo = audioCtx.createOscillator(); lfo.frequency.value = 0.15 + Math.random() * 0.1;
          var lfoG = audioCtx.createGain(); lfoG.gain.value = 1.5; lfo.connect(lfoG); lfoG.connect(osc.frequency); lfo.start();
          osc.connect(gainNode); osc.start();
        });
        isPlaying = true;
      } else {
        if (isPlaying) { audioCtx.suspend(); isPlaying = false; }
        else { audioCtx.resume(); isPlaying = true; }
      }
      if (audioBtn) audioBtn.classList.toggle('audio-on', isPlaying);
      if (iconOff) iconOff.style.display = isPlaying ? 'none' : '';
      if (iconOn)  iconOn.style.display  = isPlaying ? '' : 'none';
    } catch(e) {}
  }
  if (audioBtn) audioBtn.addEventListener('click', toggleAudio);

  /* ─── CART BADGE UPDATE ──────────────────────────────── */
  function updateCartBadge() {
    fetch('/cart.js')
      .then(function(r) { return r.json(); })
      .then(function(c) {
        var badge = qs('#cart-badge');
        var pdpBadge = qs('#pdp-cart-badge');
        if (badge) {
          if (c.item_count > 0) { badge.textContent = c.item_count; badge.style.display = 'flex'; }
          else badge.style.display = 'none';
        }
        if (pdpBadge) {
          if (c.item_count > 0) { pdpBadge.textContent = c.item_count; pdpBadge.style.display = 'flex'; }
          else pdpBadge.style.display = 'none';
        }
      });
  }
  updateCartBadge();

  /* ─── CART QUANTITY BUTTONS (cart page) ──────────────── */
  qsa('.qty-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var line = parseInt(btn.dataset.line);
      var delta = parseInt(btn.dataset.delta);
      var display = btn.closest('div').querySelector('.qty-display');
      var currentQty = parseInt(display ? display.textContent : 1);
      var newQty = Math.max(0, currentQty + delta);
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: line, quantity: newQty })
      }).then(function() { window.location.reload(); });
    });
  });

  /* ─── PDP ADD TO CART (AJAX) ─────────────────────────── */
  var atcForm = qs('#pdp-atc-form');
  var atcBtn  = qs('#pdp-atc-btn');
  if (atcForm && atcBtn) {
    atcForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var variantId = qs('#pdp-variant-id').value;
      atcBtn.textContent = 'Adding...';
      atcBtn.disabled = true;
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      })
      .then(function(r) { return r.json(); })
      .then(function() {
        atcBtn.textContent = 'Added to Cart ✓';
        atcBtn.style.background = '#c5a75c';
        updateCartBadge();
        setTimeout(function() {
          atcBtn.textContent = 'Add to Cart';
          atcBtn.style.background = '';
          atcBtn.disabled = false;
        }, 2500);
      })
      .catch(function() { atcBtn.textContent = 'Add to Cart'; atcBtn.disabled = false; });
    });
  }

  /* ─── PDP IMAGE VIEWER ───────────────────────────────── */
  var pdpImages = window.KDH_PDP_IMAGES || [];
  var pdpTotal  = pdpImages.length;
  var pdpIdx    = 0;
  var pdpMain   = qs('#pdp-main-img');
  var pdpCounter= qs('#pdp-counter');
  var pdpPrev   = qs('#pdp-prev');
  var pdpNext   = qs('#pdp-next');

  function pdpGoTo(i) {
    pdpIdx = (i + pdpTotal) % pdpTotal;
    if (pdpMain) pdpMain.src = pdpImages[pdpIdx];
    if (pdpCounter) pdpCounter.textContent = (pdpIdx + 1) + ' / ' + pdpTotal;
    qsa('.pdp-thumb').forEach(function(t) {
      t.style.borderColor = parseInt(t.dataset.index) === pdpIdx ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.12)';
    });
    var lbImg = qs('#pdp-lb-img');
    if (lbImg) lbImg.src = pdpImages[pdpIdx];
  }
  if (pdpPrev) pdpPrev.addEventListener('click', function() { pdpGoTo(pdpIdx - 1); });
  if (pdpNext) pdpNext.addEventListener('click', function() { pdpGoTo(pdpIdx + 1); });

  qsa('.pdp-thumb').forEach(function(t) {
    t.addEventListener('click', function() { pdpGoTo(parseInt(t.dataset.index)); });
  });

  /* ─── PDP IMAGE ZOOM ─────────────────────────────────── */
  var zoomStage = qs('#pdp-zoom-stage');
  var zoomImg   = qs('#pdp-main-img');
  var isLocked  = false;

  if (zoomStage && zoomImg) {
    zoomStage.addEventListener('mousemove', function(e) {
      if (isLocked) return;
      var r = zoomStage.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width) * 100;
      var y = ((e.clientY - r.top) / r.height) * 100;
      zoomImg.style.transformOrigin = x + '% ' + y + '%';
      zoomImg.style.transform = 'scale(2.2)';
      zoomImg.style.cursor = 'zoom-in';
    });
    zoomStage.addEventListener('mouseleave', function() {
      if (isLocked) return;
      zoomImg.style.transformOrigin = 'center center';
      zoomImg.style.transform = 'scale(1)';
    });
    zoomStage.addEventListener('click', function(e) {
      isLocked = !isLocked;
      if (isLocked) {
        var r = zoomStage.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width) * 100;
        var y = ((e.clientY - r.top) / r.height) * 100;
        zoomImg.style.transformOrigin = x + '% ' + y + '%';
        zoomImg.style.transform = 'scale(2.6)';
        zoomImg.style.cursor = 'zoom-out';
      } else {
        zoomImg.style.transformOrigin = 'center center';
        zoomImg.style.transform = 'scale(1)';
        zoomImg.style.cursor = 'zoom-in';
      }
    });
  }

  /* ─── PDP FULLSCREEN LIGHTBOX ────────────────────────── */
  var fsBtn    = qs('#pdp-fs-btn');
  var lightbox = qs('#pdp-lightbox');
  var lbClose  = qs('#pdp-lb-close');
  var lbPrev   = qs('#pdp-lb-prev');
  var lbNext   = qs('#pdp-lb-next');

  if (fsBtn) fsBtn.addEventListener('click', function() { if (lightbox) { lightbox.classList.add('open'); lightbox.style.display = 'flex'; } });
  if (lbClose) lbClose.addEventListener('click', function() { if (lightbox) { lightbox.classList.remove('open'); lightbox.style.display = 'none'; } });
  if (lbPrev) lbPrev.addEventListener('click', function() { pdpGoTo(pdpIdx - 1); });
  if (lbNext) lbNext.addEventListener('click', function() { pdpGoTo(pdpIdx + 1); });

  /* ─── PDP ALL PHOTOS GRID ────────────────────────────── */
  var gridBtn   = qs('#pdp-grid-btn');
  var gridModal = qs('#pdp-grid-modal');
  var gridClose = qs('#pdp-grid-close');

  if (gridBtn) gridBtn.addEventListener('click', function() { if (gridModal) gridModal.classList.add('open'); });
  if (gridClose) gridClose.addEventListener('click', function() { if (gridModal) gridModal.classList.remove('open'); });
  qsa('.pdp-grid-img').forEach(function(img) {
    img.addEventListener('click', function() {
      pdpGoTo(parseInt(img.dataset.index));
      if (gridModal) gridModal.classList.remove('open');
      if (lightbox) { lightbox.classList.add('open'); lightbox.style.display = 'flex'; }
    });
  });

  /* ─── PDP DIMENSIONS MODAL ───────────────────────────── */
  function openDims() { var m = qs('#dims-modal'); if (m) { m.classList.add('open'); m.style.display = 'flex'; } }
  function closeDims() { var m = qs('#dims-modal'); if (m) { m.classList.remove('open'); m.style.display = 'none'; } }
  var dBtn = qs('#dims-modal-btn'); if (dBtn) dBtn.addEventListener('click', openDims);
  var dBtn2 = qs('#dims-modal-btn2'); if (dBtn2) dBtn2.addEventListener('click', openDims);
  var dClose = qs('#dims-close'); if (dClose) dClose.addEventListener('click', closeDims);



  /* ─── ENQUIRE MODAL ──────────────────────────────────── */
  var enquireModal   = qs('#enquire-modal');
  var enquireClose   = qs('#enquire-close');
  var enquireProdName= qs('#enquire-product-name');
  var enquireProdHid = qs('#enquire-product-hidden');
  var enquireVarHid  = qs('#enquire-variant-hidden');

  function openEnquire(productTitle, variant) {
    if (!enquireModal) return;
    enquireModal.style.display = 'flex';
    if (enquireProdName) enquireProdName.textContent = productTitle + (variant ? ' — ' + variant : '');
    if (enquireProdHid) enquireProdHid.value = productTitle;
    if (enquireVarHid) enquireVarHid.value = variant || '';
    var subject = qs('#enquire-subject'); if (subject) subject.value = 'Product Enquiry: ' + productTitle;
  }
  if (enquireClose) enquireClose.addEventListener('click', function() { if (enquireModal) enquireModal.style.display = 'none'; });
  if (enquireModal) enquireModal.addEventListener('click', function(e) { if (e.target === enquireModal) enquireModal.style.display = 'none'; });

  qsa('.open-enquire').forEach(function(btn) {
    btn.addEventListener('click', function() { openEnquire(btn.dataset.product || '', btn.dataset.variant || ''); });
  });

  /* ─── CATALOGUE MODAL ────────────────────────────────── */
  var catModal  = qs('#catalogue-modal');
  var catClose  = qs('#catalogue-close');
  var catName   = qs('#catalogue-collection-name');
  var catPdfUrl = qs('#catalogue-pdf-url');
  var catForm   = qs('#catalogue-form');

  qsa('.open-catalogue').forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (!catModal) return;
      catModal.style.display = 'flex';
      if (catName) catName.textContent = btn.dataset.title || '';
      if (catPdfUrl) catPdfUrl.value = btn.dataset.pdf || '';
    });
  });
  if (catClose) catClose.addEventListener('click', function() { if (catModal) catModal.style.display = 'none'; });
  if (catModal) catModal.addEventListener('click', function(e) { if (e.target === catModal) catModal.style.display = 'none'; });
  if (catForm) {
    catForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var pdf = catPdfUrl ? catPdfUrl.value : '';
      if (pdf) { window.open(pdf, '_blank'); catModal.style.display = 'none'; }
    });
  }

  /* ─── COLLECTIONS FILTER ─────────────────────────────── */
  qsa('.col-filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      qsa('.col-filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      qsa('.kdh-col-card').forEach(function(card) {
        var show = f === 'all'
          || (f === 'recent' && ['2025','2026'].indexOf(card.dataset.year) > -1)
          || (f !== 'all' && f !== 'recent' && card.dataset.filter === f);
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });

  /* ─── MANDIRS CAROUSEL ───────────────────────────────── */
  var mandirsAll   = qsa('.mandir-card');
  var mandirDots   = qsa('.mandir-dot');
  var mandirsTotal = mandirsAll.length;
  var mandirIdx    = 0;

  function goMandir(i) {
    mandirsAll[mandirIdx].style.display = 'none';
    mandirDots[mandirIdx].style.width = '8px'; mandirDots[mandirIdx].style.background = 'rgba(255,255,255,0.2)';
    mandirIdx = (i + mandirsTotal) % mandirsTotal;
    mandirsAll[mandirIdx].style.display = 'flex';
    mandirDots[mandirIdx].style.width = '28px'; mandirDots[mandirIdx].style.background = 'var(--gold)';
  }
  var mPrev = qs('#mandir-prev'); if (mPrev) mPrev.addEventListener('click', function() { goMandir(mandirIdx - 1); });
  var mNext = qs('#mandir-next'); if (mNext) mNext.addEventListener('click', function() { goMandir(mandirIdx + 1); });
  mandirDots.forEach(function(dot, i) { dot.addEventListener('click', function() { goMandir(i); }); });

  /* ─── KEYBOARD NAV ───────────────────────────────────── */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeDims(); closeSearch();
      if (lightbox) { lightbox.classList.remove('open'); lightbox.style.display = 'none'; }
      if (gridModal) gridModal.classList.remove('open');
      if (enquireModal) enquireModal.style.display = 'none';
      if (catModal) catModal.style.display = 'none';
    }
    if (e.key === 'ArrowRight' && pdpImages.length > 0) pdpGoTo(pdpIdx + 1);
    if (e.key === 'ArrowLeft' && pdpImages.length > 0) pdpGoTo(pdpIdx - 1);
  });

})();

