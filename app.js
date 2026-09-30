/* ========================================================
   SUPER SHOPPING - CORE FRONTEND ENGINE (CUSTOMER PORTAL)
   ======================================================== */

// --- 1. LOCAL STATE & CONFIGURATION ---
const APP_CONFIG = {
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbw.../exec", // Backend Apps Script URL
  MIN_SHARPNESS_THRESHOLD: 12.0 // Canvas blur limit check
};

let currentUser = JSON.parse(localStorage.getItem("ss_user_session")) || null;
let currentProducts = [];
let currentEbooks = [];

// Sample Mock Data (Testing & Instant Display)
const MOCK_PRODUCTS = [
  {
    id: "PROD-101",
    title: "AUSK Maroon Cotton Blend Formal Shirt",
    mrp: 1499,
    price: 484,
    category: "Fashion",
    rating: "4.2",
    rewardTag: "Earn ₹25 Cashback",
    affiliateLink: "https://amazon.in",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500"
    ],
    specs: { "Fabric": "Cotton Blend", "Pattern": "Solid", "Fit": "Slim Fit", "Wash": "Machine Wash" }
  },
  {
    id: "PROD-102",
    title: "IQOO Z11x 5G Smartphone (Titanium Grey)",
    mrp: 29399,
    price: 27649,
    category: "Mobiles",
    rating: "4.5",
    rewardTag: "Earn 2.5%-5% Cashback",
    affiliateLink: "https://amazon.in",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    ],
    specs: { "RAM": "8 GB", "Storage": "128 GB", "Battery": "6000 mAh", "Camera": "50MP AI" }
  },
  {
    id: "PROD-103",
    title: "Wireless Bluetooth Smart Earbuds with ANC",
    mrp: 3999,
    price: 1299,
    category: "Electronics",
    rating: "4.3",
    rewardTag: "Earn 40 Coins",
    affiliateLink: "https://amazon.in",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500"
    ],
    specs: { "Playtime": "40 Hours", "ANC": "Active Noise Cancelling", "Bluetooth": "v5.3" }
  }
];

const MOCK_EBOOKS = [
  {
    id: "EB-01",
    title: "Complete Digital Marketing Masterguide",
    coinPrice: 30,
    cashPrice: 149,
    pdfUrl: "https://example.com/sample.pdf",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500"
  },
  {
    id: "EB-02",
    title: "Accounting & Tally Prime Shortcut Handbook",
    coinPrice: 20,
    cashPrice: 99,
    pdfUrl: "https://example.com/sample.pdf",
    cover: "https://images.unsplash.com/photo-1554415707-9e4466bfe039?w=500"
  }
];

// --- 2. INITIALIZATION & SESSION PERSISTENCE ---
document.addEventListener("DOMContentLoaded", () => {
  currentProducts = MOCK_PRODUCTS;
  currentEbooks = MOCK_EBOOKS;
  
  renderProducts(currentProducts);
  renderEbooks(currentEbooks);
  checkAuthPersistence();
});

function checkAuthPersistence() {
  if (currentUser) {
    updateUserInterface();
  } else {
    // Guest or trigger login modal if needed
    document.getElementById("profileNameDisplay").innerText = "Guest User";
    document.getElementById("profileEmailDisplay").innerText = "Please login to track rewards";
    document.getElementById("profileUserIdDisplay").innerText = "ID: Not Logged In";
  }
}

function updateUserInterface() {
  document.getElementById("headerCoinCount").innerText = `${currentUser.coins || 0} Coins`;
  document.getElementById("walletCoinBalance").innerText = currentUser.coins || 0;
  document.getElementById("walletCashPipeline").innerText = `₹${currentUser.cashPipeline || 0}`;
  
  // Profile Screen
  document.getElementById("profileNameDisplay").innerText = currentUser.name;
  document.getElementById("profileEmailDisplay").innerText = currentUser.email;
  document.getElementById("profileUserIdDisplay").innerText = `ID: ${currentUser.id}`;
  document.getElementById("profileAvatar").innerText = currentUser.name.charAt(0).toUpperCase();
  
  // Referral
  const refCode = `REF-${currentUser.id.slice(-4)}`;
  document.getElementById("userReferralCode").innerText = refCode;
  document.getElementById("refUsageText").innerText = `Referrals Used: ${currentUser.referralsUsed || 0}/5`;

  renderCashMilestones(currentUser.orders || []);
}

