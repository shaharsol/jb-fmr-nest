# Scraper worker

Background Nest worker (no HTTP). Every `SCRAPE_INTERVAL_MS` (default **60s**):

1. Reads all rows from MySQL `distinct_tokens` (port **3308**, same DB as `11-distinct-tokens`)
2. Scrapes each symbol from [Google Finance](https://www.google.com/finance/beta/quote/BTC-USD) (`{symbol}-USD`)
3. Appends a document to MongoDB `crypto_prices.token_prices` on `localhost:27017`

## Prerequisites

- MySQL distinct tokens DB on 3308
- MongoDB:

```bash
docker run -d --name mongodb -p 27017:27017 mongo:7
```

## Run

```bash
npm install
npm run start:dev
```

## Config (`.env.development`)

| Variable | Default |
|----------|---------|
| `SCRAPE_INTERVAL_MS` | `60000` |
| `DB_PORT` | `3308` |
| `MONGODB_URI` | `mongodb://localhost:27017/crypto_prices` |
| `GOOGLE_FINANCE_QUOTE_URL` | `https://www.google.com/finance/beta/quote/{symbol}-USD` |

## Verify Mongo

```bash
docker exec mongodb mongosh crypto_prices --quiet --eval 'db.token_prices.find().sort({scrapedAt:-1}).limit(5)'
```
