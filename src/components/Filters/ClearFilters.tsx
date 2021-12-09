import React from 'react'
import { useFilterContext } from '../../context/filter_context'

export const ClearFilters = () => {
  const { clearFilters } = useFilterContext()
  return (
    <button type='button' className='clear-btn' onClick={clearFilters}>
      clear filters
    </button>
  )
}
