import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'
// import { featuredProducts, productData } from '../utils/productData'
import { productDataType } from '../utils/productData'
import { API_ENDPOINT, QUERY } from '../utils/constants'
import axios from 'axios'

export type initialStateType = {
  isSidebarOpen: boolean
  allProducts: productDataType[] | []
  featuredProducts: productDataType[] | []
  singleProduct: productDataType | {}
  openSidebar: () => void
  closeSidebar: () => void
  fetchSingleProduct: (id: string) => void
  productsLoading: boolean
  productsError: boolean
  singleProductLoading: boolean
  singleProductError: boolean
}

const initialState: initialStateType = {
  isSidebarOpen: false,
  allProducts: [],
  featuredProducts: [],
  singleProduct: {},
  openSidebar: () => {},
  closeSidebar: () => {},
  fetchSingleProduct: (id: string) => {},
  productsLoading: false,
  productsError: false,
  singleProductLoading: false,
  singleProductError: false,
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

  const fetchSingleProduct = (id: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const singleProduct = state.allProducts.filter(
        (product: productDataType) => product.id === id
      )[0]
      dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct})
    } catch (error) {
      dispatch({type: GET_SINGLE_PRODUCT_ERROR})
    }
    
  }

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: GET_PRODUCTS_BEGIN })
      try {
        const queryResult = await axios.post(API_ENDPOINT, { query: QUERY })
        console.log(queryResult)
        const result = queryResult.data.data.allProduct
        console.log(result)

        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: result })
      } catch (error) {
        dispatch({ type: GET_PRODUCTS_ERROR })
      }
    }
    fetchProducts()
  }, [])

  // ----------- fetch product of local data -----------
  // fetch all the product data when the app starts
  // use GET_PRODUCTS_SUCCESS now because data is local, no loading success or failure
  // but change after setting up CMS
  // useEffect(() => {
  //   dispatch({ type: GET_PRODUCTS_SUCCESS, payload: productData })
  // }, [])

  // ----------- test GraphQL query with axios -----------
  // get GraphQL data when mount, console log the result for now

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const queryResult = await axios.post(API_ENDPOINT, { query: QUERY })
  //     console.log(queryResult)
  //     const result = queryResult.data.data
  //     console.log(result)
  //   }

  //   fetchData()
  // }, [])

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
