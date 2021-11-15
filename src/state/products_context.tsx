import React, { useContext, useEffect, useReducer } from 'react'
import reducer from './products_reducer'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  // GET_PRODUCTS_BEGIN,
  // GET_PRODUCTS_SUCCESS,
  // GET_PRODUCTS_ERROR,
  // GET_SINGLE_PRODUCT_BEGIN,
  // GET_SINGLE_PRODUCT_SUCCESS,
  // GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

export type initialStateType = {
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

const initialState: initialStateType = {
  isSidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
}

const ProductsContext = React.createContext<initialStateType>(initialState)

export const ProductsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
