import React from 'react'
import { useFilterContext } from '../../context/filter_context'
import { BsFillGridFill, BsList } from 'react-icons/bs'

export const SortButtons = () => {
  const { gridView, setGridView, setListView } = useFilterContext()
  return (
    <div className='btn-container'>
      <button
        type='button'
        className={gridView ? 'active' : undefined}
        onClick={setGridView}
      >
        <BsFillGridFill />
      </button>
      <button
        type='button'
        className={!gridView ? 'active' : undefined}
        onClick={setListView}
      >
        <BsList />
      </button>
    </div>
  )
}
