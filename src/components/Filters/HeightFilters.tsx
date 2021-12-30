import React from 'react'
import { useFilterContext } from '../../context/filter_context'
import {
  getUniqueValues,
  sortUniqueCategoriesByFirstNumber,
} from '../../utils/helpers'

export const HeightFilters = () => {
  const {
    updateFilters,
    filters: { height },
    allProducts,
  } = useFilterContext()
  const uniqueHeights: any = getUniqueValues(allProducts, 'height', true)

  const sortedUniqueHeight = sortUniqueCategoriesByFirstNumber(uniqueHeights)

  return (
    <div className='form-control checkbox'>
      <h5>height</h5>
      {sortedUniqueHeight.map((heightCategory: string) => {
        return (
          <label key={heightCategory}>
            <input
              type='checkbox'
              name='height'
              value={heightCategory}
              onChange={e => updateFilters(e)}
              checked={height.includes(heightCategory) ? true : false}
            />
            {'  '}
            {heightCategory}
          </label>
        )
      })}
    </div>
  )
}