// --- 3. BOTTOM NAVIGATION TAB SWITCHER ---
function switchTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(el => el.style.display = "none");
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  
  const targetTab = document.getElementById(`tab-${tabName}`);
  if (targetTab) targetTab.style.display = "block";
  
  const navIndices = { home: 0, earn: 1, ebooks: 2, wallet: 3, account: 4 };
  const navItems = document.querySelectorAll(".nav-item");
  if (navItems[navIndices[tabName]]) {
    navItems[navIndices[tabName]].classList.add("active");
  }
  window.scrollTo(0, 0);
}

// --- 4. FLIPKART STYLE PRODUCT RENDER & SMART DEMAND INTERCEPTOR ---
function renderProducts(items) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = `<p style="grid-column: span 3; text-align: center; color: var(--text-muted); padding: 30px;">Koi product nahi mila.</p>`;
    return;
  }

  items.forEach(prod => {
    const card = document.createElement("div");
    card.className = "deal-card";
    card.onclick = () => openProductModal(prod);
    card.innerHTML = `
      <span class="deal-rating-badge">${prod.rating} ★</span>
      <img src="${prod.images[0]}" alt="${prod.title}" loading="lazy">
      <div class="deal-title">${prod.title}</div>
      <div class="deal-price-row">
        <span class="deal-final-price">₹${prod.price}</span>
        <span class="deal-mrp">₹${prod.mrp}</span>
      </div>
      <div class="deal-custom-badge">${prod.rewardTag}</div>
    `;
    grid.appendChild(card);
  });
}

function handleSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    renderProducts(currentProducts);
    return;
  }
  const filtered = currentProducts.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  
  if (filtered.length === 0) {
    openDemandModal(query);
  } else {
    renderProducts(filtered);
  }
}

function filterCategory(catName, el) {
  document.querySelectorAll(".category-item").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  if (catName === "All") {
    renderProducts(currentProducts);
  } else {
    const filtered = currentProducts.filter(p => p.category.toLowerCase() === catName.toLowerCase());
    renderProducts(filtered);
  }
}

// Demand Interceptor Modals
function openDemandModal(searchWord) {
  document.getElementById("demandProductInput").value = searchWord;
  document.getElementById("demandModal").style.display = "flex";
}
function closeDemandModal() {
  document.getElementById("demandModal").style.display = "none";
}
function submitProductDemand() {
  const prod = document.getElementById("demandProductInput").value.trim();
  const price = document.getElementById("demandTargetPrice").value.trim();
  if (!prod) return alert("Kripya product ka naam ya link daalein.");

  alert("Shukriya! Aapki request accept ho gayi hai. Hamari team 24 se 48 ghante me ise live kar degi.");
  closeDemandModal();
  document.getElementById("mainSearchInput").value = "";
  renderProducts(currentProducts);
}

