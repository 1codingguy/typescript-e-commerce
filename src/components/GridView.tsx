import React from 'react'
import styled from 'styled-components'
import Product from './Product'
import { productDataType } from '../utils/productData'

const GridView: React.FC<{ filteredProducts: productDataType[] }> = ({
  filteredProducts,
}) => {
  return (
    <Wrapper>
      <div className='products-container'>
        {filteredProducts.map(product => {
          return <Product key={product.id} product={product} />
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default GridView
