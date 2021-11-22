import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'

ReactDOM.render(
  <ProductsProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </ProductsProvider>,
  document.getElementById('root')
)
