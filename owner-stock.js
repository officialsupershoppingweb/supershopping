/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: STOCK MODULE (SCREEN-BY-SCREEN ARCHITECTURE)
   ========================================================================== */

(function () {
  'use strict';

  // Master Categories Matrix (SCH-01 to SCH-09)
  const MASTER_CATEGORIES = [
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

  function getStockStore() {
    try {
      const raw = localStorage.getItem('ss_owner_products');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveStockStore(data) {
    try {
      localStorage.setItem('ss_owner_products', JSON.stringify(data));
    } catch (e) {}
  }

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

  // Gallery images temporary storage for upload session
  let uploadedPhotos = [];

  window.initOwnerStock = function () {
    const container = document.getElementById('view-stock');
    if (!container) return;

    // Browser History Handling for Natural Back Navigation
    function pushScreenState(screenName) {
      history.pushState({ stockScreen: screenName }, '', `#stock-${screenName}`);
    }

    window.onpopstate = function (event) {
      if (!event.state || !event.state.stockScreen) {
        renderLevel1();
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
    // SCREEN 1: LEVEL 1 (2 BADE SQUARE BUTTONS)
    // ==========================================
    function renderLevel1(pushState = true) {
      if (pushState) pushScreenState('lvl1');

      container.innerHTML = `
        <div style="min-height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; padding: 20px 10px;">
          <button type="button" id="btnGoProductHub" class="stock-square-card" style="width: 260px; height: 180px; background: #0284c7; border: none; border-radius: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; cursor: pointer; box-shadow: 0 16px 32px rgba(2, 132, 199, 0.28); transition: transform 0.2s;">
            <span style="font-size: 44px;">📦</span>
            <span style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">Product Add</span>
          </button>

          <button type="button" id="btnGoEbookHub" class="stock-square-card" style="width: 260px; height: 180px; background: #0284c7; border: none; border-radius: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; cursor: pointer; box-shadow: 0 16px 32px rgba(2, 132, 199, 0.28); transition: transform 0.2s;">
            <span style="font-size: 44px;">📚</span>
            <span style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">Ebook Add</span>
          </button>
        </div>
      `;

      document.getElementById('btnGoProductHub').onclick = () => renderProductHub(true);
      document.getElementById('btnGoEbookHub').onclick = () => renderEbookHub(true);
    }

    // ==========================================
    // SCREEN 2: PRODUCT ADD (3 SQUARE BUTTONS)
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
    // SCREEN 3: A. STOCK ADD (FORM WITH PHOTO EDIT & AI)
    // ==========================================
    function renderStockAdd(pushState = true) {
      if (pushState) pushScreenState('stock-add');
      uploadedPhotos = [];

      container.innerHTML = `
        <div class="f-card" style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 14px; text-transform: uppercase;">A. Stock Add Portal</h3>

          <!-- Smart Auto Scraper -->
          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">⚡ Smart Auto-Scraper & AI Auto-Fill</label>
            <div style="display: flex; gap: 8px; margin-top: 6px;">
              <input type="url" id="inpDealUrl" placeholder="Paste Amazon, Flipkart, Myntra product link..." style="flex:1; background:#fbf8f3; border:1px solid #dfcfbc; padding:8px 10px; border-radius:6px; font-size:12.5px; color:#2b1810;" />
              <button type="button" class="btn-action-sm btn-gold" id="btnScrapeAi" style="padding: 8px 12px;">Fetch AI</button>
            </div>
          </div>

          <!-- Product Identity -->
          <div style="margin-bottom: 12px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Product Title / Name *</label>
            <input type="text" id="inpTitle" placeholder="e.g., Men Slim Fit Denim Jeans" style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:9px; border-radius:6px; font-size:13px; color:#2b1810;" />
          </div>

          <div style="margin-bottom: 12px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Short Description / Policy Line</label>
            <input type="text" id="inpDesc" placeholder="e.g., 100% Original Brand item. 7-day return policy by store." style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:9px; border-radius:6px; font-size:13px; color:#2b1810;" />
          </div>

          <!-- Master Category Dropdown -->
          <div style="margin-bottom: 12px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Master Category Allocation *</label>
            <select id="selCategory" style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:9px; border-radius:6px; font-size:12.5px; color:#2b1810;">
              ${MASTER_CATEGORIES.map(c => `
                <option value="${c.major} > ${c.head} >${c.sub}">
                  [${c.major}] ${c.head} —${c.sub}
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Pricing & Auto Discount -->
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

          <!-- Gallery Photos (Min 3, Max 14) + Edit Suite -->
          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Upload Gallery Images (Min 3, Max 14 Photos) *</label>
              <span id="txtPhotoCount" style="font-size: 11px; font-weight: 700; color: #a82020;">0 / 14 selected (Minimum 3 required)</span>
            </div>
            <input type="file" id="inpGalleryFiles" multiple accept="image/*" style="width:100%; font-size:12px; margin-bottom:8px;" />
            
            <!-- Photo Preview Grid & Live Editor -->
            <div id="galleryPreviewBox" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px;"></div>
            
            <div id="imageEditorPanel" style="display: none; background: #fbf8f3; border: 1px solid #dfcfbc; border-radius: 8px; padding: 10px; margin-top: 8px;">
              <div style="font-size: 11.5px; font-weight: 800; color: #3b2219; margin-bottom: 6px;">🎨 Adjust & Edit Selected Photo</div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button type="button" class="btn-action-sm btn-blue btn-filter" data-filter="none">Normal</button>
                <button type="button" class="btn-action-sm btn-blue btn-filter" data-filter="contrast(1.3) brightness(1.1)">Vibrant Clear</button>
                <button type="button" class="btn-action-sm btn-blue btn-filter" data-filter="grayscale(100%)">B&W</button>
                <button type="button" class="btn-action-sm btn-gold btn-filter" data-filter="sepia(60%)">Warm Retro</button>
                <button type="button" class="btn-action-sm btn-green" id="btnApplyEditor">✓ Save Photo Edits</button>
              </div>
            </div>
          </div>

          <!-- Merchant Store & Affiliate Link -->
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

          <!-- Dynamic Measurement Variants & Badges -->
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:8px; padding:12px; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:12px; font-weight:700; color:#3b2219;">Has Dynamic Variants / Sizes?</span>
              <input type="checkbox" id="chkVariants" style="transform: scale(1.3); cursor:pointer;" />
            </div>
            <div id="boxVariantsInput" style="display:none; margin-top:8px;">
              <label style="font-size:11px; color:#785a46;">Size / Volume Chips (Comma separated)</label>
              <input type="text" id="inpVariantsList" placeholder="e.g., 28, 30, 32, 34 OR S, M, L, XL OR 50ml, 100ml" style="width:100%; background:#fbf8f3; border:1px solid #dfcfbc; padding:7px; border-radius:6px; font-size:12px; color:#2b1810;" />
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

          <!-- Staff Identity Validation Lock (Publish Button remains disabled until filled) -->
          <div style="background: #fbf8f3; border: 1.5px dashed #6b3e26; border-radius: 10px; padding: 12px; margin-bottom: 16px;">
            <div style="font-size: 12px; font-weight: 800; color: #6b3e26; margin-bottom: 6px;">🔒 Staff Audit Lock (Mandatory to Enable Publish)</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
              <input type="text" id="inpStaffName" placeholder="Staff Name *" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; color:#2b1810;" />
              <input type="text" id="inpStaffUid" placeholder="User ID (MEM-...) *" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; color:#2b1810;" />
              <input type="password" id="inpStaffAccess" placeholder="Access ID Key *" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px; color:#2b1810;" />
            </div>
          </div>

          <!-- Final Publish Button -->
          <button type="button" class="btn-action-sm btn-green" id="btnPublishProduct" disabled style="width: 100%; padding: 14px; font-size: 15px; font-weight: 800; justify-content: center; opacity: 0.5; cursor: not-allowed;">
            Publish Product to Customer Portal ⚡
          </button>
        </div>
      `;

      // Discount Auto-calculator
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

      // Variants Checkbox
      const chkVar = document.getElementById('chkVariants');
      const boxVar = document.getElementById('boxVariantsInput');
      chkVar.onchange = () => { boxVar.style.display = chkVar.checked ? 'block' : 'none'; };

      // Photo upload & preview with Min 3 Max 14 limit
      const fileInp = document.getElementById('inpGalleryFiles');
      const countTxt = document.getElementById('txtPhotoCount');
      const previewBox = document.getElementById('galleryPreviewBox');
      const editorPanel = document.getElementById('imageEditorPanel');
      let activeEditingIndex = 0;

      fileInp.onchange = function () {
        const files = Array.from(this.files);
        if (files.length > 14) {
          alert('Maximum 14 photos allowed.');
          return;
        }
        uploadedPhotos = files.map(f => URL.createObjectURL(f));
        renderPreviews();
      };

      function renderPreviews() {
        previewBox.innerHTML = '';
        const count = uploadedPhotos.length;
        countTxt.textContent = `${count} / 14 selected ${count >= 3 ? '(✓ Valid)' : '(Minimum 3 required)'}`;
        countTxt.style.color = count >= 3 ? '#2d6a4f' : '#a82020';

        uploadedPhotos.forEach((src, idx) => {
          const div = document.createElement('div');
          div.style.cssText = 'position:relative; width:65px; height:65px; border-radius:8px; overflow:hidden; border:2px solid #dfcfbc; cursor:pointer;';
          div.innerHTML = `<img src="${src}" style="width:100%; height:100%; object-fit:cover;" />`;
          div.onclick = () => {
            activeEditingIndex = idx;
            editorPanel.style.display = 'block';
          };
          previewBox.appendChild(div);
        });
        checkPublishReadiness();
      }

      // Filter Adjustment Editor
      document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.onclick = function () {
          const f = this.getAttribute('data-filter');
          const imgs = previewBox.querySelectorAll('img');
          if (imgs[activeEditingIndex]) {
            imgs[activeEditingIndex].style.filter = f;
          }
        };
      });

      document.getElementById('btnApplyEditor').onclick = () => {
        editorPanel.style.display = 'none';
        alert('Photo adjustment saved for publishing.');
      };

      // AI Scraper link parse
      document.getElementById('btnScrapeAi').onclick = () => {
        const url = document.getElementById('inpDealUrl').value.trim();
        if (!url) {
          alert('Please paste a deal link first.');
          return;
        }
        document.getElementById('inpAffLink').value = url;
        alert('Product Link Mapped! Enter Title, Price and Upload Photos.');
      };

      // Staff Auth Unlocker
      const sName = document.getElementById('inpStaffName');
      const sUid = document.getElementById('inpStaffUid');
      const sAcc = document.getElementById('inpStaffAccess');
      const pubBtn = document.getElementById('btnPublishProduct');

      function checkPublishReadiness() {
        const ready = sName.value.trim() && sUid.value.trim() && sAcc.value.trim() && uploadedPhotos.length >= 3;
        pubBtn.disabled = !ready;
        pubBtn.style.opacity = ready ? '1' : '0.5';
        pubBtn.style.cursor = ready ? 'pointer' : 'not-allowed';
      }

      sName.oninput = checkPublishReadiness;
      sUid.oninput = checkPublishReadiness;
      sAcc.oninput = checkPublishReadiness;

      // Publish Action
      pubBtn.onclick = () => {
        const title = document.getElementById('inpTitle').value.trim();
        const sale = document.getElementById('inpSale').value.trim();
        const mrp = document.getElementById('inpMrp').value.trim();
        const aff = document.getElementById('inpAffLink').value.trim();

        if (!title || !sale || !mrp || !aff) {
          alert('Please fill Title, Sale Price, MRP, and Affiliate Link.');
          return;
        }

        const store = getStockStore();
        const newProduct = {
          id: `PRD-${100 + store.length + 1}`,
          title,
          category: document.getElementById('selCategory').value,
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

        // Record into Staff Work Done Ledger
        try {
          const staffStore = JSON.parse(localStorage.getItem('ss_owner_staff_store') || '{}');
          if (staffStore.assignedWork) {
            let match = staffStore.assignedWork.find(w => w.accessId === sAcc.value.trim());
            if (match) match.productsAdded = (match.productsAdded || 0) + 1;
            localStorage.setItem('ss_owner_staff_store', JSON.stringify(staffStore));
          }
        } catch (e) {}

        alert(`Success! Product #${newProduct.id} is now Live on Customer Portal.`);
        renderProductHub(false);
      };
    }

     // ==========================================
    // SCREEN 4: B. STOCK REMOVE & SEARCH HUB
    // ==========================================
    function renderStockRemove(pushState = true) {
      if (pushState) pushScreenState('stock-remove');
      const store = getStockStore();

      container.innerHTML = `
        <div class="f-card" style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px; text-transform: uppercase;">B. Stock Remove & Status Control</h3>

          <!-- Top Search Bar -->
          <div style="margin-bottom: 16px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Search by Product Link, Name or ID</label>
            <input type="text" id="inpSearchDeals" placeholder="Paste product link or type name..." style="width:100%; background:#ffffff; border:1.5px solid #dfcfbc; padding:10px; border-radius:8px; font-size:13px; color:#2b1810;" />
          </div>

          <!-- Category Counts Data Strip -->
          <div style="background: #ffffff; border: 1px solid #dfcfbc; border-radius: 10px; padding: 12px; margin-bottom: 16px;">
            <div style="font-size: 12px; font-weight: 800; color: #3b2219; margin-bottom: 6px;">Live Deals Distribution Across Categories:</div>
            <div id="categorySummaryStrip" style="font-size: 12px; color: #785a46;">Total Products: <b>${store.length}</b></div>
          </div>

          <!-- Staff Edit Authorization Box -->
          <div style="background: #fbf8f3; border: 1.5px dashed #6b3e26; border-radius: 8px; padding: 10px; margin-bottom: 14px;">
            <div style="font-size: 11.5px; font-weight: 800; color: #6b3e26; margin-bottom: 4px;">Staff Edit Verification (Mandatory for Status Change)</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
              <input type="text" id="inpEditStaffName" placeholder="Editor Name" style="background:#ffffff; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:11.5px;" />
              <input type="text" id="inpEditStaffUid" placeholder="User ID" style="background:#ffffff; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:11.5px;" />
              <input type="password" id="inpEditStaffAccess" placeholder="Access ID Key" style="background:#ffffff; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:11.5px;" />
            </div>
          </div>

          <!-- Live Inventory Table -->
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
          tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:#785a46;">No live products found in catalog.</td></tr>`;
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
    // SCREEN 5: C. INVENTORY MANAGEMENT (CATEGORY CONTROLLER)
    // ==========================================
    function renderInventoryMgmt(pushState = true) {
      if (pushState) pushScreenState('inventory-mgmt');

      container.innerHTML = `
        <div class="f-card" style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px; text-transform: uppercase;">C. Master Inventory & Category Management</h3>
          <p style="font-size: 12.5px; color: #785a46; margin-bottom: 14px;">Define major heads, sub heads, and allocate products manually.</p>

          <!-- Add New Head / Sub-Head Panel -->
          <div style="background: #ffffff; border: 1.5px solid #dfcfbc; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 800; color: #3b2219; margin-bottom: 8px;">➕ Create Custom Category Head</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 10px;">
              <input type="text" id="inpNewMajor" placeholder="Major Division" style="background:#fbf8f3; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px;" />
              <input type="text" id="inpNewHead" placeholder="Head / Department" style="background:#fbf8f3; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px;" />
              <input type="text" id="inpNewSub" placeholder="Sub Head Line Item" style="background:#fbf8f3; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px;" />
            </div>
            <button type="button" class="btn-action-sm btn-green" id="btnSaveCustomHead" style="padding: 8px 14px;">Save to Master Categories ✓</button>
          </div>

          <!-- Master Schedule Overview Table -->
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
                ${MASTER_CATEGORIES.map((m, i) => `
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

        MASTER_CATEGORIES.push({ major: maj, head: hd, sub: sb });
        alert(`New Category Hierarchy Added: ${maj} > ${hd} > ${sb}`);
        renderInventoryMgmt(false);
      };
    }

    // ==========================================
    // SCREEN 6: EBOOK ADD (2 SQUARE BUTTONS)
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
    // SCREEN 7: 1. ADD EBOOK
    // ==========================================
    function renderEbookAdd(pushState = true) {
      if (pushState) pushScreenState('ebook-add');

      container.innerHTML = `
        <div class="f-card" style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px; text-transform: uppercase;">1. Add New E-Book</h3>

          <div style="margin-bottom: 10px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Product Title / Book Name *</label>
            <input type="text" id="inpEbTitle" placeholder="e.g., Class 12 Commerce Complete Accountancy Notes" style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:13px;" />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
            <div>
              <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Category</label>
              <select id="selEbCat" style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12.5px;">
                <option value="Class 11-12 Commerce">Class 11-12 Commerce</option>
                <option value="B.Com Degree">B.Com Degree</option>
                <option value="Business & Marketing">Business & Marketing</option>
              </select>
            </div>
            <div>
              <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Price (₹)</label>
              <input type="number" id="inpEbPrice" placeholder="49" style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12.5px;" />
            </div>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Index & Content Short Description</label>
            <textarea id="inpEbDesc" rows="3" placeholder="Overview of index chapters and summary formula sheets..." style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12px;"></textarea>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="font-size: 11.5px; font-weight: 700; color: #785a46;">Google Drive Secure PDF Link *</label>
            <input type="url" id="inpEbDrive" placeholder="https://drive.google.com/..." style="width:100%; background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; font-size:12.5px;" />
          </div>

          <!-- Staff Identity Lock -->
          <div style="background: #fbf8f3; border: 1.5px dashed #6b3e26; border-radius: 8px; padding: 10px; margin-bottom: 14px;">
            <div style="font-size: 11.5px; font-weight: 800; color: #6b3e26; margin-bottom: 4px;">Staff Audit ID (Mandatory)</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
              <input type="text" id="inpEbStaffName" placeholder="Staff Name" style="background:#ffffff; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:12px;" />
              <input type="text" id="inpEbStaffUid" placeholder="User ID" style="background:#ffffff; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:12px;" />
              <input type="password" id="inpEbStaffAccess" placeholder="Access ID Key" style="background:#ffffff; border:1px solid #dfcfbc; padding:6px; border-radius:6px; font-size:12px;" />
            </div>
          </div>

          <button type="button" class="btn-action-sm btn-green" id="btnPublishEb" style="width:100%; padding:12px; font-size:14px; font-weight:800; justify-content:center;">
            Publish E-Book to Customer Portal 📚
          </button>
        </div>
      `;

      document.getElementById('btnPublishEb').onclick = () => {
        const title = document.getElementById('inpEbTitle').value.trim();
        const drive = document.getElementById('inpEbDrive').value.trim();
        const stName = document.getElementById('inpEbStaffName').value.trim();
        const stUid = document.getElementById('inpEbStaffUid').value.trim();
        const stAcc = document.getElementById('inpEbStaffAccess').value.trim();

        if (!title || !drive) {
          alert('Title and PDF drive link are mandatory.');
          return;
        }
        if (!stName || !stUid || !stAcc) {
          alert('Staff Name, User ID, and Access ID are strictly required.');
          return;
        }

        const ebooks = getEbookStore();
        ebooks.unshift({
          id: `EBK-${100 + ebooks.length + 1}`,
          title,
          category: document.getElementById('selEbCat').value,
          price: document.getElementById('inpEbPrice').value || 49,
          driveLink: drive,
          status: 'active',
          publishedBy: `${stName} (${stUid})`
        });
        saveEbookStore(ebooks);

        alert(`E-Book "${title}" Published successfully!`);
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
              <tbody>
                ${ebooks.length === 0
                  ? '<tr><td colspan="5" style="text-align:center; padding:24px; color:#785a46;">No E-Books published yet.</td></tr>'
                  : ebooks.map((eb, idx) => `
                    <tr>
                      <td><b style="color:#0284c7;">${eb.id}</b></td>
                      <td><b>${eb.title}</b></td>
                      <td>₹${eb.price}</td>
                      <td><span class="status-badge ${eb.status === 'active' ? 'badge-active' : 'badge-pending'}">${eb.status.toUpperCase()}</span></td>
                      <td>
                        <button type="button" class="btn-action-sm ${eb.status === 'active' ? 'btn-red' : 'btn-green'} btn-toggle-eb" data-idx="${idx}">
                          ${eb.status === 'active' ? 'Pause' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      container.querySelectorAll('.btn-toggle-eb').forEach(btn => {
        btn.onclick = function () {
          const idx = Number(this.getAttribute('data-idx'));
          const all = getEbookStore();
          all[idx].status = all[idx].status === 'active' ? 'paused' : 'active';
          saveEbookStore(all);
          renderEbookEdit(false);
        };
      });
    }

    // Start with Screen 1 (Level 1)
    renderLevel1(true);
  };
})();
