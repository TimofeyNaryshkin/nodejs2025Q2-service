# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- [Docker](https://www.docker.com/)
## Downloading

```
git clone {repository URL}
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
| DB_PORT | Database port | 5432 |
| POSTGRES_USER | Database user | postgres |
| POSTGRES_PASSWORD | Database password | postgres |
| POSTGRES_DB | Database name | mydb |
| DATABASE_URL | Full database connection string | - |

## Running with Docker

```bash
docker-compose up --build --watch
```

## Stop containers

```bash
docker-compose down
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

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

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

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
