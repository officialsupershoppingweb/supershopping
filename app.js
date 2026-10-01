/* ==========================================================================
   SUPER SHOPPING - CORE APP LOGIC & ENGINE
   ========================================================================== */

// --- 1. STATE & LOCAL DATA STORES ---
const AppState = {
  currentTab: 'home',
  currentUser: {
    isLoggedIn: false,
    name: 'Guest User',
    id: 'SS-GUEST-1092',
    phone: '',
    address: '',
    referralCode: 'SS-REF-8821',
    referralsCount: 2, // Out of 5
    coinsBalance: 24,
    pendingCash: 120
  },
  activeCameraTarget: null, // 'invoice', 'product', 'delivery'
  capturedProofs: {
    invoice: null,
    product: null,
    delivery: null
  },
  selectedRewardMethod: 'cashback', // 'cashback' or 'coins'
  mediaStream: null
};

// Mock Verified Deals Database (Dynamic Store Engine)
const DealsCatalog = [
  {
    id: 'D01',
    title: 'Men Casual Solid Slim Fit Cotton Shirt',
    store: 'flipkart',
    price: 449,
    mrp: 1499,
    discount: '70% OFF',
    category: 'fashion',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
    affiliateUrl: 'https://earnkaro.com/' // Profit Link destination
  },
  {
    id: 'D02',
    title: 'Wireless Bluetooth Headphone with Deep Bass',
    store: 'amazon',
    price: 999,
    mrp: 2999,
    discount: '66% OFF',
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    affiliateUrl: 'https://amazon.in/' // Direct Amazon Associates link
  },
  {
    id: 'D03',
    title: 'Stainless Steel Insulated Water Bottle (1 Litre)',
    store: 'amazon',
    price: 499,
    mrp: 999,
    discount: '50% OFF',
    category: 'home',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80',
    affiliateUrl: 'https://amazon.in/'
  },
  {
    id: 'D04',
    title: 'Smart Fitness Tracker Band with Heart Rate Monitor',
    store: 'flipkart',
    price: 1299,
    mrp: 3499,
    discount: '62% OFF',
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=400&q=80',
    affiliateUrl: 'https://earnkaro.com/'
  }
];

// Mock E-Books & Study Notes Database
const EbooksCatalog = [
  {
    id: 'EB01',
    title: 'Class 12 Accounts & Partnership Master Notes',
    author: 'Commerce Hub Expert',
    category: 'commerce',
    coinCost: 25,
    previewPages: 'Chapter 1: Goodwill Valuation & Distribution Rules.\nCapital adjustments and profit sharing ratio changes summarized in simple step-by-step points...',
    pdfUrl: '#'
  },
  {
    id: 'EB02',
    title: 'Zero to Hero: Affiliate Marketing Growth Playbook',
    author: 'Digital Growth Lab',
    category: 'business',
    coinCost: 35,
    previewPages: 'Module 1: High converting deals discovery.\nHow performance marketing engines generate steady daily transactions using organic networks...',
    pdfUrl: '#'
  },
  {
    id: 'EB03',
    title: 'Class 11 English Core Complete Notes & Analysis',
    author: 'Faculty of Humanities',
    category: 'notes1112',
    coinCost: 15,
    previewPages: 'Chapter Overview: The Portrait of a Lady.\nCharacter sketch, central themes, grandmother-grandson relationship stages and exam questions...',
    pdfUrl: '#'
  }
];

// Mock 100-Day Active Pipeline Orders
const UserOrdersPipeline = [
  {
    orderId: 'OD-40918-2026',
    productName: 'Cotton Casual Shirt',
    store: 'Flipkart',
    claimType: 'Cashback Reward',
    amount: '₹80',
    currentDay: 28,
    returnSafe: true, // Return window elapsed
    settlementDate: 'Day 101'
  }
];

// --- 2. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  renderDeals(DealsCatalog);
  renderEbooks(EbooksCatalog);
  renderOrdersPipeline();
  renderReferralBadges();
  setupEventListeners();
  updateUserUI();
});

