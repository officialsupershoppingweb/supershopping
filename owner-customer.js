/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: MASTER CUSTOMER HUB (COMPLETE ARCHITECTURE)
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. LOCAL STORAGE DATABASE (ZERO-DUMMY INITIAL STATE) ---
  function getCustDB() {
    try {
      const raw = localStorage.getItem('ss_owner_cust_master_db');
      return raw ? JSON.parse(raw) : {
        cashbackClaims: [],
        greenCoinClaims: [],
        cashEbookSales: [],
        coinEbookSales: [],
        failedCashOrders: [],
        failedCoinOrders: [],
        coinBankVault: [],
        registeredUsers: [],
        referralLedger: [],
        blockedUsers: [],
        recycleBinCashback: [],
        recycleBinCoinsAI: [],
        recycleBinCoinsManual: [],
        guestTraffic: [],
        loginTraffic: [],
        linkClicks: { amazon: 0, flipkart: 0, myntra: 0, ajio: 0, other: 0 }
      };
    } catch (e) {
      return {
        cashbackClaims: [], greenCoinClaims: [], cashEbookSales: [], coinEbookSales: [],
        failedCashOrders: [], failedCoinOrders: [], coinBankVault: [], registeredUsers: [],
        referralLedger: [], blockedUsers: [], recycleBinCashback: [], recycleBinCoinsAI: [],
        recycleBinCoinsManual: [], guestTraffic: [], loginTraffic: [],
        linkClicks: { amazon: 0, flipkart: 0, myntra: 0, ajio: 0, other: 0 }
      };
    }
  }

  function saveCustDB(db) {
    try { localStorage.setItem('ss_owner_cust_master_db', JSON.stringify(db)); } catch (e) {}
  }

  // --- 2. UNIVERSAL DATE FILTER GENERATOR ---
  function renderFilterBar(tableId) {
    return `
      <div class="f-date-filter-bar" data-for="${tableId}" style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; align-items:center; background:#ffffff; border:1px solid #dfcfbc; padding:10px 14px; border-radius:10px; width:100%; box-sizing:border-box;">
        <span style="font-size:12px; font-weight:800; color:#3b2219; margin-right:4px;">📅 Filter:</span>
        <button type="button" class="btn-action-sm btn-blue filter-btn active" data-period="all" style="padding:5px 12px; font-size:11.5px;">All</button>
        <button type="button" class="btn-action-sm btn-blue filter-btn" data-period="today" style="padding:5px 12px; font-size:11.5px; opacity:0.6;">Today</button>
        <button type="button" class="btn-action-sm btn-blue filter-btn" data-period="tomorrow" style="padding:5px 12px; font-size:11.5px; opacity:0.6;">Tomorrow</button>
        <button type="button" class="btn-action-sm btn-blue filter-btn" data-period="weekly" style="padding:5px 12px; font-size:11.5px; opacity:0.6;">Weekly</button>
        <button type="button" class="btn-action-sm btn-blue filter-btn" data-period="monthly" style="padding:5px 12px; font-size:11.5px; opacity:0.6;">Monthly</button>
        <button type="button" class="btn-action-sm btn-blue filter-btn" data-period="yearly" style="padding:5px 12px; font-size:11.5px; opacity:0.6;">Yearly</button>
        <div style="display:flex; align-items:center; gap:6px; margin-left:auto;">
          <input type="date" class="filter-custom-date" style="background:#fbf8f3; border:1px solid #dfcfbc; padding:5px 8px; border-radius:6px; font-size:11.5px; color:#2b1810;" />
          <button type="button" class="btn-action-sm btn-gold btn-apply-custom" style="padding:5px 10px; font-size:11.5px;">Apply</button>
        </div>
      </div>
    `;
  }

  // Pipeline Indicator Generators
  function getCashbackPipeline(step, days) {
    const dots = ['🔴', '🟡', '🟠', '🔵', '🟢', '🟣'];
    return `
      <div style="display:flex; align-items:center; gap:2px; font-size:11px;">
        ${dots.map((d, i) => `
          <span style="opacity:${i + 1 === step ? '1' : '0.25'}; filter:${i + 1 === step ? 'drop-shadow(0 0 4px gold)' : 'none'};">${d}</span>${i < 5 ? '<span style="color:#dfcfbc; font-size:8px;">-</span>' : ''}
        `).join('')}
        <b style="margin-left:4px; font-size:11px; color:#6b3e26;">(${days || 1}d)</b>
      </div>
    `;
  }

  function getCoinPipeline(step, days) {
    const dots = ['🤍', '🤎', '🩷', '💚', '🩵'];
    return `
      <div style="display:flex; align-items:center; gap:2px; font-size:11px;">
        ${dots.map((d, i) => `
          <span style="opacity:${i + 1 === step ? '1' : '0.25'}; filter:${i + 1 === step ? 'drop-shadow(0 0 4px gold)' : 'none'};">${d}</span>${i < 4 ? '<span style="color:#dfcfbc; font-size:8px;">-</span>' : ''}
        `).join('')}
        <b style="margin-left:4px; font-size:11px; color:#16a34a;">(${days || 1}d)</b>
      </div>
    `;
  }

  // --- 3. CORE MOUNT & SCREEN-STACK CONTROLLER ---
  window.initOwnerCustomer = function () {
    const mount = document.getElementById('view-customer');
    if (!mount) return;

    mount.style.width = '100%';
    mount.style.maxWidth = '100%';
    mount.style.padding = '0';
    mount.style.margin = '0';

    const screenStack = [];

    function pushScreen(renderFn, screenName) {
      screenStack.push(renderFn);
      history.pushState({ custView: screenName, depth: screenStack.length }, '');
      renderFn();
    }

    window.addEventListener('popstate', function (e) {
      const activeNav = document.querySelector('.f-nav-item.active');
      if (activeNav && activeNav.getAttribute('data-target') === 'view-customer') {
        if (screenStack.length > 1) {
          screenStack.pop();
          const prev = screenStack[screenStack.length - 1];
          if (prev) prev();
        } else {
          showLevel1();
        }
      }
    });

    // =========================================================================
    // LEVEL 1: 6 BADE BLUE BUTTONS (PHOTO 1)
    // =========================================================================
    function showLevel1() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 26px; margin-bottom:28px; box-shadow:0 4px 12px rgba(59,34,25,0.08);">
            <h3 style="font-size:18px; font-weight:900; color:#3b2219; letter-spacing:1px; margin:0; text-transform:uppercase;">CUSTOMER PAGE</h3>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="bHub1" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">📥</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Customer<br/>Request Claim</span>
            </button>
            <button type="button" id="bHub2" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">📚</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Ebook<br/>Purchases Claim</span>
            </button>
            <button type="button" id="bHub3" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">📇</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Register<br/>ID</span>
            </button>
            <button type="button" id="bHub4" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">👥</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Visitor<br/>Count</span>
            </button>
            <button type="button" id="bHub5" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">🔗</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Link<br/>Click</span>
            </button>
            <button type="button" id="bHub6" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">🛡️</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Portal<br/>Protection</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('bHub1').onclick = () => pushScreen(showClaimsDesk, 'claims-desk');
      document.getElementById('bHub2').onclick = () => pushScreen(showEbookHub, 'ebook-hub');
      document.getElementById('bHub3').onclick = () => pushScreen(showRegisterHub, 'register-hub');
      document.getElementById('bHub4').onclick = () => pushScreen(showVisitorHub, 'visitor-hub');
      document.getElementById('bHub5').onclick = () => pushScreen(showClickAnalytics, 'click-hub');
      document.getElementById('bHub6').onclick = () => pushScreen(showSecurityRoom, 'security-hub');
    }

    // =========================================================================
    // LEVEL 2: CUSTOMER REQUEST CLAIM (PHOTO 2: CASH vs COIN)
    // =========================================================================
    function showClaimsDesk() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#e02424; border:2px solid #991b1b; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Customer Request Claim</h3>
          </div>
          <div style="display:flex; gap:24px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="btnDeskCash" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; cursor:pointer; box-shadow:0 12px 28px rgba(59,34,25,0.08);">
              <span style="font-size:42px;">💰</span>
              <span style="font-size:15px; font-weight:900; color:#1e3a8a; text-align:center; line-height:1.2;">CASHBACK<br/>REWARD</span>
            </button>
            <button type="button" id="btnDeskCoin" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; cursor:pointer; box-shadow:0 12px 28px rgba(59,34,25,0.08);">
              <span style="font-size:42px;">🟢</span>
              <span style="font-size:15px; font-weight:900; color:#1e3a8a; text-align:center; line-height:1.2;">GREENCOIN<br/>REWARD</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnDeskCash').onclick = () => pushScreen(showCashback6Cards, 'cb-stages');
      document.getElementById('btnDeskCoin').onclick = () => pushScreen(showGreenCoin5Cards, 'gc-stages');
    }

    // =========================================================================
    // LEVEL 3: CASHBACK 6 COLOR BUTTONS (PHOTO 3)
    // =========================================================================
    function showCashback6Cards() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #1e3a8a; border-radius:25px; padding:10px 28px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#1e3a8a; margin:0;">✳ CASHBACK REWARD (1-100 DAYS) ✳</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="cbBtn1" class="stock-square-card" style="height:145px; background:#dc2626; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">NEW REQUEST<br/>CLAIM UNDER<br/>1 TO 25 DAYS</button>
            <button type="button" id="cbBtn2" class="stock-square-card" style="height:145px; background:#ca8a04; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">UNDER<br/>26 TO 50<br/>DAYS</button>
            <button type="button" id="cbBtn3" class="stock-square-card" style="height:145px; background:#ea580c; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">UNDER<br/>51 TO 75<br/>DAYS</button>
            <button type="button" id="cbBtn4" class="stock-square-card" style="height:145px; background:#2563eb; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">UNDER<br/>76 TO 100<br/>DAYS</button>
            <button type="button" id="cbBtn5" class="stock-square-card" style="height:145px; background:#16a34a; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">101<br/>SEND<br/>REWARD</button>
            <button type="button" id="cbBtn6" class="stock-square-card" style="height:145px; background:#9333ea; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:15px; cursor:pointer;">HISTORY</button>
          </div>
        </div>
      `;

      document.getElementById('cbBtn1').onclick = () => pushScreen(() => showCashbackStepTable(1), 'cb-step-1');
      document.getElementById('cbBtn2').onclick = () => pushScreen(() => showCashbackStepTable(2), 'cb-step-2');
      document.getElementById('cbBtn3').onclick = () => pushScreen(() => showCashbackStepTable(3), 'cb-step-3');
      document.getElementById('cbBtn4').onclick = () => pushScreen(() => showCashbackStepTable(4), 'cb-step-4');
      document.getElementById('cbBtn5').onclick = () => pushScreen(() => showCashbackStepTable(5), 'cb-step-5');
      document.getElementById('cbBtn6').onclick = () => pushScreen(showCashbackHistoryHub, 'cb-hist');
    }

    // =========================================================================
    // CASHBACK STEP TABLES (FULL WIDTH & INTERACTIVE)
    // =========================================================================
    function showCashbackStepTable(step) {
      const db = getCustDB();
      const titles = {
        1: "1. New Request Claim Under 1 to 25 Days",
        2: "2. Under 26 to 50 Days (Verified Desk)",
        3: "3. Under 51 to 75 Days (Income Allocation)",
        4: "4. Under 76 to 100 Days (Method Review & Confirm)",
        5: "5. 101 Send Reward (Final Payout Dispatch)"
      };

      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0; text-transform:uppercase;">${titles[step]}</h3>
          </div>

          ${renderFilterBar(`tblCbStep${step}`)}

          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; box-shadow:0 4px 14px rgba(59,34,25,0.05);">
            <table class="f-table" style="width:100%; min-width:1150px; border-collapse:collapse;" id="tblCbStep${step}">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date/Time</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Product Price</th>
                  <th>Product Name</th>
                  <th>Document</th>
                  <th>Progress</th>
                  ${step === 1 ? '<th>Status (Action)</th>' : ''}
                  ${step === 2 ? '<th>Account</th><th>Status</th>' : ''}
                  ${step === 3 ? '<th>Income Generated</th><th>Method (UPI/QR)</th><th>Status</th>' : ''}
                  ${step === 4 ? '<th>Income</th><th>Method</th><th>Status</th><th>Request</th>' : ''}
                  ${step === 5 ? '<th>Income</th><th>Method</th><th>Action</th><th>Status</th>' : ''}
                </tr>
              </thead>
              <tbody id="cbRowsMount"></tbody>
            </table>
          </div>

          <div style="background:#fbf8f3; border:1px solid #dfcfbc; padding:12px 18px; border-radius:10px; margin-top:14px; display:flex; justify-content:space-between; font-size:13px; font-weight:800; color:#3b2219;">
            <div>Total Records: <span id="txtCbCount">0</span></div>
            <div>Total Product Value: ₹<span id="txtCbSum">0</span></div>
          </div>
        </div>
      `;

      function renderRows() {
        const tbody = document.getElementById('cbRowsMount');
        const list = (db.cashbackClaims || []).filter(x => x.currentStep === step);

        document.getElementById('txtCbCount').textContent = list.length;
        document.getElementById('txtCbSum').textContent = list.reduce((a, b) => a + (Number(b.productPrice) || 0), 0);

        if (list.length === 0) {
          tbody.innerHTML = `<tr><td colspan="15" style="text-align:center; padding:36px; color:#785a46; font-weight:700; font-size:13px;">No live customer claims under this stage right now.</td></tr>`;
          return;
        }

        tbody.innerHTML = list.map((c, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${c.dateTime}</td>
            <td><b style="color:#0284c7;">${c.userId}</b></td>
            <td><b>${c.name}</b></td>
            <td>${c.email}</td>
            <td>${c.phone || 'N/A'}</td>
            <td>₹${c.productPrice}</td>
            <td><b>${c.productName}</b></td>
            <td><button type="button" class="btn-action-sm btn-blue">📄 View PDF</button></td>
            <td>${getCashbackPipeline(c.currentStep, c.elapsedDays)}</td>

            ${step === 1 ? `
              <td>
                <button type="button" class="btn-action-sm btn-green act-s1-acc" data-id="${c.id}">Accept ✓</button>
                <button type="button" class="btn-action-sm btn-red act-s1-rej" data-id="${c.id}">Reject ✕</button>
              </td>
            ` : ''}

            ${step === 2 ? `
              <td>
                <button type="button" class="btn-action-sm ${c.accountStatus === 'block' ? 'btn-red' : 'btn-green'} act-s2-blk" data-id="${c.id}">
                  ${c.accountStatus === 'block' ? 'Blocked' : 'Active'}
                </button>
                </td>
              <td><button type="button" class="btn-action-sm btn-green act-s2-ver" data-id="${c.id}">Verify ➔ Step 3</button></td>
            ` : ''}

            ${step === 3 ? `
              <td><input type="number" class="inp-s3-inc" data-id="${c.id}" value="${c.incomeGenerated || ''}" placeholder="₹ Amount" style="width:90px; padding:4px 6px; font-size:12px; border:1px solid #dfcfbc; border-radius:4px;" /></td>
              <td>${c.paymentMethod || 'UPI/QR Attached'}</td>
              <td><button type="button" class="btn-action-sm btn-green act-s3-app" data-id="${c.id}">Approve ➔ Step 4</button></td>
            ` : ''}

            ${step === 4 ? `
              <td>₹${c.incomeGenerated || 0}</td>
              <td>${c.paymentMethod || 'UPI / QR'}</td>
              <td><span class="status-badge badge-pending">Pending 100d</span></td>
              <td>
                <button type="button" class="btn-action-sm btn-green act-s4-cnf" data-id="${c.id}">Confirm ✓</button>
                <button type="button" class="btn-action-sm btn-red act-s4-can" data-id="${c.id}">Cancel ✕</button>
              </td>
            ` : ''}

            ${step === 5 ? `
              <td>₹${c.incomeGenerated || 0}</td>
              <td>${c.paymentMethod || 'UPI / QR'}</td>
              <td>
                <button type="button" class="btn-action-sm btn-blue act-s5-cor" data-id="${c.id}">Correct</button>
                <button type="button" class="btn-action-sm btn-red act-s5-can" data-id="${c.id}">Cancel</button>
              </td>
              <td><button type="button" class="btn-action-sm btn-green act-s5-dis" data-id="${c.id}">Dispatched ✓</button></td>
            ` : ''}
          </tr>
        `).join('');

        wireStepEvents(step);
      }

      function wireStepEvents(st) {
        mount.querySelectorAll('.act-s1-acc').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (item) { item.currentStep = 2; saveCustDB(db); renderRows(); }
          };
        });

        mount.querySelectorAll('.act-s2-blk').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (!item) return;

            if (confirm(`Do you really want to block user ${item.userId}?`)) {
              const reason = prompt('Mandatory: Reason for blocking account:');
              if (!reason) { alert('Reason required.'); return; }
              item.accountStatus = 'block';
              db.blockedUsers.push({
                sno: db.blockedUsers.length + 1,
                dateTime: new Date().toLocaleString(),
                userId: item.userId,
                name: item.name,
                email: item.email,
                phone: item.phone,
                feedback: reason,
                status: 'blocked'
              });
              saveCustDB(db);
              renderRows();
            }
          };
        });

        mount.querySelectorAll('.act-s2-ver').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (item) { item.currentStep = 3; saveCustDB(db); renderRows(); }
          };
        });

        mount.querySelectorAll('.act-s3-app').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const inp = mount.querySelector(`.inp-s3-inc[data-id="${id}"]`);
            const item = db.cashbackClaims.find(x => x.id === id);
            if (item && inp) {
              if (!inp.value || Number(inp.value) <= 0) { alert('Please enter cashback amount.'); return; }
              item.incomeGenerated = Number(inp.value);
              item.currentStep = 4;
              saveCustDB(db);
              renderRows();
            }
          };
        });

        mount.querySelectorAll('.act-s4-can').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (!item) return;

            const reason = prompt('Mandatory: Feedback reason for cancellation:');
            if (!reason) { alert('Feedback required to cancel.'); return; }

            db.recycleBinCashback.push({
              sno: db.recycleBinCashback.length + 1,
              dateTime: new Date().toLocaleString(),
              userId: item.userId,
              name: item.name,
              email: item.email,
              productPrice: item.productPrice,
              productName: item.productName,
              incomeGenerated: item.incomeGenerated || 0,
              step: 'Step 4 (76-100 Days)',
              feedback: reason
            });

            db.cashbackClaims = db.cashbackClaims.filter(x => x.id !== id);
            saveCustDB(db);
            alert('Request moved to Recycling Bin.');
            renderRows();
          };
        });

        mount.querySelectorAll('.act-s4-cnf').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (item) { item.currentStep = 5; saveCustDB(db); renderRows(); }
          };
        });

        mount.querySelectorAll('.act-s5-dis').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (item) {
              item.currentStep = 6;
              item.status = 'completed';
              item.completedDate = new Date().toLocaleString();
              saveCustDB(db);
              alert('Cashback payout completed & archived for 1 year.');
              renderRows();
            }
          };
        });
      }

      renderRows();
    }

    // =========================================================================
    // CASHBACK HISTORY SUB-HUB
    // =========================================================================
    function showCashbackHistoryHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#9333ea; border:2px solid #6b21a8; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Cashback Claims History</h3>
          </div>
          <div style="display:flex; gap:24px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="btnHistC" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; cursor:pointer;">
              <span style="font-size:42px;">🟢</span>
              <span style="font-size:15px; font-weight:900; color:#16a34a; text-align:center; line-height:1.2;">A) COMPLETED<br/>REWARDS</span>
            </button>
            <button type="button" id="btnHistB" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; cursor:pointer;">
              <span style="font-size:42px;">🗑️</span>
              <span style="font-size:15px; font-weight:900; color:#dc2626; text-align:center; line-height:1.2;">B) RECYCLING<br/>BIN</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnHistC').onclick = () => pushScreen(showCashbackHistCompleted, 'cb-hist-c');
      document.getElementById('btnHistB').onclick = () => pushScreen(showCashbackHistBin, 'cb-hist-b');
    }

    function showCashbackHistCompleted() {
      const db = getCustDB();
      const list = (db.cashbackClaims || []).filter(c => c.currentStep === 6);

      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#16a34a; margin:0;">A) COMPLETED CASHBACK TRANSFERS</h3>
          </div>
          ${renderFilterBar('tblHistComp')}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:1000px;">
              <thead>
                <tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Product Price</th><th>Product Name</th><th>Transfer Amount</th><th>Method</th></tr>
              </thead>
              <tbody>
                ${list.length === 0
                  ? '<tr><td colspan="9" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">No completed payout records yet.</td></tr>'
                  : list.map((c, i) => `
                    <tr>
                      <td>${i + 1}</td><td>${c.completedDate \vert{}\vert{} c.dateTime}</td><td><b>${c.userId}</b></td>
                      <td><b>${c.name}</b></td><td>${c.email}</td><td>₹${c.productPrice}</td><td>${c.productName}</td>
                      <td><b style="color:#16a34a;">₹${c.incomeGenerated}</b></td><td>${c.paymentMethod}</td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
          <div style="background:#fbf8f3; border:1px solid #dfcfbc; padding:12px 18px; border-radius:10px; margin-top:14px; text-align:right; font-size:13px; font-weight:800; color:#16a34a;">
            Total Transferred: ₹${list.reduce((acc, x) => acc + (x.incomeGenerated || 0), 0)}
          </div>
        </div>
      `;
    }

    function showCashbackHistBin() {
      const db = getCustDB();
      const list = db.recycleBinCashback || [];

      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#dc2626; margin:0;">B) RECYCLING BIN (CANCELLED / BLOCKED CLAIMS)</h3>
          </div>
          ${renderFilterBar('tblHistBin')}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:1000px;">
              <thead>
                <tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Product Price</th><th>Product Name</th><th>Income</th><th>Cancelled Step</th><th>Feedback Reason</th></tr>
              </thead>
              <tbody>
                ${list.length === 0
                  ? '<tr><td colspan="10" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">Recycling bin is completely clean.</td></tr>'
                  : list.map((c, i) => `
                    <tr>
                      <td>${i + 1}</td><td>${c.dateTime}</td><td><b>${c.userId}</b></td><td>${c.name}</td><td>${c.email}</td>
                      <td>₹${c.productPrice}</td><td>${c.productName}</td><td>₹${c.incomeGenerated || 0}</td>
                      <td><b>${c.step}</b></td><td style="color:#dc2626; font-weight:700;">${c.feedback}</td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
     // =========================================================================
    // GREEN COIN STAGES (5 OPTIONS)
    // =========================================================================
    function showGreenCoin5Cards() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #16a34a; border-radius:25px; padding:10px 28px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#16a34a; margin:0;">🟢 GREEN COIN REWARD (12 DAYS) 🟢</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="gBtn1" class="stock-square-card" style="height:145px; background:#475569; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">1. REQUEST<br/>FOR REWARD</button>
            <button type="button" id="gBtn2" class="stock-square-card" style="height:145px; background:#78350f; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">2. UNDER<br/>1 TO 7 DAYS</button>
            <button type="button" id="gBtn3" class="stock-square-card" style="height:145px; background:#db2777; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">3. UNDER<br/>8 TO 12 DAYS</button>
            <button type="button" id="gBtn4" class="stock-square-card" style="height:145px; background:#059669; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">4. FINAL<br/>STEP</button>
            <button type="button" id="gBtn5" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:15px; cursor:pointer;">5. HISTORY</button>
          </div>
        </div>
      `;

      document.getElementById('gBtn1').onclick = () => pushScreen(() => showGreenCoinStepTable(1), 'gc-step-1');
      document.getElementById('gBtn2').onclick = () => pushScreen(() => showGreenCoinStepTable(2), 'gc-step-2');
      document.getElementById('gBtn3').onclick = () => pushScreen(() => showGreenCoinStepTable(3), 'gc-step-3');
      document.getElementById('gBtn4').onclick = () => pushScreen(() => showGreenCoinStepTable(4), 'gc-step-4');
      document.getElementById('gBtn5').onclick = () => pushScreen(showGreenCoinHistoryHub, 'gc-hist');
    }

    function showGreenCoinStepTable(step) {
      const titles = {
        1: "1. Request For Reward (48h AI & Manual Audit)",
        2: "2. Under 1 to 7 Days (Verified Desk)",
        3: "3. Under 8 to 12 Days (Coins Generated)",
        4: "4. Final Step (Payout Execution)"
      };

      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0;">${titles[step]}</h3>
            <span style="font-size:12px; font-weight:700; color:#16a34a;">AI & MANUAL ACTIVE</span>
          </div>

          ${renderFilterBar(`tblGcStep${step}`)}

          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:1100px;">
              <thead>
                <tr>
                  <th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Phone</th>
                  <th>Product Price</th><th>Product Name</th><th>Proof Doc</th><th>Progress</th><th>Action / Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colspan="11" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">No live Green Coin claims in this stage.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    function showGreenCoinHistoryHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#0284c7; border:2px solid #0369a1; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Green Coin History</h3>
          </div>
          <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="gHist1" class="stock-square-card" style="width:170px; height:170px; background:#ffffff; border:2px solid #dfcfbc; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:38px;">🟢</span>
              <span style="font-size:14px; font-weight:900; color:#16a34a; text-align:center; line-height:1.2;">A) COMPLETED<br/>COINS</span>
            </button>
            <button type="button" id="gHist2" class="stock-square-card" style="width:170px; height:170px; background:#ffffff; border:2px solid #dfcfbc; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:38px;">🤖</span>
              <span style="font-size:14px; font-weight:900; color:#dc2626; text-align:center; line-height:1.2;">B) BIN<br/>BY AI</span>
            </button>
            <button type="button" id="gHist3" class="stock-square-card" style="width:170px; height:170px; background:#ffffff; border:2px solid #dfcfbc; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:38px;">👤</span>
              <span style="font-size:14px; font-weight:900; color:#b91c1c; text-align:center; line-height:1.2;">C) BIN<br/>BY MANUAL</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('gHist1').onclick = () => pushScreen(() => showGenericTable('Completed Green Coins', 'No completed coin claims logged.'), 'gc-h1');
      document.getElementById('gHist2').onclick = () => pushScreen(() => showGenericTable('Recycling Bin (AI Anomaly)', 'No AI auto-rejected records.'), 'gc-h2');
      document.getElementById('gHist3').onclick = () => pushScreen(() => showGenericTable('Recycling Bin (Manual Rejected)', 'No manual rejected records.'), 'gc-h3');
    }

    // =========================================================================
    // EBOOK PURCHASES CLAIM HUB
    // =========================================================================
    function showEbookHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 24px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">E-Book Purchases Claim Hub</h3>
          </div>
          <div style="display:flex; gap:24px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="ebHubCash" class="stock-square-card" style="width:175px; height:175px; background:#0284c7; border:none; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:40px;">💵</span>
              <span style="font-size:15px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Sales by<br/>Cash</span>
            </button>
            <button type="button" id="ebHubCoin" class="stock-square-card" style="width:175px; height:175px; background:#0284c7; border:none; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:40px;">🪙</span>
              <span style="font-size:15px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Sale by<br/>Green Coin</span>
            </button>
            <button type="button" id="ebHubBank" class="stock-square-card" style="width:175px; height:175px; background:#0284c7; border:none; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:40px;">🏦</span>
              <span style="font-size:15px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Bank<br/>(Coin Vault)</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('ebHubCash').onclick = () => pushScreen(showEbCashSubHub, 'eb-cash-sub');
      document.getElementById('ebHubCoin').onclick = () => pushScreen(showEbCoinSubHub, 'eb-coin-sub');
      document.getElementById('ebHubBank').onclick = () => pushScreen(showCoinBankVault, 'eb-bank-vault');
    }

    // --- SALES BY CASH (4 DESKS) ---
    function showEbCashSubHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#1e3a8a; border:2px solid #172554; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Sales By Cash (UPI / PG)</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="ebcDesk1" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">1. CUSTOMER<br/>TRANSFER<br/>DETAILS</span>
            </button>
            <button type="button" id="ebcDesk2" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">2. SALES<br/>DETAILS</span>
            </button>
            <button type="button" id="ebcDesk3" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">3. FAILED<br/>TRANSACTION</span>
            </button>
            <button type="button" id="ebcDesk4" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">4. LEDGER<br/>ACCOUNT</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('ebcDesk1').onclick = () => pushScreen(showCashTransferDetails, 'eb-c-transfer');
      document.getElementById('ebcDesk2').onclick = () => pushScreen(showCashSalesDetails, 'eb-c-sales');
      document.getElementById('ebcDesk3').onclick = () => pushScreen(showCashFailedDesk, 'eb-c-failed');
      document.getElementById('ebcDesk4').onclick = () => pushScreen(showCashLedgerAccount, 'eb-c-ledger');
    }

    function showCashTransferDetails() {
      const db = getCustDB();
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0;">1. CUSTOMER TRANSFER DETAILS (AI 2-SECOND DISPATCH)</h3>
          </div>
          ${renderFilterBar('tblEbCT')}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:1200px;">
              <thead>
                <tr>
                  <th>S.No.</th><th>Date & Exact Time</th><th>Order ID</th><th>User Name</th><th>User ID</th>
                  <th>Email</th><th>E-Book Name</th><th>Serial No. (10-Digit)</th><th>Price</th><th>Amount Paid</th>
                  <th>Bank UTR / Trans ID</th><th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                ${db.cashEbookSales.length === 0
                  ? '<tr><td colspan="12" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">No live E-Book purchase orders yet.</td></tr>'
                  : db.cashEbookSales.map((e, i) => `
                    <tr>
                      <td>${i + 1}</td><td>${e.dateTime}</td><td><b>${e.orderId}</b></td><td>${e.name}</td><td>${e.userId}</td>
                      <td>${e.email}</td><td>${e.bookName}</td><td><code>${e.serialNo}</code></td><td>₹${e.price}</td>
                      <td><b style="color:#16a34a;">₹${e.paid}</b></td><td><code>${e.utr}</code></td>
                      <td><span class="status-badge badge-active">🟢 VERIFIED BY BANK</span></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
     function showCashSalesDetails() {
      const db = getCustDB();
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0;">2. SALES DETAILS & BANK RECONCILIATION</h3>
          </div>
          ${renderFilterBar('tblEbCS')}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:1200px;">
              <thead>
                <tr>
                  <th>S.No.</th><th>Order ID</th><th>Date & Exact Time</th><th>Name</th><th>User ID</th>
                  <th>Book Title</th><th>Serial No.</th><th>Gross Paid (₹)</th><th>Est. Bank Credit (₹)</th>
                  <th>Bank UTR</th><th>Delivery Status</th><th>Bank Match</th>
                </tr>
              </thead>
              <tbody>
                ${db.cashEbookSales.length === 0
                  ? '<tr><td colspan="12" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">No sales records logged yet.</td></tr>'
                  : db.cashEbookSales.map((s, i) => `
                    <tr>
                      <td>${i + 1}</td><td><b>${s.orderId}</b></td><td>${s.dateTime}</td><td>${s.name}</td><td>${s.userId}</td>
                      <td>${s.bookName}</td><td><code>${s.serialNo}</code></td><td>₹${s.paid}</td>
                      <td>₹${(s.paid * 0.976).toFixed(2)}</td><td><code>${s.utr}</code></td>
                      <td><span class="status-badge badge-active">🟢 Auto-Delivered</span></td>
                      <td><button type="button" class="btn-action-sm btn-green">Verified ✓</button></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    function showCashFailedDesk() {
      const db = getCustDB();
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#dc2626; margin:0;">3. FAILED / DROPPED TRANSACTIONS DESK</h3>
          </div>
          ${renderFilterBar('tblEbCF')}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:1300px;">
              <thead>
                <tr>
                  <th>Attempt ID</th><th>Date/Time</th><th>Name</th><th>User ID</th><th>Email</th><th>Phone</th>
                  <th>Book Selected</th><th>Price</th><th>Failure Reason (AI Tag)</th><th>Bank UTR</th>
                  <th>Quick Action</th><th>Auto-Recheck</th><th>Transaction State</th>
                </tr>
              </thead>
              <tbody>
                ${db.failedCashOrders.length === 0
                  ? '<tr><td colspan="13" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">No failed transactions found.</td></tr>'
                  : db.failedCashOrders.map((f, i) => `
                    <tr>
                      <td><b>${f.attemptId}</b></td><td>${f.dateTime}</td><td>${f.name}</td><td>${f.userId}</td><td>${f.email}</td><td>${f.phone}</td>
                      <td>${f.bookName}</td><td>₹${f.price}</td><td style="color:#dc2626; font-weight:700;">${f.reason}</td><td>${f.utr || 'Not Generated'}</td>
                      <td>
                        <button type="button" class="btn-action-sm btn-gold">⚡ Force Deliver PDF</button>
                        <button type="button" class="btn-action-sm btn-red">❌ Cancel</button>
                      </td>
                      <td><span class="status-badge badge-pending">Recheck (48h)</span></td>
                      <td><b>${f.status || 'Failed'}</b></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    function showCashLedgerAccount() {
      const db = getCustDB();
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0;">4. FINANCIAL LEDGER ACCOUNT (DAILY AUDIT)</h3>
          </div>
          ${renderFilterBar('tblEbCL')}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:1200px;">
              <thead>
                <tr>
                  <th>S.No.</th><th>Date/Time</th><th>Order ID</th><th>User ID</th><th>Actual Price</th>
                  <th>Platform Fee</th><th>Tax Pay (GST)</th><th>Received Money</th><th>Pending Money</th>
                  <th>Cancelled</th><th>UTR Match</th>
                </tr>
              </thead>
              <tbody>
                ${db.cashEbookSales.length === 0
                  ? '<tr><td colspan="11" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">Ledger is clean for this period.</td></tr>'
                  : db.cashEbookSales.map((l, i) => `
                    <tr>
                      <td>${i + 1}</td><td>${l.dateTime}</td><td><b>${l.orderId}</b></td><td>${l.userId}</td>
                      <td>₹${l.price}</td><td>₹${(l.price * 0.02).toFixed(2)}</td><td>₹${(l.price * 0.0036).toFixed(2)}</td>
                      <td><b style="color:#16a34a;">₹${(l.price * 0.976).toFixed(2)}</b></td><td>₹0</td><td>₹0</td>
                      <td><span style="color:#16a34a; font-weight:800;">✓ Correct</span></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
          <div style="background:#fbf8f3; border:1px solid #dfcfbc; padding:14px 20px; border-radius:10px; margin-top:14px; display:flex; justify-content:space-between; flex-wrap:wrap; font-size:13px; font-weight:800; color:#3b2219;">
            <div>Gross Total Sales: ₹0</div>
            <div>Net Profit: ₹0</div>
            <div>Total Cancelled: 0</div>
            <div>Pending Orders: 0</div>
          </div>
        </div>
      `;
    }

    // --- SALES BY GREEN COIN (4 DESKS) ---
    function showEbCoinSubHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#15803d; border:2px solid #14532d; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Sales By Green Coin</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="ebgDesk1" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">1. SALE BY<br/>GREEN COINS</span>
            </button>
            <button type="button" id="ebgDesk2" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">2. SALES<br/>DETAIL 2</span>
            </button>
            <button type="button" id="ebgDesk3" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">3. WRONG<br/>TRANSACTION</span>
            </button>
            <button type="button" id="ebgDesk4" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">4. TRANSACTION<br/>BOOK</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('ebgDesk1').onclick = () => pushScreen(() => showGenericTable('1. Sale By Green Coins (AI Verified)', 'No Green Coin purchases yet.'), 'eb-g-trans');
      document.getElementById('ebgDesk2').onclick = () => pushScreen(() => showGenericTable('2. Green Coin Sales Detail 2', 'No sales records logged yet.'), 'eb-g-sales');
      document.getElementById('ebgDesk3').onclick = () => pushScreen(() => showGenericTable('3. Wrong Transaction (Insufficient Coins)', 'No wrong transactions.'), 'eb-g-wrong');
      document.getElementById('ebgDesk4').onclick = () => pushScreen(() => showGenericTable('4. Green Coin Transaction Book', 'Transaction book is clean.'), 'eb-g-book');
    }

    // --- BANK (COIN VAULT) ---
    function showCoinBankVault() {
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0;">🏦 BANK (CENTRAL GREEN COIN VAULT)</h3>
          </div>
          ${renderFilterBar('tblCoinBankVault')}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:900px;">
              <thead><tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Transaction Type</th><th>Coins Inflow</th><th>Generated UTR</th><th>AI Delivery Status</th></tr></thead>
              <tbody><tr><td colspan="7" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">No transactions in Coin Bank Vault yet.</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    // =========================================================================
    // REGISTER ID MATRIX
    // =========================================================================
    function showRegisterHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 24px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">Register ID Matrix</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="rgDesk1" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">1. CUSTOMER<br/>REGISTER<br/>DETAIL</span>
            </button>
            <button type="button" id="rgDesk2" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">2. CUSTOMER<br/>REFERRAL<br/>DETAIL</span>
            </button>
            <button type="button" id="rgDesk3" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">3. LOGIN BY<br/>REFERRAL<br/>CODE</span>
            </button>
            <button type="button" id="rgDesk4" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px; cursor:pointer;">
              <span style="font-size:13px; font-weight:900; color:#fff; text-align:center; line-height:1.2;">4. CUSTOMER<br/>BLOCK<br/>DATABASE</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('rgDesk1').onclick = () => pushScreen(() => showGenericTable('1. Customer Register Detail', 'No registered customer accounts yet.'), 'reg-1');
      document.getElementById('rgDesk2').onclick = () => pushScreen(showReferralSplitDesk, 'reg-2');
      document.getElementById('rgDesk3').onclick = () => pushScreen(() => showGenericTable('3. Accounts Created via Referral Code', 'No accounts created via referral code yet.'), 'reg-3');
      document.getElementById('rgDesk4').onclick = () => pushScreen(() => showGenericTable('4. Blocked Customer Database', 'No blocked customer accounts.'), 'reg-4');
    }

    // Referral Ledger (Sky Blue -> Bold Line -> 5 Yellow -> Pink -> Green)
    function showReferralSplitDesk() {
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#0284c7; margin:0;">2. CUSTOMER REFERRAL MATCH LEDGER</h3>
          </div>
          ${renderFilterBar('tblRegRef')}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:1400px;">
              <thead>
                <tr>
                  <th colspan="5" style="background:#0284c7; color:#fff; text-align:center;">New User Details (Sky Blue Section)</th>
                  <th style="background:#000; width:6px; padding:0;"></th>
                  <th colspan="5" style="background:#ca8a04; color:#fff; text-align:center;">5 Match Rows (Yellow Section)</th>
                  <th style="background:#000; width:6px; padding:0;"></th>
                  <th colspan="4" style="background:#db2777; color:#fff; text-align:center;">Referrer Info (Pink Section)</th>
                  <th style="background:#16a34a; color:#fff; text-align:center;">Transfer Status</th>
                </tr>
                <tr>
                  <th style="color:#0284c7;">S.No.</th><th style="color:#0284c7;">Date/Time</th><th style="color:#0284c7;">User ID</th><th style="color:#0284c7;">Name</th><th style="color:#0284c7;">Email</th>
                  <th style="background:#000; width:6px; padding:0;"></th>
                  <th style="color:#ca8a04;">Invite Code</th><th style="color:#ca8a04;">Received Code</th><th style="color:#ca8a04;">Match Status</th><th style="color:#ca8a04;">Coin Inviter (7)</th><th style="color:#ca8a04;">Coin Receiver (4)</th>
                  <th style="background:#000; width:6px; padding:0;"></th>
                  <th style="color:#db2777;">Inviter Name</th><th style="color:#db2777;">Inviter User ID</th><th style="color:#db2777;">Inviter Email</th><th style="color:#db2777;">Original Code</th>
                  <th style="color:#16a34a;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colspan="17" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">No referral login logs registered yet.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
     // =========================================================================
    // VISITOR COUNT, CLICK ANALYTICS & SECURITY ROOM
    // =========================================================================
    function showVisitorHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 24px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">Visitor Traffic Monitor</h3>
          </div>
          <div style="display:flex; gap:24px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="visDesk1" class="stock-square-card" style="width:175px; height:175px; background:#0284c7; border:none; border-radius:22px; color:#fff; font-weight:900; cursor:pointer;">
              <span style="font-size:40px;">🌐</span><br/>GUEST MODE<br/>VISITORS
            </button>
            <button type="button" id="visDesk2" class="stock-square-card" style="width:175px; height:175px; background:#0284c7; border:none; border-radius:22px; color:#fff; font-weight:900; cursor:pointer;">
              <span style="font-size:40px;">👤</span><br/>LOGIN<br/>VISITORS
            </button>
          </div>
        </div>
      `;

      document.getElementById('visDesk1').onclick = () => pushScreen(() => showGenericTable('Guest Mode Visitors (Unregistered)', '0 guest visitors logged.'), 'vis-g');
      document.getElementById('visDesk2').onclick = () => pushScreen(() => showGenericTable('Logged In Member Visitors', '0 active members logged.'), 'vis-l');
    }

    function showClickAnalytics() {
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0;">PLATFORM REDIRECTION CLICK ANALYTICS</h3>
          </div>
          ${renderFilterBar('tblClicks')}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:900px;">
              <thead><tr><th>Store Platform</th><th>Today Clicks</th><th>Yesterday</th><th>Weekly</th><th>Monthly</th><th>Yearly</th><th>All Time</th></tr></thead>
              <tbody>
                <tr><td>Amazon Deals</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>0</b></td></tr>
                <tr><td>Flipkart Deals</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>0</b></td></tr>
                <tr><td>Myntra / Ajio</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>0</b></td></tr>
                <tr><td>Other Affiliate Stores</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>0</b></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    function showSecurityRoom() {
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0;">🛡️ SECURITY ROOM: 5-LAYER DEFENSE</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:12px; margin-bottom:16px;">
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:14px; border-radius:10px;"><b>Layer 1: Cloudflare Perimeter</b><br/><span style="color:#16a34a; font-size:12px; font-weight:700;">ONLINE (100%)</span></div>
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:14px; border-radius:10px;"><b>Layer 2: DevTools & Tamper Trap</b><br/><span style="color:#16a34a; font-size:12px; font-weight:700;">LOCKED</span></div>
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:14px; border-radius:10px;"><b>Layer 3: Telegram Instant Alert</b><br/><span style="color:#16a34a; font-size:12px; font-weight:700;">ARMED</span></div>
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:14px; border-radius:10px;"><b>Layer 4: Auto-Stealth Cloak</b><br/><span style="color:#16a34a; font-size:12px; font-weight:700;">STANDBY</span></div>
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:14px; border-radius:10px;"><b>Layer 5: Data Air-Gap Isolation</b><br/><span style="color:#16a34a; font-size:12px; font-weight:700;">SECURED</span></div>
          </div>
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:800px;">
              <thead><tr><th>Time</th><th>Threat Type</th><th>Detected IP</th><th>Target Route</th><th>Auto-Defense Status</th></tr></thead>
              <tbody><tr><td colspan="5" style="text-align:center; padding:24px; color:#16a34a; font-weight:700;">✓ Perimeter completely clean. 0 intrusion attempts recorded.</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    function showGenericTable(title, emptyText) {
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0;">${title}</h3>
          </div>
          ${renderFilterBar('tblGen')}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:1000px;">
              <thead><tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Details</th><th>Status</th></tr></thead>
              <tbody><tr><td colspan="7" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">${emptyText}</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Launch Level 1
    screenStack.length = 0;
    screenStack.push(showLevel1);
    showLevel1();
  };
})();
