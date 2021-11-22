import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  // SET_GRIDVIEW,
  // SET_LISTVIEW,
  // UPDATE_SORT,
  // SORT_PRODUCTS,
  // UPDATE_FILTERS,
  // FILTER_PRODUCTS,
  // CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'
import { productDataType } from '../utils/productData'

export type initialStateType = {
  filteredProducts: productDataType[]
  allProducts: productDataType[]
  gridView: boolean
}

const initialState: initialStateType = {
  filteredProducts: [],
  allProducts: [],
  gridView: false,
}

const FilterContext = React.createContext<initialStateType>(initialState)

export const FilterProvider: React.FC = ({ children }) => {
  const { allProducts } = useProductsContext()

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: allProducts })
  }, [allProducts])

  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
