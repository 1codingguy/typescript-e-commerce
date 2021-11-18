import React from 'react'
import { Hero, Services, Contact, FeaturedProducts } from '../components'

const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  )
}

export default HomePage
