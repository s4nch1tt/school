Deployment guide (Docker Compose)

Prereqs:
- Docker

1) Build and run
- From repo root, navigate to admin/
- docker-compose up -d --build

2) DB initialization
- The Postgres container starts with a fresh DB (dps_keoti)
- If needed, exec into DB to run migrations: 
  docker-compose exec db psql -U dps -d dps_keoti
  Then run Prisma migrations inside the API container or manage migrations in a separate step

3) Run DB migrations (optional)
- You can run Prisma migrations by booting with DB and then running inside container:
  docker-compose exec api sh -lc "npx prisma migrate dev --name init" 
  (Ensure Prisma is installed in the image or run npm install)

4) Access
- Admin API: http://localhost:3001/admin/api
- UI: http://localhost:3001 (same server serves UI)

Notes:
- For production, replace JWT secret with a strong value and consider Clerk/Auth0 for authentication
- Update DATABASE_URL to point to your DB in production
