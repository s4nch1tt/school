#!/usr/bin/env bash
set -euo pipefail
echo "Starting production-like deployment (Docker Compose) for DPS Keoti Admin..."
docker-compose up -d --build
echo "Deployment initiated. Check services with 'docker-compose ps'. Logs with 'docker-compose logs -f api'."
