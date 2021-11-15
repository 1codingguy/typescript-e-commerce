import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { ProductsProvider } from './state/products_context'

ReactDOM.render(
  <ProductsProvider>
    <App />
  </ProductsProvider>,
  document.getElementById('root')
)
