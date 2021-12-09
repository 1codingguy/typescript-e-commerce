import React from 'react'
import { useFilterContext } from '../../context/filter_context'

export const SortMenu = () => {
  const { sort, updateSort } = useFilterContext()
  return (
    <form>
      <label htmlFor='sort'>sort by{` `}</label>
      <select name='sort' id='sort' value={sort} onChange={e => updateSort(e)}>
        <option value='price-lowest'>price (lowest)</option>
        <option value='price-highest'>price (highest)</option>
        <option value='name-a'>name (a-z)</option>
        <option value='name-z'>name (z-a)</option>
      </select>
    </form>
  )
}
