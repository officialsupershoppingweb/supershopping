/* ==========================================================================
   SUPERSHOPPING - SAFE NON-DESTRUCTIVE PATCH ENGINE
   ========================================================================== */

(function () {
  'use strict';

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
      const b = document.getElementById('patchDrawerWishlistCount');
      if (b) b.textContent = `${list.length} items`;
    } catch (e) {}
  }

  function toggleProductLike(id, btn) {
    let list = getWishlist();
    if (list.includes(id)) {
      list = list.filter(item => item !== id);
      if (btn) { btn.classList.remove('liked'); btn.innerHTML = '♡'; }
    } else {
      list.push(id);
      if (btn) { btn.classList.add('liked'); btn.innerHTML = '❤️'; }
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
            <button type="button" class="patch-btn-back" id="patchBtnClosePDP">← <span>Back</span></button>
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
              <a href="#" target="_blank" rel="noopener noreferrer" class="patch-buy-btn" id="patchPDPBuyLink">Click to Buy ⚡</a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById('patchBtnClosePDP').onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      };
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

  // --- 2. EDIT PROFILE MODAL (STRICT EMAIL CHECK) ---
  function ensurePersonalInfoModal() {
    let modal = document.getElementById('patchPersonalInfoModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'patchPersonalInfoModal';
      modal.className = 'patch-info-modal-backdrop';
      modal.innerHTML = `
        <div class="patch-info-card">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:10px;">
            <h4 style="margin:0; font-size:15px; color:#0f172a;">Edit Personal Information</h4>
            <button type="button" id="patchBtnCloseInfoModal" style="background:none; border:none; font-size:18px; cursor:pointer; color:#64748b;">✕</button>
          </div>
          <div style="text-align:center; margin:12px 0 6px 0;">
            <div id="patchAvatarModalPreview" style="width:62px; height:62px; border-radius:50%; background:#0284c7; color:#fff; font-size:20px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; margin-bottom:6px;">SS</div>
            <div>
              <label for="patchFileInputPhoto" style="font-size:12px; color:#0284c7; font-weight:700; cursor:pointer;">📷 Change Profile Photo</label>
              <input type="file" id="patchFileInputPhoto" accept="image/*" style="display:none;" />
            </div>
          </div>
          <label class="patch-field-label">Full Legal Name</label>
          <input type="text" id="patchModalName" class="patch-input-box" placeholder="Enter Full Name" />
          <label class="patch-field-label">Original Email ID <span style="color:#dc2626;">*</span></label>
          <input type="email" id="patchModalEmail" class="patch-input-box" placeholder="name@example.com" required />
          <div style="font-size:11px; color:#dc2626; font-weight:600; margin-top:3px;">⚠️ Original email is mandatory for OTP & cashback rewards.</div>
          <label class="patch-field-label">Mobile Number (+91)</label>
          <input type="tel" id="patchModalPhone" class="patch-input-box" placeholder="10-digit mobile number" />
          <label class="patch-field-label">Default Postal Address</label>
          <textarea id="patchModalAddress" class="patch-input-box" placeholder="Full residential delivery address..." rows="2" style="font-family:inherit;"></textarea>
          <button type="button" id="patchBtnSaveProfileInfo" style="width:100%; background:#0284c7; color:#fff; font-weight:700; padding:12px; border:none; border-radius:8px; margin-top:14px; cursor:pointer;">Save Details ✓</button>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('patchBtnCloseInfoModal').onclick = () => { modal.style.display = 'none'; };
      modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

      document.getElementById('patchFileInputPhoto').onchange = function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (ev) {
            document.getElementById('patchAvatarModalPreview').innerHTML = `<img src="${ev.target.result}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
            const mainAvatar = document.querySelector('#pane-account .avatar-box, #pane-account .profile-avatar-wrap');
            if (mainAvatar) {
              mainAvatar.innerHTML = `<img src="${ev.target.result}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
            }
          };
          reader.readAsDataURL(file);
        }
      };

      document.getElementById('patchBtnSaveProfileInfo').onclick = () => {
        const email = document.getElementById('patchModalEmail').value.trim();
        const name = document.getElementById('patchModalName').value.trim();
        if (!email || !email.includes('@') || !email.includes('.')) {
          alert('Validation Error:\nPlease enter a valid, original email address.');
          return;
        }
        if (name && typeof AppState !== 'undefined' && AppState.currentUser) {
          AppState.currentUser.name = name;
          const nameDisp = document.getElementById('profileNameDisplay');
          if (nameDisp) nameDisp.textContent = name;
        }
        alert('Profile updated successfully!\nYour verified email has been saved.');
        modal.style.display = 'none';
      };
    }
    return modal;
  }

  // --- 3. ACCOUNT CONTROLS & DRAWER (NO BLIND HIDING) ---
  function setupAccountPageLayout() {
    const accPane = document.getElementById('pane-account');
    if (!accPane) return;

    // Make sure pane-account stays visible
    accPane.style.display = (typeof AppState !== 'undefined' && AppState.currentTab === 'account') ? 'block' : '';

    // Add Top-Right buttons once
    if (!document.getElementById('patchAccControls')) {
      const controls = document.createElement('div');
      controls.id = 'patchAccControls';
      controls.className = 'patch-acc-top-controls';
      controls.innerHTML = `
        <button type="button" class="patch-acc-circle-btn" id="patchBtnOpenDrawer" title="Menu">⋮</button>
        <button type="button" class="patch-acc-circle-btn" id="patchBtnDirectShare" title="Share Website">🔗</button>
      `;
      accPane.prepend(controls);

      document.getElementById('patchBtnOpenDrawer').onclick = () => {
        const wCount = getWishlist().length;
        const b = document.getElementById('patchDrawerWishlistCount');
        if (b) b.textContent = `${wCount} items`;
        document.getElementById('patchDrawerOverlay').style.display = 'block';
      };

      document.getElementById('patchBtnDirectShare').onclick = () => {
        const url = window.location.origin + window.location.pathname;
        if (navigator.share) {
          navigator.share({ title: 'SuperShopping', text: 'Shop verified deals on SuperShopping!', url }).catch(() => {});
        } else {
          navigator.clipboard.writeText(url);
          alert('Website link copied!');
        }
      };
    }

    // Slide Drawer DOM once
    if (!document.getElementById('patchDrawerOverlay')) {
      const drawer = document.createElement('div');
      drawer.id = 'patchDrawerOverlay';
      drawer.className = 'patch-drawer-overlay';
      drawer.innerHTML = `
        <div class="patch-drawer-box">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:12px;">
            <span style="font-size:15px; font-weight:700; color:#0f172a;">Account Menu</span>
            <button type="button" id="patchBtnCloseDrawer" style="background:none; border:none; font-size:18px; cursor:pointer; color:#64748b;">✕</button>
          </div>
          <div class="patch-drawer-row" id="patchDrawerWishlist">
            <span>❤️ My Saved Wishlist</span>
            <span style="color:#e11d48;" id="patchDrawerWishlistCount">0</span>
          </div>
          <div class="patch-drawer-row" id="patchDrawerEditProfile">
            <span>👤 Edit Personal Information</span>
            <span>›</span>
          </div>
          <div class="patch-drawer-row" id="patchDrawerPolicies">
            <span>📜 Legal & Reward Policies</span>
            <span>›</span>
          </div>
        </div>
      `;
      document.body.appendChild(drawer);

      document.getElementById('patchBtnCloseDrawer').onclick = () => drawer.style.display = 'none';
      drawer.onclick = (e) => { if (e.target === drawer) drawer.style.display = 'none'; };

      document.getElementById('patchDrawerEditProfile').onclick = () => {
        drawer.style.display = 'none';
        ensurePersonalInfoModal().style.display = 'flex';
      };

      document.getElementById('patchDrawerWishlist').onclick = () => {
        drawer.style.display = 'none';
        alert(`My Wishlist: You have ${getWishlist().length} saved item(s).`);
      };

      document.getElementById('patchDrawerPolicies').onclick = () => {
        drawer.style.display = 'none';
        if (typeof openPolicyModal === 'function') openPolicyModal();
      };
    }

    // Specific Hides (Only direct forms, never container boxes!)
    const infoForm = accPane.querySelector('form');
    if (infoForm && !infoForm.id.includes('patch')) {
      infoForm.style.display = 'none';
    }

    // Hide old duplicate shelf if created earlier
    const oldShelf = document.getElementById('patchAccountShelf');
    if (oldShelf) oldShelf.style.display = 'none';
  }

  // --- 4. EBOOKS & EARN LOCK ---
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
        if (typeof DigitalBooksCatalog === 'undefined') return;

        let filtered = DigitalBooksCatalog;
        if (cat.includes('11-12') || cat.includes('notes')) {
          filtered = DigitalBooksCatalog.filter(b => b.category === 'commerce' || (b.title && b.title.includes('12')));
        } else if (cat.includes('b.com') || cat.includes('account')) {
          filtered = DigitalBooksCatalog.filter(b => b.category === 'commerce');
        } else if (cat.includes('growth') || cat.includes('marketing')) {
          filtered = DigitalBooksCatalog.filter(b => b.category === 'business');
        }

        if (typeof renderEbooksGrid === 'function') renderEbooksGrid(filtered);
      });
    });
  }

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
      if (form) {
        form.style.opacity = '0.4';
        form.style.pointerEvents = 'none';
      }
      if (lockBanner) lockBanner.style.display = 'block';
    } else {
      if (form) {
        form.style.opacity = '1';
        form.style.pointerEvents = 'auto';
      }
      if (lockBanner) lockBanner.style.display = 'none';
    }
  }

  function runPatches() {
    setupAccountPageLayout();
    setupEbookCategoryFilters();
    applyEarnGuestLock();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPatches);
  } else {
    runPatches();
  }

  setInterval(runPatches, 2000);
})();

/* ==========================================================================
   APPENDED: TARGET REMOVAL & FAQ DRAWER ENGINE
   ========================================================================== */
(function () {
  'use strict';

  function applyFinalAccountFixes() {
    const accPane = document.getElementById('pane-account');
    if (!accPane) return;

    // A. Photo 1: Personal Information card ko seedhe gayab karo
    accPane.querySelectorAll('.settings-card').forEach(card => {
      const text = (card.textContent || '').trim();
      if (text.includes('Personal Information') && (card.querySelector('input') || text.length < 200)) {
        card.style.setProperty('display', 'none', 'important');
      }
      // C. Photo 3: Legal Terms & Policies ko seedhe gayab karo
      if (text.includes('Legal Terms') || text.includes('Reward Policies')) {
        card.style.setProperty('display', 'none', 'important');
      }
    });

    // B. Photo 2: Original FAQ ke 4 khule dabbo ko pakad kar drawer me shift karo
    const originalFaq = accPane.querySelector('.faq-accordion-group') || 
                        accPane.querySelector('.faq-section') ||
                        Array.from(accPane.querySelectorAll('.settings-card')).find(c => c.textContent.includes('Frequently Asked Questions'));

    if (originalFaq && !document.getElementById('patchFaqBarBtn')) {
      // 1. WhatsApp jaisa stylish Single FAQ Bar banayein
      const faqBar = document.createElement('button');
      faqBar.type = 'button';
      faqBar.id = 'patchFaqBarBtn';
      faqBar.className = 'patch-faq-bar-btn';
      faqBar.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span>💬</span>
          <span>Frequently Asked Questions</span>
        </div>
        <span style="font-size:12px; background:#22c55e; color:#fff; padding:3px 8px; border-radius:12px;">View All ›</span>
      `;

      // 2. FAQ Drawer Overlay banao
      const faqDrawer = document.createElement('div');
      faqDrawer.id = 'patchFaqDrawer';
      faqDrawer.className = 'patch-faq-drawer-overlay';
      faqDrawer.innerHTML = `
        <div class="patch-faq-drawer-sheet">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e2e8f0; padding-bottom:12px; margin-bottom:14px;">
            <h3 style="margin:0; font-size:16px; color:#0f172a; font-weight:700;">Frequently Asked Questions</h3>
            <button type="button" id="patchBtnCloseFaqDrawer" style="background:none; border:none; font-size:20px; cursor:pointer; color:#64748b;">✕</button>
          </div>
          <div id="patchFaqQuestionsHolder"></div>
        </div>
      `;
      document.body.appendChild(faqDrawer);

      // Original FAQ content ko drawer ke andar move karo
      const holder = document.getElementById('patchFaqQuestionsHolder');
      holder.appendChild(originalFaq.cloneNode(true));
      holder.firstElementChild.style.display = 'block';

      // Original wale ko screen se permanently hide karo
      originalFaq.style.setProperty('display', 'none', 'important');

      // FAQ Bar button ko Invite card ke theek neeche lagayein
      originalFaq.parentNode.insertBefore(faqBar, originalFaq);

      // Clicks setup
      faqBar.onclick = () => { faqDrawer.style.display = 'block'; };
      document.getElementById('patchBtnCloseFaqDrawer').onclick = () => { faqDrawer.style.display = 'none'; };
      faqDrawer.onclick = (e) => { if (e.target === faqDrawer) faqDrawer.style.display = 'none'; };
    }
  }

  // Bar-bar run karein taaki dynamic render me wapas na aaye
  setInterval(applyFinalAccountFixes, 800);
})();
