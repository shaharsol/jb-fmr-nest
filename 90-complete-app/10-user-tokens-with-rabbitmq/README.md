# User tokens service (+ RabbitMQ)

Same as `09-user-tokens`, plus: when a user follows a **symbol that no one has followed before**, the service publishes a RabbitMQ event so a scraper worker can start tracking that symbol.

## Prerequisites

1. Auth app (`07-auth-app` on port 3000).
2. MySQL on port **3307** (`user_tokens` DB).
3. RabbitMQ on port **5672** (already common via Docker):

```bash
docker run -d --name rabbitmq \
  -p 5672:5672 -p 15672:15672 \
  rabbitmq:3-management
```

## Behavior

`POST /tokens` with `{ "symbol": "BTC" }`:

1. Saves the follow row for the current user (409 if they already follow it).
2. If `BTC` did **not** exist in `followed_tokens` for any user → emit:

```json
{ "pattern": "token.distinct", "data": { "symbol": "BTC" } }
```

to queue `distinct_tokens` (configurable via `RABBITMQ_QUEUE`).

A later worker can consume with Nest:

```ts
@EventPattern('token.distinct')
handleDistinctToken(data: { symbol: string }) { /* add to scrape list */ }
```

using the same queue name.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/tokens` | Bearer JWT | Follow a symbol; may publish `token.distinct` |
| `GET` | `/tokens` | Bearer JWT | List symbols the current user follows |

## Run

```bash
npm install
npm run start:dev
```

Default port: **3002**. Management UI: http://localhost:15672 (guest/guest).



docker run --name mysql_user_tokens -d -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=user_tokens -e MYSQL_TCP_PORT=3306 -p 3307:3306 mysql:latest

docker run --name mysql_distinct_tokens -d -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=distinct_tokens -e MYSQL_TCP_PORT=3306 -p 3308:3306 mysql:latest

docker run -d --name mongodb -p 27017:27017 mongo:latest