// --- 3. TAB NAVIGATION & HEADER SEARCH VISIBILITY ---
function switchTab(targetTab) {
  AppState.currentTab = targetTab;

  // Tab Panes Active Toggle
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  const activePane = document.getElementById(`pane-${targetTab}`);
  if (activePane) activePane.classList.add('active');

  // Bottom Nav Bar Icons Active Toggle
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === targetTab);
  });

  // FROZEN RULE: Search Bar visibility logic
  const searchContainer = document.getElementById('headerSearchContainer');
  const titleBar = document.getElementById('headerTitleBar');
  const titleText = document.getElementById('titleBarText');
  const searchInput = document.getElementById('globalSearchInput');

  if (targetTab === 'home') {
    searchContainer.style.display = 'flex';
    titleBar.style.display = 'none';
    searchInput.placeholder = 'Search products, deals, discounts...';
  } else if (targetTab === 'ebooks') {
    searchContainer.style.display = 'flex';
    titleBar.style.display = 'none';
    searchInput.placeholder = 'Search study notes, e-books, guides...';
  } else {
    // Hide search bar on Earn, Wallet, Account tabs
    searchContainer.style.display = 'none';
    titleBar.style.display = 'block';

    if (targetTab === 'earn') titleText.textContent = '🎁 Claim Purchase Reward';
    if (targetTab === 'wallet') titleText.textContent = '💳 Rewards & Payout Wallet';
    if (targetTab === 'account') titleText.textContent = '👤 Account & Settings';
  }

  // Scroll to top of container smoothly
  const main = document.getElementById('appMain');
  if (main) main.scrollTop = 0;
}

