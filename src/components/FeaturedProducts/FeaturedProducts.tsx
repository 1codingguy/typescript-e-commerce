import React from 'react'
import styled from 'styled-components'
// import Loading from './Loading'
import { FeaturedProductsHeader } from './FeaturedProductsHeader'
import { FeaturedProductsCards } from './FeaturedProductsCards'
import { FeaturedProductsButton } from './FeaturedProductsButton'

const FeaturedProducts = () => {
  return (
    <Wrapper className='section'>
      <FeaturedProductsHeader />
      <FeaturedProductsCards />
      <FeaturedProductsButton />
    </Wrapper>
  )
}

export default FeaturedProducts

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
