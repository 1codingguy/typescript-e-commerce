import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { formatPrice, getUniqueValues } from '../utils/helpers'
import { ageCategories, heightCategories } from '../utils/constants'

const Filters = () => {
  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={e => e.preventDefault()}>
          <Search />
          <Category />
          <ForWhom />
          <Price />
          <Age />
          <Height />
        </form>
        <ClearFilters />
      </div>
    </Wrapper>
  )
}

export default Filters

const Search = () => {
  const {
    updateFilters,
    filters: { searchTerm },
  } = useFilterContext()

  return (
    <div className='form-control'>
      <input
        type='text'
        name='searchTerm'
        placeholder='search'
        className='search-input'
        value={searchTerm}
        onChange={e => updateFilters(e)}
      />
    </div>
  )
}

const Category = () => {
  const {
    updateFilters,
    allProducts,
    filters: { category },
  } = useFilterContext()
  const uniqueCategories = getUniqueValues(allProducts, 'category')

  return (
    <div className='form-control'>
      <h5>category</h5>
      <div>
        {uniqueCategories.map((uniqueCategory, index) => {
          if (typeof uniqueCategory === 'string') {
            return (
              <button
                key={`${uniqueCategory}`}
                type='button'
                name='category'
                className={
                  uniqueCategory.toLowerCase() === category
                    ? 'active'
                    : undefined
                }
                onClick={e => updateFilters(e)}
              >
                {uniqueCategory}
              </button>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

const ForWhom = () => {
  const {
    updateFilters,
    allProducts,
    filters: { forWhom },
  } = useFilterContext()
  const uniqueForWhoms = getUniqueValues(allProducts, 'forWhom')
  return (
    <div className='form-control'>
      <h5>Product for who?</h5>
      <select
        name='forWhom'
        value={forWhom}
        onChange={updateFilters}
        className='company'
      >
        {uniqueForWhoms.map((uniqueForWhom, index) => {
          if (typeof uniqueForWhom === 'string') {
            return (
              <option key={`${uniqueForWhom}`} value={uniqueForWhom}>
                {uniqueForWhom}
              </option>
            )
          }
          return null
        })}
      </select>
    </div>
  )
}

const Price = () => {
  const {
    updateFilters,
    filters: { minPrice, maxPrice, price },
  } = useFilterContext()
  return (
    <div className='form-control'>
      <h5>price</h5>
      <p className='price'>{formatPrice(price)}</p>
      <input
        type='range'
        name='price'
        onChange={updateFilters}
        min={minPrice}
        max={maxPrice}
        value={price}
      />
    </div>
  )
}

const Age = () => {
  const {
    updateFilters,
    filters: { age },
  } = useFilterContext()

  return (
    <div className='form-control checkbox'>
      <h5>age</h5>
      {ageCategories.map(({ categoryKey, categoryValue }) => {
        return (
          <label key={categoryValue}>
            <input
              type='checkbox'
              name='age'
              value={categoryKey}
              onChange={e => updateFilters(e)}
              checked={age.includes(categoryKey) ? true : false}
            />
            {'  '}
            {categoryValue}
          </label>
        )
      })}
    </div>
  )
}

const Height = () => {
  const {
    updateFilters,
    filters: { height },
  } = useFilterContext()

  return (
    <div className='form-control checkbox'>
      <h5>height</h5>
      {heightCategories.map(({ categoryKey, categoryValue }) => {
        return (
          <label key={categoryValue}>
            <input
              type='checkbox'
              name='height'
              value={categoryKey}
              onChange={e => updateFilters(e)}
              checked={height.includes(categoryKey) ? true : false}
            />
            {'  '}
            {categoryValue}
          </label>
        )
      })}
    </div>
  )
}

const ClearFilters = () => {
  const { clearFilters } = useFilterContext()
  return (
    <button type='button' className='clear-btn' onClick={clearFilters}>
      clear filters
    </button>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
    text-transform: capitalize;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .checkbox {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`
