# Token values API

HTTP service that returns the **latest scraped price** for a symbol from MongoDB (`crypto_prices.token_prices`).

## Endpoint

`GET /:symbol` → latest price document (404 if none)

Example: `GET http://localhost:3003/BTC`

## Run (local)

```bash
npm install
npm run start:dev
```

Requires MongoDB with prices written by `12-scraper`.
