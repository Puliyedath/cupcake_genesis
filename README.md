# Cupcakes Application

This is a Remix application with a PostgreSQL database running in Docker containers.

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js and npm (for local development)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=cupcakes
HOST_PORT=3000
HOST_DB_PORT=5432
```

You can modify these values according to your needs.

## Running the Application

1. Start the application and database:

```bash
docker-compose build
docker-compose up -d
```

This will:
- Start the PostgreSQL database
- Run database migrations
- Seed the database with initial data
- Start the Remix application in development mode

2. Access the application:
- The application will be available at `http://localhost:3000`

## Development Workflow

- The application code is mounted as a volume, so changes to your code will trigger hot reloading
- To stop the application, run `docker-compose down`

```

