import React from 'react'
import { Link } from 'react-router-dom'

export const ShopNowButton = () => {
  return (
    <Link to='/products' className='btn hero-btn'>
      shop now
    </Link>
  )
}
