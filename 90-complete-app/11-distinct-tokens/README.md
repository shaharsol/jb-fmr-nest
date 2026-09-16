# Distinct tokens worker

NestJS **RabbitMQ consumer** (no HTTP). Listens for `token.distinct` events from `10-user-tokens-with-rabbitmq` and stores new symbols in MySQL for later scraping.

## Prerequisites

1. RabbitMQ on `5672` (same queue as the publisher: `distinct_tokens`).
2. MySQL on **3308**:

```bash
docker run -d --name mysql_distinct_tokens \
  -e MYSQL_ALLOW_EMPTY_PASSWORD=yes \
  -e MYSQL_DATABASE=distinct_tokens \
  -p 3308:3306 \
  mysql:8.0
```

## Flow

```
10-user-tokens  --emit token.distinct-->  RabbitMQ (distinct_tokens)
                                              |
                                              v
                                    11-distinct-tokens worker
                                              |
                                              v
                                    MySQL :3308 / distinct_tokens
```

## Run

```bash
npm install
npm run start:dev
```

On consume it inserts into table `distinct_tokens` (`id`, `symbol` unique, `createdAt`). Duplicate symbols are skipped.

## Verify

```bash
# queue depth (should drop after worker runs)
docker exec rabbitmq rabbitmqctl list_queues name messages

# rows in DB
docker exec mysql_distinct_tokens mysql -uroot -e "SELECT * FROM distinct_tokens.distinct_tokens;"
```
