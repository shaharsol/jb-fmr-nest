# Complete cryptoapp stack

Docker Compose runs all microservices plus their dependencies.

## Services

| Service | Role | Host port |
|---------|------|-----------|
| `auth-app` | Signup / login / JWT validate | **3000** |
| `user-tokens` | Follow tokens; publishes new symbols to RabbitMQ | **3002** |
| `token-values` | Latest scraped price for a symbol | **3003** |
| `distinct-tokens` | Consumes `token.distinct`, stores symbols in MySQL | — |
| `scraper` | Polls distinct symbols, scrapes Google Finance → MongoDB | — |
| `mysql-auth` | Auth DB | 3306 |
| `mysql-user-tokens` | Follows DB | 3307 |
| `mysql-distinct-tokens` | Distinct symbols DB | 3308 |
| `rabbitmq` | Queue (+ management UI) | 5672 / **15672** |
| `mongodb` | Scraped prices | 27017 |

## Run

```bash
cd 99-complete
docker compose up --build -d
docker compose ps
docker compose logs -f auth-app user-tokens distinct-tokens scraper
```

Stop:

```bash
docker compose down
```

## Smoke test

```bash
# Signup
curl -s -X POST http://localhost:3000/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"demo@example.com","password":"secret1"}'

# Login
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"demo@example.com","password":"secret1"}' \
  | node -pe 'JSON.parse(fs.readFileSync(0,"utf8")).access_token')

# Follow a new symbol (publishes to RabbitMQ → distinct-tokens worker)
curl -s -X POST http://localhost:3002/tokens \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"symbol":"BTC"}'

# Distinct DB (after worker consumes)
docker compose exec mysql-distinct-tokens \
  mysql -uroot -e "SELECT * FROM distinct_tokens.distinct_tokens;"

# Prices (after scraper interval, default 60s)
curl -s http://localhost:3003/BTC

# Or via mongosh
docker compose exec mongodb \
  mongosh crypto_prices --quiet --eval 'db.token_prices.find().sort({scrapedAt:-1}).limit(3)'
```

RabbitMQ UI: http://localhost:15672 (guest / guest)
