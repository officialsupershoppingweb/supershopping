/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: CUSTOMER MODULE (6-PILLAR ENGINE)
   ========================================================================== */

(function () {
  'use strict';

  // State Store for Claims & Customer Operations
  function getCustomerStore() {
    try {
      const def = {
        cashbackClaims: [
          { sno: 1, dateTime: '2026-10-08 11:30 AM', userId: 'USR-8901', name: 'Aman Verma', email: 'aman@example.com', phone: '9876543210', stage: 1, status: 'Under Process', amount: 150, upi: 'aman@upi' },
          { sno: 2, dateTime: '2026-09-15 02:15 PM', userId: 'USR-7622', name: 'Pooja Singh', email: 'pooja@example.com', phone: '9812345678', stage: 2, status: 'Verified', amount: 280, upi: 'pooja@oksbi' },
          { sno: 3, dateTime: '2026-07-20 10:00 AM', userId: 'USR-5110', name: 'Rohan Sharma', email: 'rohan@example.com', phone: '9900112233', stage: 3, status: 'Approved', amount: 450, upi: 'rohan@paytm' },
          { sno: 4, dateTime: '2026-06-25 04:45 PM', userId: 'USR-4019', name: 'Sunil Kumar', email: 'sunil@example.com', phone: '9898989898', stage: 4, status: 'Completed', amount: 600, upi: 'sunil@apl' }
        ],
        coinClaims: [
          { sno: 1, dateTime: '2026-10-08 09:15 AM', userId: 'USR-9021', name: 'Vikram Joshi', email: 'vikram@example.com', phone: '9765432100', stage: 1, status: 'Under Process', coins: 25, upi: '' },
          { sno: 2, dateTime: '2026-10-02 01:20 PM', userId: 'USR-8144', name: 'Neha Gupta', email: 'neha@example.com', phone: '9845123456', stage: 2, status: 'Verified', coins: 40, upi: '' },
          { sno: 3, dateTime: '2026-09-28 06:10 PM', userId: 'USR-7731', name: 'Arjun Das', email: 'arjun@example.com', phone: '9123456780', stage: 3, status: 'Approved', coins: 50, upi: 'arjun@upi' },
          { sno: 4, dateTime: '2026-09-25 11:00 AM', userId: 'USR-6520', name: 'Kavita Roy', email: 'kavita@example.com', phone: '9345678901', stage: 4, status: 'Completed', coins: 30, upi: 'kavita@icici' }
        ],
        registeredUsers: [
          { sno: 1, dateTime: '2026-10-05 10:20 AM', userId: 'USR-8901', name: 'Aman Verma', email: 'aman@example.com', phone: '9876543210', address: 'Delhi, India', status: 'active', isReferral: false },
          { sno: 2, dateTime: '2026-10-06 03:40 PM', userId: 'USR-9021', name: 'Vikram Joshi', email: 'vikram@example.com', phone: '9765432100', address: 'Lucknow, UP', status: 'active', isReferral: true, referredBy: 'USR-8901' },
          { sno: 3, dateTime: '2026-09-10 12:00 PM', userId: 'USR-1102', name: 'Spam Bot User', email: 'bot@spam.com', phone: '9000000000', address: 'Unknown', status: 'blocked', feedback: 'Multiple fake slip uploads', isReferral: false }
        ],
        ebookSales: [
          { sno: 1, dateTime: '2026-10-08 04:30 PM', userId: 'USR-8901', name: 'Aman Verma', email: 'aman@example.com', phone: '9876543210', amount: 49, code: 'SS-EBK-8812', status: 'Approved' },
          { sno: 2, dateTime: '2026-10-08 05:15 PM', userId: 'USR-9021', name: 'Vikram Joshi', email: 'vikram@example.com', phone: '9765432100', amount: 99, code: 'SS-EBK-9904', status: 'Approved' }
        ]
      };
      const raw = localStorage.getItem('ss_owner_cust_store');
      return raw ? JSON.parse(raw) : def;
    } catch (e) {
      return {};
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

    // RENDER MAIN 6-BOX GRID
    function renderMainHub() {
      container.innerHTML = `
        <div style="margin-bottom: 16px;">
          <h2 style="font-size: 19px; font-weight: 800; color: #f8fafc; margin-bottom: 4px;">Customer Management Hub</h2>
          <p style="font-size: 12.5px; color: #94a3b8;">Full command over claims, referrals, sales, visitors, and defense.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 20px;">
          <div class="f-card hub-square-btn" data-view="cust-claims" style="cursor: pointer; text-align: center; border-color: #0284c7;">
            <div style="font-size: 26px; margin-bottom: 6px;">📥</div>
            <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">1. Request Claims</div>
            <span style="font-size: 11px; color: #38bdf8;">Cashback & Coins</span>
          </div>

          <div class="f-card hub-square-btn" data-view="cust-ebooks" style="cursor: pointer; text-align: center; border-color: #10b981;">
            <div style="font-size: 26px; margin-bottom: 6px;">📚</div>
            <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">2. Ebook Sales</div>
            <span style="font-size: 11px; color: #34d399;">AI Code Engine</span>
          </div>

          <div class="f-card hub-square-btn" data-view="cust-register" style="cursor: pointer; text-align: center; border-color: #8b5cf6;">
            <div style="font-size: 26px; margin-bottom: 6px;">📇</div>
            <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">3. Register ID</div>
            <span style="font-size: 11px; color: #a78bfa;">Users & Referrals</span>
          </div>

          <div class="f-card hub-square-btn" data-view="cust-visitors" style="cursor: pointer; text-align: center; border-color: #f59e0b;">
            <div style="font-size: 26px; margin-bottom: 6px;">📊</div>
            <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">4. Visitor Count</div>
            <span style="font-size: 11px; color: #fbbf24;">Guest vs Login</span>
          </div>

          <div class="f-card hub-square-btn" data-view="cust-clicks" style="cursor: pointer; text-align: center; border-color: #ec4899;">
            <div style="font-size: 26px; margin-bottom: 6px;">🔗</div>
            <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">5. Link Clicks</div>
            <span style="font-size: 11px; color: #f472b6;">Store Redirection</span>
          </div>

          <div class="f-card hub-square-btn" data-view="cust-shield" style="cursor: pointer; text-align: center; border-color: #ef4444;">
            <div style="font-size: 26px; margin-bottom: 6px;">🛡️</div>
            <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">6. Protection</div>
            <span style="font-size: 11px; color: #f87171;">Auto-Stealth Shield</span>
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

    // --- 1. CLAIMS MODULE ---
    function openClaimsModule() {
      const mount = document.getElementById('customerSubViewMount');
      mount.innerHTML = `
        <div class="f-card" style="margin-bottom: 16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#f8fafc;">1. Customer Request Claim Desk</h3>
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
          <div id="claimsHistoryFooter" style="display:none; margin-top:12px; font-size:13px; font-weight:700; color:#4ade80; text-align:right;"></div>
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

        if (currentStage === 1) {
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
          tbody.innerHTML = filtered.map((c, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${c.dateTime}</td>
              <td><b style="color:#38bdf8;">${c.userId}</b></td>
              <td>${c.name}</td>
              <td>${c.email}</td>
              <td>${c.phone || 'N/A'}</td>
              <td><button type="button" class="btn-action-sm btn-blue" onclick="alert('Viewing Customer Bill Proof PDF...')">📄 View PDF</button></td>
              <td>
                <button type="button" class="btn-action-sm btn-green btn-accept-c1" data-sno="${c.sno}">Accept ✓</button>
                <button type="button" class="btn-action-sm btn-red btn-reject-c1" data-sno="${c.sno}">Reject ✕</button>
              </td>
            </tr>
          `).join('');
        } else if (currentStage === 2) {
          thead.innerHTML = `
            <tr>
              <th>S.No.</th>
              <th>Date / Time</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Verification</th>
              <th>Account Control</th>
            </tr>
          `;
          tbody.innerHTML = filtered.map((c, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${c.dateTime}</td>
              <td><b style="color:#38bdf8;">${c.userId}</b></td>
              <td>${c.name}</td>
              <td>${c.email}</td>
              <td>${c.phone || 'N/A'}</td>
              <td><button type="button" class="btn-action-sm btn-green btn-step-verify" data-sno="${c.sno}">Verify & Move Next ›</button></td>
              <td><button type="button" class="btn-action-sm btn-red btn-block-user" data-uid="${c.userId}">Block / Suspend</button></td>
            </tr>
          `).join('');
        } else if (currentStage === 3) {
          thead.innerHTML = `
            <tr>
              <th>S.No.</th>
              <th>Date / Time</th>
              <th>User ID</th>
              <th>Name</th>
              <th>${currentStream === 'cashback' ? 'Income Generated (₹)' : 'Coins Generated'}</th>
              <th>UPI ID</th>
              <th>Approval</th>
            </tr>
          `;
          tbody.innerHTML = filtered.map((c, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${c.dateTime}</td>
              <td><b style="color:#38bdf8;">${c.userId}</b></td>
              <td>${c.name}</td>
              <td>${currentStream === 'cashback' ? `₹${c.amount}` : `${c.coins} Coins`}</td>
              <td>${c.upi || 'N/A'}</td>
              <td><button type="button" class="btn-action-sm btn-green btn-step-approve" data-sno="${c.sno}">Approve For Day 100/12</button></td>
            </tr>
          `).join('');
        } else if (currentStage === 4) {
          thead.innerHTML = `
            <tr>
              <th>S.No.</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Disbursement Amount</th>
              <th>UPI ID</th>
              <th>Settlement</th>
            </tr>
          `;
          tbody.innerHTML = filtered.map((c, i) => `
            <tr>
              <td>${i + 1}</td>
              <td><b style="color:#38bdf8;">${c.userId}</b></td>
              <td>${c.name}</td>
              <td>${c.email}</td>
              <td><b style="color:#4ade80;">${currentStream === 'cashback' ? `₹${c.amount}` : `${c.coins} Coins`}</b></td>
              <td>${c.upi || 'N/A'}</td>
              <td><button type="button" class="btn-action-sm btn-green btn-step-complete" data-sno="${c.sno}">Mark Transferred ✓</button></td>
            </tr>
          `).join('');
        } else if (currentStage === 5) {
          thead.innerHTML = `
            <tr>
              <th>S.No.</th>
              <th>Transfer Date / Time</th>
              <th>User ID</th>
              <th>Email</th>
              <th>Transferred Amount</th>
              <th>UPI ID</th>
            </tr>
          `;
          tbody.innerHTML = filtered.map((c, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${c.dateTime}</td>
              <td><b style="color:#38bdf8;">${c.userId}</b></td>
              <td>${c.email}</td>
              <td><b style="color:#4ade80;">${currentStream === 'cashback' ? `₹${c.amount}` : `${c.coins} Coins`}</b></td>
              <td>${c.upi || 'N/A'}</td>
            </tr>
          `).join('');

          const total = filtered.reduce((acc, curr) => acc + (currentStream === 'cashback' ? curr.amount : curr.coins), 0);
          footer.textContent = `Total Settled: ${currentStream === 'cashback' ? '₹' + total : total + ' Coins'}`;
        }

        // Action Handlers
        tbody.querySelectorAll('.btn-accept-c1').forEach(b => {
          b.onclick = function () {
            const sno = Number(this.getAttribute('data-sno'));
            const target = list.find(x => x.sno === sno);
            if (target) {
              target.stage = 2;
              saveCustomerStore(store);
              alert('Claim Accepted: Shifted to Stage 2 verification!');
              renderClaimsTable();
            }
          };
        });

        tbody.querySelectorAll('.btn-step-verify').forEach(b => {
          b.onclick = function () {
            const sno = Number(this.getAttribute('data-sno'));
            const target = list.find(x => x.sno === sno);
            if (target) {
              target.stage = 3;
              saveCustomerStore(store);
              alert('Verified: Shifted to Stage 3 processing!');
              renderClaimsTable();
            }
          };
        });

        tbody.querySelectorAll('.btn-step-approve').forEach(b => {
          b.onclick = function () {
            const sno = Number(this.getAttribute('data-sno'));
            const target = list.find(x => x.sno === sno);
            if (target) {
              target.stage = 4;
              saveCustomerStore(store);
              alert('Approved: Ready for final disbursement!');
              renderClaimsTable();
            }
          };
        });

        tbody.querySelectorAll('.btn-step-complete').forEach(b => {
          b.onclick = function () {
            const sno = Number(this.getAttribute('data-sno'));
            const target = list.find(x => x.sno === sno);
            if (target) {
              target.stage = 5;
              saveCustomerStore(store);
              alert('Payout completed and recorded in history ledger!');
              renderClaimsTable();
            }
          };
        });

        tbody.querySelectorAll('.btn-block-user').forEach(b => {
          b.onclick = function () {
            const uid = this.getAttribute('data-uid');
            const conf = confirm(`Security Confirmation:\nAre you sure you want to block user ${uid}?`);
            if (conf) {
              const reason = prompt('Mandatory: Enter blocking reason / feedback:');
              if (reason && reason.trim()) {
                const u = store.registeredUsers.find(x => x.userId === uid);
                if (u) {
                  u.status = 'blocked';
                  u.feedback = reason;
                  saveCustomerStore(store);
                  alert(`User ${uid} suspended permanently!`);
                }
              }
            }
          };
        });
      }

      renderStageTabs();
      renderClaimsTable();
    }

    // --- 2. EBOOK SALES MODULE ---
    function openEbooksSalesModule() {
      const mount = document.getElementById('customerSubViewMount');
      const store = getCustomerStore();

      mount.innerHTML = `
        <div class="f-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#f8fafc;">2. E-Book Sales & AI Code Engine</h3>
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
                  <th>Override</th>
                </tr>
              </thead>
              <tbody>
                ${store.ebookSales.map((e, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td>${e.dateTime}</td>
                    <td><b style="color:#38bdf8;">${e.userId}</b></td>
                    <td>${e.name}</td>
                    <td>₹${e.amount}</td>
                    <td><code style="background:#0b0f19; padding:3px 6px; border-radius:4px; color:#4ade80;">${e.code}</code></td>
                    <td><span class="status-badge badge-active">${e.status}</span></td>
                    <td><button type="button" class="btn-action-sm btn-blue" onclick="alert('Dispatching unlock code to user email...')">Resend Code ✉</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      mount.querySelector('.btn-close-sub').onclick = renderMainHub;
    }

    // --- 3. REGISTER ID & REFERRAL HUB ---
    function openRegisterHubModule() {
      const mount = document.getElementById('customerSubViewMount');
      const store = getCustomerStore();

      mount.innerHTML = `
        <div class="f-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#f8fafc;">3. Register ID & Referral Matrix</h3>
            <button type="button" class="btn-action-sm btn-blue btn-close-sub">✕ Back to Hub</button>
          </div>
          <div style="display:flex; gap:8px; margin-bottom:14px;">
            <button type="button" class="btn-action-sm btn-blue active" id="btnRegUsers">Registered Users</button>
            <button type="button" class="btn-action-sm btn-blue" id="btnRegReferral" style="opacity:0.6;">Referral Matches</button>
            <button type="button" class="btn-action-sm btn-blue" id="btnRegBlocked" style="opacity:0.6;">Blocked Registry</button>
          </div>
          <div class="table-responsive-box">
            <table class="f-table" id="regMasterTable"></table>
          </div>
        </div>
      `;

      mount.querySelector('.btn-close-sub').onclick = renderMainHub;

      const tbl = document.getElementById('regMasterTable');
      function showUsers() {
        tbl.innerHTML = `
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Join Date</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${store.registeredUsers.map((u, i) => `
              <tr style="${u.isReferral ? 'color:#38bdf8;' : ''}">
                <td>${i + 1}</td>
                <td>${u.dateTime}</td>
                <td><b>${u.userId}</b></td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.address}</td>
                <td>${u.isReferral ? '⭐ Referral Join' : 'Direct'}</td>
                <td><span class="status-badge ${u.status === 'active' ? 'badge-active' : 'badge-blocked'}">${u.status.toUpperCase()}</span></td>
              </tr>
            `).join('')}
          </tbody>
        `;
      }

      function showReferrals() {
        tbl.innerHTML = `
          <thead>
            <tr>
              <th colspan="3" style="background:#0c4a6e; color:#38bdf8; text-align:center;">New User Joined (Earns 4 Coins)</th>
              <th style="background:#0f172a; text-align:center;">🔗</th>
              <th colspan="3" style="background:#831843; color:#f472b6; text-align:center;">Referrer Friend (Earns 7 Coins)</th>
            </tr>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Referrer ID</th>
              <th>Coins Credited</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="color:#38bdf8;"><b>USR-9021</b></td>
              <td style="color:#38bdf8;">Vikram Joshi</td>
              <td style="color:#38bdf8;">vikram@example.com</td>
              <td style="text-align:center; font-weight:700;">➔</td>
              <td style="color:#f472b6;"><b>USR-8901</b></td>
              <td style="color:#f472b6;">+7 Coins Released</td>
              <td><span class="status-badge badge-active">Auto Verified</span></td>
            </tr>
          </tbody>
        `;
      }

      function showBlocked() {
        const blocked = store.registeredUsers.filter(x => x.status === 'blocked');
        tbl.innerHTML = `
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Reason / Feedback</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${blocked.map(b => `
              <tr>
                <td><b style="color:#f87171;">${b.userId}</b></td>
                <td>${b.name}</td>
                <td>${b.email}</td>
                <td>${b.feedback || 'System Ban'}</td>
                <td><span class="status-badge badge-blocked">BLOCKED</span></td>
                <td>
                  <button type="button" class="btn-action-sm btn-green" onclick="alert('Restoring account access...')">Unblock ✓</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        `;
      }

      document.getElementById('btnRegUsers').onclick = () => { showUsers(); };
      document.getElementById('btnRegReferral').onclick = () => { showReferrals(); };
      document.getElementById('btnRegBlocked').onclick = () => { showBlocked(); };

      showUsers();
    }

    // --- 4. VISITOR COUNT MODULE ---
    function openVisitorsModule() {
      const mount = document.getElementById('customerSubViewMount');
      mount.innerHTML = `
        <div class="f-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#f8fafc;">4. Visitor Traffic Monitor</h3>
            <button type="button" class="btn-action-sm btn-blue btn-close-sub">✕ Back to Hub</button>
          </div>
          <div class="f-grid-2">
            <div class="f-card" style="border-left:4px solid #38bdf8;">
              <div class="f-card-label">Guest Visitors (Unregistered)</div>
              <div class="f-card-metric" style="color:#38bdf8;">1,420</div>
              <div style="font-size:11.5px; color:#94a3b8; margin-top:4px;">Today: 312 | Month: 8,450</div>
            </div>
            <div class="f-card" style="border-left:4px solid #4ade80;">
              <div class="f-card-label">Logged In Members</div>
              <div class="f-card-metric" style="color:#4ade80;">384</div>
              <div style="font-size:11.5px; color:#94a3b8; margin-top:4px;">Today: 82 | Month: 2,190</div>
            </div>
          </div>
        </div>
      `;
      mount.querySelector('.btn-close-sub').onclick = renderMainHub;
    }

    // --- 5. LINK CLICKS MODULE ---
    function openClicksModule() {
      const mount = document.getElementById('customerSubViewMount');
      mount.innerHTML = `
        <div class="f-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#f8fafc;">5. Store Redirection Link Clicks</h3>
            <button type="button" class="btn-action-sm btn-blue btn-close-sub">✕ Back to Hub</button>
          </div>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>Store Platform</th>
                  <th>Today Clicks</th>
                  <th>Yesterday</th>
                  <th>This Month</th>
                  <th>Top Category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Amazon Deals</b></td>
                  <td>284</td>
                  <td>210</td>
                  <td>4,120</td>
                  <td>Electronics & Gadgets</td>
                </tr>
                <tr>
                  <td><b>Flipkart Deals</b></td>
                  <td>192</td>
                  <td>175</td>
                  <td>3,040</td>
                  <td>Fashion & Footwear</td>
                </tr>
                <tr>
                  <td><b>Myntra / Ajio</b></td>
                  <td>98</td>
                  <td>84</td>
                  <td>1,420</td>
                  <td>Women Ethnic Wear</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
      mount.querySelector('.btn-close-sub').onclick = renderMainHub;
    }

    // --- 6. SHIELD & DEFENSE MODULE ---
    function openShieldModule() {
      const mount = document.getElementById('customerSubViewMount');
      mount.innerHTML = `
        <div class="f-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:15px; font-weight:800; color:#f8fafc;">6. Auto-Stealth Shield & Anti-Hack</h3>
            <button type="button" class="btn-action-sm btn-blue btn-close-sub">✕ Back to Hub</button>
          </div>
          <div style="background:#1e1b4b; border:1.5px solid #6366f1; border-radius:10px; padding:14px; margin-bottom:14px;">
            <div style="font-size:13px; font-weight:700; color:#a5b4fc; margin-bottom:4px;">🛡️ 5-Layer Perimeter Defense Status: ACTIVE</div>
            <p style="font-size:12px; color:#cbd5e1; margin:0;">Cloudflare Anti-DDoS, DevTools Anti-Inspect, and Rate Limiter are protecting Customer and Founder consoles.</p>
          </div>
          <div style="display:flex; gap:10px;">
            <button type="button" class="btn-action-sm btn-red" style="flex:1; padding:12px; justify-content:center; font-size:13px;" onclick="alert('EMERGENCY: Auto-Stealth Cloak Activated! Customer Portal set to Maintenance Mode.')">
              🔴 Engage Stealth Cloak (Panic Hide)
            </button>
            <button type="button" class="btn-action-sm btn-green" style="flex:1; padding:12px; justify-content:center; font-size:13px;" onclick="alert('Security Status Normal: All 5 layers online.')">
              ✓ Run Security Diagnostics
            </button>
          </div>
        </div>
      `;
      mount.querySelector('.btn-close-sub').onclick = renderMainHub;
    }

    // Render Hub Initially
    renderMainHub();
  };
})();
