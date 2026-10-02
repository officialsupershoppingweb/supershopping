/**
 * SUPERSHOPPING - PRODUCTION APPLICATION JAVASCRIPT
 * Fully integrated: Navigation, Dynamic PDP Engine, Search, Categories, Modals & Dynamic Variants
 */

// --- 1. APPLICATION STATE ---
const AppState = {
  activeTab: 'home',
  selectedCategory: 'all',
  searchQuery: '',
  walletCoins: 120,
  userProfile: {
    name: 'Valued Shopper',
    authType: 'Guest User'
  }
};

let currentActiveProduct = null;

// --- 2. VERIFIED DEALS DATA STORE (WITH DYNAMIC MEASUREMENT & VARIANTS) ---
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
    title: 'Stainless Steel Insulated Water Bottle',
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

// --- 3. DIGITAL E-BOOKS DATA STORE ---
const DigitalBooksCatalog = [
  {
    id: 'EBK-01',
    title: 'Affiliate Marketing Mastery 2026',
    price: 199,
    category: 'Finance & Career',
    pages: '120 Pages',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    description: 'Complete blueprint on earning verified commissions and online revenue streams.'
  },
  {
    id: 'EBK-02',
    title: 'Digital Productivity & Smart Habits',
    price: 149,
    category: 'Self Growth',
    pages: '95 Pages',
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=400&q=80',
    description: 'Optimize daily workflows, study schedules and focus management systems.'
  }
];

// --- 4. CORE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  setupNavigationTabs();
  setupCategoryPills();
  setupSearchInput();
  renderDealsGrid(LiveCatalogDeals);
  renderEbooksGrid();
});

// --- 5. NAVIGATION LOGIC (TABS & BOTTOM BAR) ---
function setupNavigationTabs() {
  const navButtons = document.querySelectorAll('.bottom-nav-item');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPane = btn.getAttribute('data-pane');
      switchTab(targetPane);
    });
  });
}

function switchTab(paneId) {
  AppState.activeTab = paneId;

  // Make sure PDP is closed when navigating tabs
  const pdpView = document.getElementById('productDetailView');
  if (pdpView) pdpView.style.display = 'none';

  // Toggle active bottom nav button
  document.querySelectorAll('.bottom-nav-item').forEach(b => {
    if (b.getAttribute('data-pane') === paneId) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  // Toggle pane visibility
  document.querySelectorAll('.app-content-pane').forEach(pane => {
    pane.style.display = 'none';
  });

  const selectedPane = document.getElementById(`pane-${paneId}`);
  if (selectedPane) {
    selectedPane.style.display = 'block';
  }

  // Update Top Bar Context Title
  const titles = {
    home: 'SuperShopping',
    earn: 'Claim Purchase Reward',
    ebooks: 'Digital Library & Guides',
    wallet: 'Rewards & Payout Wallet',
    account: 'My Account Settings'
  };
  const titleEl = document.getElementById('navDynamicTitle');
  if (titleEl) titleEl.textContent = titles[paneId] || 'SuperShopping';

  // Toggle Search Bar vs Dynamic Title Bar
  const searchBar = document.getElementById('navSearchBar');
  const titleBar = document.getElementById('navTitleBar');

  if (paneId === 'home') {
    if (searchBar) searchBar.style.display = 'flex';
    if (titleBar) titleBar.style.display = 'none';
  } else {
    if (searchBar) searchBar.style.display = 'none';
    if (titleBar) titleBar.style.display = 'block';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 6. CATEGORY FILTER LOGIC ---
function setupCategoryPills() {
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.selectedCategory = pill.getAttribute('data-category');
      applyFilters();
    });
  });
}

// --- 7. SEARCH BAR LOGIC ---
function setupSearchInput() {
  const searchInput = document.getElementById('globalSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
  });
}

function applyFilters() {
  const filtered = LiveCatalogDeals.filter(deal => {
    const matchesCat = (AppState.selectedCategory === 'all') || (deal.category === AppState.selectedCategory);
    const matchesQuery = deal.title.toLowerCase().includes(AppState.searchQuery) ||
                         deal.store.toLowerCase().includes(AppState.searchQuery);
    return matchesCat && matchesQuery;
  });

  renderDealsGrid(filtered);
}

