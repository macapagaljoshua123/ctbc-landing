const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /api/v1/landing/hero
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
          image: '', 
        },
        {
          id: 'slide-2',
          eyebrow: null,
          title: 'Placeholder Title — Slide 2',
          subtitle: 'Placeholder subtitle copy for the second hero banner.',
          cta: { label: 'Open Account', href: '/personal/open-account' },
          image: '',
        },
        {
          id: 'slide-3',
          eyebrow: null,
          title: 'Placeholder Title — Slide 3',
          subtitle: 'Placeholder subtitle copy for the third hero banner.',
          cta: { label: 'Open Account', href: '/personal/open-account' },
          image: '',
        },
        {
          id: 'slide-4',
          eyebrow: null,
          title: 'Placeholder Title — Slide 4',
          subtitle: 'Placeholder subtitle copy for the fourth hero banner.',
          cta: { label: 'Open Account', href: '/personal/open-account' },
          image: '',
        },
        {
          id: 'slide-5',
          eyebrow: null,
          title: 'Placeholder Title — Slide 5',
          subtitle: 'Placeholder subtitle copy for the fifth hero banner.',
          cta: { label: 'Open Account', href: '/personal/open-account' },
          image: '',
        },
      ],
      active_index: 0,
    },
  };
}

/**
 * GET /api/v1/landing/market-rates
 */
export async function getMarketRates() {
  await delay(300);
  return {
    status: 'success',
    data: {
      as_of: '2026-05-19T14:00:00+08:00',
      ticker: {
        usd_php_buy: { value: 59.37, direction: 'down', change: -0.04 },
        usd_php_sell: { value: 59.77, direction: 'up', change: -0.04 },
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
            { tier: '1K – 49K', rates: [0.5, 0.613, 0.5, 0.775] },
            { tier: '50K – 249K', rates: [1.0, 1.613, 0.7, 1.15] },
            { tier: '250K – 499K', rates: [1.5, 1.613, 1.75, 2.25] },
            { tier: '500K – 1.999M', rates: [2.25, 3.0, 1.75, 2.35] }, 
            { tier: '2M – 4.999M', rates: [2.55, 3.125, 1.75, 2.45] },
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
 */
export async function getNews({ limit = 4 } = {}) {
  await delay(280);

  const ARTICLES = [
    {
      id: 'milestone-2026-03-18-1',
      tag: 'MILESTONE',
      published_at: '2026-03-18',
      title: 'CTBC Bank Marks Three Decades of Growth, Honors Partners and Clients with Appreciation Dinner.',
      thumbnail: '/assets/news-anniversary.jpg',
      href: '/news/milestone-2026-03-18-1',
    },
    {
      id: 'advisory-2026-04-02-1',
      tag: 'CLIENT ADVISORY',
      published_at: '2026-04-02',
      title: 'CTBC Bank Reminds Clients to Stay Vigilant Against Phishing and Smishing Scams.',
      thumbnail: '/assets/news-advisory.jpg',
      href: '/news/advisory-2026-04-02-1',
    },
    {
      id: 'csr-2026-02-14-1',
      tag: 'CSR',
      published_at: '2026-02-14',
      title: 'CTBC Bank Foundation Launches Financial Literacy Program for Public School Teachers.',
      thumbnail: '/assets/news-csr.jpg',
      href: '/news/csr-2026-02-14-1',
    },
    {
      id: 'product-2026-01-20-1',
      tag: 'PRODUCT UPDATE',
      published_at: '2026-01-20',
      title: 'CTBC Bank Launches Enhanced NetBanking Experience for Personal and Business Clients.',
      thumbnail: '/assets/news-product.jpg',
      href: '/news/product-2026-01-20-1',
    },
  ];

  const allArticles = ARTICLES.slice(0, limit);

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