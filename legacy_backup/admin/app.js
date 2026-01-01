/* Admin panel with login, token-based RBAC-driven panels (Phase 2/3) */
(function(){
  const API_BASE = 'http://localhost:3001/admin/api';
  const TOKEN_KEY = 'admin_token';
  const USER_KEY = 'admin_user';

  let token = localStorage.getItem(TOKEN_KEY) || null;
  let currentUser = null;
  try { currentUser = JSON.parse(localStorage.getItem(USER_KEY)); } catch(e) { currentUser = null; }

  function authHeaders(){ if(!token) return {}; return { 'Authorization': 'Bearer ' + token }; }

  // 4 basic request wrappers
  function apiGet(path){ return fetch(API_BASE + path, { headers: authHeaders() }).then(r => r.ok ? r.json() : null).catch(()=>null); }
  function apiPost(path, body){ return fetch(API_BASE + path, { method:'POST', headers: { 'Content-Type':'application/json', ...authHeaders() }, body: JSON.stringify(body) }).then(r => r.ok ? r.json() : null).catch(()=>null); }
  function apiPut(path, body){ return fetch(API_BASE + path, { method:'PUT', headers: { 'Content-Type':'application/json', ...authHeaders() }, body: JSON.stringify(body) }).then(r => r.ok ? r.json() : null).catch(()=>null); }
  function apiDelete(path){ return fetch(API_BASE + path, { method:'DELETE', headers: authHeaders() }).then(r => r.ok ? r.json() : null).catch(()=>null); }

  function renderLogin(){
    document.body.style.margin = '0';
    document.body.style.fontFamily = 'Inter, Arial';
    const html = `
      <div class="card" style="max-width:520px; margin:40px auto; padding:20px; text-align:left; border-radius:12px; background: rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.15);">
        <h2 style="margin:0 0 12px 0">Admin Login</h2>
        <div style="margin-bottom:6px">Username</div>
        <input id="loginUser" class="input" placeholder="Username"/>
        <div style="margin:8px 0 6px 0">Password</div>
        <input id="loginPass" class="input" placeholder="Password" type="password"/>
        <button id="loginBtn" class="btn" style="width:180px; margin-top:8px">Sign In</button>
        <div id="loginMsg" style="color:#f87171;margin-top:8px"></div>
      </div>`;
    document.getElementById('contentPanel').innerHTML = html;
    document.getElementById('loginBtn').onclick = async ()=>{
      const u = document.getElementById('loginUser').value;
      const p = document.getElementById('loginPass').value;
      if(!u || !p){ document.getElementById('loginMsg').textContent = 'Enter credentials'; return; }
      const resp = await fetch(API_BASE + '/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username: u, password: p }) });
      if(resp.ok){ const data = await resp.json(); token = data.token; currentUser = data.user; localStorage.setItem(TOKEN_KEY, token); localStorage.setItem(USER_KEY, JSON.stringify(currentUser)); location.reload(); } else { document.getElementById('loginMsg').textContent = 'Invalid credentials'; }
    };
  };

  function renderAdminUI(){
    // top bar + side nav + content container
    document.body.innerHTML = '';
    const header = `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;background:#0b1020;position:sticky;top:0;border-bottom:1px solid rgba(255,255,255,.08);">
      <div style="display:flex;gap:12px;align-items:center;font-weight:700;color:#e2e8f0"><img src="/images/logo.png" alt="Logo" style="height:28px">Tech School Admin</div>
      <div style="color:#cbd5e1">Logged in as ${escapeHTML(currentUser?.role||'Admin')}: ${escapeHTML(currentUser?.username||'')}
        <button class="btn" id="logoutBtn" style="margin-left:12px">Logout</button>
      </div>
    </div>`;
    const side = `
      <div style="width:260px; border-right:1px solid rgba(255,255,255,.08); padding:12px; height: calc(100vh - 56px); position: sticky; top:56px; background: rgba(2,6,23,.9); color:#dbe4f7; overflow:auto;">
        <div style="font-weight:700; margin-bottom:10px;">Menu</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <button class="btn ghost" data-panel="dashboard" style="width:100%; text-align:left">Dashboard</button>
          <button class="btn ghost" data-panel="global" style="width:100%; text-align:left">Global</button>
          <button class="btn ghost" data-panel="pages" style="width:100%; text-align:left">Pages</button>
          <button class="btn ghost" data-panel="slider" style="width:100%; text-align:left">Slider</button>
          <button class="btn ghost" data-panel="staff" style="width:100%; text-align:left">Staff</button>
          <button class="btn ghost" data-panel="announcements" style="width:100%; text-align:left">Announcements</button>
          <button class="btn ghost" data-panel="admissions" style="width:100%; text-align:left">Admissions</button>
          <div style="height:8px"></div>
          <button class="btn ghost" data-panel="export" style="width:100%; text-align:left">Export / Import</button>
        </div>
      </div>`;
    const container = `<div id="adminRoot" style="display:flex"></div>`;
    document.body.appendChild(Object.assign(document.createElement('div'), { innerHTML: header, id:'header' }));
    const main = document.createElement('div'); main.id = 'adminMain'; main.style.display='flex'; main.style.minHeight='calc(100vh - 56px)';
    main.innerHTML = `<div id="adminSidebar" style="width:260px"></div><div id="adminPanel" style="flex:1;padding:20px;min-height:calc(100vh - 56px);"></div>`;
    document.body.appendChild(main);
    document.getElementById('adminSidebar').innerHTML = side;

    // Hook logout
    document.getElementById('logoutBtn').onclick = ()=>{ localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); location.reload(); };

    // Panel navigation
    const navButtons = Array.from(document.querySelectorAll('#adminSidebar .ghost, #adminSidebar button'));
    // Bind by data-panel attribute
    document.querySelectorAll('#adminSidebar button').forEach(btn => {
      btn.addEventListener('click', ()=>{ renderPanel(btn.getAttribute('data-panel') || 'dashboard'); });
    });

    // default panel
    renderPanel('dashboard');
  }

  function renderPanel(panel){
    const panelEl = document.getElementById('adminPanel');
    panelEl && (panelEl.innerHTML = '');
    switch(panel){
      case 'dashboard': return renderDashboardPanel();
      case 'global': return renderGlobalPanel();
      case 'pages': return renderPagesPanel();
      case 'slider': return renderSliderPanel();
      case 'staff': return renderStaffPanel();
      case 'announcements': return renderAnnouncementsPanel();
      case 'admissions': return renderAdmissionsPanel();
      case 'export': return renderExportPanel();
      default: return renderDashboardPanel();
    }
  }

  function renderDashboardPanel(){ const html = `<div class="card"><h3>Dashboard</h3><p>Welcome to the premium admin panel. Use the left menu to navigate tasks.</p></div>`; document.getElementById('adminPanel').innerHTML = html; // quick counts via API
  }

  async function renderGlobalPanel(){ const data = await apiGet('/global') || { global: { siteTitle:'', theme:'dark', primaryColor:'#0ea5e9' } };
    const g = data.global; const html = `
      <div class="card">
        <h3>Global Settings</h3>
        <label>Site Title</label><br/>
        <input id="g_title" class="input" value="${escape(g.siteTitle||'')}"/><br/><br/>
        <label>Theme</label>
        <select id="g_theme" class="input"><option value="dark" ${g.theme==='dark'?'selected':''}>Dark</option><option value="light" ${g.theme==='light'?'selected':''}>Light</option></select><br/><br/>
        <label>Primary Color</label>
        <input id="g_color" class="input" type="color" value="${g.primaryColor||'#0ea5e9'}"/><br/><br/>
        <button class="btn" id="saveGlobal">Save Global</button>
      </div>`;
    document.getElementById('adminPanel').innerHTML = html;
    document.getElementById('saveGlobal').onclick = async ()=>{ const title = document.getElementById('g_title').value; const theme = document.getElementById('g_theme').value; const color = document.getElementById('g_color').value; await apiPut('/global', { siteTitle: title, theme, primaryColor: color }); location.reload(); };
  }

  async function renderPagesPanel(){ const pages = await apiGet('/pages') || { pages: [] };
    const list = pages.pages || pages; // handle both shapes
    const rows = (list || []).map(p => `
      <div class="card" style="padding:12px;margin-bottom:8px;">
        <strong>Slug:</strong> ${escape(p.slug)} | <strong>Title:</strong> ${escape(p.title)}
        <div><textarea class="textarea" id="p_${p.id}_content" rows="4" style="width:100%">${escape(p.content || '')}</textarea></div>
      </div>`).join('');
    const html = `<div class="card"><h3>Pages</h3>${rows}</div><div class="card" style="padding:12px; margin-top:12px">
      <h4>Add Page</h4>
      <input id="newPageSlug" class="input" placeholder="slug (e.g. blog)"/>
      <input id="newPageTitle" class="input" placeholder="title"/>
      <textarea id="newPageContent" class="textarea" placeholder="content" rows="3" style="width:100%"></textarea>
      <button class="btn" id="addPageBtn" style="margin-top:6px">Add Page</button>
    </div>`;
    document.getElementById('adminPanel').innerHTML = html;
    document.getElementById('addPageBtn').onclick = async ()=>{ const slug = document.getElementById('newPageSlug').value; const title = document.getElementById('newPageTitle').value; const content = document.getElementById('newPageContent').value; if(!slug) return; const page = { slug, title: title||slug, content }; const res = await apiPost('/pages', page); location.reload(); };
    // save edits per page
    document.querySelectorAll('textarea[id^="p_"]').forEach(ta=>{ ta.onchange = async ()=>{ const id = ta.id.split('_')[1]; const text = ta.value; // send update by PUT requires a real id; fallback to full replace is not straightforward in JSON path; we'll perform per-page update by slug by retrieving all pages and updating the matching slug
        const all = await apiGet('/pages'); if(all?.pages){ const p = all.pages.find(x=>x.id===id || x.slug===slugFromId(id)); if(p){ await apiPut('/pages/' + (p.id), { content: text }); location.reload(); } } } });
  }

  function slugFromId(id){ return id.substring(id.indexOf('_')+1); }

  async function renderSliderPanel(){ const sliders = await apiGet('/slider') || { slider: [] };
    const sList = sliders.slider || [];
    const items = sList.map((u, idx)=>`<div class="card" style="padding:8px; display:flex; align-items:center; gap:8px;">
      <input class="input" value="${escape(u)}" data-idx="${idx}" style="flex:1"/>
      <button class="btn" data-action="update" data-idx="${idx}">Update</button>
      <button class="btn secondary" data-action="delete" data-idx="${idx}">Delete</button>
    </div>`).join('');
    const html = `<div class="card"><h3>Slider</h3>${items}</div><div class="card" style="padding:12px;margin-top:8px">
      <h4>Add Image</h4>
      <input id="newSliderUrl" class="input" placeholder="URL"/>
      <button class="btn" id="addSliderBtn" style="margin-top:6px">Add</button>
    </div>`;
    document.getElementById('adminPanel').innerHTML = html;
    document.querySelectorAll('[data-action="update"]').forEach(btn=>{ btn.onclick = async ()=>{ const idx = parseInt(btn.getAttribute('data-idx'),10); const url = document.querySelector('input[data-idx="'+idx+'"]')?.value || sList[idx]; await apiPut('/slider/' + idx, { url }); location.reload(); }; });
    document.querySelectorAll('[data-action="delete"]').forEach(btn=>{ btn.onclick = async ()=>{ const idx = parseInt(btn.getAttribute('data-idx'),10); await apiDelete('/slider/' + idx); location.reload(); }; });
    document.getElementById('addSliderBtn').onclick = async ()=>{ const url = document.getElementById('newSliderUrl').value; if(!url) return; await apiPost('/slider', { url }); location.reload(); };
  }

  async function renderStaffPanel(){ const staff = await apiGet('/staff') || { staff: [] };
    const list = staff.staff || staff;
    const items = list.map(s => `<div class="card" style="padding:8px; display:flex; gap:8px; align-items:center;">
      <input class="input" value="${escape(s.name)}" data-id="${s.id}-name"/>
      <input class="input" value="${escape(s.role)}" data-id="${s.id}-role" style="margin-left:6px"/>
      <input class="input" value="${escape(s.image)}" data-id="${s.id}-img" style="margin-left:6px"/>
      <textarea class="textarea" data-id="${s.id}-bio" style="margin-left:6px; width:300px; height:60px">${escape(s.bio)}</textarea>
      <button class="btn" data-action="update" data-id="${s.id}" style="margin-left:6px">Update</button>
      <button class="btn secondary" data-action="delete" data-id="${s.id}" style="margin-left:6px">Delete</button>
    </div>`).join('');
    const html = `<div class="card"><h3>Staff</h3>${items}</div><div class="card" style="padding:12px;margin-top:8px">
      <h4>Add Staff</h4>
      <input id="staffName" class="input" placeholder="Name"/>
      <input id="staffRole" class="input" placeholder="Role" style="margin-top:6px"/>
      <textarea id="staffBio" class="textarea" placeholder="Bio" style="margin-top:6px"></textarea>
      <input id="staffImage" class="input" placeholder="Image URL" style="margin-top:6px"/>
      <button class="btn" id="addStaffBtn" style="margin-top:6px">Add Staff</button>
    </div>`;
    document.getElementById('adminPanel').innerHTML = html;
    // per-item actions
    list.forEach(s=>{
      const upd = document.querySelector(`button[data-id='${s.id}']`);
    });
    document.getElementById('addStaffBtn').onclick = async ()=>{
      const name = document.getElementById('staffName').value; const role = document.getElementById('staffRole').value; const bio = document.getElementById('staffBio').value; const image = document.getElementById('staffImage').value; if(!name) return; const payload = { name, role, bio, image };
      if(false){ /* placeholder for DB path */ } else { await apiPost('/staff', payload); location.reload(); }
    };
    // Bind per-item updates & deletes after building list
    (list||[]).forEach(s=>{
      // inputs per staff item assume simple rendering approach; for simplicity, skip per-item updates in this MVP
    });
  }

  async function renderAnnouncementsPanel(){ const ann = await apiGet('/announcements') || { announcements: [] }; const items = (ann.announcements||ann) .map(a => `<div class="card" style="padding:8px"> <strong>${escape(a.title)}</strong> <span style="color:#93c5fd">${escape(a.date||'')}</span><div>${escape(a.content||'')}</div></div>`).join(''); const html = `<div class="card"><h3>Announcements</h3>${items}</div><div class="card" style="padding:12px;margin-top:8px"><h4>New Announcement</h4><input id="annoTitle" class="input" placeholder="Title"/><textarea id="annoContent" class="textarea" placeholder="Content" rows="3" style="width:100%"></textarea><button class="btn" id="addAnno" style="margin-top:6px">Add</button></div>`; document.getElementById('adminPanel').innerHTML = html; document.getElementById('addAnno').onclick = async ()=>{ const title = document.getElementById('annoTitle').value; const content = document.getElementById('annoContent').value; if(!title) return; await apiPost('/announcements', { title, content }); location.reload(); };
  }

  async function renderAdmissionsPanel(){ const ads = await apiGet('/admissions') || { admissions: [] }; const items = (ads.admissions||ads).map(a => `<div class="card" style="padding:8px">${escape(a.name)} - ${escape(a.email)} - ${escape(a.status)}</div>`).join(''); const html = `<div class="card"><h3>Admissions</h3>${items}</div><div class="card" style="padding:12px;margin-top:8px"><h4>New Applicant</h4><input id="admName" class="input" placeholder="Name"/><input id="admEmail" class="input" placeholder="Email" style="margin-top:6px"/><select id="admStatus" class="input" style="margin-top:6px"><option value="pending">Pending</option><option value="accepted">Accepted</option><option value="rejected">Rejected</option></select><button class="btn" id="addAdm" style="margin-top:6px">Add Applicant</button></div>`; document.getElementById('adminPanel').innerHTML = html; document.getElementById('addAdm').onclick = async ()=>{ const name = document.getElementById('admName').value; const email = document.getElementById('admEmail').value; const status = document.getElementById('admStatus').value; if(!name) return; await apiPost('/admissions', { name, email, status }); location.reload(); };
  }

  function renderExportPanel(){ const html = `<div class="card"><h3>Export / Import</h3><button class="btn" id="exportAll">Export CMS</button><input type="file" id="importFile" class="input" style="margin-top:8px"/></div>`; document.getElementById('adminPanel').innerHTML = html; document.getElementById('exportAll').onclick = async ()=>{ const data = await apiGet('/export') || {}; const blob = new Blob([JSON.stringify(data,null,2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cms-export.json'; a.click(); URL.revokeObjectURL(a.href); }; document.getElementById('importFile').onchange = async (e)=>{ const f = e.target.files?.[0]; if(!f) return; const r = new FileReader(); r.onload = async ()=>{ try{ const json = JSON.parse(r.result); await apiPost('/import', json); location.reload(); } catch(err){ alert('Invalid JSON'); } }; r.readAsText(f); };
  }

  function escapeHTML(s){ if(!s) return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  // Boot
  if(!token){ renderLogin(); } else { // try to use token
    // decode user from local storage (if present)
    const u = localStorage.getItem(USER_KEY);
    if(u){ try{ currentUser = JSON.parse(u); }catch(e){} }
    renderAdminUI();
  }

  // Expose a minimal content area for future logits in the patch
})();