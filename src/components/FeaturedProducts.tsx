import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Product from './Product'
import Loading from './Loading'
import { useProductsContext } from '../context/products_context'

const FeaturedProducts = () => {
  const { featuredProducts } = useProductsContext()

  if (!featuredProducts) {
    return <Loading />
  } else {
    return (
      <Wrapper className='section'>
        <div className='title'>
          <h2>featured products</h2>
          <div className='underline' />
        </div>
        <div className='section-center featured'>
          {featuredProducts &&
            featuredProducts.map(product => (
              <Product key={product.id} product={product} />
            ))}
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
