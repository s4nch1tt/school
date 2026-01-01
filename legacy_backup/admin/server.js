const express = require('express');
const fs = require('fs');
const path = require('path');
let prisma;
let useDB = false;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
  useDB = true;
} catch (e) {
  useDB = false;
}

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dps-keoti-jwt-secret';

// Seeds and helpers
function ensureSeed(){
  const dataPath = path.join(__dirname, 'data', 'db.json');
  if(!fs.existsSync(dataPath)){
    const seed = {
      global: { siteTitle: 'Delhi Public School Keoti - Tech Edition', theme:'dark', primaryColor:'#0ea5e9' },
      pages: [ { id:'p-home', slug:'index', title:'Home', content:'Welcome to the premium tech school.' } ],
      slider: ['../images/slider1.jpg','../images/slider2.jpg','../images/slider3.jpg','../images/slider4.jpg','../images/slider5.jpg'],
      staff: [ { id:'staff-chair', name:'Chairman', role:'Chairman', bio:'', image:'../images/chairman.jpg' } ],
      announcements: [], admissions: [], courses: [], departments: [], classes: [], attendance: [], grades: [], notifications: [], messages: [], assets: []
    };
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    fs.writeFileSync(dataPath, JSON.stringify(seed, null, 2));
    // users seed
    const usersPath = path.join(__dirname, 'data', 'users.json');
    const seedUsers = [
      { id:'u_super', username:'superadmin', password:'admin123', role:'SUPERADMIN' },
      { id:'u_admin', username:'admin', password:'admin123', role:'ADMIN' },
      { id:'u_teacher', username:'teacher', password:'admin123', role:'TEACHER' },
      { id:'u_staff', username:'staff', password:'admin123', role:'STAFF' }
    ];
    fs.writeFileSync(usersPath, JSON.stringify(seedUsers, null, 2));
    return true;
  }
  return true;
}
function readDataFallback(){
  const dataPath = path.join(__dirname, 'data', 'db.json');
  if(!fs.existsSync(dataPath)) return {};
  try { return JSON.parse(fs.readFileSync(dataPath, 'utf8')); } catch(e){ return {}; }
}
function readUsers(){ const p = path.join(__dirname, 'data', 'users.json'); if(!fs.existsSync(p)) { ensureSeed(); } try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch(e){ return []; } }
function writeData(d){ fs.writeFileSync(path.join(__dirname, 'data','db.json'), JSON.stringify(d,null,2)); }

// Auth
function authenticateToken(req, res, next){ const authHeader = req.headers['authorization']; let token = null; if(authHeader && authHeader.startsWith('Bearer ')) token = authHeader.slice(7); else token = req.headers['x-auth-token']; if(!token) return res.status(401).json({ error:'Unauthorized' }); try{ const payload = require('jsonwebtoken').verify(token, JWT_SECRET); req.user = payload; next(); } catch(e){ return res.status(401).json({ error:'Invalid token' }); } }
function requireRoles(roles){ return (req, res, next) => { const r = req.user?.role; if(!r || !roles.includes(r)) return res.status(403).json({ error:'Forbidden' }); next(); } }

// Public login
const jwt = require('jsonwebtoken');
app.post('/admin/api/auth/login', (req,res)=>{
  const { username, password } = req.body || {};
  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if(!user) return res.status(401).json({ error:'Invalid credentials' });
  const payload = { sub: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

// Routes (RBAC applied per route)
app.use('/admin/api', authenticateToken, (req,res,next)=>{ // attach a simple route-guard wrapper
  // base guard: ensure user has a role among known set
  if(!req.user || !['SUPERADMIN','ADMIN','TEACHER','STAFF'].includes(req.user.role)) return res.status(403).json({ error:'Forbidden' });
  next();
});

// Global
app.get('/admin/api/global', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); res.json({ global: d.global }); });
app.put('/admin/api/global', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); d.global = { ...d.global, ...req.body }; writeData(d); res.json({ success:true, global:d.global }); });

