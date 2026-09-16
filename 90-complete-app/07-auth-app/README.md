# Auth service

NestJS auth microservice for email/password signup & login, issuing JWTs for a React/Express client and validating those tokens for other microservices.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/auth/signup` | — | Register with email/password; returns JWT + user |
| `POST` | `/auth/login` | — | Login with email/password; returns JWT + user |
| `GET` | `/auth/me` | Bearer JWT | Validate token; returns user (for microservices/clients) |

## Setup

1. Ensure MySQL is running and database `cryptoapp` exists.
2. Copy/adjust `.env.development` if needed.
3. Install & run:

```bash
npm install
npm run start:dev
```

## Example

```bash
# Signup
curl -X POST http://localhost:3000/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"secret1"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"secret1"}'

# Validate JWT (for other services)
curl http://localhost:3000/auth/me \
  -H 'Authorization: Bearer <access_token>'
```


docker run --name mysql_auth -d -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=auth -e MYSQL_TCP_PORT=3306 -p 3306:3306 mysql:latest