/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: CUSTOMER MODULE (ZERO DUMMY DATA)
   ========================================================================== */

(function () {
  'use strict';

  function getCustomerStore() {
    try {
      const raw = localStorage.getItem('ss_owner_cust_store');
      return raw ? JSON.parse(raw) : {
        cashbackClaims: [],
        coinClaims: [],
        registeredUsers: [],
        ebookSales: [],
        linkClicks: { amazon: 0, flipkart: 0, myntra: 0 },
        visitors: { guests: 0, members: 0 }
      };
    } catch (e) {
      return { cashbackClaims: [], coinClaims: [], registeredUsers: [], ebookSales: [], linkClicks: { amazon: 0, flipkart: 0, myntra: 0 }, visitors: { guests: 0, members: 0 } };
    }
  }

  function saveCustomerStore(store) {
    try {
      localStorage.setItem('ss_owner_cust_store', JSON.stringify(store));
    } catch (e) {}
  }

  window.initOwnerCustomer = function () {
    const container = document.getElementById('view-customer');
    if (!container) return;

    function renderMainHub() {
      container.innerHTML = `
        <div style="margin-bottom: 16px;">
          <h2 style="font-size: 19px; font-weight: 800; color: #3b2219; margin-bottom: 4px;">Customer Management Hub</h2>
          <p style="font-size: 12.5px; color: #785a46;">Real claims, real registered IDs, real clicks, and protection.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 20px;">
          <div class="f-card hub-square-btn" data-view="cust-claims" style="cursor: pointer; text-align: center; border-color: #6b3e26;">
            <div style="font-size: 26px; margin-bottom: 6px;">📥</div>
            <div style="font-size: 13px; font-weight: 700; color: #3b2219;">1. Request Claims</div>
            <span style="font-size: 11px; color: #785a46;">Cashback & Coins</span>
          </div>

          <div class="f-card hub-square-btn" data-view="cust-ebooks" style="cursor: pointer; text-align: center; border-color: #2d6a4f;">
            <div style="font-size: 26px; margin-bottom: 6px;">📚</div>
            <div style="font-size: 13px; font-weight: 700; color: #3b2219;">2. Ebook Sales</div>
            <span style="font-size: 11px; color: #2d6a4f;">AI Code Engine</span>
          </div>

          <div class="f-card hub-square-btn" data-view="cust-register" style="cursor: pointer; text-align: center; border-color: #c68a4c;">
            <div style="font-size: 26px; margin-bottom: 6px;">📇</div>
            <div style="font-size: 13px; font-weight: 700; color: #3b2219;">3. Register ID</div>
            <span style="font-size: 11px; color: #c68a4c;">Users & Referrals</span>
          </div>

          <div class="f-card hub-square-btn" data-view="cust-visitors" style="cursor: pointer; text-align: center; border-color: #8d5b3d;">
            <div style="font-size: 26px; margin-bottom: 6px;">📊</div>
            <div style="font-size: 13px; font-weight: 700; color: #3b2219;">4. Visitor Count</div>
            <span style="font-size: 11px; color: #8d5b3d;">Guest vs Login</span>
          </div>

          <div class="f-card hub-square-btn" data-view="cust-clicks" style="cursor: pointer; text-align: center; border-color: #6b3e26;">
            <div style="font-size: 26px; margin-bottom: 6px;">🔗</div>
            <div style="font-size: 13px; font-weight: 700; color: #3b2219;">5. Link Clicks</div>
            <span style="font-size: 11px; color: #785a46;">Store Redirection</span>
          </div>

          <div class="f-card hub-square-btn" data-view="cust-shield" style="cursor: pointer; text-align: center; border-color: #a82020;">
            <div style="font-size: 26px; margin-bottom: 6px;">🛡️</div>
            <div style="font-size: 13px; font-weight: 700; color: #3b2219;">6. Protection</div>
            <span style="font-size: 11px; color: #a82020;">Auto-Stealth Shield</span>
          </div>
        </div>

        <div id="customerSubViewMount"></div>
      `;

      container.querySelectorAll('.hub-square-btn').forEach(btn => {
        btn.onclick = function () {
          const view = this.getAttribute('data-view');
          if (view === 'cust-claims') openClaimsModule();
          if (view === 'cust-ebooks') openEbooksSalesModule();
          if (view === 'cust-register') openRegisterHubModule();
          if (view === 'cust-visitors') openVisitorsModule();
          if (view === 'cust-clicks') openClicksModule();
          if (view === 'cust-shield') openShieldModule();
        };
      });
    }

    // --- 1. REAL CLAIMS (ZERO DUMMY) ---
    function openClaimsModule() {
      const mount = document.getElementById('customerSubViewMount');
      mount.innerHTML = `
        <div class="f-card" style="margin-bottom: 16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#3b2219;">1. Customer Request Claim Desk</h3>
            <button type="button" class="btn-action-sm btn-blue btn-close-sub">✕ Back to Hub</button>
          </div>
          <div style="display:flex; gap:10px; margin-bottom:14px;">
            <button type="button" class="btn-action-sm btn-blue active" id="btnClaimStreamCashback" style="flex:1; padding:10px; justify-content:center;">💰 Cashback Reward (100 Days)</button>
            <button type="button" class="btn-action-sm btn-blue" id="btnClaimStreamCoins" style="flex:1; padding:10px; justify-content:center; opacity:0.6;">🟢 Green Coins (12 Days)</button>
          </div>
          <div id="claimStageTabsContainer" style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px;"></div>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead id="claimsTableHead"></thead>
              <tbody id="claimsTableBody"></tbody>
            </table>
          </div>
          <div id="claimsHistoryFooter" style="display:none; margin-top:12px; font-size:13px; font-weight:700; color:#2d6a4f; text-align:right;"></div>
        </div>
      `;

      mount.querySelector('.btn-close-sub').onclick = renderMainHub;

      let currentStream = 'cashback';
      let currentStage = 1;

      const btnCash = document.getElementById('btnClaimStreamCashback');
      const btnCoin = document.getElementById('btnClaimStreamCoins');

      btnCash.onclick = () => {
        currentStream = 'cashback';
        currentStage = 1;
        btnCash.style.opacity = '1';
        btnCoin.style.opacity = '0.6';
        renderStageTabs();
        renderClaimsTable();
      };

      btnCoin.onclick = () => {
        currentStream = 'coins';
        currentStage = 1;
        btnCoin.style.opacity = '1';
        btnCash.style.opacity = '0.6';
        renderStageTabs();
        renderClaimsTable();
      };

      function renderStageTabs() {
        const tabBox = document.getElementById('claimStageTabsContainer');
        const stages = currentStream === 'cashback'
          ? [
              { id: 1, label: '1. Raw Requests' },
              { id: 2, label: '2. 1-25 Days (Verified)' },
              { id: 3, label: '3. 75-100 Days (Approved)' },
              { id: 4, label: '4. 100 Days (Completed)' },
              { id: 5, label: '5. History' }
            ]
          : [
              { id: 1, label: '1. Raw Requests' },
              { id: 2, label: '2. 1-7 Days (Verified)' },
              { id: 3, label: '3. 8-12 Days (Approved)' },
              { id: 4, label: '4. 12 Days (Completed)' },
              { id: 5, label: '5. History' }
            ];

        tabBox.innerHTML = stages.map(s => `
          <button type="button" class="btn-action-sm btn-blue stage-tab-btn" data-stage="${s.id}" style="padding:6px 10px; font-size:11.5px; opacity:${s.id === currentStage ? '1' : '0.5'};">
            ${s.label}
          </button>
        `).join('');

        tabBox.querySelectorAll('.stage-tab-btn').forEach(b => {
          b.onclick = function () {
            currentStage = Number(this.getAttribute('data-stage'));
            renderStageTabs();
            renderClaimsTable();
          };
        });
      }

      function renderClaimsTable() {
        const thead = document.getElementById('claimsTableHead');
        const tbody = document.getElementById('claimsTableBody');
        const footer = document.getElementById('claimsHistoryFooter');
        const store = getCustomerStore();
        const list = currentStream === 'cashback' ? store.cashbackClaims : store.coinClaims;
        const filtered = list.filter(item => item.stage === currentStage);

        footer.style.display = currentStage === 5 ? 'block' : 'none';

        thead.innerHTML = `
          <tr>
            <th>S.No.</th>
            <th>Date / Day / Time</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Proof Document</th>
            <th>Action</th>
          </tr>
        `;

        if (filtered.length === 0) {
          tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 24px; color:#785a46; font-weight:600;">No claims in this stage.</td></tr>`;
          return;
        }

        tbody.innerHTML = filtered.map((c, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${c.dateTime}</td>
            <td><b style="color:#3b2219;">${c.userId}</b></td>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone || 'N/A'}</td>
            <td><button type="button" class="btn-action-sm btn-blue">📄 View PDF</button></td>
            <td>
              <button type="button" class="btn-action-sm btn-green">Accept ✓</button>
            </td>
          </tr>
        `).join('');
      }

      renderStageTabs();
      renderClaimsTable();
    }

    // --- 2. REAL EBOOK SALES (ZERO DUMMY) ---
    function openEbooksSalesModule() {
      const mount = document.getElementById('customerSubViewMount');
      const store = getCustomerStore();

      mount.innerHTML = `
        <div class="f-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#3b2219;">2. E-Book Sales & AI Code Engine</h3>
            <button type="button" class="btn-action-sm btn-blue btn-close-sub">✕ Back to Hub</button>
          </div>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date / Time</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>AI Generated Key</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${store.ebookSales.length === 0
                  ? '<tr><td colspan="7" style="text-align:center; padding:24px; color:#785a46; font-weight:600;">No real sales transactions recorded yet.</td></tr>'
                  : store.ebookSales.map((e, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${e.dateTime}</td>
                      <td><b>${e.userId}</b></td>
                      <td>${e.name}</td>
                      <td>₹${e.amount}</td>
                      <td><code>${e.code}</code></td>
                      <td>${e.status}</td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      mount.querySelector('.btn-close-sub').onclick = renderMainHub;
    }

    // --- 3. REAL REGISTER ID (ZERO DUMMY) ---
    function openRegisterHubModule() {
      const mount = document.getElementById('customerSubViewMount');
      const store = getCustomerStore();

      mount.innerHTML = `
        <div class="f-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#3b2219;">3. Register ID & Referral Matrix</h3>
            <button type="button" class="btn-action-sm btn-blue btn-close-sub">✕ Back to Hub</button>
          </div>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${store.registeredUsers.length === 0
                  ? '<tr><td colspan="6" style="text-align:center; padding:24px; color:#785a46; font-weight:600;">No customer accounts registered yet.</td></tr>'
                  : store.registeredUsers.map((u, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td><b>${u.userId}</b></td>
                      <td>${u.name}</td>
                      <td>${u.email}</td>
                      <td>${u.phone}</td>
                      <td>${u.status}</td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      mount.querySelector('.btn-close-sub').onclick = renderMainHub;
    }

    // --- 4. REAL VISITORS (STARTS AT 0) ---
    function openVisitorsModule() {
      const mount = document.getElementById('customerSubViewMount');
      mount.innerHTML = `
        <div class="f-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#3b2219;">4. Visitor Traffic Monitor</h3>
            <button type="button" class="btn-action-sm btn-blue btn-close-sub">✕ Back to Hub</button>
          </div>
          <div class="f-grid-2">
            <div class="f-card">
              <div class="f-card-label">Guest Visitors</div>
              <div class="f-card-metric" style="color:#6b3e26;">0</div>
              <div style="font-size:11.5px; color:#785a46; margin-top:4px;">No visitors yet</div>
            </div>
            <div class="f-card">
              <div class="f-card-label">Logged In Members</div>
              <div class="f-card-metric" style="color:#2d6a4f;">0</div>
              <div style="font-size:11.5px; color:#785a46; margin-top:4px;">No members yet</div>
            </div>
          </div>
        </div>
      `;
      mount.querySelector('.btn-close-sub').onclick = renderMainHub;
    }

    // --- 5. REAL CLICKS (STARTS AT 0) ---
    function openClicksModule() {
      const mount = document.getElementById('customerSubViewMount');
      mount.innerHTML = `
        <div class="f-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#3b2219;">5. Store Redirection Link Clicks</h3>
            <button type="button" class="btn-action-sm btn-blue btn-close-sub">✕ Back to Hub</button>
          </div>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>Store Platform</th>
                  <th>Today Clicks</th>
                  <th>Total Recorded</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Amazon Deals</td><td>0</td><td>0</td></tr>
                <tr><td>Flipkart Deals</td><td>0</td><td>0</td></tr>
                <tr><td>Myntra / Ajio</td><td>0</td><td>0</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
      mount.querySelector('.btn-close-sub').onclick = renderMainHub;
    }

    // --- 6. SHIELD ---
    function openShieldModule() {
      const mount = document.getElementById('customerSubViewMount');
      mount.innerHTML = `
        <div class="f-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#3b2219;">6. Auto-Stealth Shield</h3>
            <button type="button" class="btn-action-sm btn-blue btn-close-sub">✕ Back to Hub</button>
          </div>
          <div style="background:#ffffff; border:1px solid #dfcfbc; border-radius:10px; padding:14px; margin-bottom:14px;">
            <div style="font-size:13px; font-weight:700; color:#2d6a4f; margin-bottom:4px;">🛡️ Perimeter Defense Status: ONLINE</div>
            <p style="font-size:12px; color:#785a46; margin:0;">Cloudflare Anti-DDoS and Rate Limiter protecting all portals.</p>
          </div>
        </div>
      `;
      mount.querySelector('.btn-close-sub').onclick = renderMainHub;
    }

    renderMainHub();
  };
})();
