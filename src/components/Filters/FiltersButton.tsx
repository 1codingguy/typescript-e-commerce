import React from 'react'
import styled from 'styled-components'
import { FcExpand, FcCollapse } from 'react-icons/fc'

export const FiltersButton: React.FC<{
  showFilters: boolean
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ showFilters, setShowFilters }) => {
  return (
    <Wrapper>
      <h3>filters</h3>
      <hr />
      <button onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? <FcCollapse /> : <FcExpand />}
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;

  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  button {
    background: transparent;
    border: 1px solid var(--clr-black);
    color: var(--clr-black);
    width: 1.5rem;
    border-radius: var(--radius);
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      font-size: 1rem;
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
`
