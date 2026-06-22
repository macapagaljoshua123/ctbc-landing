export default function NewsSection({ articles, loading, browseHref }) {
  return (
    <section className="section">
      <div className="wrap">
        <h2>
          Latest from <br />
          <span className="accent">CTBC Philippines.</span>
        </h2>

        <div className="news-grid">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <div className="news-skel-card" key={i} />)
            : articles.map((article) => <NewsCard key={article.id} article={article} />)}
        </div>

        <div className="news-footer">
          <a className="btn btn--ghost" href={browseHref || '/news'}>
            Browse News →
          </a>
        </div>
      </div>
    </section>
  )
}

function NewsCard({ article }) {
  return (
    <article className="news-card">
      <div className="news-card__img">
        <img src={article.thumbnail} alt="" loading="lazy" />
        <span className="news-card__tag">{formatDate(article.published_at)}</span>
      </div>
      <div className="news-card__body">
        <p className="news-card__kicker">{article.tag}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <a className="news-card__link" href={article.href}>
          Read More →
        </a>
      </div>
    </article>
  )
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
}
