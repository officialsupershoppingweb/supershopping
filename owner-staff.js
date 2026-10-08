/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: STAFF & PARTNER MODULE
   ========================================================================== */

(function () {
  'use strict';

  // Seed storage for Staff & Member Operations
  function getStaffStore() {
    try {
      const def = {
        joiningRequests: [
          { sno: 1, dateTime: '2026-10-07 10:15 AM', name: 'Rohan Verma', email: 'rohan.v@gmail.com', phone: '9876501234', category: 'Fashion & Apparel', autoNo: 'AF-101', docName: 'Identity Document Uploaded' },
          { sno: 2, dateTime: '2026-10-07 02:40 PM', name: 'Simran Kaur', email: 'simran.k@gmail.com', phone: '9812345670', category: 'Electronics & Tech', autoNo: 'AF-102', docName: 'Class X Marksheet Uploaded' }
        ],
        enrolledStaff: [
          { sno: 1, acceptDate: '2026-10-05', autoNo: 'AF-091', name: 'Rahul Sharma', father: 'Ramesh Sharma', dob: '2001-08-14', gender: 'Male', phone: '9898981122', email: 'rahul.s@gmail.com', address: 'Mau, UP', idDoc: 'Identity Proof Uploaded' },
          { sno: 2, acceptDate: '2026-10-04', autoNo: 'AF-092', name: 'Vikas Maurya', father: 'Suresh Maurya', dob: '2000-11-20', gender: 'Male', phone: '9876549900', email: 'vikas.m@gmail.com', address: 'Varanasi, UP', idDoc: 'Identity Proof Uploaded' }
        ],
        activeRoster: [
          { sno: 1, autoNo: 'AF-091', name: 'Rahul Sharma', email: 'rahul.s@gmail.com', phone: '9898981122', userId: 'MEM-STF-101', password: 'password101', accessId: 'ACC-881', status: 'active' },
          { sno: 2, autoNo: 'AF-092', name: 'Vikas Maurya', email: 'vikas.m@gmail.com', phone: '9876549900', userId: 'MEM-STF-102', password: 'password102', accessId: 'ACC-882', status: 'active' }
        ],
        assignedWork: [
          { sno: 1, staffName: 'Rahul Sharma', userId: 'MEM-STF-101', accessId: 'ACC-881', task: 'Add 10 Men Slim Jeans from Myntra & Verify Fashion claims', status: 'Completed', productsAdded: 10, ebooksAdded: 0 },
          { sno: 2, staffName: 'Vikas Maurya', userId: 'MEM-STF-102', accessId: 'ACC-882', task: 'Audit 5 TWS Earbuds links & verify electronics slips', status: 'Pending', productsAdded: 3, ebooksAdded: 0 }
        ]
      };
      const raw = localStorage.getItem('ss_owner_staff_store');
      return raw ? JSON.parse(raw) : def;
    } catch (e) {
      return {};
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
          <h2 style="font-size: 19px; font-weight: 800; color: #f8fafc; margin-bottom: 4px;">Staff & Operations Control</h2>
          <p style="font-size: 12.5px; color: #94a3b8;">Manage hiring requests, roster credentials, attendance, and tasks.</p>
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

    // 1. JOINING REQUESTS VIEW
    function openJoiningView() {
      const mount = document.getElementById('staffDynamicMount');
      const store = getStaffStore();
      mount.innerHTML = `
        <div class="f-card">
          <h4 style="font-size: 14px; font-weight: 700; color: #f8fafc; margin-bottom: 12px;">New Staff Joining Applications</h4>
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
                ${store.joiningRequests.length === 0 ? '<tr><td colspan="7" style="text-align:center; color:#64748b;">No pending joining applications.</td></tr>' : ''}
                ${store.joiningRequests.map((r, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td>${r.dateTime}</td>
                    <td><b>${r.name}</b></td>
                    <td>${r.category}</td>
                    <td><button type="button" class="btn-action-sm btn-blue" onclick="alert('Viewing application form and uploaded ID documents...')">📄 View Form</button></td>
                    <td><b style="color:#38bdf8;">${r.autoNo}</b></td>
                    <td>
                      <button type="button" class="btn-action-sm btn-green btn-accept-join" data-idx="${i}">Accept ✓</button>
                      <button type="button" class="btn-action-sm btn-red btn-reject-join" data-idx="${i}">Reject ✕</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      mount.querySelectorAll('.btn-accept-join').forEach(b => {
        b.onclick = function () {
          const idx = Number(this.getAttribute('data-idx'));
          const req = store.joiningRequests[idx];
          store.enrolledStaff.push({
            sno: store.enrolledStaff.length + 1,
            acceptDate: new Date().toISOString().split('T')[0],
            autoNo: req.autoNo,
            name: req.name,
            father: 'N/A',
            dob: '2002-01-01',
            gender: 'Specified in Form',
            phone: req.phone,
            email: req.email,
            address: 'Verified',
            idDoc: req.docName
          });
          store.joiningRequests.splice(idx, 1);
          saveStaffStore(store);
          alert(`Application Accepted! Moved to Enrolled Staff.`);
          openJoiningView();
        };
      });

      mount.querySelectorAll('.btn-reject-join').forEach(b => {
        b.onclick = function () {
          const idx = Number(this.getAttribute('data-idx'));
          const cand = store.joiningRequests[idx];
          if (confirm(`Confirm Rejection:\nPermanently reject application for ${cand.name}?`)) {
            store.joiningRequests.splice(idx, 1);
            saveStaffStore(store);
            alert(`${cand.name} rejected and blacklisted from reapplying.`);
            openJoiningView();
          }
        };
      });
    }

    // 2. ENROLLED STAFF VIEW
    function openEnrollView() {
      const mount = document.getElementById('staffDynamicMount');
      const store = getStaffStore();
      mount.innerHTML = `
        <div class="f-card">
          <h4 style="font-size: 14px; font-weight: 700; color: #f8fafc; margin-bottom: 12px;">Enrolled Staff Database</h4>
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
                ${store.enrolledStaff.map((e, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td>${e.acceptDate}</td>
                    <td><b style="color:#38bdf8;">${e.autoNo}</b></td>
                    <td><b>${e.name}</b></td>
                    <td>${e.phone}</td>
                    <td>${e.email}</td>
                    <td><span style="font-size:11.5px; color:#4ade80;">✓ ${e.idDoc}</span></td>
                    <td><span class="status-badge badge-active">ENROLLED</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 3. REGISTER & ROSTER VIEW
    function openRosterView() {
      const mount = document.getElementById('staffDynamicMount');
      const store = getStaffStore();
      mount.innerHTML = `
        <div class="f-card" style="margin-bottom: 16px;">
          <h4 style="font-size: 14px; font-weight: 700; color: #f8fafc; margin-bottom: 10px;">Issue Member Credentials (Add Staff)</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; margin-bottom: 10px;">
            <input type="text" id="inpRosterAutoNo" placeholder="Auto Fill No. (e.g. AF-101)" style="background:#0b0f19; border:1px solid #1e293b; padding:8px; border-radius:6px; color:#fff; font-size:12px;" />
            <input type="text" id="inpRosterName" placeholder="Staff Full Name" style="background:#0b0f19; border:1px solid #1e293b; padding:8px; border-radius:6px; color:#fff; font-size:12px;" />
            <input type="text" id="inpRosterUserId" placeholder="User ID (MEM-STF-...)" style="background:#0b0f19; border:1px solid #1e293b; padding:8px; border-radius:6px; color:#fff; font-size:12px;" />
            <input type="password" id="inpRosterPass" placeholder="Login Password" style="background:#0b0f19; border:1px solid #1e293b; padding:8px; border-radius:6px; color:#fff; font-size:12px;" />
            <input type="password" id="inpRosterAccessId" placeholder="Access ID Key" style="background:#0b0f19; border:1px solid #1e293b; padding:8px; border-radius:6px; color:#fff; font-size:12px;" />
          </div>
          <button type="button" class="btn-action-sm btn-green" id="btnCreateCredentials" style="padding:10px 16px; font-size:13px;">Save & Issue Credentials ✓</button>
        </div>

        <div class="f-card">
          <h4 style="font-size: 14px; font-weight: 700; color: #f8fafc; margin-bottom: 12px;">Active Operations Roster</h4>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>User ID</th>
                  <th>Access ID</th>
                  <th>Status</th>
                  <th>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                ${store.activeRoster.map((r, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td><b>${r.name}</b></td>
                    <td><b style="color:#38bdf8;">${r.userId}</b></td>
                    <td><code style="color:#fbbf24;">${r.accessId}</code></td>
                    <td><span class="status-badge ${r.status === 'active' ? 'badge-active' : 'badge-blocked'}">${r.status.toUpperCase()}</span></td>
                    <td>
                      <button type="button" class="btn-action-sm ${r.status === 'active' ? 'btn-red' : 'btn-green'} btn-toggle-roster" data-idx="${i}">
                        ${r.status === 'active' ? 'Block Access' : 'Unblock'}
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      // Auto-fill logic
      document.getElementById('inpRosterAutoNo').onchange = function () {
        const val = this.value.trim();
        const found = store.enrolledStaff.find(x => x.autoNo === val);
        if (found) {
          document.getElementById('inpRosterName').value = found.name;
          document.getElementById('inpRosterUserId').value = `MEM-STF-${100 + store.activeRoster.length + 1}`;
          document.getElementById('inpRosterPass').value = 'pass@' + Math.floor(1000 + Math.random() * 9000);
          document.getElementById('inpRosterAccessId').value = 'ACC-' + Math.floor(100 + Math.random() * 900);
        }
      };

      document.getElementById('btnCreateCredentials').onclick = () => {
        const name = document.getElementById('inpRosterName').value.trim();
        const uid = document.getElementById('inpRosterUserId').value.trim();
        const pass = document.getElementById('inpRosterPass').value.trim();
        const acc = document.getElementById('inpRosterAccessId').value.trim();

        if (!name || !uid || !pass || !acc) {
          alert('Please fill all mandatory credential fields.');
          return;
        }

        store.activeRoster.push({
          sno: store.activeRoster.length + 1,
          autoNo: document.getElementById('inpRosterAutoNo').value.trim() || 'AF-MANUAL',
          name,
          email: `${uid.toLowerCase()}@supershopping.desk`,
          phone: 'N/A',
          userId: uid,
          password: pass,
          accessId: acc,
          status: 'active'
        });

        saveStaffStore(store);
        alert(`Credentials created for ${name} (${uid})!`);
        openRosterView();
      };

      mount.querySelectorAll('.btn-toggle-roster').forEach(b => {
        b.onclick = function () {
          const idx = Number(this.getAttribute('data-idx'));
          store.activeRoster[idx].status = store.activeRoster[idx].status === 'active' ? 'blocked' : 'active';
          saveStaffStore(store);
          openRosterView();
        };
      });
    }

    // 4. ATTENDANCE & 24H GRAPH VIEW
    function openAttendanceView() {
      const mount = document.getElementById('staffDynamicMount');
      mount.innerHTML = `
        <div class="f-card" style="margin-bottom: 16px;">
          <h4 style="font-size: 14px; font-weight: 700; color: #f8fafc; margin-bottom: 6px;">24-Hour Live Duty Activity Graph</h4>
          <p style="font-size: 12px; color: #94a3b8; margin-bottom: 12px;">Real-time active work pulse (Minimum 45m required for daily present mark).</p>
          
          <div style="background:#0b0f19; border:1px solid #1e293b; border-radius:10px; padding:14px; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; font-size:11px; color:#64748b; margin-bottom:6px;">
              <span>00:00 (Midnight)</span>
              <span>06:00 AM</span>
              <span>12:00 PM (Noon)</span>
              <span>06:00 PM</span>
              <span>23:59</span>
            </div>
            
            <!-- Staff 1 Timeline -->
            <div style="margin-bottom:10px;">
              <div style="font-size:12px; font-weight:700; color:#38bdf8; margin-bottom:4px;">Rahul Sharma (MEM-STF-101)</div>
              <div style="height:12px; width:100%; background:#1e293b; border-radius:6px; overflow:hidden; position:relative;">
                <div style="position:absolute; left:41.6%; width:12.5%; height:100%; background:#22c55e;" title="Active: 10:00 AM - 01:00 PM"></div>
              </div>
            </div>

            <!-- Staff 2 Timeline -->
            <div>
              <div style="font-size:12px; font-weight:700; color:#c084fc; margin-bottom:4px;">Vikas Maurya (MEM-STF-102)</div>
              <div style="height:12px; width:100%; background:#1e293b; border-radius:6px; overflow:hidden; position:relative;">
                <div style="position:absolute; left:45.8%; width:10.4%; height:100%; background:#22c55e;" title="Active: 11:00 AM - 01:30 PM"></div>
              </div>
            </div>
          </div>

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
                <tr>
                  <td><b>Rahul Sharma</b></td>
                  <td>MEM-STF-101</td>
                  <td>10:00 AM</td>
                  <td>01:00 PM</td>
                  <td><b style="color:#4ade80;">3h 00m</b></td>
                  <td><span class="status-badge badge-active">PRESENT</span></td>
                </tr>
                <tr>
                  <td><b>Vikas Maurya</b></td>
                  <td>MEM-STF-102</td>
                  <td>11:00 AM</td>
                  <td>01:30 PM</td>
                  <td><b style="color:#4ade80;">2h 30m</b></td>
                  <td><span class="status-badge badge-active">PRESENT</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 5. WORK & OUTPUT VIEW
    function openWorkView() {
      const mount = document.getElementById('staffDynamicMount');
      const store = getStaffStore();
      mount.innerHTML = `
        <div class="f-card">
          <h4 style="font-size: 14px; font-weight: 700; color: #f8fafc; margin-bottom: 12px;">Daily Tasks & Performance Audit</h4>
          <div class="table-responsive-box">
            <table class="f-table">
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Access ID</th>
                  <th>Assigned Target Task</th>
                  <th>Status</th>
                  <th>Products Added</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${store.assignedWork.map(w => `
                  <tr>
                    <td><b>${w.staffName}</b></td>
                    <td><code style="color:#fbbf24;">${w.accessId}</code></td>
                    <td>${w.task}</td>
                    <td><span class="status-badge ${w.status === 'Completed' ? 'badge-active' : 'badge-pending'}">${w.status}</span></td>
                    <td><b style="color:#38bdf8;">${w.productsAdded} Deals</b></td>
                    <td><button type="button" class="btn-action-sm btn-blue" onclick="alert('Auditing live deals mapped to this Access ID...')">Audit View 🔍</button></td>
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
