import { useEffect, useState } from 'react'

const AUTOPLAY_MS = 6000

export default function Hero({ data, loading }) {
  const slides = data?.slides || []
  const [activeIndex, setActiveIndex] = useState(0)

  // Sync with server-provided active_index whenever fresh data arrives
  useEffect(() => {
    if (typeof data?.active_index === 'number') {
      setActiveIndex(data.active_index)
    }
  }, [data?.active_index])

  // Auto-advance, paused if there's only one (or zero) slides
  useEffect(() => {
    if (slides.length < 2) return
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [slides.length])

  const slide = slides[activeIndex]

  const heroStyle = slide?.image
    ? { backgroundImage: `linear-gradient(120deg, rgba(10,15,14,0.78), rgba(10,15,14,0.42)), url(${slide.image})` }
    : undefined

  return (
    <section className="hero" style={heroStyle}>
      <div className="wrap">
        <div className="hero__content" key={slide?.id || 'loading'}>
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
              {slide.cta && (
                <a className="btn btn--solid" href={slide.cta.href}>
                  {slide.cta.label} →
                </a>
              )}
            </>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="hero__dots">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={i === activeIndex ? 'active' : ''}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    </section>
  )
}