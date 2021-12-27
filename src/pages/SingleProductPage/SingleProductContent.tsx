import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from '../../context/products_context'
import { formatPrice } from '../../utils/helpers'
import { AddToCart } from '../../components'

export const SingleProductContent = () => {
  const { singleProduct } = useProductsContext()

  const { name, price, description, brand, stock } = { ...singleProduct }
  return (
    <section className='content'>
      <h2>{name}</h2>
      {/* insert stars component here  */}
      <h5 className='price'>{price && formatPrice(price)}</h5>
      <p className='desc'>{description}</p>
      <p className='info'>
        <span>Available : </span>
        {stock}
        {/* logic showing in stock or out of stock */}
      </p>

      <p className='info'>
        <span>Brand : </span>
        {/* to add brand variable later */}
        {brand}
      </p>
      <hr />
      {/* insert logic: if stock larger than 0, then display AddToCart component */}
      <AddToCart singleProduct={singleProduct} />
    </section>
  )
}
