function TickerItem({ label, value, suffix = '', direction }) {
  return (
    <div className="ticker__item">
      <div className="ticker__label">{label}</div>
      <div className={`ticker__value ${direction || ''}`}>
        {value}
        {suffix}
      </div>
    </div>
  )
}

export default function MarketTicker({ data, loading }) {
  const t = data?.ticker

  return (
    <div className="ticker">
      <div className="wrap">
        <div className="ticker__item">
          <div className="ticker__label">Market Reference</div>
          <div className="ticker__caption">{loading ? 'Loading…' : `As of ${formatDate(data?.as_of)}`}</div>
        </div>
        {loading || !t ? (
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Fetching latest rates…</span>
        ) : (
          <>
            <TickerItem label="USD/PHP · Buy" value={t.usd_php_buy.value} direction={t.usd_php_buy.direction} />
            <TickerItem label="USD/PHP · Sell" value={t.usd_php_sell.value} direction={t.usd_php_sell.direction} />
            <TickerItem label="PDS WTD AVG" value={t.pds_wtd_avg.value} direction={t.pds_wtd_avg.direction} />
            <TickerItem label="PHP TD · 1Y" value={t.php_td_1y.value} suffix="%" direction={t.php_td_1y.direction} />
            <TickerItem label="USD TD · 1Y" value={t.usd_td_1y.value} suffix="%" direction={t.usd_td_1y.direction} />
          </>
        )}
      </div>
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
