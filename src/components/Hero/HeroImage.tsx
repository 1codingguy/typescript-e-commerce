import React from 'react'
import hero from '../../assets/hero.jpg'

export const HeroImage = () => {
  return (
    <article className='img-container'>
      <img src={hero} alt='hero' className='main-img' />
      {/* insert one more image here */}
    </article>
  )
}
