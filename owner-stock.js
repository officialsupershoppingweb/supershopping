/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: STOCK MODULE (FULL COMPLETE ENGINE)
   ========================================================================== */

(function () {
  'use strict';

  // 1. MASTER CATEGORIES STORE
  function getMasterCategories() {
    const defaultCats = [
      { major: "FASHION & APPAREL", head: "Men's Wear", sub: "Men Tops, Bottoms & Ethnic" },
      { major: "FASHION & APPAREL", head: "Women's Ethnic & Western", sub: "Sarees, Kurtis & Dresses" },
      { major: "FASHION & APPAREL", head: "Female Specialized & Lingerie", sub: "Intimates & Sleepwear" },
      { major: "FASHION & APPAREL", head: "Kids & Infants", sub: "Age-Wise Clothing" },
      { major: "FOOTWEAR & ACCESSORIES", head: "Footwear (All)", sub: "Sports, Formal, Heels & Daily" },
      { major: "FOOTWEAR & ACCESSORIES", head: "Watches & Smart Bands", sub: "Analog & Smartwatches" },
      { major: "FOOTWEAR & ACCESSORIES", head: "Eyewear & Sunglasses", sub: "Computer Glasses & Frames" },
      { major: "FOOTWEAR & ACCESSORIES", head: "Bags, Luggage & Wallets", sub: "Trolleys, Backpacks & Wallets" },
      { major: "ELECTRONICS & GADGETS", head: "Mobiles & Tablets", sub: "Smartphones & 5G Pads" },
      { major: "ELECTRONICS & GADGETS", head: "Audio & Mobile Tech", sub: "Earbuds TWS, Cables & Powerbanks" },
      { major: "ELECTRONICS & GADGETS", head: "Computing & Desk Tech", sub: "Laptops, Mice & Keyboards" },
      { major: "ELECTRONICS & GADGETS", head: "Smart Home & Appliances", sub: "Smart TVs, Trimmers & Kettles" },
      { major: "BEAUTY & COSMETICS", head: "Skincare & Face Care", sub: "Face Wash, Serums & Sunscreen" },
      { major: "BEAUTY & COSMETICS", head: "Color Cosmetics & Makeup", sub: "Lipsticks, Foundations & Eyeliners" },
      { major: "BEAUTY & COSMETICS", head: "Female Hygiene & Wellness", sub: "Pads & Personal Care" },
      { major: "BEAUTY & COSMETICS", head: "Hair Care & Fragrances", sub: "Shampoos, Hair Oils & Perfumes" },
      { major: "GROCERY & SUPERMARKET", head: "Daily Staples & Cooking", sub: "Atta, Rice, Oils & Spices" },
      { major: "GROCERY & SUPERMARKET", head: "Snacks, Beverages & Drinks", sub: "Tea, Coffee, Dry Fruits" },
      { major: "GROCERY & SUPERMARKET", head: "Household Cleaning & Laundry", sub: "Detergents & Surface Cleaners" },
      { major: "HOME DECOR & SPIRITUAL", head: "Spiritual, Murti & Frames", sub: "Brass/Resin Idols & Photo Frames" },
      { major: "HOME DECOR & SPIRITUAL", head: "Wall Decor, Stickers & Art", sub: "Wall Stickers, Clocks & Paintings" },
      { major: "HOME DECOR & SPIRITUAL", head: "Mirrors & Ambient Lighting", sub: "LED Mirrors & Fairy String Lights" },
      { major: "FURNITURE & STUDY SETUP", head: "Study & Work-From-Home", sub: "Study Tables, Laptop Desks & Chairs" },
      { major: "FURNITURE & STUDY SETUP", head: "Living & Bedroom Furniture", sub: "Shoe Racks, Coffee Tables & Bedside" },
      { major: "FURNITURE & STUDY SETUP", head: "Home Furnishings", sub: "Bedsheets, Curtains & Pillows" },
      { major: "VALUE COMBOS & HAMPERS", head: "Gift & Multi-Item Combos", sub: "Grooming Combos & Festival Hampers" },
      { major: "DIGITAL & EDUCATION", head: "Academic & Career Notes", sub: "Commerce Notes, CBSE Guides & B.Com" }
    ];
    try {
      const raw = localStorage.getItem('ss_master_categories');
      return raw ? JSON.parse(raw) : defaultCats;
    } catch (e) {
      return defaultCats;
    }
  }

  function saveMasterCategories(cats) {
    try {
      localStorage.setItem('ss_master_categories', JSON.stringify(cats));
    } catch (e) {}
  }

  // 2. PRODUCT STORE (ZERO DUMMY DATA PURGE)
  function getStockStore() {
    try {
      let raw = localStorage.getItem('ss_owner_products');
      if (!raw) return [];
      let items = JSON.parse(raw);
      const clean = items.filter(i => i.id !== 'PRD-101' && i.id !== 'PRD-102' && i.id !== 'PRD-103' && i.salePrice !== undefined);
      if (clean.length !== items.length) {
        localStorage.setItem('ss_owner_products', JSON.stringify(clean));
      }
      return clean;
    } catch (e) {
      return [];
    }
  }

  function saveStockStore(data) {
    try {
      localStorage.setItem('ss_owner_products', JSON.stringify(data));
    } catch (e) {}
  }

  // 3. EBOOK STORE
  function getEbookStore() {
    try {
      const raw = localStorage.getItem('ss_owner_ebooks');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveEbookStore(data) {
    try {
      localStorage.setItem('ss_owner_ebooks', JSON.stringify(data));
    } catch (e) {}
  }

  // Temporary State
  let uploadedProductPhotos = [];
  let uploadedCoverPhotos = [];
  let uploadedContentPhotos = [];
  let uploadedEbookPdfName = null;

  window.initOwnerStock = function () {
    const container = document.getElementById('view-stock');
    if (!container) return;

    function pushScreenState(screenName) {
      history.pushState({ stockScreen: screenName }, '', `#stock-${screenName}`);
    }

    window.onpopstate = function (event) {
      if (!event.state || !event.state.stockScreen) {
        renderLevel1(false);
      } else {
        const s = event.state.stockScreen;
        if (s === 'lvl1') renderLevel1(false);
        else if (s === 'product-hub') renderProductHub(false);
        else if (s === 'stock-add') renderStockAdd(false);
        else if (s === 'stock-remove') renderStockRemove(false);
        else if (s === 'inventory-mgmt') renderInventoryMgmt(false);
        else if (s === 'ebook-hub') renderEbookHub(false);
        else if (s === 'ebook-add') renderEbookAdd(false);
        else if (s === 'ebook-edit') renderEbookEdit(false);
      }
    };

    // ==========================================
    // SCREEN 1: LEVEL 1 (2 BADE BUTTONS)
    // ==========================================
    function renderLevel1(pushState = true) {
      if (pushState) pushScreenState('lvl1');

      container.innerHTML = `
        <div style="min-height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; padding: 20px 10px;">
          <button type="button" id="btnGoProductHub" class="stock-square-card" style="width: 260px; height: 180px; background: #0284c7; border: none; border-radius: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; cursor: pointer; box-shadow: 0 16px 32px rgba(2, 132, 199, 0.28); transition: transform 0.2s;">
            <span style="font-size: 44px;">📦</span>
            <span style="font-size: 20px; font-weight: 800; color: #ffffff;">Product Add</span>
          </button>

          <button type="button" id="btnGoEbookHub" class="stock-square-card" style="width: 260px; height: 180px; background: #0284c7; border: none; border-radius: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; cursor: pointer; box-shadow: 0 16px 32px rgba(2, 132, 199, 0.28); transition: transform 0.2s;">
            <span style="font-size: 44px;">📚</span>
            <span style="font-size: 20px; font-weight: 800; color: #ffffff;">Ebook Add</span>
          </button>
        </div>
      `;

      document.getElementById('btnGoProductHub').onclick = () => renderProductHub(true);
      document.getElementById('btnGoEbookHub').onclick = () => renderEbookHub(true);
    }

    // ==========================================
    // SCREEN 2: PRODUCT ADD (3 BADE BUTTONS)
    // ==========================================
    function renderProductHub(pushState = true) {
      if (pushState) pushScreenState('product-hub');

      container.innerHTML = `
        <div style="padding: 10px 0;">
          <div style="background: #ffffff; border: 2px solid #3b2219; border-radius: 12px; padding: 8px 16px; margin: 0 auto 24px auto; width: fit-content; box-shadow: 0 4px 10px rgba(59, 34, 25, 0.08);">
            <h3 style="font-size: 16px; font-weight: 900; color: #3b2219; letter-spacing: 1px; margin: 0; text-transform: uppercase;">PRODUCT ADD</h3>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
              <button type="button" id="btnGoStockAdd" class="stock-square-card" style="width: 160px; height: 160px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
                <span style="font-size: 32px;">➕</span>
                <span style="font-size: 15px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">STOCK<br/>ADD</span>
              </button>

              <button type="button" id="btnGoStockRemove" class="stock-square-card" style="width: 160px; height: 160px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
                <span style="font-size: 32px;">🗑️</span>
                <span style="font-size: 15px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">STOCK<br/>REMOVE</span>
              </button>
            </div>

            <button type="button" id="btnGoInventoryMgmt" class="stock-square-card" style="width: 220px; height: 150px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 32px;">📊</span>
              <span style="font-size: 15px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">INVENTORY<br/>MANAGEMENT</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnGoStockAdd').onclick = () => renderStockAdd(true);
      document.getElementById('btnGoStockRemove').onclick = () => renderStockRemove(true);
      document.getElementById('btnGoInventoryMgmt').onclick = () => renderInventoryMgmt(true);
    }

    // ==========================================
    // SCREEN 3: A. STOCK ADD (FORM + AUDIT LOCK)
    // ==========================================
    function renderStockAdd(pushState = true) {
      if (pushState) pushScreenState('stock-add');
      uploadedProductPhotos = [];
      const masterCats = getMasterCategories();

      container.innerHTML = `
        <div class="f-card" style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 14px; text-transform: uppercase;">A. Stock Add Portal</h3>

          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">⚡ Smart Auto-Scraper & AI Auto-Fill</label>
            <div style="display: flex; gap: 8px; margin-top: 6px;">
              <input type="url" id="inpDealUrl" placeholder="Paste Amazon, Flipkart, Myntra product link..." style="flex:1; background:#fbf8f3; border:1px solid #dfcfbc; padding:8px 10px; border-radius:6px; font-size:12.5px; color:#2b1810;" />
              <button type="button" class="btn-action-sm btn-gold" id="btnScrapeAi" style="padding: 8px 12px;">Fetch AI</button>
            </div>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Product Title / Name *</label>
            <input type="text" id="inpTitle" placeholder="e.g., Men Slim Fit Denim Jeans" style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:9px; border-radius:6px; font-size:13px; color:#2b1810;" />
          </div>

          <div style="margin-bottom: 12px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Short Description / Policy Line</label>
            <input type="text" id="inpDesc" placeholder="e.g., 100% Original Brand item. 7-day return policy by store." style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:9px; border-radius:6px; font-size:13px; color:#2b1810;" />
          </div>

          <!-- Category Allocation: 3 Boxes + Dropdown -->
          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
            <div style="font-size: 12px; font-weight: 800; color: #3b2219; margin-bottom: 8px;">Master Category Allocation *</div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 10px;">
              <div>
                <label style="font-size: 11px; font-weight: 700; color: #785a46;">Major Head</label>
                <input type="text" id="inpCustomMajor" placeholder="e.g., FASHION & APPAREL" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:7px; border-radius:6px; font-size:12px; color:#2b1810;" />
              </div>
              <div>
                <label style="font-size: 11px; font-weight: 700; color: #785a46;">Head (Department)</label>
                <input type="text" id="inpCustomHead" placeholder="e.g., Men's Wear" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:7px; border-radius:6px; font-size:12px; color:#2b1810;" />
              </div>
              <div>
                <label style="font-size: 11px; font-weight: 700; color: #785a46;">Sub Head</label>
                <input type="text" id="inpCustomSub" placeholder="e.g., Tops, Bottoms & Ethnic" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:7px; border-radius:6px; font-size:12px; color:#2b1810;" />
              </div>
            </div>

            <label style="font-size: 11px; font-weight: 700; color: #785a46;">OR Select from Already Saved Categories:</label>
            <select id="selCategory" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; color:#2b1810; margin-top:4px;">
              <option value="">-- Choose Existing Category --</option>
              ${masterCats.map((c, i) => `
                <option value="${i}">[${c.major}] ${c.head} ➔ ${c.sub}</option>
              `).join('')}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 12px;">
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #785a46;">Sale Price (₹) *</label>
              <input type="number" id="inpSale" placeholder="499" style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:13px; color:#2b1810;" />
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #785a46;">MRP Strike (₹) *</label>
              <input type="number" id="inpMrp" placeholder="1299" style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:13px; color:#2b1810;" />
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #785a46;">Calculated Discount</label>
              <input type="text" id="inpDiscount" readonly placeholder="0% OFF" style="width:100%; background:#f0e6d8; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; font-weight:800; color:#2d6a4f;" />
            </div>
          </div>

          <!-- Multi-Photo Gallery Upload -->
          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Gallery Images (Min 3, Max 14 Photos) *</label>
              <span id="txtPhotoCount" style="font-size: 11px; font-weight: 700; color: #a82020;">0 / 14 selected (Minimum 3 required)</span>
            </div>

            <input type="file" id="inpSinglePhotoPicker" accept="image/*" style="display:none;" />
            <button type="button" class="btn-action-sm btn-blue" id="btnPickPhoto" style="padding: 8px 14px; margin-bottom: 10px;">
              📷 + Add Photo from Gallery
            </button>

            <div id="galleryPreviewBox" style="display: flex; gap: 10px; flex-wrap: wrap;"></div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
            <div>
              <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Merchant Store</label>
              <select id="selStoreName" style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12.5px; color:#2b1810;">
                <option value="Amazon">Amazon</option>
                <option value="Flipkart">Flipkart</option>
                <option value="Myntra">Myntra</option>
                <option value="Ajio">Ajio</option>
                <option value="Other Store">Other Store</option>
              </select>
            </div>
            <div>
              <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Affiliate Buy Link *</label>
              <input type="url" id="inpAffLink" placeholder="https://amzn.to/..." style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12.5px; color:#2b1810;" />
            </div>
          </div>

          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:8px; padding:12px; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:12px; font-weight:700; color:#3b2219;">Has Dynamic Variants / Sizes?</span>
              <input type="checkbox" id="chkVariants" style="transform: scale(1.3); cursor:pointer;" />
            </div>
            <div id="boxVariantsInput" style="display:none; margin-top:8px;">
              <label style="font-size:11px; color:#785a46;">Size / Volume Chips (Comma separated)</label>
              <input type="text" id="inpVariantsList" placeholder="e.g., 28, 30, 32, 34 OR S, M, L, XL" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:7px; border-radius:6px; font-size:12px; color:#2b1810;" />
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px; margin-top:10px;">
              <div>
                <label style="font-size:11px; color:#785a46;">Rating (⭐)</label>
                <input type="text" id="inpRating" value="4.2" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:12px;" />
              </div>
              <div>
                <label style="font-size:11px; color:#785a46;">Reviews Count</label>
                <input type="text" id="inpReviews" value="150+ reviews" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:12px;" />
              </div>
              <div>
                <label style="font-size:11px; color:#785a46;">Deal Badge</label>
                <select id="selDealBadge" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:12px;">
                  <option value="🔥 Hot Deal">🔥 Hot Deal</option>
                  <option value="⚡ Limited Time">⚡ Limited Time</option>
                  <option value="⭐ Best Seller">⭐ Best Seller</option>
                  <option value="None">None</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Staff Audit Identity Barrier -->
          <div style="background: #fbf8f3; border: 1.5px dashed #6b3e26; border-radius: 10px; padding: 12px; margin-bottom: 16px;">
            <div style="font-size: 12px; font-weight: 800; color: #6b3e26; margin-bottom: 6px;">🔒 Staff Audit Lock (Mandatory to Enable Publish)</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
              <input type="text" id="inpStaffName" placeholder="Staff Name *" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; color:#2b1810;" />
              <input type="text" id="inpStaffUid" placeholder="User ID (MEM-...) *" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; color:#2b1810;" />
              <input type="password" id="inpStaffAccess" placeholder="Access ID Key *" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; color:#2b1810;" />
            </div>
          </div>

          <button type="button" class="btn-action-sm btn-green" id="btnPublishProduct" disabled style="width: 100%; padding: 14px; font-size: 15px; font-weight: 800; justify-content: center; opacity: 0.5; cursor: not-allowed;">
            Publish Product to Customer Portal ⚡
          </button>
        </div>
      `;

      // Category Sync
      const selCat = document.getElementById('selCategory');
      const inMaj = document.getElementById('inpCustomMajor');
      const inHd = document.getElementById('inpCustomHead');
      const inSub = document.getElementById('inpCustomSub');

      selCat.onchange = function () {
        if (this.value !== "") {
          const item = masterCats[Number(this.value)];
          inMaj.value = item.major;
          inHd.value = item.head;
          inSub.value = item.sub;
        }
      };

      // Discount Calc
      const saleInp = document.getElementById('inpSale');
      const mrpInp = document.getElementById('inpMrp');
      const discInp = document.getElementById('inpDiscount');

      function calcDisc() {
        const s = Number(saleInp.value) || 0;
        const m = Number(mrpInp.value) || 0;
        if (m > 0 && s > 0 && m >= s) {
          const pct = Math.round(((m - s) / m) * 100);
          discInp.value = `${pct}% OFF`;
        } else {
          discInp.value = `0% OFF`;
        }
      }
      saleInp.oninput = calcDisc;
      mrpInp.oninput = calcDisc;

      const chkVar = document.getElementById('chkVariants');
      const boxVar = document.getElementById('boxVariantsInput');
      chkVar.onchange = () => { boxVar.style.display = chkVar.checked ? 'block' : 'none'; };

      // Photo Picker Engine
      const photoPicker = document.getElementById('inpSinglePhotoPicker');
      const btnPick = document.getElementById('btnPickPhoto');
      const countTxt = document.getElementById('txtPhotoCount');
      const previewBox = document.getElementById('galleryPreviewBox');

      btnPick.onclick = () => {
        if (uploadedProductPhotos.length >= 14) {
          alert('Maximum 14 photos limit reached.');
          return;
        }
        photoPicker.value = '';
        photoPicker.click();
      };

      photoPicker.onchange = function () {
        if (this.files && this.files[0]) {
          uploadedProductPhotos.push(URL.createObjectURL(this.files[0]));
          renderPhotos();
        }
      };

      function renderPhotos() {
        previewBox.innerHTML = '';
        const count = uploadedProductPhotos.length;
        countTxt.textContent = `${count} / 14 selected ${count >= 3 ? '(✓ Valid)' : '(Minimum 3 required)'}`;
        countTxt.style.color = count >= 3 ? '#2d6a4f' : '#a82020';

        uploadedProductPhotos.forEach((src, idx) => {
          const wrap = document.createElement('div');
          wrap.style.cssText = 'position:relative; width:75px; height:75px; border-radius:8px; overflow:hidden; border:2px solid #dfcfbc;';
          wrap.innerHTML = `
            <img src="${src}" style="width:100%; height:100%; object-fit:cover;" />
            <button type="button" style="position:absolute; top:2px; right:2px; background:rgba(168,32,32,0.85); color:#fff; border:none; border-radius:50%; width:18px; height:18px; font-size:11px; cursor:pointer;">✕</button>
          `;
          wrap.querySelector('button').onclick = () => {
            uploadedProductPhotos.splice(idx, 1);
            renderPhotos();
          };
          previewBox.appendChild(wrap);
        });
        checkProductPublish();
      }

      document.getElementById('btnScrapeAi').onclick = () => {
        const url = document.getElementById('inpDealUrl').value.trim();
        if (!url) {
          alert('Please paste a deal link first.');
          return;
        }
        document.getElementById('inpAffLink').value = url;
        alert('Product Link Mapped! Enter Details and Add Photos.');
      };

      // Staff Auth Unlocker
      const sName = document.getElementById('inpStaffName');
      const sUid = document.getElementById('inpStaffUid');
      const sAcc = document.getElementById('inpStaffAccess');
      const pubBtn = document.getElementById('btnPublishProduct');

      function checkProductPublish() {
        const ready = sName.value.trim() && sUid.value.trim() && sAcc.value.trim() && uploadedProductPhotos.length >= 3;
        pubBtn.disabled = !ready;
        pubBtn.style.opacity = ready ? '1' : '0.5';
        pubBtn.style.cursor = ready ? 'pointer' : 'not-allowed';
      }

      sName.oninput = checkProductPublish;
      sUid.oninput = checkProductPublish;
      sAcc.oninput = checkProductPublish;

      pubBtn.onclick = () => {
        const title = document.getElementById('inpTitle').value.trim();
        const sale = document.getElementById('inpSale').value.trim();
        const mrp = document.getElementById('inpMrp').value.trim();
        const aff = document.getElementById('inpAffLink').value.trim();
        const major = inMaj.value.trim();
        const head = inHd.value.trim();
        const sub = inSub.value.trim();

        if (!title || !sale || !mrp || !aff || !major || !head || !sub) {
          alert('Please fill all mandatory fields including Major Head, Head, and Sub Head.');
          return;
        }

        const currentCats = getMasterCategories();
        const exists = currentCats.some(c => c.major.toLowerCase() === major.toLowerCase() && c.head.toLowerCase() === head.toLowerCase() && c.sub.toLowerCase() === sub.toLowerCase());
        if (!exists) {
          currentCats.push({ major, head, sub });
          saveMasterCategories(currentCats);
        }

        const store = getStockStore();
        const newProduct = {
          id: `PRD-${100 + store.length + 1}`,
          title,
          category: `[${major}] ${head} ➔ ${sub}`,
          salePrice: Number(sale),
          mrpPrice: Number(mrp),
          discount: discInp.value,
          merchant: document.getElementById('selStoreName').value,
          affLink: aff,
          status: 'active',
          variants: chkVar.checked ? document.getElementById('inpVariantsList').value : 'Standard',
          rating: document.getElementById('inpRating').value,
          dealBadge: document.getElementById('selDealBadge').value,
          publishedBy: `${sName.value.trim()} (${sUid.value.trim()})`,
          accessKey: sAcc.value.trim(),
          datePublished: new Date().toLocaleString()
        };

        store.unshift(newProduct);
        saveStockStore(store);

        alert(`Success! Product #${newProduct.id} published to customer portal.`);
        renderProductHub(false);
      };
    }

    // ==========================================
    // SCREEN 4: B. STOCK REMOVE (ZERO DUMMY)
    // ==========================================
    function renderStockRemove(pushState = true) {
      if (pushState) pushScreenState('stock-remove');
      const store = getStockStore();

      container.innerHTML = `
        <div class="f-card" style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px; text-transform: uppercase;">B. Stock Remove & Status Control</h3>

          <div style="margin-bottom: 16px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Search by Product Link, Name or ID</label>
            <input type="text" id="inpSearchDeals" placeholder="Paste product link or type name..." style="width:100%; background:#ffffff; border:1.5px solid #dfcfbc; padding:10px; border-radius:8px; font-size:13px; color:#2b1810;" />
          </div>

          <div style="background: #ffffff; border: 1px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 16px;">
            <div style="font-size: 12px; font-weight: 800; color: #3b2219; margin-bottom: 4px;">Live Catalog Summary:</div>
            <div id="categorySummaryStrip" style="font-size: 12px; color: #785a46;">Total Real Products: <b>${store.length}</b></div>
          </div>

          <div style="background: #fbf8f3; border: 1.5px dashed #6b3e26; border-radius: 8px; padding: 10px; margin-bottom: 14px;">
            <div style="font-size: 11.5px; font-weight: 800; color: #6b3e26; margin-bottom: 4px;">Staff Edit Verification (Mandatory for Status Change)</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
              <input type="text" id="inpEditStaffName" placeholder="Editor Name" style="background:#ffffff; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:11.5px;" />
              <input type="text" id="inpEditStaffUid" placeholder="User ID" style="background:#ffffff; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:11.5px;" />
              <input type="password" id="inpEditStaffAccess" placeholder="Access ID Key" style="background:#ffffff; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:11.5px;" />
            </div>
          </div>

          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Merchant</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="tblStockRemoveBody"></tbody>
            </table>
          </div>
        </div>
      `;

      function drawTable(filterText = '') {
        const tbody = document.getElementById('tblStockRemoveBody');
        let list = getStockStore();

        if (filterText) {
          list = list.filter(p => (p.title + p.id + p.affLink).toLowerCase().includes(filterText.toLowerCase()));
        }

        if (list.length === 0) {
          tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:#785a46; font-weight:600;">No live products found in catalog. Add a deal in Stock Add to view here.</td></tr>`;
          return;
        }

        tbody.innerHTML = list.map((item, idx) => `
          <tr>
            <td><b style="color:#0284c7;">${item.id}</b></td>
            <td><b>${item.title}</b></td>
            <td>₹${item.salePrice}</td>
            <td>${item.merchant}</td>
            <td>
              <span class="status-badge ${item.status === 'active' ? 'badge-active' : 'badge-pending'}">${item.status === 'active' ? 'ACTIVE / LIVE' : 'OUT OF STOCK / PAUSED'}</span>
            </td>
            <td>
              <button type="button" class="btn-action-sm ${item.status === 'active' ? 'btn-red' : 'btn-green'} btn-toggle-deal" data-idx="${idx}">
                ${item.status === 'active' ? 'Pause Deal' : 'Make Live'}
              </button>
            </td>
          </tr>
        `).join('');

        tbody.querySelectorAll('.btn-toggle-deal').forEach(btn => {
          btn.onclick = function () {
            const edName = document.getElementById('inpEditStaffName').value.trim();
            const edUid = document.getElementById('inpEditStaffUid').value.trim();
            const edAcc = document.getElementById('inpEditStaffAccess').value.trim();

            if (!edName || !edUid || !edAcc) {
              alert('Security Halt: Editor Name, User ID, and Access ID are mandatory to change product status.');
              return;
            }

            const targetIdx = Number(this.getAttribute('data-idx'));
            const all = getStockStore();
            all[targetIdx].status = all[targetIdx].status === 'active' ? 'paused' : 'active';
            saveStockStore(all);
            drawTable(filterText);
          };
        });
      }

      document.getElementById('inpSearchDeals').oninput = function () {
        drawTable(this.value.trim());
      };

      drawTable();
    }

     // ==========================================
    // SCREEN 5: C. INVENTORY MANAGEMENT
    // ==========================================
    function renderInventoryMgmt(pushState = true) {
      if (pushState) pushScreenState('inventory-mgmt');
      const cats = getMasterCategories();

      container.innerHTML = `
        <div class="f-card" style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px; text-transform: uppercase;">C. Master Inventory & Category Management</h3>
          <p style="font-size: 12.5px; color: #785a46; margin-bottom: 14px;">Define major heads, sub heads, and allocate products.</p>

          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 800; color: #3b2219; margin-bottom: 8px;">➕ Create Custom Category Head</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 10px;">
              <input type="text" id="inpNewMajor" placeholder="Major Division" style="background:#fbf8f3; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px;" />
              <input type="text" id="inpNewHead" placeholder="Head / Department" style="background:#fbf8f3; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px;" />
              <input type="text" id="inpNewSub" placeholder="Sub Head Line Item" style="background:#fbf8f3; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px;" />
            </div>
            <button type="button" class="btn-action-sm btn-green" id="btnSaveCustomHead" style="padding: 8px 14px;">Save to Master Categories ✓</button>
          </div>

          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Major Head</th>
                  <th>Head (Department)</th>
                  <th>Sub Head</th>
                </tr>
              </thead>
              <tbody id="tblCategoryMasterBody">
                ${cats.map((m, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td><b>${m.major}</b></td>
                    <td>${m.head}</td>
                    <td><span style="color:#0284c7;">${m.sub}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      document.getElementById('btnSaveCustomHead').onclick = () => {
        const maj = document.getElementById('inpNewMajor').value.trim();
        const hd = document.getElementById('inpNewHead').value.trim();
        const sb = document.getElementById('inpNewSub').value.trim();

        if (!maj || !hd || !sb) {
          alert('Please enter Major, Head, and Sub Head.');
          return;
        }

        cats.push({ major: maj, head: hd, sub: sb });
        saveMasterCategories(cats);
        alert(`New Category Added: ${maj} > ${hd} > ${sb}`);
        renderInventoryMgmt(false);
      };
    }

    // ==========================================
    // SCREEN 6: EBOOK ADD (2 BADE BUTTONS)
    // ==========================================
    function renderEbookHub(pushState = true) {
      if (pushState) pushScreenState('ebook-hub');

      container.innerHTML = `
        <div style="padding: 10px 0;">
          <div style="background: #ffffff; border: 2px solid #3b2219; border-radius: 12px; padding: 8px 16px; margin: 0 auto 24px auto; width: fit-content; box-shadow: 0 4px 10px rgba(59, 34, 25, 0.08);">
            <h3 style="font-size: 16px; font-weight: 900; color: #3b2219; letter-spacing: 1px; margin: 0; text-transform: uppercase;">EBOOK CATALOG</h3>
          </div>

          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button type="button" id="btnGoEbookAdd" class="stock-square-card" style="width: 170px; height: 170px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 36px;">➕</span>
              <span style="font-size: 16px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">ADD<br/>EBOOK</span>
            </button>

            <button type="button" id="btnGoEbookEdit" class="stock-square-card" style="width: 170px; height: 170px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 36px;">⚙️</span>
              <span style="font-size: 16px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">REMOVE / EDIT<br/>EBOOK</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnGoEbookAdd').onclick = () => renderEbookAdd(true);
      document.getElementById('btnGoEbookEdit').onclick = () => renderEbookEdit(true);
    }

    // ==========================================
    // SCREEN 7: 1. ADD EBOOK (COVERS, CONTENT, COIN/CASH, PDF & LOCK)
    // ==========================================
    function renderEbookAdd(pushState = true) {
      if (pushState) pushScreenState('ebook-add');

      const masterCats = getMasterCategories();
      uploadedCoverPhotos = [];
      uploadedContentPhotos = [];
      uploadedEbookPdfName = null;

      container.innerHTML = `
        <div class="f-card" style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 14px; text-transform: uppercase;">1. Add New E-Book</h3>

          <div style="margin-bottom: 12px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Product Title / Book Name *</label>
            <input type="text" id="inpEbTitle" placeholder="e.g., Class 12 Business Studies with Case Studies" style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:9px; border-radius:6px; font-size:13px; color:#2b1810;" />
          </div>

          <!-- Category (3 Inputs + Dropdown) -->
          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
            <div style="font-size: 12px; font-weight: 800; color: #3b2219; margin-bottom: 8px;">E-Book Category Allocation *</div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 10px;">
              <div>
                <label style="font-size: 11px; font-weight: 700; color: #785a46;">Major Head</label>
                <input type="text" id="inpEbMajor" placeholder="e.g., DIGITAL & EDUCATION" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:7px; border-radius:6px; font-size:12px; color:#2b1810;" />
              </div>
              <div>
                <label style="font-size: 11px; font-weight: 700; color: #785a46;">Head (Department)</label>
                <input type="text" id="inpEbHead" placeholder="e.g., Class 11-12 Commerce" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:7px; border-radius:6px; font-size:12px; color:#2b1810;" />
              </div>
              <div>
                <label style="font-size: 11px; font-weight: 700; color: #785a46;">Sub Head</label>
                <input type="text" id="inpEbSub" placeholder="e.g., Business Studies Guides" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:7px; border-radius:6px; font-size:12px; color:#2b1810;" />
              </div>
            </div>

            <label style="font-size: 11px; font-weight: 700; color: #785a46;">OR Select from Saved Categories:</label>
            <select id="selEbCategory" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; color:#2b1810; margin-top:4px;">
              <option value="">-- Choose Existing Category --</option>
              ${masterCats.map((c, i) => `
                <option value="${i}">[${c.major}] ${c.head} ➔${c.sub}</option>
              `).join('')}
            </select>
          </div>

          <!-- Price Choice (Cash vs Coins) -->
          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
            <label style="font-size: 12px; font-weight: 800; color: #3b2219; margin-bottom: 8px; display:block;">Pricing Method (Choose Cash or Green Coin) *</label>
            <div style="display: flex; gap: 20px; margin-bottom: 10px;">
              <label style="font-size: 12.5px; font-weight: 700; color: #2b1810; display:flex; align-items:center; gap:6px; cursor:pointer;">
                <input type="radio" name="ebPriceType" value="cash" checked style="transform: scale(1.2);" /> Real Price (₹)
              </label>
              <label style="font-size: 12.5px; font-weight: 700; color: #2d6a4f; display:flex; align-items:center; gap:6px; cursor:pointer;">
                <input type="radio" name="ebPriceType" value="coins" style="transform: scale(1.2);" /> Green Coins
              </label>
            </div>
            <div>
              <input type="number" id="inpEbPriceValue" placeholder="Enter Cash Price in ₹ (e.g., 49)" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:9px; border-radius:6px; font-size:13px; color:#2b1810;" />
            </div>
          </div>

          <!-- Cover Photos (Min 2, Max 4) -->
          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">E-Book Front/Back Cover Photos (Min 2, Max 4) *</label>
              <span id="txtCoverCount" style="font-size: 11px; font-weight: 700; color: #a82020;">0 / 4 selected (Min 2 required)</span>
            </div>
            <input type="file" id="inpCoverPicker" accept="image/*" style="display:none;" />
            <button type="button" class="btn-action-sm btn-blue" id="btnPickCover" style="padding: 7px 12px; margin-bottom: 8px;">
              📷 + Add Cover Photo
            </button>
            <div id="coverPreviewBox" style="display: flex; gap: 8px; flex-wrap: wrap;"></div>
          </div>

          <!-- Content / Sample Pages (Min 2-3, Max 5) -->
          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Content / Sample Chapter Pages (Min 2-3, Max 5) *</label>
              <span id="txtContentCount" style="font-size: 11px; font-weight: 700; color: #a82020;">0 / 5 selected (Min 2 required)</span>
            </div>
            <input type="file" id="inpContentPicker" accept="image/*" style="display:none;" />
            <button type="button" class="btn-action-sm btn-gold" id="btnPickContent" style="padding: 7px 12px; margin-bottom: 8px;">
              📄 + Add Content Page Photo
            </button>
            <div id="contentPreviewBox" style="display: flex; gap: 8px; flex-wrap: wrap;"></div>
          </div>

          <!-- Index & Short Description -->
          <div style="margin-bottom: 14px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Index & Content Short Description *</label>
            <textarea id="inpEbDesc" rows="3" placeholder="Overview of index chapters, formula sheets, assertion-reason topics..." style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:9px; border-radius:6px; font-size:12px; color:#2b1810;"></textarea>
          </div>

          <!-- PDF Document Direct Upload -->
          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46; display:block; margin-bottom:6px;">Upload Full E-Book PDF Document *</label>
            <input type="file" id="inpPdfFile" accept="application/pdf" style="width:100%; font-size:12px; color:#2b1810;" />
            <span id="txtPdfStatus" style="font-size: 11px; color:#6b3e26; display:block; margin-top:4px;">No PDF attached yet.</span>
          </div>

          <!-- Staff Identity Validation Lock -->
          <div style="background: #fbf8f3; border: 1.5px dashed #6b3e26; border-radius: 10px; padding: 12px; margin-bottom: 16px;">
            <div style="font-size: 12px; font-weight: 800; color: #6b3e26; margin-bottom: 6px;">🔒 Staff Audit Lock (Mandatory to Enable Publish)</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
              <input type="text" id="inpEbStaffName" placeholder="Staff Name *" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; color:#2b1810;" />
              <input type="text" id="inpEbStaffUid" placeholder="User ID (MEM-...) *" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; color:#2b1810;" />
              <input type="password" id="inpEbStaffAccess" placeholder="Access ID Key *" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; color:#2b1810;" />
            </div>
          </div>

          <!-- Final Publish Button -->
          <button type="button" class="btn-action-sm btn-green" id="btnPublishEb" disabled style="width:100%; padding:14px; font-size:15px; font-weight:800; justify-content:center; opacity:0.5; cursor:not-allowed;">
            Publish E-Book to Customer Portal 📚
          </button>
        </div>
      `;

      // Category Sync
      const selCat = document.getElementById('selEbCategory');
      const inMaj = document.getElementById('inpEbMajor');
      const inHd = document.getElementById('inpEbHead');
      const inSub = document.getElementById('inpEbSub');

      selCat.onchange = function () {
        if (this.value !== "") {
          const item = masterCats[Number(this.value)];
          inMaj.value = item.major;
          inHd.value = item.head;
          inSub.value = item.sub;
        }
      };

      // Pricing Type
      const radioCash = document.querySelector('input[name="ebPriceType"][value="cash"]');
      const radioCoins = document.querySelector('input[name="ebPriceType"][value="coins"]');
      const valInput = document.getElementById('inpEbPriceValue');

      function updatePricePlaceholder() {
        if (radioCoins.checked) {
          valInput.placeholder = "Enter Green Coins required (e.g., 50 Coins)";
        } else {
          valInput.placeholder = "Enter Cash Price in ₹ (e.g., 49)";
        }
      }
      radioCash.onchange = updatePricePlaceholder;
      radioCoins.onchange = updatePricePlaceholder;

      // Cover Picker
      const btnPickCover = document.getElementById('btnPickCover');
      const coverInput = document.getElementById('inpCoverPicker');
      const coverBox = document.getElementById('coverPreviewBox');
      const txtCover = document.getElementById('txtCoverCount');

      btnPickCover.onclick = () => {
        if (uploadedCoverPhotos.length >= 4) {
          alert('Maximum 4 Cover Photos allowed.');
          return;
        }
        coverInput.value = '';
        coverInput.click();
      };

      coverInput.onchange = function () {
        if (this.files && this.files[0]) {
          uploadedCoverPhotos.push(URL.createObjectURL(this.files[0]));
          renderCovers();
        }
      };

      function renderCovers() {
        coverBox.innerHTML = '';
        const c = uploadedCoverPhotos.length;
        txtCover.textContent = `${c} / 4 selected ${c >= 2 ? '(✓ Valid)' : '(Min 2 required)'}`;
        txtCover.style.color = c >= 2 ? '#2d6a4f' : '#a82020';

        uploadedCoverPhotos.forEach((src, idx) => {
          const w = document.createElement('div');
          w.style.cssText = 'position:relative; width:65px; height:80px; border-radius:6px; overflow:hidden; border:2px solid #dfcfbc;';
          w.innerHTML = `
            <img src="${src}" style="width:100%; height:100%; object-fit:cover;" />
            <button type="button" style="position:absolute; top:2px; right:2px; background:rgba(168,32,32,0.85); color:#fff; border:none; border-radius:50%; width:16px; height:16px; font-size:10px; cursor:pointer;">✕</button>
          `;
          w.querySelector('button').onclick = () => {
            uploadedCoverPhotos.splice(idx, 1);
            renderCovers();
          };
          coverBox.appendChild(w);
        });
        checkEbookReady();
      }

      // Content Picker
      const btnPickContent = document.getElementById('btnPickContent');
      const contentInput = document.getElementById('inpContentPicker');
      const contentBox = document.getElementById('contentPreviewBox');
      const txtContent = document.getElementById('txtContentCount');

      btnPickContent.onclick = () => {
        if (uploadedContentPhotos.length >= 5) {
          alert('Maximum 5 Content/Sample Pages allowed.');
          return;
        }
        contentInput.value = '';
        contentInput.click();
      };

      contentInput.onchange = function () {
        if (this.files && this.files[0]) {
          uploadedContentPhotos.push(URL.createObjectURL(this.files[0]));
          renderContents();
        }
      };

      function renderContents() {
        contentBox.innerHTML = '';
        const c = uploadedContentPhotos.length;
        txtContent.textContent = `${c} / 5 selected ${c >= 2 ? '(✓ Valid)' : '(Min 2 required)'}`;
        txtContent.style.color = c >= 2 ? '#2d6a4f' : '#a82020';

        uploadedContentPhotos.forEach((src, idx) => {
          const w = document.createElement('div');
          w.style.cssText = 'position:relative; width:65px; height:80px; border-radius:6px; overflow:hidden; border:2px solid #dfcfbc;';
          w.innerHTML = `
            <img src="${src}" style="width:100%; height:100%; object-fit:cover;" />
            <button type="button" style="position:absolute; top:2px; right:2px; background:rgba(168,32,32,0.85); color:#fff; border:none; border-radius:50%; width:16px; height:16px; font-size:10px; cursor:pointer;">✕</button>
          `;
          w.querySelector('button').onclick = () => {
            uploadedContentPhotos.splice(idx, 1);
            renderContents();
          };
          contentBox.appendChild(w);
        });
        checkEbookReady();
      }

      // PDF File Input
      const pdfInput = document.getElementById('inpPdfFile');
      const txtPdf = document.getElementById('txtPdfStatus');

      pdfInput.onchange = function () {
        if (this.files && this.files[0]) {
          uploadedEbookPdfName = this.files[0].name;
          txtPdf.textContent = `✓ PDF Ready: ${uploadedEbookPdfName}`;
          txtPdf.style.color = '#2d6a4f';
        } else {
          uploadedEbookPdfName = null;
          txtPdf.textContent = 'No PDF attached yet.';
          txtPdf.style.color = '#6b3e26';
        }
        checkEbookReady();
      };

      // Staff Audit Lock Validation
      const sName = document.getElementById('inpEbStaffName');
      const sUid = document.getElementById('inpEbStaffUid');
      const sAcc = document.getElementById('inpEbStaffAccess');
      const pubBtn = document.getElementById('btnPublishEb');

      function checkEbookReady() {
        const staffFilled = sName.value.trim() && sUid.value.trim() && sAcc.value.trim();
        const coversOk = uploadedCoverPhotos.length >= 2;
        const contentOk = uploadedContentPhotos.length >= 2;
        const pdfOk = uploadedEbookPdfName !== null;

        const isReady = staffFilled && coversOk && contentOk && pdfOk;
        pubBtn.disabled = !isReady;
        pubBtn.style.opacity = isReady ? '1' : '0.5';
        pubBtn.style.cursor = isReady ? 'pointer' : 'not-allowed';
      }

      sName.oninput = checkEbookReady;
      sUid.oninput = checkEbookReady;
      sAcc.oninput = checkEbookReady;

      pubBtn.onclick = () => {
        const title = document.getElementById('inpEbTitle').value.trim();
        const major = inMaj.value.trim();
        const head = inHd.value.trim();
        const sub = inSub.value.trim();
        const val = valInput.value.trim();
        const desc = document.getElementById('inpEbDesc').value.trim();

        if (!title || !major || !head || !sub || !val || !desc) {
          alert('Please fill Book Title, Categories, Price, and Index Description.');
          return;
        }

        const currentCats = getMasterCategories();
        const exists = currentCats.some(c => c.major.toLowerCase() === major.toLowerCase() && c.head.toLowerCase() === head.toLowerCase() && c.sub.toLowerCase() === sub.toLowerCase());
        if (!exists) {
          currentCats.push({ major, head, sub });
          saveMasterCategories(currentCats);
        }

        const ebooks = getEbookStore();
        ebooks.unshift({
          id: `EBK-${100 + ebooks.length + 1}`,
          title,
          category: `[${major}] ${head} ➔ ${sub}`,
          priceType: radioCoins.checked ? 'Coins' : 'INR',
          priceValue: Number(val),
          description: desc,
          coverPhotos: uploadedCoverPhotos,
          contentSamplePages: uploadedContentPhotos,
          pdfDocName: uploadedEbookPdfName,
          status: 'active',
          publishedBy: `${sName.value.trim()} (${sUid.value.trim()})`,
          accessKey: sAcc.value.trim(),
          datePublished: new Date().toLocaleString()
        });
        saveEbookStore(ebooks);

        alert(`Success! E-Book "${title}" is now published.`);
        renderEbookHub(false);
      };
    }

    // ==========================================
    // SCREEN 8: 2. REMOVE / EDIT EBOOK
    // ==========================================
    function renderEbookEdit(pushState = true) {
      if (pushState) pushScreenState('ebook-edit');
      const ebooks = getEbookStore();

      container.innerHTML = `
        <div class="f-card" style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px; text-transform: uppercase;">2. Remove / Edit E-Books</h3>

          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>E-Book ID</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="tblEbookEditBody"></tbody>
            </table>
          </div>
        </div>
      `;

      const tbody = document.getElementById('tblEbookEditBody');
      if (ebooks.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:24px; color:#785a46; font-weight:600;">No E-Books published yet.</td></tr>`;
        return;
      }

      tbody.innerHTML = ebooks.map((eb, idx) => `
        <tr>
          <td><b style="color:#0284c7;">${eb.id}</b></td>
          <td><b>${eb.title}</b></td>
          <td>${eb.priceType === 'Coins' ? eb.priceValue + ' Coins' : '₹' + eb.priceValue}</td>
          <td><span class="status-badge ${eb.status === 'active' ? 'badge-active' : 'badge-pending'}">${eb.status.toUpperCase()}</span></td>
          <td>
            <button type="button" class="btn-action-sm ${eb.status === 'active' ? 'btn-red' : 'btn-green'} btn-toggle-eb" data-idx="${idx}">
              ${eb.status === 'active' ? 'Pause' : 'Activate'}
            </button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.btn-toggle-eb').forEach(btn => {
        btn.onclick = function () {
          const idx = Number(this.getAttribute('data-idx'));
          const all = getEbookStore();
          all[idx].status = all[idx].status === 'active' ? 'paused' : 'active';
          saveEbookStore(all);
          renderEbookEdit(false);
        };
      });
    }

    renderLevel1(true);
  };
})();