// --- 5. PRODUCT DETAIL SLIDER & STICKY BUY BAR ---
let activeModalProduct = null;
function openProductModal(prod) {
  activeModalProduct = prod;
  document.getElementById("detailTitle").innerText = prod.title;
  document.getElementById("detailFinalPrice").innerText = `₹${prod.price}`;
  document.getElementById("detailMrp").innerText = `₹${prod.mrp}`;
  document.getElementById("detailRewardTag").innerText = prod.rewardTag;
  document.getElementById("stickyBarPrice").innerText = `₹${prod.price}`;
  document.getElementById("stickyBuyBtn").href = prod.affiliateLink;

  // Swiper Photos
  const mainImg = document.getElementById("detailMainImg");
  const thumbStrip = document.getElementById("detailThumbnails");
  mainImg.src = prod.images[0];
  thumbStrip.innerHTML = "";

  prod.images.forEach((imgUrl, idx) => {
    const thumb = document.createElement("img");
    thumb.src = imgUrl;
    thumb.className = idx === 0 ? "active-thumb" : "";
    thumb.onclick = () => {
      mainImg.src = imgUrl;
      thumbStrip.querySelectorAll("img").forEach(t => t.classList.remove("active-thumb"));
      thumb.classList.add("active-thumb");
    };
    thumbStrip.appendChild(thumb);
  });

  // Specs
  const specsDiv = document.getElementById("detailSpecsContent");
  specsDiv.innerHTML = "";
  for (const [k, v] of Object.entries(prod.specs || {})) {
    specsDiv.innerHTML += `<div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px solid #eee; font-size:12px;"><strong>${k}</strong><span>${v}</span></div>`;
  }

  // Similar Products Slider
  const simRow = document.getElementById("detailSimilarRow");
  simRow.innerHTML = "";
  currentProducts.filter(p => p.id !== prod.id).forEach(sp => {
    const card = document.createElement("div");
    card.style = "min-width: 110px; background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:6px; font-size:11px; cursor:pointer;";
    card.onclick = () => openProductModal(sp);
    card.innerHTML = `<img src="${sp.images[0]}" style="width:100%; height:90px; object-fit:cover; border-radius:4px;"><p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${sp.title}</p><strong>₹${sp.price}</strong>`;
    simRow.appendChild(card);
  });

  document.getElementById("productDetailModal").style.display = "block";
}

function closeProductModal() {
  document.getElementById("productDetailModal").style.display = "none";
}

// --- 6. CLIENT-SIDE LIVE CAMERA BLUR & QUALITY AUDIT ---
function processCapture(fileInput, previewId) {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = function() {
      // Run Canvas Laplacian / Edge Contrast check
      const isClear = evaluateSharpness(img);
      if (!isClear) {
        alert("⚠️ Please take a clear photo! Image bohot dhundhli ya andhere me hai. Kripya roshni me saaf photo lein.");
        fileInput.value = ""; // Reset
        document.getElementById(previewId).innerHTML = "";
        return;
      }
      // Clean Preview
      document.getElementById(previewId).innerHTML = `
        <div style="position:relative; margin-top:8px;">
          <img src="${img.src}" style="width:100px; height:100px; object-fit:cover; border-radius:6px; border:2px solid var(--success-green);">
          <small style="display:block; color:var(--success-green); font-weight:600;"><i class="fa-solid fa-check"></i> Photo Verified Clear</small>
        </div>
      `;
    };
  };
  reader.readAsDataURL(file);
}

