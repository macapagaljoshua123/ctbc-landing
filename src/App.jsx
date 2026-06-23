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
  const [errors, setErrors] = useState({ hero: null, rates: null, news: null })

  useEffect(() => {
  getHero().then((res) => {
    console.log('Hero response:', res)
    if (res.status === 'success') {
      setHero(res.data)
    } else {
      setErrors((e) => ({ ...e, hero: res.error }))
    }
    setLoading((l) => ({ ...l, hero: false }))
  })

  getMarketRates().then((res) => {
    console.log('Market Rates response:', res)
    if (res.status === 'success') {
      setRates(res.data)
    } else {
      setErrors((e) => ({ ...e, rates: res.error }))
    }
    setLoading((l) => ({ ...l, rates: false }))
  })

  getNews({ limit: 4 }).then((res) => {
    console.log('News response:', res) 
    if (res.status === 'success') {
      setNews(res.data)
    } else {
      setErrors((e) => ({ ...e, news: res.error }))
    }
    setLoading((l) => ({ ...l, news: false }))
  })
}, [])

  return (
    <>
      <Navbar />
      <Hero data={hero} loading={loading.hero} error={errors.hero} />
      <MarketTicker data={rates} loading={loading.rates} error={errors.rates} />
      <PersonalBanking />
      <BusinessBanking />
      <RatesTable data={rates} loading={loading.rates} error={errors.rates} />
      <NewsSection
        articles={news?.articles || []}
        loading={loading.news}
        error={errors.news}
        browseHref={news?.pagination?.browse_all_href}
      />
      <Footer />
    </>
  )
}