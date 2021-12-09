import React from 'react'
import { useFilterContext } from '../../context/filter_context'
import { heightCategories } from '../../utils/constants'

export const HeightFilters = () => {
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
