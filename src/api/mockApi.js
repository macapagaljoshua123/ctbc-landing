const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /mock/hero.json
 */
export async function getHero({ simulateError = false } = {}) {
  if (simulateError) {
    await delay(250);
    return {
      status: 'error',
      error: { code: 'HERO_SLIDES_UNAVAILABLE', message: 'No hero slides are currently configured.' },
    };
  }

  const res = await fetch('/mock/hero.json');
  return res.json();
}

/**
 * GET /mock/market-rates.json
 */
export async function getMarketRates({ simulateError = false } = {}) {
  if (simulateError) {
    await delay(250);
    return {
      status: 'error',
      error: { code: 'RATE_FEED_UNAVAILABLE', message: 'Market rate feed did not respond in time.' },
    };
  }

  const res = await fetch('/mock/market-rates.json');
  return res.json();
}

/**
 * GET /mock/news.json
 */
export async function getNews({ limit = 4, simulateError = false } = {}) {
  if (simulateError) {
    await delay(250);
    return {
      status: 'error',
      error: { code: 'NEWS_FETCH_FAILED', message: 'Could not load latest articles.' },
    };
  }

  const res = await fetch('/mock/news.json');
  const json = await res.json();
  json.data.articles = json.data.articles.slice(0, limit);
  return json;
}