import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  // CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'
import { productDataType } from '../utils/productData'

export type initialStateType = {
  filteredProducts: productDataType[]
  allProducts: productDataType[]
  gridView: boolean
  setGridView: () => void
  setListView: () => void
  sort: string
  updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void
  filters: {
    searchTerm: string
    category: string
    minPrice: number
    maxPrice: number
    price: number
  }
  updateFilters: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearFilters: () => void
}

const initialState: initialStateType = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  setGridView: () => {},
  setListView: () => {},
  sort: 'price-lowest',
  updateSort: () => {},
  filters: {
    searchTerm: '',
    category: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0
  },
  updateFilters: () => {},
  clearFilters: () => {}
}

const FilterContext = React.createContext<initialStateType>(initialState)

export const FilterProvider: React.FC = ({ children }) => {
  const { allProducts } = useProductsContext()

  const [state, dispatch] = useReducer(reducer, initialState)

  // to load the full list of product when app starts
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: allProducts })
  }, [allProducts])

  // to sort and filter products when the sort value has changed
  useEffect(()=>{
    dispatch({type: FILTER_PRODUCTS})
    dispatch({type: SORT_PRODUCTS})
  }, [allProducts, state.sort, state.filters])

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }
  const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: UPDATE_SORT, payload: e.target.value})
  }
  const updateFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name
    let value = e.target.value
    // console.log(name, value)
    dispatch({type: UPDATE_FILTERS, payload: {name, value} })
  }
  const clearFilters = () => {}

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, updateSort, updateFilters }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
