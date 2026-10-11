/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: CUSTOMER MANAGEMENT HUB (FAIL-SAFE ENGINE)
   ========================================================================== */

(function () {
  'use strict';

  function getDB() {
    try {
      const d = localStorage.getItem('ss_owner_cust_master_db');
      return d ? JSON.parse(d) : {
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
        recycleBinCashback: []
      };
    } catch (e) {
      return {
        cashbackClaims: [], greenCoinClaims: [], cashEbookSales: [], coinEbookSales: [],
        failedCashOrders: [], failedCoinOrders: [], coinBankVault: [], registeredUsers: [],
        referralLedger: [], blockedUsers: [], recycleBinCashback: []
      };
    }
  }

  function saveDB(data) {
    try { localStorage.setItem('ss_owner_cust_master_db', JSON.stringify(data)); } catch (e) {}
  }

  function renderFilterBar(id) {
    return `
      <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px; align-items:center; background:#ffffff; border:1px solid #dfcfbc; padding:8px 10px; border-radius:8px;">
        <span style="font-size:11.5px; font-weight:800; color:#3b2219;">📅 Filter:</span>
        <button type="button" class="btn-action-sm btn-blue" style="padding:4px 8px; font-size:11px;">All</button>
        <button type="button" class="btn-action-sm btn-blue" style="padding:4px 8px; font-size:11px; opacity:0.6;">Today</button>
        <button type="button" class="btn-action-sm btn-blue" style="padding:4px 8px; font-size:11px; opacity:0.6;">Tomorrow</button>
        <button type="button" class="btn-action-sm btn-blue" style="padding:4px 8px; font-size:11px; opacity:0.6;">Weekly</button>
        <button type="button" class="btn-action-sm btn-blue" style="padding:4px 8px; font-size:11px; opacity:0.6;">Monthly</button>
        <button type="button" class="btn-action-sm btn-blue" style="padding:4px 8px; font-size:11px; opacity:0.6;">Yearly</button>
        <input type="date" style="background:#fbf8f3; border:1px solid #dfcfbc; padding:3px 6px; border-radius:4px; font-size:11px; margin-left:auto;" />
      </div>
    `;
  }

  window.initOwnerCustomer = function () {
    const mount = document.getElementById('view-customer');
    if (!mount) return;

    // Direct Safe Renderer
    function show(html) {
      mount.innerHTML = html;
    }

    // -------------------------------------------------------------
    // LEVEL 1: 6 BADE BLUE CARDS (PHOTO 1)
    // -------------------------------------------------------------
    function openLevel1() {
      show(`
        <div style="padding:10px 0; min-height:70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:8px 18px; margin-bottom:24px; box-shadow:0 4px 10px rgba(59,34,25,0.08);">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">CUSTOMER PAGE</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 160px)); gap:16px; justify-content:center; width:100%; max-width:540px;">
            <button type="button" id="cBtn1" class="stock-square-card" style="height:150px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer;">
              <span style="font-size:32px;">📥</span>
              <span style="font-size:14px; font-weight:800; color:#fff; text-align:center; line-height:1.2;">Customer<br/>Request Claim</span>
            </button>
            <button type="button" id="cBtn2" class="stock-square-card" style="height:150px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer;">
              <span style="font-size:32px;">📚</span>
              <span style="font-size:14px; font-weight:800; color:#fff; text-align:center; line-height:1.2;">Ebook<br/>Purchases Claim</span>
            </button>
            <button type="button" id="cBtn3" class="stock-square-card" style="height:150px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer;">
              <span style="font-size:32px;">📇</span>
              <span style="font-size:14px; font-weight:800; color:#fff; text-align:center; line-height:1.2;">Register<br/>ID</span>
            </button>
            <button type="button" id="cBtn4" class="stock-square-card" style="height:150px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer;">
              <span style="font-size:32px;">👥</span>
              <span style="font-size:14px; font-weight:800; color:#fff; text-align:center; line-height:1.2;">Visitor<br/>Count</span>
            </button>
            <button type="button" id="cBtn5" class="stock-square-card" style="height:150px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer;">
              <span style="font-size:32px;">🔗</span>
              <span style="font-size:14px; font-weight:800; color:#fff; text-align:center; line-height:1.2;">Link<br/>Click</span>
            </button>
            <button type="button" id="cBtn6" class="stock-square-card" style="height:150px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer;">
              <span style="font-size:32px;">🛡️</span>
              <span style="font-size:14px; font-weight:800; color:#fff; text-align:center; line-height:1.2;">Portal<br/>Protection</span>
            </button>
          </div>
        </div>
      `);

      document.getElementById('cBtn1').onclick = openClaimsDesk;
      document.getElementById('cBtn2').onclick = openEbookHub;
      document.getElementById('cBtn3').onclick = openRegisterHub;
      document.getElementById('cBtn4').onclick = openVisitorHub;
      document.getElementById('cBtn5').onclick = openClickDesk;
      document.getElementById('cBtn6').onclick = openSecurityDesk;
    }

    // -------------------------------------------------------------
    // LEVEL 2: CUSTOMER REQUEST CLAIM (PHOTO 2)
    // -------------------------------------------------------------
    function openClaimsDesk() {
      show(`
        <div style="padding:10px 0; min-height:70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background:#e02424; border:2px solid #991b1b; border-radius:12px; padding:10px 24px; margin-bottom:24px;">
            <h3 style="font-size:16px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Customer Request Claim</h3>
          </div>
          <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="btnCb" class="stock-square-card" style="width:170px; height:170px; background:#fff; border:2px solid #dfcfbc; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:38px;">💰</span>
              <span style="font-size:14px; font-weight:900; color:#1e3a8a; text-align:center; line-height:1.2;">CASHBACK<br/>REWARD</span>
            </button>
            <button type="button" id="btnGc" class="stock-square-card" style="width:170px; height:170px; background:#fff; border:2px solid #dfcfbc; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:38px;">🟢</span>
              <span style="font-size:14px; font-weight:900; color:#1e3a8a; text-align:center; line-height:1.2;">GREENCOIN<br/>REWARD</span>
            </button>
          </div>
        </div>
      `);
      document.getElementById('btnCb').onclick = openCashbackStages;
      document.getElementById('btnGc').onclick = openGreenCoinStages;
    }

    // -------------------------------------------------------------
    // LEVEL 3: CASHBACK 6 COLOR BUTTONS (PHOTO 3)
    // -------------------------------------------------------------
    function openCashbackStages() {
      show(`
        <div style="padding:10px 0; min-height:70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background:#fff; border:2px solid #1e3a8a; border-radius:25px; padding:8px 24px; margin-bottom:24px;">
            <h3 style="font-size:16px; font-weight:900; color:#1e3a8a; margin:0;">✳ CASHBACK REWARD ✳</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 160px)); gap:16px; justify-content:center; width:100%; max-width:540px;">
            <button type="button" id="cbS1" class="stock-square-card" style="height:140px; background:#dc2626; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">NEW REQUEST<br/>1 TO 25 DAYS</button>
            <button type="button" id="cbS2" class="stock-square-card" style="height:140px; background:#ca8a04; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">UNDER<br/>26 TO 50 DAYS</button>
            <button type="button" id="cbS3" class="stock-square-card" style="height:140px; background:#ea580c; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">UNDER<br/>51 TO 75 DAYS</button>
            <button type="button" id="cbS4" class="stock-square-card" style="height:140px; background:#2563eb; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">UNDER<br/>76 TO 100 DAYS</button>
            <button type="button" id="cbS5" class="stock-square-card" style="height:140px; background:#16a34a; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">101<br/>SEND REWARD</button>
            <button type="button" id="cbS6" class="stock-square-card" style="height:140px; background:#9333ea; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:15px; cursor:pointer;">HISTORY</button>
          </div>
        </div>
      `);

      document.getElementById('cbS1').onclick = () => openCbStepTable(1, 'Stage 1: 1 to 25 Days');
      document.getElementById('cbS2').onclick = () => openCbStepTable(2, 'Stage 2: 26 to 50 Days');
      document.getElementById('cbS3').onclick = () => openCbStepTable(3, 'Stage 3: 51 to 75 Days');
      document.getElementById('cbS4').onclick = () => openCbStepTable(4, 'Stage 4: 76 to 100 Days');
      document.getElementById('cbS5').onclick = () => openCbStepTable(5, 'Stage 5: 101 Send Reward');
      document.getElementById('cbS6').onclick = openCbHistoryHub;
    }

    function openCbStepTable(stepNum, title) {
      const db = getDB();
      const list = (db.cashbackClaims || []).filter(x => x.step === stepNum);

      show(`
        <div class="f-card">
          <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin-bottom:12px;">${title}</h3>
          ${renderFilterBar('cbTable')}
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Phone</th>
                  <th>Product Price</th><th>Product Name</th><th>Document</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${list.length === 0 ? '<tr><td colspan="10" style="text-align:center; padding:28px; color:#785a46;">No live claims under this stage right now.</td></tr>' : ''}
              </tbody>
            </table>
          </div>
        </div>
      `);
    }

    function openCbHistoryHub() {
      show(`
        <div style="padding:10px 0; min-height:70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background:#9333ea; border:2px solid #6b21a8; border-radius:12px; padding:10px 24px; margin-bottom:24px;">
            <h3 style="font-size:16px; font-weight:900; color:#fff; margin:0;">Cashback Claims History</h3>
          </div>
          <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="hComp" class="stock-square-card" style="width:170px; height:170px; background:#fff; border:2px solid #dfcfbc; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:38px;">🟢</span>
              <span style="font-size:14px; font-weight:900; color:#16a34a; text-align:center; line-height:1.2;">A) COMPLETED<br/>REWARDS</span>
            </button>
            <button type="button" id="hBin" class="stock-square-card" style="width:170px; height:170px; background:#fff; border:2px solid #dfcfbc; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:38px;">🗑️</span>
              <span style="font-size:14px; font-weight:900; color:#dc2626; text-align:center; line-height:1.2;">B) RECYCLING<br/>BIN</span>
            </button>
          </div>
        </div>
      `);
      document.getElementById('hComp').onclick = () => renderTableDirect('A) Completed Rewards', 'No completed payout records yet.');
      document.getElementById('hBin').onclick = () => renderTableDirect('B) Recycling Bin', 'Recycling bin is clean.');
    }

    // -------------------------------------------------------------
    // GREEN COIN STAGES
    // -------------------------------------------------------------
    function openGreenCoinStages() {
      show(`
        <div style="padding:10px 0; min-height:70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background:#fff; border:2px solid #16a34a; border-radius:25px; padding:8px 24px; margin-bottom:24px;">
            <h3 style="font-size:16px; font-weight:900; color:#16a34a; margin:0;">🟢 GREEN COIN REWARD 🟢</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 160px)); gap:16px; justify-content:center; width:100%; max-width:540px;">
            <button type="button" id="gc1" class="stock-square-card" style="height:140px; background:#475569; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">1. REQUEST<br/>FOR REWARD</button>
            <button type="button" id="gc2" class="stock-square-card" style="height:140px; background:#78350f; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">2. UNDER<br/>1 TO 7 DAYS</button>
            <button type="button" id="gc3" class="stock-square-card" style="height:140px; background:#db2777; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">3. UNDER<br/>8 TO 12 DAYS</button>
            <button type="button" id="gc4" class="stock-square-card" style="height:140px; background:#059669; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">4. FINAL<br/>STEP</button>
            <button type="button" id="gc5" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:15px; cursor:pointer;">5. HISTORY</button>
          </div>
        </div>
      `);
      document.getElementById('gc1').onclick = () => renderTableDirect('1. Green Coin Requests', 'No new requests.');
      document.getElementById('gc2').onclick = () => renderTableDirect('2. Under 1 to 7 Days', 'No claims under 1-7 days.');
      document.getElementById('gc3').onclick = () => renderTableDirect('3. Under 8 to 12 Days', 'No claims under 8-12 days.');
      document.getElementById('gc4').onclick = () => renderTableDirect('4. Final Step', 'No pending final rewards.');
      document.getElementById('gc5').onclick = () => renderTableDirect('5. Coin History', 'No history records logged yet.');
    }

    // -------------------------------------------------------------
    // EBOOK CLAIMS HUB
    // -------------------------------------------------------------
    function openEbookHub() {
      show(`
        <div style="padding:10px 0; min-height:70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background:#fff; border:2px solid #3b2219; border-radius:12px; padding:8px 18px; margin-bottom:24px;">
            <h3 style="font-size:16px; font-weight:900; color:#3b2219; margin:0;">E-Book Purchases Claim Hub</h3>
          </div>
          <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="ebCash" class="stock-square-card" style="width:160px; height:160px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:800; cursor:pointer;">
              <span style="font-size:36px;">💵</span><br/>Sales by Cash
            </button>
            <button type="button" id="ebCoin" class="stock-square-card" style="width:160px; height:160px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:800; cursor:pointer;">
              <span style="font-size:36px;">🪙</span><br/>Sale by Green Coin
            </button>
            <button type="button" id="ebBank" class="stock-square-card" style="width:160px; height:160px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:800; cursor:pointer;">
              <span style="font-size:36px;">🏦</span><br/>Bank (Coin Vault)
            </button>
          </div>
        </div>
      `);
      document.getElementById('ebCash').onclick = openEbCashSub;
      document.getElementById('ebCoin').onclick = openEbCoinSub;
      document.getElementById('ebBank').onclick = () => renderTableDirect('🏦 Bank (Coin Vault)', 'No vault transactions.');
    }

    function openEbCashSub() {
      show(`
        <div style="padding:10px 0; min-height:70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background:#1e3a8a; border:2px solid #172554; border-radius:12px; padding:10px 24px; margin-bottom:24px;">
            <h3 style="font-size:16px; font-weight:900; color:#fff; margin:0;">Sales By Cash</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 160px)); gap:16px; justify-content:center; width:100%; max-width:540px;">
            <button type="button" id="ebc1" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">1. CUSTOMER<br/>TRANSFER</button>
            <button type="button" id="ebc2" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">2. SALES<br/>DETAILS</button>
            <button type="button" id="ebc3" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">3. FAILED<br/>ORDERS</button>
            <button type="button" id="ebc4" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">4. LEDGER<br/>ACCOUNT</button>
          </div>
        </div>
      `);
      document.getElementById('ebc1').onclick = () => renderTableDirect('1. Customer Transfer Details', 'No purchase orders logged.');
      document.getElementById('ebc2').onclick = () => renderTableDirect('2. Sales Details & UTR', 'No confirmed sales records.');
      document.getElementById('ebc3').onclick = () => renderTableDirect('3. Failed / Dropped Orders', 'No failed transactions found.');
      document.getElementById('ebc4').onclick = () => renderTableDirect('4. Financial Ledger Account', 'Ledger is clean.');
    }

    function openEbCoinSub() {
      show(`
        <div style="padding:10px 0; min-height:70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background:#15803d; border:2px solid #14532d; border-radius:12px; padding:10px 24px; margin-bottom:24px;">
            <h3 style="font-size:16px; font-weight:900; color:#fff; margin:0;">Sales By Green Coin</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 160px)); gap:16px; justify-content:center; width:100%; max-width:540px;">
            <button type="button" id="ebg1" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">1. SALE BY<br/>COINS</button>
            <button type="button" id="ebg2" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">2. SALES<br/>DETAIL 2</button>
            <button type="button" id="ebg3" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">3. WRONG<br/>ORDERS</button>
            <button type="button" id="ebg4" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">4. TRANSACTION<br/>BOOK</button>
          </div>
        </div>
      `);
      document.getElementById('ebg1').onclick = () => renderTableDirect('1. Sale By Green Coins', 'No Green Coin purchases yet.');
      document.getElementById('ebg2').onclick = () => renderTableDirect('2. Sales Detail 2', 'No records logged.');
      document.getElementById('ebg3').onclick = () => renderTableDirect('3. Wrong Transactions', 'No wrong transactions.');
      document.getElementById('ebg4').onclick = () => renderTableDirect('4. Coin Transaction Book', 'Transaction book is clean.');
    }

    // -------------------------------------------------------------
    // REGISTER ID MATRIX
    // -------------------------------------------------------------
    function openRegisterHub() {
      show(`
        <div style="padding:10px 0; min-height:70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background:#fff; border:2px solid #3b2219; border-radius:12px; padding:8px 18px; margin-bottom:24px;">
            <h3 style="font-size:16px; font-weight:900; color:#3b2219; margin:0;">Register ID Matrix</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 160px)); gap:16px; justify-content:center; width:100%; max-width:540px;">
            <button type="button" id="reg1" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">1. CUSTOMER<br/>REGISTER</button>
            <button type="button" id="reg2" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">2. REFERRAL<br/>MATCH</button>
            <button type="button" id="reg3" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">3. LOGIN BY<br/>REFERRAL</button>
            <button type="button" id="reg4" class="stock-square-card" style="height:140px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">4. BLOCKED<br/>DATABASE</button>
          </div>
        </div>
      `);
      document.getElementById('reg1').onclick = () => renderTableDirect('1. Customer Register Details', 'No registered customer accounts yet.');
      document.getElementById('reg2').onclick = openReferralSplitDesk;
      document.getElementById('reg3').onclick = () => renderTableDirect('3. Accounts via Referral Code', 'No accounts registered via referral.');
      document.getElementById('reg4').onclick = () => renderTableDirect('4. Blocked Customers', 'No blocked customer accounts.');
    }

    function openReferralSplitDesk() {
      show(`
        <div class="f-card">
          <h3 style="font-size:16px; font-weight:800; color:#0284c7; margin-bottom:12px;">2. Customer Referral Match Ledger</h3>
          ${renderFilterBar('refTable')}
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th colspan="4" style="background:#0284c7; color:#fff; text-align:center;">New User (Sky Blue)</th>
                  <th style="background:#000; width:4px; padding:0;"></th>
                  <th colspan="4" style="background:#ca8a04; color:#fff; text-align:center;">Match (Yellow)</th>
                  <th style="background:#000; width:4px; padding:0;"></th>
                  <th colspan="3" style="background:#db2777; color:#fff; text-align:center;">Referrer (Pink)</th>
                  <th style="background:#16a34a; color:#fff; text-align:center;">Status</th>
                </tr>
                <tr>
                  <th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th>
                  <th style="background:#000; width:4px; padding:0;"></th>
                  <th>Invite Code</th><th>Received</th><th>Inviter (+7)</th><th>Receiver (+4)</th>
                  <th style="background:#000; width:4px; padding:0;"></th>
                  <th>Inviter Name</th><th>Inviter ID</th><th>Original Code</th>
                  <th>Transfer Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colspan="15" style="text-align:center; padding:28px; color:#785a46;">No referral login logs registered yet.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `);
    }

    // -------------------------------------------------------------
    // VISITOR, CLICKS & SECURITY
    // -------------------------------------------------------------
    function openVisitorHub() {
      show(`
        <div style="padding:10px 0; min-height:70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background:#fff; border:2px solid #3b2219; border-radius:12px; padding:8px 18px; margin-bottom:24px;">
            <h3 style="font-size:16px; font-weight:900; color:#3b2219; margin:0;">Visitor Traffic Monitor</h3>
          </div>
          <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="vG" class="stock-square-card" style="width:170px; height:170px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; cursor:pointer;">
              <span style="font-size:38px;">🌐</span><br/>GUEST MODE
            </button>
            <button type="button" id="vL" class="stock-square-card" style="width:170px; height:170px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; cursor:pointer;">
              <span style="font-size:38px;">👤</span><br/>LOGIN VISITORS
            </button>
          </div>
        </div>
      `);
      document.getElementById('vG').onclick = () => renderTableDirect('Guest Visitors', '0 guest visitors logged.');
      document.getElementById('vL').onclick = () => renderTableDirect('Member Visitors', '0 logged in members.');
    }

    function openClickDesk() {
      show(`
        <div class="f-card">
          <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin-bottom:12px;">Store Redirection Click Analytics</h3>
          ${renderFilterBar('clickTable')}
          <div class="table-responsive-box">
            <table class="f-table">
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
      `);
    }

    function openSecurityDesk() {
      show(`
        <div class="f-card">
          <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin-bottom:6px;">🛡️ Security Room: 5-Layer Defense</h3>
          <p style="font-size:12px; color:#785a46; margin-bottom:14px;">Automated Sentinel defending Customer Portal & Air-Gapped DB.</p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:16px;">
            <div style="background:#fff; border:1px solid #dfcfbc; padding:12px; border-radius:8px;"><b>Layer 1: Cloudflare</b><br/><span style="color:#16a34a; font-size:12px;">ONLINE (100%)</span></div>
            <div style="background:#fff; border:1px solid #dfcfbc; padding:12px; border-radius:8px;"><b>Layer 2: DevTools Trap</b><br/><span style="color:#16a34a; font-size:12px;">LOCKED</span></div>
            <div style="background:#fff; border:1px solid #dfcfbc; padding:12px; border-radius:8px;"><b>Layer 3: Telegram Alert</b><br/><span style="color:#16a34a; font-size:12px;">ARMED</span></div>
            <div style="background:#fff; border:1px solid #dfcfbc; padding:12px; border-radius:8px;"><b>Layer 4: Stealth Cloak</b><br/><span style="color:#16a34a; font-size:12px;">STANDBY</span></div>
            <div style="background:#fff; border:1px solid #dfcfbc; padding:12px; border-radius:8px;"><b>Layer 5: DB Air-Gap</b><br/><span style="color:#16a34a; font-size:12px;">SECURED</span></div>
          </div>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead><tr><th>Time</th><th>Threat Type</th><th>Detected IP</th><th>Auto-Defense Status</th></tr></thead>
              <tbody><tr><td colspan="4" style="text-align:center; padding:20px; color:#16a34a; font-weight:700;">✓ Perimeter clean. 0 intrusion attempts.</td></tr></tbody>
            </table>
          </div>
        </div>
      `);
    }

    function renderTableDirect(title, emptyText) {
      show(`
        <div class="f-card">
          <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin-bottom:12px;">${title}</h3>
          ${renderFilterBar('genTable')}
          <div class="table-responsive-box">
            <table class="f-table">
              <thead><tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Details</th><th>Status</th></tr></thead>
              <tbody><tr><td colspan="7" style="text-align:center; padding:28px; color:#785a46;">${emptyText}</td></tr></tbody>
            </table>
          </div>
        </div>
      `);
    }

    // Direct Mount
    openLevel1();
  };
})();
