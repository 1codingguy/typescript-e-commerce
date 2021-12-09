import React from 'react'
import { FaBars } from 'react-icons/fa'
import { useProductsContext } from '../../context/products_context'

export const MenuIcon = () => {
  const { openSidebar } = useProductsContext()
  return (
    <button type='button' className='nav-toggle' onClick={openSidebar}>
      <FaBars />
    </button>
  )
}
