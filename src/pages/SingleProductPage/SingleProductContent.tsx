import React from 'react'
import { useProductsContext } from '../../context/products_context'
import { formatPrice } from '../../utils/helpers'
import { AddToCart } from '../../components'

export const SingleProductContent = () => {
  const { singleProduct } = useProductsContext()

  const { name, price, description, brand, stock, age, height } = {
    ...singleProduct,
  }
  return (
    <section className='content'>
      <h2>{name}</h2>
      {/* insert stars component here  */}
      <h5 className='price'>{price && formatPrice(price)}</h5>
      <p className='desc'>{description}</p>
      <p className='info'>
        <span>Availability : </span>
        {stock ? 'In stock' : 'Sorry, out of stock'}
        {/* logic showing in stock or out of stock */}
      </p>

      {brand ? (
        <p className='info'>
          <span>Brand : </span>
          {brand}
        </p>
      ) : undefined}

      {age ? (
        <section className='info'>
          <span>Suitable for age : </span>
          <ul>
            {age.map(item => (
              <li key={item} className='age'>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : undefined}

      {height ? (
        <section className='info'>
          <span>Suitable for height : </span>
          <ul>
            {height.map(item => (
              <li key={item} className='height'>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : undefined}

      {stock ? (
        <>
          <hr />
          <AddToCart singleProduct={singleProduct} />
        </>
      ) : undefined}
    </section>
  )
}
