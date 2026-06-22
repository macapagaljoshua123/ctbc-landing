const LINKS = [
  { label: 'Personal Banking', href: '/personal' },
  { label: 'Business Banking', href: '/business' },
  { label: 'Wealth Program', href: '/wealth' },
  { label: 'About Us', href: '/about' },
  { label: 'Rates', href: '/rates' },
]

export default function Navbar() {
  return (
    <header>
      <div className="navbar-brand-bar">
        <div className="wrap">
          <a href="/" className="navbar__brand">
            <span className="dot" aria-hidden="true" />
            CTBC BANK
          </a>
          <div className="navbar__actions">
            <a className="btn btn--outline" href="/personal/open-account">Open Account →</a>
            <a className="btn btn--solid" href="/sign-in">Sign In →</a>
          </div>
        </div>
      </div>
      <nav className="navbar">
        <div className="wrap">
          <ul className="navbar__links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
