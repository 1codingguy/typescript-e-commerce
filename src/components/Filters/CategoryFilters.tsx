import React from 'react'
import { useFilterContext } from '../../context/filter_context'
import { getUniqueValues } from '../../utils/helpers'

export const CategoryFilters = () => {
  const {
    updateFilters,
    allProducts,
    filters: { category },
  } = useFilterContext()
  const uniqueCategories = getUniqueValues(allProducts, 'categories')

  return (
    <div className='form-control'>
      <h5>category</h5>
      <div>
        {uniqueCategories.map((uniqueCategory) => {
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
