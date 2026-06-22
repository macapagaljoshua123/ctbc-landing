export default function Hero({ data, loading }) {
  const slide = data?.slides?.[0]

  const heroStyle = slide
    ? {
        backgroundImage: `linear-gradient(120deg, rgba(10,15,14,0.78), rgba(10,15,14,0.42)), url(${slide.image})`,
      }
    : undefined

  return (
    <section className="hero" style={heroStyle}>
      <div className="wrap">
        <div className="hero__content">
          {loading || !slide ? (
            <>
              <div className="hero__skel" style={{ width: '90%', height: '2.4em' }} />
              <div className="hero__skel" style={{ width: '60%', marginBottom: 28 }} />
              <div className="hero__skel" style={{ width: '40%', height: '2.4em' }} />
            </>
          ) : (
            <>
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <a className="btn btn--solid" href={slide.cta.href}>
                {slide.cta.label} →
              </a>
            </>
          )}
        </div>
      </div>
      {data?.slides?.length > 1 && (
        <div className="hero__dots">
          {data.slides.map((s, i) => (
            <span key={s.id} className={i === data.active_index ? 'active' : ''} />
          ))}
        </div>
      )}
    </section>
  )
}
