/* ==========================================================================
   SUPER SHOPPING - PRODUCTION CORE ENGINE (CLEAN & ERROR-FREE)
   ========================================================================== */

const AppState = {
  currentTab: 'home',
  currentUser: {
    isLoggedIn: false,
    name: 'Guest User',
    id: 'SS-GUEST-0000',
    referralCode: 'SS-REF-2026',
    referralsCount: 0,
    coinsBalance: 0,
    pendingCash: 0
  },
  activeCameraTarget: null,
  capturedProofs: { invoice: null, product: null, delivery: null },
  selectedRewardPlan: 'cashback',
  mediaStream: null
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

const UserOrdersPipeline = [];

// --- 2. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  renderDealsGrid(LiveCatalogDeals);
  renderEbooksGrid(DigitalBooksCatalog);
  renderPipelineList();
  renderReferralSlots();
  setupGlobalSearch();
  setupCategoryFilters();
  syncUserStateUI();
  setupNavigationSafe();
  setupEventListenersSafe();
});

// Navigation bind
function setupNavigationSafe() {
  document.querySelectorAll('.bottom-tab-btn').forEach(btn => {
    btn.onclick = () => {
      const tab = btn.dataset.tab;
      if (tab) switchTab(tab);
    };
  });
}

// --- 3. TAB SWITCHER (CSS CLASS COMPLIANT) ---
function switchTab(tabKey) {
  AppState.currentTab = tabKey;

  const pdpView = document.getElementById('productDetailView');
  if (pdpView) pdpView.style.display = 'none';

  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  const activePane = document.getElementById(`pane-${tabKey}`);
  if (activePane) activePane.classList.add('active');

  document.querySelectorAll('.bottom-tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabKey);
  });

  const searchBar = document.getElementById('navSearchBar');
  const titleBar = document.getElementById('navTitleBar');
  const sectionTitle = document.getElementById('navSectionTitle');
  const searchInput = document.getElementById('globalSearchInput');

  if (tabKey === 'home') {
    if (searchBar) searchBar.style.display = 'flex';
    if (titleBar) titleBar.style.display = 'none';
    if (searchInput) searchInput.placeholder = 'Search products, deals, categories...';
  } else if (tabKey === 'ebooks') {
    if (searchBar) searchBar.style.display = 'flex';
    if (titleBar) titleBar.style.display = 'none';
    if (searchInput) searchInput.placeholder = 'Search study notes, digital guides...';
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

// --- 4. RENDER DEALS (WITH DETAIL PAGE CLICK) ---
function renderDealsGrid(deals) {
  const container = document.getElementById('productsFluidGrid');
  if (!container) return;

  if (deals.length === 0) {
    container.innerHTML = `
      <div class="empty-panel" style="grid-column: 1 / -1;">
        <span class="empty-glyph">🔍</span>
        <h4>No matching deals found</h4>
      </div>
    `;
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

// --- 5. PRODUCT DETAIL SCREEN ENGINE ---
function openProductDetail(productId) {
  const product = LiveCatalogDeals.find(d => d.id === productId);
  if (!product) return;

  currentActiveProduct = product;

  // Home pane se active class hatao, PDP dikhao
  const homePane = document.getElementById('pane-home');
  if (homePane) homePane.classList.remove('active');

  const pdpView = document.getElementById('productDetailView');
  if (pdpView) pdpView.style.display = 'block';

  // Fill Details
  const imgEl = document.getElementById('pdpMainImg');
  if (imgEl) imgEl.src = product.imageUrl;

  const titleEl = document.getElementById('pdpTitle');
  if (titleEl) titleEl.textContent = product.title;

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

  // Variant Logic
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

  // Related items
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
  if (homePane) homePane.classList.add('active');

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

// --- 6. RENDER EBOOKS & OTHERS ---
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
        <button type="button" class="btn-action-primary" style="background:#059669; font-size:12.5px; padding:8px;" onclick="unlockEbook('${book.id}', ${book.coinCost})">
          ⚡ Unlock with Coins
        </button>
      </div>
    </div>
  `).join('');
}

function renderPipelineList() {
  const container = document.getElementById('pipelineOrdersList');
  if (!container) return;
  container.innerHTML = `
    <div class="empty-panel">
      <span class="empty-glyph">📦</span>
      <h4>No Active Orders in Pipeline</h4>
      <p>Purchases submitted via Earn will appear here.</p>
    </div>
  `;
}

function renderReferralSlots() {
  const container = document.getElementById('slotsVisualGrid');
  if (!container) return;
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `
      <div class="slot-item">
        <div class="slot-circle-badge">${i}</div>
        <span class="slot-caption">Slot ${i}</span>
      </div>
    `;
  }
  container.innerHTML = html;
}

function syncUserStateUI() {
  const pillText = document.getElementById('userPillText');
  if (pillText) pillText.textContent = 'Sign In / Guest';
  const nameDisp = document.getElementById('profileNameDisplay');
  if (nameDisp) nameDisp.textContent = 'Guest User';
}

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
    btn.onclick = () => {
      document.querySelectorAll('#homeCategoriesBar .cat-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      if (cat === 'all') {
        renderDealsGrid(LiveCatalogDeals);
      } else {
        renderDealsGrid(LiveCatalogDeals.filter(d => d.category === cat));
      }
    };
  });
}

function selectRewardPlan(type) {
  const cash = document.getElementById('optCashback');
  const coins = document.getElementById('optCoins');
  const upi = document.getElementById('upiFieldBox');
  if (type === 'cashback') {
    if (cash) cash.classList.add('selected');
    if (coins) coins.classList.remove('selected');
    if (upi) upi.style.display = 'block';
  } else {
    if (coins) coins.classList.add('selected');
    if (cash) cash.classList.remove('selected');
    if (upi) upi.style.display = 'none';
  }
}

function handleAuthButtonClick() {
  const m = document.getElementById('authGatewayModal');
  if (m) m.style.display = 'flex';
}

function closeAuthModal() {
  const m = document.getElementById('authGatewayModal');
  if (m) m.style.display = 'none';
}

function setupEventListenersSafe() {
  const rForm = document.getElementById('rewardClaimForm');
  if (rForm) {
    rForm.onsubmit = (e) => {
      e.preventDefault();
      alert('Verification Desk will process this request.');
    };
  }
}

function shareCurrentProduct() {
  alert('Link ready to share!');
}
