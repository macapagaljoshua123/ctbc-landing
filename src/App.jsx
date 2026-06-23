import { useEffect, useState } from 'react'
import { getHero, getMarketRates, getNews } from './api/mockApi'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarketTicker from './components/MarketTicker'
import PersonalBanking from './components/PersonalBanking'
import BusinessBanking from './components/BusinessBanking'
import RatesTable from './components/RatesTable'
import NewsSection from './components/NewsSection'
import Footer from './components/Footer'

export default function App() {
  const [hero, setHero] = useState(null)
  const [rates, setRates] = useState(null)
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState({ hero: true, rates: true, news: true })

  useEffect(() => {
    getHero().then((res) => {
      setHero(res.data)
      setLoading((l) => ({ ...l, hero: false }))
    })

    getMarketRates().then((res) => {
      setRates(res.data)
      setLoading((l) => ({ ...l, rates: false }))
    })

    getNews({ limit: 4 }).then((res) => {
      setNews(res.data)
      setLoading((l) => ({ ...l, news: false }))
    })
  }, [])

  return (
    <>
      <Navbar />
      <Hero data={hero} loading={loading.hero} />
      <MarketTicker data={rates} loading={loading.rates} />
      <PersonalBanking />
      <BusinessBanking />
      <RatesTable data={rates} loading={loading.rates} />
      <NewsSection
        articles={news?.articles || []}
        loading={loading.news}
        browseHref={news?.pagination?.browse_all_href}
      />
      <Footer />
    </>
  )
}