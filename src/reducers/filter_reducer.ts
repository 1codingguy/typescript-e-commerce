import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { defaultFilters, initialStateType } from '../context/filter_context'
import { productDataType } from '../utils/productData'

const filter_reducer = (state: initialStateType, action: any) => {
  if (action.type === LOAD_PRODUCTS) {
    const maxPrice = Math.max(
      ...action.payload.map((item: productDataType) => item.price)
    )

    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: { ...state.filters, maxPrice, price: maxPrice },
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false }
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  if (action.type === SORT_PRODUCTS) {
    let tempProducts = [...state.filteredProducts]
    if (state.sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    }
    if (state.sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }
    if (state.sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (state.sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return { ...state, filteredProducts: tempProducts }
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state
    const { searchTerm, category, forWhom, price } = state.filters

    let tempProducts = [...allProducts]
    // filter by searchTerm
    if (searchTerm) {
      tempProducts = tempProducts.filter(product => {
        return product.name.toLowerCase().includes(searchTerm)
      })
    }
    // category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.category === category
      })
    }
    // forWhom
    if (forWhom !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.forWhom === forWhom
      })
    }
    // price
    tempProducts = tempProducts.filter(product => {
      return product.price <= price
    })
    return { ...state, filteredProducts: tempProducts }
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        searchTerm: '',
        category: 'all',
        price: state.filters.maxPrice,
        forWhom: 'all',
      },
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
