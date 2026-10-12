/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: CUSTOMER MANAGEMENT HUB (FAIL-SAFE + NATIVE BACK)
   ========================================================================== */

(function () {
  'use strict';

  function getDB() {
    try {
      var d = localStorage.getItem('ss_owner_cust_master_db');
      return d ? JSON.parse(d) : {
        cashbackClaims: [], greenCoinClaims: [], cashEbookSales: [], coinEbookSales: [],
        failedCashOrders: [], failedCoinOrders: [], coinBankVault: [], registeredUsers: [],
        referralLedger: [], blockedUsers: [], recycleBinCashback: []
      };
    } catch (e) {
      return {
        cashbackClaims: [], greenCoinClaims: [], cashEbookSales: [], coinEbookSales: [],
        failedCashOrders: [], failedCoinOrders: [], coinBankVault: [], registeredUsers: [],
        referralLedger: [], blockedUsers: [], recycleBinCashback: []
      };
    }
  }

  function getFilterBar() {
    return `
      <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; align-items:center; background:#ffffff; border:1px solid #dfcfbc; padding:10px 14px; border-radius:10px; width:100%; box-sizing:border-box;">
        <span style="font-size:12px; font-weight:800; color:#3b2219; margin-right:4px;">📅 Filter:</span>
        <button type="button" class="btn-action-sm btn-blue" style="padding:5px 12px; font-size:11.5px;">All</button>
        <button type="button" class="btn-action-sm btn-blue" style="padding:5px 12px; font-size:11.5px; opacity:0.6;">Today</button>
        <button type="button" class="btn-action-sm btn-blue" style="padding:5px 12px; font-size:11.5px; opacity:0.6;">Tomorrow</button>
        <button type="button" class="btn-action-sm btn-blue" style="padding:5px 12px; font-size:11.5px; opacity:0.6;">Weekly</button>
        <button type="button" class="btn-action-sm btn-blue" style="padding:5px 12px; font-size:11.5px; opacity:0.6;">Monthly</button>
        <button type="button" class="btn-action-sm btn-blue" style="padding:5px 12px; font-size:11.5px; opacity:0.6;">Yearly</button>
        <input type="date" style="background:#fbf8f3; border:1px solid #dfcfbc; padding:4px 8px; border-radius:6px; font-size:11.5px; color:#2b1810; margin-left:auto;" />
      </div>
    `;
  }

  window.initOwnerCustomer = function () {
    var mount = document.getElementById('view-customer');
    if (!mount) return;

    // Isolate customer view display
    document.querySelectorAll('.f-view').forEach(function(el) {
      if (el.id !== 'view-customer') {
        el.classList.remove('active');
        el.style.display = 'none';
      }
    });
    mount.classList.add('active');
    mount.style.display = 'block';

    // Hardware / Laptop Back Button System
    var viewHistory = [];

    function pushView(fn, screenName) {
      viewHistory.push(fn);
      history.pushState({ panel: 'customer', screen: screenName, idx: viewHistory.length }, '');
      fn();
    }

    window.onpopstate = function (e) {
      if (viewHistory.length > 1) {
        viewHistory.pop();
        var prevScreen = viewHistory[viewHistory.length - 1];
        if (prevScreen) prevScreen();
      } else {
        showLevel1();
      }
    };

    // -------------------------------------------------------------
    // LEVEL 1: 6 BADE BLUE BUTTONS (PHOTO 1)
    // -------------------------------------------------------------
    function showLevel1() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 26px; margin-bottom:28px; box-shadow:0 4px 12px rgba(59,34,25,0.08);">
            <h3 style="font-size:18px; font-weight:900; color:#3b2219; letter-spacing:1px; margin:0; text-transform:uppercase;">CUSTOMER PAGE</h3>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="cHub1" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">📥</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Customer<br/>Request Claim</span>
            </button>
            <button type="button" id="cHub2" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">📚</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Ebook<br/>Purchases Claim</span>
            </button>
            <button type="button" id="cHub3" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">📇</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Register<br/>ID</span>
            </button>
            <button type="button" id="cHub4" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">👥</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Visitor<br/>Count</span>
            </button>
            <button type="button" id="cHub5" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">🔗</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Link<br/>Click</span>
            </button>
            <button type="button" id="cHub6" class="stock-square-card" style="height:155px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.25);">
              <span style="font-size:36px;">🛡️</span>
              <span style="font-size:14px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">Portal<br/>Protection</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('cHub1').onclick = function() { pushView(showClaimsDesk, 'claims'); };
      document.getElementById('cHub2').onclick = function() { pushView(showEbookHub, 'ebooks'); };
      document.getElementById('cHub3').onclick = function() { pushView(showRegisterHub, 'register'); };
      document.getElementById('cHub4').onclick = function() { pushView(showVisitorHub, 'visitors'); };
      document.getElementById('cHub5').onclick = function() { pushView(showClickAnalytics, 'clicks'); };
      document.getElementById('cHub6').onclick = function() { pushView(showSecurityDesk, 'security'); };
    }

    // -------------------------------------------------------------
    // LEVEL 2: CUSTOMER REQUEST CLAIM (PHOTO 2)
    // -------------------------------------------------------------
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

      document.getElementById('btnDeskCash').onclick = function() { pushView(showCashback6Cards, 'cb-stages'); };
      document.getElementById('btnDeskCoin').onclick = function() { pushView(showGreenCoin5Cards, 'gc-stages'); };
    }

    // -------------------------------------------------------------
    // LEVEL 3: CASHBACK 6 COLOR BUTTONS (PHOTO 3)
    // -------------------------------------------------------------
    function showCashback6Cards() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #1e3a8a; border-radius:25px; padding:10px 28px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#1e3a8a; margin:0;">✳ CASHBACK REWARD (1-100 DAYS) ✳</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="cbs1" class="stock-square-card" style="height:145px; background:#dc2626; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">NEW REQUEST<br/>CLAIM UNDER<br/>1 TO 25 DAYS</button>
            <button type="button" id="cbs2" class="stock-square-card" style="height:145px; background:#ca8a04; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">UNDER<br/>26 TO 50<br/>DAYS</button>
            <button type="button" id="cbs3" class="stock-square-card" style="height:145px; background:#ea580c; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">UNDER<br/>51 TO 75<br/>DAYS</button>
            <button type="button" id="cbs4" class="stock-square-card" style="height:145px; background:#2563eb; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">UNDER<br/>76 TO 100<br/>DAYS</button>
            <button type="button" id="cbs5" class="stock-square-card" style="height:145px; background:#16a34a; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">101<br/>SEND<br/>REWARD</button>
            <button type="button" id="cbs6" class="stock-square-card" style="height:145px; background:#9333ea; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:15px; cursor:pointer;">HISTORY</button>
          </div>
        </div>
      `;

      document.getElementById('cbs1').onclick = function() { pushView(function() { showCbStepTable(1); }, 'cb-1'); };
      document.getElementById('cbs2').onclick = function() { pushView(function() { showCbStepTable(2); }, 'cb-2'); };
      document.getElementById('cbs3').onclick = function() { pushView(function() { showCbStepTable(3); }, 'cb-3'); };
      document.getElementById('cbs4').onclick = function() { pushView(function() { showCbStepTable(4); }, 'cb-4'); };
      document.getElementById('cbs5').onclick = function() { pushView(function() { showCbStepTable(5); }, 'cb-5'); };
      document.getElementById('cbs6').onclick = function() { pushView(showCbHistoryHub, 'cb-history'); };
    }

    function showCbStepTable(step) {
      var titles = {
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
          ${getFilterBar()}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:1150px;">
              <thead>
                <tr>
                  <th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Phone</th>
                  <th>Product Price</th><th>Product Name</th><th>Proof Doc</th><th>Progress</th>
                  ${step === 1 ? '<th>Status (Action)</th>' : ''}
                  ${step === 2 ? '<th>Account</th><th>Status</th>' : ''}
                  ${step === 3 ? '<th>Income Generated</th><th>Method (UPI/QR)</th><th>Status</th>' : ''}
                  ${step === 4 ? '<th>Income</th><th>Method</th><th>Status</th><th>Request</th>' : ''}
                  ${step === 5 ? '<th>Income</th><th>Method</th><th>Action</th><th>Status</th>' : ''}
                </tr>
              </thead>
              <tbody>
                <tr><td colspan="15" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">No live customer claims under this stage right now.</td></tr>
              </tbody>
            </table>
          </div>
          <div style="background:#fbf8f3; border:1px solid #dfcfbc; padding:12px 18px; border-radius:10px; margin-top:14px; display:flex; justify-content:space-between; font-size:13px; font-weight:800; color:#3b2219;">
            <div>Total Records: 0</div>
            <div>Total Value: ₹0</div>
          </div>
        </div>
      `;
    }

    function showCbHistoryHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#9333ea; border:2px solid #6b21a8; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Cashback Claims History</h3>
          </div>
          <div style="display:flex; gap:24px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="hC1" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; cursor:pointer;">
              <span style="font-size:42px;">🟢</span>
              <span style="font-size:15px; font-weight:900; color:#16a34a; text-align:center; line-height:1.2;">A) COMPLETED<br/>REWARDS</span>
            </button>
            <button type="button" id="hC2" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; cursor:pointer;">
              <span style="font-size:42px;">🗑️</span>
              <span style="font-size:15px; font-weight:900; color:#dc2626; text-align:center; line-height:1.2;">B) RECYCLING<br/>BIN</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById('hC1').onclick = function() { pushView(function() { showFullTable('A) Completed Cashback Transfers', 'No completed payout records yet.'); }, 'cb-h-c'); };
      document.getElementById('hC2').onclick = function() { pushView(function() { showFullTable('B) Recycling Bin (Cancelled / Blocked)', 'Recycling bin is clean.'); }, 'cb-h-b'); };
    }

    // -------------------------------------------------------------
    // GREEN COIN STAGES
    // -------------------------------------------------------------
    function showGreenCoin5Cards() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #16a34a; border-radius:25px; padding:10px 28px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#16a34a; margin:0;">🟢 GREEN COIN REWARD (12 DAYS) 🟢</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="gcs1" class="stock-square-card" style="height:145px; background:#475569; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">1. REQUEST<br/>FOR REWARD</button>
            <button type="button" id="gcs2" class="stock-square-card" style="height:145px; background:#78350f; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">2. UNDER<br/>1 TO 7 DAYS</button>
            <button type="button" id="gcs3" class="stock-square-card" style="height:145px; background:#db2777; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">3. UNDER<br/>8 TO 12 DAYS</button>
            <button type="button" id="gcs4" class="stock-square-card" style="height:145px; background:#059669; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">4. FINAL<br/>STEP</button>
            <button type="button" id="gcs5" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:15px; cursor:pointer;">5. HISTORY</button>
          </div>
        </div>
      `;

      document.getElementById('gcs1').onclick = function() { pushView(function() { showFullTable('1. Green Coin Requests (48h Audit)', 'No new requests.'); }, 'gc-1'); };
      document.getElementById('gcs2').onclick = function() { pushView(function() { showFullTable('2. Under 1 to 7 Days (Verified)', 'No claims under 1-7 days.'); }, 'gc-2'); };
      document.getElementById('gcs3').onclick = function() { pushView(function() { showFullTable('3. Under 8 to 12 Days (Coin Generated)', 'No claims under 8-12 days.'); }, 'gc-3'); };
      document.getElementById('gcs4').onclick = function() { pushView(function() { showFullTable('4. Final Step', 'No pending final rewards.'); }, 'gc-4'); };
      document.getElementById('gcs5').onclick = function() { pushView(showGreenCoinHistoryHub, 'gc-history'); };
    }

    function showGreenCoinHistoryHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#0284c7; border:2px solid #0369a1; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Green Coin History</h3>
          </div>
          <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="gH1" class="stock-square-card" style="width:170px; height:170px; background:#ffffff; border:2px solid #dfcfbc; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:38px;">🟢</span>
              <span style="font-size:14px; font-weight:900; color:#16a34a; text-align:center; line-height:1.2;">A) COMPLETED<br/>COINS</span>
            </button>
            <button type="button" id="gH2" class="stock-square-card" style="width:170px; height:170px; background:#ffffff; border:2px solid #dfcfbc; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:38px;">🤖</span>
              <span style="font-size:14px; font-weight:900; color:#dc2626; text-align:center; line-height:1.2;">B) BIN<br/>BY AI</span>
            </button>
            <button type="button" id="gH3" class="stock-square-card" style="width:170px; height:170px; background:#ffffff; border:2px solid #dfcfbc; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:38px;">👤</span>
              <span style="font-size:14px; font-weight:900; color:#b91c1c; text-align:center; line-height:1.2;">C) BIN<br/>BY MANUAL</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById('gH1').onclick = function() { pushView(function() { showFullTable('Completed Green Coins', 'No completed coin claims logged.'); }, 'gc-h-1'); };
      document.getElementById('gH2').onclick = function() { pushView(function() { showFullTable('Recycling Bin (AI Anomaly)', 'No AI auto-rejected records.'); }, 'gc-h-2'); };
      document.getElementById('gH3').onclick = function() { pushView(function() { showFullTable('Recycling Bin (Manual Rejected)', 'No manual rejected records.'); }, 'gc-h-3'); };
    }

    // -------------------------------------------------------------
    // EBOOK CLAIMS HUB
    // -------------------------------------------------------------
    function showEbookHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 24px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">E-Book Purchases Claim Hub</h3>
          </div>
          <div style="display:flex; gap:24px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="eb1" class="stock-square-card" style="width:175px; height:175px; background:#0284c7; border:none; border-radius:22px; color:#fff; font-weight:800; cursor:pointer;">
              <span style="font-size:40px;">💵</span><br/>Sales by Cash
            </button>
            <button type="button" id="eb2" class="stock-square-card" style="width:175px; height:175px; background:#0284c7; border:none; border-radius:22px; color:#fff; font-weight:800; cursor:pointer;">
              <span style="font-size:40px;">🪙</span><br/>Sale by Green Coin
            </button>
            <button type="button" id="eb3" class="stock-square-card" style="width:175px; height:175px; background:#0284c7; border:none; border-radius:22px; color:#fff; font-weight:800; cursor:pointer;">
              <span style="font-size:40px;">🏦</span><br/>Bank (Coin Vault)
            </button>
          </div>
        </div>
      `;

      document.getElementById('eb1').onclick = function() { pushView(showEbCashSub, 'eb-cash'); };
      document.getElementById('eb2').onclick = function() { pushView(showEbCoinSub, 'eb-coin'); };
      document.getElementById('eb3').onclick = function() { pushView(function() { showFullTable('🏦 Bank (Central Green Coin Vault)', 'No transactions in Coin Bank Vault yet.'); }, 'eb-bank'); };
    }

    function showEbCashSub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#1e3a8a; border:2px solid #172554; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Sales By Cash (UPI / PG)</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="ebc1" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">1. CUSTOMER<br/>TRANSFER</button>
            <button type="button" id="ebc2" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">2. SALES<br/>DETAILS</button>
            <button type="button" id="ebc3" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">3. FAILED<br/>ORDERS</button>
            <button type="button" id="ebc4" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">4. LEDGER<br/>ACCOUNT</button>
          </div>
        </div>
      `;

      document.getElementById('ebc1').onclick = function() { pushView(function() { showFullTable('1. Customer Transfer Details (AI Auto-Delivery)', 'No live E-Book purchase orders yet.'); }, 'eb-c-1'); };
      document.getElementById('ebc2').onclick = function() { pushView(function() { showFullTable('2. Sales Details & Bank Verification', 'No sales records logged yet.'); }, 'eb-c-2'); };
      document.getElementById('ebc3').onclick = function() { pushView(function() { showFullTable('3. Failed / Dropped Transactions', 'No failed transactions found.'); }, 'eb-c-3'); };
      document.getElementById('ebc4').onclick = function() { pushView(function() { showFullTable('4. Financial Ledger Account', 'Ledger is clean for this period.'); }, 'eb-c-4'); };
    }

    function showEbCoinSub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#15803d; border:2px solid #14532d; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Sales By Green Coin</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="ebg1" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">1. SALE BY<br/>COINS</button>
            <button type="button" id="ebg2" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">2. SALES<br/>DETAIL 2</button>
            <button type="button" id="ebg3" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">3. WRONG<br/>ORDERS</button>
            <button type="button" id="ebg4" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">4. TRANSACTION<br/>BOOK</button>
          </div>
        </div>
      `;

      document.getElementById('ebg1').onclick = function() { pushView(function() { showFullTable('1. Sale By Green Coins (AI Verified)', 'No Green Coin purchases yet.'); }, 'eb-g-1'); };
      document.getElementById('ebg2').onclick = function() { pushView(function() { showFullTable('2. Sales Detail 2', 'No records logged.'); }, 'eb-g-2'); };
      document.getElementById('ebg3').onclick = function() { pushView(function() { showFullTable('3. Wrong Transaction Desk', 'No wrong transactions.'); }, 'eb-g-3'); };
      document.getElementById('ebg4').onclick = function() { pushView(function() { showFullTable('4. Green Coin Transaction Book', 'Transaction book is clean.'); }, 'eb-g-4'); };
    }

     // -------------------------------------------------------------
    // REGISTER ID MATRIX
    // -------------------------------------------------------------
    function showRegisterHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 24px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">Register ID Matrix</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="rg1" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">1. CUSTOMER<br/>REGISTER</button>
            <button type="button" id="rg2" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">2. REFERRAL<br/>MATCH</button>
            <button type="button" id="rg3" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">3. LOGIN BY<br/>REFERRAL</button>
            <button type="button" id="rg4" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">4. BLOCKED<br/>DATABASE</button>
          </div>
        </div>
      `;

      document.getElementById('rg1').onclick = function() { pushView(function() { showFullTable('1. Customer Register Detail', 'No registered customer accounts yet.'); }, 'rg-1'); };
      document.getElementById('rg2').onclick = function() { pushView(showReferralSplit, 'rg-2'); };
      document.getElementById('rg3').onclick = function() { pushView(function() { showFullTable('3. Accounts via Referral Code', 'No accounts created via referral code yet.'); }, 'rg-3'); };
      document.getElementById('rg4').onclick = function() { pushView(function() { showFullTable('4. Blocked Customer Database', 'No blocked customer accounts.'); }, 'rg-4'); };
    }

    function showReferralSplit() {
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#0284c7; margin:0;">2. CUSTOMER REFERRAL MATCH LEDGER</h3>
          </div>
          ${getFilterBar()}
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

    // -------------------------------------------------------------
    // VISITOR, CLICKS & SECURITY
    // -------------------------------------------------------------
    function showVisitorHub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 24px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">Visitor Traffic Monitor</h3>
          </div>
          <div style="display:flex; gap:24px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="v1" class="stock-square-card" style="width:175px; height:175px; background:#0284c7; border:none; border-radius:22px; color:#fff; font-weight:900; cursor:pointer;">
              <span style="font-size:40px;">🌐</span><br/>GUEST MODE<br/>VISITORS
            </button>
            <button type="button" id="v2" class="stock-square-card" style="width:175px; height:175px; background:#0284c7; border:none; border-radius:22px; color:#fff; font-weight:900; cursor:pointer;">
              <span style="font-size:40px;">👤</span><br/>LOGIN<br/>VISITORS
            </button>
          </div>
        </div>
      `;
      document.getElementById('v1').onclick = function() { pushView(function() { showFullTable('Guest Mode Visitors (Unregistered)', '0 guest visitors logged.'); }, 'v-1'); };
      document.getElementById('v2').onclick = function() { pushView(function() { showFullTable('Logged In Member Visitors', '0 active members logged.'); }, 'v-2'); };
    }

    function showClickAnalytics() {
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0;">PLATFORM REDIRECTION CLICK ANALYTICS</h3>
          </div>
          ${getFilterBar()}
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

    function showSecurityDesk() {
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0;">🛡️ SECURITY ROOM: 5-LAYER DEFENSE</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:12px; margin-bottom:16px;">
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:14px; border-radius:10px;"><b>Layer 1: Cloudflare Perimeter</b><br/><span style="color:#16a34a; font-size:12px; font-weight:700;">ONLINE (100%)</span></div>
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:14px; border-radius:10px;"><b>Layer 2: DevTools & Tamper Trap</b><br/><span style="color:#16a34a; font-size:12px; font-weight:700;">LOCKED</span></div>
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:14px; border-radius:10px;"><b>Layer 3: Telegram Alert</b><br/><span style="color:#16a34a; font-size:12px; font-weight:700;">ARMED</span></div>
            <div style="background:#ffffff; border:1px solid #dfcfbc; padding:14px; border-radius:10px;"><b>Layer 4: Stealth Cloak</b><br/><span style="color:#16a34a; font-size:12px; font-weight:700;">STANDBY</span></div>
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

    function showFullTable(title, emptyText) {
      mount.innerHTML = `
        <div style="width:100%; padding:10px 0;">
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:12px 18px; margin-bottom:14px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219; margin:0;">${title}</h3>
          </div>
          ${getFilterBar()}
          <div style="width:100%; overflow-x:auto; background:#ffffff; border:1px solid #dfcfbc; border-radius:10px;">
            <table class="f-table" style="width:100%; min-width:1100px;">
              <thead><tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Details</th><th>Status</th></tr></thead>
              <tbody><tr><td colspan="7" style="text-align:center; padding:36px; color:#785a46; font-weight:700;">${emptyText}</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Initial Mount
    viewHistory = [showLevel1];
    showLevel1();
  };
})();
