import React from 'react'
import { useFilterContext } from '../../context/filter_context'
import {
  getUniqueValues,
  sortUniqueCategoriesByFirstNumber,
} from '../../utils/helpers'

export const AgeFilters = () => {
  const {
    updateFilters,
    filters: { age },
    allProducts,
  } = useFilterContext()
  const uniqueAges: any = getUniqueValues(allProducts, 'age', true)

  const sortedUniqueAges = sortUniqueCategoriesByFirstNumber(uniqueAges)

  return (
    <div className='form-control checkbox'>
      <h5>age</h5>
      {sortedUniqueAges.map((ageCategory: string) => {
        return (
          <label key={ageCategory}>
            <input
              type='checkbox'
              name='age'
              value={ageCategory}
              onChange={e => updateFilters(e)}
              checked={age.includes(ageCategory) ? true : false}
            />
            {'  '}
            {ageCategory}
          </label>
        )
      })}
    </div>
  )
}
