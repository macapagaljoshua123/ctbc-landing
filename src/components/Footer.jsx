const COLUMNS = [
  {
    title: 'Personal',
    links: ['Deposits', 'Investments', 'Loans', 'Cash Management', 'Wealth Management', 'EZ Start Online'],
  },
  {
    title: 'Business',
    links: ['Deposits', 'Cash Management', 'Loans', 'Trade Services', 'Treasury', 'Trust'],
  },
  {
    title: 'About',
    links: ['Corporate Profile', 'News & Reports', 'Board & Management', 'CSR', 'Careers', 'Locations'],
  },
  {
    title: 'Resources',
    links: ["Today's Rates", 'FAQs', 'Client Advisories', 'Security Tips', 'Forms', 'Acquired Properties'],
  },
]

const BADGES = [
  {
    title: 'Regulated by BSP',
    text: 'CTBC Bank (Philippines) Corp. is regulated by the Bangko Sentral ng Pilipinas. Financial Consumer Protection Dept.: (02) 8708-7087',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" />
      </svg>
    ),
  },
  {
    title: 'Deposits Insured',
    text: 'Deposits are insured by the Philippine Deposit Insurance Corporation up to ₱1,000,000 per depositor.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'NPC Seal Certified · 2025–2026',
    text: 'CTBC Bank adheres to the Data Privacy Act of 2012 and applicable BSP circulars.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" className="navbar__brand">
              <span className="dot" aria-hidden="true" />
              CTBC BANK
            </a>
            <p>
              A member of CTBC Financial Holding, one of Asia's largest privately-held financial groups.
              Serving Filipino individuals and businesses for over three decades.
            </p>
            <div className="footer__contact">
              <strong>Customer Care</strong>
              (+632) 8811-8561 to 62
              <br />
              <br />
              <strong>Email</strong>
              customercare@ctbcbank.com.ph
            </div>
          </div>

          <div className="footer__cols">
            {COLUMNS.map((col) => (
              <div className="footer__col" key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__badges">
          {BADGES.map((badge) => (
            <div className="footer__badge" key={badge.title}>
              <span className="footer__badge-icon" aria-hidden="true">
                {badge.icon}
              </span>
              <div>
                <h5>{badge.title}</h5>
                <p>{badge.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="wrap">
          <span>© 2026 CTBC Bank (Philippines) Corp. All rights reserved.</span>
          <div className="footer__bottom-links">
            <a href="#">Privacy Statement</a>
            <a href="#">Security Statement</a>
            <a href="#">e-Banking Security</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}