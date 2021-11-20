import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages: React.FC<{ images: string[] | undefined }> = ({
  images = [],
}) => {
  const [imageIndex, setImageIndex] = useState(0)

  return (
    <Wrapper>
      <img src={images[imageIndex]} alt='main' className='main' />
      <div className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              key={image}
              src={image}
              alt=''
              onClick={() => setImageIndex(index)}
              className={index===imageIndex? 'active': undefined}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
