import {
  LOAD_PRODUCTS,
  // SET_LISTVIEW,
  // SET_GRIDVIEW,
  // UPDATE_SORT,
  // SORT_PRODUCTS,
  // UPDATE_FILTERS,
  // FILTER_PRODUCTS,
  // CLEAR_FILTERS,
} from '../actions'
import { initialStateType } from '../context/filter_context'

const filter_reducer = (state: initialStateType, action: any) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
    }
  }
  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