// --- 4. RENDER DEALS & DYNAMIC STORE BUTTONS (FLIPKART / AMAZON) ---
function renderDeals(deals) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = deals.map(deal => {
    const isAmazon = deal.store.toLowerCase() === 'amazon';
    const storeBadgeClass = isAmazon ? 'badge-store-amazon' : 'badge-store-flipkart';
    const storeBadgeText = isAmazon ? 'Amazon Deal' : 'Flipkart Deal';
    const btnClass = isAmazon ? 'btn-store-amazon' : 'btn-store-flipkart';
    const btnText = isAmazon ? '⚡ Shop on Amazon' : '⚡ Shop on Flipkart';

    return `
      <div class="product-card">
        <div class="product-thumb-wrap">
          <img src="${deal.imageUrl}" alt="${deal.title}" loading="lazy" />
          <span class="product-store-badge ${storeBadgeClass}">${storeBadgeText}</span>
        </div>
        <div class="product-details">
          <h4 class="product-title" title="${deal.title}">${deal.title}</h4>
          <div class="price-row">
            <span class="deal-price">₹${deal.price}</span>
            <span class="mrp-price">₹${deal.mrp}</span>
            <span class="discount-tag">${deal.discount}</span>
          </div>
          <a href="${deal.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="btn-store-action ${btnClass}">
            ${btnText}
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// --- 5. RENDER E-BOOKS (PORTRAIT SHELF VIEW) ---
function renderEbooks(books) {
  const grid = document.getElementById('ebooksStoreGrid');
  if (!grid) return;

  grid.innerHTML = books.map(book => {
    return `
      <div class="ebook-card">
        <div class="ebook-cover-wrap">
          <span class="ebook-preview-tag">👁️ Sample Inside</span>
          <span style="font-weight:700; font-size:12px; z-index:2;">${book.title}</span>
        </div>
        <div class="ebook-details">
          <h5 class="ebook-title">${book.title}</h5>
          <span class="ebook-author">${book.author}</span>
          <span class="ebook-price-pill">🪙 ${book.coinCost} Green Coins</span>
          <div class="ebook-actions-stack">
            <button type="button" class="btn-preview" onclick="openBookPreview('${book.id}')">Read Preview</button>
            <button type="button" class="btn-unlock-coin" onclick="unlockBookWithCoins('${book.id}', ${book.coinCost})">⚡ Unlock Book</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- 6. WALLET 100-DAY TRACKER PIPELINE ---
function renderOrdersPipeline() {
  const container = document.getElementById('walletPipelineList');
  if (!container) return;

  if (UserOrdersPipeline.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p style="color:#64748b; font-size:12.5px; text-align:center;">Abhi koi active order cashback pipeline me nahi hai.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = UserOrdersPipeline.map(item => {
    return `
      <div class="order-pipeline-card">
        <div class="order-pipeline-header">
          <span class="order-platform-tag">${item.store} • ${item.orderId}</span>
          <span class="order-day-tag">Day ${item.currentDay} of 100</span>
        </div>
        <p style="font-size:13px; font-weight:700; margin-bottom:4px;">${item.productName}</p>
        <span style="font-size:11.5px; color:#475569;">Expected Reward: <strong>${item.amount} via UPI</strong></span>

        <!-- 4-Stage Progress Road -->
        <div class="progress-road">
          <div class="road-step completed">✓</div>
          <div class="road-step completed">✓</div>
          <div class="road-step current">●</div>
          <div class="road-step">○</div>
        </div>
        <div class="road-labels">
          <span>Claimed</span>
          <span>Verified</span>
          <span>Merchant</span>
          <span>101st Day UPI</span>
        </div>

        ${item.returnSafe ? `
          <div class="order-safe-badge">
            🛡️ Return Period Safe: Commission Approved
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// --- 7. ACCOUNT 5 REFERRAL SLOTS ---
function renderReferralBadges() {
  const container = document.getElementById('referralSlotsContainer');
  if (!container) return;

  const totalSlots = 5;
  const claimed = AppState.currentUser.referralsCount;
  let html = '';

  for (let i = 1; i <= totalSlots; i++) {
    const isClaimed = i <= claimed;
    html += `
      <div class="ref-slot-badge ${isClaimed ? 'claimed' : ''}">
        <div class="slot-circle">${isClaimed ? '✓' : i}</div>
        <span class="slot-label">${isClaimed ? 'Won 10🪙' : 'Empty'}</span>
      </div>
    `;
  }
  container.innerHTML = html;
}

// --- 8. REWARD METHOD SELECTION & CONDITIONAL UPI ---
function selectRewardMethod(type) {
  AppState.selectedRewardMethod = type;
  const cardCash = document.getElementById('cardCashback');
  const cardCoins = document.getElementById('cardCoins');
  const upiContainer = document.getElementById('upiFieldContainer');

  if (type === 'cashback') {
    cardCash.classList.add('selected');
    cardCoins.classList.remove('selected');
    upiContainer.style.display = 'block';
  } else {
    cardCoins.classList.add('selected');
    cardCash.classList.remove('selected');
    upiContainer.style.display = 'none';
  }
}

// --- 9. IN-APP LIVE CAMERA ENGINE (DIRECT VIEWPORT CAPTURE) ---
async function openLiveCamera(targetType) {
  AppState.activeCameraTarget = targetType;
  const modal = document.getElementById('cameraModal');
  const video = document.getElementById('liveVideoFeed');
  const title = document.getElementById('cameraTargetTitle');

  if (targetType === 'invoice') title.textContent = 'Capture Live Invoice / Bill';
  if (targetType === 'product') title.textContent = 'Capture Live Unboxed Product';
  if (targetType === 'delivery') title.textContent = 'Capture Delivery App Screenshot Proof';

  modal.style.display = 'flex';

  try {
    // Request environment/rear camera on mobile devices
    AppState.mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    });
    video.srcObject = AppState.mediaStream;
  } catch (err) {
    alert('Camera permission denied ya camera available nahi hai. Device setting check karein.');
    closeLiveCamera();
  }
}

function snapPhoto() {
  const video = document.getElementById('liveVideoFeed');
  const canvas = document.getElementById('liveCaptureCanvas');
  const context = canvas.getContext('2d');

  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const photoBase64 = canvas.toDataURL('image/jpeg', 0.85);
  const target = AppState.activeCameraTarget;

  AppState.capturedProofs[target] = photoBase64;

  // Update Proof box status in form
  const statusBadge = document.getElementById(`status${target.charAt(0).toUpperCase() + target.slice(1)}`);
  const thumbBox = document.getElementById(`thumb${target.charAt(0).toUpperCase() + target.slice(1)}`);

  if (statusBadge) {
    statusBadge.textContent = 'Captured ✓';
    statusBadge.classList.add('captured');
  }

  if (thumbBox) {
    thumbBox.style.display = 'block';
    thumbBox.innerHTML = `<img src="${photoBase64}" alt="Captured ${target}" />`;
  }

  closeLiveCamera();
}

function closeLiveCamera() {
  const modal = document.getElementById('cameraModal');
  const video = document.getElementById('liveVideoFeed');

  if (AppState.mediaStream) {
    AppState.mediaStream.getTracks().forEach(track => track.stop());
    AppState.mediaStream = null;
  }
  if (video) video.srcObject = null;
  modal.style.display = 'none';
}

// --- 10. SMART FAQ ACCORDION HANDLER ---
function toggleFaq(btnElement) {
  const parentItem = btnElement.closest('.faq-item');
  const isActive = parentItem.classList.contains('active');

  // Close all open FAQs
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
  });

  // Toggle current FAQ
  if (!isActive) {
    parentItem.classList.add('active');
  }
}

// --- 11. E-BOOK PREVIEW & UNLOCK ---
function openBookPreview(bookId) {
  const book = EbooksCatalog.find(b => b.id === bookId);
  if (!book) return;

  const modal = document.getElementById('previewModal');
  const title = document.getElementById('previewModalTitle');
  const content = document.getElementById('previewContentBox');
  const unlockBtn = document.getElementById('btnUnlockFromPreview');

  title.textContent = book.title;
  content.innerHTML = `
    <div style="background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #e2e8f0; font-size:12.5px; line-height:1.6; white-space:pre-line;">
      ${book.previewPages}
    </div>
    <p style="font-size:11px; color:#64748b; margin-top:10px;">⚡ Full notes padhne ke liye apne Green Coins se unlock karein.</p>
  `;

  unlockBtn.onclick = () => {
    closePreviewModal();
    unlockBookWithCoins(book.id, book.coinCost);
  };

  modal.style.display = 'flex';
}

function closePreviewModal() {
  document.getElementById('previewModal').style.display = 'none';
}

function unlockBookWithCoins(bookId, coinCost) {
  if (AppState.currentUser.coinsBalance < coinCost) {
    const deficit = coinCost - AppState.currentUser.coinsBalance;
    alert(`Coins Shortage: Aapke paas ${AppState.currentUser.coinsBalance} Coins hain. Is book ke liye ${deficit} Coins aur chahiye!\n\nAmazon ya Flipkart se deals purchase karein aur coins kamayein.`);
    switchTab('home');
    return;
  }

  AppState.currentUser.coinsBalance -= coinCost;
  updateUserUI();
  alert(`Badhai ho! Book unlock ho chuki hai aur aapki "My Library" me add kar di gayi hai.`);
}

function switchEbookSegment(segment) {
  const btnExp = document.getElementById('segExplore');
  const btnLib = document.getElementById('segLibrary');
  const storeView = document.getElementById('ebooksStoreGrid');
  const libView = document.getElementById('ebooksLibraryView');
  const catPills = document.getElementById('ebookCategoryPills');

  if (segment === 'explore') {
    btnExp.classList.add('active');
    btnLib.classList.remove('active');
    storeView.style.display = 'grid';
    catPills.style.display = 'flex';
    libView.style.display = 'none';
  } else {
    btnLib.classList.add('active');
    btnExp.classList.remove('active');
    storeView.style.display = 'none';
    catPills.style.display = 'none';
    libView.style.display = 'block';
  }
}

// --- 12. CLAIM FORM SUBMIT (AUDIT VALIDATION) ---
document.getElementById('rewardClaimForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const orderId = document.getElementById('orderIdInput').value.trim();
  const prodName = document.getElementById('productNameInput').value.trim();
  const upiId = document.getElementById('upiInput').value.trim();

  if (!orderId || !prodName) {
    alert('Kripya Order ID aur Product Name bharein.');
    return;
  }

  // Live Proof Mandatory Check
  if (!AppState.capturedProofs.invoice || !AppState.capturedProofs.product || !AppState.capturedProofs.delivery) {
    alert('Sabhi 3 proofs ki Live camera photo click karna anivarya hai (Invoice, Product & Delivery Status).');
    return;
  }

  if (AppState.selectedRewardMethod === 'cashback' && !upiId) {
    alert('Cashback Reward ke liye valid UPI ID darj karein.');
    return;
  }

  // Successful Simulation
  alert('Claim Successfully Submitted!\nAapka claim Verification Desk par bhej diya gaya hai. Approval status aapke Wallet tab par live dikhega.');
  
  // Reset Form
  e.target.reset();
  AppState.capturedProofs = { invoice: null, product: null, delivery: null };
  document.querySelectorAll('.preview-thumbnail').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.proof-status-tag').forEach(el => {
    el.textContent = 'Pending Capture';
    el.classList.remove('captured');
  });

  switchTab('wallet');
});

