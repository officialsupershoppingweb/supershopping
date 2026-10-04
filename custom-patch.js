/* ==========================================================================
   SUPERSHOPPING - SAFE PATCH COMPLETE ENGINE (V4 STRICT ACCOUNT CLEANUP)
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

  // --- 2. EDIT PERSONAL INFO MODAL (CALLED FROM MENU) ---
  function ensurePersonalInfoModal() {
    let modal = document.getElementById('patchPersonalInfoModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'patchPersonalInfoModal';
      modal.className = 'patch-info-modal';
      modal.innerHTML = `
        <div class="patch-info-modal-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; border-bottom:1px solid #f1f5f9; padding-bottom:10px;">
            <h3 style="margin:0; font-size:16px; color:#0f172a;">Edit Personal Information</h3>
            <button type="button" id="patchCloseInfoModal" style="background:none; border:none; font-size:18px; cursor:pointer; color:#64748b;">✕</button>
          </div>
          
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="text-align:center; margin-bottom:6px;">
              <div id="patchEditAvatarPreview" style="width:64px; height:64px; border-radius:50%; background:#0284c7; color:#fff; font-size:20px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; margin-bottom:6px;">
                SS
              </div>
              <div>
                <label for="patchPhotoInput" style="font-size:12px; color:#0284c7; font-weight:600; cursor:pointer;">📷 Change Profile Photo</label>
                <input type="file" id="patchPhotoInput" accept="image/*" style="display:none;" />
              </div>
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; color:#475569;">Full Legal Name</label>
              <input type="text" id="patchInputName" placeholder="Enter Full Name" style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:8px; margin-top:4px;" />
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; color:#475569;">Mobile Number (+91)</label>
              <input type="tel" id="patchInputPhone" placeholder="10-digit mobile number" style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:8px; margin-top:4px;" />
            </div>

            <div>
              <label style="font-size:12px; font-weight:600; color:#475569;">Default Postal Address</label>
              <textarea id="patchInputAddress" placeholder="Full residential delivery address..." rows="2" style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:8px; margin-top:4px; font-family:inherit;"></textarea>
            </div>

            <button type="button" id="patchSaveInfoBtn" style="background:#0284c7; color:#fff; border:none; padding:12px; border-radius:8px; font-weight:700; cursor:pointer; margin-top:6px;">
              Save Details ✓
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('patchCloseInfoModal').onclick = () => { modal.style.display = 'none'; };
      modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

      // Photo Upload Preview
      document.getElementById('patchPhotoInput').onchange = function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            const preview = document.getElementById('patchEditAvatarPreview');
            preview.innerHTML = `<img src="${evt.target.result}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
            
            // Also update main account avatar
            const mainAvatar = document.querySelector('#pane-account .avatar-box, #pane-account .profile-avatar-wrap');
            if (mainAvatar) {
              mainAvatar.innerHTML = `<img src="${evt.target.result}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
            }
          };
          reader.readAsDataURL(file);
        }
      };

      // Save Action
      document.getElementById('patchSaveInfoBtn').onclick = () => {
        const nameVal = document.getElementById('patchInputName').value.trim();
        if (nameVal && typeof AppState !== 'undefined' && AppState.currentUser) {
          AppState.currentUser.name = nameVal;
          const nameDisp = document.getElementById('profileNameDisplay');
          if (nameDisp) nameDisp.textContent = nameVal;
        }
        alert('Personal Details updated successfully!');
        modal.style.display = 'none';
      };
    }
    return modal;
  }

  // --- 3. ACCOUNT PAGE RESTRUCTURE ---
  function setupAccountPageLayout() {
    const accountPane = document.getElementById('pane-account');
    if (!accountPane) return;

    // Top-Right Header Icons
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

    // Slide Drawer
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
              <span>Edit ›</span>
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

    // Menu & Share Listeners
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

    // Drawer Item Clicks
    document.getElementById('patchMenuItemPersonalInfo').onclick = () => {
      drawer.style.display = 'none';
      const infoModal = ensurePersonalInfoModal();
      infoModal.style.display = 'flex';
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

    // Replace big FAQ list with single compact button bar
    const faqContainer = accountPane.querySelector('.faq-accordion-group, .faq-section, #accountFaqSection');
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

    // Strict DOM Cleanup: Hide all remaining personal-info and policy cards from main page
    accountPane.querySelectorAll('div').forEach(el => {
      const txt = (el.textContent || '').trim();
      if (txt.startsWith('Personal Information') && el.querySelector('input')) {
        el.style.display = 'none';
      }
      if (txt.includes('Legal Terms & Reward Policies') && el.querySelector('.btn, a, button')) {
        el.style.display = 'none';
      }
    });
  }
   /* ==========================================================================
   APPENDED: ACCOUNT PAGE RESTRUCTURE, STRICT ORIGINAL EMAIL & MENU DRAWER
   ========================================================================== */
