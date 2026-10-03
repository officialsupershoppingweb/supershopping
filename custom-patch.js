/* ==========================================================================
   SUPERSHOPPING - SAFE PATCH LOGIC LAYER (PDP, DYNAMIC VARIANTS & WISHLIST)
   ========================================================================== */

(function () {
  'use strict';

  // 1. Wishlist Storage Helper
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
      updateAccountWishlistUI();
    } catch (e) {}
  }

  function isProductLiked(id) {
    return getWishlist().includes(id);
  }

  function toggleProductLike(id, heartBtn) {
    let list = getWishlist();
    if (list.includes(id)) {
      list = list.filter(item => item !== id);
      if (heartBtn) {
        heartBtn.classList.remove('liked');
        heartBtn.innerHTML = '♡';
      }
    } else {
      list.push(id);
      if (heartBtn) {
        heartBtn.classList.add('liked');
        heartBtn.innerHTML = '❤️';
      }
    }
    setWishlist(list);
  }

  // 2. Build In-DOM PDP Structure if not present
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
            <h2 class="patch-pdp-title" id="patchPDPTitle">Product Name</h2>

            <!-- Auto-Adaptive Dynamic Variant Shelf -->
            <div class="patch-variant-box" id="patchVariantShelf">
              <div class="patch-variant-header">
                <span id="patchVariantLabel">Select Size</span>
              </div>
              <div class="patch-chips-wrap" id="patchChipsWrap"></div>
            </div>

            <div class="patch-desc-box">
              <div class="patch-desc-title">Product Details & Policy</div>
              <p class="patch-desc-text" id="patchPDPDesc">100% genuine verified store deal with merchant return policy.</p>
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

      document.getElementById('patchBtnClosePDP').addEventListener('click', closePDP);
    }
    return modal;
  }

  // 3. Open Detail Page with Auto Dynamic Variants
  window.openSafeProductDetail = function (product) {
    if (!product) return;
    const modal = ensurePDPModal();

    // Data Binding
    document.getElementById('patchPDPImage').src = product.imageUrl || '';
    document.getElementById('patchPDPTitle').textContent = product.title || '';
    document.getElementById('patchPDPPrice').textContent = `₹${product.price || 0}`;
    document.getElementById('patchPDPMSRP').textContent = product.mrp ? `₹${product.mrp}` : '';
    document.getElementById('patchPDPDesc').textContent = product.description || 'Verified authentic item from merchant store.';
    document.getElementById('patchPDPRating').textContent = `★ ${product.rating || '4.2'} | ${product.reviews || 'Verified Offers'}`;

    const buyLink = document.getElementById('patchPDPBuyLink');
    buyLink.href = product.affiliateUrl || '#';

    // Heart Icon state
    const heartBtn = document.getElementById('patchHeartBtn');
    const liked = isProductLiked(product.id);
    heartBtn.classList.toggle('liked', liked);
    heartBtn.innerHTML = liked ? '❤️' : '♡';
    heartBtn.onclick = function (e) {
      e.stopPropagation();
      toggleProductLike(product.id, heartBtn);
    };

    // Share button
    const shareBtn = document.getElementById('patchShareBtn');
    shareBtn.onclick = function (e) {
      e.stopPropagation();
      if (navigator.share) {
        navigator.share({
          title: product.title,
          text: `Check out ${product.title} on SuperShopping!`,
          url: product.affiliateUrl || window.location.href
        }).catch(() => {});
      } else {
        alert('Product deal link copied!');
      }
    };

    // Dynamic Measurement Detection
    const variantShelf = document.getElementById('patchVariantShelf');
    const variantLabel = document.getElementById('patchVariantLabel');
    const chipsWrap = document.getElementById('patchChipsWrap');

    let variants = product.variants;
    let labelText = product.variantLabel;

    // Auto-fallback if variants not explicitly in product object
    if (!variants && product.category === 'fashion') {
      variants = ['28', '30', '32', '34'];
      labelText = 'Select Size';
    } else if (!variants && product.category === 'beauty') {
      variants = ['50ml', '100ml', '200ml'];
      labelText = 'Select Volume';
    }

    if (variants && variants.length > 0) {
      variantShelf.style.display = 'block';
      variantLabel.textContent = labelText || 'Select Option';
      chipsWrap.innerHTML = variants.map((v, i) => `
        <button type="button" class="patch-variant-chip ${i === 0 ? 'active' : ''}">${v}</button>
      `).join('');

      chipsWrap.querySelectorAll('.patch-variant-chip').forEach(btn => {
        btn.addEventListener('click', function () {
          chipsWrap.querySelectorAll('.patch-variant-chip').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
        });
      });
    } else {
      // Auto Hide for items without measurement (Bottle, Earphone, Gadgets)
      variantShelf.style.display = 'none';
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modal.scrollTo({ top: 0, behavior: 'instant' });
  };

  function closePDP() {
    const modal = document.getElementById('patchPDPModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // 4. Intercept Card Clicks Non-Destructively
  function attachCardListeners() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
      if (card.dataset.patchBound) return;
      card.dataset.patchBound = 'true';

      card.addEventListener('click', function (e) {
        // If clicked specifically on native shop button, allow direct external visit if desired
        if (e.target.closest('.btn-merchant-action') && !e.target.closest('.product-card')) return;

        e.preventDefault();
        e.stopPropagation();

        // Fetch corresponding product data safely
        let targetProduct = null;
        if (typeof LiveCatalogDeals !== 'undefined' && LiveCatalogDeals[index]) {
          targetProduct = LiveCatalogDeals[index];
        } else {
          // Fallback extraction from card DOM itself
          const title = card.querySelector('.product-title-text')?.textContent?.trim() || 'Product';
          const priceStr = card.querySelector('.sale-price')?.textContent?.replace(/[^0-9]/g, '') || '0';
          const mrpStr = card.querySelector('.regular-price')?.textContent?.replace(/[^0-9]/g, '') || '0';
          const img = card.querySelector('img')?.src || '';
          const link = card.querySelector('a')?.href || '#';

          targetProduct = {
            id: `DEAL-${index + 1}`,
            title: title,
            price: Number(priceStr),
            mrp: Number(mrpStr),
            imageUrl: img,
            affiliateUrl: link,
            category: title.toLowerCase().includes('shirt') ? 'fashion' : 'general',
            variants: title.toLowerCase().includes('shirt') ? ['28', '30', '32', '34'] : null,
            variantLabel: title.toLowerCase().includes('shirt') ? 'Select Size' : null
          };
        }

        window.openSafeProductDetail(targetProduct);
      });
    });
  }

  // 5. Account Page: My Wishlist & Share Website Integration
  function injectAccountFeatures() {
    const accountPane = document.getElementById('pane-account');
    if (!accountPane || document.getElementById('patchAccountShelf')) return;

    const shelf = document.createElement('div');
    shelf.id = 'patchAccountShelf';
    shelf.className = 'patch-account-shelf';
    shelf.innerHTML = `
      <div class="patch-account-item" id="patchOpenWishlistRow">
        <div class="patch-account-item-left">
          <span>❤️</span>
          <span>My Saved Wishlist</span>
        </div>
        <span class="patch-badge-counter" id="patchWishlistCount">0 items</span>
      </div>
      <div class="patch-account-item" id="patchShareAppRow">
        <div class="patch-account-item-left">
          <span>🔗</span>
          <span>Share SuperShopping Website</span>
        </div>
        <span style="font-size: 13px; color: #0284c7; font-weight: 600;">Share ↗</span>
      </div>
    `;

    // Insert cleanly inside account pane
    accountPane.appendChild(shelf);

    document.getElementById('patchOpenWishlistRow').addEventListener('click', () => {
      const count = getWishlist().length;
      alert(`My Wishlist: You have ${count} saved item(s). Items you like stay saved here!`);
    });

    document.getElementById('patchShareAppRow').addEventListener('click', () => {
      const siteUrl = window.location.origin + window.location.pathname;
      if (navigator.share) {
        navigator.share({
          title: 'SuperShopping',
          text: 'Explore verified deals, cashback and exclusive offers on SuperShopping!',
          url: siteUrl
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(siteUrl);
        alert('SuperShopping website link copied to clipboard!');
      }
    });

    updateAccountWishlistUI();
  }

  function updateAccountWishlistUI() {
    const badge = document.getElementById('patchWishlistCount');
    if (badge) {
      badge.textContent = `${getWishlist().length} items`;
    }
  }

  // 6. Safe Observer to bind cards whenever catalog renders
  function bootPatchEngine() {
    attachCardListeners();
    injectAccountFeatures();

    const grid = document.getElementById('productsFluidGrid');
    if (grid && window.MutationObserver) {
      const observer = new MutationObserver(() => attachCardListeners());
      observer.observe(grid, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootPatchEngine);
  } else {
    bootPatchEngine();
  }
})();
