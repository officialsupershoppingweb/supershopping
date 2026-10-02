/* ==========================================================================
   SUPER SHOPPING - CORE PRODUCTION LOGIC ENGINE (V2 FLUID & RESPONSIVE)
   ========================================================================== */

// --- 1. CORE APPLICATION STATE (CLEAN ZERO-BASELINE) ---
const AppState = {
  currentTab: 'home',
  currentUser: {
    isLoggedIn: false,
    name: 'Guest User',
    id: 'SS-GUEST-0000',
    phone: '',
    address: '',
    referralCode: 'SS-REF-2026',
    referralsCount: 0, // Clean zero-state
    coinsBalance: 0,   // Real 0 Coins
    pendingCash: 0     // Real ₹0 Cash
  },
  activeCameraTarget: null, // 'invoice', 'product', 'delivery'
  capturedProofs: {
    invoice: null,
    product: null,
    delivery: null
  },
  selectedRewardPlan: 'cashback',
  mediaStream: null
};

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

// --- 3. DIGITAL ASSETS & E-BOOKS (EMPTY/CLEAN BASELINE) ---
const DigitalBooksCatalog = [
  {
    id: 'EBK-01',
    title: 'Class 12 Accounts & Partnership Master Notes',
    author: 'Commerce Academic Faculty',
    category: 'commerce',
    coinCost: 25,
    previewContent: 'Chapter 1: Valuation of Goodwill & Partnership Capital Adjustments.\nKey rules, practical journal entries, and step-by-step examination balance sheet structures.'
  },
  {
    id: 'EBK-02',
    title: 'Affiliate Marketing Growth & Strategy Blueprint',
    author: 'Performance Marketing Desk',
    category: 'business',
    coinCost: 30,
    previewContent: 'Module 1: Performance Marketing Systems.\nDiscovering high-converting deals, maintaining compliance, and scaling organic retail traffic.'
  }
];

// Active Orders Pipeline (Default Clean State: Empty)
const UserOrdersPipeline = [];

// --- 4. LIFECYCLE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  renderDealsGrid(LiveCatalogDeals);
  renderEbooksGrid(DigitalBooksCatalog);
  renderPipelineList();
  renderReferralSlots();
  setupGlobalSearch();
  setupCategoryFilters();
  syncUserStateUI();
});