(function () {
  'use strict';

  function initAccountStructure() {
    const accPane = document.getElementById('pane-account');
    if (!accPane || accPane.dataset.patchAccountInit) return;
    accPane.dataset.patchAccountInit = 'true';

    // 1. Floating Top-Right Controls (Menu ⋮ + Share 🔗)
    if (!document.getElementById('patchAccControls')) {
      const controls = document.createElement('div');
      controls.id = 'patchAccControls';
      controls.className = 'patch-acc-top-controls';
      controls.innerHTML = `
        <button type="button" class="patch-acc-circle-btn" id="patchBtnOpenDrawer" title="Account Menu">⋮</button>
        <button type="button" class="patch-acc-circle-btn" id="patchBtnDirectShare" title="Share Website">🔗</button>
      `;
      accPane.prepend(controls);
    }

    // 2. Slide Drawer DOM
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
    }

    // 3. Edit Personal Info Modal with Mandatory Email
    if (!document.getElementById('patchInfoModalBackdrop')) {
      const infoModal = document.createElement('div');
      infoModal.id = 'patchInfoModalBackdrop';
      infoModal.className = 'patch-info-modal-backdrop';
      infoModal.innerHTML = `
        <div class="patch-info-card">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:10px;">
            <h4 style="margin:0; font-size:15px; color:#0f172a;">Edit Personal Information</h4>
            <button type="button" id="patchBtnCloseInfoModal" style="background:none; border:none; font-size:18px; cursor:pointer; color:#64748b;">✕</button>
          </div>

          <div style="text-align:center; margin:12px 0 6px 0;">
            <div id="patchAvatarModalPreview" style="width:62px; height:62px; border-radius:50%; background:#0284c7; color:#fff; font-size:20px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; margin-bottom:6px;">
              SS
            </div>
            <div>
              <label for="patchFileInputPhoto" style="font-size:12px; color:#0284c7; font-weight:700; cursor:pointer;">📷 Change Profile Photo</label>
              <input type="file" id="patchFileInputPhoto" accept="image/*" style="display:none;" />
            </div>
          </div>

          <label class="patch-field-label">Full Legal Name</label>
          <input type="text" id="patchModalName" class="patch-input-box" placeholder="Enter Full Name" />

          <label class="patch-field-label">Original Email ID <span style="color:#dc2626;">*</span></label>
          <input type="email" id="patchModalEmail" class="patch-input-box" placeholder="name@example.com" required />
          <div class="patch-email-notice">⚠️ Please enter your original email ID (Mandatory for OTP verification & payouts)</div>

          <label class="patch-field-label">Mobile Number (+91)</label>
          <input type="tel" id="patchModalPhone" class="patch-input-box" placeholder="10-digit mobile number" />

          <label class="patch-field-label">Default Postal Address</label>
          <textarea id="patchModalAddress" class="patch-input-box" placeholder="Full residential delivery address..." rows="2" style="font-family:inherit;"></textarea>

          <button type="button" id="patchBtnSaveProfileInfo" style="width:100%; background:#0284c7; color:#fff; font-weight:700; padding:12px; border:none; border-radius:8px; margin-top:14px; cursor:pointer;">
            Save Details ✓
          </button>
        </div>
      `;
      document.body.appendChild(infoModal);

      document.getElementById('patchBtnCloseInfoModal').onclick = () => infoModal.style.display = 'none';
      infoModal.onclick = (e) => { if (e.target === infoModal) infoModal.style.display = 'none'; };

      // Avatar photo upload preview
      document.getElementById('patchFileInputPhoto').onchange = function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (ev) {
            const preview = document.getElementById('patchAvatarModalPreview');
            preview.innerHTML = `<img src="${ev.target.result}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
            const mainAvatar = document.querySelector('#pane-account .avatar-box, #pane-account .profile-avatar-wrap');
            if (mainAvatar) {
              mainAvatar.innerHTML = `<img src="${ev.target.result}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
            }
          };
          reader.readAsDataURL(file);
        }
      };

      // Save profile with strict email check
      document.getElementById('patchBtnSaveProfileInfo').onclick = () => {
        const emailVal = document.getElementById('patchModalEmail').value.trim();
        const nameVal = document.getElementById('patchModalName').value.trim();

        if (!emailVal || !emailVal.includes('@') || !emailVal.includes('.')) {
          alert('Validation Error:\nPlease enter a valid, original email address. It is required for OTP and settlement.');
          return;
        }

        if (nameVal && typeof AppState !== 'undefined' && AppState.currentUser) {
          AppState.currentUser.name = nameVal;
          const nameDisp = document.getElementById('profileNameDisplay');
          if (nameDisp) nameDisp.textContent = nameVal;
        }

        alert('Profile updated successfully!\nYour verified email has been linked.');
        infoModal.style.display = 'none';
      };
    }

    // 4. Click Actions Setup
    document.getElementById('patchBtnOpenDrawer').onclick = () => {
      const wCount = JSON.parse(localStorage.getItem('ss_user_wishlist') || '[]').length;
      const countEl = document.getElementById('patchDrawerWishlistCount');
      if (countEl) countEl.textContent = `${wCount} items`;
      document.getElementById('patchDrawerOverlay').style.display = 'block';
    };

    document.getElementById('patchBtnDirectShare').onclick = () => {
      const url = window.location.origin + window.location.pathname;
      if (navigator.share) {
        navigator.share({ title: 'SuperShopping', text: 'Shop verified deals and earn rewards on SuperShopping!', url }).catch(() => {});
      } else {
        navigator.clipboard.writeText(url);
        alert('Website link copied to clipboard!');
      }
    };

    document.getElementById('patchDrawerEditProfile').onclick = () => {
      document.getElementById('patchDrawerOverlay').style.display = 'none';
      document.getElementById('patchInfoModalBackdrop').style.display = 'flex';
    };

    document.getElementById('patchDrawerWishlist').onclick = () => {
      document.getElementById('patchDrawerOverlay').style.display = 'none';
      const count = JSON.parse(localStorage.getItem('ss_user_wishlist') || '[]').length;
      alert(`My Wishlist: You have ${count} saved item(s).`);
    };

    document.getElementById('patchDrawerPolicies').onclick = () => {
      document.getElementById('patchDrawerOverlay').style.display = 'none';
      if (typeof openPolicyModal === 'function') openPolicyModal();
    };

    // 5. Transform Big FAQ into Single Clean Strip Button
    const faqContainer = accPane.querySelector('.faq-accordion-group, .faq-section, #accountFaqSection');
    if (faqContainer && !document.getElementById('patchFaqToggleStrip')) {
      const stripBtn = document.createElement('button');
      stripBtn.type = 'button';
      stripBtn.id = 'patchFaqToggleStrip';
      stripBtn.className = 'patch-compact-faq-strip';
      stripBtn.innerHTML = `<span>💬 Frequently Asked Questions</span><span>▼</span>`;

      faqContainer.style.display = 'none';
      faqContainer.parentNode.insertBefore(stripBtn, faqContainer);

      stripBtn.onclick = () => {
        const isHidden = faqContainer.style.display === 'none';
        faqContainer.style.display = isHidden ? 'block' : 'none';
        stripBtn.querySelector('span:last-child').textContent = isHidden ? '▲' : '▼';
      };
    }

    // 6. Ensure Profile Display shows only Name and User ID
    const nameDisplay = document.getElementById('profileNameDisplay');
    if (nameDisplay && nameDisplay.nextElementSibling) {
      nameDisplay.nextElementSibling.textContent = 'ID: SS-GUEST-0000';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccountStructure);
  } else {
    initAccountStructure();
  }

  setInterval(initAccountStructure, 1500);
})();

  function updateWishlistBadge() {
    const b = document.getElementById('patchDrawerWishlistBadge');
    if (b) b.textContent = `${getWishlist().length} items`;
  }

  // --- 4. E-BOOK CATEGORY FILTER ENGINE ---
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

        if (typeof renderEbooksGrid === 'function') {
          renderEbooksGrid(filtered);
        }
      });
    });
  }

  // --- 5. EARN TAB GUEST RESTRICTION ---
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

  // --- RUNNER ---
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
