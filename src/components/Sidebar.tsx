import React from 'react'
import logo from '../assets/logo_word.jpg'
// import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import CartButtons from './CartButtons'
import { NavLinks } from './Navbar'
import { useProductsContext } from '../state/products_context'
// import { useUserContext } from '../context/user_context'

const Sidebar = () => {
  const { isSidebarOpen } = useProductsContext()
  return (
    <SidebarContainer>
      <aside className={isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        <SidebarHeader />
        <NavLinks className='links' isSidebar={true} />
        <CartButtons />
      </aside>
    </SidebarContainer>
  )
}

export default Sidebar

const SidebarHeader = () => {
  const { closeSidebar } = useProductsContext()
  return (
    <div className='sidebar-header'>
      <img src={logo} className='logo' alt='cute buddy' />
      <button type='button' className='close-btn' onClick={closeSidebar}>
        <FaTimes />
      </button>
    </div>
  )
}

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`
