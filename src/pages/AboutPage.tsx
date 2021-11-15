import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'

const AboutPage = () => {
  return (
    <main>
      <PageHero title='about'/>
      <Wrapper className='page section section-center'>
        {/* insert about page image here */}
        {/* <img src="" alt="" /> */}
        <article className='title'>
          <h2>About Us</h2>
          <div className='underline'></div>
          <p>Insert about us text here</p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
