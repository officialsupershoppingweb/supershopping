/* ==========================================================================
   SUPER SHOPPING - BULLETPROOF FAIL-SAFE CORE ENGINE
   ========================================================================== */

const AppState = {
  currentTab: 'home',
  currentUser: {
    isLoggedIn: false,
    name: 'Guest User',
    id: 'SS-GUEST-0000',
    coinsBalance: 0,
    pendingCash: 0
  }
};

let currentActiveProduct = null;

// --- 1. VERIFIED PRODUCTS DATA ---
const LiveCatalogDeals = [
  {
    id: 'DEAL-101',
    title: 'Men Casual Solid Slim Fit Cotton Shirt',
    store: 'flipkart',
    price: 449,
    mrp: 1499,
    discount: '70% OFF',
    category: 'fashion',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
    affiliateUrl: 'https://earnkaro.com/',
    rating: '4.1',
    reviews: '240 reviews',
    variantLabel: 'Select Size',
    variants: ['38', '40', '42', '44'],
    colors: ['#1e3a8a', '#0f172a', '#e2e8f0'],
    description: '100% Breathable cotton casual shirt. Tailored slim fit with official merchant return policy.'
  },
  {
    id: 'DEAL-102',
    title: 'Wireless Bluetooth Headphone with Deep Bass',
    store: 'amazon',
    price: 999,
    mrp: 2999,
    discount: '66% OFF',
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    affiliateUrl: 'https://amazon.in/',
    rating: '4.4',
    reviews: '512 reviews',
    variantLabel: null,
    variants: [],
    colors: ['#111827', '#dc2626'],
    description: 'High performance 40mm drivers with 20-hour battery backup and fast-charging capability.'
  },
  {
    id: 'DEAL-103',
    title: 'Stainless Steel Insulated Water Bottle (1 Litre)',
    store: 'amazon',
    price: 499,
    mrp: 999,
    discount: '50% OFF',
    category: 'home',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80',
    affiliateUrl: 'https://amazon.in/',
    rating: '4.3',
    reviews: '190 reviews',
    variantLabel: 'Select Capacity',
    variants: ['500ml', '750ml', '1000ml'],
    colors: ['#047857', '#0f172a', '#94a3b8'],
    description: 'Double-wall vacuum insulated flask. Keeps beverages hot or cold for up to 24 hours.'
  },
  {
    id: 'DEAL-104',
    title: 'Smart Fitness Tracker Band with Heart Rate Monitor',
    store: 'flipkart',
    price: 1299,
    mrp: 3499,
    discount: '62% OFF',
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=400&q=80',
    affiliateUrl: 'https://earnkaro.com/',
    rating: '4.0',
    reviews: '310 reviews',
    variantLabel: null,
    variants: [],
    colors: ['#0f172a', '#2563eb'],
    description: 'OLED color display with 14-day standby, heart rate tracking and sleep analysis.'
  }
];

const DigitalBooksCatalog = [
  {
    id: 'EBK-01',
    title: 'Class 12 Accounts & Partnership Master Notes',
    author: 'Commerce Academic Faculty',
    category: 'commerce',
    coinCost: 25
  },
  {
    id: 'EBK-02',
    title: 'Affiliate Marketing Growth & Strategy Blueprint',
    author: 'Performance Marketing Desk',
    category: 'business',
    coinCost: 30
  }
];