// --- 5. TAB SWITCHER & HEADER SEARCH ENGINE ---
function switchTab(tabKey) {
  AppState.currentTab = tabKey;

  // Toggle Tab Panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  const activePane = document.getElementById(`pane-${tabKey}`);
  if (activePane) activePane.classList.add('active');

  // Toggle Bottom Bar Tabs
  document.querySelectorAll('.bottom-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabKey);
  });

  // Search Bar Visibility Logic
  const searchBar = document.getElementById('navSearchBar');
  const titleBar = document.getElementById('navTitleBar');
  const sectionTitle = document.getElementById('navSectionTitle');
  const searchInput = document.getElementById('globalSearchInput');

  if (tabKey === 'home') {
    searchBar.style.display = 'flex';
    titleBar.style.display = 'none';
    searchInput.placeholder = 'Search products, deals, categories...';
  } else if (tabKey === 'ebooks') {
    searchBar.style.display = 'flex';
    titleBar.style.display = 'none';
    searchInput.placeholder = 'Search study notes, digital guides...';
  } else {
    // Hide search bar on Earn, Wallet, Account
    searchBar.style.display = 'none';
    titleBar.style.display = 'block';

    if (tabKey === 'earn') sectionTitle.textContent = '🎁 Claim Purchase Reward';
    if (tabKey === 'wallet') sectionTitle.textContent = '💳 Rewards & Payout Wallet';
    if (tabKey === 'account') sectionTitle.textContent = '👤 Account & Settings';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 6. RENDER DEALS (CLICKABLE CARD TO OPEN PDP) ---
function renderDealsGrid(deals) {
  const container = document.getElementById('productsFluidGrid');
  if (!container) return;

  if (deals.length === 0) {
    container.innerHTML = `
      <div class="empty-panel" style="grid-column: 1 / -1;">
        <span class="empty-glyph">🔍</span>
        <h4>No matching deals found</h4>
        <p>Try searching for a different keyword or paste a product link below.</p>
        <button type="button" class="btn-action-primary mt-3" onclick="openSearchMissModal()">
          Request Product Reward Eligibility
        </button>
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

// --- 7. RENDER E-BOOKS GRID ---
function renderEbooksGrid(books) {
  const container = document.getElementById('ebooksCatalogGrid');
  if (!container) return;

  container.innerHTML = books.map(book => {
    return `
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
    `;
  }).join('');
}

// --- 8. WALLET PIPELINE (CLEAN ZERO-STATE) ---
function renderPipelineList() {
  const container = document.getElementById('pipelineOrdersList');
  if (!container) return;

  if (UserOrdersPipeline.length === 0) {
    container.innerHTML = `
      <div class="empty-panel">
        <span class="empty-glyph">📦</span>
        <h4>No Active Orders in Pipeline</h4>
        <p>Purchases submitted via the Earn tab will appear here with live 100-day clearance tracking.</p>
        <button type="button" class="btn-action-secondary mt-2" onclick="switchTab('home')">Browse Verified Deals</button>
      </div>
    `;
    return;
  }
}

// --- 9. ACCOUNT 5 REFERRAL SLOTS ---
function renderReferralSlots() {
  const container = document.getElementById('slotsVisualGrid');
  if (!container) return;

  const totalSlots = 5;
  const claimedCount = AppState.currentUser.referralsCount;
  let html = '';

  for (let i = 1; i <= totalSlots; i++) {
    const isClaimed = i <= claimedCount;
    html += `
      <div class="slot-item ${isClaimed ? 'claimed' : ''}">
        <div class="slot-circle-badge">${isClaimed ? '✓' : i}</div>
        <span class="slot-caption">${isClaimed ? 'Claimed' : 'Slot ' + i}</span>
      </div>
    `;
  }
  container.innerHTML = html;
}

// --- 10. REWARD METHOD SELECTION ---
function selectRewardPlan(planType) {
  AppState.selectedRewardPlan = planType;
  const cardCash = document.getElementById('optCashback');
  const cardCoins = document.getElementById('optCoins');
  const upiBox = document.getElementById('upiFieldBox');

  if (planType === 'cashback') {
    cardCash.classList.add('selected');
    cardCoins.classList.remove('selected');
    upiBox.style.display = 'block';
  } else {
    cardCoins.classList.add('selected');
    cardCash.classList.remove('selected');
    upiBox.style.display = 'none';
  }
}

// --- 11. IN-APP LIVE CAMERA DESK ---
async function openLiveCamera(targetType) {
  AppState.activeCameraTarget = targetType;
  const modal = document.getElementById('inAppCameraModal');
  const video = document.getElementById('cameraVideoFeed');
  const label = document.getElementById('cameraTargetLabel');

  if (targetType === 'invoice') label.textContent = 'Live Tax Invoice / Bill Capture';
  if (targetType === 'product') label.textContent = 'Live Physical Unboxed Item Capture';
  if (targetType === 'delivery') label.textContent = 'Delivery Status Screenshot Capture';

  modal.style.display = 'flex';

  try {
    AppState.mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    });
    video.srcObject = AppState.mediaStream;
  } catch (err) {
    alert('Camera permission denied or camera device unavailable. Please verify browser permissions.');
    closeLiveCamera();
  }
}

function captureLiveSnapshot() {
  const video = document.getElementById('cameraVideoFeed');
  const canvas = document.getElementById('cameraCaptureCanvas');
  const context = canvas.getContext('2d');

  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const snapshotBase64 = canvas.toDataURL('image/jpeg', 0.85);
  const target = AppState.activeCameraTarget;

  AppState.capturedProofs[target] = snapshotBase64;

  // Update Proof Badge & Thumbnail
  const badgeId = `badge${target.charAt(0).toUpperCase() + target.slice(1)}`;
  const thumbId = `thumb${target.charAt(0).toUpperCase() + target.slice(1)}`;
  
  const badgeEl = document.getElementById(badgeId);
  const thumbEl = document.getElementById(thumbId);

  if (badgeEl) {
    badgeEl.textContent = 'Captured ✓';
    badgeEl.classList.add('captured');
  }

  if (thumbEl) {
    thumbEl.style.display = 'block';
    thumbEl.innerHTML = `<img src="${snapshotBase64}" alt="Captured ${target}" />`;
  }

  closeLiveCamera();
}

function closeLiveCamera() {
  const modal = document.getElementById('inAppCameraModal');
  const video = document.getElementById('cameraVideoFeed');

  if (AppState.mediaStream) {
    AppState.mediaStream.getTracks().forEach(track => track.stop());
    AppState.mediaStream = null;
  }
  if (video) video.srcObject = null;
  modal.style.display = 'none';
}

// --- 12. CLAIM FORM AUDIT SUBMISSION ---
document.getElementById('rewardClaimForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const orderId = document.getElementById('orderIdInput').value.trim();
  const prodName = document.getElementById('productNameInput').value.trim();
  const upiId = document.getElementById('upiAddressInput').value.trim();

  if (!orderId || !prodName) {
    alert('Please enter your Store Order ID and Product Name.');
    return;
  }

  // Live Proof Check
  if (!AppState.capturedProofs.invoice || !AppState.capturedProofs.product || !AppState.capturedProofs.delivery) {
    alert('All 3 Live Verification Proofs (Invoice, Product, and Delivery Status) are mandatory.');
    return;
  }

  if (AppState.selectedRewardPlan === 'cashback' && !upiId) {
    alert('Please provide a valid UPI ID for 101st Day settlement.');
    return;
  }

  alert('Claim Submitted Successfully!\nYour proofs have been routed to the Verification Desk. Track updates under the Wallet tab.');

  e.target.reset();
  AppState.capturedProofs = { invoice: null, product: null, delivery: null };
  document.querySelectorAll('.proof-thumb').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.proof-badge').forEach(el => {
    el.textContent = 'Pending';
    el.classList.remove('captured');
  });

  switchTab('wallet');
});

// --- 13. SMART FAQ ACCORDION ---
function toggleFaqAccordion(btnElement) {
  const parentItem = btnElement.closest('.faq-accordion-item');
  const isAlreadyActive = parentItem.classList.contains('active');

  document.querySelectorAll('.faq-accordion-item').forEach(item => {
    item.classList.remove('active');
  });

  if (!isAlreadyActive) {
    parentItem.classList.add('active');
  }
}

// --- 14. AUTHENTICATION GATEWAY ---
function handleAuthButtonClick() {
  if (AppState.currentUser.isLoggedIn) {
    switchTab('account');
  } else {
    openAuthModal();
  }
}

function openAuthModal() {
  document.getElementById('authGatewayModal').style.display = 'flex';
}

function closeAuthModal() {
  document.getElementById('authGatewayModal').style.display = 'none';
}

function setAuthMode(mode) {
  const isSignup = mode === 'signup';
  document.getElementById('btnToggleLogin').classList.toggle('active', !isSignup);
  document.getElementById('btnToggleSignup').classList.toggle('active', isSignup);

  document.getElementById('groupSignupName').style.display = isSignup ? 'block' : 'none';
  document.getElementById('groupSignupReferral').style.display = isSignup ? 'block' : 'none';
  document.getElementById('groupSignupAgreement').style.display = isSignup ? 'flex' : 'none';
  document.getElementById('btnAuthAction').textContent = isSignup ? 'Create Account & Agree' : 'Sign In to Account';
}

document.getElementById('authCoreForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const isSignup = document.getElementById('btnToggleSignup').classList.contains('active');

  if (isSignup) {
    const agreed = document.getElementById('authAgreementBox').checked;
    if (!agreed) {
      alert('You must accept the Terms of Service & Cashback Policy to continue.');
      return;
    }
    const name = document.getElementById('authNameInput').value.trim() || 'Verified Member';
    AppState.currentUser.name = name;
  } else {
    AppState.currentUser.name = 'Verified Member';
  }

  AppState.currentUser.isLoggedIn = true;
  syncUserStateUI();
  closeAuthModal();
  alert(`Welcome, ${AppState.currentUser.name}!`);
});

function performLogout() {
  AppState.currentUser.isLoggedIn = false;
  AppState.currentUser.name = 'Guest User';
  syncUserStateUI();
  alert('You have been signed out successfully.');
}

function syncUserStateUI() {
  const pillBtn = document.getElementById('userAuthPill');
  const pillText = document.getElementById('userPillText');
  const nameDisp = document.getElementById('profileNameDisplay');
  const coinAmt = document.getElementById('walletCoinAmount');
  const cashAmt = document.getElementById('walletCashAmount');

  const logged = AppState.currentUser.isLoggedIn;
  if (pillBtn) pillBtn.classList.toggle('logged-in', logged);
  if (pillText) pillText.textContent = logged ? AppState.currentUser.name : 'Sign In / Guest';
  if (nameDisp) nameDisp.textContent = AppState.currentUser.name;
  if (coinAmt) coinAmt.textContent = AppState.currentUser.coinsBalance;
  if (cashAmt) cashAmt.textContent = `₹${AppState.currentUser.pendingCash}`;
}

// --- 15. SEARCH ENGINE & MISS FEEDBACK ---
function setupGlobalSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  const clearBtn = document.getElementById('btnClearSearch');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    clearBtn.style.display = query ? 'block' : 'none';

    if (AppState.currentTab === 'home') {
      const filtered = LiveCatalogDeals.filter(d => 
        d.title.toLowerCase().includes(query) || d.store.toLowerCase().includes(query)
      );
      renderDealsGrid(filtered);
    } else if (AppState.currentTab === 'ebooks') {
      const filtered = DigitalBooksCatalog.filter(b => 
        b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)
      );
      renderEbooksGrid(filtered);
    }
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    if (AppState.currentTab === 'home') renderDealsGrid(LiveCatalogDeals);
    if (AppState.currentTab === 'ebooks') renderEbooksGrid(DigitalBooksCatalog);
  });
}

function setupCategoryFilters() {
  document.querySelectorAll('#homeCategoriesBar .cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#homeCategoriesBar .cat-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;

      if (cat === 'all') {
        renderDealsGrid(LiveCatalogDeals);
      } else {
        const filtered = LiveCatalogDeals.filter(d => d.category === cat);
        renderDealsGrid(filtered);
      }
    });
  });
}

function openSearchMissModal() {
  document.getElementById('searchMissModal').style.display = 'flex';
}

function closeSearchMissModal() {
  document.getElementById('searchMissModal').style.display = 'none';
}

function submitProductRequest() {
  const url = document.getElementById('requestProductUrl').value.trim();
  if (!url) {
    alert('Please paste a valid Amazon or Flipkart product URL.');
    return;
  }
  alert('Thank you! Your product URL has been submitted. Our team will verify and activate reward eligibility within 2 hours.');
  document.getElementById('requestProductUrl').value = '';
  closeSearchMissModal();
}

// --- 16. E-BOOK VIEW TOGGLE & UNLOCK ---
function switchEbookView(view) {
  const btnStore = document.getElementById('btnSegStore');
  const btnLib = document.getElementById('btnSegLibrary');
  const catalogGrid = document.getElementById('ebooksCatalogGrid');
  const libView = document.getElementById('ebooksLibraryView');
  const catBar = document.getElementById('ebookCategoriesBar');

  if (view === 'store') {
    btnStore.classList.add('active');
    btnLib.classList.remove('active');
    catalogGrid.style.display = 'grid';
    catBar.style.display = 'flex';
    libView.style.display = 'none';
  } else {
    btnLib.classList.add('active');
    btnStore.classList.remove('active');
    catalogGrid.style.display = 'none';
    catBar.style.display = 'none';
    libView.style.display = 'block';
  }
}

function unlockEbook(bookId, coinCost) {
  if (AppState.currentUser.coinsBalance < coinCost) {
    const deficit = coinCost - AppState.currentUser.coinsBalance;
    alert(`Insufficient Coins: You currently have ${AppState.currentUser.coinsBalance} Green Coins. You need ${deficit} more coins to unlock this resource.\n\nShop verified deals on Amazon or Flipkart to earn more coins!`);
    switchTab('home');
    return;
  }

  AppState.currentUser.coinsBalance -= coinCost;
  syncUserStateUI();
  alert('Congratulations! This guide has been unlocked and added to My Library.');
}

// --- 17. INVITE CODE COPY & SOCIAL SHARE ---
function copyInviteCode() {
  const code = document.getElementById('refCodeText').textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert(`Invite Code ${code} copied to clipboard!`);
  });
}

function shareOnWhatsApp() {
  const msg = encodeURIComponent(`Shop on Amazon & Flipkart via Super Shopping to earn verified Cashback Rewards and Green Coins! Use my invite code: ${AppState.currentUser.referralCode}`);
  window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
}

// --- 18. LEGAL POLICY MODAL ---
function openPolicyModal() {
  document.getElementById('legalPolicyModal').style.display = 'flex';
}

function closePolicyModal() {
  document.getElementById('legalPolicyModal').style.display = 'none';
} 

// --- 19. PRODUCT DETAIL VIEW (PDP) DYNAMIC ENGINE ---
let currentActiveProduct = null;

function openProductDetail(productId) {
  const product = LiveCatalogDeals.find(d => d.id === productId);
  if (!product) return;

  currentActiveProduct = product;

  // Home pane chhipao aur PDP screen dikhao
  const homePane = document.getElementById('pane-home');
  if (homePane) homePane.style.display = 'none';

  const pdpView = document.getElementById('productDetailView');
  if (pdpView) pdpView.style.display = 'block';

  // Product Data Fill Karo
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
    buyBtn.textContent = `Buy at ₹${product.price}`;
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
      // Bottle, Gadget jisme size nahi chahiye wo pura box hide
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
    alert('Product link ready to share!');
  }
}
