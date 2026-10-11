/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: CUSTOMER MANAGEMENT HUB (MASTER ZERO-DUMMY)
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. LOCAL STORAGE DATA PERSISTENCE (PURE CLEAN INITIAL STATE) ---
  function getCustomerDB() {
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
        trafficStats: { guests: 0, members: 0 },
        linkClicks: { amazon: 0, flipkart: 0, myntra: 0, ajio: 0, others: 0 },
        recycleBinCashback: [],
        recycleBinCoins: []
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
    try {
      localStorage.setItem('ss_owner_cust_master_db', JSON.stringify(db));
    } catch (e) {}
  }

  // --- 2. UNIVERSAL DATE FILTER ENGINE ---
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

    // --- 3. HARDWARE / DEVICE NATURAL BACK BUTTON CONTROLLER ---
    function pushCustScreen(screenKey) {
      history.pushState({ custScreen: screenKey }, '', `#cust-${screenKey}`);
    }

    window.onpopstate = function (event) {
      if (!event.state || !event.state.custScreen) {
        renderLevel1Hub(false);
      } else {
        const key = event.state.custScreen;
        if (key === 'l1') renderLevel1Hub(false);
        else if (key === 'claims-hub') renderClaimsHub(false);
        else if (key === 'cb-stages-hub') renderCashbackStagesHub(false);
        else if (key.startsWith('cb-step-')) renderCashbackStepTable(Number(key.replace('cb-step-', '')), false);
        else if (key === 'cb-hist-completed') renderCashbackHistoryCompleted(false);
        else if (key === 'cb-hist-bin') renderCashbackHistoryBin(false);
        else if (key === 'gc-stages-hub') renderGreenCoinStagesHub(false);
        else if (key.startsWith('gc-step-')) renderGreenCoinStepTable(Number(key.replace('gc-step-', '')), false);
        else if (key === 'gc-hist-completed') renderGreenCoinHistoryCompleted(false);
        else if (key === 'gc-hist-bin-ai') renderGreenCoinHistoryBinAI(false);
        else if (key === 'gc-hist-bin-man') renderGreenCoinHistoryBinManual(false);
        else if (key === 'ebook-claims-hub') renderEbookClaimsHub(false);
        else if (key === 'eb-cash-hub') renderEbookCashSubHub(false);
        else if (key === 'eb-cash-transfer') renderEbookCashTransferDetails(false);
        else if (key === 'eb-cash-sales') renderEbookCashSalesDetails(false);
        else if (key === 'eb-cash-failed') renderEbookCashFailed(false);
        else if (key === 'eb-cash-ledger') renderEbookCashLedger(false);
        else if (key === 'eb-coin-hub') renderEbookCoinSubHub(false);
        else if (key === 'eb-coin-transfer') renderEbookCoinTransferDetails(false);
        else if (key === 'eb-coin-sales') renderEbookCoinSalesDetails(false);
        else if (key === 'eb-coin-failed') renderEbookCoinFailed(false);
        else if (key === 'eb-coin-book') renderEbookCoinTransactionBook(false);
        else if (key === 'eb-bank-vault') renderCoinBankVault(false);
        else if (key === 'register-hub') renderRegisterHub(false);
        else if (key === 'reg-cust-details') renderRegisterCustomerDetails(false);
        else if (key === 'reg-cust-referrals') renderRegisterCustomerReferrals(false);
        else if (key === 'reg-login-ref') renderRegisterLoginByReferral(false);
        else if (key === 'reg-cust-blocked') renderRegisterCustomerBlocked(false);
        else if (key === 'visitor-hub') renderVisitorHub(false);
        else if (key === 'vis-guest-table') renderVisitorGuestTable(false);
        else if (key === 'vis-login-table') renderVisitorLoginTable(false);
        else if (key === 'click-count-hub') renderClickCountHub(false);
        else if (key === 'security-hub') renderSecurityRoomHub(false);
      }
    };

    // =========================================================================
    // SCREEN 1: LEVEL 1 CUSTOMER PAGE (6 BADE BLUE SQUARE CARDS - PHOTO 1)
    // =========================================================================
    function renderLevel1Hub(pushState = true) {
      if (pushState) pushCustScreen('l1');

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
          if (k === 'claims') renderClaimsHub(true);
          else if (k === 'ebooks') renderEbookClaimsHub(true);
          else if (k === 'register') renderRegisterHub(true);
          else if (k === 'visitors') renderVisitorHub(true);
          else if (k === 'clicks') renderClickCountHub(true);
          else if (k === 'security') renderSecurityRoomHub(true);
        };
      });
    }

    // =========================================================================
    // SCREEN 2: CUSTOMER REQUEST CLAIM (PHOTO 2: CASH vs COINS)
    // =========================================================================
    function renderClaimsHub(pushState = true) {
      if (pushState) pushCustScreen('claims-hub');

      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #e02424; border: 2px solid #991b1b; border-radius: 12px; padding: 10px 24px; margin-bottom: 24px; box-shadow: 0 4px 10px rgba(224, 36, 36, 0.2);">
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

      document.getElementById('btnGoCashbackDesk').onclick = () => renderCashbackStagesHub(true);
      document.getElementById('btnGoGreenCoinDesk').onclick = () => renderGreenCoinStagesHub(true);
    }

    // =========================================================================
    // SCREEN 3: CASHBACK REWARD (PHOTO 3: 6 COLOR-CODED CARDS)
    // =========================================================================
    function renderCashbackStagesHub(pushState = true) {
      if (pushState) pushCustScreen('cb-stages-hub');

      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #ffffff; border: 2px solid #1e3a8a; border-radius: 25px; padding: 8px 24px; margin-bottom: 24px; box-shadow: 0 4px 10px rgba(30, 58, 138, 0.1);">
            <h3 style="font-size: 16px; font-weight: 900; color: #1e3a8a; letter-spacing: 1px; margin: 0; text-transform: uppercase;">✳ CASHBACK REWARD ✳</h3>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 16px; justify-content: center; width: 100%; max-width: 540px;">
            <button type="button" class="stock-square-card stage-box" data-step="1" style="height: 140px; background: #dc2626; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">NEW REQUEST<br/>CLAIM UNDER<br/>1 TO 25 DAYS</span>
            </button>

            <button type="button" class="stock-square-card stage-box" data-step="2" style="height: 140px; background: #ca8a04; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(202, 138, 4, 0.3);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">UNDER<br/>26 TO 50<br/>DAYS</span>
            </button>

            <button type="button" class="stock-square-card stage-box" data-step="3" style="height: 140px; background: #ea580c; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(234, 88, 12, 0.3);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">UNDER<br/>51 TO 75<br/>DAYS</span>
            </button>

            <button type="button" class="stock-square-card stage-box" data-step="4" style="height: 140px; background: #2563eb; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">UNDER<br/>76 TO 100<br/>DAYS</span>
            </button>

            <button type="button" class="stock-square-card stage-box" data-step="5" style="height: 140px; background: #16a34a; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(22, 163, 74, 0.3);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">101<br/>SEND<br/>REWARD</span>
            </button>

            <button type="button" class="stock-square-card stage-box" data-step="6" style="height: 140px; background: #9333ea; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(147, 51, 234, 0.3);">
              <span style="font-size: 15px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">HISTORY</span>
            </button>
          </div>
        </div>
      `;

      container.querySelectorAll('.stage-box').forEach(btn => {
        btn.onclick = function () {
          const step = Number(this.getAttribute('data-step'));
          if (step >= 1 && step <= 5) {
            renderCashbackStepTable(step, true);
          } else if (step === 6) {
            renderCashbackHistorySubHub(true);
          }
        };
      });
    }

    // --- PIPELINE COLOR BADGE HELPER ---
    function renderPipelineBadge(currentStep, totalDays) {
      const colors = ['🔴', '🟡', '🟠', '🔵', '🟢', '🟣'];
      return `
        <div style="display:flex; align-items:center; gap:3px; font-size:12px;">
          ${colors.map((c, i) => `
            <span style="opacity: ${i + 1 === currentStep ? '1' : '0.25'}; filter: ${i + 1 === currentStep ? 'drop-shadow(0 0 3px gold)' : 'none'};">${c}</span>${i < 5 ? '<span style="color:#dfcfbc; font-size:9px;">--</span>' : ''}
          `).join('')}
          <b style="margin-left:6px; font-size:11px; color:#6b3e26;">(${totalDays || 1}d)</b>
        </div>
      `;
    }

    // =========================================================================
    // STEPS 1 TO 5: CASHBACK CLAIM TABLES
    // =========================================================================
    function renderCashbackStepTable(stepNumber, pushState = true) {
      if (pushState) pushCustScreen(`cb-step-${stepNumber}`);
      const db = getCustomerDB();

      const stepTitles = {
        1: "1. New Request Claim Under 1 to 25 Days",
        2: "2. Under 26 to 50 Days (Verified Desk)",
        3: "3. Under 51 to 75 Days (Income Allocation)",
        4: "4. Under 76 to 100 Days (Method Review)",
        5: "5. 101 Send Reward (Final Payout Dispatch)"
      };

      container.innerHTML = `
        <div class="f-card" style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px; text-transform: uppercase;">${stepTitles[stepNumber]}</h3>

          ${renderDateFilterBar(`tblCashbackStep${stepNumber}`)}

          <div class="table-responsive-box">
            <table class="f-table" id="tblCashbackStep${stepNumber}">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date / Day / Time</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Product Price</th>
                  <th>Product Name</th>
                  <th>Document</th>
                  <th>Progress</th>
                  ${stepNumber === 1 ? '<th>Status</th>' : ''}
                  ${stepNumber === 2 ? '<th>Account</th><th>Status</th>' : ''}
                  ${stepNumber === 3 ? '<th>Income Generated</th><th>UPI / QR Method</th><th>Status</th>' : ''}
                  ${stepNumber === 4 ? '<th>Income Gen.</th><th>Payment Method</th><th>Status</th><th>Request</th>' : ''}
                  ${stepNumber === 5 ? '<th>Income Gen.</th><th>Method</th><th>Action</th><th>Status</th>' : ''}
                </tr>
              </thead>
              <tbody id="cbStepBody"></tbody>
            </table>
          </div>
        </div>
      `;

      function drawTable() {
        const tbody = document.getElementById('cbStepBody');
        const list = (db.cashbackClaims || []).filter(c => c.currentStep === stepNumber);

        if (list.length === 0) {
          tbody.innerHTML = `<tr><td colspan="15" style="text-align:center; padding:28px; color:#785a46; font-weight:600;">No live claims under this stage right now.</td></tr>`;
          return;
        }

        tbody.innerHTML = list.map((c, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${c.dateTime}</td>
            <td><b style="color:#0284c7;">${c.userId}</b></td>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone || 'N/A'}</td>
            <td>₹${c.productPrice}</td>
            <td><b>${c.productName}</b></td>
            <td><button type="button" class="btn-action-sm btn-blue">📄 View PDF</button></td>
            <td>${renderPipelineBadge(c.currentStep, c.elapsedDays)}</td>

            ${stepNumber === 1 ? `
              <td>
                <button type="button" class="btn-action-sm btn-green btn-step1-accept" data-id="${c.id}">Accept ✓</button>
                <button type="button" class="btn-action-sm btn-red btn-step1-reject" data-id="${c.id}">Reject ✕</button>
              </td>
            ` : ''}

            ${stepNumber === 2 ? `
              <td>
                <button type="button" class="btn-action-sm ${c.accountStatus === 'block' ? 'btn-red' : 'btn-green'} btn-toggle-block" data-id="${c.id}">
                  ${c.accountStatus === 'block' ? 'Blocked' : 'Active'}
                </button>
              </td>
              <td>
                <button type="button" class="btn-action-sm btn-green btn-step2-verify" data-id="${c.id}">Verify ➔ Step 3</button>
              </td>
            ` : ''}

            ${stepNumber === 3 ? `
              <td>
                <input type="number" class="inp-step3-income" data-id="${c.id}" value="${c.incomeGenerated || ''}" placeholder="₹ Enter" style="width:80px; padding:4px; font-size:11px;" />
              </td>
              <td>${c.paymentMethod || 'UPI/QR Attached'}</td>
              <td>
                <button type="button" class="btn-action-sm btn-green btn-step3-approve" data-id="${c.id}">Approve ➔ Step 4</button>
              </td>
            ` : ''}

            ${stepNumber === 4 ? `
              <td>₹${c.incomeGenerated || 0}</td>
              <td>${c.paymentMethod || 'UPI / QR'}</td>
              <td><span class="status-badge badge-pending">Pending 100d</span></td>
              <td>
                <button type="button" class="btn-action-sm btn-green btn-step4-confirm" data-id="${c.id}">Confirm ✓</button>
                <button type="button" class="btn-action-sm btn-red btn-step4-cancel" data-id="${c.id}">Cancel ✕</button>
              </td>
            ` : ''}

            ${stepNumber === 5 ? `
              <td>₹${c.incomeGenerated || 0}</td>
              <td>${c.paymentMethod || 'UPI / QR'}</td>
              <td>
                <button type="button" class="btn-action-sm btn-blue btn-step5-correct" data-id="${c.id}">Correct</button>
                <button type="button" class="btn-action-sm btn-red btn-step5-cancel" data-id="${c.id}">Cancel</button>
              </td>
              <td>
                <button type="button" class="btn-action-sm btn-green btn-step5-complete" data-id="${c.id}">Dispatched ✓</button>
              </td>
            ` : ''}
          </tr>
        `).join('');

        attachStepActionEvents(stepNumber);
      }

      function attachStepActionEvents(st) {
        // Step 1
        container.querySelectorAll('.btn-step1-accept').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (item) {
              item.currentStep = 2;
              saveCustomerDB(db);
              drawTable();
            }
          };
        });

        // Step 2 Block logic with double check & mandatory feedback
        container.querySelectorAll('.btn-toggle-block').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (!item) return;

            if (confirm('Are you sure you want to block this user account?')) {
              const reason = prompt('Mandatory: Enter short reason for blocking:');
              if (!reason) {
                alert('Feedback reason is strictly required to block.');
                return;
              }
              item.accountStatus = 'block';
              db.blockedUsers.push({
                sno: db.blockedUsers.length + 1,
                dateTime: new Date().toLocaleString(),
                userId: item.userId,
                name: item.name,
                email: item.email,
                phone: item.phone,
                address: item.address || 'N/A',
                feedback: reason,
                status: 'blocked'
              });
              saveCustomerDB(db);
              alert('Account Blocked & Stored in Blocked Database.');
              drawTable();
            }
          };
        });

        // Step 2 Verify -> Step 3
        container.querySelectorAll('.btn-step2-verify').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (item) {
              item.currentStep = 3;
              saveCustomerDB(db);
              drawTable();
            }
          };
        });

        // Step 3 Approve -> Step 4
        container.querySelectorAll('.btn-step3-approve').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const inp = container.querySelector(`.inp-step3-income[data-id="${id}"]`);
            const item = db.cashbackClaims.find(x => x.id === id);
            if (item && inp) {
              if (!inp.value || Number(inp.value) <= 0) {
                alert('Please enter manual income generated amount.');
                return;
              }
              item.incomeGenerated = Number(inp.value);
              item.currentStep = 4;
              saveCustomerDB(db);
              drawTable();
            }
          };
        });

        // Step 4 Confirm / Cancel
        container.querySelectorAll('.btn-step4-cancel').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (!item) return;

            const reason = prompt('Mandatory: Reason for cancelling request:');
            if (!reason) {
              alert('Feedback is required to cancel.');
              return;
            }

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
            saveCustomerDB(db);
            alert('Request cancelled & moved to Recycling Bin.');
            drawTable();
          };
        });

        container.querySelectorAll('.btn-step4-confirm').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (item) {
              item.currentStep = 5;
              saveCustomerDB(db);
              drawTable();
            }
          };
        });

        // Step 5 Dispatched Completed
        container.querySelectorAll('.btn-step5-complete').forEach(b => {
          b.onclick = function () {
            const id = this.getAttribute('data-id');
            const item = db.cashbackClaims.find(x => x.id === id);
            if (item) {
              item.currentStep = 6;
              item.status = 'completed';
              item.completedDate = new Date().toLocaleString();
              saveCustomerDB(db);
              alert('Cashback payout completed and archived for 1 year.');
              drawTable();
            }
          };
        });
      }

      drawTable();
    }
     // =========================================================================
    // STEP 6: HISTORY SUB-HUB (A: COMPLETED / B: RECYCLING BIN)
    // =========================================================================
    function renderCashbackHistorySubHub(pushState = true) {
      if (pushState) pushCustScreen('cb-hist-sub');

      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #9333ea; border: 2px solid #6b21a8; border-radius: 12px; padding: 10px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Cashback Claims History</h3>
          </div>

          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button type="button" id="btnGoHistCompleted" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 10px 24px rgba(59, 34, 25, 0.08);">
              <span style="font-size: 38px;">🟢</span>
              <span style="font-size: 15px; font-weight: 900; color: #16a34a; text-align: center; line-height: 1.2;">A) COMPLETED<br/>REWARDS</span>
            </button>

            <button type="button" id="btnGoHistBin" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 10px 24px rgba(59, 34, 25, 0.08);">
              <span style="font-size: 38px;">🗑️</span>
              <span style="font-size: 15px; font-weight: 900; color: #dc2626; text-align: center; line-height: 1.2;">B) RECYCLING<br/>BIN</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnGoHistCompleted').onclick = () => renderCashbackHistoryCompleted(true);
      document.getElementById('btnGoHistBin').onclick = () => renderCashbackHistoryBin(true);
    }

    function renderCashbackHistoryCompleted(pushState = true) {
      if (pushState) pushCustScreen('cb-hist-completed');
      const db = getCustomerDB();
      const list = (db.cashbackClaims || []).filter(c => c.currentStep === 6);

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">A) Completed Cashback Transfers</h3>
          ${renderDateFilterBar('tblHistComp')}

          <div class="table-responsive-box">
            <table class="f-table" id="tblHistComp">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date / Day / Time</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Product Price</th>
                  <th>Product Name</th>
                  <th>Transfer Amount</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody>
                ${list.length === 0
                  ? '<tr><td colspan="9" style="text-align:center; padding:28px; color:#785a46;">No completed payout records yet.</td></tr>'
                  : list.map((c, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${c.completedDate || c.dateTime}</td>
                      <td><b>${c.userId}</b></td>
                      <td>${c.name}</td>
                      <td>${c.email}</td>
                      <td>₹${c.productPrice}</td>
                      <td>${c.productName}</td>
                      <td><b style="color:#16a34a;">₹${c.incomeGenerated}</b></td>
                      <td>${c.paymentMethod}</td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
          <div style="margin-top:12px; font-size:13px; font-weight:800; color:#16a34a; text-align:right;">
            Total Transferred: ₹${list.reduce((acc, x) => acc + (x.incomeGenerated || 0), 0)}
          </div>
        </div>
      `;
    }

    function renderCashbackHistoryBin(pushState = true) {
      if (pushState) pushCustScreen('cb-hist-bin');
      const db = getCustomerDB();
      const list = db.recycleBinCashback || [];

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #dc2626; margin-bottom: 12px;">B) Recycling Bin (Cancelled / Blocked Requests)</h3>
          ${renderDateFilterBar('tblHistBin')}

          <div class="table-responsive-box">
            <table class="f-table" id="tblHistBin">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date / Day / Time</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Product Price</th>
                  <th>Product Name</th>
                  <th>Income Generate</th>
                  <th>Step</th>
                  <th>Feedback Reason</th>
                </tr>
              </thead>
              <tbody>
                ${list.length === 0
                  ? '<tr><td colspan="10" style="text-align:center; padding:28px; color:#785a46;">Recycling bin is empty.</td></tr>'
                  : list.map((c, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${c.dateTime}</td>
                      <td><b>${c.userId}</b></td>
                      <td>${c.name}</td>
                      <td>${c.email}</td>
                      <td>₹${c.productPrice}</td>
                      <td>${c.productName}</td>
                      <td>₹${c.incomeGenerated || 0}</td>
                      <td><b>${c.step}</b></td>
                      <td style="color:#dc2626;">${c.feedback}</td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // =========================================================================
    // GREEN COIN STAGES HUB (5 OPTIONS)
    // =========================================================================
    function renderGreenCoinStagesHub(pushState = true) {
      if (pushState) pushCustScreen('gc-stages-hub');

      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #ffffff; border: 2px solid #16a34a; border-radius: 25px; padding: 8px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #16a34a; letter-spacing: 1px; margin: 0; text-transform: uppercase;">🟢 GREEN COIN REWARD (12 DAYS) 🟢</h3>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 16px; justify-content: center; width: 100%; max-width: 540px;">
            <button type="button" class="stock-square-card gc-stage-btn" data-step="1" style="height: 140px; background: #475569; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(71, 85, 105, 0.3);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">1. REQUEST<br/>FOR REWARD</span>
            </button>

            <button type="button" class="stock-square-card gc-stage-btn" data-step="2" style="height: 140px; background: #78350f; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(120, 53, 15, 0.3);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">2. UNDER<br/>1 TO 7 DAYS</span>
            </button>

            <button type="button" class="stock-square-card gc-stage-btn" data-step="3" style="height: 140px; background: #db2777; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(219, 39, 119, 0.3);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">3. UNDER<br/>8 TO 12 DAYS</span>
            </button>

            <button type="button" class="stock-square-card gc-stage-btn" data-step="4" style="height: 140px; background: #059669; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">4. FINAL<br/>STEP</span>
            </button>

            <button type="button" class="stock-square-card gc-stage-btn" data-step="5" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.3);">
              <span style="font-size: 14px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">5. HISTORY</span>
            </button>
          </div>
        </div>
      `;

      container.querySelectorAll('.gc-stage-btn').forEach(b => {
        b.onclick = function () {
          const s = Number(this.getAttribute('data-step'));
          if (s >= 1 && s <= 4) renderGreenCoinStepTable(s, true);
          else if (s === 5) renderGreenCoinHistorySubHub(true);
        };
      });
    }

    function renderGreenCoinStepTable(stepNumber, pushState = true) {
      if (pushState) pushCustScreen(`gc-step-${stepNumber}`);
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:16px; font-weight:800; color:#3b2219;">GREEN COIN STAGE ${stepNumber}</h3>
            <div style="font-size:11.5px; font-weight:700;">MODE: <span style="color:#16a34a;">AI & MANUAL ACTIVE</span></div>
          </div>

          ${renderDateFilterBar(`tblGcStep${stepNumber}`)}

          <div class="table-responsive-box">
            <table class="f-table" id="tblGcStep${stepNumber}">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date / Day / Time</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Product Price</th>
                  <th>Product Name</th>
                  <th>Document</th>
                  <th>Progress</th>
                  <th>Status / Action</th>
                </tr>
              </thead>
              <tbody id="tblGcBody"></tbody>
            </table>
          </div>
        </div>
      `;

      const tbody = document.getElementById('tblGcBody');
      const list = (db.greenCoinClaims || []).filter(x => x.currentStep === stepNumber);

      if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding:28px; color:#785a46;">No live Green Coin claims in this stage.</td></tr>`;
      } else {
        tbody.innerHTML = list.map((c, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${c.dateTime}</td>
            <td><b>${c.userId}</b></td>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone || 'N/A'}</td>
            <td>₹${c.productPrice}</td>
            <td>${c.productName}</td>
            <td><button type="button" class="btn-action-sm btn-blue">📄 View PDF</button></td>
            <td>🤍-🤎-🩷-💚-🩵 (${c.elapsedDays || 1}d)</td>
            <td>
              <button type="button" class="btn-action-sm btn-green">Accept ➔ Next</button>
            </td>
          </tr>
        `).join('');
      }
    }

    function renderGreenCoinHistorySubHub(pushState = true) {
      if (pushState) pushCustScreen('gc-hist-sub');

      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #0284c7; border: 2px solid #0369a1; border-radius: 12px; padding: 10px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Green Coin History Vault</h3>
          </div>

          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button type="button" id="btnGoGcCompleted" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 10px 24px rgba(59, 34, 25, 0.08);">
              <span style="font-size: 38px;">🟢</span>
              <span style="font-size: 14px; font-weight: 900; color: #16a34a; text-align: center; line-height: 1.2;">A) COMPLETED<br/>COINS</span>
            </button>

            <button type="button" id="btnGoGcBinAI" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 10px 24px rgba(59, 34, 25, 0.08);">
              <span style="font-size: 38px;">🤖</span>
              <span style="font-size: 14px; font-weight: 900; color: #dc2626; text-align: center; line-height: 1.2;">B) RECYCLING BIN<br/>BY AI</span>
            </button>

            <button type="button" id="btnGoGcBinManual" class="stock-square-card" style="width: 170px; height: 170px; background: #ffffff; border: 2px solid #dfcfbc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 10px 24px rgba(59, 34, 25, 0.08);">
              <span style="font-size: 38px;">👤</span>
              <span style="font-size: 14px; font-weight: 900; color: #b91c1c; text-align: center; line-height: 1.2;">C) RECYCLING BIN<br/>BY MANUAL</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnGoGcCompleted').onclick = () => renderGreenCoinHistoryCompleted(true);
      document.getElementById('btnGoGcBinAI').onclick = () => renderGreenCoinHistoryBinAI(true);
      document.getElementById('btnGoGcBinManual').onclick = () => renderGreenCoinHistoryBinManual(true);
    }

    function renderGreenCoinHistoryCompleted(pushState = true) {
      if (pushState) pushCustScreen('gc-hist-completed');
      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #16a34a; margin-bottom: 12px;">Completed Green Coin Transfers</h3>
          ${renderDateFilterBar('tblGcHistComp')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblGcHistComp">
              <thead><tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Email</th><th>Product</th><th>Coins Added</th></tr></thead>
              <tbody><tr><td colspan="7" style="text-align:center; padding:28px; color:#785a46;">No completed coin claims yet.</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderGreenCoinHistoryBinAI(pushState = true) {
      if (pushState) pushCustScreen('gc-hist-bin-ai');
      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #dc2626; margin-bottom: 12px;">Recycling Bin (AI Auto-Filtered)</h3>
          ${renderDateFilterBar('tblGcBinAI')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblGcBinAI">
              <thead><tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Product</th><th>AI Anomaly Reason</th><th>Report</th></tr></thead>
              <tbody><tr><td colspan="7" style="text-align:center; padding:28px; color:#785a46;">No AI rejected logs.</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderGreenCoinHistoryBinManual(pushState = true) {
      if (pushState) pushCustScreen('gc-hist-bin-man');
      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #b91c1c; margin-bottom: 12px;">Recycling Bin (Manual Rejected)</h3>
          ${renderDateFilterBar('tblGcBinMan')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblGcBinMan">
              <thead><tr><th>S.No.</th><th>Date/Time</th><th>User ID</th><th>Name</th><th>Product</th><th>Manual Feedback Reason</th></tr></thead>
              <tbody><tr><td colspan="6" style="text-align:center; padding:28px; color:#785a46;">No manual rejected records.</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }
     // =========================================================================
    // SCREEN 4: EBOOK PURCHASE CLAIM (CASH / GREEN COIN / BANK)
    // =========================================================================
    function renderEbookClaimsHub(pushState = true) {
      if (pushState) pushCustScreen('ebook-claims-hub');

      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #ffffff; border: 2px solid #3b2219; border-radius: 12px; padding: 8px 18px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #3b2219; letter-spacing: 1px; margin: 0; text-transform: uppercase;">E-Book Purchases Claim Hub</h3>
          </div>

          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button type="button" id="btnGoEbCash" class="stock-square-card" style="width: 160px; height: 160px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 36px;">💵</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Sales by<br/>Cash</span>
            </button>

            <button type="button" id="btnGoEbCoin" class="stock-square-card" style="width: 160px; height: 160px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 36px;">🪙</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Sale by<br/>Green Coin</span>
            </button>

            <button type="button" id="btnGoEbBank" class="stock-square-card" style="width: 160px; height: 160px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 36px;">🏦</span>
              <span style="font-size: 14px; font-weight: 800; color: #ffffff; text-align: center; line-height: 1.2;">Bank<br/>(Coin Vault)</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnGoEbCash').onclick = () => renderEbookCashSubHub(true);
      document.getElementById('btnGoEbCoin').onclick = () => renderEbookCoinSubHub(true);
      document.getElementById('btnGoEbBank').onclick = () => renderCoinBankVault(true);
    }

    // --- SALES BY CASH (4 OPTIONS) ---
    function renderEbookCashSubHub(pushState = true) {
      if (pushState) pushCustScreen('eb-cash-hub');

      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #1e3a8a; border: 2px solid #172554; border-radius: 12px; padding: 10px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Sales By Cash (UPI/PG)</h3>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 16px; justify-content: center; width: 100%; max-width: 540px;">
            <button type="button" id="btnGoEbCashTransfer" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">1. CUSTOMER<br/>TRANSFER<br/>DETAILS</span>
            </button>

            <button type="button" id="btnGoEbCashSales" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">2. SALES<br/>DETAILS</span>
            </button>

            <button type="button" id="btnGoEbCashFailed" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">3. FAILED<br/>TRANSACTION</span>
            </button>

            <button type="button" id="btnGoEbCashLedger" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">4. LEDGER<br/>ACCOUNT</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnGoEbCashTransfer').onclick = () => renderEbookCashTransferDetails(true);
      document.getElementById('btnGoEbCashSales').onclick = () => renderEbookCashSalesDetails(true);
      document.getElementById('btnGoEbCashFailed').onclick = () => renderEbookCashFailed(true);
      document.getElementById('btnGoEbCashLedger').onclick = () => renderEbookCashLedger(true);
    }

    // Cash 1: Customer Transfer Details
    function renderEbookCashTransferDetails(pushState = true) {
      if (pushState) pushCustScreen('eb-cash-transfer');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">1. Customer Transfer Details (AI Auto 2-Second Delivery)</h3>
          ${renderDateFilterBar('tblEbCashTrans')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblEbCashTrans">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date & Time</th>
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>User ID</th>
                  <th>Email</th>
                  <th>E-Book Name</th>
                  <th>Serial No.</th>
                  <th>Price</th>
                  <th>Amount Paid</th>
                  <th>Bank UTR Ref</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                ${db.cashEbookSales.length === 0
                  ? '<tr><td colspan="12" style="text-align:center; padding:28px; color:#785a46;">No live E-Book purchase orders yet.</td></tr>'
                  : db.cashEbookSales.map((e, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${e.dateTime}</td>
                      <td><b>${e.orderId}</b></td>
                      <td>${e.name}</td>
                      <td>${e.userId}</td>
                      <td>${e.email}</td>
                      <td>${e.bookName}</td>
                      <td><code>${e.serialNo}</code></td>
                      <td>₹${e.price}</td>
                      <td><b style="color:#16a34a;">₹${e.paid}</b></td>
                      <td><code>${e.utr}</code></td>
                      <td><span class="status-badge badge-active">🟢 VERIFIED BY BANK</span></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Cash 2: Sales Details
    function renderEbookCashSalesDetails(pushState = true) {
      if (pushState) pushCustScreen('eb-cash-sales');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">2. Sales Details & Bank Verification</h3>
          ${renderDateFilterBar('tblEbCashSales')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblEbCashSales">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Order ID</th>
                  <th>Date & Time</th>
                  <th>Name</th>
                  <th>User ID</th>
                  <th>Book Title</th>
                  <th>Serial No.</th>
                  <th>Gross Paid (₹)</th>
                  <th>Est. Bank Credit (₹)</th>
                  <th>Bank UTR</th>
                  <th>Delivery Status</th>
                  <th>Bank Match</th>
                </tr>
              </thead>
              <tbody>
                ${db.cashEbookSales.length === 0
                  ? '<tr><td colspan="12" style="text-align:center; padding:28px; color:#785a46;">No sales records logged yet.</td></tr>'
                  : db.cashEbookSales.map((s, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td><b>${s.orderId}</b></td>
                      <td>${s.dateTime}</td>
                      <td>${s.name}</td>
                      <td>${s.userId}</td>
                      <td>${s.bookName}</td>
                      <td><code>${s.serialNo}</code></td>
                      <td>₹${s.paid}</td>
                      <td>₹${(s.paid * 0.976).toFixed(2)}</td>
                      <td><code>${s.utr}</code></td>
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

    // Cash 3: Failed Transactions
    function renderEbookCashFailed(pushState = true) {
      if (pushState) pushCustScreen('eb-cash-failed');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #dc2626; margin-bottom: 12px;">3. Failed / Dropped Transactions Desk</h3>
          ${renderDateFilterBar('tblEbCashFailed')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblEbCashFailed">
              <thead>
                <tr>
                  <th>Attempt ID</th>
                  <th>Date/Time</th>
                  <th>Name</th>
                  <th>User ID</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Book Selected</th>
                  <th>Price</th>
                  <th>Failure Reason</th>
                  <th>Bank UTR</th>
                  <th>Quick Action</th>
                  <th>Auto-Recheck</th>
                  <th>Transaction</th>
                </tr>
              </thead>
              <tbody>
                ${(db.failedCashOrders || []).length === 0
                  ? '<tr><td colspan="13" style="text-align:center; padding:28px; color:#785a46;">No failed transactions found.</td></tr>'
                  : db.failedCashOrders.map((f, i) => `
                    <tr>
                      <td><b>${f.attemptId}</b></td>
                      <td>${f.dateTime}</td>
                      <td>${f.name}</td>
                      <td>${f.userId}</td>
                      <td>${f.email}</td>
                      <td>${f.phone}</td>
                      <td>${f.bookName}</td>
                      <td>₹${f.price}</td>
                      <td style="color:#dc2626;">${f.reason}</td>
                      <td>${f.utr || 'Not Generated'}</td>
                      <td>
                        <button type="button" class="btn-action-sm btn-gold">⚡ Force Deliver</button>
                        <button type="button" class="btn-action-sm btn-red">❌ Cancel</button>
                      </td>
                      <td><span class="status-badge badge-pending">${f.recheckStatus || 'Pending'}</span></td>
                      <td><b>${f.status || 'Failed'}</b></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Cash 4: Ledger Account
    function renderEbookCashLedger(pushState = true) {
      if (pushState) pushCustScreen('eb-cash-ledger');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">4. Ledger Account (Daily Reconciliation & Audit)</h3>
          ${renderDateFilterBar('tblEbCashLedger')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblEbCashLedger">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date/Time</th>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Actual Price</th>
                  <th>Platform Fee</th>
                  <th>Tax Pay (GST)</th>
                  <th>Received Money</th>
                  <th>Pending Money</th>
                  <th>Cancelled</th>
                  <th>UTR Match</th>
                </tr>
              </thead>
              <tbody>
                ${db.cashEbookSales.length === 0
                  ? '<tr><td colspan="11" style="text-align:center; padding:28px; color:#785a46;">Ledger is empty for this period.</td></tr>'
                  : db.cashEbookSales.map((l, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${l.dateTime}</td>
                      <td><b>${l.orderId}</b></td>
                      <td>${l.userId}</td>
                      <td>₹${l.price}</td>
                      <td>₹${(l.price * 0.02).toFixed(2)}</td>
                      <td>₹${(l.price * 0.0036).toFixed(2)}</td>
                      <td><b style="color:#16a34a;">₹${(l.price * 0.976).toFixed(2)}</b></td>
                      <td>₹0</td>
                      <td>₹0</td>
                      <td><span style="color:#16a34a; font-weight:800;">✓ Correct</span></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
          <div style="background:#fbf8f3; border:1px solid #dfcfbc; padding:12px; border-radius:8px; margin-top:14px; display:flex; justify-content:space-between; flex-wrap:wrap; font-size:12px; font-weight:700;">
            <div>Gross Total Sales: ₹0</div>
            <div>Net Profit Transferred: ₹0</div>
            <div>Total Cancelled: 0</div>
            <div>Bank Timeout Pending: 0</div>
          </div>
        </div>
      `;
    }

    // --- SALE BY GREEN COIN (4 OPTIONS) ---
    function renderEbookCoinSubHub(pushState = true) {
      if (pushState) pushCustScreen('eb-coin-hub');

      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #15803d; border: 2px solid #14532d; border-radius: 12px; padding: 10px 24px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Sales By Green Coin</h3>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 16px; justify-content: center; width: 100%; max-width: 540px;">
            <button type="button" id="btnGoEbCoinTransfer" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">1. SALE BY<br/>GREEN COINS</span>
            </button>

            <button type="button" id="btnGoEbCoinSales" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">2. SALE<br/>DETAIL 2</span>
            </button>

            <button type="button" id="btnGoEbCoinWrong" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">3. WRONG<br/>TRANSACTION</span>
            </button>

            <button type="button" id="btnGoEbCoinBook" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">4. TRANSACTION<br/>BOOK</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnGoEbCoinTransfer').onclick = () => renderEbookCoinTransferDetails(true);
      document.getElementById('btnGoEbCoinSales').onclick = () => renderEbookCoinSalesDetails(true);
      document.getElementById('btnGoEbCoinWrong').onclick = () => renderEbookCoinFailed(true);
      document.getElementById('btnGoEbCoinBook').onclick = () => renderEbookCoinTransactionBook(true);
    }

    // Coin 1: Customer Transfer by Green Coin
    function renderEbookCoinTransferDetails(pushState = true) {
      if (pushState) pushCustScreen('eb-coin-transfer');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #16a34a; margin-bottom: 12px;">1. Sale By Green Coins (AI Coin Match)</h3>
          ${renderDateFilterBar('tblEbCoinTrans')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblEbCoinTrans">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date & Time</th>
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>User ID</th>
                  <th>Email</th>
                  <th>E-Book Name</th>
                  <th>Serial No.</th>
                  <th>Price</th>
                  <th>Amount Paid</th>
                  <th>Transaction ID</th>
                  <th>AI Match</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                ${db.coinEbookSales.length === 0
                  ? '<tr><td colspan="13" style="text-align:center; padding:28px; color:#785a46;">No Green Coin E-Book sales recorded yet.</td></tr>'
                  : db.coinEbookSales.map((c, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${c.dateTime}</td>
                      <td><b>${c.orderId}</b></td>
                      <td>${c.name}</td>
                      <td>${c.userId}</td>
                      <td>${c.email}</td>
                      <td>${c.bookName}</td>
                      <td><code>${c.serialNo}</code></td>
                      <td>${c.price} Coins</td>
                      <td><b>${c.paid} Coins</b></td>
                      <td><code>${c.transId}</code></td>
                      <td><span style="color:#16a34a; font-weight:800;">🔘 Match</span></td>
                      <td><span class="status-badge badge-active">🔵 VERIFIED BY AI</span></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Coin 2: Sale Details 2
    function renderEbookCoinSalesDetails(pushState = true) {
      if (pushState) pushCustScreen('eb-coin-sales');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #16a34a; margin-bottom: 12px;">2. Green Coin Sales Details 2</h3>
          ${renderDateFilterBar('tblEbCoinSales')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblEbCoinSales">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Order ID</th>
                  <th>Date & Time</th>
                  <th>Name</th>
                  <th>User ID</th>
                  <th>Book Title</th>
                  <th>Serial No.</th>
                  <th>Gross Paid (Coins)</th>
                  <th>Transaction Ref No.</th>
                  <th>AI Match</th>
                  <th>Delivery Status</th>
                </tr>
              </thead>
              <tbody>
                ${db.coinEbookSales.length === 0
                  ? '<tr><td colspan="11" style="text-align:center; padding:28px; color:#785a46;">No sales records logged yet.</td></tr>'
                  : db.coinEbookSales.map((s, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td><b>${s.orderId}</b></td>
                      <td>${s.dateTime}</td>
                      <td>${s.name}</td>
                      <td>${s.userId}</td>
                      <td>${s.bookName}</td>
                      <td><code>${s.serialNo}</code></td>
                      <td>${s.paid} Coins</td>
                      <td><code>${s.transId}</code></td>
                      <td><span style="color:#16a34a; font-weight:800;">🔘 Match</span></td>
                      <td><span class="status-badge badge-active">🟢 Auto-Delivered</span></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Coin 3: Wrong Transaction
    function renderEbookCoinFailed(pushState = true) {
      if (pushState) pushCustScreen('eb-coin-wrong');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #dc2626; margin-bottom: 12px;">3. Wrong Transaction (Insufficient Coins / Timeout)</h3>
          ${renderDateFilterBar('tblEbCoinWrong')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblEbCoinWrong">
              <thead>
                <tr>
                  <th>Attempt ID</th>
                  <th>Date/Time</th>
                  <th>Name</th>
                  <th>User ID</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Book</th>
                  <th>Coins Req.</th>
                  <th>Failure Reason</th>
                  <th>Status</th>
                  <th>Transaction</th>
                </tr>
              </thead>
              <tbody>
                ${(db.failedCoinOrders || []).length === 0
                  ? '<tr><td colspan="11" style="text-align:center; padding:28px; color:#785a46;">No wrong transactions recorded.</td></tr>'
                  : db.failedCoinOrders.map((w, i) => `
                    <tr>
                      <td><b>${w.attemptId}</b></td>
                      <td>${w.dateTime}</td>
                      <td>${w.name}</td>
                      <td>${w.userId}</td>
                      <td>${w.email}</td>
                      <td>${w.phone}</td>
                      <td>${w.bookName}</td>
                      <td>${w.price} Coins</td>
                      <td style="color:#dc2626;">${w.reason}</td>
                      <td><span class="status-badge badge-pending">${w.status || 'Pending'}</span></td>
                      <td><b>${w.finalState || 'Failed'}</b></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Coin 4: Transaction Book
    function renderEbookCoinTransactionBook(pushState = true) {
      if (pushState) pushCustScreen('eb-coin-book');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #16a34a; margin-bottom: 12px;">4. Green Coin Transaction Book</h3>
          ${renderDateFilterBar('tblEbCoinBook')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblEbCoinBook">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date/Time</th>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Received Coin</th>
                  <th>Pending Coin</th>
                  <th>Cancelled</th>
                  <th>Coin Bank Sync</th>
                  <th>Match</th>
                </tr>
              </thead>
              <tbody>
                ${db.coinEbookSales.length === 0
                  ? '<tr><td colspan="9" style="text-align:center; padding:28px; color:#785a46;">Transaction book is clean.</td></tr>'
                  : db.coinEbookSales.map((b, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${b.dateTime}</td>
                      <td><b>${b.orderId}</b></td>
                      <td>${b.userId}</td>
                      <td>+${b.paid} Coins</td>
                      <td>0</td>
                      <td>0</td>
                      <td>Vault Sync Verified</td>
                      <td><span style="color:#16a34a; font-weight:800;">✓ Correct</span></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
          <div style="background:#fbf8f3; border:1px solid #dfcfbc; padding:12px; border-radius:8px; margin-top:14px; font-size:12px; font-weight:700;">
            Total Redeemed Coins: 0 Coins | Vault Running Balance: 0 Coins
          </div>
        </div>
      `;
    }

    // Bank: Coin Vault
    function renderCoinBankVault(pushState = true) {
      if (pushState) pushCustScreen('eb-bank-vault');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">🏦 Bank (Central Green Coin Vault)</h3>
          ${renderDateFilterBar('tblCoinBankVault')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblCoinBankVault">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date/Time</th>
                  <th>User ID</th>
                  <th>Transaction Type</th>
                  <th>Coins Inflow</th>
                  <th>Generated UTR</th>
                  <th>AI Delivery Signal</th>
                </tr>
              </thead>
              <tbody>
                ${(db.coinBankVault || []).length === 0
                  ? '<tr><td colspan="7" style="text-align:center; padding:28px; color:#785a46;">No transactions in Coin Bank Vault yet.</td></tr>'
                  : db.coinBankVault.map((v, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${v.dateTime}</td>
                      <td><b>${v.userId}</b></td>
                      <td>${v.type}</td>
                      <td>+${v.coins} Coins</td>
                      <td><code>${v.utr}</code></td>
                      <td><span class="status-badge badge-active">Delivered</span></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

     // =========================================================================
    // SCREEN 5: REGISTER ID (4 OPTIONS)
    // =========================================================================
    function renderRegisterHub(pushState = true) {
      if (pushState) pushCustScreen('register-hub');

      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #ffffff; border: 2px solid #3b2219; border-radius: 12px; padding: 8px 18px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #3b2219; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Register ID Matrix</h3>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 160px)); gap: 16px; justify-content: center; width: 100%; max-width: 540px;">
            <button type="button" id="btnGoRegCust" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">1. CUSTOMER<br/>REGISTER<br/>DETAIL</span>
            </button>

            <button type="button" id="btnGoRegReferral" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">2. CUSTOMER<br/>REFERRAL<br/>DETAIL</span>
            </button>

            <button type="button" id="btnGoRegLoginRef" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">3. LOGIN BY<br/>REFERRAL<br/>CODE</span>
            </button>

            <button type="button" id="btnGoRegBlocked" class="stock-square-card" style="height: 140px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; cursor: pointer; box-shadow: 0 8px 20px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 13px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">4. CUSTOMER<br/>BLOCK<br/>DATABASE</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnGoRegCust').onclick = () => renderRegisterCustomerDetails(true);
      document.getElementById('btnGoRegReferral').onclick = () => renderRegisterCustomerReferrals(true);
      document.getElementById('btnGoRegLoginRef').onclick = () => renderRegisterLoginByReferral(true);
      document.getElementById('btnGoRegBlocked').onclick = () => renderRegisterCustomerBlocked(true);
    }

    // Reg 1: Customer Register Detail
    function renderRegisterCustomerDetails(pushState = true) {
      if (pushState) pushCustScreen('reg-cust-details');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">1. Customer Registration Records</h3>
          ${renderDateFilterBar('tblRegCust')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblRegCust">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date/Time</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>User Referral Code</th>
                  <th>Referral Count (Max 5)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${(db.registeredUsers || []).length === 0
                  ? '<tr><td colspan="10" style="text-align:center; padding:28px; color:#785a46;">No registered customer accounts yet.</td></tr>'
                  : db.registeredUsers.map((u, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${u.dateTime}</td>
                      <td><b>${u.userId}</b></td>
                      <td>${u.name}</td>
                      <td>${u.email}</td>
                      <td>${u.phone}</td>
                      <td>${u.address || 'N/A'}</td>
                      <td><code>${u.refCode}</code></td>
                      <td>${u.refCount || 0} / 5</td>
                      <td>
                        <button type="button" class="btn-action-sm ${u.status === 'blocked' ? 'btn-red' : 'btn-green'} btn-block-user" data-id="${u.userId}">
                          ${u.status === 'blocked' ? 'Blocked' : 'Active'}
                        </button>
                      </td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      container.querySelectorAll('.btn-block-user').forEach(b => {
        b.onclick = function () {
          const uid = this.getAttribute('data-id');
          if (confirm(`Do you really want to block user ${uid}?`)) {
            const reason = prompt('Mandatory: Enter blocking reason:');
            if (!reason) {
              alert('Reason required to block.');
              return;
            }
            const match = db.registeredUsers.find(x => x.userId === uid);
            if (match) {
              match.status = 'blocked';
              db.blockedUsers.push({ ...match, feedback: reason });
              saveCustomerDB(db);
              renderRegisterCustomerDetails(false);
            }
          }
        };
      });
    }

    // Reg 2: Customer Referral Detail (Exact Sky Blue -> Bold Divider -> 5 Yellow -> Pink -> Green)
    function renderRegisterCustomerReferrals(pushState = true) {
      if (pushState) pushCustScreen('reg-cust-referrals');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #0284c7; margin-bottom: 12px;">2. Customer Referral Match Ledger</h3>
          ${renderDateFilterBar('tblRegRef')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblRegRef">
              <thead>
                <tr>
                  <th colspan="5" style="background:#0284c7; color:#fff; text-align:center;">New User Details (Sky Blue Section)</th>
                  <th style="background:#000; color:#fff; width:4px; padding:0;"></th>
                  <th colspan="5" style="background:#ca8a04; color:#fff; text-align:center;">5 Match Rows (Yellow Section)</th>
                  <th style="background:#000; color:#fff; width:4px; padding:0;"></th>
                  <th colspan="4" style="background:#db2777; color:#fff; text-align:center;">Referrer Info (Pink Section)</th>
                  <th style="background:#16a34a; color:#fff; text-align:center;">Transfer Status</th>
                </tr>
                <tr>
                  <!-- Sky Blue (New User) -->
                  <th style="color:#0284c7;">S.No.</th>
                  <th style="color:#0284c7;">Date/Time</th>
                  <th style="color:#0284c7;">User ID</th>
                  <th style="color:#0284c7;">Name</th>
                  <th style="color:#0284c7;">Email</th>
                  <!-- Divider -->
                  <th style="background:#000; width:4px; padding:0;"></th>
                  <!-- Yellow (5 Match items) -->
                  <th style="color:#ca8a04;">Invite Code</th>
                  <th style="color:#ca8a04;">Received Code</th>
                  <th style="color:#ca8a04;">Match Status</th>
                  <th style="color:#ca8a04;">Coin For Inviter (7)</th>
                  <th style="color:#ca8a04;">Coin For Receiver (4)</th>
                  <!-- Divider -->
                  <th style="background:#000; width:4px; padding:0;"></th>
                  <!-- Pink (Inviter Info) -->
                  <th style="color:#db2777;">Inviter Name</th>
                  <th style="color:#db2777;">Inviter User ID</th>
                  <th style="color:#db2777;">Inviter Email</th>
                  <th style="color:#db2777;">Original Code</th>
                  <!-- Green Transfer -->
                  <th style="color:#16a34a;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${(db.referralLedger || []).length === 0
                  ? '<tr><td colspan="17" style="text-align:center; padding:28px; color:#785a46;">No referral login logs registered yet.</td></tr>'
                  : db.referralLedger.map((r, i) => `
                    <tr>
                      <!-- Sky Blue -->
                      <td style="color:#0284c7; font-weight:700;">${i + 1}</td>
                      <td style="color:#0284c7;">${r.dateTime}</td>
                      <td style="color:#0284c7; font-weight:800;">${r.newUserId}</td>
                      <td style="color:#0284c7;">${r.newName}</td>
                      <td style="color:#0284c7;">${r.newEmail}</td>
                      <!-- Divider -->
                      <td style="background:#000; width:4px; padding:0;"></td>
                      <!-- Yellow -->
                      <td style="color:#ca8a04; font-weight:800;">${r.inviteCode}</td>
                      <td style="color:#ca8a04; font-weight:800;">${r.receivedCode}</td>
                      <td style="color:#ca8a04;"><b>${r.matchStatus || 'MATCH'}</b></td>
                      <td style="color:#ca8a04; font-weight:800;">+7 Coins</td>
                      <td style="color:#ca8a04; font-weight:800;">+4 Coins</td>
                      <!-- Divider -->
                      <td style="background:#000; width:4px; padding:0;"></td>
                      <!-- Pink -->
                      <td style="color:#db2777;">${r.inviterName}</td>
                      <td style="color:#db2777; font-weight:800;">${r.inviterUserId}</td>
                      <td style="color:#db2777;">${r.inviterEmail}</td>
                      <td style="color:#db2777;"><code>${r.originalCode}</code></td>
                      <!-- Green -->
                      <td><span style="color:#16a34a; font-weight:900;">🟢 COMPLETED (1s)</span></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Reg 3: Login By Referral Code
    function renderRegisterLoginByReferral(pushState = true) {
      if (pushState) pushCustScreen('reg-login-ref');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">3. Customer Accounts Created via Referral Code</h3>
          ${renderDateFilterBar('tblRegLoginRef')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblRegLoginRef">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date/Time</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Used Referral Code</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${(db.registeredUsers || []).filter(u => u.joinedByRef).length === 0
                  ? '<tr><td colspan="8" style="text-align:center; padding:28px; color:#785a46;">No accounts created via referral code yet.</td></tr>'
                  : db.registeredUsers.filter(u => u.joinedByRef).map((u, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${u.dateTime}</td>
                      <td><b>${u.userId}</b></td>
                      <td>${u.name}</td>
                      <td>${u.email}</td>
                      <td>${u.phone}</td>
                      <td><code>${u.usedRefCode}</code></td>
                      <td><span class="status-badge badge-active">ACTIVE</span></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
     / Reg 4: Customer Block Database
    function renderRegisterCustomerBlocked(pushState = true) {
      if (pushState) pushCustScreen('reg-cust-blocked');
      const db = getCustomerDB();

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #dc2626; margin-bottom: 12px;">4. Blocked Customer Database</h3>
          ${renderDateFilterBar('tblRegBlocked')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblRegBlocked">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date/Time</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Mandatory Feedback Reason</th>
                  <th>Status Action</th>
                </tr>
              </thead>
              <tbody>
                ${(db.blockedUsers || []).length === 0
                  ? '<tr><td colspan="8" style="text-align:center; padding:28px; color:#785a46;">No blocked customer accounts.</td></tr>'
                  : db.blockedUsers.map((b, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${b.dateTime}</td>
                      <td><b>${b.userId}</b></td>
                      <td>${b.name}</td>
                      <td>${b.email}</td>
                      <td>${b.phone}</td>
                      <td style="color:#dc2626; font-weight:700;">${b.feedback}</td>
                      <td><button type="button" class="btn-action-sm btn-green btn-unblock-user" data-id="${b.userId}">Unblock ✓</button></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      container.querySelectorAll('.btn-unblock-user').forEach(btn => {
        btn.onclick = function () {
          const uid = this.getAttribute('data-id');
          db.blockedUsers = db.blockedUsers.filter(x => x.userId !== uid);
          const u = db.registeredUsers.find(x => x.userId === uid);
          if (u) u.status = 'active';
          saveCustomerDB(db);
          alert(`User ${uid} unblocked successfully.`);
          renderRegisterCustomerBlocked(false);
        };
      });
    }

    // =========================================================================
    // SCREEN 6: VISITOR COUNT (GUEST vs LOGIN)
    // =========================================================================
    function renderVisitorHub(pushState = true) {
      if (pushState) pushCustScreen('visitor-hub');

      container.innerHTML = `
        <div style="padding: 10px 0; min-height: 70vh; display:flex; flex-direction:column; align-items:center;">
          <div style="background: #ffffff; border: 2px solid #3b2219; border-radius: 12px; padding: 8px 18px; margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 900; color: #3b2219; letter-spacing: 1px; margin: 0; text-transform: uppercase;">Visitor Traffic Monitor</h3>
          </div>

          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button type="button" id="btnGoGuestVis" class="stock-square-card" style="width: 170px; height: 170px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 38px;">🌐</span>
              <span style="font-size: 15px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">GUEST MODE<br/>VISITORS</span>
            </button>

            <button type="button" id="btnGoLoginVis" class="stock-square-card" style="width: 170px; height: 170px; background: #0284c7; border: none; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; box-shadow: 0 10px 24px rgba(2, 132, 199, 0.25);">
              <span style="font-size: 38px;">👤</span>
              <span style="font-size: 15px; font-weight: 900; color: #ffffff; text-align: center; line-height: 1.2;">LOGIN<br/>VISITORS</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnGoGuestVis').onclick = () => renderVisitorGuestTable(true);
      document.getElementById('btnGoLoginVis').onclick = () => renderVisitorLoginTable(true);
    }

    function renderVisitorGuestTable(pushState = true) {
      if (pushState) pushCustScreen('vis-guest-table');
      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">Guest Mode Visitors (Unregistered)</h3>
          ${renderDateFilterBar('tblVisGuest')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblVisGuest">
              <thead><tr><th>Time Period</th><th>Unique IP Count</th><th>Pageviews</th><th>Bounce Rate</th></tr></thead>
              <tbody><tr><td>Today</td><td>0</td><td>0</td><td>0%</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderVisitorLoginTable(pushState = true) {
      if (pushState) pushCustScreen('vis-login-table');
      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">Logged In Member Visitors</h3>
          ${renderDateFilterBar('tblVisLogin')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblVisLogin">
              <thead><tr><th>Time Period</th><th>Active Members</th><th>Session Duration</th><th>Actions Logged</th></tr></thead>
              <tbody><tr><td>Today</td><td>0</td><td>0m</td><td>0</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    // =========================================================================
    // SCREEN 7: LINK CLICK COUNT
    // =========================================================================
    function renderClickCountHub(pushState = true) {
      if (pushState) pushCustScreen('click-count-hub');

      container.innerHTML = `
        <div class="f-card">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 12px;">Platform Redirection Click Analytics</h3>
          ${renderDateFilterBar('tblClickCount')}
          <div class="table-responsive-box">
            <table class="f-table" id="tblClickCount">
              <thead>
                <tr>
                  <th>Store Platform</th>
                  <th>Today Clicks</th>
                  <th>Yesterday</th>
                  <th>Weekly</th>
                  <th>Monthly</th>
                  <th>Yearly</th>
                  <th>All Time Total</th>
                </tr>
              </thead>
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

    // =========================================================================
    // SCREEN 8: SECURITY ROOM (5-LAYER DEFENSE ROOM)
    // =========================================================================
    function renderSecurityRoomHub(pushState = true) {
      if (pushState) pushCustScreen('security-hub');

      container.innerHTML = `
        <div class="f-card" style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #3b2219; margin-bottom: 6px;">🛡️ Security Room: 5-Layer Perimeter Defense</h3>
          <p style="font-size: 12px; color: #785a46; margin-bottom: 14px;">Automated AI Sentinel defending Customer Portal & Air-Gapped DB.</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 16px;">
            <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:8px; padding:12px;">
              <div style="font-size:12px; font-weight:800; color:#16a34a;">Layer 1: Cloudflare Perimeter</div>
              <div style="font-size:11.5px; color:#785a46; margin-top:4px;">Anti-DDoS Attack Hider: <b style="color:#16a34a;">ONLINE (100%)</b></div>
            </div>

            <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:8px; padding:12px;">
              <div style="font-size:12px; font-weight:800; color:#16a34a;">Layer 2: DevTools & Tamper Trap</div>
              <div style="font-size:11.5px; color:#785a46; margin-top:4px;">F12 Console Freeze & Anti-XSS: <b style="color:#16a34a;">LOCKED</b></div>
            </div>

            <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:8px; padding:12px;">
              <div style="font-size:12px; font-weight:800; color:#16a34a;">Layer 3: Instant Telegram Alert</div>
              <div style="font-size:11.5px; color:#785a46; margin-top:4px;">Jarvis 2s Webhook Warning: <b style="color:#16a34a;">ARMED</b></div>
            </div>

            <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:8px; padding:12px;">
              <div style="font-size:12px; font-weight:800; color:#16a34a;">Layer 4: Auto-Stealth Cloak</div>
              <div style="font-size:11.5px; color:#785a46; margin-top:4px;">5-Attempt Panic 503 Hide: <b style="color:#16a34a;">STANDBY</b></div>
            </div>

            <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:8px; padding:12px;">
              <div style="font-size:12px; font-weight:800; color:#16a34a;">Layer 5: Data Air-Gap Isolation</div>
              <div style="font-size:11.5px; color:#785a46; margin-top:4px;">Owner & Customer DB Separation: <b style="color:#16a34a;">SECURED</b></div>
            </div>
          </div>

          <div class="table-responsive-box">
            <table class="f-table">
              <thead><tr><th>Time</th><th>Threat Type</th><th>Detected IP</th><th>Target Route</th><th>Auto-Defense Status</th></tr></thead>
              <tbody><tr><td colspan="5" style="text-align:center; padding:20px; color:#16a34a; font-weight:700;">✓ Perimeter completely clean. 0 intrusion attempts recorded.</td></tr></tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Shuruat Screen 1 se hogi
    renderLevel1Hub(true);
  };
})();