// Pages
app.get('/admin/api/pages', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); res.json({ pages: d.pages || [] }); });
app.post('/admin/api/pages', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const page = { id:'p_'+Date.now(), slug:req.body.slug, title:req.body.title, content:req.body.content }; d.pages.unshift(page); writeData(d); res.json({ created: page }); });
app.put('/admin/api/pages/:id', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const id = req.params.id; const p = d.pages.find(x=>x.id===id); if(!p) return res.status(404).json({error:'Not found'}); Object.assign(p, req.body); writeData(d); res.json({ updated: p }); });

// Slider
app.get('/admin/api/slider', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); res.json({ slider: d.slider }); });
app.post('/admin/api/slider', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const item = { id:'s_'+Date.now(), url: req.body.url }; d.slider.push(item); writeData(d); res.json({ created: item }); });
app.put('/admin/api/slider/:idx', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const idx = parseInt(req.params.idx,10); if(isNaN(idx) || idx<0 || idx>= d.slider.length) return res.status(404).json({error:'Not found'}); d.slider[idx] = req.body.url || d.slider[idx]; writeData(d); res.json({ updated: d.slider[idx] }); });
app.delete('/admin/api/slider/:idx', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const idx = parseInt(req.params.idx,10); if(isNaN(idx) || idx<0 || idx>= d.slider.length) return res.status(404).json({error:'Not found'}); d.slider.splice(idx,1); writeData(d); res.json({ removed:true }); });

