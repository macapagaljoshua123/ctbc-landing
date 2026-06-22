const OFFERINGS = [
  'Deposits',
  'Cash Management',
  'Loans',
  'Trade Services',
  'Treasury',
  'Trust',
]

const BAND_IMAGE = '/assets/business-banking-bg.jpg'

export default function BusinessBanking() {
  return (
    <section
      className="biz-band"
      style={{
        backgroundImage: `linear-gradient(125deg, rgba(24,24,26,0.55) 0%, rgba(24,24,26,0.55) 38%, rgba(42,42,40,0.35) 100%), url(${BAND_IMAGE})`,
      }}
    >
      <div className="wrap">
        <h2>Business Banking</h2>
      </div>
      <div className="biz-offer">
        <div className="wrap">
          <span className="biz-offer__label">What We Offer</span>
          <ul className="biz-offer__list">
            {OFFERINGS.map((item) => (
              <li key={item}>
                <a href="#">{item} →</a>
              </li>
            ))}
            <li>
              <span className="more">+More</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
