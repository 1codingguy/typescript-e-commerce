import React from 'react'
import { useFilterContext } from '../../context/filter_context'
import { formatPrice } from '../../utils/helpers'

export const PriceFilters = () => {
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