// Staff
app.get('/admin/api/staff', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); res.json({ staff: d.staff }); });
app.post('/admin/api/staff', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const item = { id:'staff_'+Date.now(), name:req.body.name, role:req.body.role, bio:req.body.bio, image:req.body.image }; d.staff.unshift(item); writeData(d); res.json({ created: item }); });
app.put('/admin/api/staff/:id', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const id = req.params.id; const idx = d.staff.findIndex(x=>x.id===id); if(idx<0) return res.status(404).json({error:'Not found'}); Object.assign(d.staff[idx], req.body); writeData(d); res.json({ updated: d.staff[idx] }); });
app.delete('/admin/api/staff/:id', authenticateToken, requireRoles(['SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); const id = req.params.id; const idx = d.staff.findIndex(x=>x.id===id); if(idx<0) return res.status(404).json({error:'Not found'}); d.staff.splice(idx,1); writeData(d); res.json({ removed:true }); });

// Announcements
app.get('/admin/api/announcements', authenticateToken, requireRoles(['ADMIN','SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); res.json({ announcements: d.announcements||[] }); });
app.post('/admin/api/announcements', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const item = { id:'anno_'+Date.now(), title:req.body.title, content:req.body.content, date: new Date().toISOString() }; d.announcements = d.announcements || []; d.announcements.unshift(item); writeData(d); res.json({ created: item }); });
app.put('/admin/api/announcements/:id', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const id = req.params.id; const a = (d.announcements||[]).find(x=>x.id===id); if(!a) return res.status(404).json({error:'Not found'}); Object.assign(a, req.body); writeData(d); res.json({ updated: a }); });
app.delete('/admin/api/announcements/:id', authenticateToken, requireRoles(['SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); const id = req.params.id; d.announcements = (d.announcements||[]).filter(x=>x.id!==id); writeData(d); res.json({ removed:true }); });

// Admissions
app.get('/admin/api/admissions', authenticateToken, requireRoles(['ADMIN','SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); res.json({ admissions: d.admissions||[] }); });
app.post('/admin/api/admissions', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const item = { id:'adm_'+Date.now(), name:req.body.name, email:req.body.email, status:req.body.status||'pending', date:new Date().toISOString() }; d.admissions.unshift(item); writeData(d); res.json({ created: item }); });
app.put('/admin/api/admissions/:id', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const id = req.params.id; const a = (d.admissions||[]).find(x=>x.id===id); if(!a) return res.status(404).json({error:'Not found'}); Object.assign(a, req.body); writeData(d); res.json({ updated: a }); });
app.delete('/admin/api/admissions/:id', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), (req,res)=>{ const d = readDataFallback(); const id = req.params.id; d.admissions = (d.admissions||[]).filter(x=>x.id!==id); writeData(d); res.json({ removed:true }); });

// Courses
app.get('/admin/api/courses', authenticateToken, requireRoles(['ADMIN','SUPERADMIN']), (req,res)=>{ if(useDB && prisma){ prisma.course.findMany().then(cs=>res.json({ courses: cs })); } else { const d = readDataFallback(); res.json({ courses: d.courses||[] }); } });
app.post('/admin/api/courses', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), async (req,res)=>{ if(useDB && prisma){ const c = await prisma.course.create({ data: { code:req.body.code, name:req.body.name, department:req.body.department, description:req.body.description } }).catch(()=>null); if(c) return res.json({ created: c }); return res.status(400).json({ error:'Could not create' }); } else { const d = readDataFallback(); const item = { id:'course_'+Date.now(), code:req.body.code, name:req.body.name, department:req.body.department, description:req.body.description }; d.courses = d.courses || []; d.courses.unshift(item); writeData(d); res.json({ created: item }); } });
app.put('/admin/api/courses/:id', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), async (req,res)=>{ if(useDB && prisma){ const id = req.params.id; const c = await prisma.course.update({ where:{ id }, data: { code:req.body.code, name:req.body.name, department:req.body.department, description:req.body.description } }).catch(()=>null); if(c) return res.json({ updated: c }); return res.status(404).json({error:'Not found'}); } else { const d = readDataFallback(); const id = req.params.id; const c = d.courses.find(x=>x.id===id); if(!c) return res.status(404).json({error:'Not found'}); Object.assign(c, req.body); writeData(d); res.json({ updated: c }); } });
app.delete('/admin/api/courses/:id', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), async (req,res)=>{ if(useDB && prisma){ await prisma.course.delete({ where:{ id:req.params.id } }).catch(()=>null); res.json({ removed:true }); } else { const d = readDataFallback(); const id = req.params.id; d.courses = (d.courses||[]).filter(x=>x.id!==id); writeData(d); res.json({ removed:true }); } });

// Departments
app.get('/admin/api/departments', authenticateToken, requireRoles(['ADMIN','SUPERADMIN']), (req,res)=>{ if(useDB && prisma){ prisma.department.findMany().then(ds=>res.json({ departments: ds })); } else { const d = readDataFallback(); res.json({ departments: d.departments||[] }); } });
app.post('/admin/api/departments', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), async (req,res)=>{ if(useDB && prisma){ const dpt = await prisma.department.create({ data: { name:req.body.name, description:req.body.description } }).catch(()=>null); if(dpt) return res.json({ created: dpt }); return res.status(400).json({error:'Could not create'}); } else { const d = readDataFallback(); const item = { id:'dept_'+Date.now(), name:req.body.name, description:req.body.description }; d.departments = d.departments || []; d.departments.unshift(item); writeData(d); res.json({ created: item }); } });
app.put('/admin/api/departments/:id', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), async (req,res)=>{ if(useDB && prisma){ const id = req.params.id; const dep = await prisma.department.update({ where:{ id }, data: { name:req.body.name, description:req.body.description } }).catch(()=>null); if(dep) return res.json({ updated: dep }); return res.status(404).json({error:'Not found'}); } else { const d = readDataFallback(); const id = req.params.id; const dep = d.departments.find(x=>x.id===id); if(!dep) return res.status(404).json({error:'Not found'}); Object.assign(dep, req.body); writeData(d); res.json({ updated: dep }); } });
app.delete('/admin/api/departments/:id', authenticateToken, requireRoles(['SUPERADMIN']), async (req,res)=>{ if(useDB && prisma){ await prisma.department.delete({ where:{ id:req.params.id } }).catch(()=>null); res.json({ removed:true }); } else { const d = readDataFallback(); const id = req.params.id; d.departments = (d.departments||[]).filter(x=>x.id!==id); writeData(d); res.json({ removed:true }); } });

// Classes
app.get('/admin/api/classes', authenticateToken, requireRoles(['ADMIN','SUPERADMIN']), (req,res)=>{ if(useDB && prisma){ prisma.class.findMany().then(cs=>res.json({ classes: cs })); } else { const d = readDataFallback(); res.json({ classes: d.classes||[] }); } });
app.post('/admin/api/classes', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), async (req,res)=>{ if(useDB && prisma){ const c = await prisma.class.create({ data: { courseId:req.body.courseId, teacher:req.body.teacher, schedule:req.body.schedule, room:req.body.room } }).catch(()=>null); if(c) return res.json({ created: c }); return res.status(400).json({error:'Could not create'}); } else { const d = readDataFallback(); const item = { id:'class_'+Date.now(), courseId:req.body.courseId, teacher:req.body.teacher, schedule:req.body.schedule, room:req.body.room }; d.classes = d.classes || []; d.classes.unshift(item); writeData(d); res.json({ created: item }); } });
app.put('/admin/api/classes/:id', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), async (req,res)=>{ if(useDB && prisma){ const id = req.params.id; const c = await prisma.class.update({ where:{ id }, data: { courseId:req.body.courseId, teacher:req.body.teacher, schedule:req.body.schedule, room:req.body.room } }).catch(()=>null); if(c) return res.json({ updated: c }); return res.status(404).json({error:'Not found'}); } else { const d = readDataFallback(); const id = req.params.id; const cl = d.classes.find(x=>x.id===id); if(!cl) return res.status(404).json({error:'Not found'}); Object.assign(cl, req.body); writeData(d); res.json({ updated: cl }); } });
app.delete('/admin/api/classes/:id', authenticateToken, requireRoles(['SUPERADMIN','ADMIN']), async (req,res)=>{ if(useDB && prisma){ await prisma.class.delete({ where:{ id:req.params.id } }).catch(()=>null); res.json({ removed:true }); } else { const d = readDataFallback(); const id = req.params.id; d.classes = (d.classes||[]).filter(x=>x.id!==id); writeData(d); res.json({ removed:true }); } });

