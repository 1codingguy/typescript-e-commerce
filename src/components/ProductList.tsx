import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { useProductsContext } from '../context/products_context'
import GridView from './GridView'
import ListView from './ListView'
import Loading from './Loading'

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext()
  const { productsLoading } = useProductsContext()

  if (productsLoading) {
    return <Loading />
  }

  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no product matches your search...
      </h5>
    )
  }

  if (!gridView) {
    return <ListView filteredProducts={filteredProducts} />
  }
  return <GridView filteredProducts={filteredProducts}>product list</GridView>
}

export default ProductList
