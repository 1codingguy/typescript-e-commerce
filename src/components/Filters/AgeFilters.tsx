import React from 'react'
import { useFilterContext } from '../../context/filter_context'
import { ageCategories } from '../../utils/constants'

export const AgeFilters = () => {
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
