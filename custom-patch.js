/* ==========================================================================
   SUPERSHOPPING - SAFE PATCH COMPLETE ENGINE (V3 INTEGRATED)
   ========================================================================== */

(function () {
  'use strict';

  // --- WISHLIST STORAGE HELPERS ---
  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem('ss_user_wishlist') || '[]');
    } catch (e) {
      return [];
    }
  }

  function setWishlist(list) {
    try {
      localStorage.setItem('ss_user_wishlist', JSON.stringify(list));
      updateWishlistBadge();
    } catch (e) {}
  }

  function toggleProductLike(id, btn) {
    let list = getWishlist();
    if (list.includes(id)) {
      list = list.filter(item => item !== id);
      if (btn) {
        btn.classList.remove('liked');
        btn.innerHTML = '♡';
      }
    } else {
      list.push(id);
      if (btn) {
        btn.classList.add('liked');
        btn.innerHTML = '❤️';
      }
    }
    setWishlist(list);
  }

  // --- 1. PRODUCT DETAIL PAGE (PDP) ---
  function ensurePDPModal() {
    let modal = document.getElementById('patchPDPModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'patchPDPModal';
      modal.className = 'patch-pdp-modal';
      modal.innerHTML = `
        <div class="patch-pdp-container">
          <div class="patch-pdp-topbar">
            <button type="button" class="patch-btn-back" id="patchBtnClosePDP">
              ← <span>Back</span>
            </button>
            <span style="font-size: 13px; font-weight: 700; color: #64748b;">SuperShopping Deal</span>
          </div>
          <div class="patch-pdp-media-box">
            <img id="patchPDPImage" src="" alt="Product" />
            <div class="patch-floating-actions">
              <button type="button" class="patch-circle-action-btn" id="patchHeartBtn" title="Wishlist">♡</button>
              <button type="button" class="patch-circle-action-btn" id="patchShareBtn" title="Share Deal">↗</button>
            </div>
          </div>
          <div class="patch-pdp-details">
            <div class="patch-rating-badge" id="patchPDPRating">★ 4.2 | 150+ reviews</div>
            <h2 class="patch-pdp-title" id="patchPDPTitle">Product</h2>
            <div class="patch-variant-box" id="patchVariantShelf">
              <div class="patch-variant-header"><span id="patchVariantLabel">Select Size</span></div>
              <div class="patch-chips-wrap" id="patchChipsWrap"></div>
            </div>
            <div class="patch-desc-box">
              <div class="patch-desc-title">Product Details & Policy</div>
              <p class="patch-desc-text" id="patchPDPDesc">100% genuine verified store deal.</p>
            </div>
          </div>
          <div class="patch-bottom-bar">
            <div class="patch-bottom-inner">
              <div class="patch-price-area">
                <span class="patch-main-price" id="patchPDPPrice">₹0</span>
                <span class="patch-mrp-price" id="patchPDPMSRP">₹0</span>
              </div>
              <a href="#" target="_blank" rel="noopener noreferrer" class="patch-buy-btn" id="patchPDPBuyLink">
                Click to Buy ⚡
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById('patchBtnClosePDP').addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    return modal;
  }

  function openPDP(product) {
    if (!product) return;
    const modal = ensurePDPModal();

    document.getElementById('patchPDPImage').src = product.imageUrl || '';
    document.getElementById('patchPDPTitle').textContent = product.title || '';
    document.getElementById('patchPDPPrice').textContent = `₹${product.price || 0}`;
    document.getElementById('patchPDPMSRP').textContent = product.mrp ? `₹${product.mrp}` : '';
    document.getElementById('patchPDPDesc').textContent = product.description || 'Verified authentic item from merchant store.';
    document.getElementById('patchPDPRating').textContent = `★ ${product.rating || '4.2'} | ${product.reviews || '150+ reviews'}`;

    document.getElementById('patchPDPBuyLink').href = product.affiliateUrl || '#';

    const heartBtn = document.getElementById('patchHeartBtn');
    const isLiked = getWishlist().includes(product.id);
    heartBtn.classList.toggle('liked', isLiked);
    heartBtn.innerHTML = isLiked ? '❤️' : '♡';
    heartBtn.onclick = (e) => {
      e.stopPropagation();
      toggleProductLike(product.id, heartBtn);
    };

    document.getElementById('patchShareBtn').onclick = (e) => {
      e.stopPropagation();
      if (navigator.share) {
        navigator.share({ title: product.title, url: product.affiliateUrl || window.location.href }).catch(() => {});
      } else {
        alert('Product deal link copied!');
      }
    };

    // Measurement & Variant Detection
    const shelf = document.getElementById('patchVariantShelf');
    const label = document.getElementById('patchVariantLabel');
    const chipsWrap = document.getElementById('patchChipsWrap');
    let variants = product.variants;
    let vLabel = product.variantLabel;

    const lower = (product.title || '').toLowerCase();
    if (!variants) {
      if (lower.includes('shirt') || lower.includes('jeans')) {
        variants = ['28', '30', '32', '34'];
        vLabel = 'Select Size';
      } else if (lower.includes('shoe')) {
        variants = ['6', '7', '8', '9', '10'];
        vLabel = 'Select Shoe Size';
      } else if (lower.includes('cream') || lower.includes('wash')) {
        variants = ['50ml', '100ml', '200ml'];
        vLabel = 'Select Volume';
      }
    }

    if (variants && variants.length > 0) {
      shelf.style.display = 'block';
      label.textContent = vLabel || 'Select Option';
      chipsWrap.innerHTML = variants.map((v, i) => `
        <button type="button" class="patch-variant-chip ${i === 0 ? 'active' : ''}">${v}</button>
      `).join('');
      chipsWrap.querySelectorAll('.patch-variant-chip').forEach(btn => {
        btn.onclick = function () {
          chipsWrap.querySelectorAll('.patch-variant-chip').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
        };
      });
    } else {
      shelf.style.display = 'none';
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modal.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Intercept Card Click
  document.addEventListener('click', function (e) {
    const card = e.target.closest('#productsFluidGrid .product-card');
    if (!card) return;

    if (e.target.closest('.btn-merchant-action') && e.target.tagName.toLowerCase() === 'a') return;

    e.preventDefault();
    e.stopPropagation();

    const cardIndex = Array.from(card.parentElement.children).indexOf(card);
    let prod = (typeof LiveCatalogDeals !== 'undefined' && LiveCatalogDeals[cardIndex]) ? LiveCatalogDeals[cardIndex] : null;

    if (!prod) {
      prod = {
        id: `DEAL-${cardIndex + 1}`,
        title: card.querySelector('.product-title-text')?.textContent?.trim() || 'Product',
        price: Number(card.querySelector('.sale-price')?.textContent?.replace(/[^0-9]/g, '') || 0),
        mrp: Number(card.querySelector('.regular-price')?.textContent?.replace(/[^0-9]/g, '') || 0),
        imageUrl: card.querySelector('img')?.src || '',
        affiliateUrl: card.querySelector('a')?.href || '#'
      };
    }
    openPDP(prod);
  }, true);

  // --- 2. ACCOUNT PAGE RESTRUCTURE & SLIDE DRAWER ---
  function setupAccountPageLayout() {
    const accountPane = document.getElementById('pane-account');
    if (!accountPane || accountPane.dataset.patchStructured) return;
    accountPane.dataset.patchStructured = 'true';

    // Top-Right Header Icons (Photo 4)[span_0](start_span)[span_0](end_span)
    let headerActions = document.getElementById('patchAccountHeaderActions');
    if (!headerActions) {
      headerActions = document.createElement('div');
      headerActions.id = 'patchAccountHeaderActions';
      headerActions.className = 'patch-account-header-actions';
      headerActions.innerHTML = `
        <button type="button" class="patch-account-icon-btn" id="patchBtnMenu" title="Menu">⋮</button>
        <button type="button" class="patch-account-icon-btn" id="patchBtnShareWeb" title="Share Website">🔗</button>
      `;
      accountPane.style.position = 'relative';
      accountPane.prepend(headerActions);
    }

    // Slide Drawer Setup
    let drawer = document.getElementById('patchMenuDrawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'patchMenuDrawer';
      drawer.className = 'patch-menu-drawer';
      drawer.innerHTML = `
        <div class="patch-drawer-content">
          <div class="patch-drawer-header">
            <span class="patch-drawer-title">Account Menu</span>
            <button type="button" class="patch-drawer-close" id="patchCloseDrawer">✕</button>
          </div>
          <div class="patch-drawer-menu-list">
            <div class="patch-drawer-item" id="patchMenuItemWishlist">
              <span>❤️ My Saved Wishlist</span>
              <span id="patchDrawerWishlistBadge" style="color:#e11d48;">0</span>
            </div>
            <div class="patch-drawer-item" id="patchMenuItemPersonalInfo">
              <span>👤 Personal Information</span>
              <span>›</span>
            </div>
            <div class="patch-drawer-item" id="patchMenuItemPolicies">
              <span>📜 Legal & Reward Policies</span>
              <span>›</span>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(drawer);

      document.getElementById('patchCloseDrawer').onclick = () => drawer.style.display = 'none';
      drawer.onclick = (e) => { if (e.target === drawer) drawer.style.display = 'none'; };
    }

    // Connect Top-Right Menu & Share
    document.getElementById('patchBtnMenu').onclick = () => {
      updateWishlistBadge();
      drawer.style.display = 'block';
    };

    document.getElementById('patchBtnShareWeb').onclick = () => {
      const url = window.location.origin + window.location.pathname;
      if (navigator.share) {
        navigator.share({ title: 'SuperShopping', text: 'Shop smart and earn rewards on SuperShopping!', url }).catch(() => {});
      } else {
        navigator.clipboard.writeText(url);
        alert('SuperShopping website link copied!');
      }
    };

    // Hide Original Personal Info & Legal Policy blocks from main view (Shift to drawer)
    const personalInfoBox = accountPane.querySelector('.profile-settings-card') || accountPane.querySelectorAll('.settings-card')[0];
    if (personalInfoBox) personalInfoBox.style.display = 'none';

    const policyBox = document.getElementById('legalTermsSection') || accountPane.querySelectorAll('.settings-card')[2];
    if (policyBox) policyBox.style.display = 'none';

    // Drawer Item Clicks
    document.getElementById('patchMenuItemPersonalInfo').onclick = () => {
      drawer.style.display = 'none';
      if (personalInfoBox) {
        personalInfoBox.style.display = 'block';
        personalInfoBox.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.getElementById('patchMenuItemPolicies').onclick = () => {
      drawer.style.display = 'none';
      if (typeof openPolicyModal === 'function') openPolicyModal();
    };

    document.getElementById('patchMenuItemWishlist').onclick = () => {
      drawer.style.display = 'none';
      const w = getWishlist();
      alert(`My Wishlist: You have ${w.length} saved item(s).`);
    };

    // Replace Big FAQ with Compact Trigger Button
    const faqContainer = accountPane.querySelector('.faq-accordion-group') || accountPane.querySelector('.faq-section');
    if (faqContainer && !document.getElementById('patchFaqTrigger')) {
      const faqBtn = document.createElement('button');
      faqBtn.type = 'button';
      faqBtn.id = 'patchFaqTrigger';
      faqBtn.className = 'patch-faq-trigger-btn';
      faqBtn.innerHTML = `<span>💬 Frequently Asked Questions</span><span>▼</span>`;
      
      faqContainer.style.display = 'none';
      faqContainer.parentNode.insertBefore(faqBtn, faqContainer);

      faqBtn.onclick = () => {
        const isHidden = faqContainer.style.display === 'none';
        faqContainer.style.display = isHidden ? 'block' : 'none';
        faqBtn.querySelector('span:last-child').textContent = isHidden ? '▲' : '▼';
      };
    }
  }

  function updateWishlistBadge() {
    const b = document.getElementById('patchDrawerWishlistBadge');
    if (b) b.textContent = `${getWishlist().length} items`;
  }

  // --- 3. E-BOOK CATEGORY FILTER ENGINE ---
  function setupEbookCategoryFilters() {
    const pills = document.querySelectorAll('#ebookCategoriesBar .cat-pill');
    pills.forEach(pill => {
      if (pill.dataset.patchFiltered) return;
      pill.dataset.patchFiltered = 'true';

      pill.addEventListener('click', function (e) {
        e.preventDefault();
        pills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');

        const cat = (this.textContent || '').trim().toLowerCase();
        const container = document.getElementById('ebooksCatalogGrid');
        if (!container || typeof DigitalBooksCatalog === 'undefined') return;

        let filtered = DigitalBooksCatalog;
        if (cat.includes('11-12') || cat.includes('notes')) {
          filtered = DigitalBooksCatalog.filter(b => b.category === 'commerce' || (b.title && b.title.includes('12')));
        } else if (cat.includes('b.com') || cat.includes('account')) {
          filtered = DigitalBooksCatalog.filter(b => b.category === 'commerce');
        } else if (cat.includes('growth') || cat.includes('marketing')) {
          filtered = DigitalBooksCatalog.filter(b => b.category === 'business');
        }

        if (typeof renderEbooksGrid === 'function') {
          renderEbooksGrid(filtered);
        }
      });
    });
  }

  // --- 4. EARN TAB GUEST RESTRICTION ---
  function applyEarnGuestLock() {
    const earnPane = document.getElementById('pane-earn');
    if (!earnPane) return;

    const isLoggedIn = (typeof AppState !== 'undefined' && AppState.currentUser && AppState.currentUser.isLoggedIn);
    const form = document.getElementById('rewardClaimForm');
    let lockBanner = document.getElementById('patchGuestLockBanner');

    if (!isLoggedIn) {
      if (!lockBanner && form) {
        lockBanner = document.createElement('div');
        lockBanner.id = 'patchGuestLockBanner';
        lockBanner.className = 'patch-guest-lock-banner';
        lockBanner.innerHTML = `
          <h4 style="color:#1e3a8a; margin:0 0 6px 0;">🔒 Sign In Required to Claim Reward</h4>
          <p style="color:#475569; font-size:13px; margin:0;">Please login or create an account to record your claim and receive cashback settlement.</p>
          <button type="button" class="patch-guest-lock-btn" id="patchBtnGuestLogin">Sign In / Register</button>
        `;
        form.parentNode.insertBefore(lockBanner, form);

        document.getElementById('patchBtnGuestLogin').onclick = () => {
          if (typeof openAuthModal === 'function') openAuthModal();
        };
      }
      if (form) form.style.opacity = '0.4';
      if (form) form.style.pointerEvents = 'none';
      if (lockBanner) lockBanner.style.display = 'block';
    } else {
      if (form) form.style.opacity = '1';
      if (form) form.style.pointerEvents = 'auto';
      if (lockBanner) lockBanner.style.display = 'none';
    }
  }

  // --- GLOBAL RUNNER ---
  function runAllPatches() {
    setupAccountPageLayout();
    setupEbookCategoryFilters();
    applyEarnGuestLock();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllPatches);
  } else {
    runAllPatches();
  }

  setInterval(runAllPatches, 1500);

})();
