# API Design — CTBC Landing Page

Three endpoints back the dynamic sections of the landing page. The frontend
is built against these contracts via `src/api/mockApi.js`, so swapping the
mocks for real `fetch()` calls later is a one-file change — no component
needs to be touched.

Envelope convention used everywhere (same shape as the dashboard example):

```json
{ "status": "success", "data": { ... } }
```

On failure:

```json
{ "status": "error", "error": { "code": "STRING_CODE", "message": "Human readable message" } }
```

---

## 1. `GET /api/v1/landing/hero`

Drives the hero carousel. Pulled into its own endpoint (instead of bundling
it with rates/news) because marketing/CMS teams update hero copy and slides
independently and far more often than the rest of the page — this endpoint
is the one most likely to be backed by a CMS rather than a database table.

**Request**
```
GET /api/v1/landing/hero
```

**Response**
```json
{
  "status": "success",
  "data": {
    "slides": [
      {
        "id": "gold-class",
        "eyebrow": null,
        "title": "Experience Exclusive Privileges While Growing Your Funds.",
        "subtitle": "Enjoy priority service and exciting perks with CTBC Bank's Premier Gold Class.",
        "cta": { "label": "Open Account", "href": "/personal/open-account" },
        "image": "/assets/hero-gold-class.jpg"
      }
    ],
    "active_index": 0
  }
}
```

Design notes:
- `slides` is an array (not a single object) so the carousel supports
  multiple banners without an API shape change.
- `cta` is structured (`label` + `href`) instead of a flat string so the
  frontend never hardcodes a destination URL.

---

## 2. `GET /api/v1/landing/market-rates`

Drives two UI surfaces that both need the *same underlying data* at
different granularity: the slim FX ticker strip, and the detailed
"Today's Rates" panel + tenor table. One endpoint, one source of truth —
avoids the ticker and the table ever showing different numbers.

**Request**
```
GET /api/v1/landing/market-rates
```

**Response (trimmed)**
```json
{
  "status": "success",
  "data": {
    "as_of": "2026-05-19T14:00:00+08:00",
    "ticker": {
      "usd_php_buy":  { "value": 59.37,  "direction": "down" },
      "usd_php_sell": { "value": 59.77,  "direction": "up" },
      "pds_wtd_avg":  { "value": 59.793, "direction": "up" },
      "php_td_1y":    { "value": 2.55,   "direction": "up" },
      "usd_td_1y":    { "value": 2.65,   "direction": "up" }
    },
    "headline_rate": {
      "pair": "USD/PHP",
      "type": "Sell Rate",
      "value": 59.77,
      "currency": "PHP",
      "buy": 59.793,
      "php_td_1y": 2.55,
      "usd_td_1y": 2.65
    },
    "tenor_table": {
      "as_of": "19 MAY 2026",
      "note": "INDICATIVE",
      "columns": ["0-89D", "90-179D", "180-359D", "360+D"],
      "currencies": {
        "peso": [
          { "tier": "1K - 49K", "rates": [0.500, 0.613, 0.500, 0.775] }
        ],
        "usd": []
      }
    }
  }
}
```

Design notes:
- `direction` (`"up" | "down"`) is precomputed server-side rather than left
  for the frontend to diff against a previous value — keeps "is this rate
  up or down today" as a single source of truth instead of two systems
  agreeing by coincidence.
- `tenor_table.columns` is returned explicitly so the table renders
  correctly even if the bank changes its tenor brackets — the frontend
  never hardcodes column headers.
- `currencies` is keyed by currency (`peso`, `usd`) so the Peso/USD tabs in
  the UI map directly onto response keys with no transform step.

---

## 3. `GET /api/v1/landing/news?limit=4`

Drives the "Latest from CTBC Philippines" grid.

**Request**
```
GET /api/v1/landing/news?limit=4&cursor=eyJvZmZzZXQiOjB9
```

| Param  | Type   | Required | Notes                                  |
|--------|--------|----------|-----------------------------------------|
| limit  | int    | no (default 4) | Caps payload size for the landing page |
| cursor | string | no       | Opaque cursor for pagination            |

**Response**
```json
{
  "status": "success",
  "data": {
    "articles": [
      {
        "id": "milestone-2026-03-18-1",
        "tag": "MILESTONE",
        "published_at": "2026-03-18",
        "title": "CTBC Bank Marks Three Decades of Growth, Honors Partners and Clients with Appreciation Dinner.",
        "thumbnail": "/assets/news-anniversary.jpg",
        "href": "/news/milestone-2026-03-18-1"
      }
    ],
    "pagination": {
      "limit": 4,
      "next_cursor": "eyJvZmZzZXQiOjR9",
      "browse_all_href": "/news"
    }
  }
}
```

Design notes:
- Cursor-based (not page-number) pagination — safe if articles are added
  between requests, and is reused as-is by a future full `/news` index page.
- `limit` defaults to what the landing page needs (4) so the landing page
  and a future news listing page share one endpoint instead of forking it.
- `next_cursor: null` is the explicit "no more pages" signal, instead of
  the frontend guessing from array length.

---

## Why 3 endpoints and not 1

A single `/landing/summary` endpoint would be simpler to call, but it would
mean:
- the hero (edited often, by marketing) and rates (refreshed intraday by a
  market-data feed) would invalidate the same cache together, on the
  wrong schedule for both;
- the news list couldn't be reused by a future `/news` page without
  splitting the response apart later anyway.

Splitting along **update frequency and reuse boundary** up front avoids a
breaking change later, at the cost of 2 extra requests on first load —
an acceptable trade for a marketing landing page.
