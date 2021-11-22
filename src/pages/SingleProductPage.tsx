import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { formatPrice } from '../utils/helpers'
import { ProductImages, Loading, PageHero, AddToCart } from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { productDataType } from '../utils/productData'

const SingleProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const { singleProduct, fetchSingleProduct } = useProductsContext()

  const { name, price, description, images } = { ...singleProduct }

  useEffect(() => {
    fetchSingleProduct(id)
  }, [])

  if (!singleProduct) {
    return <Loading />
  } else {
    return (
      <Wrapper>
        <PageHero title={name} isSingleProduct />
        <div className='section section-center page'>
          <Link to='/products' className='btn'>
            back to products
          </Link>
          <div className='product-center'>
            <ProductImages images={images} />
            <section className='content'>
              <h2>{name}</h2>
              {/* insert stars component here  */}
              <h5 className='price'>{price && formatPrice(price)}</h5>
              <p className='desc'>{description}</p>
              <p className='info'>
                <span>Available : </span>
                {/* logic showing in stock or out of stock */}
              </p>
              <p className='info'>
                <span>SKU : </span>
                {id}
              </p>
              <p className='info'>
                <span>Brand : </span>
                {/* to add brand variable later */}
              </p>
              <hr />
              {/* insert logic: if stock larger than 0, then display AddToCart component */}
              <AddToCart singleProduct={singleProduct} />
            </section>
          </div>
        </div>
      </Wrapper>
    )
  }
}

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

export default SingleProductPage
