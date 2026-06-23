function TickerItem({ label, value, suffix = '', direction, change, colorValue }) {
  return (
    <div className="ticker__item">
      <div className="ticker__label">{label}</div>
      <div className={`ticker__value ${colorValue ? direction || '' : ''}`}>
        {value}
        {suffix}
        {change != null && (
          <span className={`ticker__delta ${direction || ''}`}>
            {change > 0 ? '+' : ''}
            {change}
          </span>
        )}
      </div>
    </div>
  )
}

export default function MarketTicker({ data, loading, error }) {
  const t = data?.ticker

  return (
    <div className="ticker">
      <div className="wrap">
        <div className="ticker__item">
          <div className="ticker__label">Market Reference</div>
          <div className="ticker__caption">{loading ? 'Loading…' : `As of ${formatDate(data?.as_of)}`}</div>
        </div>
        {error ? (
          <span style={{ color: '#ff8a8a', fontSize: 13 }}>{error.message}</span>
        ) : loading || !t ? (
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Fetching latest rates…</span>
        ) : (
          <>
            <TickerItem
              label="USD/PHP · Buy"
              value={t.usd_php_buy.value}
              change={t.usd_php_buy.change}
              direction={t.usd_php_buy.direction}
            />
            <TickerItem
              label="USD/PHP · Sell"
              value={t.usd_php_sell.value}
              change={t.usd_php_sell.change}
              direction={t.usd_php_sell.direction}
            />
            <TickerItem label="PDS WTD AVG" value={t.pds_wtd_avg.value} />
            <TickerItem
              label="PHP TD · 1Y"
              value={t.php_td_1y.value}
              suffix="%"
              direction={t.php_td_1y.direction}
              colorValue
            />
            <TickerItem
              label="USD TD · 1Y"
              value={t.usd_td_1y.value}
              suffix="%"
              direction={t.usd_td_1y.direction}
              colorValue
            />
          </>
        )}
      </div>
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const datePart = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Manila',
  })
  const timePart = d
    .toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Manila',
    })
    .replace(':', '')
  return `${datePart} · ${timePart}`
}