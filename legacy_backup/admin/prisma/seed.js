const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main(){
  await prisma.$connect();
  // create default admin user
  const pass = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({ where: { username: 'superadmin' }, update: {}, create: { username: 'superadmin', password: pass, role: 'SUPERADMIN' } });
  // seed a couple of pages
  await prisma.page.upsert({ where: { slug: 'index' }, update: {}, create: { slug:'index', title:'Home', content:'Welcome to the premium tech school.' } });
  await prisma.page.upsert({ where: { slug: 'about' }, update: {}, create: { slug:'about', title:'About', content:'DPS Keoti - a modern tech school.' } });
  // seed slider
  await prisma.slider.upsert({ where: { id: 'slider1' }, update: {}, create: { id: 'slider1', url: '/images/slider1.jpg' } }).catch(()=>{});
  // seed staff
  await prisma.staff.upsert({ where: { id: 'staff-chair' }, update: {}, create: { id:'staff-chair', name:'Chairman', role:'Chairman', bio:'', image:'/images/chairman.jpg' } }).catch(()=>{});
  await prisma.staff.upsert({ where: { id: 'staff-principal' }, update: {}, create: { id:'staff-principal', name:'Principal', role:'Principal', bio:'', image:'/images/principal.jpg' } }).catch(()=>{});
  // close
  await prisma.$disconnect();
}
main().catch(async (e)=>{ console.error(e); try{ await prisma.$disconnect(); }catch(_){} });
