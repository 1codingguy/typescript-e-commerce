import {
  ADD_TO_CART,
  CLEAR_CART,
  // COUNT_CART_TOTALS,
  // REMOVE_CART_ITEM,
  // TOGGLE_CART_ITEM_AMOUNT,
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
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
