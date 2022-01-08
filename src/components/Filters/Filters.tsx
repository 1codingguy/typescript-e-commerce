import React, { useState } from 'react'
import styled from 'styled-components'
import { SearchFilters } from './SearchFilters'
import { CategoryFilters } from './CategoryFilters'
import { ForWhomFilters } from './ForWhomFilters'
import { PriceFilters } from './PriceFilters'
import { AgeFilters } from './AgeFilters'
import { HeightFilters } from './HeightFilters'
import { ClearFilters } from './ClearFilters'
import { FiltersButton } from './FiltersButton'

/** filters applied to the products list */
const Filters = () => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <Wrapper>
      <FiltersButton
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <div className={showFilters ? 'show-filters content' : 'content'}>
        <form onSubmit={e => e.preventDefault()}>
          <SearchFilters />
          <CategoryFilters />
          <ForWhomFilters />
          <PriceFilters />
          <AgeFilters />
          <HeightFilters />
        </form>
        <ClearFilters />
      </div>
    </Wrapper>
  )
}

export default Filters

const Wrapper = styled.section`

  .content {
    display: none;
  }
  .show-filters {
    display: block;
  }
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
      display: block;
      position: sticky;
      top: 1rem;
    }
  }
`
