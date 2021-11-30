import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'
import { initialStateType, cartType } from '../context/cart_context'

const cart_reducer = (
  state: initialStateType,
  action: { type: any; payload?: any }
) => {
  if (action.type === ADD_TO_CART) {
    console.log(action.payload)

    const { id, color, amount, singleProduct } = action.payload
    // address the color might not present problem later, id+color
    const tempItem = state.cart.find(item => item.id === id)

    console.log(tempItem)

    if (tempItem) {
      const tempCart = state.cart.map(cartItem => {
        // it should be id+color or color here, there's no point of
        if (cartItem.id === id) {
          const newAmount = tempItem.amount + amount
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })

      return { ...state, cart: tempCart }
    } else {
      const newItem: cartType = {
        id,
        name: singleProduct.name,
        color,
        amount,
        image: singleProduct.images[0],
        price: singleProduct.price,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(
      cartItem => cartItem.id !== action.payload
    )
    return { ...state, cart: tempCart }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload

    const tempCart = state.cart.map(cartItem => {
      if (cartItem.id === id) {
        if (value === 'inc') {
          return { ...cartItem, amount: cartItem.amount + 1 }
        } else {
          let tempAmount = cartItem.amount - 1
          if (tempAmount < 1) {
            tempAmount = 1
          }
          return { ...cartItem, amount: tempAmount }
        }
      } else {
        return cartItem
      }
    })

    return { ...state, cart: tempCart }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, cartItem) => {
        const { price, amount } = cartItem

        total.totalItems += amount
        total.totalAmount += amount * price

        return total
      },
      { totalItems: 0, totalAmount: 0 }
    )
    return { ...state, totalItems, totalAmount }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
