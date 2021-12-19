import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from '../../context/products_context'
import { ProductImages, Loading, PageHero } from '../../components'
import styled from 'styled-components'
import { BackToProductsButton } from './BackToProductsButton'
import { SingleProductContent } from './SingleProductContent'
import ErrorPage from '../ErrorPage'

const SingleProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const {
    singleProduct,
    fetchSingleProduct,
    singleProductLoading,
    singleProductError,
  } = useProductsContext()

  const { name, images } = { ...singleProduct }

  useEffect(() => {
    // this console.log confirms page refresh doesn't run the useEffect
    // console.log('running useEffect in SingleProductPage')
    fetchSingleProduct(id)
    // eslint-disable-next-line
  }, [id])

  if (singleProductLoading) {
    return <Loading />
  }
  if (singleProductError) {
    return <ErrorPage />
  } else {
    return (
      <Wrapper>
        <PageHero title={name} isSingleProduct />
        <div className='section section-center page'>
          <BackToProductsButton />
          <div className='product-center'>
            <ProductImages images={images} />
            <SingleProductContent />
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default SingleProductPage

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`
