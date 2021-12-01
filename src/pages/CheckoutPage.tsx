import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  const { cart } = useCartContext()

  if (cart.length < 1) {
    return (
      <PageWrapper>
        <div className='empty'>
          <h2>your cart is empty</h2>
          <Link to='products' className='btn'>
            fill it
          </Link>
        </div>
      </PageWrapper>
    )
  } else {
    return (
      <PageWrapper>
        <StripeCheckout />
      </PageWrapper>
    )
  }
}

const PageWrapper: React.FC = ({ children }) => {
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>{children}</Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-items: center;

  .empty {
    text-align: center;
  }
`
export default CheckoutPage
