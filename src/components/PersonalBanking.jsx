const PILLARS = [
  {
    title: 'Deposits',
    description: 'Grow and monitor your funds in peso, dollar, or both.',
    links: ['Peso Deposit', 'Foreign Currency', 'Visa Debit & Cash', 'Payment & Remittance'],
  },
  {
    title: 'Investments',
    description: 'Maximize your funds with better-yielding options across asset classes.',
    links: ['Foreign Exchange', 'Peso Fixed Income', 'Unit Investment Trust', 'Investment Management'],
  },
  {
    title: 'Loans',
    description: 'Affordable, transparent loan options for your home, education, or working capital.',
    links: ['My Family Home Loan', 'My Home Equity Loan', 'Salary Stretch Loans', 'Back-to-Back Loans'],
  },
  {
    title: 'Cash Management',
    description: 'Simplify your processes so you can focus on what matters most.',
    links: ['Account Information', 'Disbursement', 'Receivables', 'NetBanking'],
  },
]

export default function PersonalBanking() {
  return (
    <section className="section">
      <div className="wrap">
        <h2>Personal Banking</h2>
        <p className="subhead">
          Four <span className="accent">pillars.</span>
          <br />
          One trusted relationship.
        </p>

        <div className="pillars">
          {PILLARS.map((pillar) => (
            <div className="pillar" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <ul className="pillar__links">
                {pillar.links.map((link) => (
                  <li key={link}>
                    <a href="#">
                      {link} <span className="arrow">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
