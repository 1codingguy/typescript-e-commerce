import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'

ReactDOM.render(
  <ProductsProvider>
    <FilterProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FilterProvider>
  </ProductsProvider>,
  document.getElementById('root')
)
