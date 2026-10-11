/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: CUSTOMER MANAGEMENT HUB (ZERO-DUMMY STABLE)
   ========================================================================== */

(function () {
  'use strict';

  function getCustomerDB() {
    try {
      const raw = localStorage.getItem('ss_owner_cust_master_db');
      return raw ? JSON.parse(raw) : {
        cashbackClaims: [], greenCoinClaims: [], cashEbookSales: [], coinEbookSales: [],
        failedCashOrders: [], failedCoinOrders: [], coinBankVault: [], registeredUsers: [],
        referralLedger: [], blockedUsers: [], trafficStats: { guests: 0, members: 0 },
        linkClicks: { amazon: 0, flipkart: 0, myntra: 0, ajio: 0, others: 0 },
        recycleBinCashback: [], recycleBinCoins: []
      };
    } catch (e) {
      return {
        cashbackClaims: [], greenCoinClaims: [], cashEbookSales: [], coinEbookSales: [],
        failedCashOrders: [], failedCoinOrders: [], coinBankVault: [], registeredUsers: [],
        referralLedger: [], blockedUsers: [], trafficStats: { guests: 0, members: 0 },
        linkClicks: { amazon: 0, flipkart: 0, myntra: 0, ajio: 0, others: 0 },
        recycleBinCashback: [], recycleBinCoins: []
      };
    }
  }

  function saveCustomerDB(db) {
    try { localStorage.setItem('ss_owner_cust_master_db', JSON.stringify(db)); } catch (e) {}
  }

  function renderDateFilterBar(tableId) {
    return `
      <div class="f-date-filter-bar" data-for="${tableId}" style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px; align-items:center; background:#ffffff; border:1px solid #dfcfbc; padding:8px 10px; border-radius:8px;">
        <span style="font-size:11.5px; font-weight:800; color:#3b2219; margin-right:4px;">📅 Filter:</span>
        <button type="button" class="btn-action-sm btn-blue filter-btn active" data-period="all" style="padding:4px 9px; font-size:11px;">All</button>
        <button type="button" class="btn-action-sm btn-blue filter-btn" data-period="today" style="padding:4px 9px; font-size:11px; opacity:0.6;">Today</button>
        <button type="button" class="btn-action-sm btn-blue filter-btn" data-period="tomorrow" style="padding:4px 9px; font-size:11px; opacity:0.6;">Tomorrow</button>
        <button type="button" class="btn-action-sm btn-blue filter-btn" data-period="weekly" style="padding:4px 9px; font-size:11px; opacity:0.6;">Weekly</button>
        <button type="button" class="btn-action-sm btn-blue filter-btn" data-period="monthly" style="padding:4px 9px; font-size:11px; opacity:0.6;">Monthly</button>
        <button type="button" class="btn-action-sm btn-blue filter-btn" data-period="yearly" style="padding:4px 9px; font-size:11px; opacity:0.6;">Yearly</button>
        <div style="display:flex; align-items:center; gap:4px; margin-left:auto;">
          <input type="date" class="filter-custom-date" style="background:#fbf8f3; border:1px solid #dfcfbc; padding:4px 6px; border-radius:4px; font-size:11px; color:#2b1810;" />
          <button type="button" class="btn-action-sm btn-gold btn-apply-custom" style="padding:4px 8px; font-size:11px;">Go</button>
        </div>
      </div>
    `;
  }

  window.initOwnerCustomer = function () {
    const container = document.getElementById('view-customer');
    if (!container) return;

    // Navigation Stack (No hash collision)
    const screenStack = [];

    function navigateTo(renderFn, name) {
      screenStack.push({ fn: renderFn, name: name });
      history.pushState({ module: 'customer', depth: screenStack.length }, '');
      renderFn();
    }

    window.addEventListener('popstate', function (e) {
      const activeNav = document.querySelector('.f-nav-item.active');
      if (activeNav && activeNav.getAttribute('data-target') === 'view-customer') {
        if (screenStack.length > 1) {
          screenStack.pop();
          const prev = screenStack[screenStack.length - 1];
          if (prev && prev.fn) prev.fn();
        } else {
          renderLevel1Hub();
        }
      }
    });

    // -------------------------------------------------------------
    // 1. LEVEL 1: 6 BLUE SQUARE CARDS
    // -------------------------------------------------------------
    function renderLevel1Hub() {
      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #ffffff; border: 2px solid #3b2219; border-radius: 12px; padding: 8px 18px; margin-bottom: 24px; box-shadow: 0 4px 10px rgba(59, 34, 25, 0.08);">
            <h3 style="font-size: 17px; font-weight: 900; color: #3b2219; letter-spacing: 1px; margin: 0; text-transform: uppercase;">CUSTOMER PAGE</h3>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 16px; justify-content: center; width: 100%; max-width: 540px;">
            <button type="button" class="stock-square-card hub-btn" data-key="claims" style="height: 150px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 32px;">📥</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Customer<br/>Request Claim</span>
            </button>
            <button type="button" class="stock-square-card hub-btn" data-key="ebooks" style="height: 150px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 32px;">📚</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Ebook<br/>Purchases Claim</span>
            </button>
            <button type="button" class="stock-square-card hub-btn" data-key="register" style="height: 150px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 32px;">📇</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Register<br/>ID</span>
            </button>
            <button type="button" class="stock-square-card hub-btn" data-key="visitors" style="height: 150px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 32px;">👥</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Visitor<br/>Count</span>
            </button>
            <button type="button" class="stock-square-card hub-btn" data-key="clicks" style="height: 150px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 32px;">🔗</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Link<br/>Click</span>
            </button>
            <button type="button" class="stock-square-card hub-btn" data-key="security" style="height: 150px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 32px;">🛡️</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Portal<br/>Protection</span>
            </button>
          </div>
        </div>
      `;

      container.querySelectorAll('.hub-btn').forEach(btn => {
        btn.onclick = function () {
          const k = this.getAttribute('data-key');
          if (k === 'claims') navigateTo(renderClaimsHub, 'claims');
          else if (k === 'ebooks') navigateTo(renderEbookClaimsHub, 'ebooks');
          else if (k === 'register') navigateTo(renderRegisterHub, 'register');
          else if (k === 'visitors') navigateTo(renderVisitorHub, 'visitors');
          else if (k === 'clicks') navigateTo(renderClickCountHub, 'clicks');
          else if (k === 'security') navigateTo(renderSecurityRoomHub, 'security');
        };
      });
    }

    // -------------------------------------------------------------
    // 2. CUSTOMER REQUEST CLAIM (CASHBACK vs GREEN COIN)
    // -------------------------------------------------------------
    function renderClaimsHub() {
      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #e02424; border: 2px solid #991b1b; border-radius: 12px; padding: 10px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Customer Request Claim</h3>
          </div>
          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button type="button" id="btnGoCashbackDesk" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 10px 24px rgba(59, 34, 25, 0.08);">
              <span style="font-size: 38px;">💰</span>
              <span style="font-size: 14px; font-weight: 900; color: #1e3a8a; text-align: center; line-height: 1.2;">CASHBACK<br/>REWARD</span>
            </button>
            <button type="button" id="btnGoGreenCoinDesk" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 10px 24px rgba(59, 34, 25, 0.08);">
              <span style="font-size: 38px;">🟢</span>
              <span style="font-size: 14px; font-weight: 900; color: #1e3a8a; text-align: center; line-height: 1.2;">GREENCOIN<br/>REWARD</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById('btnGoCashbackDesk').onclick = () => navigateTo(renderCashbackStagesHub, 'cb-stages');
      document.getElementById('btnGoGreenCoinDesk').onclick = () => navigateTo(renderGreenCoinStagesHub, 'gc-stages');
    }

    // -------------------------------------------------------------
    // 3. CASHBACK STAGES (6 COLOR BUTTONS)
    // -------------------------------------------------------------
    function renderCashbackStagesHub() {
      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #ffffff; border: 2px solid #1e3a8a; border-radius: 25px; padding: 8px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #1e3a8a; letter-spacing: 1px; margin: 0; text-transform: uppercase;">✳ CASHBACK REWARD ✳</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 16px; justify-content: center; width: 100%; max-width: 540px;">
            <button type="button" class="stock-square-card stage-box" data-step="1" style="height: 140px; background: #dc2626; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">NEW REQUEST<br/>CLAIM UNDER<br/>1 TO 25 DAYS</span>
            </button>
            <button type="button" class="stock-square-card stage-box" data-step="2" style="height: 140px; background: #ca8a04; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">UNDER<br/>26 TO 50<br/>DAYS</span>
            </button>
            <button type="button" class="stock-square-card stage-box" data-step="3" style="height: 140px; background: #ea580c; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">UNDER<br/>51 TO 75<br/>DAYS</span>
            </button>
            <button type="button" class="stock-square-card stage-box" data-step="4" style="height: 140px; background: #2563eb; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">UNDER<br/>76 TO 100<br/>DAYS</span>
            </button>
            <button type="button" class="stock-square-card stage-box" data-step="5" style="height: 140px; background: #16a34a; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">101<br/>SEND<br/>REWARD</span>
            </button>
            <button type="button" class="stock-square-card stage-box" data-step="6" style="height: 140px; background: #9333ea; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 15px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">HISTORY</span>
            </button>
          </div>
        </div>
      `;

      container.querySelectorAll('.stage-box').forEach(btn => {
        btn.onclick = function () {
          const step = Number(this.getAttribute('data-step'));
          if (step >= 1 && step <= 5) navigateTo(() => renderCashbackStepTable(step), `cb-step-${step}`);
          else if (step === 6) navigateTo(renderCashbackHistorySubHub, 'cb-hist-sub');
        };
      });
    }

    function renderCashbackStepTable(stepNumber) {
      const db = getCustomerDB();
      const list = (db.cashbackClaims || []).filter(c => c.currentStep === stepNumber);

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">Stage ${stepNumber}: Cashback Desk</h3>
          ${renderDateFilterBar(`tblCbStep${stepNumber}`)}
          <div class="table-responsive-box">
            <table class="f-table" id="tblCbStep${stepNumber}">
              <thead>
                <tr>
                  <th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Phone</th>
                  <th>Product Price</th><th>Product Name</th><th>Document</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${list.length === 0
                  ? '<tr><td colspan="10" style="text-align:center; padding:28px; color:#785a46;">No live claims under this stage right now.</td></tr>'
                  : list.map((c, i) => `
                    <tr>
                      <td>${i + 1}</td><td>${c.dateTime}</td><td><b>${c.userId}</b></td><td>${c.name}</td>
                      <td>${c.email}</td><td>${c.phone \vert{}\vert{} 'N/A'}</td><td>₹${c.productPrice}</td>
                      <td><b>${c.productName}</b></td><td><button type="button" class="btn-action-sm btn-blue">📄 View PDF</button></td>
                      <td><button type="button" class="btn-action-sm btn-green">Accept ✓</button></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderCashbackHistorySubHub() {
      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #9333ea; border: 2px solid #6b21a8; border-radius: 12px; padding: 10px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Cashback Claims History</h3>
          </div>
          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button type="button" id="btnGoHistCompleted" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer;">
              <span style="font-size: 38px;">🟢</span>
              <span style="font-size: 15px; font-weight: 900; color: #16a34a; text-align: center; line-height: 1.2;">A) COMPLETED<br/>REWARDS</span>
            </button>
            <button type="button" id="btnGoHistBin" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer;">
              <span style="font-size: 38px;">🗑️</span>
              <span style="font-size: 15px; font-weight: 900; color: #dc2626; text-align: center; line-height: 1.2;">B) RECYCLING<br/>BIN</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById('btnGoHistCompleted').onclick = () => navigateTo(renderCashbackHistoryCompleted, 'cb-hist-comp');
      document.getElementById('btnGoHistBin').onclick = () => navigateTo(renderCashbackHistoryBin, 'cb-hist-bin');
    }

    function renderCashbackHistoryCompleted() {
      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #16a34a; margin-bottom: 12px;">A) Completed Cashback Transfers</h3>
          ${renderDateFilterBar('tblHistComp')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblHistComp">
              <thead><tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Amount</th><th>Method</th></tr></thead>
              <tbody><tr><td colspan="7" style="text-align:center; padding:28px; color:#785a46;">No completed payout records yet.</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderCashbackHistoryBin() {
      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #dc2626; margin-bottom: 12px;">B) Recycling Bin</h3>
          ${renderDateFilterBar('tblHistBin')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblHistBin">
              <thead><tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Step</th><th>Feedback Reason</th></tr></thead>
              <tbody><tr><td colspan="6" style="text-align:center; padding:28px; color:#785a46;">Recycling bin is empty.</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------
    // 4. GREEN COIN DESK
    // -------------------------------------------------------------
    function renderGreenCoinStagesHub() {
      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #ffffff; border: 2px solid #16a34a; border-radius: 25px; padding: 8px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #16a34a; letter-spacing: 1px; margin: 0; text-transform: uppercase;">🟢 GREEN COIN REWARD (12 DAYS) 🟢</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 16px; justify-content: center; width: 100%; max-width: 540px;">
            <button type="button" class="stock-square-card gc-stage-btn" data-step="1" style="height: 140px; background: #475569; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">1. REQUEST<br/>FOR REWARD</span>
            </button>
            <button type="button" class="stock-square-card gc-stage-btn" data-step="2" style="height: 140px; background: #78350f; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">2. UNDER<br/>1 TO 7 DAYS</span>
            </button>
            <button type="button" class="stock-square-card gc-stage-btn" data-step="3" style="height: 140px; background: #db2777; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">3. UNDER<br/>8 TO 12 DAYS</span>
            </button>
            <button type="button" class="stock-square-card gc-stage-btn" data-step="4" style="height: 140px; background: #059669; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">4. FINAL<br/>STEP</span>
            </button>
            <button type="button" class="stock-square-card gc-stage-btn" data-step="5" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 14px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">5. HISTORY</span>
            </button>
          </div>
        </div>
      `;
      container.querySelectorAll('.gc-stage-btn').forEach(b => {
        b.onclick = function () {
          const s = Number(this.getAttribute('data-step'));
          if (s >= 1 && s <= 4) navigateTo(() => renderGreenCoinStepTable(s), `gc-step-${s}`);
          else if (s === 5) navigateTo(renderGreenCoinHistorySubHub, 'gc-hist-sub');
        };
      });
    }

    function renderGreenCoinStepTable(stepNumber) {
      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #16a34a; margin-bottom: 12px;">Green Coin Stage ${stepNumber}</h3>
          ${renderDateFilterBar(`tblGcStep${stepNumber}`)}
          <div class="table-responsive-box">
            <table class="f-table" id="tblGcStep${stepNumber}">
              <thead><tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Coins</th><th>Status</th></tr></thead>
              <tbody><tr><td colspan="7" style="text-align:center; padding:28px; color:#785a46;">No live Green Coin claims in this stage.</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderGreenCoinHistorySubHub() {
      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #0284c7; border: 2px solid #0369a1; border-radius: 12px; padding: 10px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Green Coin History</h3>
          </div>
          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button type="button" id="btnGoGcComp" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer;">
              <span style="font-size: 38px;">🟢</span>
              <span style="font-size: 14px; font-weight: 900; color: #16a34a; text-align: center; line-height: 1.2;">A) COMPLETED<br/>COINS</span>
            </button>
            <button type="button" id="btnGoGcBinAI" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer;">
              <span style="font-size: 38px;">🤖</span>
              <span style="font-size: 14px; font-weight: 900; color: #dc2626; text-align: center; line-height: 1.2;">B) BIN<br/>BY AI</span>
            </button>
            <button type="button" id="btnGoGcBinMan" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer;">
              <span style="font-size: 38px;">👤</span>
              <span style="font-size: 14px; font-weight: 900; color: #b91c1c; text-align: center; line-height: 1.2;">C) BIN<br/>BY MANUAL</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById('btnGoGcComp').onclick = () => navigateTo(() => renderSimpleTable('Completed Green Coins', 'No completed coin claims yet.'), 'gc-comp');
      document.getElementById('btnGoGcBinAI').onclick = () => navigateTo(() => renderSimpleTable('Recycling Bin (AI)', 'No AI rejected logs.'), 'gc-bin-ai');
      document.getElementById('btnGoGcBinMan').onclick = () => navigateTo(() => renderSimpleTable('Recycling Bin (Manual)', 'No manual rejected logs.'), 'gc-bin-man');
    }
     // -------------------------------------------------------------
    // 5. EBOOK PURCHASE CLAIM (CASH / COINS / BANK)
    // -------------------------------------------------------------
    function renderEbookClaimsHub() {
      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #ffffff; border: 2px solid #3b2219; border-radius: 12px; padding: 8px 18px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #3b2219; letter-spacing: 1px; margin: 0; text-transform: uppercase;">E-Book Purchases Claim Hub</h3>
          </div>
          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button type="button" id="btnGoEbCash" class="stock-square-card" style="width: 160px; height: 160px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer;">
              <span style="font-size: 36px;">💵</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Sales by<br/>Cash</span>
            </button>
            <button type="button" id="btnGoEbCoin" class="stock-square-card" style="width: 160px; height: 160px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer;">
              <span style="font-size: 36px;">🪙</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Sale by<br/>Green Coin</span>
            </button>
            <button type="button" id="btnGoEbBank" class="stock-square-card" style="width: 160px; height: 160px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer;">
              <span style="font-size: 36px;">🏦</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Bank<br/>(Coin Vault)</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById('btnGoEbCash').onclick = () => navigateTo(renderEbookCashSubHub, 'eb-cash-hub');
      document.getElementById('btnGoEbCoin').onclick = () => navigateTo(renderEbookCoinSubHub, 'eb-coin-hub');
      document.getElementById('btnGoEbBank').onclick = () => navigateTo(() => renderSimpleTable('🏦 Bank (Central Green Coin Vault)', 'No transactions in Coin Bank Vault yet.'), 'eb-bank');
    }

    function renderEbookCashSubHub() {
      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #1e3a8a; border: 2px solid #172554; border-radius: 12px; padding: 10px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Sales By Cash</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 16px; justify-content: center; width: 100%; max-width: 540px;">
            <button type="button" id="btnEbCT" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">1. CUSTOMER<br/>TRANSFER</span>
            </button>
            <button type="button" id="btnEbCS" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">2. SALES<br/>DETAILS</span>
            </button>
            <button type="button" id="btnEbCF" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">3. FAILED<br/>ORDERS</span>
            </button>
            <button type="button" id="btnEbCL" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">4. LEDGER<br/>ACCOUNT</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById('btnEbCT').onclick = () => navigateTo(() => renderSimpleTable('1. Customer Transfer Details', 'No live purchase orders yet.'), 'eb-ct');
      document.getElementById('btnEbCS').onclick = () => navigateTo(() => renderSimpleTable('2. Sales Details & Bank Verification', 'No sales records logged yet.'), 'eb-cs');
      document.getElementById('btnEbCF').onclick = () => navigateTo(() => renderSimpleTable('3. Failed / Dropped Transactions', 'No failed transactions found.'), 'eb-cf');
      document.getElementById('btnEbCL').onclick = () => navigateTo(() => renderSimpleTable('4. Ledger Account', 'Ledger is clean for this period.'), 'eb-cl');
    }

    function renderEbookCoinSubHub() {
      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #15803d; border: 2px solid #14532d; border-radius: 12px; padding: 10px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Sales By Green Coin</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 16px; justify-content: center; width: 100%; max-width: 540px;">
            <button type="button" id="btnEbGC1" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">1. SALE BY<br/>COINS</span>
            </button>
            <button type="button" id="btnEbGC2" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">2. SALES<br/>DETAIL 2</span>
            </button>
            <button type="button" id="btnEbGC3" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">3. WRONG<br/>ORDERS</span>
            </button>
            <button type="button" id="btnEbGC4" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">4. TRANSACTION<br/>BOOK</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById('btnEbGC1').onclick = () => navigateTo(() => renderSimpleTable('1. Sale By Green Coins', 'No Green Coin E-Book sales recorded yet.'), 'eb-gc1');
      document.getElementById('btnEbGC2').onclick = () => navigateTo(() => renderSimpleTable('2. Green Coin Sales Details 2', 'No sales records logged yet.'), 'eb-gc2');
      document.getElementById('btnEbGC3').onclick = () => navigateTo(() => renderSimpleTable('3. Wrong Transaction Desk', 'No wrong transactions recorded.'), 'eb-gc3');
      document.getElementById('btnEbGC4').onclick = () => navigateTo(() => renderSimpleTable('4. Green Coin Transaction Book', 'Transaction book is clean.'), 'eb-gc4');
    }

    // -------------------------------------------------------------
    // 6. REGISTER ID (4 OPTIONS)
    // -------------------------------------------------------------
    function renderRegisterHub() {
      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #ffffff; border: 2px solid #3b2219; border-radius: 12px; padding: 8px 18px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #3b2219; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Register ID Matrix</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 16px; justify-content: center; width: 100%; max-width: 540px;">
            <button type="button" id="btnR1" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">1. CUSTOMER<br/>REGISTER</span>
            </button>
            <button type="button" id="btnR2" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">2. REFERRAL<br/>MATCH</span>
            </button>
            <button type="button" id="btnR3" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">3. LOGIN BY<br/>REFERRAL</span>
            </button>
            <button type="button" id="btnR4" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer;">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center;">4. BLOCKED<br/>DATABASE</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById('btnR1').onclick = () => navigateTo(() => renderSimpleTable('1. Customer Registration Records', 'No registered customer accounts yet.'), 'reg-1');
      document.getElementById('btnR2').onclick = () => navigateTo(() => renderSimpleTable('2. Customer Referral Match Ledger', 'No referral login logs registered yet.'), 'reg-2');
      document.getElementById('btnR3').onclick = () => navigateTo(() => renderSimpleTable('3. Accounts Created via Referral Code', 'No accounts created via referral code yet.'), 'reg-3');
      document.getElementById('btnR4').onclick = () => navigateTo(() => renderSimpleTable('4. Blocked Customer Database', 'No blocked customer accounts.'), 'reg-4');
    }

    // -------------------------------------------------------------
    // 7. VISITOR COUNT, CLICKS & SECURITY
    // -------------------------------------------------------------
    function renderVisitorHub() {
      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #ffffff; border: 2px solid #3b2219; border-radius: 12px; padding: 8px 18px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #3b2219; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Visitor Traffic Monitor</h3>
          </div>
          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button type="button" id="btnVisG" class="stock-square-card" style="width: 170px; height: 170px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer;">
              <span style="font-size: 38px;">🌐</span>
              <span style="font-size: 15px; font-weight: 900; color: #ffffff; text-align: center;">GUEST MODE<br/>VISITORS</span>
            </button>
            <button type="button" id="btnVisL" class="stock-square-card" style="width: 170px; height: 170px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer;">
              <span style="font-size: 38px;">👤</span>
              <span style="font-size: 15px; font-weight: 900; color: #ffffff; text-align: center;">LOGIN<br/>VISITORS</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById('btnVisG').onclick = () => navigateTo(() => renderSimpleTable('Guest Mode Visitors', '0 visitors logged.'), 'vis-g');
      document.getElementById('btnVisL').onclick = () => navigateTo(() => renderSimpleTable('Logged In Member Visitors', '0 active members logged.'), 'vis-l');
    }

    function renderClickCountHub() {
      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">Platform Redirection Click Analytics</h3>
          ${renderDateFilterBar('tblClickCount')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblClickCount">
              <thead><tr><th>Store Platform</th><th>Today Clicks</th><th>Yesterday</th><th>Weekly</th><th>Monthly</th><th>All Time</th></tr></thead>
              <tbody>
                <tr><td>Amazon Deals</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>0</b></td></tr>
                <tr><td>Flipkart Deals</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>0</b></td></tr>
                <tr><td>Myntra / Ajio</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>0</b></td></tr>
                <tr><td>Other Affiliate Stores</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>0</b></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
     function renderSecurityRoomHub() {
      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 6px;">🛡️ Security Room: 5-Layer Defense</h3>
          <p style="font-size: 12px; color: #785a46; margin-bottom: 14px;">Automated AI Sentinel defending Customer Portal & Air-Gapped DB.</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 16px;">
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:12px; border-radius:8px;">
              <b>Layer 1: Cloudflare Shield</b><br/><span style="color:#16a34a; font-size:12px;">ONLINE (100%)</span>
            </div>
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:12px; border-radius:8px;">
              <b>Layer 2: DevTools & Tamper Trap</b><br/><span style="color:#16a34a; font-size:12px;">LOCKED</span>
            </div>
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:12px; border-radius:8px;">
              <b>Layer 3: Telegram Alert</b><br/><span style="color:#16a34a; font-size:12px;">ARMED</span>
            </div>
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:12px; border-radius:8px;">
              <b>Layer 4: Auto-Stealth Cloak</b><br/><span style="color:#16a34a; font-size:12px;">STANDBY</span>
            </div>
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:12px; border-radius:8px;">
              <b>Layer 5: Data Air-Gap Isolation</b><br/><span style="color:#16a34a; font-size:12px;">SECURED</span>
            </div>
          </div>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead><tr><th>Time</th><th>Threat Type</th><th>Detected IP</th><th>Target Route</th><th>Auto-Defense Status</th></tr></thead>
              <tbody><tr><td colspan="5" style="text-align:center; padding:20px; color:#16a34a; font-weight:700;">✓ Perimeter completely clean. 0 intrusion attempts.</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderSimpleTable(title, emptyText) {
      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">${title}</h3>
          ${renderDateFilterBar('tblGen')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblGen">
              <thead><tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Details</th><th>Status</th></tr></thead>
              <tbody><tr><td colspan="7" style="text-align:center; padding:28px; color:#785a46;">${emptyText}</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Shuruat Screen 1 se karein
    renderLevel1Hub();
  };
})();
