/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: CUSTOMER HUB (CONNECTED TO TABLES)
   ========================================================================== */

(function () {
  'use strict';

  window.initOwnerCustomer = function () {
    var mount = document.getElementById('view-customer');
    if (!mount) return;

    mount.style.width = '100%';
    mount.style.maxWidth = '100%';
    mount.style.display = 'block';

    var screenHistory = [];

    function render(screenFn) {
      screenHistory.push(screenFn);
      screenFn();
    }

    // Direct Table Page Redirector
    function openTable(tableKey) {
      window.location.href = 'customer-tables.html?table=' + tableKey;
    }

    // Laptop / Keyboard Back Button
    window.onkeydown = function (e) {
      if ((e.altKey && e.key === 'ArrowLeft') || (e.key === 'Backspace' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA')) {
        if (screenHistory.length > 1) {
          e.preventDefault();
          screenHistory.pop();
          var prev = screenHistory[screenHistory.length - 1];
          if (prev) prev();
        }
      }
    };

    // -------------------------------------------------------------
    // LEVEL 1: 6 BADE BLUE CARDS (PHOTO 1)
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

      document.getElementById('cHub1').onclick = function() { render(showClaimsDesk); };
      document.getElementById('cHub2').onclick = function() { render(showEbookHub); };
      document.getElementById('cHub3').onclick = function() { render(showRegisterHub); };
      document.getElementById('cHub4').onclick = function() { render(showVisitorHub); };
      document.getElementById('cHub5').onclick = function() { openTable('click-analytics'); };
      document.getElementById('cHub6').onclick = function() { render(showSecurityDesk); };
    }

    // -------------------------------------------------------------
    // LEVEL 2: CLAIMS DESK (PHOTO 2)
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

      document.getElementById('btnDeskCash').onclick = function() { render(showCashback6Cards); };
      document.getElementById('btnDeskCoin').onclick = function() { render(showGreenCoin5Cards); };
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

      // Direct Table Links
      document.getElementById('cbs1').onclick = function() { openTable('cb-1'); };
      document.getElementById('cbs2').onclick = function() { openTable('cb-2'); };
      document.getElementById('cbs3').onclick = function() { openTable('cb-3'); };
      document.getElementById('cbs4').onclick = function() { openTable('cb-4'); };
      document.getElementById('cbs5').onclick = function() { openTable('cb-5'); };
      document.getElementById('cbs6').onclick = function() { render(showCbHistoryHub); };
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
      document.getElementById('hC1').onclick = function() { openTable('cb-hist-completed'); };
      document.getElementById('hC2').onclick = function() { openTable('cb-hist-bin'); };
    }

    // -------------------------------------------------------------
    // LEVEL 3: GREEN COIN 5 BUTTONS
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

      document.getElementById('gcs1').onclick = function() { openTable('gc-1'); };
      document.getElementById('gcs2').onclick = function() { openTable('gc-2'); };
      document.getElementById('gcs3').onclick = function() { openTable('gc-3'); };
      document.getElementById('gcs4').onclick = function() { openTable('gc-4'); };
      document.getElementById('gcs5').onclick = function() { render(showGreenCoinHistoryHub); };
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
      document.getElementById('gH1').onclick = function() { openTable('gc-hist-completed'); };
      document.getElementById('gH2').onclick = function() { openTable('gc-hist-bin-ai'); };
      document.getElementById('gH3').onclick = function() { openTable('gc-hist-bin-manual'); };
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

      document.getElementById('eb1').onclick = function() { render(showEbCashSub); };
      document.getElementById('eb2').onclick = function() { render(showEbCoinSub); };
      document.getElementById('eb3').onclick = function() { openTable('eb-bank-vault'); };
    }

    function showEbCashSub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#1e3a8a; border:2px solid #172554; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Sales By Cash (UPI / PG)</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="ebc1" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">1. CUSTOMER<br/>TRANSFER</button>
            <button type="button" id="ebc2" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">2. SALES<br/>DETAILS</button>
            <button type="button" id="ebc3" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">3. FAILED<br/>ORDERS</button>
            <button type="button" id="ebc4" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">4. LEDGER<br/>ACCOUNT</button>
          </div>
        </div>
      `;

      document.getElementById('ebc1').onclick = function() { openTable('eb-cash-trans'); };
      document.getElementById('ebc2').onclick = function() { openTable('eb-cash-sales'); };
      document.getElementById('ebc3').onclick = function() { openTable('eb-cash-failed'); };
      document.getElementById('ebc4').onclick = function() { openTable('eb-cash-ledger'); };
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

      document.getElementById('ebg1').onclick = function() { openTable('eb-coin-trans'); };
      document.getElementById('ebg2').onclick = function() { openTable('eb-coin-sales'); };
      document.getElementById('ebg3').onclick = function() { openTable('eb-coin-failed'); };
      document.getElementById('ebg4').onclick = function() { openTable('eb-coin-book'); };
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

      document.getElementById('rg1').onclick = function() { openTable('reg-cust'); };
      document.getElementById('rg2').onclick = function() { openTable('reg-ref'); };
      document.getElementById('rg3').onclick = function() { openTable('reg-login-ref'); };
      document.getElementById('rg4').onclick = function() { openTable('reg-blocked'); };
    }

    // -------------------------------------------------------------
    // VISITOR COUNT & SECURITY DESK
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
      document.getElementById('v1').onclick = function() { openTable('vis-guest'); };
      document.getElementById('v2').onclick = function() { openTable('vis-member'); };
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

    // Start
    render(showLevel1);
  };
})();
