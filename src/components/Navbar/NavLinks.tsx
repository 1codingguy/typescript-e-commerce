import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../../utils/constants'
import { useProductsContext } from '../../context/products_context'

export const NavLinks: React.FC<{ className: string; isSidebar?: boolean }> = ({
  className,
  isSidebar,
}) => {
  const { closeSidebar } = useProductsContext()
  return (
    <ul className={className}>
      {links.map(({ id, text, url }) => {
        return (
          <li key={id} onClick={isSidebar ? closeSidebar : undefined}>
            <Link to={url}>{text}</Link>
          </li>
        )
      })}
      {/* 'checkout' only available in sidebar, not in Navbar */}
      {isSidebar && (
        <li>
          <Link to='/checkout' onClick={closeSidebar}>
            checkout
          </Link>
        </li>
      )}
    </ul>
  )
}
