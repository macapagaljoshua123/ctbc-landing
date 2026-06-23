export default function RatesTable({ data, loading, error }) {
  const headline = data?.headline_rate
  const table = data?.tenor_table

  return (
    <section className="rates">
      <div className="wrap">
        <p className="eyebrow">Today's Rates</p>
        <h2>
          Transparent Rates, <br />
          <span className="accent">Reviewed Daily.</span>
        </h2>

        {error ? (
          <p style={{ color: '#c8102e', marginTop: 28 }}>{error.message}</p>
        ) : (
          <div className="rates__grid">
            <div className="rates__panel">
              {loading || !headline ? (
                <div className="hero__skel" style={{ width: '70%' }} />
              ) : (
                <>
                  <div className="rates__panel-label">{headline.pair} · {headline.type}</div>
                  <div className="rates__panel-value">
                    {headline.value}
                    <sup>{headline.currency}</sup>
                  </div>
                  <div className="rates__panel-stats">
                    <div>
                      Buy
                      <strong>{headline.buy}</strong>
                    </div>
                    <div>
                      PHP TD · 1Y
                      <strong>{headline.php_td_1y}%</strong>
                    </div>
                    <div>
                      USD TD · 1Y
                      <strong>{headline.usd_td_1y}%</strong>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="rates__table-wrap">
              <div className="rates__tabs">
                <span className="active">Peso</span>
                <span>USD</span>
                <span>Rate Valuation</span>
              </div>

              {loading || !table ? (
                <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>Loading rate table…</p>
              ) : (
                <>
                  <table className="rates__table">
                    <thead>
                      <tr>
                        <th>Amount (PHP)</th>
                        {table.columns.map((c) => (
                          <th key={c}>{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.currencies.peso.map((row) => (
                        <tr key={row.tier}>
                          <td>{row.tier}</td>
                          {row.rates.map((r, i) => (
                            <td key={i}>{r.toFixed(3)}%</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="rates__footnote">As of {table.as_of} · {table.note}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}