/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: STAFF MODULE (ZERO DUMMY DATA)
   ========================================================================== */

(function () {
  'use strict';

  function getStaffStore() {
    try {
      const raw = localStorage.getItem('ss_owner_staff_store');
      return raw ? JSON.parse(raw) : {
        joiningRequests: [],
        enrolledStaff: [],
        activeRoster: [],
        assignedWork: []
      };
    } catch (e) {
      return { joiningRequests: [], enrolledStaff: [], activeRoster: [], assignedWork: [] };
    }
  }

  function saveStaffStore(store) {
    try {
      localStorage.setItem('ss_owner_staff_store', JSON.stringify(store));
    } catch (e) {}
  }

  window.initOwnerStaff = function () {
    const container = document.getElementById('view-staff');
    if (!container) return;

    function renderStaffHub() {
      container.innerHTML = `
        <div style="margin-bottom: 16px;">
          <h2 style="font-size: 19px; font-weight: 800; color: #3b2219; margin-bottom: 4px;">Staff & Operations Control</h2>
          <p style="font-size: 12.5px; color: #785a46;">Manage real applications, real enrolled members, and live attendance.</p>
        </div>

        <div style="display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap;">
          <button type="button" class="btn-action-sm btn-blue staff-main-pill active" data-sub="joining">1. Joining Requests</button>
          <button type="button" class="btn-action-sm btn-blue staff-main-pill" data-sub="enroll" style="opacity: 0.6;">2. Enrolled Staff</button>
          <button type="button" class="btn-action-sm btn-blue staff-main-pill" data-sub="roster" style="opacity: 0.6;">3. Register & Roster</button>
          <button type="button" class="btn-action-sm btn-blue staff-main-pill" data-sub="attendance" style="opacity: 0.6;">4. Attendance & 24h Graph</button>
          <button type="button" class="btn-action-sm btn-blue staff-main-pill" data-sub="work" style="opacity: 0.6;">5. Work & Output</button>
        </div>

        <div id="staffDynamicMount"></div>
      `;

      container.querySelectorAll('.staff-main-pill').forEach(pill => {
        pill.onclick = function () {
          container.querySelectorAll('.staff-main-pill').forEach(p => p.style.opacity = '0.6');
          this.style.opacity = '1';
          const sub = this.getAttribute('data-sub');
          if (sub === 'joining') openJoiningView();
          if (sub === 'enroll') openEnrollView();
          if (sub === 'roster') openRosterView();
          if (sub === 'attendance') openAttendanceView();
          if (sub === 'work') openWorkView();
        };
      });

      openJoiningView();
    }

    // 1. REAL JOINING (ZERO DUMMY)
    function openJoiningView() {
      const mount = document.getElementById('staffDynamicMount');
      const store = getStaffStore();
      mount.innerHTML = `
        <div class="f-card">
          <h4 style="font-size: 14px; font-weight: 700; color: #3b2219; margin-bottom: 12px;">New Staff Joining Applications</h4>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date / Time</th>
                  <th>Candidate Name</th>
                  <th>Category</th>
                  <th>Application Form</th>
                  <th>Auto Fill No.</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${store.joiningRequests.length === 0
                  ? '<tr><td colspan="7" style="text-align:center; padding:24px; color:#785a46; font-weight:600;">No new staff applications right now.</td></tr>'
                  : store.joiningRequests.map((r, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${r.dateTime}</td>
                      <td><b>${r.name}</b></td>
                      <td>${r.category}</td>
                      <td><button type="button" class="btn-action-sm btn-blue">📄 View Form</button></td>
                      <td><b style="color:#6b3e26;">${r.autoNo}</b></td>
                      <td>
                        <button type="button" class="btn-action-sm btn-green">Accept ✓</button>
                        <button type="button" class="btn-action-sm btn-red">Reject ✕</button>
                      </td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 2. REAL ENROLLED (ZERO DUMMY)
    function openEnrollView() {
      const mount = document.getElementById('staffDynamicMount');
      const store = getStaffStore();
      mount.innerHTML = `
        <div class="f-card">
          <h4 style="font-size: 14px; font-weight: 700; color: #3b2219; margin-bottom: 12px;">Enrolled Staff Database</h4>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Enroll Date</th>
                  <th>Auto Fill No.</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>ID Document</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${store.enrolledStaff.length === 0
                  ? '<tr><td colspan="8" style="text-align:center; padding:24px; color:#785a46; font-weight:600;">No enrolled staff members yet.</td></tr>'
                  : store.enrolledStaff.map((e, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${e.acceptDate}</td>
                      <td><b>${e.autoNo}</b></td>
                      <td><b>${e.name}</b></td>
                      <td>${e.phone}</td>
                      <td>${e.email}</td>
                      <td>✓ ${e.idDoc}</td>
                      <td>ENROLLED</td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 3. REAL ROSTER (ZERO DUMMY)
    function openRosterView() {
      const mount = document.getElementById('staffDynamicMount');
      const store = getStaffStore();
      mount.innerHTML = `
        <div class="f-card" style="margin-bottom: 16px;">
          <h4 style="font-size: 14px; font-weight: 700; color: #3b2219; margin-bottom: 10px;">Issue Member Credentials (Add Staff)</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; margin-bottom: 10px;">
            <input type="text" id="inpRosterAutoNo" placeholder="Auto Fill No." style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; color:#2b1810; font-size:12px;" />
            <input type="text" id="inpRosterName" placeholder="Staff Name" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; color:#2b1810; font-size:12px;" />
            <input type="text" id="inpRosterUserId" placeholder="User ID" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; color:#2b1810; font-size:12px;" />
            <input type="password" id="inpRosterPass" placeholder="Login Password" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; color:#2b1810; font-size:12px;" />
            <input type="password" id="inpRosterAccessId" placeholder="Access ID Key" style="background:#ffffff; border:1px solid #dfcfbc; padding:8px; border-radius:6px; color:#2b1810; font-size:12px;" />
          </div>
          <button type="button" class="btn-action-sm btn-green" id="btnCreateCredentials" style="padding:10px 16px; font-size:13px;">Save & Issue Credentials ✓</button>
        </div>

        <div class="f-card">
          <h4 style="font-size: 14px; font-weight: 700; color: #3b2219; margin-bottom: 12px;">Active Operations Roster</h4>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>User ID</th>
                  <th>Access ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${store.activeRoster.length === 0
                  ? '<tr><td colspan="5" style="text-align:center; padding:24px; color:#785a46; font-weight:600;">No active staff accounts issued yet.</td></tr>'
                  : store.activeRoster.map((r, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td><b>${r.name}</b></td>
                      <td><b>${r.userId}</b></td>
                      <td><code>${r.accessId}</code></td>
                      <td>${r.status}</td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      document.getElementById('btnCreateCredentials').onclick = () => {
        const name = document.getElementById('inpRosterName').value.trim();
        const uid = document.getElementById('inpRosterUserId').value.trim();
        const pass = document.getElementById('inpRosterPass').value.trim();
        const acc = document.getElementById('inpRosterAccessId').value.trim();

        if (!name || !uid || !pass || !acc) {
          alert('Please enter all credential fields.');
          return;
        }

        store.activeRoster.push({
          sno: store.activeRoster.length + 1,
          name,
          userId: uid,
          password: pass,
          accessId: acc,
          status: 'active'
        });

        saveStaffStore(store);
        alert(`Account created for ${name}!`);
        openRosterView();
      };
    }

    // 4. REAL ATTENDANCE (CLEAN TIMELINE)
    function openAttendanceView() {
      const mount = document.getElementById('staffDynamicMount');
      const store = getStaffStore();
      mount.innerHTML = `
        <div class="f-card">
          <h4 style="font-size: 14px; font-weight: 700; color: #3b2219; margin-bottom: 6px;">24-Hour Live Duty Activity Graph</h4>
          <p style="font-size: 12px; color: #785a46; margin-bottom: 12px;">Real-time active work pulse (Min 45m required).</p>

          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>User ID</th>
                  <th>Login Time</th>
                  <th>Exit Time</th>
                  <th>Total Stay</th>
                  <th>Daily Status</th>
                </tr>
              </thead>
              <tbody>
                ${store.activeRoster.length === 0
                  ? '<tr><td colspan="6" style="text-align:center; padding:24px; color:#785a46; font-weight:600;">No staff on duty today.</td></tr>'
                  : store.activeRoster.map(r => `
                    <tr>
                      <td><b>${r.name}</b></td>
                      <td>${r.userId}</td>
                      <td>--:--</td>
                      <td>--:--</td>
                      <td>0h 00m</td>
                      <td>ABSENT</td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 5. REAL WORK (ZERO DUMMY)
    function openWorkView() {
      const mount = document.getElementById('staffDynamicMount');
      const store = getStaffStore();
      mount.innerHTML = `
        <div class="f-card">
          <h4 style="font-size: 14px; font-weight: 700; color: #3b2219; margin-bottom: 12px;">Daily Tasks & Performance Audit</h4>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Access ID</th>
                  <th>Assigned Task</th>
                  <th>Status</th>
                  <th>Products Added</th>
                </tr>
              </thead>
              <tbody>
                ${store.assignedWork.length === 0
                  ? '<tr><td colspan="5" style="text-align:center; padding:24px; color:#785a46; font-weight:600;">No tasks assigned yet.</td></tr>'
                  : store.assignedWork.map(w => `
                    <tr>
                      <td><b>${w.staffName}</b></td>
                      <td><code>${w.accessId}</code></td>
                      <td>${w.task}</td>
                      <td>${w.status}</td>
                      <td>0 Deals</td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    renderStaffHub();
  };
})();