// Attendance
app.get('/admin/api/attendance', authenticateToken, requireRoles(['ADMIN','TEACHER','SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); res.json({ attendance: d.attendance||[] }); });
app.post('/admin/api/attendance', authenticateToken, requireRoles(['ADMIN','TEACHER','SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); const item = { id:'att_'+Date.now(), studentId:req.body.studentId, date:req.body.date || new Date().toISOString(), status:req.body.status || 'present' }; d.attendance = d.attendance || []; d.attendance.unshift(item); writeData(d); res.json({ created: item }); });
app.put('/admin/api/attendance/:id', authenticateToken, requireRoles(['ADMIN','TEACHER','SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); const id = req.params.id; const a = (d.attendance||[]).find(x=>x.id===id); if(!a) return res.status(404).json({error:'Not found'}); Object.assign(a, req.body); writeData(d); res.json({ updated: a }); });
app.delete('/admin/api/attendance/:id', authenticateToken, requireRoles(['ADMIN','TEACHER','SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); const id = req.params.id; d.attendance = (d.attendance||[]).filter(x=>x.id!==id); writeData(d); res.json({ removed:true }); });

// Grades
app.get('/admin/api/grades', authenticateToken, requireRoles(['TEACHER','ADMIN','SUPERADMIN']), (req,res)=>{ if(useDB && prisma){ prisma.grade.findMany().then(gs=>res.json({ grades: gs })); } else { const d = readDataFallback(); res.json({ grades: d.grades||[] }); } });
app.post('/admin/api/grades', authenticateToken, requireRoles(['TEACHER','ADMIN','SUPERADMIN']), async (req,res)=>{ if(useDB && prisma){ const g = await prisma.grade.create({ data: { studentId:req.body.studentId, courseId:req.body.courseId, score:req.body.score, subject:req.body.subject, max:req.body.max } }).catch(()=>null); if(g) return res.json({ created: g }); return res.status(400).json({error:'Could not create'}); } else { const d = readDataFallback(); const item = { id:'grade_'+Date.now(), studentId:req.body.studentId, courseId:req.body.courseId, score:req.body.score, max:req.body.max||100, subject:req.body.subject||'' }; d.grades = d.grades || []; d.grades.unshift(item); writeData(d); res.json({ created: item }); } });
app.put('/admin/api/grades/:id', authenticateToken, requireRoles(['TEACHER','ADMIN','SUPERADMIN']), async (req,res)=>{ if(useDB && prisma){ const id = req.params.id; const g = await prisma.grade.update({ where:{ id }, data: { score:req.body.score, max:req.body.max, subject:req.body.subject } }).catch(()=>null); if(g) return res.json({ updated: g }); return res.status(404).json({error:'Not found'}); } else { const d = readDataFallback(); const id = req.params.id; const g = d.grades.find(x=>x.id===id); if(!g) return res.status(404).json({error:'Not found'}); Object.assign(g, req.body); writeData(d); res.json({ updated: g }); } });
app.delete('/admin/api/grades/:id', authenticateToken, requireRoles(['TEACHER','ADMIN','SUPERADMIN']), async (req,res)=>{ if(useDB && prisma){ await prisma.grade.delete({ where:{ id:req.params.id } }).catch(()=>null); res.json({ removed:true }); } else { const d = readDataFallback(); const id = req.params.id; d.grades = (d.grades||[]).filter(x=>x.id!==id); writeData(d); res.json({ removed:true }); } });

// Notifications
app.get('/admin/api/notifications', authenticateToken, requireRoles(['ADMIN','SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); res.json({ notifications: d.notifications||[] }); });
app.post('/admin/api/notifications', authenticateToken, requireRoles(['ADMIN','SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); const item = { id:'note_'+Date.now(), message:req.body.message, date: new Date().toISOString(), read:false }; d.notifications = d.notifications || []; d.notifications.unshift(item); writeData(d); res.json({ created: item }); });
app.put('/admin/api/notifications/:id', authenticateToken, requireRoles(['ADMIN','SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); const id = req.params.id; const n = (d.notifications||[]).find(x=>x.id===id); if(!n) return res.status(404).json({error:'Not found'}); Object.assign(n, req.body); writeData(d); res.json({ updated: n }); });
app.delete('/admin/api/notifications/:id', authenticateToken, requireRoles(['ADMIN','SUPERADMIN']), (req,res)=>{ const d = readDataFallback(); const id = req.params.id; d.notifications = (d.notifications||[]).filter(x=>x.id!==id); writeData(d); res.json({ removed:true }); });

// Messages
app.get('/admin/api/messages', authenticateToken, requireRoles(['ADMIN','SUPERADMIN','TEACHER']), (req,res)=>{ const d = readDataFallback(); res.json({ messages: d.messages||[] }); });
app.post('/admin/api/messages', authenticateToken, requireRoles(['ADMIN','SUPERADMIN','TEACHER']), (req,res)=>{ const d = readDataFallback(); const item = { id:'msg_'+Date.now(), from:req.body.from, to:req.body.to, text:req.body.text, date:new Date().toISOString() }; d.messages = d.messages || []; d.messages.unshift(item); writeData(d); res.json({ created: item }); });

// Analytics
app.get('/admin/api/analytics', authenticateToken, requireRoles(['ADMIN','SUPERADMIN']), (req,res)=>{ res.json({ totalUsers: 1200, active: 980, newThisMonth: 120 }); });

// Export/Import
app.get('/admin/api/export', authenticateToken, requireRoles(['SUPERADMIN']), async (req,res)=>{ if(useDB && prisma){ const pages = await prisma.page.findMany(); const staff = await prisma.staff.findMany(); res.json({ pages, staff }); } else { res.json(readDataFallback()); } });
app.post('/admin/api/import', authenticateToken, requireRoles(['SUPERADMIN']), (req,res)=>{ const d = req.body; if(!d) return res.status(400).json({error:'No data'}); // Simple import into JSON path
  const dataPath = path.join(__dirname, 'data','db.json'); fs.writeFileSync(dataPath, JSON.stringify(d,null,2)); res.json({ imported:true }); });

app.listen(PORT, ()=>{ console.log('Admin API listening on http://localhost:' + PORT); });