// --- 8. RENDER DEALS (CLICKABLE CARD TO OPEN PDP) ---
function renderDealsGrid(deals) {
  const container = document.getElementById('productsFluidGrid');
  if (!container) return;

  if (deals.length === 0) {
    container.innerHTML = `
      <div class="empty-panel" style="grid-column: 1 / -1; padding: 30px; text-align: center;">
        <span class="empty-glyph" style="font-size: 32px;">🔍</span>
        <h4>No matching deals found</h4>
        <p style="font-size: 13px; color: #64748b; margin-top: 6px;">Try searching for a different keyword or browse categories.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = deals.map(item => {
    const isAmazon = item.store.toLowerCase() === 'amazon';
    const badgeClass = isAmazon ? 'badge-amazon' : 'badge-flipkart';
    const badgeText = isAmazon ? 'Amazon Deal' : 'Flipkart Deal';

    return `
      <div class="product-card" onclick="openProductDetail('${item.id}')" style="cursor: pointer;">
        <div class="product-thumb-box">
          <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" />
          <span class="store-tag-badge ${badgeClass}">${badgeText}</span>
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

// --- 9. RENDER EBOOKS ---
function renderEbooksGrid() {
  const container = document.getElementById('ebooksGridContainer');
  if (!container) return;

  container.innerHTML = DigitalBooksCatalog.map(book => `
    <div class="ebook-card">
      <img src="${book.coverUrl}" alt="${book.title}" />
      <div class="ebook-content">
        <span class="ebook-tag">${book.category}</span>
        <h4>${book.title}</h4>
        <p class="ebook-desc">${book.description}</p>
        <div class="ebook-bottom">
          <span class="ebook-price">₹${book.price}</span>
          <button class="btn-read-now" onclick="alert('Digital reader module starting...')">Buy & Read</button>
        </div>
      </div>
    </div>
  `).join('');
}

// --- 10. PRODUCT DETAIL VIEW (PDP) DYNAMIC ENGINE ---
function openProductDetail(productId) {
  const product = LiveCatalogDeals.find(d => d.id === productId);
  if (!product) return;

  currentActiveProduct = product;

  // Home pane hide and show PDP
  const homePane = document.getElementById('pane-home');
  if (homePane) homePane.style.display = 'none';

  const pdpView = document.getElementById('productDetailView');
  if (pdpView) pdpView.style.display = 'block';

  // Fill Product Info
  const mainImg = document.getElementById('pdpMainImg');
  if (mainImg) mainImg.src = product.imageUrl;

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

  // Buy Button Link Set
  const buyBtn = document.getElementById('pdpBuyButton');
  if (buyBtn) {
    buyBtn.href = product.affiliateUrl;
    buyBtn.textContent = `Buy at ₹${product.price} ⚡`;
  }

  // Auto Measurement / Variant Chips Setup
  const sizeSection = document.getElementById('pdpSizeSection');
  const sizeChips = document.getElementById('pdpSizeChips');

  if (sizeSection && sizeChips) {
    if (product.variants && product.variants.length > 0) {
      sizeSection.style.display = 'block';
      const labelTag = sizeSection.querySelector('.pdp-section-header strong');
      if (labelTag) labelTag.textContent = product.variantLabel || 'Select Variant';

      sizeChips.innerHTML = product.variants.map((v, idx) => `
        <button type="button" class="size-chip ${idx === 0 ? 'active' : ''}" onclick="selectVariantChip(this)">${v}</button>
      `).join('');
    } else {
      sizeSection.style.display = 'none';
    }
  }

  // Dynamic Color Dots Setup
  const colorSection = document.getElementById('pdpColorSection');
  const colorChips = document.getElementById('pdpColorChips');

  if (colorSection && colorChips) {
    if (product.colors && product.colors.length > 0) {
      colorSection.style.display = 'block';
      colorChips.innerHTML = product.colors.map((clr, idx) => `
        <span class="color-dot ${idx === 0 ? 'active' : ''}" style="background: ${clr};" onclick="selectColorDot(this)"></span>
      `).join('');
    } else {
      colorSection.style.display = 'none';
    }
  }

  // Related Deals Recommendations Shelf
  const relatedGrid = document.getElementById('pdpRelatedGrid');
  if (relatedGrid) {
    const relatedDeals = LiveCatalogDeals.filter(d => d.id !== product.id).slice(0, 3);
    relatedGrid.innerHTML = relatedDeals.map(rel => `
      <div class="related-mini-card" onclick="openProductDetail('${rel.id}')">
        <img src="${rel.imageUrl}" alt="${rel.title}" />
        <span class="related-mini-title">${rel.title}</span>
        <span class="related-mini-price">₹${rel.price}</span>
      </div>
    `).join('');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeProductDetail() {
  const pdpView = document.getElementById('productDetailView');
  if (pdpView) pdpView.style.display = 'none';

  const homePane = document.getElementById('pane-home');
  if (homePane) homePane.style.display = 'block';

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

function shareCurrentProduct() {
  if (navigator.share && currentActiveProduct) {
    navigator.share({
      title: currentActiveProduct.title,
      text: `Super Shopping deal: ${currentActiveProduct.title}`,
      url: window.location.href
    }).catch(() => {});
  } else {
    alert('Link ready to share!');
  }
}
