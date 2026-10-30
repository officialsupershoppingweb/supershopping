/* ==========================================================================
   SUPER SHOPPING - FOUNDER DESK: STAFF MANAGEMENT HUB (FULL BLUEPRINT ENGINE)
   ========================================================================== */

(function () {
  'use strict';

  window.initOwnerStaff = function () {
    var mount = document.getElementById('view-staff');
    if (!mount) return;

    // DIRECT ROUTE RUNNER: STAFF-TABLES.HTML LINK
    function openStaffTable(key) {
      window.location.href = './staff-tables.html?table=' + key;
    }

    // Isolate staff view display
    document.querySelectorAll('.f-view').forEach(function(el) {
      if (el.id !== 'view-staff') {
        el.classList.remove('active');
        el.style.display = 'none';
      }
    });
    mount.classList.add('active');
    mount.style.display = 'block';

    var viewHistory = [];

    function pushView(fn) {
      viewHistory.push(fn);
      fn();
    }

    window.onpopstate = function () {
      if (viewHistory.length > 1) {
        viewHistory.pop();
        var prevScreen = viewHistory[viewHistory.length - 1];
        if (prevScreen) prevScreen();
      } else {
        showLevel1();
      }
    };

    // -------------------------------------------------------------
    // LEVEL 1: STAFF & PARTNER SELECTION (2 OPTIONS)
    // -------------------------------------------------------------
    function showLevel1() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 28px; margin-bottom:28px; box-shadow:0 4px 12px rgba(59,34,25,0.08);">
            <h3 style="font-size:18px; font-weight:900; color:#3b2219; letter-spacing:1px; margin:0; text-transform:uppercase;">STAFF & PARTNER DESK</h3>
          </div>

          <div style="display:flex; gap:26px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="btnDeskStaff" class="stock-square-card" style="width:185px; height:185px; background:#0284c7; border:none; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; cursor:pointer; box-shadow:0 12px 28px rgba(2,132,199,0.25);">
              <span style="font-size:44px;">👔</span>
              <span style="font-size:16px; font-weight:900; color:#ffffff; text-align:center; line-height:1.2;">1. STAFF<br/>MANAGEMENT</span>
            </button>
            <button type="button" id="btnDeskPartner" class="stock-square-card" style="width:185px; height:185px; background:#0284c7; border:none; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; cursor:pointer; box-shadow:0 12px 28px rgba(2,132,199,0.25);">
              <span style="font-size:44px;">🤝</span>
              <span style="font-size:16px; font-weight:900; color:#ffffff; text-align:center; line-height:1.2;">2. PARTNER<br/>DESK</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnDeskStaff').onclick = function() { pushView(showStaff6Modules); };
      document.getElementById('btnDeskPartner').onclick = function() { openStaffTable('stf-partner'); };
    }

    // -------------------------------------------------------------
    // LEVEL 2: 6 STAFF MODULES
    // -------------------------------------------------------------
    function showStaff6Modules() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 26px; margin-bottom:28px; box-shadow:0 4px 12px rgba(59,34,25,0.08);">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">STAFF OPERATIONS</h3>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="stfM1" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.2);">
              <span style="font-size:34px;">📋</span>
              <span style="font-size:13px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">1. Details<br/>Staff</span>
            </button>
            <button type="button" id="stfM2" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.2);">
              <span style="font-size:34px;">📇</span>
              <span style="font-size:13px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">2. Register<br/>Staff</span>
            </button>
            <button type="button" id="stfM3" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.2);">
              <span style="font-size:34px;">📅</span>
              <span style="font-size:13px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">3. Staff<br/>Attendance</span>
            </button>
            <button type="button" id="stfM4" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.2);">
              <span style="font-size:34px;">⚡</span>
              <span style="font-size:13px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">4. Work &<br/>Done</span>
            </button>
            <button type="button" id="stfM5" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.2);">
              <span style="font-size:34px;">💵</span>
              <span style="font-size:13px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">5. Staff<br/>Salary</span>
            </button>
            <button type="button" id="stfM6" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 10px 24px rgba(2,132,199,0.2);">
              <span style="font-size:34px;">⚙️</span>
              <span style="font-size:13px; font-weight:800; color:#ffffff; text-align:center; line-height:1.2;">6. Custom<br/>Desk</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('stfM1').onclick = function() { pushView(showDetailsStaffSub); };
      document.getElementById('stfM2').onclick = function() { pushView(showRegisterStaffSub); };
      document.getElementById('stfM3').onclick = function() { pushView(showAttendanceSub); };
      document.getElementById('stfM4').onclick = function() { pushView(showWorkSub); };
      document.getElementById('stfM5').onclick = function() { openStaffTable('stf-salary'); };
      document.getElementById('stfM6').onclick = function() { openStaffTable('stf-custom'); };
    }

    // -------------------------------------------------------------
    // SUB-MODULE 1: DETAILS STAFF
    // -------------------------------------------------------------
    function showDetailsStaffSub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">1. DETAILS STAFF</h3>
          </div>
          <div style="display:flex; gap:24px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="subD1" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer; box-shadow:0 12px 28px rgba(59,34,25,0.08);">
              <span style="font-size:40px;">📩</span>
              <span style="font-size:14px; font-weight:900; color:#0284c7; text-align:center; line-height:1.2;">i. JOINING FOR<br/>REQUEST</span>
            </button>
            <button type="button" id="subD2" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer; box-shadow:0 12px 28px rgba(59,34,25,0.08);">
              <span style="font-size:40px;">📜</span>
              <span style="font-size:14px; font-weight:900; color:#0284c7; text-align:center; line-height:1.2;">ii. ENROLL<br/>STAFF</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('subD1').onclick = function() { openStaffTable('stf-join-req'); };
      document.getElementById('subD2').onclick = function() { openStaffTable('stf-enroll'); };
    }

    // -------------------------------------------------------------
    // SUB-MODULE 2: REGISTER STAFF
    // -------------------------------------------------------------
    function showRegisterStaffSub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">2. REGISTER STAFF</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="subR1" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">A. ADD<br/>STAFF</button>
            <button type="button" id="subR2" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">B. REMOVE<br/>STAFF</button>
            <button type="button" id="subR3" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">C. REGISTER<br/>ID</button>
          </div>
        </div>
      `;

      document.getElementById('subR1').onclick = function() { openStaffTable('stf-reg-add'); };
      document.getElementById('subR2').onclick = function() { openStaffTable('stf-reg-remove'); };
      document.getElementById('subR3').onclick = function() { openStaffTable('stf-reg-id'); };
    }

    // -------------------------------------------------------------
    // SUB-MODULE 3: STAFF ATTENDANCE
    // -------------------------------------------------------------
    function showAttendanceSub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">3. STAFF ATTENDANCE</h3>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 170px)); gap:18px; justify-content:center; width:100%; max-width:580px;">
            <button type="button" id="subA1" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">1. DAILY<br/>PRESENT</button>
            <button type="button" id="subA2" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">2. MONTHLY<br/>COUNT</button>
            <button type="button" id="subA3" class="stock-square-card" style="height:145px; background:#0284c7; border:none; border-radius:20px; color:#fff; font-weight:900; font-size:13px; cursor:pointer; line-height:1.2;">3. GRAPH OF<br/>ALL STAFF</button>
          </div>
        </div>
      `;

      document.getElementById('subA1').onclick = function() { openStaffTable('stf-att-daily'); };
      document.getElementById('subA2').onclick = function() { openStaffTable('stf-att-monthly'); };
      document.getElementById('subA3').onclick = function() { openStaffTable('stf-att-graph'); };
    }

    // -------------------------------------------------------------
    // SUB-MODULE 4: WORK & DONE BY STAFF
    // -------------------------------------------------------------
    function showWorkSub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#ffffff; border:2px solid #3b2219; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#3b2219; margin:0; text-transform:uppercase;">4. WORK & DONE BY STAFF</h3>
          </div>
          <div style="display:flex; gap:24px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="subW1" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer; box-shadow:0 12px 28px rgba(59,34,25,0.08);">
              <span style="font-size:40px;">📤</span>
              <span style="font-size:14px; font-weight:900; color:#0284c7; text-align:center; line-height:1.2;">a) WORK FOR<br/>STAFF</span>
            </button>
            <button type="button" id="subW2" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer; box-shadow:0 12px 28px rgba(59,34,25,0.08);">
              <span style="font-size:40px;">📥</span>
              <span style="font-size:14px; font-weight:900; color:#0284c7; text-align:center; line-height:1.2;">b) WORK DONE<br/>BY STAFF</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('subW1').onclick = function() { pushView(showWorkForStaffSub); };
      document.getElementById('subW2').onclick = function() { openStaffTable('stf-work-done'); };
    }

    function showWorkForStaffSub() {
      mount.innerHTML = `
        <div style="padding:20px 10px; min-height:75vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="background:#0284c7; border:2px solid #0369a1; border-radius:12px; padding:10px 26px; margin-bottom:28px;">
            <h3 style="font-size:17px; font-weight:900; color:#ffffff; margin:0; text-transform:uppercase;">Work For Staff Desk</h3>
          </div>
          <div style="display:flex; gap:24px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="subWG1" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:40px;">✍️</span>
              <span style="font-size:14px; font-weight:900; color:#0284c7; text-align:center; line-height:1.2;">i. GIVEN BY<br/>STAFF (ASSIGN)</span>
            </button>
            <button type="button" id="subWG2" class="stock-square-card" style="width:180px; height:180px; background:#ffffff; border:2px solid #dfcfbc; border-radius:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer;">
              <span style="font-size:40px;">📋</span>
              <span style="font-size:14px; font-weight:900; color:#0284c7; text-align:center; line-height:1.2;">ii. GET WORK<br/>OVERVIEW</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('subWG1').onclick = function() { openStaffTable('stf-work-give'); };
      document.getElementById('subWG2').onclick = function() { openStaffTable('stf-work-get'); };
    }

    // Launch Level 1
    viewHistory = [showLevel1];
    showLevel1();
  };
})();
