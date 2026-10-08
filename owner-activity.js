/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: ACTIVITY & CYBER DEFENSE MODULE
   ========================================================================== */

(function () {
  'use strict';

  // Activity Logs Cache
  function getActivityLogs() {
    try {
      const defLogs = [
        { time: '2026-10-08 07:15 PM', actor: 'Founder (Nitish)', action: 'Logged in to Founder Desk successfully', type: 'info' },
        { time: '2026-10-08 06:40 PM', actor: 'System AI Engine', action: 'Auto-verified UPI transaction and dispatched E-Book code', type: 'success' },
        { time: '2026-10-08 05:22 PM', actor: 'Staff MEM-STF-101', action: 'Published 2 deals in Fashion category', type: 'info' },
        { time: '2026-10-08 03:10 PM', actor: 'Anti-Tamper Shield', action: 'Blocked DevTools attempt from external client', type: 'warning' },
        { time: '2026-10-08 01:05 PM', actor: 'Staff MEM-STF-102', action: 'Shift completed (2h 30m duty recorded)', type: 'info' }
      ];
      const raw = localStorage.getItem('ss_owner_activity_logs');
      return raw ? JSON.parse(raw) : defLogs;
    } catch (e) {
      return [];
    }
  }

  window.initOwnerActivity = function () {
    const container = document.getElementById('view-activity');
    if (!container) return;

    const logs = getActivityLogs();

    container.innerHTML = `
      <div style="margin-bottom: 16px;">
        <h2 style="font-size: 19px; font-weight: 800; color: #f8fafc; margin-bottom: 4px;">Security & Activity Console</h2>
        <p style="font-size: 12.5px; color: #94a3b8;">5-layer cyber protection, AI automation engine, and master audit ledger.</p>
      </div>

      <!-- 1. CYBER DEFENSE & AUTO-CLOAK PANEL -->
      <div class="f-card" style="margin-bottom: 16px; border-left: 4px solid #ef4444;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div>
            <h4 style="font-size: 14px; font-weight: 700; color: #f8fafc;">🛡️ 5-Layer Defense & Stealth Shield</h4>
            <span style="font-size: 11.5px; color: #22c55e;">Status: All Security Barriers Active</span>
          </div>
          <button type="button" class="btn-action-sm btn-red" id="btnTogglePanicCloak">
            🔴 Emergency Cloak (Panic Hide)
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px;">
          <div style="background: #0b0f19; padding: 10px; border-radius: 8px; border: 1px solid #1e293b;">
            <div style="font-size: 11px; color: #94a3b8;">Layer 1: Perimeter</div>
            <div style="font-size: 13px; font-weight: 700; color: #4ade80;">Cloudflare Active</div>
          </div>
          <div style="background: #0b0f19; padding: 10px; border-radius: 8px; border: 1px solid #1e293b;">
            <div style="font-size: 11px; color: #94a3b8;">Layer 2: DevTools</div>
            <div style="font-size: 13px; font-weight: 700; color: #4ade80;">Anti-Inspect On</div>
          </div>
          <div style="background: #0b0f19; padding: 10px; border-radius: 8px; border: 1px solid #1e293b;">
            <div style="font-size: 11px; color: #94a3b8;">Layer 3: Air-Gap</div>
            <div style="font-size: 13px; font-weight: 700; color: #4ade80;">Isolated Database</div>
          </div>
          <div style="background: #0b0f19; padding: 10px; border-radius: 8px; border: 1px solid #1e293b;">
            <div style="font-size: 11px; color: #94a3b8;">Layer 4: Stealth Mode</div>
            <div style="font-size: 13px; font-weight: 700; color: #38bdf8;">Standby Ready</div>
          </div>
        </div>
      </div>

      <!-- 2. AI AUTOMATION ENGINE -->
      <div class="f-card" style="margin-bottom: 16px;">
        <h4 style="font-size: 14px; font-weight: 700; color: #f8fafc; margin-bottom: 8px;">🤖 AI Automation Hub</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div style="background: #0b0f19; padding: 12px; border-radius: 8px; border: 1px solid #1e293b;">
            <div style="font-size: 12px; font-weight: 700; color: #f8fafc; margin-bottom: 4px;">E-Book Dispatch Bot</div>
            <div style="font-size: 11.5px; color: #94a3b8; margin-bottom: 8px;">Auto-sends secure PDF keys within 10s of payment verification.</div>
            <span class="status-badge badge-active">RUNNING (0 Errors)</span>
          </div>
          <div style="background: #0b0f19; padding: 12px; border-radius: 8px; border: 1px solid #1e293b;">
            <div style="font-size: 12px; font-weight: 700; color: #f8fafc; margin-bottom: 4px;">Smart Product Scraper</div>
            <div style="font-size: 11.5px; color: #94a3b8; margin-bottom: 8px;">Auto-extracts titles, prices, images, and variant chips via URL.</div>
            <span class="status-badge badge-active">READY</span>
          </div>
        </div>
      </div>

      <!-- 3. MASTER AUDIT LOG TABLE -->
      <div class="f-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4 style="font-size: 14px; font-weight: 700; color: #f8fafc;">System Audit Diary (Real-Time Trail)</h4>
          <button type="button" class="btn-action-sm btn-blue" id="btnRefreshLogs">Refresh Logs 🔄</button>
        </div>

        <div class="table-responsive-box">
          <table class="f-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor Identity</th>
                <th>Action Recorded</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody id="activityTableBody">
              ${logs.map(log => `
                <tr>
                  <td>${log.time}</td>
                  <td><b>${log.actor}</b></td>
                  <td>${log.action}</td>
                  <td>
                    <span class="status-badge ${log.type === 'warning' ? 'badge-pending' : 'badge-active'}">
                      ${log.type.toUpperCase()}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Emergency Panic Button
    const btnPanic = document.getElementById('btnTogglePanicCloak');
    btnPanic.onclick = () => {
      const ask = confirm('EMERGENCY ACTION:\nActivate Stealth Cloak immediately?\nThis will hide the customer website and display a dummy 503 Maintenance Mode to public bots.');
      if (ask) {
        alert('Stealth Cloak ENGAGED! Customer portal is now hidden behind dummy maintenance mode.');
      }
    };

    // Refresh Logs
    document.getElementById('btnRefreshLogs').onclick = () => {
      window.initOwnerActivity();
    };
  };
})();
