# Home Library Service

## ⚡ Quick Start (For Reviewers)
```bash
git clone {repository URL}
cd {repository-name}
git checkout feat/Containerization_Docker_Database_ORM
cp .env.example .env
docker-compose up -d && sleep 10 && docker-compose exec app npx prisma migrate deploy
npm install && npx prisma generate
npm run test:auth
```

Access: http://localhost:4000 | Swagger: http://localhost:4000/doc

---

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- [Docker](https://www.docker.com/)

## Downloading
```
git clone https://github.com/TimofeyNaryshkin/nodejs2025Q2-service.git
```

## Switching branch
```
git checkout feat/Containerization_Docker_Database_ORM
```

## Create environment file
```
cp .env.example .env
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Application port | 4000 |
| NODE_ENV | Environment (development/production/test) | development |
| **Database** | | |
| DB_PORT | Database port | 5432 |
| POSTGRES_USER | Database user | postgres |
| POSTGRES_PASSWORD | Database password | postgres |
| POSTGRES_DB | Database name | mydb |
| DATABASE_URL | Full database connection string | postgresql://postgres:postgres@db:5432/mydb?schema=public |
| **JWT Authentication** | | |
| JWT_SECRET_KEY | Secret key for access tokens | your-secret-key-change-in-production |
| JWT_SECRET_REFRESH_KEY | Secret key for refresh tokens | your-refresh-secret-key-change-in-production |
| TOKEN_EXPIRE_TIME | Access token expiration time | 15m |
| TOKEN_REFRESH_EXPIRE_TIME | Refresh token expiration time | 7d |
| **Logging** | | |
| LOG_LEVEL | Logging level (fatal/error/warn/log/debug/verbose) | log |
| LOG_MAX_SIZE_KB | Maximum log file size in kilobytes | 1024 |

**Note:** 
- For Docker: Use `DATABASE_URL="postgresql://postgres:postgres@db:5432/mydb?schema=public"`
- For Local PostgreSQL: Use `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"`

## Installing Dependencies
```bash
npm install
```

## Prisma Setup

Generate Prisma Client (required before running the app):
```bash
npx prisma generate
```

Apply database migrations:
```bash
npx prisma migrate deploy
```

(Optional) Open Prisma Studio to view database:
```bash
npx prisma studio
```

---

## Running with Docker

**Start containers:**
```bash
docker-compose up -d
```

**Wait for database to initialize and apply migrations:**
```bash
# Wait 10 seconds for PostgreSQL to start
sleep 10

# Apply Prisma migrations inside container
docker-compose exec app npx prisma migrate deploy
```

**Check application logs:**
```bash
docker-compose logs -f app
```

**One-line command:**
```bash
docker-compose up -d && sleep 10 && docker-compose exec app npx prisma migrate deploy
```

Application: http://localhost:4000  
Swagger: http://localhost:4000/doc

**Stop containers:**
```bash
docker-compose down
```

**Remove volumes (clean database):**
```bash
docker-compose down -v
```

---

## Running Locally (Without Docker)

### Prerequisites
- PostgreSQL 16+ installed and running on your system

### Steps

**1. Start PostgreSQL service**

Ensure PostgreSQL is running:
- **Windows:** PostgreSQL service starts automatically
- **macOS:** `brew services start postgresql`
- **Linux:** `sudo service postgresql start`

**2. Update .env file**

Change `DATABASE_URL` to use `localhost`:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/mydb?schema=public"
```
Replace `POSTGRES_PASSWORD` with your PostgreSQL password.

**3. Run Prisma migrations (will create database if needed)**
```bash
npx prisma migrate dev
```

**4. Start the application**
```bash
npm run start:dev
```

Application: http://localhost:4000  
Swagger: http://localhost:4000/doc

---

## Vulnerability Scanning
```bash
npm run docker:scan:app
npm run docker:scan:db
```

## Docker Hub

Images are available at:

- App: `timofeinaryshkin/home-library-app`
- Database: `timofeinaryshkin/home-library-db`

### Pull and run from Docker Hub
```bash
docker pull timofeinaryshkin/home-library-app:latest
docker pull timofeinaryshkin/home-library-db:latest
```

---

## Testing

After application running open new terminal and enter:

To run all tests without authorization:
```
npm run test
```

To run only one of all test suites:
```
npm run test -- <path to suite>
```

To run all tests with authorization:
```
npm run test:auth
```

To run only specific test suite with authorization:
```
npm run test:auth -- <path to suite>
```

### Auto-fix and format
```
npm run lint
```
```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
