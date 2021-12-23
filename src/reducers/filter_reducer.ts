import {
  LOAD_PRODUCTS,
  SET_LIST_VIEW,
  SET_GRID_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { initialStateType } from '../context/filter_context'
import { productDataType } from '../utils/productData'

const filter_reducer = (state: initialStateType, action: {type: any, payload?: any}) => {
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
  if (action.type === SET_GRID_VIEW) {
    return { ...state, gridView: true }
  }
  if (action.type === SET_LIST_VIEW) {
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
    let { name, value, checked } = action.payload
    let { age, height } = state.filters
    if (name === 'age') {
      if (checked) {
        // console.log('a box is just checked')
        age.push(value)
        // console.log(age)
        value = age
        // console.log(value)
      }
      if (!checked) {
        // console.log('a box is UNCHECKED')
        age = age.filter(ageValue => ageValue !== value)
        value = age
        // console.log(value)
      }
    }
    if (name === 'height') {
      if (checked) {
        height.push(value)
        value = height
      }
      if (!checked) {
        height = height.filter(heightValue => heightValue !== value)
        value = height
      }
    }
    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state
    const {
      searchTerm,
      category,
      forWhom,
      price,
      age: ageFilters,
      height: heightFilters,
    } = state.filters

    let tempProducts = [...allProducts]
    // filter by searchTerm
    if (searchTerm) {
      tempProducts = tempProducts.filter(product => {
        // console.log(product)
        return (
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    }
    // category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.categories === category
      })
    }
    // forWhom
    if (forWhom !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.forWhom === forWhom
      })
    }
    // age
    if (ageFilters.length > 0) {
      // console.log('there is something in the age array');

      tempProducts = tempProducts.filter(tempProduct => {
        const { age: productAgeArray } = tempProduct
        // needs to return ONE true/ false value here
        return ageFilters
          .map(ageFilter => productAgeArray?.includes(ageFilter))
          .every(value => Boolean(value))

        // see every step with following lines
        // const boolArray = ageFilters.map(ageFilter => {
        //   return productAgeArray?.includes(ageFilter)
        // })
        // console.log(boolArray)
        // console.log(boolArray.every(value => Boolean(value)))

        // return boolArray.every(value => Boolean(value))
      })
      // console.log(tempProducts)
    }
    // height
    if (heightFilters.length > 0) {
      tempProducts = tempProducts.filter(tempProduct => {
        const { height: productHeightArray } = tempProduct
        return heightFilters
          .map(heightFilter => productHeightArray?.includes(heightFilter))
          .every(value => Boolean(value))
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
        age: [],
        height: [],
      },
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