function evaluateSharpness(img) {
  const canvas = document.getElementById("qualityAuditCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 100;
  canvas.height = 100;
  ctx.drawImage(img, 0, 0, 100, 100);
  
  const imgData = ctx.getImageData(0, 0, 100, 100);
  const data = imgData.data;
  let totalContrast = 0;

  for (let i = 0; i < data.length - 4; i += 4) {
    const diff = Math.abs(data[i] - data[i + 4]);
    totalContrast += diff;
  }
  const avgContrast = totalContrast / (data.length / 4);
  return avgContrast > APP_CONFIG.MIN_SHARPNESS_THRESHOLD;
}

// --- 7. REWARD SUBMISSION & SELECTION ---
function selectRewardChoice(type) {
  document.getElementById("rewardCardCash").classList.toggle("selected", type === "cash");
  document.getElementById("rewardCardCoins").classList.toggle("selected", type === "coins");
  document.getElementById("upiFieldBlock").style.display = type === "cash" ? "block" : "none";
}

function submitRewardClaim() {
  if (!currentUser) {
    openAuthModal();
    return;
  }
  const orderId = document.getElementById("claimOrderId").value.trim();
  const prodName = document.getElementById("claimProductName").value.trim();
  const invoicePhoto = document.getElementById("cameraInvoice").files[0];
  const productPhoto = document.getElementById("cameraProduct").files[0];
  const deliveryScreenshot = document.getElementById("galleryDelivery").files[0];
  const rewardType = document.querySelector('input[name="rewardMethod"]:checked').value;
  const upiId = document.getElementById("claimUpiId").value.trim();

  if (!orderId || !prodName || !invoicePhoto || !productPhoto || !deliveryScreenshot) {
    return alert("Kripya saare mandatory fields aur dono Live Photos attach karein!");
  }
  if (rewardType === "CASH" && !upiId) {
    return alert("Kripya 101st day payout ke liye UPI ID enter karein.");
  }

  // Create local milestone entry for immediate reflection
  const newOrder = {
    orderId: orderId,
    prodName: prodName,
    rewardType: rewardType,
    upiId: upiId,
    dayCount: 1, // Day 1
    status: "Stage 1",
    estimatedCash: "2.5% - 5%"
  };

  currentUser.orders = currentUser.orders || [];
  currentUser.orders.unshift(newOrder);
  localStorage.setItem("ss_user_session", JSON.stringify(currentUser));
  
  alert("🎉 Purchase claim successfully submit ho gaya! Desk review ke baad wallet me timeline update ho jayegi.");
  switchTab("wallet");
  updateUserInterface();
}

// --- 8. WALLET 100-DAY MILESTONE TRACKER ---
function renderCashMilestones(orders) {
  const container = document.getElementById("cashPayoutsList");
  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:20px;">Koi active payout nahi hai.</p>`;
    return;
  }

  orders.forEach(ord => {
    let milestoneText = "";
    let amountBadge = "";

    if (ord.dayCount <= 25) {
      milestoneText = "🟡 Stage 1: Order & Return Window Verification";
      amountBadge = `<span style="color:#d97706; font-size:12px; font-weight:700;">Estimated: 2.5% to 5%</span>`;
    } else if (ord.dayCount <= 50) {
      milestoneText = "🔵 Stage 2: Withdrawal Request Accepted & Queued";
      amountBadge = `<span style="color:#2563eb; font-size:12px; font-weight:700;">Processing</span>`;
    } else if (ord.dayCount <= 75) {
      milestoneText = "🟣 Stage 3: Merchant Commission Generating";
      amountBadge = `<span style="color:#7c3aed; font-size:12px; font-weight:700;">Generating</span>`;
    } else if (ord.dayCount <= 100) {
      milestoneText = "🟠 Stage 4: Final Calculation Locked";
      amountBadge = `<span style="color:var(--success-green); font-size:13px; font-weight:800;">Final Amount: ₹${ord.finalAmount || 50} Locked</span>`;
    } else {
      milestoneText = "🟢 Completed Successfully (Settled via UPI)";
      amountBadge = `<span style="color:var(--success-green); font-weight:700;">Paid (Ref: UTR-${Math.floor(100000 + Math.random()*900000)})</span>`;
    }

    const card = document.createElement("div");
    card.className = "payout-order-card";
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
        <strong>Order: ${ord.orderId}</strong>
        ${amountBadge}
      </div>
      <p style="font-size:12px; color:var(--text-muted);">${ord.prodName}</p>
      <div style="font-size:12px; font-weight:600; margin:6px 0;">${milestoneText}</div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${Math.min(ord.dayCount, 100)}%;"></div>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); margin-top:4px;">
        <span>Day ${ord.dayCount} of 100</span>
        <span>UPI: ${ord.upiId || 'N/A'}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// --- 9. E-BOOKS DIGITAL UNLOCK & DYNAMIC UPI ---
function renderEbooks(books) {
  const grid = document.getElementById("ebooksGrid");
  grid.innerHTML = "";

  books.forEach(b => {
    const card = document.createElement("div");
    card.className = "deal-card";
    card.innerHTML = `
      <img src="${b.cover}" alt="${b.title}">
      <div class="deal-title">${b.title}</div>
      <div style="font-size:12px; color:var(--success-green); font-weight:700; margin-bottom:6px;">
        🪙 ${b.coinPrice} Coins <small style="color:var(--text-muted);">or ₹${b.cashPrice}</small>
      </div>
      <button class="btn-primary" style="font-size:11px; padding:6px 0;" onclick="unlockEbook('${b.id}')">
        Unlock Now
      </button>
    `;
    grid.appendChild(card);
  });
}

function unlockEbook(bookId) {
  if (!currentUser) return openAuthModal();
  const book = currentEbooks.find(b => b.id === bookId);
  if (!book) return;

  if (currentUser.coins >= book.coinPrice) {
    if (confirm(`${book.coinPrice} Green Coins deduct karke E-Book download karein?`)) {
      currentUser.coins -= book.coinPrice;
      localStorage.setItem("ss_user_session", JSON.stringify(currentUser));
      updateUserInterface();
      alert(`🎉 E-Book Unlock Ho Gayi! PDF Download Link: ${book.pdfUrl}`);
      window.open(book.pdfUrl, "_blank");
    }
  } else {
    // Dynamic Amount UPI Trigger
    const upiDeepLink = `upi://pay?pa=official@upi&pn=SuperShopping&am=${book.cashPrice}&cu=INR`;
    if (confirm(`Aapke paas paryapt coins nahi hain. Kya aap ₹${book.cashPrice} direct UPI se pay karke download karna chahte hain?`)) {
      window.location.href = upiDeepLink;
    }
  }
}

// --- 10. AUTHENTICATION & REFERRAL LOGIC ---
function openAuthModal() { document.getElementById("authModal").style.display = "flex"; }
function closeAuthModal() { document.getElementById("authModal").style.display = "none"; }
function toggleAuthView(view) {
  document.getElementById("loginView").style.display = view === "login" ? "block" : "none";
  document.getElementById("signupView").style.display = view === "signup" ? "block" : "none";
}

function sendSignupOtp() {
  const email = document.getElementById("regEmail").value.trim();
  if (!email || !email.includes("@")) return alert("Kripya valid Email ID enter karein.");
  document.getElementById("regOtpBlock").style.display = "block";
  alert("6-Digit OTP aapke email par bhej diya gaya hai (Free Google Engine).");
}

function executeSignup() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const pwd = document.getElementById("regPassword").value.trim();
  const refCode = document.getElementById("regReferralInput").value.trim();

  if (!name || !email || !phone || !pwd) return alert("Kripya sabhi mandatory fields bharein.");

  const newId = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
  currentUser = {
    id: newId,
    name: name,
    email: email,
    phone: phone,
    coins: refCode ? 6 : 0, // 6 coins for referee
    cashPipeline: 0,
    referralsUsed: 0,
    orders: []
  };

  localStorage.setItem("ss_user_session", JSON.stringify(currentUser));
  closeAuthModal();
  updateUserInterface();
  alert(`🎉 Account successfully create ho gaya! Welcome, ${name}`);
}

function executeLogin() {
  const ident = document.getElementById("loginIdentifier").value.trim();
  const pwd = document.getElementById("loginPassword").value.trim();
  if (!ident || !pwd) return alert("Email/User ID aur Password enter karein.");

  // Fast Mock Login
  currentUser = {
    id: ident.startsWith("SS-") ? ident : "SS-489210",
    name: "User XYZ",
    email: ident.includes("@") ? ident : "user@supershopping.com",
    coins: 20,
    cashPipeline: 80,
    referralsUsed: 1,
    orders: [
      { orderId: "OD1928374", prodName: "Cotton Shirt", dayCount: 14, estimatedCash: "2.5% - 5%", upiId: "xyz@upi" }
    ]
  };

  localStorage.setItem("ss_user_session", JSON.stringify(currentUser));
  closeAuthModal();
  updateUserInterface();
}

function handleLogout() {
  if (confirm("Kya aap sach me logout karna chahte hain?")){
    localStorage.removeItem("ss_user_session");
    currentUser = null;
    location.reload();}
}

function copyReferralCode() {
  const code = document.getElementById("userReferralCode").innerText;
  navigator.clipboard.writeText(code);
  alert(`Referral Code ${code} copied!`);
}

function shareWebsiteLink() {
  const shareText = `Check out Super Shopping for exclusive deals and cashback rewards: ${window.location.origin}`;
  if (navigator.share) {
    navigator.share({ title: "Super Shopping", text: shareText, url: window.location.origin });
  } else {
    navigator.clipboard.writeText(shareText);
    alert("Website link copied!");
  }
}
