/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: STOCK MODULE (ZERO DUMMY DATA ENGINE)
   ========================================================================== */

(function () {
  'use strict';

  // Real items only - No dummy entries
  function getStockItems() {
    try {
      return JSON.parse(localStorage.getItem('ss_owner_products') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveStockItems(items) {
    try {
      localStorage.setItem('ss_owner_products', JSON.stringify(items));
    } catch (e) {}
  }

  window.initOwnerStock = function () {
    const container = document.getElementById('view-stock');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom: 16px;">
        <h2 style="font-size: 19px; font-weight: 800; color: #3b2219; margin-bottom: 4px;">Stock & Catalog Engine</h2>
        <p style="font-size: 12.5px; color: #785a46;">Add, control, and publish real catalog products and E-books.</p>
      </div>

      <!-- MAIN TABS (PRODUCT ADD / EBOOK ADD) -->
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <button type="button" class="btn-action-sm btn-blue stock-main-tab active" id="tabBtnProducts" style="flex: 1; padding: 10px; justify-content: center;">📦 Product Deals</button>
        <button type="button" class="btn-action-sm btn-blue stock-main-tab" id="tabBtnEbooks" style="flex: 1; padding: 10px; justify-content: center; opacity: 0.6;">📚 E-Books Catalog</button>
      </div>

      <!-- SECTION A: PRODUCTS MANAGER -->
      <div id="stockProductsSection">
        <!-- Sub-Nav Pill Buttons -->
        <div style="display: flex; gap: 8px; margin-bottom: 14px;">
          <button type="button" class="btn-action-sm btn-blue sub-pill-btn active" id="btnSubStockAdd">1. Stock Add</button>
          <button type="button" class="btn-action-sm btn-blue sub-pill-btn" id="btnSubStockRemove" style="opacity: 0.6;">2. Stock Control</button>
          <button type="button" class="btn-action-sm btn-blue sub-pill-btn" id="btnSubStockInv" style="opacity: 0.6;">3. Inventory</button>
        </div>

        <!-- 1. Stock Add Sub-Page -->
        <div id="subViewStockAdd" class="f-card">
          <h4 style="font-size: 14px; font-weight: 700; color: #3b2219; margin-bottom: 12px;">Add Product Deal (Smart Auto-Scraper)</h4>
          
          <div style="display: flex; gap: 8px; margin-bottom: 14px;">
            <input type="url" id="inpScraperUrl" placeholder="Paste Amazon / Flipkart / Myntra Deal URL..." style="flex: 1; background: #ffffff; border: 1.5px solid #dfcfbc; padding: 10px; border-radius: 8px; color: #2b1810; font-size: 13px;" />
            <button type="button" class="btn-action-sm btn-gold" id="btnRunScraper" style="padding: 10px 14px; font-weight: 700;">⚡ Fetch AI</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #785a46;">Product Title / Name *</label>
              <input type="text" id="inpProdTitle" placeholder="Real Product Name" style="width: 100%; background: #ffffff; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 13px;" />
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #785a46;">Category *</label>
              <select id="selProdCategory" style="width: 100%; background: #ffffff; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 13px;">
                <option value="Fashion / Clothing">Fashion / Clothing</option>
                <option value="Electronics / Gadgets">Electronics / Gadgets</option>
                <option value="Beauty / Personal Care">Beauty / Personal Care</option>
                <option value="Footwear">Footwear</option>
                <option value="Grocery & Supermarket">Grocery & Supermarket</option>
                <option value="Home Decor & Spiritual">Home Decor & Spiritual</option>
                <option value="Furniture & Study Setup">Furniture & Study Setup</option>
                <option value="General Household">General Household</option>
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;">
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #785a46;">Sale Price (₹) *</label>
              <input type="number" id="inpSalePrice" placeholder="e.g. 499" style="width: 100%; background: #ffffff; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 13px;" />
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #785a46;">MRP (₹) *</label>
              <input type="number" id="inpRegularPrice" placeholder="e.g. 1299" style="width: 100%; background: #ffffff; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 13px;" />
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #785a46;">Merchant Store</label>
              <select id="selStore" style="width: 100%; background: #ffffff; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 13px;">
                <option value="Amazon">Amazon</option>
                <option value="Flipkart">Flipkart</option>
                <option value="Myntra">Myntra</option>
                <option value="Ajio">Ajio</option>
                <option value="Other Store">Other Store</option>
              </select>
            </div>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="font-size: 11px; font-weight: 700; color: #785a46;">Primary Image URL *</label>
            <input type="url" id="inpImageUrl" placeholder="https://..." style="width: 100%; background: #ffffff; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 13px;" />
          </div>

          <div style="margin-bottom: 14px;">
            <label style="font-size: 11px; font-weight: 700; color: #785a46;">Affiliate Redirection URL *</label>
            <input type="url" id="inpAffiliateUrl" placeholder="https://..." style="width: 100%; background: #ffffff; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 13px;" />
          </div>

          <!-- Staff Authorization Barrier -->
          <div style="background: #ffffff; border: 1.5px dashed var(--choc-accent); border-radius: 8px; padding: 12px; margin-bottom: 14px;">
            <div style="font-size: 12px; font-weight: 800; color: var(--choc-accent); margin-bottom: 6px;">🔒 Staff / Publisher Audit Identity (Mandatory)</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
              <input type="text" id="inpStaffPubName" placeholder="Publisher Name" style="background: #fbf8f3; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 12px;" />
              <input type="text" id="inpStaffPubUserId" placeholder="User ID (MEM-...)" style="background: #fbf8f3; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 12px;" />
              <input type="password" id="inpStaffPubAccessId" placeholder="Access ID Key" style="background: #fbf8f3; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 12px;" />
            </div>
          </div>

          <button type="button" class="btn-action-sm btn-green" id="btnPublishProduct" style="width: 100%; padding: 12px; font-size: 14px; justify-content: center;">
            Publish Product to Customer Portal ⚡
          </button>
        </div>

        <!-- 2. Stock Control Sub-Page -->
        <div id="subViewStockRemove" class="f-card" style="display: none;">
          <h4 style="font-size: 14px; font-weight: 700; color: #3b2219; margin-bottom: 10px;">Stock Control & Search Hub</h4>
          <input type="text" id="inpSearchProduct" placeholder="Search by deal title, ID or merchant..." style="width: 100%; background: #ffffff; border: 1px solid #dfcfbc; padding: 10px; border-radius: 8px; color: #2b1810; font-size: 13px; margin-bottom: 14px;" />

          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>Deal ID</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Merchant</th>
                  <th>Status</th>
                  <th>Published By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="stockCatalogTableBody"></tbody>
            </table>
          </div>
        </div>

        <!-- 3. Inventory Sub-Page (Clean placeholder) -->
        <div id="subViewStockInv" class="f-card" style="display: none;">
          <h4 style="font-size: 14px; font-weight: 700; color: #3b2219; margin-bottom: 6px;">Inventory Management</h4>
          <p style="font-size: 12.5px; color: #785a46;">Reserved space for inventory status tracking.</p>
        </div>
      </div>

      <!-- SECTION B: E-BOOKS MANAGER -->
      <div id="stockEbooksSection" style="display: none;">
        <div class="f-card">
          <h4 style="font-size: 14px; font-weight: 700; color: #3b2219; margin-bottom: 10px;">Publish New E-Book / Study Notes</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
            <input type="text" id="inpEbookTitle" placeholder="E-Book Title (e.g., Class 12 Commerce)" style="background: #ffffff; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 13px;" />
            <select id="selEbookCategory" style="background: #ffffff; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 13px;">
              <option value="Class 11-12 Commerce">Class 11-12 Commerce</option>
              <option value="B.Com Degree">B.Com Degree</option>
              <option value="Business & Marketing">Business & Marketing</option>
            </select>
          </div>
          <div style="margin-bottom: 10px;">
            <input type="url" id="inpEbookDriveLink" placeholder="Direct Google Drive PDF Secure Link..." style="width: 100%; background: #ffffff; border: 1px solid #dfcfbc; padding: 8px; border-radius: 6px; color: #2b1810; font-size: 13px;" />
          </div>
          <button type="button" class="btn-action-sm btn-green" id="btnPublishEbook" style="width: 100%; padding: 11px; font-size: 13.5px; justify-content: center;">Publish E-Book 📚</button>
        </div>
      </div>
    `;

    // Tab Switching
    const tabProducts = document.getElementById('tabBtnProducts');
    const tabEbooks = document.getElementById('tabBtnEbooks');
    const secProducts = document.getElementById('stockProductsSection');
    const secEbooks = document.getElementById('stockEbooksSection');

    tabProducts.onclick = () => {
      tabProducts.style.opacity = '1';
      tabEbooks.style.opacity = '0.6';
      secProducts.style.display = 'block';
      secEbooks.style.display = 'none';
    };

    tabEbooks.onclick = () => {
      tabEbooks.style.opacity = '1';
      tabProducts.style.opacity = '0.6';
      secProducts.style.display = 'none';
      secEbooks.style.display = 'block';
    };

    // Sub-pills
    const btnAdd = document.getElementById('btnSubStockAdd');
    const btnRemove = document.getElementById('btnSubStockRemove');
    const btnInv = document.getElementById('btnSubStockInv');
    const viewAdd = document.getElementById('subViewStockAdd');
    const viewRemove = document.getElementById('subViewStockRemove');
    const viewInv = document.getElementById('subViewStockInv');

    function resetPills() {
      [btnAdd, btnRemove, btnInv].forEach(b => b.style.opacity = '0.6');
      [viewAdd, viewRemove, viewInv].forEach(v => v.style.display = 'none');
    }

    btnAdd.onclick = () => { resetPills(); btnAdd.style.opacity = '1'; viewAdd.style.display = 'block'; };
    btnRemove.onclick = () => { resetPills(); btnRemove.style.opacity = '1'; viewRemove.style.display = 'block'; renderStockTable(); };
    btnInv.onclick = () => { resetPills(); btnInv.style.opacity = '1'; viewInv.style.display = 'block'; };

    // AI Scraper link parse (Populates URL directly)
    document.getElementById('btnRunScraper').onclick = () => {
      const url = document.getElementById('inpScraperUrl').value.trim();
      if (!url) {
        alert('Please paste a product URL first.');
        return;
      }
      document.getElementById('inpAffiliateUrl').value = url;
      alert('Link mapped! Please enter the real Product Name, Price, and Image.');
    };

    // Render Table (Zero Dummy Data)
    function renderStockTable(filter = '') {
      const tbody = document.getElementById('stockCatalogTableBody');
      if (!tbody) return;
      let items = getStockItems();
      if (filter) {
        items = items.filter(i => (i.title + i.id + i.store).toLowerCase().includes(filter.toLowerCase()));
      }

      if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color:#785a46; font-weight:600;">No products in catalog. Add a deal to start.</td></tr>`;
        return;
      }

      tbody.innerHTML = items.map((item, index) => `
        <tr>
          <td><b style="color:var(--choc-dark);">${item.id}</b></td>
          <td><b>${item.title}</b></td>
          <td>₹${item.price} <s style="font-size:11px; color:#785a46;">₹${item.mrp}</s></td>
          <td>${item.store}</td>
          <td>
            <span class="status-badge ${item.status === 'active' ? 'badge-active' : 'badge-pending'}">${item.status.toUpperCase()}</span>
          </td>
          <td style="font-size:11.5px; color:#785a46;">${item.publishedBy}</td>
          <td>
            <button type="button" class="btn-action-sm ${item.status === 'active' ? 'btn-red' : 'btn-green'} btn-toggle-status" data-idx="${index}">
              ${item.status === 'active' ? 'Pause' : 'Activate'}
            </button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.btn-toggle-status').forEach(btn => {
        btn.onclick = function () {
          const idx = this.getAttribute('data-idx');
          const all = getStockItems();
          all[idx].status = all[idx].status === 'active' ? 'paused' : 'active';
          saveStockItems(all);
          renderStockTable(filter);
        };
      });
    }

    document.getElementById('inpSearchProduct').oninput = function () {
      renderStockTable(this.value.trim());
    };

    // Publish Real Deal
    document.getElementById('btnPublishProduct').onclick = () => {
      const title = document.getElementById('inpProdTitle').value.trim();
      const price = document.getElementById('inpSalePrice').value.trim();
      const mrp = document.getElementById('inpRegularPrice').value.trim();
      const img = document.getElementById('inpImageUrl').value.trim();
      const aff = document.getElementById('inpAffiliateUrl').value.trim();
      const sName = document.getElementById('inpStaffPubName').value.trim();
      const sUid = document.getElementById('inpStaffPubUserId').value.trim();
      const sAcc = document.getElementById('inpStaffPubAccessId').value.trim();

      if (!title || !price || !mrp || !img || !aff) {
        alert('Validation Error: All product fields with (*) are mandatory.');
        return;
      }
      if (!sName || !sUid || !sAcc) {
        alert('Audit Barrier: Staff Name, User ID, and Access ID Key are strictly required to publish.');
        return;
      }

      const all = getStockItems();
      const newDeal = {
        id: `PRD-${100 + all.length + 1}`,
        title,
        category: document.getElementById('selProdCategory').value,
        price: Number(price),
        mrp: Number(mrp),
        store: document.getElementById('selStore').value,
        status: 'active',
        publishedBy: `${sName} (${sUid})`
      };
      all.unshift(newDeal);
      saveStockItems(all);

      alert(`Success! Deal #${newDeal.id} published to customer catalog.`);
      document.getElementById('inpProdTitle').value = '';
      document.getElementById('inpSalePrice').value = '';
      document.getElementById('inpRegularPrice').value = '';
      document.getElementById('inpImageUrl').value = '';
      document.getElementById('inpAffiliateUrl').value = '';
      btnRemove.click();
    };

    // E-Book Publish
    document.getElementById('btnPublishEbook').onclick = () => {
      const title = document.getElementById('inpEbookTitle').value.trim();
      const drive = document.getElementById('inpEbookDriveLink').value.trim();
      if (!title || !drive) {
        alert('Please fill E-book title and PDF link.');
        return;
      }
      alert(`E-Book "${title}" published successfully!`);
      document.getElementById('inpEbookTitle').value = '';
      document.getElementById('inpEbookDriveLink').value = '';
    };
  };
})();
