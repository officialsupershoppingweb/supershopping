/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: HOME MODULE (REAL ZERO-DATA ENGINE)
   ========================================================================== */

(function () {
  'use strict';

  function getRealStats() {
    let pendingClaims = 0;
    let liveDeals = 0;
    let staffCount = 0;

    try {
      const cust = JSON.parse(localStorage.getItem('ss_owner_cust_store') || '{}');
      if (cust.cashbackClaims) pendingClaims += cust.cashbackClaims.filter(c => c.stage === 1).length;
      if (cust.coinClaims) pendingClaims += cust.coinClaims.filter(c => c.stage === 1).length;

      const prods = JSON.parse(localStorage.getItem('ss_owner_products') || '[]');
      liveDeals = prods.filter(p => p.status === 'active').length;

      const staff = JSON.parse(localStorage.getItem('ss_owner_staff_store') || '{}');
      if (staff.activeRoster) staffCount = staff.activeRoster.filter(s => s.status === 'active').length;
    } catch (e) {}

    return { pendingClaims, liveDeals, staffCount };
  }

  window.initOwnerHome = function () {
    const container = document.getElementById('view-home');
    if (!container) return;

    const stats = getRealStats();

    container.innerHTML = `
      <div style="margin-bottom: 16px;">
        <h2 style="font-size: 19px; font-weight: 800; color: #3b2219; margin-bottom: 4px;">Mission Control</h2>
        <p style="font-size: 12.5px; color: #785a46;">Real-time overview of claims, catalog deals, and staff duty.</p>
      </div>

      <!-- TOP METRIC CARDS (REAL COUNTERS) -->
      <div class="f-grid-2">
        <div class="f-card">
          <div class="f-card-label">Pending Claims</div>
          <div class="f-card-metric" style="color: #6b3e26;">${stats.pendingClaims}</div>
          <span style="font-size: 11px; color: #785a46;">Awaiting review</span>
        </div>
        <div class="f-card">
          <div class="f-card-label">Payouts Due Today</div>
          <div class="f-card-metric" style="color: #2d6a4f;">₹0</div>
          <span style="font-size: 11px; color: #785a46;">Day 100 / 12 milestone</span>
        </div>
        <div class="f-card">
          <div class="f-card-label">Active Staff on Duty</div>
          <div class="f-card-metric" style="color: #c68a4c;">${stats.staffCount}</div>
          <span style="font-size: 11px; color: #785a46;">Active members</span>
        </div>
        <div class="f-card">
          <div class="f-card-label">Live Catalog Deals</div>
          <div class="f-card-metric" style="color: #3b2219;">${stats.liveDeals}</div>
          <span style="font-size: 11px; color: #785a46;">Live on portal</span>
        </div>
      </div>

      <!-- ZERO URGENT TASKS BOX -->
      <div class="f-card" style="margin-bottom: 16px; border-left: 4px solid var(--choc-accent);">
        <h4 style="font-size: 14px; font-weight: 700; color: #3b2219; margin-bottom: 8px;">Actions Required</h4>
        <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #dfcfbc; text-align: center; color: #785a46; font-size: 13px;">
          ✓ All clear. No urgent actions pending right now.
        </div>
      </div>

      <!-- QUICK SHORTCUT BUTTONS -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <button type="button" class="btn-action-sm btn-blue btn-jump-view" data-jump="view-stock" style="padding: 12px; font-size: 13px; justify-content: center;">
          ⚡ Add New Deal Link
        </button>
        <button type="button" class="btn-action-sm btn-green btn-jump-view" data-jump="view-customer" style="padding: 12px; font-size: 13px; justify-content: center;">
          ✓ Verify Customer Bills
        </button>
      </div>
    `;

    container.querySelectorAll('.btn-jump-view').forEach(btn => {
      btn.addEventListener('click', function () {
        const target = this.getAttribute('data-jump');
        const navBtn = document.querySelector(`.f-nav-item[data-target="${target}"]`);
        if (navBtn) navBtn.click();
      });
    });
  };
})();
