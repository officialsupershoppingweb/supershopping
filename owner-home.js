/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: HOME MODULE (DAILY MISSION CONTROL)
   ========================================================================== */

(function () {
  'use strict';

  // Seed sample data for first launch if empty
  function getHomeData() {
    return {
      urgentTasks: [
        { id: 1, type: 'claim', text: '6 New Customer Bills awaiting verification', linkTarget: 'view-customer' },
        { id: 2, type: 'payout', text: '4 Users reached Day 100/12 payout milestone', linkTarget: 'view-customer' },
        { id: 3, type: 'staff', text: '2 Staff joining requests waiting for review', linkTarget: 'view-staff' }
      ],
      metrics: {
        pendingClaims: 14,
        payoutsDueToday: '₹3,450',
        activeStaffCount: '3 / 4',
        liveDealsCount: 128
      },
      staffPulse: [
        { name: 'Rahul S.', dept: 'Fashion', status: 'active', timeDone: '2h 15m / 3h', badgeClass: 'badge-active' },
        { name: 'Vikas M.', dept: 'Electronics', status: 'active', timeDone: '1h 45m / 3h', badgeClass: 'badge-active' },
        { name: 'Pooja K.', dept: 'Beauty & Care', status: 'away', timeDone: 'Away (12m)', badgeClass: 'badge-pending' }
      ]
    };
  }

  window.initOwnerHome = function () {
    const container = document.getElementById('view-home');
    if (!container) return;

    const data = getHomeData();

    container.innerHTML = `
      <div style="margin-bottom: 16px;">
        <h2 style="font-size: 19px; font-weight: 800; color: #f8fafc; margin-bottom: 4px;">Mission Control</h2>
        <p style="font-size: 12.5px; color: #94a3b8;">Real-time overview of claims, catalog deals, and staff duty.</p>
      </div>

      <!-- 1. TOP METRIC PULSE CARDS -->
      <div class="f-grid-2">
        <div class="f-card">
          <div class="f-card-label">Pending Claims</div>
          <div class="f-card-metric" style="color: #38bdf8;">${data.metrics.pendingClaims}</div>
          <span style="font-size: 11px; color: #94a3b8;">Needs verification</span>
        </div>
        <div class="f-card">
          <div class="f-card-label">Payouts Due Today</div>
          <div class="f-card-metric" style="color: #4ade80;">${data.metrics.payoutsDueToday}</div>
          <span style="font-size: 11px; color: #94a3b8;">Day 100 / 12 milestone</span>
        </div>
        <div class="f-card">
          <div class="f-card-label">Active Staff on Duty</div>
          <div class="f-card-metric" style="color: #fbbf24;">${data.metrics.activeStaffCount}</div>
          <span style="font-size: 11px; color: #94a3b8;">3-Hour tracker running</span>
        </div>
        <div class="f-card">
          <div class="f-card-label">Live Catalog Deals</div>
          <div class="f-card-metric" style="color: #c084fc;">${data.metrics.liveDealsCount}</div>
          <span style="font-size: 11px; color: #94a3b8;">Customer portal live</span>
        </div>
      </div>

      <!-- 2. URGENT ACTIONS TO-DO -->
      <div class="f-card" style="margin-bottom: 16px; border-left: 4px solid #f59e0b;">
        <h4 style="font-size: 14px; font-weight: 700; color: #f8fafc; margin-bottom: 10px;">⚠️ Actions Required Right Now</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${data.urgentTasks.map(t => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: #0b0f19; padding: 10px 12px; border-radius: 8px; border: 1px solid #1e293b;">
              <span style="font-size: 12.5px; color: #e2e8f0;">${t.text}</span>
              <button type="button" class="btn-action-sm btn-blue btn-jump-view" data-jump="${t.linkTarget}">Resolve ›</button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 3. LIVE STAFF PULSE MONITOR -->
      <div class="f-card" style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h4 style="font-size: 14px; font-weight: 700; color: #f8fafc;">Staff Duty Live Pulse (3-Hour Shift)</h4>
          <span style="font-size: 11px; color: #94a3b8;">Auto-syncs every 60s</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${data.staffPulse.map(s => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: #0b0f19; padding: 10px 14px; border-radius: 8px; border: 1px solid #1e293b;">
              <div>
                <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">${s.name} <span style="font-size: 11px; font-weight: 500; color: #94a3b8;">(${s.dept})</span></div>
                <div style="font-size: 11.5px; color: #64748b;">Shift Progress: ${s.timeDone}</div>
              </div>
              <span class="status-badge ${s.badgeClass}">${s.status.toUpperCase()}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 4. QUICK SHORTCUT BUTTONS -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <button type="button" class="btn-action-sm btn-blue btn-jump-view" data-jump="view-stock" style="padding: 12px; font-size: 13px; justify-content: center;">
          ⚡ Add New Deal Link
        </button>
        <button type="button" class="btn-action-sm btn-green btn-jump-view" data-jump="view-customer" style="padding: 12px; font-size: 13px; justify-content: center;">
          ✓ Verify Customer Bills
        </button>
      </div>
    `;

    // Wire up jump buttons to bottom nav
    container.querySelectorAll('.btn-jump-view').forEach(btn => {
      btn.addEventListener('click', function () {
        const target = this.getAttribute('data-jump');
        const navBtn = document.querySelector(`.f-nav-item[data-target="${target}"]`);
        if (navBtn) navBtn.click();
      });
    });
  };
})();
