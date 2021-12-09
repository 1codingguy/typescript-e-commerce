import React from 'react'
import { Link } from 'react-router-dom'

export const FeaturedProductsButton = () => {
  return (
    <Link to='/products' className='btn'>
      all products
    </Link>
  )
}
