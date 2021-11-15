import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <Wrapper className='page-100'>
      <section>
        <h1>Sorry</h1>
        <h3>The page you are looking for doesn't exist...</h3>
        <Link to='/' className='btn'>
          back home
        </Link>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 8rem;
    margin-bottom: 1rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`

export default ErrorPage