// --- 13. AUTH & ONBOARDING MODAL ---
function openAuthModal() {
  document.getElementById('authModal').style.display = 'flex';
}

function closeAuthModal() {
  document.getElementById('authModal').style.display = 'none';
}

function switchAuthMode(mode) {
  const isSignup = mode === 'signup';
  document.getElementById('btnAuthLogin').classList.toggle('active', !isSignup);
  document.getElementById('btnAuthSignup').classList.toggle('active', isSignup);

  document.getElementById('grpFullName').style.display = isSignup ? 'block' : 'none';
  document.getElementById('grpReferral').style.display = isSignup ? 'block' : 'none';
  document.getElementById('grpTermsCheckbox').style.display = isSignup ? 'flex' : 'none';
  document.getElementById('authSubmitBtn').textContent = isSignup ? 'Agree & Create Account' : 'Sign In';
}

document.getElementById('authForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const isSignup = document.getElementById('btnAuthSignup').classList.contains('active');

  if (isSignup) {
    const agreed = document.getElementById('authTermsAgree').checked;
    if (!agreed) {
      alert('Terms of Service aur Cashback Policy ko agree karna zaroori hai.');
      return;
    }
    const name = document.getElementById('authFullName').value.trim() || 'Valued Member';
    AppState.currentUser.isLoggedIn = true;
    AppState.currentUser.name = name;
  } else {
    AppState.currentUser.isLoggedIn = true;
    AppState.currentUser.name = 'Verified Member';
  }

  updateUserUI();
  closeAuthModal();
  alert('Welcome to Super Shopping!');
});

