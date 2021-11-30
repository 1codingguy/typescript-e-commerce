import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import { productDataType } from '../utils/productData'
import {
  ADD_TO_CART,
  //   REMOVE_CART_ITEM,
  //   TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
  //   COUNT_CART_TOTALS,
} from '../actions'

export type cartType = {
  id: string
  name: string
  color: string
  amount: number
  image: string
  price: number
}

export type initialStateType = {
  // add shipping fee later
  cart: cartType[]
  totalItems: number
  totalAmount: number
  addToCart: (
    id: string | undefined,
    color: string | undefined,
    amount: number,
    singleProduct: productDataType | {}
  ) => void
  removeItem: (id: string) => void
  toggleAmount: (id: string, value: number) => void
  clearCart: () => void
}

const getLocalStorage: () => [] | cartType[] = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(cart)
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  addToCart: () => {},
  removeItem: () => {},
  toggleAmount: () => {},
  clearCart: () => {},
}

const CartContext = React.createContext<initialStateType>(initialState)

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = (
    id: string | undefined,
    color: string | undefined,
    amount: number,
    singleProduct: productDataType | {}
  ) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, color, amount, singleProduct },
    })
  }

  const removeItem = (id: string) => {}

  const toggleAmount = (id: string, value: number) => {}

  const clearCart = () => {
    dispatch({type: CLEAR_CART})
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
