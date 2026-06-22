/**
 * mockApi.js
 * ---------------------------------------------------------------------------
 * Frontend-only mock of the 3 endpoints this landing page would consume.
 * Each function simulates a network round trip (latency + envelope) so the
 * UI layer is written exactly as if it were calling a real REST API.
 *
 * Response envelope convention (matches the dashboard example you sent):
 *   { status: "success" | "error", data: { ... } }
 *
 * Full endpoint contracts are documented in API_DESIGN.md at the repo root.
 * ---------------------------------------------------------------------------
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /api/v1/landing/hero
 * Drives the hero carousel. A CMS would let marketing rotate slides without
 * a frontend deploy, so each slide is fully self-contained.
 */
export async function getHero() {
  await delay(250);
  return {
    status: 'success',
    data: {
      slides: [
        {
          id: 'gold-class',
          eyebrow: null,
          title: 'Experience Exclusive Privileges While Growing Your Funds.',
          subtitle: "Enjoy priority service and exciting perks with CTBC Bank's Premier Gold Class.",
          cta: { label: 'Open Account', href: '/personal/open-account' },
          image: '/assets/hero-gold-class.jpg',
        },
      ],
      active_index: 0,
    },
  };
}

/**
 * GET /api/v1/landing/market-rates
 * Drives the FX ticker strip and the "Today's Rates" panel + tenor table.
 * Separated from /hero because rates refresh on a much shorter cadence
 * (intraday) and are reused on other pages (e.g. the rates page itself).
 */
export async function getMarketRates() {
  await delay(300);
  return {
    status: 'success',
    data: {
      as_of: '2026-05-19T14:00:00+08:00',
      ticker: {
        usd_php_buy: { value: 59.37, direction: 'down' },
        usd_php_sell: { value: 59.77, direction: 'up' },
        pds_wtd_avg: { value: 59.793, direction: 'up' },
        php_td_1y: { value: 2.55, direction: 'up' },
        usd_td_1y: { value: 2.65, direction: 'up' },
      },
      headline_rate: {
        pair: 'USD/PHP',
        type: 'Sell Rate',
        value: 59.77,
        currency: 'PHP',
        buy: 59.793,
        php_td_1y: 2.55,
        usd_td_1y: 2.65,
      },
      tenor_table: {
        as_of: '19 MAY 2026',
        note: 'INDICATIVE',
        columns: ['0-89D', '90-179D', '180-359D', '360+D'],
        currencies: {
          peso: [
            { tier: '1K - 49K', rates: [0.5, 0.613, 0.5, 0.775] },
            { tier: '50K - 249K', rates: [1.0, 1.0, 0.7, 1.15] },
            { tier: '250K - 499K', rates: [1.5, 1.613, 1.75, 2.25] },
            { tier: '500K - 1,999K', rates: [2.25, 3.0, 1.75, 2.35] },
            { tier: '2M - 4,999M', rates: [2.55, 3.125, 1.75, 2.45] },
            { tier: '5M and up', rates: [3.2, 3.2, 2.15, 2.55] },
          ],
          usd: [],
        },
      },
    },
  };
}

/**
 * GET /api/v1/landing/news?limit=4
 * Drives the "Latest from CTBC Philippines" grid. Paginated server-side via
 * `limit` + `cursor` so the landing page only ever pulls the slice it shows,
 * while a future /news index page can reuse the same endpoint.
 */
export async function getNews({ limit = 4 } = {}) {
  await delay(280);
  const allArticles = Array.from({ length: limit }).map((_, i) => ({
    id: `milestone-2026-03-18-${i + 1}`,
    tag: 'MILESTONE',
    published_at: '2026-03-18',
    title: 'CTBC Bank Marks Three Decades of Growth, Honors Partners and Clients with Appreciation Dinner.',
    thumbnail: '/assets/news-anniversary.jpg',
    href: `/news/milestone-2026-03-18-${i + 1}`,
  }));

  return {
    status: 'success',
    data: {
      articles: allArticles,
      pagination: {
        limit,
        next_cursor: allArticles.length === limit ? 'eyJvZmZzZXQiOjR9' : null,
        browse_all_href: '/news',
      },
    },
  };
}