function handleAuthAction() {
  if (AppState.currentUser.isLoggedIn) {
    AppState.currentUser.isLoggedIn = false;
    AppState.currentUser.name = 'Guest User';
    updateUserUI();
    alert('Logged out successfully.');
  } else {
    openAuthModal();
  }
}

// Update Top Pill & Account Displays
function updateUserUI() {
  const guestPill = document.getElementById('guestPill');
  const nameDisplay = document.getElementById('accountNameDisplay');
  const coinBal = document.getElementById('walletCoinBalance');
  const cashBal = document.getElementById('walletPendingCash');

  if (guestPill) guestPill.textContent = AppState.currentUser.isLoggedIn ? AppState.currentUser.name : 'Guest Mode';
  if (nameDisplay) nameDisplay.textContent = AppState.currentUser.name;
  if (coinBal) coinBal.textContent = AppState.currentUser.coinsBalance;
  if (cashBal) cashBal.textContent = `₹${AppState.currentUser.pendingCash}`;
}

// --- 14. PROFILE DP UPLOAD ---
document.getElementById('dpFileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const avatarImg = document.getElementById('avatarImage');
    const avatarInitials = document.getElementById('avatarInitials');
    avatarImg.src = evt.target.result;
    avatarImg.style.display = 'block';
    avatarInitials.style.display = 'none';
  };
  reader.readAsDataURL(file);
});

// Profile Form Save
document.getElementById('profileEditForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const newName = document.getElementById('profFullName').value.trim();
  if (newName) {
    AppState.currentUser.name = newName;
    updateUserUI();
  }
  alert('Profile details updated successfully!');
});

// --- 15. REFERRAL COPY & SHARE ---
function copyReferralCode() {
  const code = document.getElementById('userReferralCode').textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert(`Referral Code ${code} copied to clipboard!`);
  });
}

function sharePlatform() {
  const shareText = encodeURIComponent(`Shop on Amazon & Flipkart via Super Shopping and get extra Cashback Rewards + Green Coins! Use my invite code: ${AppState.currentUser.referralCode}`);
  window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
}

// --- 16. LEGAL POLICY MODAL ---
function openPolicyModal() {
  document.getElementById('policyModal').style.display = 'flex';
}

function closePolicyModal() {
  document.getElementById('policyModal').style.display = 'none';
}

// --- 17. SEARCH FILTER ENGINE (HOME & E-BOOKS) ---
function setupEventListeners() {
  const searchInput = document.getElementById('globalSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    clearBtn.style.display = term ? 'block' : 'none';

    if (AppState.currentTab === 'home') {
      const filtered = DealsCatalog.filter(d => 
        d.title.toLowerCase().includes(term) || d.store.toLowerCase().includes(term)
      );
      renderDeals(filtered);
    } else if (AppState.currentTab === 'ebooks') {
      const filtered = EbooksCatalog.filter(b => 
        b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term)
      );
      renderEbooks(filtered);
    }
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    if (AppState.currentTab === 'home') renderDeals(DealsCatalog);
    if (AppState.currentTab === 'ebooks') renderEbooks(EbooksCatalog);
  });
}