// --- 2. SAFE INITIALIZATION ---
function initApp() {
  try { renderDealsGrid(LiveCatalogDeals); } catch(e) {}
  try { renderEbooksGrid(DigitalBooksCatalog); } catch(e) {}
  try { setupTabNavigation(); } catch(e) {}
  try { setupCategoryFilters(); } catch(e) {}
  try { setupGlobalSearch(); } catch(e) {}
  try { syncUserStateUI(); } catch(e) {}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// --- 3. BOTTOM TAB NAVIGATION ---
function setupTabNavigation() {
  const tabButtons = document.querySelectorAll('.bottom-tab-btn, .bottom-nav-item');
  tabButtons.forEach(btn => {
    btn.onclick = function() {
      const tab = this.getAttribute('data-tab') || this.getAttribute('data-pane');
      if (tab) switchTab(tab);
    };
  });
}

function switchTab(tabKey) {
  AppState.currentTab = tabKey;

  // Detail view band karo agar khula ho
  const pdpView = document.getElementById('productDetailView');
  if (pdpView) pdpView.style.display = 'none';

  // Sabhi panes ko chupao
  document.querySelectorAll('.tab-pane, .app-content-pane').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  // Selected pane ko dikhao
  const target = document.getElementById(`pane-${tabKey}`);
  if (target) {
    target.classList.add('active');
    target.style.display = 'block';
  }

  // Bottom buttons active switch
  document.querySelectorAll('.bottom-tab-btn, .bottom-nav-item').forEach(b => {
    const bTab = b.getAttribute('data-tab') || b.getAttribute('data-pane');
    if (bTab === tabKey) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  // Header Search Bar vs Title
  const searchBar = document.getElementById('navSearchBar');
  const titleBar = document.getElementById('navTitleBar');
  const sectionTitle = document.getElementById('navSectionTitle') || document.getElementById('navDynamicTitle');

  if (tabKey === 'home' || tabKey === 'ebooks') {
    if (searchBar) searchBar.style.display = 'flex';
    if (titleBar) titleBar.style.display = 'none';
  } else {
    if (searchBar) searchBar.style.display = 'none';
    if (titleBar) titleBar.style.display = 'block';

    if (sectionTitle) {
      if (tabKey === 'earn') sectionTitle.textContent = '🎁 Claim Purchase Reward';
      if (tabKey === 'wallet') sectionTitle.textContent = '💳 Rewards & Payout Wallet';
      if (tabKey === 'account') sectionTitle.textContent = '👤 Account & Settings';
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 4. RENDER DEALS (CARDS CLICKABLE TO PDP) ---
function renderDealsGrid(deals) {
  const container = document.getElementById('productsFluidGrid');
  if (!container) return;

  if (!deals || deals.length === 0) {
    container.innerHTML = `<div style="grid-column: 1 / -1; padding: 25px; text-align: center; color: #64748b;">No matching deals found</div>`;
    return;
  }

  container.innerHTML = deals.map(item => {
    const isAmazon = item.store.toLowerCase() === 'amazon';
    return `
      <div class="product-card" onclick="openProductDetail('${item.id}')" style="cursor:pointer;">
        <div class="product-thumb-box">
          <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" />
          <span class="store-tag-badge ${isAmazon ? 'badge-amazon' : 'badge-flipkart'}">
            ${isAmazon ? 'Amazon Deal' : 'Flipkart Deal'}
          </span>
        </div>
        <div class="product-info-wrap">
          <h4 class="product-title-text" title="${item.title}">${item.title}</h4>
          <div class="price-details-row">
            <span class="sale-price">₹${item.price}</span>
            <span class="regular-price">₹${item.mrp}</span>
            <span class="discount-percent">${item.discount}</span>
          </div>
          <button type="button" class="btn-merchant-action ${isAmazon ? 'btn-amazon-style' : 'btn-flipkart-style'}">
            View Details & Reward
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// --- 5. PRODUCT DETAIL SCREEN ENGINE (PDP) ---
function openProductDetail(productId) {
  const product = LiveCatalogDeals.find(d => d.id === productId);
  if (!product) return;

  currentActiveProduct = product;

  // Home pane hide, PDP show
  const homePane = document.getElementById('pane-home');
  if (homePane) {
    homePane.classList.remove('active');
    homePane.style.display = 'none';
  }

  const pdpView = document.getElementById('productDetailView');
  if (pdpView) pdpView.style.display = 'block';

  // Fill Details
  const imgEl = document.getElementById('pdpMainImg');
  if (imgEl) imgEl.src = product.imageUrl;

  const titleEl = document.getElementById('pdpTitle');
  if (titleEl) titleEl.textContent = product.title;

  const ratingEl = document.getElementById('pdpRatingVal');
  if (ratingEl) ratingEl.textContent = product.rating || '4.2';

  const reviewsEl = document.getElementById('pdpReviewsCount');
  if (reviewsEl) reviewsEl.textContent = product.reviews || '150+ reviews';

  const descEl = document.getElementById('pdpDescription');
  if (descEl) descEl.textContent = product.description;

  const priceEl = document.getElementById('pdpBottomPrice');
  if (priceEl) priceEl.textContent = `₹${product.price}`;

  const mrpEl = document.getElementById('pdpBottomMrp');
  if (mrpEl) mrpEl.textContent = `₹${product.mrp}`;

  const buyBtn = document.getElementById('pdpBuyButton');
  if (buyBtn) {
    buyBtn.href = product.affiliateUrl;
    buyBtn.textContent = `Buy at ₹${product.price} ⚡`;
  }

  // Variant Logic (Size/Capacity)
  const sizeSection = document.getElementById('pdpSizeSection');
  const sizeChips = document.getElementById('pdpSizeChips');
  if (sizeSection && sizeChips) {
    if (product.variants && product.variants.length > 0) {
      sizeSection.style.display = 'block';
      const label = sizeSection.querySelector('.pdp-section-header strong');
      if (label) label.textContent = product.variantLabel || 'Select Variant';

      sizeChips.innerHTML = product.variants.map((v, i) => `
        <button type="button" class="size-chip ${i === 0 ? 'active' : ''}" onclick="selectVariantChip(this)">${v}</button>
      `).join('');
    } else {
      sizeSection.style.display = 'none';
    }
  }

  // Color Logic
  const colorSection = document.getElementById('pdpColorSection');
  const colorChips = document.getElementById('pdpColorChips');
  if (colorSection && colorChips) {
    if (product.colors && product.colors.length > 0) {
      colorSection.style.display = 'block';
      colorChips.innerHTML = product.colors.map((c, i) => `
        <span class="color-dot ${i === 0 ? 'active' : ''}" style="background:${c};" onclick="selectColorDot(this)"></span>
      `).join('');
    } else {
      colorSection.style.display = 'none';
    }
  }

  // Related Deals Recommendations Shelf
  const relatedGrid = document.getElementById('pdpRelatedGrid');
  if (relatedGrid) {
    const related = LiveCatalogDeals.filter(d => d.id !== product.id).slice(0, 3);
    relatedGrid.innerHTML = related.map(r => `
      <div class="related-mini-card" onclick="openProductDetail('${r.id}')">
        <img src="${r.imageUrl}" alt="${r.title}" />
        <span class="related-mini-title">${r.title}</span>
        <span class="related-mini-price">₹${r.price}</span>
      </div>
    `).join('');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeProductDetail() {
  const pdpView = document.getElementById('productDetailView');
  if (pdpView) pdpView.style.display = 'none';

  const homePane = document.getElementById('pane-home');
  if (homePane) {
    homePane.classList.add('active');
    homePane.style.display = 'block';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectVariantChip(btn) {
  document.querySelectorAll('#pdpSizeChips .size-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectColorDot(dot) {
  document.querySelectorAll('#pdpColorChips .color-dot').forEach(d => d.classList.remove('active'));
  dot.classList.add('active');
}

// --- 6. RENDER E-BOOKS ---
function renderEbooksGrid(books) {
  const container = document.getElementById('ebooksCatalogGrid');
  if (!container) return;

  container.innerHTML = books.map(book => `
    <div class="product-card">
      <div class="product-thumb-box" style="background:#1e293b; color:#fff; text-align:center; padding:16px;">
        <span style="font-size:12px; font-weight:700;">${book.title}</span>
      </div>
      <div class="product-info-wrap">
        <h4 class="product-title-text">${book.title}</h4>
        <span style="font-size:11.5px; color:#64748b; margin-bottom:8px;">${book.author}</span>
        <div class="price-details-row">
          <span class="sale-price" style="color:#059669; font-size:14px;">🪙 ${book.coinCost} Green Coins</span>
        </div>
        <button type="button" class="btn-action-primary" style="background:#059669; font-size:12.5px; padding:8px;" onclick="alert('E-book store module active')">
          ⚡ Unlock with Coins
        </button>
      </div>
    </div>
  `).join('');
}

// --- 7. SEARCH & CATEGORIES ---
function setupGlobalSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (AppState.currentTab === 'home') {
      const filtered = LiveCatalogDeals.filter(d => d.title.toLowerCase().includes(q));
      renderDealsGrid(filtered);
    }
  });
}

function setupCategoryFilters() {
  document.querySelectorAll('#homeCategoriesBar .cat-pill').forEach(btn => {
    btn.onclick = function() {
      document.querySelectorAll('#homeCategoriesBar .cat-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const cat = this.getAttribute('data-category');
      if (!cat || cat === 'all') {
        renderDealsGrid(LiveCatalogDeals);
      } else {
        renderDealsGrid(LiveCatalogDeals.filter(d => d.category === cat));
      }
    };
  });
}

function syncUserStateUI() {
  const pillText = document.getElementById('userPillText');
  if (pillText) pillText.textContent = 'Sign In / Guest';
  const nameDisp = document.getElementById('profileNameDisplay');
  if (nameDisp) nameDisp.textContent = 'Guest User';
}

function shareCurrentProduct() {
  alert('Link ready to share!');
}
